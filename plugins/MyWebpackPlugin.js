class MyWebpackPlugin {
  constructor(options) {}
  apply(compiler) {
    console.log(compiler)
    debugger

    compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
      console.log('compilation', compilation);
      debugger
    })

    compiler.hooks.emit.tapAsync('MyWebpackPlugin', (compilation, callback) => {
      let { assets, chunks, compiler, hooks, options } = compilation

      // compilation.chunks存放了代码块列表
      console.log('emit', compilation);
      console.log('chunks', compilation.chunks);
      debugger

      compilation.chunks.forEach(chunk => {
        // chunk包含多个模块，通过chunk.modulesIterable可以遍历模块列表
        for (const module of chunk.modulesIterable) {
          // module包含多个依赖，通过module.dependencies进行遍历
          module.dependencies.forEach(dependency => {
            console.log('dependency', dependency);
          });
        }
        debugger
      });

      console.log('assets', compilation.assets);
      debugger

      // 修改或添加资源
      compilation.assets['new-file.js'] = {
        source() {
          return "const str = 'this is a new file'";
        },
        size() {
          return this.source().length;
        }
      };

      callback();

    });

    compiler.hooks.done.tap('MyWebpackPlugin', (stats) => {
      console.log('整个webpack打包结束了');
    });
  }
}

module.exports = MyWebpackPlugin;
