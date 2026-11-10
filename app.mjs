import { MAX_BACKUP_BYTES, parseBackup, schedule } from './logic.mjs';
import { EXAMPLES } from './ejemplos.mjs';
const $ = id => document.getElementById(id);
let plan = null, demo = false, nextId = 0;
// Un ejemplo abierto desde una guía es una plantilla: deja de ser DEMO al primer cambio.
let template = false;
let draftRevision = 0, importAttempt = 0;
const localDate = new Date();
const today = `${localDate.getFullYear()}-${String(localDate.getMonth()+1).padStart(2,'0')}-${String(localDate.getDate()).padStart(2,'0')}`;
$('start').value = $('date').value = today;
function clearErrors() {
  $('error').textContent = '';
  $('tasks').querySelectorAll('.field-error').forEach(node => node.remove());
  $('tasks').querySelectorAll('[aria-invalid]').forEach(input => {
    input.removeAttribute('aria-invalid'); input.removeAttribute('aria-describedby');
  });
}
function invalidate() {
  draftRevision++;
  if (template) { template = false; demo = false; $('demo-label').hidden = true; }
  clearErrors();
  plan = null; $('results').replaceChildren(); $('export').disabled = $('print').disabled = true;
  $('status').textContent = 'Hay cambios pendientes. Pulsa «Repartir esta semana».';
}
function addTask(task = { name: '', minutes: 20, weight: 1 }) {
  if ($('tasks').children.length >= 100) { $('error').textContent = 'Máximo 100 tareas.'; return; }
  const row = document.createElement('div'); row.className = 'task';
  for (const [key, title, type, max] of [['name','Tarea','text',80],['minutes','Minutos','number',1440],['weight','Peso (1–5)','number',5]]) {
    const label = document.createElement('label'); label.textContent = title;
    if (key === 'name') label.className = 'task-name';
    const input = document.createElement('input'); input.type = type; input.value = task[key]; input.dataset.key = key; input.id = `task-${nextId++}`;
    if (type === 'number') { input.min = 1; input.max = max; input.step = 1; } else input.maxLength = max;
    label.append(input); row.append(label);
  }
  const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = 'Quitar'; remove.setAttribute('aria-label','Quitar esta tarea');
  remove.onclick = () => { row.remove(); invalidate(); $('add').focus(); };
  row.append(remove); $('tasks').append(row);
}
addTask();
$('planner').addEventListener('input', invalidate);
$('add').onclick = () => { addTask(); invalidate(); $('tasks').lastElementChild?.querySelector('input').focus(); };
function calculate(event) {
  // DEMO also calls calculate after replacing the form, invalidating pending imports.
  draftRevision++;
  event?.preventDefault(); clearErrors();
  try {
    const tasks = [...$('tasks').children].map(row => Object.fromEntries([...row.querySelectorAll('input')].map(input => [input.dataset.key, input.value])));
    plan = schedule($('aliases').value.split('\n').filter(n => n.trim()), tasks, $('start').value, $('date').value);
    $('results').replaceChildren();
    const maximum = Math.max(...plan.assignments.map(a => a.load));
    for (const person of plan.assignments) {
      const article = document.createElement('article'); article.className = 'person';
      const title = document.createElement('h3'); title.textContent = person.alias;
      const detail = document.createElement('p'); detail.textContent = `${person.minutes} min · ${person.load} puntos de carga`;
      const meter = document.createElement('div'); meter.className = 'meter'; meter.setAttribute('aria-hidden','true');
      const bar = document.createElement('span'); bar.style.width = `${person.load / maximum * 100}%`; meter.append(bar);
      const list = document.createElement('ul');
      for (const task of person.tasks) { const li = document.createElement('li'); li.textContent = `${task.name} — ${task.minutes} min, peso ${task.weight}`; list.append(li); }
      if (!person.tasks.length) { const li = document.createElement('li'); li.textContent = 'Sin tareas esta semana'; list.append(li); }
      article.append(title, detail, meter, list); $('results').append(article);
    }
    $('status').textContent = `Semana ${plan.week + 1} desde ${plan.start}. Fecha consultada: ${plan.date}. Diferencia de carga: ${maximum - Math.min(...plan.assignments.map(a => a.load))} puntos.`;
    $('demo-label').hidden = !demo;
    $('export').disabled = $('print').disabled = false;
  } catch (error) {
    invalidate(); $('error').textContent = error.message;
    const row = $('tasks').children[error.taskIndex];
    const input = row && [...row.querySelectorAll('input')].find(input => input.dataset.key === error.field);
    if (input) {
      const message = document.createElement('span'); message.className = 'field-error';
      message.id = `${input.id}-error`; message.textContent = error.message;
      input.setAttribute('aria-invalid', 'true'); input.setAttribute('aria-describedby', message.id);
      input.after(message); input.focus();
    }
  }
}
$('planner').onsubmit = calculate;
function loadDemo(aliases, tasks) {
  demo = true; $('demo-label').hidden = false; $('aliases').value = aliases.join('\n'); $('tasks').replaceChildren();
  tasks.forEach(task => addTask({ ...task }));
  $('start').value = $('date').value = today; calculate();
}
$('demo').onclick = () => { template = false; loadDemo(['Azul', 'Verde', 'Coral'],
  [{name:'Cocina',minutes:30,weight:3},{name:'Compra',minutes:40,weight:2},{name:'Plantas',minutes:10,weight:1},{name:'Reciclaje',minutes:15,weight:2}]); };
$('export').onclick = () => {
  if (!plan) return;
  const url = URL.createObjectURL(new Blob([JSON.stringify({ version:1, demo, ...plan },null,2)],{type:'application/json'}));
  const link = document.createElement('a'); link.href = url; link.download = `turno-facil-${plan.date}.json`; link.click(); setTimeout(() => URL.revokeObjectURL(url),1000);
};
function hasDraft() {
  if (plan || demo || $('aliases').value || $('start').value !== today || $('date').value !== today || $('tasks').children.length !== 1) return true;
  return [...$('tasks').children[0].querySelectorAll('input')].some(input => input.value !== { name: '', minutes: '20', weight: '1' }[input.dataset.key]);
}
$('import-file').onchange = async () => {
  const file = $('import-file').files[0];
  $('import-file').value = '';
  if (!file) return;
  const attempt = ++importAttempt;
  const revision = draftRevision;
  $('import-error').textContent = '';
  $('import-status').textContent = 'Leyendo la copia… Puedes seguir editando; si haces cambios, se cancelará la importación.';
  try {
    if (file.size > MAX_BACKUP_BYTES) throw new Error('La copia supera el máximo de 256 KiB.');
    const text = await file.text();
    if (attempt !== importAttempt) return;
    const restored = parseBackup(text);
    if (revision !== draftRevision) throw new Error('Has cambiado el borrador mientras se leía la copia. Vuelve a seleccionar el archivo cuando termines de editar.');
    if (hasDraft() && !window.confirm('¿Sustituir los alias, las tareas y las fechas actuales por esta copia JSON? Se perderá el borrador actual. Pulsa Cancelar para conservarlo; puedes repartirlo y exportar una copia antes de continuar.')) {
      $('import-status').textContent = 'Importación cancelada. Se conservan los datos actuales.';
      return;
    }
    template = false; demo = restored.demo;
    $('aliases').value = restored.plan.aliases.join('\n');
    $('start').value = restored.plan.start; $('date').value = restored.plan.date;
    $('tasks').replaceChildren(); restored.plan.tasks.forEach(addTask);
    calculate();
    $('import-status').textContent = demo ? 'Copia de demostración recuperada. Sigue marcada como DEMO; el reparto se ha recalculado.' : 'Copia recuperada. El reparto se ha recalculado con tus alias y tareas.';
  } catch (error) {
    if (attempt !== importAttempt) return;
    $('import-status').textContent = '';
    $('import-error').textContent = `No se ha importado la copia. ${error.message} Se conservan los datos actuales.`;
  }
};
$('print').onclick = () => { if (plan) window.print(); };
// Las guías enlazan a ?ejemplo=<clave>; solo se aceptan claves propias de EXAMPLES.
// Va al final para que exportar, recuperar e imprimir ya tengan manejador.
const requested = new URLSearchParams(globalThis.location?.search ?? '').get('ejemplo');
if (requested && Object.prototype.hasOwnProperty.call(EXAMPLES, requested)) {
  loadDemo(EXAMPLES[requested].aliases, EXAMPLES[requested].tasks);
  template = true;
  $('status').textContent = `Ejemplo «${EXAMPLES[requested].title}» cargado. Sustituye alias y tareas por las vuestras: al cambiar algo deja de ser DEMO. ${$('status').textContent}`;
}
