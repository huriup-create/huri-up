import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CushionArt } from './CushionArt'
import { PressureMap } from './PressureMap'
import './product.css'

// 제품 소개 페이지. 구성은 '애플 웹 구조 역설계도'의 대응표에서 '적용됨/부분 적용' 구간을 따릅니다.
// 기획서에 없는 수치(센서 개수, 배터리, 가격 등)는 지어내지 않고 <Tbd>로 자리만 표시합니다.

function Tbd({ children }: { children: string }) {
  return (
    <span className="tbd" title="팀이 확정해야 하는 값">
      {children}
    </span>
  )
}

const NAV = [
  { id: 'overview', label: '개요' },
  { id: 'sensing', label: '센싱 기술' },
  { id: 'app', label: '앱' },
  { id: 'specs', label: '스펙' },
]

// HashRouter가 주소의 #를 쓰기 때문에, 페이지 안 이동은 링크 대신 스크롤로 처리합니다.
function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

type PostureId = 'good' | 'left' | 'right' | 'away'

const POSTURES: {
  id: PostureId
  tab: string
  left: number
  right: number
  status: string
  reaction: string
}[] = [
  {
    id: 'good',
    tab: '바른 자세',
    left: 50,
    right: 50,
    status: '좌우 압력이 기준 자세와 비슷해요.',
    reaction: '진동 없음. 그대로 공부를 이어가요.',
  },
  {
    id: 'left',
    tab: '왼쪽으로 기울어짐',
    left: 70,
    right: 30,
    status: '왼쪽에 무게가 쏠렸어요.',
    reaction: '이 자세가 정해진 시간 넘게 이어지면 방석이 진동해요.',
  },
  {
    id: 'right',
    tab: '오른쪽으로 기울어짐',
    left: 30,
    right: 70,
    status: '오른쪽에 무게가 쏠렸어요.',
    reaction: '이 자세가 정해진 시간 넘게 이어지면 방석이 진동해요.',
  },
  {
    id: 'away',
    tab: '자리 비움',
    left: 0,
    right: 0,
    status: '방석 위에 앉은 사람이 없어요.',
    reaction: '측정을 잠시 멈추고, 다시 앉으면 자동으로 이어서 측정해요.',
  },
]

const STEPS = [
  { n: '1', k: '감지', d: '압력센서가 앉았는지, 좌우 어느 쪽으로 무게가 쏠렸는지 계속 확인해요.' },
  { n: '2', k: '알림', d: '나만의 기준 자세에서 벗어난 채 시간이 지나면 진동으로 살짝 알려요.' },
  { n: '3', k: '습관', d: '알림을 받고 스스로 고쳐 앉는 경험이 쌓여 바른 착석 습관이 돼요.' },
]

function PostureExplorer() {
  const [active, setActive] = useState<PostureId>('good')
  const p = POSTURES.find((x) => x.id === active) ?? POSTURES[0]
  const total = p.left + p.right

  return (
    <div className="explorer">
      <div className="tabs" role="group" aria-label="자세 선택">
        {POSTURES.map((x) => (
          <button
            key={x.id}
            type="button"
            className="tab"
            aria-pressed={x.id === active}
            onClick={() => setActive(x.id)}
          >
            {x.tab}
          </button>
        ))}
      </div>

      <div className="explorer-body">
        <div className="map-card">
          <PressureMap left={p.left} right={p.right} />
          <p className="map-note">예시 화면 · 실제 값은 방석 시제품으로 측정 후 확정</p>
        </div>

        <div className="explorer-info" aria-live="polite">
          <p className="explorer-status">{p.status}</p>

          <div className="balance">
            <div className="balance-head">
              <span>좌우 균형</span>
              <span>{total === 0 ? '측정 안 함' : `왼쪽 ${p.left} : ${p.right} 오른쪽`}</span>
            </div>
            <div className="balance-bar" aria-hidden="true">
              <span className="balance-left" style={{ width: total === 0 ? '0%' : `${p.left}%` }} />
              <span className="balance-mid" />
            </div>
          </div>

          <div className="reaction">
            <p className="reaction-label">방석 반응</p>
            <p>{p.reaction}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProductPage() {
  return (
    <div className="product">
      <header className="localnav">
        <div className="localnav-inner">
          <button type="button" className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            HURI UP
          </button>
          <nav className="localnav-links" aria-label="페이지 구간">
            {NAV.map((n) => (
              <button key={n.id} type="button" onClick={() => scrollToSection(n.id)}>
                {n.label}
              </button>
            ))}
          </nav>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => scrollToSection('buy')}>
            구매하기
          </button>
        </div>
      </header>

      <main>
        {/* 01 히어로 */}
        <section id="overview" className="sec sec-alt hero">
          <p className="eyebrow">HURI UP 스마트 자세관리 방석</p>
          <h1 className="hero-title">
            자세는 방석한테,
            <br />
            의지는 문제에.
          </h1>
          <p className="lead">
            공부에 집중하는 동안 무너지는 자세를 방석이 먼저 알아차리고,
            <br className="br-wide" /> 진동으로 살짝 알려 줘요.
          </p>
          <div className="hero-cta">
            <button type="button" className="btn btn-primary" onClick={() => scrollToSection('buy')}>
              구매하기
            </button>
            <Link to="/app" className="btn btn-ghost">
              앱 체험해 보기
            </Link>
          </div>
          <div className="hero-art reveal-zoom">
            <CushionArt />
          </div>
        </section>

        {/* 02 하이라이트 (벤토 그리드) */}
        <section className="sec">
          <h2 className="sec-title reveal">일단 핵심부터.</h2>
          <div className="bento">
            <article className="tile tile-wide tile-dark reveal">
              <p className="tile-kicker">진동 알림</p>
              <p className="tile-big">화면 안 봐도 알 수 있게.</p>
              <p className="tile-text">
                기울어진 자세가 이어지면 방석이 진동해요. 공부를 멈추거나 휴대폰을 확인하지 않고도 바로 고쳐 앉을 수
                있어요.
              </p>
            </article>
            <article className="tile reveal">
              <p className="tile-kicker">압력 센서</p>
              <p className="tile-big">
                <Tbd>센서 개수</Tbd>
              </p>
              <p className="tile-text">앉았는지, 좌우 어느 쪽으로 쏠렸는지 계속 읽어요.</p>
            </article>
            <article className="tile reveal">
              <p className="tile-kicker">호환성</p>
              <p className="tile-big">쓰던 의자 그대로.</p>
              <p className="tile-text">학교, 독서실, 스터디카페, 집. 지금 쓰는 의자 위에 올려서 써요.</p>
            </article>
            <article className="tile reveal">
              <p className="tile-kicker">배터리</p>
              <p className="tile-big">
                <Tbd>사용 시간</Tbd>
              </p>
              <p className="tile-text">한 번 충전으로 쓸 수 있는 시간은 시제품 테스트 후 확정해요.</p>
            </article>
            <article className="tile reveal">
              <p className="tile-kicker">세탁 커버</p>
              <p className="tile-big">
                <Tbd>커버 사양</Tbd>
              </p>
              <p className="tile-text">커버 분리·세탁 방식은 아직 정해지지 않았어요.</p>
            </article>
          </div>
        </section>

        {/* 04 제품 스토리: 센싱 기술 */}
        <section id="sensing" className="sec sec-white">
          <p className="eyebrow reveal">센싱 기술</p>
          <h2 className="sec-title reveal">앉은 자세를 압력으로 읽어요.</h2>
          <p className="lead reveal">
            처음 앉을 때 바르게 앉은 압력을 <strong>나만의 기준 자세</strong>로 저장하고, 그 기준과 비교해요.
          </p>
          <PostureExplorer />

          <ol className="steps">
            {STEPS.map((s) => (
              <li key={s.n} className="step-card reveal">
                <span className="step-n">{s.n}</span>
                <p className="step-k">{s.k}</p>
                <p className="step-d">{s.d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 04 제품 스토리: 앱 */}
        <section id="app" className="sec sec-dark">
          <div className="app-split">
            <div>
              <p className="eyebrow eyebrow-dark reveal">앱</p>
              <h2 className="sec-title reveal">내 자세 습관을 한눈에.</h2>
              <ul className="app-points">
                <li className="reveal">
                  <strong>기준 자세 설정</strong>
                  <span>바르게 앉은 압력을 내 기준으로 저장해요.</span>
                </li>
                <li className="reveal">
                  <strong>실시간 자세 상태</strong>
                  <span>지금 바른지, 어느 쪽으로 기울었는지 보여 줘요.</span>
                </li>
                <li className="reveal">
                  <strong>오늘의 착석 기록</strong>
                  <span>앉은 시간, 알림 횟수, 고쳐 앉은 횟수를 정리해요.</span>
                </li>
              </ul>
              <Link to="/app" className="btn btn-primary">
                웹에서 앱 체험해 보기
              </Link>
              <p className="app-note">지금은 방석 없이 시뮬레이터로 흐름을 체험하는 MVP예요.</p>
            </div>
            <div className="phone reveal-zoom" aria-hidden="true">
              <div className="phone-screen">
                <p className="phone-title">자세 측정</p>
                <p className="phone-state">바른 자세</p>
                <div className="phone-bar">
                  <span style={{ width: '50%' }} />
                </div>
                <div className="phone-row">
                  <span>오늘 착석 시간</span>
                  <b>—</b>
                </div>
                <div className="phone-row">
                  <span>자세 알림</span>
                  <b>—</b>
                </div>
                <div className="phone-row">
                  <span>고쳐 앉은 횟수</span>
                  <b>—</b>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 06 스펙 (모델이 하나라 비교 대신 사양표) */}
        <section id="specs" className="sec">
          <h2 className="sec-title reveal">기술 사양</h2>
          <dl className="spec reveal">
            <div>
              <dt>감지 방식</dt>
              <dd>방석 안 압력센서</dd>
            </div>
            <div>
              <dt>감지 항목</dt>
              <dd>착석 여부, 좌우 압력 불균형</dd>
            </div>
            <div>
              <dt>알림 방식</dt>
              <dd>방석 진동 모터</dd>
            </div>
            <div>
              <dt>기준 자세</dt>
              <dd>사용자별로 설정</dd>
            </div>
            <div>
              <dt>사용 환경</dt>
              <dd>기존 의자 위에 올려서 사용</dd>
            </div>
            <div>
              <dt>앱</dt>
              <dd>자세 상태, 착석 기록 확인</dd>
            </div>
            <div>
              <dt>센서 개수</dt>
              <dd>
                <Tbd>확정 필요</Tbd>
              </dd>
            </div>
            <div>
              <dt>크기 · 무게</dt>
              <dd>
                <Tbd>확정 필요</Tbd>
              </dd>
            </div>
            <div>
              <dt>배터리 · 충전</dt>
              <dd>
                <Tbd>확정 필요</Tbd>
              </dd>
            </div>
          </dl>
        </section>

        {/* 마지막 구매 CTA */}
        <section id="buy" className="sec sec-alt buy">
          <h2 className="sec-title reveal">HURI UP 스마트 방석</h2>
          <p className="price reveal">
            <Tbd>가격</Tbd>
          </p>
          <p className="buy-policy reveal">
            <Tbd>배송 / 체험 정책</Tbd>
          </p>
          <div className="hero-cta">
            <button type="button" className="btn btn-primary" disabled>
              판매 준비 중
            </button>
            <Link to="/app" className="btn btn-ghost">
              앱 먼저 체험하기
            </Link>
          </div>
        </section>
      </main>

      {/* 08 푸터 */}
      <footer className="footer">
        <p className="footer-notice">
          HURI UP은 스스로 바른 자세 습관을 만들도록 돕는 제품이에요. 의료적 치료나 강제적인 신체 교정을 위한 제품이
          아니에요.
        </p>
        <ul className="footer-links" aria-label="안내 (준비 중)">
          <li>개인정보처리방침</li>
          <li>이용약관</li>
          <li>고객센터</li>
        </ul>
        <p className="footer-copy">© 2026 HURI UP. 안내 페이지는 준비 중이에요.</p>
      </footer>
    </div>
  )
}
