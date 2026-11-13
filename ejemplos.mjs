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
  }
};
