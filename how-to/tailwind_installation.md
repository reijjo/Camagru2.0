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
## src/index.css
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

## tailwind.config.js
```js
/* @tailwind base;
@tailwind components;
@tailwind utilities; */

@import "tailwindcss/base";
/* @import "./custom-base-styles.css"; */
@import "tailwindcss/components";
/* @import "./custom-components.css; */
@import "tailwindcss/utilities";
/* @import "./custom-utilities.css"; */
```