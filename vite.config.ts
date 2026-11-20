import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// 보안 정책(CSP): 우리 사이트 파일 말고 다른 곳의 스크립트·글꼴·연결을 막습니다.
// GitHub Pages는 서버 헤더를 바꿀 수 없어서 <meta>로 넣습니다.
// 개발 서버는 인라인 스크립트를 쓰기 때문에 배포용 빌드에만 넣습니다.
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join('; ')

function securityHeaders(): Plugin {
  return {
    name: 'huri-up-security-meta',
    apply: 'build',
    transformIndexHtml() {
      return [
        {
          tag: 'meta',
          attrs: { 'http-equiv': 'Content-Security-Policy', content: CONTENT_SECURITY_POLICY },
          injectTo: 'head-prepend',
        },
        {
          tag: 'meta',
          attrs: { name: 'referrer', content: 'strict-origin-when-cross-origin' },
          injectTo: 'head-prepend',
        },
      ]
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), securityHeaders()],
  // 상대 경로로 빌드해서 GitHub Pages 저장소 이름이 무엇이든 그대로 동작하게 합니다.
  base: './',
})
