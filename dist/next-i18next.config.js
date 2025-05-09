"use strict";
// next-i18next.config.js
module.exports = {
    i18n: {
        defaultLocale: "en",
        locales: ["en", "id"],
    },
    localePath: typeof window === "undefined"
        ? // eslint-disable-next-line @typescript-eslint/no-require-imports -- Diperlukan untuk resolusi path sisi server
            require("path").resolve("./public/locales")
        : "/locales",
    reloadOnPrerender: process.env.NODE_ENV === "development",
};
//# sourceMappingURL=next-i18next.config.js.map