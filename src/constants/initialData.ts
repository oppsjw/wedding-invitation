import type { WeddingInfo, PhotoItem, AccountItem, GuestbookItem, AdminSettings } from '../types/wedding'

export const DEFAULT_PHOTOS: PhotoItem[] = [
  {
    id: 'photo-1',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    caption: '따스한 햇살 아래, 우리의 첫 시작',
    isCover: true,
    order: 0,
    createdAt: '2026-09-01T00:00:00.000Z'
  },
  {
    id: 'photo-2',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    caption: '서로를 바라보며 미소 짓던 순간',
    isCover: false,
    order: 1,
    createdAt: '2026-09-01T00:00:01.000Z'
  },
  {
    id: 'photo-3',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    caption: '설레는 발걸음으로 함께 걷는 길',
    isCover: false,
    order: 2,
    createdAt: '2026-09-01T00:00:02.000Z'
  },
  {
    id: 'photo-4',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
    caption: '영원한 약속을 손에 담아',
    isCover: false,
    order: 3,
    createdAt: '2026-09-01T00:00:03.000Z'
  },
  {
    id: 'photo-5',
    url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80',
    caption: '꽃향기 가득했던 우리의 오후',
    isCover: false,
    order: 4,
    createdAt: '2026-09-01T00:00:04.000Z'
  },
  {
    id: 'photo-6',
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80',
    caption: '마주 잡은 손, 놓지 않겠습니다',
    isCover: false,
    order: 5,
    createdAt: '2026-09-01T00:00:05.000Z'
  },
  {
    id: 'photo-7',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    caption: '순백의 설렘과 아름다운 동행',
    isCover: false,
    order: 6,
    createdAt: '2026-09-01T00:00:06.000Z'
  },
  {
    id: 'photo-8',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    caption: '함께 웃고 함께 걷는 우리',
    isCover: false,
    order: 7,
    createdAt: '2026-09-01T00:00:07.000Z'
  },
  {
    id: 'photo-9',
    url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
    caption: '언제나 곁에서 든든한 나무처럼',
    isCover: false,
    order: 8,
    createdAt: '2026-09-01T00:00:08.000Z'
  }
]

export const DEFAULT_WEDDING_INFO: WeddingInfo = {
  groom: {
    name: '경주원',
    phone: '010-1234-5678',
    relationRole: '장남',
    fatherName: '경철수',
    motherName: '이영희',
    isFatherDeceased: false,
    isMotherDeceased: false
  },
  bride: {
    name: '양예진',
    phone: '010-9876-5432',
    relationRole: '장녀',
    fatherName: '양민수',
    motherName: '최은경',
    isFatherDeceased: false,
    isMotherDeceased: false
  },
  date: '2026-12-12T18:00:00',
  venue: {
    name: '서울상록회관',
    hall: '상록아트홀',
    address: '서울특별시 강남구 언주로 508',
    addressDetail: '선릉역 5번 출구 도보 5분',
    tel: '02-560-2222',
    mapLat: 37.5041,
    mapLng: 127.0428,
    parkingInfo: '건물 내 지하 2~4층 무료 주차 (2시간 무료 지원)',
    subwayInfo: '2호선 / 수인분당선 선릉역 5번 출구에서 도보 5분 거리 (셔틀버스 운행)',
    busInfo: '간선 141, 242, 360 / 지선 3422, 4434'
  },
  greeting: {
    title: '소중한 분들을 초대합니다',
    content: `서로 마주 보며 키워온 사랑을\n이제 같은 곳을 바라보며 걸어가고자 합니다.\n\n저희 두 사람이 사랑과 믿음으로\n새로운 시작의 첫걸음을 내딛는 자리에\n귀한 걸음으로 축복해 주시면\n더없는 기쁨으로 간직하겠습니다.`,
    subQuote: '서로의 계절이 되어 영원히 피어나겠습니다'
  },
  bgmUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3',
  bgmTitle: 'Romantic Piano Wedding Melody',
  bgmAutoPlay: false,
  kakaoApiKey: ''
}

export const DEFAULT_ACCOUNTS: AccountItem[] = [
  {
    id: 'acc-groom',
    side: 'groom',
    title: '신랑 경주원',
    bankName: '국민은행',
    accountNumber: '123-456-789012',
    accountHolder: '경주원',
    kakaoPayUrl: 'https://qr.kakaopay.com/Ej1234567'
  },
  {
    id: 'acc-groom-father',
    side: 'groomParents',
    title: '신랑 혼주 (부) 경철수',
    bankName: '신한은행',
    accountNumber: '110-123-456789',
    accountHolder: '경철수'
  },
  {
    id: 'acc-bride',
    side: 'bride',
    title: '신부 양예진',
    bankName: '카카오뱅크',
    accountNumber: '3333-01-2345678',
    accountHolder: '양예진',
    kakaoPayUrl: 'https://qr.kakaopay.com/Ej7654321'
  },
  {
    id: 'acc-bride-mother',
    side: 'brideParents',
    title: '신부 혼주 (모) 최은경',
    bankName: '우리은행',
    accountNumber: '1002-123-456789',
    accountHolder: '최은경'
  }
]

export const DEFAULT_GUESTBOOK: GuestbookItem[] = [
  {
    id: 'gb-1',
    author: '친구',
    message: '주원아, 예진씨 결혼 진심으로 축하해! 늘 지금처럼 예쁘게 행복하게 살아라~ 🎉',
    password: '12',
    createdAt: '2026-09-02T14:20:00.000Z'
  },
  {
    id: 'gb-2',
    author: '정혜진',
    message: '세상에서 제일 예쁜 신부 서연이! 사진 너무 예쁘다. 식장에서 보자 💍💐',
    password: '12',
    createdAt: '2026-09-03T18:05:00.000Z'
  },
  {
    id: 'gb-3',
    author: '박준영',
    message: '두 분의 새로운 앞날을 진심으로 축복합니다. 언제나 사랑 가득하시길 바라요!',
    password: '12',
    createdAt: '2026-09-05T11:40:00.000Z'
  }
]

export const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  adminPin: '1234',
  useFirebase: false
}

