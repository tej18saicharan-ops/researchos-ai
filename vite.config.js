import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://api.context.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.error('Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Log target requests for debugging
            console.log(`[Proxy Request] ${req.method} ${req.url} -> ${proxyReq.path}`);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            // Log responses
            console.log(`[Proxy Response] ${proxyRes.statusCode} from target for ${req.url}`);
          });
        }
      }
    }
  }
});
