import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: { /* only applies to the DEVELOPMENT vite server */
      proxy: {
        "/api": {
          target: "http://localhost:5000",
          changeOrigin: true
        }
      },
      port: 3000
    },
    plugins: [react()]
  };
});
