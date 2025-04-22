import MiniCssExtractPlugin from "mini-css-extract-plugin"; // xuất file css
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'; // nén CSS
import TerserPlugin from 'terser-webpack-plugin'; // nén JS
import { CleanWebpackPlugin } from 'clean-webpack-plugin'; // chỉ xóa những file do Webpack tạo ra

import path from "path"
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    entry: {
        app: "./src/resources/js/main.js",
    },

    output: {
        filename: "js/[name].[contenthash].js",
        path: path.resolve(__dirname, "src/public/"),
        module: true,
    },

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
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/app.[contenthash].css", // tên file CSS đầu ra
        }),
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
            new CssMinimizerPlugin(), // nén css
            new TerserPlugin(), // nén js
        ],
    },

    resolve: {
        fallback: {
            "console": false,
        },
    },

    stats: 'minimal',
    mode: "production", // "production or development"
}
