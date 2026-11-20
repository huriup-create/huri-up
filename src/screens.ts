// STEP7 '페이지 구조와 사용자 흐름'을 코드로 옮긴 화면 목록입니다.
// M1에서는 이 내용으로 화면 뼈대와 이동만 만들고, 실제 기능은 M2부터 채웁니다.

export type ScreenId = 'prepare' | 'seat' | 'measure' | 'alert' | 'corrected' | 'end'

export interface NextMove {
  /** 이동 조건 (STEP7 '다음 이동'의 화살표 앞부분) */
  when: string
  to: ScreenId
}

export interface ScreenSpec {
  id: ScreenId
  path: string
  name: string
  purpose: string
  primaryUser: string
  keyActions: string[]
  displayedInfo: string[]
  emptyState: string
  errorState: string
  features: string[]
  next: NextMove[]
}

export const SCREENS: ScreenSpec[] = [
  {
    id: 'prepare',
    path: '/',
    name: '방석 준비',
    purpose: '방석 전원을 켜고 앱과 연결해서 쓸 준비가 됐는지 확인한다',
    primaryUser: '방석을 처음 켜 보는 고3 수험생 서연',
    keyActions: ['방석 전원 켜기', "'기기 연결' 버튼 누르기"],
    displayedInfo: ['방석 연결 상태(연결 중/연결됨)', "'방석에 앉아 주세요' 안내 문구"],
    emptyState:
      "연결된 방석이 없을 때: \"연결된 방석이 없어요. 방석 전원을 켜고 '기기 연결'을 눌러 주세요.\"",
    errorState:
      '연결에 실패했을 때: "방석을 찾지 못했어요. 전원이 켜져 있는지 확인해 주세요." 문구와 [다시 시도] 버튼',
    features: ['방석 연결 확인'],
    next: [{ when: '연결되면', to: 'seat' }],
  },
  {
    id: 'seat',
    path: '/seat',
    name: '착석 확인',
    purpose: '방석에 앉고, 방석이 착석을 알아차려 측정이 시작됐는지 확인한다',
    primaryUser: '방석 연결을 막 마친 고3 수험생 서연',
    keyActions: ['방석에 앉기', '바른 자세로 몇 초간 앉아 기준 자세 저장하기'],
    displayedInfo: [
      '착석 감지 상태(대기 중/착석됨)',
      '좌우 압력 분포 미리보기',
      '기준 자세 설정 진행률',
      "'측정 중' 표시",
    ],
    emptyState: '아직 앉지 않았을 때: "방석에 앉으면 자동으로 측정이 시작돼요." 안내 문구와 방석 그림',
    // STEP7 원문 끝에 '자세 알림' 화면 내용이 잘못 붙어 있어 그 부분은 뺐습니다.
    errorState:
      '착석이 감지되지 않거나 연결이 끊겼을 때: "앉은 게 감지되지 않아요. 방석 가운데에 앉았는지 확인해 주세요." 문구와 [다시 연결] 버튼',
    features: ['huri up', '기준 자세 설정'],
    next: [{ when: '기준 자세가 저장되면', to: 'measure' }],
  },
  {
    id: 'measure',
    path: '/measure',
    name: '자세 측정',
    purpose: '공부하는 동안 좌우 압력 불균형과 앉은 자세 변화를 계속 감지한다',
    primaryUser: '온라인 강의를 듣거나 문제를 푸는 서연',
    keyActions: ['화면을 보지 않고 공부 계속하기', '필요할 때 측정 일시정지'],
    displayedInfo: [
      '현재 자세 상태(바름/기울어짐)',
      '좌우 압력 분포',
      '오늘 착석 시간',
      '바른 자세 유지 비율',
    ],
    emptyState:
      '자리를 비웠을 때: "잠시 자리를 비웠어요. 다시 앉으면 이어서 측정해요." 문구와 측정 일시정지',
    errorState:
      '측정 중 연결이 끊겼을 때: "방석과 연결이 끊겼어요. 자동으로 다시 연결하고 있어요." 문구와 [다시 연결] 버튼',
    features: ['huri up', '실시간 자세 감지'],
    next: [
      { when: '한쪽으로 기운 채 일정 시간이 지나면', to: 'alert' },
      { when: '자리에서 일어나면', to: 'end' },
    ],
  },
  {
    id: 'alert',
    path: '/alert',
    name: '자세 알림',
    purpose: '한쪽으로 기운 채 일정 시간이 지나면 방석 진동으로 자세가 무너졌음을 알린다',
    primaryUser: '문제 풀이에 집중하다 몸이 한쪽으로 기운 서연',
    keyActions: ['진동을 느끼고, 공부를 멈추지 않은 채 자세가 무너졌음을 알아차리기'],
    displayedInfo: ['진동 알림 발생 표시', '기울어진 방향(왼쪽/오른쪽)', '기울어진 채 지난 시간'],
    emptyState: "알림이 없을 때: 화면에는 '바른 자세 유지 중'만 표시하고 진동은 울리지 않음",
    errorState:
      '진동을 보낼 수 없을 때(방석 배터리 부족 등): "방석 진동을 보낼 수 없어요. 배터리를 확인해 주세요." 문구와 휴대폰 진동으로 대신 알림',
    features: ['진동 자세 알림'],
    next: [{ when: '자세를 고쳐 앉으면', to: 'corrected' }],
  },
  {
    id: 'corrected',
    path: '/corrected',
    name: '교정 확인',
    purpose: '바르게 고쳐 앉았을 때 압력 분포가 돌아온 것을 확인하고 알림을 멈춘다',
    primaryUser: '진동을 느끼고 자세를 고쳐 앉은 서연',
    keyActions: ['화면 조작 없이 허리를 펴고 바르게 고쳐 앉기'],
    displayedInfo: ["'자세가 돌아왔어요' 표시", '기준 자세 대비 압력 분포', '오늘 교정 횟수'],
    emptyState: '오늘 교정 기록이 없을 때: "오늘은 아직 자세 알림이 없었어요. 잘하고 있어요!" 문구',
    errorState:
      '고쳐 앉아도 기준 자세로 돌아오지 않을 때: "기준 자세와 달라요. 기준 자세를 다시 저장할까요?" 문구와 [기준 자세 다시 설정] 버튼',
    features: ['자세 교정 확인'],
    next: [{ when: '바른 자세가 확인되면', to: 'measure' }],
  },
  {
    id: 'end',
    path: '/end',
    name: '측정 종료',
    purpose: '공부를 마치면 측정을 끝내고 오늘의 자세 기록을 확인한다',
    primaryUser: '공부를 마치고 자리에서 일어난 서연',
    keyActions: ['자리에서 일어나기(자동 종료) 또는 [측정 종료] 누르기', '오늘 기록 보기'],
    displayedInfo: ['오늘 총 착석 시간', '바른 자세 유지 비율', '자세 알림·교정 횟수'],
    emptyState:
      '측정 기록이 너무 짧을 때: "오늘 기록이 아직 부족해요. 다음에도 방석에 앉아 공부해 보세요." 문구',
    errorState: '기록을 불러오지 못했을 때: "오늘 기록을 불러오지 못했어요." 문구와 [다시 시도] 버튼',
    features: ['착석 기록 확인'],
    next: [{ when: '다음 공부 때 방석에 앉으면', to: 'seat' }],
  },
]

export function getScreen(id: ScreenId): ScreenSpec {
  const screen = SCREENS.find((s) => s.id === id)
  if (!screen) throw new Error(`알 수 없는 화면: ${id}`)
  return screen
}
