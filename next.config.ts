import type { NextConfig } from "next";
// Impor konfigurasi i18n dari file .js
// Kita hanya butuh properti 'i18n' dari objek yang diekspor
import { i18n } from "./next-i18next.config.js";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Sekarang 'i18n' sudah terdefinisi dalam scope ini,
  // jadi shorthand property name bisa digunakan (atau bisa juga ditulis i18n: i18n)
  i18n,
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

export default nextConfig;
