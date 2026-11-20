import { useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AppShell } from './app/AppShell'
import { ProductPage } from './product/ProductPage'

// 화면을 옮길 때마다 맨 위에서 시작합니다.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// GitHub Pages에서는 새로고침 시 404가 나지 않도록 HashRouter(#/주소)를 씁니다.
//   #/        제품 소개 페이지
//   #/app/... MVP 앱 6개 화면
export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/app/*" element={<AppShell />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
