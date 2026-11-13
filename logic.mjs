const DAY = 86400000;
export const MAX_BACKUP_BYTES = 256 * 1024;

// Only source fields are imported: calculated loads, indexes and assignments are discarded.
export function parseBackup(text) {
  if (typeof text !== 'string') throw new Error('La copia debe ser un archivo JSON de texto.');
  if (text.length > MAX_BACKUP_BYTES || new TextEncoder().encode(text).length > MAX_BACKUP_BYTES) {
    throw new Error('La copia supera el máximo de 256 KiB.');
  }
  let data;
  try { data = JSON.parse(text.replace(/^\uFEFF/, '')); }
  catch { throw new Error('El archivo no contiene un JSON válido. Elige una copia exportada por Turno Fácil.'); }
  const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  if (!record(data)) throw new Error('La copia debe contener un objeto de Turno Fácil.');
  if (data.version !== 1) throw new Error('Versión de copia no compatible. Se necesita la versión 1.');
  if (typeof data.demo !== 'boolean') throw new Error('La copia debe indicar si contiene datos de demostración.');
  for (const key of ['start', 'date']) {
    if (typeof data[key] !== 'string' || data[key].startsWith('0000-')) throw new Error('Las fechas de la copia deben ser fechas válidas con formato AAAA-MM-DD.');
  }
  const hasControls = value => /[\u0000-\u001f\u007f]/.test(value);
  if (!Array.isArray(data.aliases) || data.aliases.length < 2 || data.aliases.length > 12 ||
      data.aliases.some(alias => typeof alias !== 'string' || hasControls(alias))) {
    throw new Error('La copia debe incluir entre 2 y 12 alias de texto, sin saltos de línea ni caracteres de control.');
  }
  if (!Array.isArray(data.tasks) || !data.tasks.length || data.tasks.length > 100) throw new Error('La copia debe incluir entre 1 y 100 tareas.');
  const tasks = data.tasks.map((task, index) => {
    if (!record(task) || typeof task.name !== 'string' || hasControls(task.name) ||
        typeof task.minutes !== 'number' || typeof task.weight !== 'number') {
      throw new Error(`Tarea ${index + 1}: se necesita un título de texto y números para los minutos y el peso.`);
    }
    return { name: task.name, minutes: task.minutes, weight: task.weight };
  });
  return { demo: data.demo, plan: schedule(data.aliases, tasks, data.start, data.date) };
}

function dateValue(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('Indica una fecha válida.');
  const time = Date.parse(`${value}T00:00:00Z`);
  if (!Number.isFinite(time) || new Date(time).toISOString().slice(0, 10) !== value) throw new Error('Indica una fecha válida.');
  return time;
}
export function weekOffset(start, date) {
  const days = (dateValue(date) - dateValue(start)) / DAY;
  if (days < 0) throw new Error('La semana consultada no puede ser anterior al inicio.');
  return Math.floor(days / 7);
}
export function schedule(aliases, tasks, start, date) {
  const names = aliases.map(name => String(name).trim());
  if (names.length < 2 || names.length > 12 || names.some(n => !n || n.length > 40)) throw new Error('Introduce entre 2 y 12 alias de hasta 40 caracteres.');
  if (new Set(names.map(n => n.toLocaleLowerCase('es'))).size !== names.length) throw new Error('Los alias deben ser diferentes.');
  if (!tasks.length || tasks.length > 100) throw new Error('Añade entre 1 y 100 tareas.');
  const clean = tasks.map((task, index) => {
    const name = String(task.name ?? '').trim();
    const minutes = Number(task.minutes), weight = Number(task.weight);
    const invalid = (field, message) => {
      const label = `Tarea ${index + 1}${name ? ` («${name.slice(0, 80)}»)` : ''}`;
      throw Object.assign(new Error(`${label}: ${message}`), { taskIndex: index, field });
    };
    if (!name || name.length > 80) invalid('name', 'el título debe tener entre 1 y 80 caracteres.');
    if (!Number.isInteger(minutes) || minutes < 1 || minutes > 1440) invalid('minutes', 'la duración debe ser un número entero entre 1 y 1440 minutos.');
    if (!Number.isInteger(weight) || weight < 1 || weight > 5) invalid('weight', 'el peso debe ser un número entero entre 1 y 5.');
    return { name, minutes, weight, load: minutes * weight, index };
  });
  const week = weekOffset(start, date);
  const buckets = names.map(() => ({ load: 0, minutes: 0, tasks: [] }));
  for (const task of [...clean].sort((a, b) => b.load - a.load || a.index - b.index)) {
    const bucket = buckets.reduce((best, item) => item.load < best.load ? item : best);
    bucket.tasks.push(task); bucket.load += task.load; bucket.minutes += task.minutes;
  }
  return { week, start, date, aliases: names, tasks: clean, assignments: names.map((alias, i) => ({ alias, ...buckets[(i - week % names.length + names.length) % names.length] })) };
}

// Fechas civiles AAAA-MM-DD; las semanas se cuentan desde el inicio, igual que en schedule().
export function addDays(value, days) { return new Date(dateValue(value) + days * DAY).toISOString().slice(0, 10); }
export const weekStart = plan => addDays(plan.start, 7 * plan.week);
export const shortDate = iso => `${iso.slice(8, 10)}/${iso.slice(5, 7)}`;
export const longDate = iso => `${shortDate(iso)}/${iso.slice(0, 4)}`;

// Ciclo completo que contiene la semana consultada: tantas semanas como alias, todas calculadas con schedule().
export function cycle(plan) {
  const size = plan.aliases.length, first = plan.week - plan.week % size, weeks = [];
  for (let week = first; week < first + size; week++) {
    const date = addDays(plan.start, 7 * week);
    if (!/^\d{4}-/.test(date)) break; // más allá del 31/12/9999
    weeks.push(schedule(plan.aliases, plan.tasks, plan.start, date));
  }
  return weeks;
}

// CSV para Excel en español: BOM UTF-8, separador «;» y fórmulas neutralizadas con «'».
const csvCell = value => {
  let text = String(value);
  if (/^\s*[=+\-@]|^[\t\r]/.test(text)) text = `'${text}`;
  return /[;"\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};
export function toCsv(weeks) {
  const rows = [['semana', 'desde', 'hasta', 'persona', 'tarea', 'minutos', 'peso', 'carga']];
  for (const week of weeks) {
    const from = weekStart(week), to = addDays(from, 6);
    for (const person of week.assignments) {
      for (const task of person.tasks) rows.push([week.week + 1, from, to, person.alias, task.name, task.minutes, task.weight, task.load]);
    }
  }
  return '﻿' + rows.map(row => row.map(csvCell).join(';')).join('\r\n') + '\r\n';
}

// Texto breve para pegar en WhatsApp u otra app de mensajería.
export function shareText(plan, demo = false) {
  const lines = [`${demo ? '[DEMO] ' : ''}Turno de la semana ${plan.week + 1} (desde ${shortDate(weekStart(plan))}):`];
  for (const person of plan.assignments) {
    lines.push(`• ${person.alias}: ${person.tasks.length ? `${person.tasks.map(task => task.name).join(', ')} (${person.minutes} min)` : 'sin tareas'}`);
  }
  return lines.join('\n');
}
