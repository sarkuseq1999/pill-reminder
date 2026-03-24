import type { TranslationKey } from './en';

const ko: Record<TranslationKey, string> = {
  // Layout
  'layout.goBack': '뒤로가기',
  'layout.manageSupplements': '영양제 관리',
  'layout.switchLanguage': '언어 전환',

  // Dashboard
  'dashboard.noSupplements': '영양제가 없습니다',
  'dashboard.addFirst': '첫 번째 영양제를 추가하여 복용 기록을 시작하세요.',
  'dashboard.addSupplement': '영양제 추가',
  'dashboard.addSupplementShort': '+ 영양제 추가',
  'dashboard.markedAsTaken': '{{name}} 복용 완료',
  'dashboard.resetToUntaken': '{{name}} 미복용으로 변경',

  // Supplement Card
  'card.daily': '매일',
  'card.timesDaily': '하루 {{count}}회',
  'card.everyNDays': '{{count}}일마다',
  'card.takenAt': '{{time}}에 복용',
  'card.notDueToday': '오늘 복용 없음',
  'card.missed': '{{date}} 미복용',
  'card.history': '기록',
  'card.refresh': '취소',
  'card.dragToReorder': '드래그하여 정렬',
  'card.viewHistory': '{{name}} 기록 보기',
  'card.undoDose': '{{name}} 복용 취소',

  // Supplement List
  'list.manageSupplements': '영양제 관리',
  'list.add': '+ 추가',
  'list.noSupplements': '아직 추가된 영양제가 없습니다.',
  'list.edit': '{{name}} 편집',
  'list.delete': '{{name}} 삭제',
  'list.deleteTitle': '영양제 삭제',
  'list.deleteMessage': '"{{name}}"을(를) 삭제하시겠습니까? 모든 복용 기록이 삭제됩니다.',

  // Supplement Form
  'form.editSupplement': '영양제 편집',
  'form.addSupplement': '영양제 추가',
  'form.name': '이름',
  'form.namePlaceholder': '예: 비타민 D',
  'form.color': '색상',
  'form.selectColor': '색상 선택 {{color}}',
  'form.pickCustomColor': '사용자 정의 색상',
  'form.supplementName': '영양제 이름',
  'form.saveChanges': '변경사항 저장',

  // Frequency Picker
  'freq.dosesPerDay': '하루 복용 횟수',
  'freq.howOften': '복용 주기',
  'freq.everyDay': '매일',
  'freq.everyOtherDay': '격일',
  'freq.custom': '사용자 정의',
  'freq.every': '',
  'freq.days': '일마다',

  // History View
  'history.notFound': '영양제를 찾을 수 없습니다.',
  'history.goBack': '뒤로가기',
  'history.title': '기록',
  'history.noHistory': '아직 기록이 없습니다. 첫 복용을 기록하세요!',

  // Stats Summary
  'stats.trackingSince': '{{date}}부터 기록 중',
  'stats.completion': '달성률',
  'stats.currentStreak': '현재 연속',
  'stats.bestStreak': '최고 연속',
  'stats.dosesTaken': '복용 완료',
  'stats.dosesMissed': '미복용',
  'stats.days': '일',

  // History Item
  'historyItem.taken': '복용',
  'historyItem.missed': '미복용',

  // Confirm Dialog
  'dialog.cancel': '취소',
  'dialog.delete': '삭제',

  // Period labels
  'period.daily': '매일',
  'period.morning': '아침',
  'period.afternoon': '오후',
  'period.evening': '저녁',
};

export default ko;
