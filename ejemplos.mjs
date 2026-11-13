// Ejemplos editables que usan las guías. Son datos de demostración, no hogares reales.
export const EXAMPLES = {
  'piso-3': {
    title: 'Piso compartido de tres habitaciones',
    aliases: ['Hab. 1', 'Hab. 2', 'Hab. 3'],
    tasks: [
      { name: 'Limpiar el baño', minutes: 40, weight: 4 },
      { name: 'Cocina: encimera, fogones y fregadero', minutes: 30, weight: 3 },
      { name: 'Fregar suelos de cocina, salón y pasillo', minutes: 25, weight: 3 },
      { name: 'Nevera y microondas', minutes: 20, weight: 3 },
      { name: 'Compra común (papel, limpieza)', minutes: 25, weight: 2 },
      { name: 'Aspirar salón y pasillo', minutes: 15, weight: 2 },
      { name: 'Basura y reciclaje', minutes: 10, weight: 2 }
    ]
  },
  'piso-5': {
    title: 'Piso compartido de cinco habitaciones',
    aliases: ['Hab. 1', 'Hab. 2', 'Hab. 3', 'Hab. 4', 'Hab. 5'],
    tasks: [
      { name: 'Limpiar el baño grande', minutes: 40, weight: 4 },
      { name: 'Limpiar el aseo', minutes: 25, weight: 4 },
      { name: 'Fregar suelos de zonas comunes', minutes: 40, weight: 3 },
      { name: 'Cocina: encimera, fogones y fregadero', minutes: 35, weight: 3 },
      { name: 'Limpiar la nevera compartida', minutes: 25, weight: 3 },
      { name: 'Horno y microondas', minutes: 20, weight: 3 },
      { name: 'Compra común (papel, limpieza)', minutes: 30, weight: 2 },
      { name: 'Lavar trapos, alfombrillas y toallas comunes', minutes: 30, weight: 2 },
      { name: 'Aspirar salón, pasillo y entrada', minutes: 25, weight: 2 },
      { name: 'Basura y reciclaje', minutes: 20, weight: 2 },
      { name: 'Ordenar el salón', minutes: 10, weight: 1 }
    ]
  },
  'piso-compartido': {
    title: 'Piso compartido de cuatro habitaciones',
    aliases: ['Hab. 1', 'Hab. 2', 'Hab. 3', 'Hab. 4'],
    tasks: [
      { name: 'Limpiar el baño', minutes: 40, weight: 4 },
      { name: 'Cocina: encimera, fogones y fregadero', minutes: 35, weight: 3 },
      { name: 'Fregar suelos de zonas comunes', minutes: 30, weight: 3 },
      { name: 'Compra común (papel, limpieza)', minutes: 30, weight: 2 },
      { name: 'Limpiar la nevera compartida', minutes: 20, weight: 3 },
      { name: 'Aspirar salón y pasillo', minutes: 20, weight: 2 },
      { name: 'Basura y reciclaje', minutes: 15, weight: 2 },
      { name: 'Ordenar el salón', minutes: 10, weight: 1 }
    ]
  },
  pareja: {
    title: 'Pareja que reparte la semana',
    aliases: ['Alex', 'Sam'],
    tasks: [
      { name: 'Cenas de lunes a miércoles', minutes: 90, weight: 3 },
      { name: 'Cenas de jueves y viernes', minutes: 60, weight: 3 },
      { name: 'Limpiar el baño', minutes: 40, weight: 4 },
      { name: 'Cocina y suelos', minutes: 50, weight: 3 },
      { name: 'Compra semanal', minutes: 60, weight: 2 },
      { name: 'Lavadoras y tender', minutes: 60, weight: 2 },
      { name: 'Gestiones, facturas y citas', minutes: 30, weight: 3 },
      { name: 'Doblar y guardar ropa', minutes: 40, weight: 2 },
      { name: 'Basura y reciclaje', minutes: 15, weight: 1 }
    ]
  },
  // Tareas diarias agrupadas por bloques de días; quincenales y mensuales en dos huecos semanales que rotan.
  'casa-frecuencias': {
    title: 'Casa de tres personas con tareas diarias, semanales y mensuales',
    aliases: ['Persona 1', 'Persona 2', 'Persona 3'],
    tasks: [
      { name: 'Limpiar el baño completo', minutes: 40, weight: 4 },
      { name: 'Recoger cocina y platos (lunes a jueves)', minutes: 60, weight: 2 },
      { name: 'Recoger cocina y platos (viernes a domingo)', minutes: 45, weight: 2 },
      { name: 'Encimera, fogones y fregadero a fondo', minutes: 30, weight: 3 },
      { name: 'Fregar suelos de toda la casa', minutes: 40, weight: 3 },
      { name: 'Aspirar o barrer', minutes: 30, weight: 2 },
      { name: 'Lavadoras y tender', minutes: 45, weight: 2 },
      { name: 'Doblar y guardar ropa', minutes: 30, weight: 2 },
      { name: 'Compra semanal', minutes: 60, weight: 2 },
      { name: 'Menús y lista de la compra', minutes: 20, weight: 2 },
      { name: 'Basura y reciclaje (toda la semana)', minutes: 35, weight: 1 },
      { name: 'Ordenar el salón (toda la semana)', minutes: 70, weight: 1 },
      { name: 'Hueco quincenal: sábanas (semana impar) o polvo (semana par)', minutes: 20, weight: 2 },
      { name: 'Hueco mensual: tarea de la lista mensual', minutes: 35, weight: 3 }
    ]
  },
  // Familia: un reparto para los adultos y otro, aparte, para dos hijos mayores.
  familia: {
    title: 'Familia: reparto entre dos adultos',
    aliases: ['Adulto 1', 'Adulto 2'],
    tasks: [
      { name: 'Cenas de lunes a miércoles', minutes: 105, weight: 3 },
      { name: 'Cenas de jueves a domingo', minutes: 140, weight: 3 },
      { name: 'Baños y pijamas (lunes a miércoles)', minutes: 90, weight: 3 },
      { name: 'Baños y pijamas (jueves a domingo)', minutes: 120, weight: 3 },
      { name: 'Llevar y recoger de extraescolares', minutes: 120, weight: 2 },
      { name: 'Lavadoras, tender y doblar', minutes: 120, weight: 2 },
      { name: 'Compra semanal', minutes: 75, weight: 2 },
      { name: 'Limpiar los baños', minutes: 50, weight: 4 },
      { name: 'Cocina y suelos', minutes: 60, weight: 3 },
      { name: 'Mochilas, agenda y avisos del colegio', minutes: 40, weight: 3 },
      { name: 'Citas médicas, tutorías y papeles', minutes: 30, weight: 3 }
    ]
  },
  'hijos-mayores': {
    title: 'Familia: tareas que rotan entre dos hijos mayores',
    aliases: ['Hijo/a 1', 'Hijo/a 2'],
    tasks: [
      { name: 'Poner y quitar la mesa (toda la semana)', minutes: 70, weight: 1 },
      { name: 'Vaciar el lavavajillas (toda la semana)', minutes: 35, weight: 2 },
      { name: 'Guardar la ropa limpia de todos', minutes: 20, weight: 2 },
      { name: 'Aspirar el salón', minutes: 20, weight: 2 },
      { name: 'Sacar la basura y el reciclaje', minutes: 20, weight: 1 },
      { name: 'Regar las plantas', minutes: 10, weight: 1 }
    ]
  }
};
