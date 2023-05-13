import replace from '@rollup/plugin-replace';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import html from '@rollup/plugin-html';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/main.tsx',
  output: {
    dir: 'dist',
    entryFileNames: 'static/[name]-[hash:16].js',
    chunkFileNames: 'static/[name]-[hash:16].js',
    assetFileNames: 'static/assets/[name]-[hash:16][extname]',
    format: 'es',
    generatedCode: 'es2015',
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': isProduction
        ? JSON.stringify('production')
        : JSON.stringify('development'),
    }),
    nodeResolve(),
    commonjs(),
    typescript(),
    postcss(),
    isProduction ? terser() : null,
    html(),
  ],
};
