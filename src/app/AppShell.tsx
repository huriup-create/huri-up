import { Link, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import { SCREENS } from '../screens'
import { ScreenPage } from './ScreenPage'
import './app.css'

// MVP 앱(6개 화면). 제품 소개 페이지의 '앱 체험해 보기'에서 들어옵니다.
export function AppShell() {
  return (
    <div className="appshell">
      <header className="app-top">
        <Link to="/" className="app-back">
          ‹ 제품 소개
        </Link>
        <span className="app-brand">HURI UP</span>
        <span className="app-badge">MVP 체험</span>
      </header>

      <nav className="app-steps" aria-label="화면 목록">
        {SCREENS.map((s, i) => (
          <NavLink key={s.id} to={s.path} end className="app-step">
            <span className="num">{i + 1}</span>
            {s.name}
          </NavLink>
        ))}
      </nav>

      <main>
        <Routes>
          {/* '/app/seat' → 'seat'처럼 /app 아래의 상대 경로로 등록합니다 */}
          {SCREENS.map((s) => {
            const sub = s.path.replace(/^\/app\/?/, '')
            return sub ? (
              <Route key={s.id} path={sub} element={<ScreenPage screen={s} />} />
            ) : (
              <Route key={s.id} index element={<ScreenPage screen={s} />} />
            )
          })}
          <Route path="*" element={<Navigate to="/app" replace />} />
        </Routes>
      </main>
    </div>
  )
}
