import { Link } from 'react-router-dom'
import { getScreen, type ScreenSpec } from '../screens'

// M1 뼈대 화면: STEP7 기획 내용을 보여 주고, 다음 화면으로 이동하는 버튼만 둡니다.
// 실제 기능(착석 감지, 기준 자세, 알림 등)은 M2~M4에서 이 자리에 채웁니다.
export function ScreenPage({ screen }: { screen: ScreenSpec }) {
  return (
    <article className="screen">
      <header className="screen-head">
        <h1>{screen.name}</h1>
        <p className="purpose">{screen.purpose}</p>
        <ul className="features" aria-label="이 화면의 기능">
          {screen.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </header>

      <section className="placeholder" aria-label="화면에 보일 정보">
        <h2>화면에 보일 정보</h2>
        <ul>
          {screen.displayedInfo.map((info) => (
            <li key={info}>{info}</li>
          ))}
        </ul>
        <p className="todo">M2 이후에 실제 내용으로 채울 자리입니다.</p>
      </section>

      <nav className="next" aria-label="다음 이동">
        {screen.next.map((move) => {
          const target = getScreen(move.to)
          return (
            <Link key={move.to} to={target.path} className="next-btn">
              <span className="when">{move.when}</span>
              <span className="to">{target.name} →</span>
            </Link>
          )
        })}
      </nav>

      <details className="memo">
        <summary>기획 메모 (STEP7)</summary>
        <dl>
          <dt>주요 사용자</dt>
          <dd>{screen.primaryUser}</dd>
          <dt>핵심 행동</dt>
          <dd>{screen.keyActions.join(', ')}</dd>
          <dt>빈 상태</dt>
          <dd>{screen.emptyState}</dd>
          <dt>오류 상태</dt>
          <dd>{screen.errorState}</dd>
        </dl>
      </details>
    </article>
  )
}
