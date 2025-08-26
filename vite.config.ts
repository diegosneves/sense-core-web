import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5143,
        host: true // Para permitir conexões externas (importante para Docker)
    },
    preview: {
        port: 5143,
        host: true
    }

})
