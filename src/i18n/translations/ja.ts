import type { TranslationKey } from './en';

const ja: Record<TranslationKey, string> = {
  // Layout
  'layout.goBack': '戻る',
  'layout.manageSupplements': 'サプリメント管理',
  'layout.switchLanguage': '言語を切り替え',

  // Dashboard
  'dashboard.noSupplements': 'サプリメントがありません',
  'dashboard.addFirst': '最初のサプリメントを追加して記録を始めましょう。',
  'dashboard.addSupplement': 'サプリメントを追加',
  'dashboard.addSupplementShort': '+ サプリメントを追加',
  'dashboard.markedAsTaken': '{{name}} を服用済みにしました',
  'dashboard.resetToUntaken': '{{name}} を未服用に戻しました',

  // Supplement Card
  'card.daily': '毎日',
  'card.timesDaily': '1日{{count}}回',
  'card.everyNDays': '{{count}}日ごと',
  'card.takenAt': '{{time}} に服用',
  'card.notDueToday': '今日は服用日ではありません',
  'card.missed': '{{date}} 未服用',
  'card.history': '履歴',
  'card.refresh': '取消',
  'card.dragToReorder': 'ドラッグで並び替え',
  'card.viewHistory': '{{name}} の履歴を見る',
  'card.undoDose': '{{name}} の服用を取消',

  // Supplement List
  'list.manageSupplements': 'サプリメント管理',
  'list.add': '+ 追加',
  'list.noSupplements': 'サプリメントがまだ追加されていません。',
  'list.edit': '{{name}} を編集',
  'list.delete': '{{name}} を削除',
  'list.deleteTitle': 'サプリメントを削除',
  'list.deleteMessage': '「{{name}}」を削除してもよろしいですか？すべての服用履歴が失われます。',

  // Supplement Form
  'form.editSupplement': 'サプリメントを編集',
  'form.addSupplement': 'サプリメントを追加',
  'form.name': '名前',
  'form.namePlaceholder': '例：ビタミンD',
  'form.color': '色',
  'form.selectColor': '色を選択 {{color}}',
  'form.pickCustomColor': 'カスタム色を選択',
  'form.supplementName': 'サプリメント名',
  'form.saveChanges': '変更を保存',

  // Frequency Picker
  'freq.dosesPerDay': '1日の服用回数',
  'freq.howOften': '服用頻度',
  'freq.everyDay': '毎日',
  'freq.everyOtherDay': '1日おき',
  'freq.custom': 'カスタム',
  'freq.every': '',
  'freq.days': '日ごと',

  // History View
  'history.notFound': 'サプリメントが見つかりません。',
  'history.goBack': '戻る',
  'history.title': '履歴',
  'history.noHistory': 'まだ履歴がありません。最初の服用を記録しましょう！',

  // Stats Summary
  'stats.trackingSince': '{{date}} から記録中',
  'stats.completion': '達成率',
  'stats.currentStreak': '現在の連続',
  'stats.bestStreak': '最高連続',
  'stats.dosesTaken': '服用済み',
  'stats.dosesMissed': '未服用',
  'stats.days': '日',

  // History Item
  'historyItem.taken': '服用済み',
  'historyItem.missed': '未服用',

  // Confirm Dialog
  'dialog.cancel': 'キャンセル',
  'dialog.delete': '削除',

  // Period labels
  'period.daily': '毎日',
  'period.morning': '朝',
  'period.afternoon': '昼',
  'period.evening': '夜',
};

export default ja;
