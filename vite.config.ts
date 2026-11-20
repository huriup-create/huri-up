import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 상대 경로로 빌드해서 GitHub Pages 저장소 이름이 무엇이든 그대로 동작하게 합니다.
  base: './',
})
