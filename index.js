// const esprima = require("esprima");
const acorn = require("acorn");
const walk = require("acorn-walk");
const { generate } = require("astring");

// Function to instrument the code
function instrumentCode(code) {
  //   const ast = esprima.parseScript(code, { ecmaVersion: 2022 });
  const ast = acorn.parse(code, { ecmaVersion: 2022, sourceType: "module" });

  walk.simple(ast, {
    FunctionDeclaration(node) {
      const logStatement = {
        type: "ExpressionStatement",
        expression: {
          type: "CallExpression",
          callee: {
            type: "MemberExpression",
            object: {
              type: "Identifier",
              name: "console",
            },
            property: {
              type: "Identifier",
              name: "log",
            },
          },
          arguments: [
            {
              type: "Literal",
              value: `${node.id.name} is called with arguments:`,
              raw: `'${node.id.name} is called with arguments:'`,
            },
            {
              type: "Identifier",
              name: "arguments",
            },
          ],
        },
      };
      if (node.body.type === "BlockStatement") {
        node.body.body.unshift(logStatement);
      }
    },
    VariableDeclaration(node) {
      node.declarations.forEach((declaration) => {
        if (
          declaration.init &&
          declaration.init.type === "ArrowFunctionExpression"
        ) {
          const logStatement = {
            type: "ExpressionStatement",
            expression: {
              type: "CallExpression",
              callee: {
                type: "MemberExpression",
                object: {
                  type: "Identifier",
                  name: "console",
                },
                property: {
                  type: "Identifier",
                  name: "log",
                },
              },
              arguments: [
                {
                  type: "Literal",
                  value: `${declaration.id.name} is called with arguments:`,
                  raw: `'${declaration.id.name} is called with arguments:'`,
                },
                {
                  type: "Identifier",
                  name: "arguments",
                },
              ],
            },
          };
          if (declaration.init.body.type === "BlockStatement") {
            declaration.init.body.body.unshift(logStatement);
          }
        }
      });
    },
  });

  return generate(ast);
}

// Export the instrumentCode function
module.exports = instrumentCode;
