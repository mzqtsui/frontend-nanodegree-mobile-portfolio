## Website Performance Optimization portfolio project

### Getting started
1. Install npm
2. Run `npm install` in root directory
3. Open `localhost:9000` in a browser

### Optimizations
###### `index.html`
- added media queries to get appropriate css files
- async blocking javascript
- inline critical css using `critical`
- generate optimized images with `gulp-responsive`

###### `views/js/main.js`
- changePizzaSizes changes width % rather than px conversion

###### `views/pizza.html`
- removed manually-inserted inline styles
- semantic html
