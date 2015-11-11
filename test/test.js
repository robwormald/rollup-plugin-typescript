var assert = require('assert');
var rollup = require('rollup');
var typescriptPlugin = require('../dist/cjs/index').typescript;

process.chdir(__dirname);

describe('rollup-plugin-typescript', function () {
  it('runs code through typescript', function () {
    return rollup.rollup({
      entry: 'samples/basic/main.ts',
      plugins: [typescriptPlugin()]
    }).then(function (bundle) {
      var generated = bundle.generate();
      var code = generated.code;

      console.log('code', code)

      var fn = new Function('exports', code);
      var module = {};
      fn(module);

      var greeter = new module.Greeter('Hello, world!')

      assert.equal(greeter.greet(), '<h1>Hello, world!</h1>', code);

    });
  });
});
