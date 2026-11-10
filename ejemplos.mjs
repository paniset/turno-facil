// Ejemplos editables que usan las guías. Son datos de demostración, no hogares reales.
export const EXAMPLES = {
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
