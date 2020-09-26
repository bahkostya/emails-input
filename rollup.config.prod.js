import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';

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
        minimize: true,
        plugins: [autoprefixer()],
      }),
      terser(),
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
        minimize: true,
        plugins: [autoprefixer()],
      }),
      copy({
        targets: [{ src: 'src/demo/index.html', dest: 'dist' }],
      }),
      terser(),
    ],
  },
];
