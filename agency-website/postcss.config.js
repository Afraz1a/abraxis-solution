// postcss.config.mjs   ← rename to .mjs if it's .js and causing issues
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    // autoprefixer: {},   ← optional but usually good to keep
  },
}