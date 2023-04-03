# Tailwind
## Go to frontend folder
npm install -D tailwindcss
npx tailwindcss init

## tailwind.config.js
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
## index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

## get Tailwind CSS IntelliSense plugin in VS Code

# Prettier
## Frontend folder
npm install -D prettier prettier-plugin-tailwindcss

## make prettier.config.js file
```js
module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
}
```
## get Prettier - Code formatter extension in VS Code
### VS Code settings:
Editor: Default Formatter => Prettier - Code formatter
Editor: Format On Save => true
Editor: Format On Save Mode => modifications

# Preprocessors
## Frontend folder
npm install -D postcss-import
npm install -D autoprefixer

## make postcss.config.js file
module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  }
}