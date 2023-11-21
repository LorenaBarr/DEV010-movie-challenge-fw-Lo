import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  build: {
    outDir: 'dist', 
  },
  resolve: {
    alias: {
      '/@': new URL('src', import.meta.url).pathname,
    },
  },
};