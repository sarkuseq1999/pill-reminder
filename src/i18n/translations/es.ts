import type { TranslationKey } from './en';

const es: Record<TranslationKey, string> = {
  // Layout
  'layout.goBack': 'Volver',
  'layout.manageSupplements': 'Gestionar suplementos',
  'layout.switchLanguage': 'Cambiar idioma',

  // Dashboard
  'dashboard.noSupplements': 'Sin suplementos',
  'dashboard.addFirst': 'Agrega tu primer suplemento para comenzar el seguimiento.',
  'dashboard.addSupplement': 'Agregar suplemento',
  'dashboard.addSupplementShort': '+ Agregar suplemento',
  'dashboard.markedAsTaken': '{{name}} marcado como tomado',
  'dashboard.resetToUntaken': '{{name}} restablecido a no tomado',

  // Supplement Card
  'card.daily': 'Diario',
  'card.timesDaily': '{{count}}x al día',
  'card.everyNDays': 'Cada {{count}} días',
  'card.takenAt': 'Tomado a las {{time}}',
  'card.notDueToday': 'No corresponde hoy',
  'card.missed': 'Faltó {{date}}',
  'card.history': 'Historial',
  'card.refresh': 'Deshacer',
  'card.dragToReorder': 'Arrastrar para reordenar',
  'card.viewHistory': 'Ver historial de {{name}}',
  'card.undoDose': 'Deshacer dosis de {{name}}',

  // Supplement List
  'list.manageSupplements': 'Gestionar suplementos',
  'list.add': '+ Agregar',
  'list.noSupplements': 'Aún no se han agregado suplementos.',
  'list.edit': 'Editar {{name}}',
  'list.delete': 'Eliminar {{name}}',
  'list.deleteTitle': 'Eliminar suplemento',
  'list.deleteMessage': '¿Estás seguro de que deseas eliminar "{{name}}"? Se perderá todo el historial de dosis.',

  // Supplement Form
  'form.editSupplement': 'Editar suplemento',
  'form.addSupplement': 'Agregar suplemento',
  'form.name': 'Nombre',
  'form.namePlaceholder': 'ej., Vitamina D',
  'form.color': 'Color',
  'form.selectColor': 'Seleccionar color {{color}}',
  'form.pickCustomColor': 'Elegir color personalizado',
  'form.supplementName': 'Nombre del suplemento',
  'form.saveChanges': 'Guardar cambios',

  // Frequency Picker
  'freq.dosesPerDay': 'Dosis por día',
  'freq.howOften': 'Frecuencia',
  'freq.everyDay': 'Cada día',
  'freq.everyOtherDay': 'Cada dos días',
  'freq.custom': 'Personalizado',
  'freq.every': 'Cada',
  'freq.days': 'días',

  // History View
  'history.notFound': 'Suplemento no encontrado.',
  'history.goBack': 'Volver',
  'history.title': 'Historial',
  'history.noHistory': 'Sin historial aún. ¡Toma tu primera dosis!',

  // Stats Summary
  'stats.trackingSince': 'Seguimiento desde {{date}}',
  'stats.completion': 'Cumplimiento',
  'stats.currentStreak': 'Racha actual',
  'stats.bestStreak': 'Mejor racha',
  'stats.dosesTaken': 'Dosis tomadas',
  'stats.dosesMissed': 'Dosis perdidas',
  'stats.days': 'días',

  // History Item
  'historyItem.taken': 'Tomado',
  'historyItem.missed': 'Faltó',

  // Confirm Dialog
  'dialog.cancel': 'Cancelar',
  'dialog.delete': 'Eliminar',

  // Period labels
  'period.daily': 'Diario',
  'period.morning': 'Mañana',
  'period.afternoon': 'Tarde',
  'period.evening': 'Noche',
};

export default es;
