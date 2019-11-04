<div align="center">
  <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  <h1>Webpack Template</h1>
  <p>
    Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.
  </p>
</div>


## Build Setup:

``` bash
# Download repository:
git clone https://github.com/dima-po/webpack-starter.git webpack-template-pug

# Go to the app:
cd webpack-template-pug

# Install dependencies:
npm install

# Server with hot reload at http://localhost:4000/
npm run dev

# Output will be at dist/ folder
npm run build
```

## Project Structure:

* `src/views/layouts` - put custom layout for pages
* `src/pug/modules` - bem blocks folder
* `src/pug/helpers` - pug mixins and other
* `src/pug/pages` - put custom app pages.
* `src/styles` - put custom app SCSS styles here.
* `src/assets/fonts` - put fonts files here. Don't forget to use correct path: `fonts/someFont.woff`
* `src/assets/img` - put images here. Don't forget to use correct path: `img/some.jpg`
* `src/assets/img/svg` - put svg here. Svg uses for sprites
* `src/js` - put custom app scripts here
* `src/index.js` - main app file where you include/import all required libs and init app
* `static/` - folder with extra static assets that will be copied into output folder