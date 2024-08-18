// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: 'localhost',
//     port: 3000
//   }
// })



import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3000
  },
  build: {
    rollupOptions: {
      input: 'index.html' // Upewnij się, że ten plik HTML istnieje
    }
  }
})
