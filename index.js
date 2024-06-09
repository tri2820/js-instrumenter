const acorn = require("acorn");
const walk = require("acorn-walk");
const { generate } = require("astring");

const createLogExpression = (name, params) => ({
  type: "ExpressionStatement",
  expression: {
    type: "CallExpression",
    callee: {
      type: "MemberExpression",
      object: { type: "Identifier", name: "console" },
      property: { type: "Identifier", name: "log" },
      computed: false,
    },
    arguments: [
      { type: "Literal", value: `Function ${name} is called with` },
      ...params,
    ],
  },
});

const createFunctionExpression = (node, name) => ({
  type:
    node.type == "ArrowFunctionExpression"
      ? "ArrowFunctionExpression"
      : "FunctionExpression",
  id: null,
  params: node.params,
  body: {
    type: "BlockStatement",
    body: [
      createLogExpression(name, node.params),
      ...(node.body.type === "BlockStatement"
        ? node.body.body
        : [{ type: "ReturnStatement", argument: node.body }]),
    ],
  },
  generator: node.generator,
  async: node.async,
});

const replaceWithInstrumentedFunction = (node, name, ancestors) => {
  const parent = ancestors[ancestors.length - 2];
  const instrumentedFunction = createFunctionExpression(node, name);
  if (parent.type === "VariableDeclarator") {
    parent.init = instrumentedFunction;
  } else if (parent.type === "Property") {
    parent.value = instrumentedFunction;
  } else if (parent.type === "AssignmentExpression") {
    parent.right = instrumentedFunction;
  }
};

function instrumentCode(code) {
  const ast = acorn.parse(code, { ecmaVersion: 2022, sourceType: "module" });

  walk.ancestor(ast, {
    ArrowFunctionExpression(node, state, ancestors) {
      const parent = ancestors[ancestors.length - 2];
      const name =
        (parent.type === "VariableDeclarator" && parent.id.name) ||
        (parent.type === "Property" && parent.key.name) ||
        (parent.type === "AssignmentExpression" && parent.left.name) ||
        "anonymous";
      replaceWithInstrumentedFunction(node, name, ancestors);
    },
    FunctionDeclaration(node) {
      node.body.body.unshift(
        createLogExpression(node.id.name, [
          { type: "Identifier", name: "arguments" },
        ])
      );
    },
    FunctionExpression(node, state, ancestors) {
      const parent = ancestors[ancestors.length - 2];
      const name =
        (parent.type === "VariableDeclarator" && parent.id.name) ||
        (parent.type === "Property" && parent.key.name) ||
        "anonymous";
      replaceWithInstrumentedFunction(node, name, ancestors);
    },
  });

  return generate(ast);
}

module.exports = instrumentCode;
