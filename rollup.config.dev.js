import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import autoprefixer from 'autoprefixer';
import copy from 'rollup-plugin-copy';

import pkg from './package.json';

export default [
  {
    input: 'src/lib/index.js',
    output: {
      name: 'EmailsInput',
      file: pkg.main,
      format: 'iife',
      extend: true,
    },
    plugins: [
      babel({ babelHelpers: 'bundled' }),
      postcss({
        extract: true,
        plugins: [autoprefixer()],
      }),
    ],
  },

  {
    input: 'src/demo/demo.js',
    output: {
      file: 'dist/demo/demo.js',
      format: 'iife',
    },
    plugins: [
      babel({ babelHelpers: 'bundled' }),
      postcss({
        extract: true,
        plugins: [autoprefixer()],
      }),
      serve('dist'),
      livereload(),
      copy({
        targets: [{ src: 'src/demo/index.html', dest: 'dist' }],
      }),
    ],
  },
];
