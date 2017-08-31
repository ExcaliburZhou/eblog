const path = require('path');
const resolvePath = (p = '') => path.resolve(process.cwd(), p);


module.exports = {
  root: resolvePath(),
  src: resolvePath('src'),
  index: resolvePath('src/index.js'),
  dist: resolvePath('dist'),
  public: resolvePath('public'),
  templateHTML: resolvePath('public/index.html'),

};
