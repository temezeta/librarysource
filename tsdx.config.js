const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
    // Lisätään Rollup-konfiguraatioon PostCSS ja sen lisäosat
    rollup(config, options) {
        config.plugins.push(
            postcss({
                plugins: [
                    autoprefixer(),
                    cssnano({
                        preset: 'default'
                    })
                ],
                // Injektoi tyylit komponentteihin
                inject: true,
                // Kirjoita tyylit vain ensimmäiselle nipulle,
                // turhien tiedostojen välttämiseksi
                extract: !!options.writeMeta
            })
        );
        return config;
    }
};
