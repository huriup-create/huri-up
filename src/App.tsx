import { HashRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import { ScreenPage } from './components/ScreenPage'
import { SCREENS } from './screens'

// GitHub Pages에서는 새로고침 시 404가 나지 않도록 HashRouter(#/주소)를 씁니다.
export default function App() {
  return (
    <HashRouter>
      <div className="app">
        <header className="topbar">
          <span className="brand">HURI UP</span>
          <span className="badge">MVP · M1 뼈대</span>
        </header>

        <nav className="steps" aria-label="화면 목록">
          {SCREENS.map((s, i) => (
            <NavLink key={s.id} to={s.path} end className="step">
              <span className="num">{i + 1}</span>
              {s.name}
            </NavLink>
          ))}
        </nav>

        <main>
          <Routes>
            {SCREENS.map((s) => (
              <Route key={s.id} path={s.path} element={<ScreenPage screen={s} />} />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}
