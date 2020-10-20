const parser = require("@babel/parser"); // 解析
const traverse = require("@babel/traverse").default; // 遍历
const generator = require("@babel/generator").default; // 生成
const t = require("@babel/types"); // 修改

module.exports = function(source) {
  const ast = parser.parse(source, { sourceType: "module" });
  traverse(ast, {
    CallExpression(path) {
      if (
        t.isMemberExpression(path.node.callee) &&
        t.isIdentifier(path.node.callee.object, { name: "console" })
      ) {
        path.remove();
      }
    },
  });

  const output = generator(ast, {}, source);

  return output.code;
};
