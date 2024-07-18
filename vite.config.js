import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __VUE_OPTIONS_API__: 'false'
  },
  plugins: [vue()],
  resolve: {
    // 路徑別名
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 可以在字串模板中寫很多個css
        additionalData: `
        @import '@/assets/scss/reset.css';
        @import '@/assets/scss/variables.scss';
        @import '@/assets/scss/inheritance.scss';
        @import '@/assets/scss/function.scss';
        @import '@/assets/scss/mixin.scss';
        `
      }
    },
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['last 2 versions', '> 1%']
        })
      ]
    }
  }
});
