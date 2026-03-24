import type { TranslationKey } from './en';

const zh: Record<TranslationKey, string> = {
  // Layout
  'layout.goBack': '返回',
  'layout.manageSupplements': '管理保健品',
  'layout.switchLanguage': '切换语言',

  // Dashboard
  'dashboard.noSupplements': '暂无保健品',
  'dashboard.addFirst': '添加您的第一个保健品开始追踪。',
  'dashboard.addSupplement': '添加保健品',
  'dashboard.addSupplementShort': '+ 添加保健品',
  'dashboard.markedAsTaken': '{{name}} 已标记为已服用',
  'dashboard.resetToUntaken': '{{name}} 已重置为未服用',

  // Supplement Card
  'card.daily': '每日',
  'card.timesDaily': '每日{{count}}次',
  'card.everyNDays': '每{{count}}天',
  'card.takenAt': '服用于 {{time}}',
  'card.notDueToday': '今日无需服用',
  'card.missed': '{{date}} 漏服',
  'card.history': '历史',
  'card.refresh': '撤销',
  'card.dragToReorder': '拖动排序',
  'card.viewHistory': '查看 {{name}} 历史',
  'card.undoDose': '撤销 {{name}} 服药',

  // Supplement List
  'list.manageSupplements': '管理保健品',
  'list.add': '+ 添加',
  'list.noSupplements': '暂未添加保健品。',
  'list.edit': '编辑 {{name}}',
  'list.delete': '删除 {{name}}',
  'list.deleteTitle': '删除保健品',
  'list.deleteMessage': '确定要删除"{{name}}"吗？所有服药记录将丢失。',

  // Supplement Form
  'form.editSupplement': '编辑保健品',
  'form.addSupplement': '添加保健品',
  'form.name': '名称',
  'form.namePlaceholder': '例如：维生素D',
  'form.color': '颜色',
  'form.selectColor': '选择颜色 {{color}}',
  'form.pickCustomColor': '自定义颜色',
  'form.supplementName': '保健品名称',
  'form.saveChanges': '保存更改',

  // Frequency Picker
  'freq.dosesPerDay': '每日剂量',
  'freq.howOften': '服用频率',
  'freq.everyDay': '每天',
  'freq.everyOtherDay': '隔天',
  'freq.custom': '自定义',
  'freq.every': '每',
  'freq.days': '天',

  // History View
  'history.notFound': '未找到保健品。',
  'history.goBack': '返回',
  'history.title': '历史记录',
  'history.noHistory': '暂无记录。服用第一剂吧！',

  // Stats Summary
  'stats.trackingSince': '自 {{date}} 开始追踪',
  'stats.completion': '完成率',
  'stats.currentStreak': '当前连续',
  'stats.bestStreak': '最佳连续',
  'stats.dosesTaken': '已服用',
  'stats.dosesMissed': '已漏服',
  'stats.days': '天',

  // History Item
  'historyItem.taken': '已服用',
  'historyItem.missed': '漏服',

  // Confirm Dialog
  'dialog.cancel': '取消',
  'dialog.delete': '删除',

  // Period labels
  'period.daily': '每日',
  'period.morning': '早上',
  'period.afternoon': '下午',
  'period.evening': '晚上',
};

export default zh;
