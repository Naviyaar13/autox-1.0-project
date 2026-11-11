import babel from '@rolldown/plugin-babel'
import { lingui } from '@lingui/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    lingui(),
    babel({
      plugins: ['@lingui/babel-plugin-lingui-macro'],
    }),
  ],
})
