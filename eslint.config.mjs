// // @ts-check
// import withNuxt from './.nuxt/eslint.config.mjs'

// export default withNuxt(
//   // Your custom configs here
// )

import withNuxt from './.nuxt/eslint.config.mjs';
import stylistic from '@stylistic/eslint-plugin'; // importも追加

export default withNuxt(
  {
    files: ['**/*.vue', '**/*.ts'],
    rules: {
    },
  },
  // ここから追加
  stylistic.configs.customize({
    indent: 2, // インデントはスペース2
    quotes: 'single', // クオートはシングル
    semi: true,
  }),
);
