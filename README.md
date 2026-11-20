# HURI UP — 스마트 자세관리 방석 MVP

장시간 공부하는 수험생이 화면을 보지 않고도 자세가 무너진 걸 알아차리고, 스스로 바르게 고쳐 앉도록 돕는 스마트 방석의 웹 MVP입니다.

- 배포 주소: https://huriup-create.github.io/huri-up/
  - `#/` 제품 소개 페이지
  - `#/app` MVP 앱 체험 (6개 화면)
- 개발 계획: [docs/MVP-개발-계획.md](docs/MVP-개발-계획.md)
- 기획 문서(STEP1~7, 페르소나, 애플 웹 구조 역설계도 등): [docs/기획/](docs/기획/)

## 진행 상황

| 단계 | 내용 | 상태 |
|---|---|---|
| M1 | 뼈대: 6개 화면 + 화면 이동 + GitHub Pages 자동 배포 | ✅ 완료 |
| M1+ | 제품 소개 페이지 ('애플 웹 구조 역설계도' 기반) + 공통 디자인 | ✅ 완료 |
| M2 | 방석 시뮬레이터, 착석 감지(huri up), 기준 자세 저장 | 예정 |
| M3 | 자세 판단, 진동 알림, 교정 확인 | 예정 |
| M4 | 오늘 기록, 빈 상태·오류 상태 | 예정 |
| M5 | 휴대폰 화면 다듬기, 설정, 시연 안내 | 예정 |

## 내 컴퓨터에서 실행하기

Node.js 20.19 이상(또는 22.12 이상)이 필요합니다.

```bash
npm install     # 처음 한 번
npm run dev     # 개발 서버 실행 → 터미널에 나오는 주소를 브라우저로 열기
npm run build   # 배포용 파일 만들기 (dist/ 폴더)
```

## GitHub Pages로 배포하기 (처음 한 번만)

1. GitHub에서 새 저장소를 **공개(Public)**로 만듭니다. 예: `huri-up`
2. 이 폴더를 저장소에 올립니다.
   ```bash
   git remote add origin https://github.com/<계정>/<저장소>.git
   git push -u origin main
   ```
3. 저장소 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 바꿉니다.
4. **Actions** 탭에서 "Deploy to GitHub Pages"가 초록색으로 끝나면 `https://<계정>.github.io/<저장소>/`에서 앱이 열립니다.

이후에는 `main` 브랜치에 올릴 때마다 자동으로 다시 배포됩니다.

## 폴더 구조

```
src/
  index.css               디자인 토큰(색·글꼴·둥글기·그림자)과 공통 버튼
  App.tsx                 주소 연결 (#/ 제품 소개, #/app/... 앱)
  product/                제품 소개 페이지 (내비, 히어로, 하이라이트, 센싱 기술, 앱, 스펙, 구매, 푸터)
  app/                    MVP 앱 화면 (M2부터 실제 기능으로 채움)
  screens.ts              STEP7 화면 6개의 기획 내용(목적, 표시 정보, 다음 이동 등)
.github/workflows/deploy.yml  GitHub Pages 자동 배포
docs/                     개발 계획과 기획 문서
```

## 제품 소개 페이지에서 채워야 할 값

기획서에 없는 값은 지어내지 않고 점선 상자(`.tbd`)로 자리만 표시했습니다. 확정되면 `src/product/ProductPage.tsx`에서 `<Tbd>` 부분을 바꿔 주세요.

- 센서 개수, 배터리 사용 시간·충전 방식, 세탁 커버 사양, 크기·무게
- 가격, 배송 / 체험 정책 (그 전까지 구매 버튼은 '판매 준비 중'으로 비활성)
- 개인정보처리방침, 이용약관, 고객센터 페이지
- 제품 사진 (지금은 `src/product/CushionArt.tsx`의 일러스트)
