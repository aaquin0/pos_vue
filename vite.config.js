import path, { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteSvgIcons from 'vite-plugin-svg-icons'

//inject title
import { createHtmlPlugin } from 'vite-plugin-html'

//setup name
import VueSetupExtend from 'vite-plugin-vue-setup-extend-plus'

//auto import vue https://www.npmjs.com/package/unplugin-auto-import
import AutoImport from 'unplugin-auto-import/vite'

import setting from './src/settings'

const pathSrc = path.resolve(__dirname, 'src')
export default ({ command, mode }) => {
    /*
    * serve
    * */
    return {
        //detail to look https://vitejs.cn/config/#base
        base: setting.viteBasePath,
        //define global var
        define: {
            //fix "path" module issue
            'process.platform': null,
            'process.version': null,
            GLOBAL_STRING: JSON.stringify('This is a global var from vite.config.js define'),
            GLOBAL_VAR: {
                test: 'This is a global var from vite.config.js define'
            }
        },
        clearScreen: false,
        server: {
            hmr: { overlay: false }, // Disable or configure HMR connections Set server.hmr.overlay to false to disable the server error masking layer
            // Service configuration
            port: 5002, // Type: number specifies the server port;
            open: true, // type: boolean | string Automatically open the application in the browser when the server starts;
            cors: true // Type: boolean | CorsOptions Configure CORS for the development server. Enabled by default and allows any origin
        },
        plugins: [
            vue({ reactivityTransform: true }),
            vueJsx(),
            viteSvgIcons({
                // config svg dir that can config multi
                iconDirs: [], //[path.resolve(process.cwd(), 'path/to/dir')],
                // appoint svg icon using mode
                symbolId: 'icon-[dir]-[name]'
            }),
            VueSetupExtend(),
            //https://github.com/antfu/unplugin-auto-import/blob/HEAD/src/types.ts
            AutoImport({
                imports: [
                    'vue',
                    'pinia',
                    'vue-router',
                    {
                        '@/utils/axiosReq': ['axiosReq']
                    }
                ],
                eslintrc: {
                    enabled: true, // Default `false`
                    filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
                    globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
                },
                dts: true //auto generation auto-imports.d.ts file
            }),
            // auto config of index.html title
            createHtmlPlugin({
                inject: {
                    // Inject data into ejs template
                    data: {
                        title: setting.title
                    }
                }
            })
        ],
        build: {
            minify: 'terser',
            brotliSize: false,
            // Eliminate pack size over 500kb warning
            chunkSizeWarningLimit: 5000,
            // remote console.log in prod
            terserOptions: {
                // detail to look https://terser.org/docs/api-reference#compress-options
                compress: {
                    drop_console: false,
                    pure_funcs: ['console.log', 'console.info'],
                    drop_debugger: true
                }
            },
            // build assets Separate
            assetsDir: 'static/assets',
            rollupOptions: {
                output: {
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
                }
            }
        },
        resolve: {
            alias: {
                '~/': `${pathSrc}/`,
                '@/': `${pathSrc}/`,
                // '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
            }
            // https://github.com/vitejs/vite/issues/6026
            // extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs']
        },
        css: {
            preprocessorOptions: {
                // define global scss variable
                scss: {
                    additionalData: `@use '@/assets/sass/app.scss' as * ;`
                }
            }
        },
        optimizeDeps: {
            include: ['moment-mini']
        },
        pwa: {
            workboxPluginMode: "InjectManifest",
            workboxOptions: {
                skipWaiting: true,
                swSrc: "./src/service-worker.js"
            }
        }
    }
}
