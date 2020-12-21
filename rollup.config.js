import commonjs from 'rollup-plugin-commonjs';
import vue from 'rollup-plugin-vue';
import resolve from '@rollup/plugin-node-resolve';
import minify from 'rollup-plugin-babel-minify';
import babel from "rollup-plugin-babel";
import css from 'rollup-plugin-css-porter';
import cleanup from 'rollup-plugin-cleanup';
// import { uglify } from 'rollup-plugin-uglify';

export default {
    input: 'src/main.js',
    output: {
        file: 'dist/xeditor.min.js',
        name: 'xediter',
        exports: 'named',
        format: 'umd',
        globals: {
            'vuedraggable': 'vuedraggable',
            'xlsx': 'XLSX',
            'moment': 'moment'
        }
    },
    watch: {
        exclude: 'node_modules/**'
    },
    plugins: [
        commonjs(),
        vue({
            css: true,
            compileTemplate: true
        }),
        resolve({
            customResolveOptions: {
                moduleDirectory: 'node_modules'
            }
        }),
        babel({
            exclude: 'node_modules/**', // 防止打包node_modules下的文件
            runtimeHelpers: true, // 使plugin-transform-runtime生效
        }),
        minify(),
        css(),
        cleanup(),
        // uglify(),
    ],
    external: [
        'vuedraggable',
        'xlsx',
        'moment'
    ]
}