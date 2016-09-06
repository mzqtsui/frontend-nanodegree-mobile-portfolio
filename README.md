## Website Performance Optimization portfolio project

### Getting started
1. Install npm
2. Run `npm install` in root directory
3. Run `gulp`
4. Open `localhost:9000` in a browser

### Optimizations
###### `index.html`
- added media queries to get appropriate css files
- async blocking javascript
- inline critical css using `critical`
- generate optimized images with `gulp-responsive`

###### `views/js/main.js`
- changePizzaSizes adds/removes small/large classes that change width %
- `<template>`-based pizza generation
- `document.body.scrollTop` only called once in `updatePositions()`
- loop variables declared in initialisation of for loop
- 'selectRandomIngredient()' to replace multiple selectRandom functions that do basically the same thing
- `querySelector` replaced with `getElementsByClassName` or `getElementById` where appropriate
- reduced DOM calls on #randomPizzas inside resizePizzas
- dynamically generate number of pizzas based on screen size

###### `views/pizza.html`
- removed manually-inserted inline styles
- semantic html
- optimized images
