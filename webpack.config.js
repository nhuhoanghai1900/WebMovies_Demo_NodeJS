import MiniCssExtractPlugin from "mini-css-extract-plugin"; // xuất file css
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'; // nén CSS
import TerserPlugin from 'terser-webpack-plugin'; // nén JS
import { CleanWebpackPlugin } from 'clean-webpack-plugin'; // chỉ xóa những file do Webpack tạo ra

import path from "path"
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    //đường dẫn nhập
    entry: {
        app: "./src/resources/js/main.js",
    },

    //đường dẫn xuất
    output: {
        filename: "js/[name].[contenthash].js",
        path: path.resolve(__dirname, "src/public/"),
        module: true,
    },

    // hiểu Module
    experiments: {
        outputModule: true,
    },

    module: {
        rules: [
            {
                test: /\.scss$/, // Xử lý SCSS
                use: [
                    MiniCssExtractPlugin.loader, // tách CSS ra file
                    "css-loader",                // hiểu các import trong CSS
                    "sass-loader",               // biên dịch SCSS → CSS
                ],
            },
            {
                test: /\.css$/, // Xử lý file CSS (kể cả từ node_modules)
                type: 'javascript/auto', // Giúp webpack hiểu đây là file CSS thuần
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
        ],
    },

    plugins: [
        // xuất css by MiniCssExtractPlugin
        new MiniCssExtractPlugin({
            filename: "css/app.[contenthash].css", // tên file CSS đầu ra
        }),
        // ngăn ko xóa các thư mục cha sau + con
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*',
                '!img/**',
                '!img/**/*',
                '!uploads/**',
                '!uploads/**/*',
            ],
        }),
    ],

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({ parallel: true }), // nén css
            new TerserPlugin({ parallel: true }), // nén js
        ],
    },

    resolve: {
        fallback: {
            "console": false,
        },
    },
    
    cache: {
        type: 'filesystem',
    },
    stats: 'minimal',
    mode: "production", // "production or development"
    devtool: false,
}
