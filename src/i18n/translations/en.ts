const en = {
  // Layout
  'layout.goBack': 'Go back',
  'layout.manageSupplements': 'Manage supplements',
  'layout.switchLanguage': 'Switch language',

  // Dashboard
  'dashboard.noSupplements': 'No supplements yet',
  'dashboard.addFirst': 'Add your first supplement to start tracking.',
  'dashboard.addSupplement': 'Add Supplement',
  'dashboard.addSupplementShort': '+ Add supplement',
  'dashboard.markedAsTaken': '{{name}} marked as taken',
  'dashboard.resetToUntaken': '{{name}} reset to untaken',

  // Supplement Card
  'card.daily': 'Daily',
  'card.timesDaily': '{{count}}x daily',
  'card.everyNDays': 'Every {{count}} days',
  'card.takenAt': 'Taken at {{time}}',
  'card.notDueToday': 'Not due today',
  'card.missed': 'Missed {{date}}',
  'card.history': 'History',
  'card.refresh': 'Refresh',
  'card.dragToReorder': 'Drag to reorder',
  'card.viewHistory': 'View {{name}} history',
  'card.undoDose': 'Undo {{name}} dose',

  // Supplement List
  'list.manageSupplements': 'Manage Supplements',
  'list.add': '+ Add',
  'list.noSupplements': 'No supplements added yet.',
  'list.edit': 'Edit {{name}}',
  'list.delete': 'Delete {{name}}',
  'list.deleteTitle': 'Delete supplement',
  'list.deleteMessage': 'Are you sure you want to delete "{{name}}"? All dose history will be lost.',

  // Supplement Form
  'form.editSupplement': 'Edit Supplement',
  'form.addSupplement': 'Add Supplement',
  'form.name': 'Name',
  'form.namePlaceholder': 'e.g., Vitamin D',
  'form.color': 'Color',
  'form.selectColor': 'Select color {{color}}',
  'form.pickCustomColor': 'Pick custom color',
  'form.supplementName': 'Supplement Name',
  'form.saveChanges': 'Save Changes',

  // Frequency Picker
  'freq.dosesPerDay': 'Doses per day',
  'freq.howOften': 'How often',
  'freq.everyDay': 'Every day',
  'freq.everyOtherDay': 'Every other day',
  'freq.custom': 'Custom',
  'freq.every': 'Every',
  'freq.days': 'days',

  // History View
  'history.notFound': 'Supplement not found.',
  'history.goBack': 'Go back',
  'history.title': 'History',
  'history.noHistory': 'No history yet. Take your first dose!',

  // Stats Summary
  'stats.trackingSince': 'Tracking since {{date}}',
  'stats.completion': 'Completion',
  'stats.currentStreak': 'Current streak',
  'stats.bestStreak': 'Best streak',
  'stats.dosesTaken': 'Doses taken',
  'stats.dosesMissed': 'Doses missed',
  'stats.days': 'days',

  // History Item
  'historyItem.taken': 'Taken',
  'historyItem.missed': 'Missed',

  // Confirm Dialog
  'dialog.cancel': 'Cancel',
  'dialog.delete': 'Delete',

  // Period labels
  'period.daily': 'Daily',
  'period.morning': 'Morning',
  'period.afternoon': 'Afternoon',
  'period.evening': 'Evening',
} as const;

export type TranslationKey = keyof typeof en;
export default en;
