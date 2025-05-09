"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Impor konfigurasi i18n dari file .js
// Kita hanya butuh properti 'i18n' dari objek yang diekspor
const next_i18next_config_js_1 = require("./next-i18next.config.js");
const nextConfig = {
    reactStrictMode: true,
    // Sekarang 'i18n' sudah terdefinisi dalam scope ini,
    // jadi shorthand property name bisa digunakan (atau bisa juga ditulis i18n: i18n)
    i18n: next_i18next_config_js_1.i18n,
    /* config options here */
    // Tambahkan ini jika Anda menggunakan gambar eksternal (misal dari CDN atau API lain)
    // images: {
    //   remotePatterns: [
    //     {
    //       protocol: 'https',
    //       hostname: 'example.com', // Ganti dengan hostname sumber gambar Anda
    //       port: '',
    //       pathname: '/images/**', // Ganti dengan path pattern gambar Anda
    //     },
    //   ],
    // },
    // Jika menggunakan Font Awesome SVG Core dengan Next.js App Router,
    // mungkin perlu konfigurasi tambahan untuk mencegah error terkait server components:
    // experimental: {
    //   serverComponentsExternalPackages: ['@fortawesome/fontawesome-svg-core'],
    // },
};
exports.default = nextConfig;
//# sourceMappingURL=next.config.js.map