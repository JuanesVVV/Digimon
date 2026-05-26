// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // O lo que estés usando

export default defineConfig({
  plugins: [react()],
  base: '/Digimon/', // <--- ESTA ES LA CLAVE
})
