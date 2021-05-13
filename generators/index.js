const componentGenerator = require('./component/index.js');
const containerGenerator = require('./pages/index.js');

module.exports = function(plop) {
  // controller generator
  plop.setGenerator('pages', containerGenerator);
  plop.setGenerator('component', componentGenerator);

  //helpers
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};
