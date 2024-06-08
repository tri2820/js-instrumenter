# js-instrumenter

js-instrumenter is a tool for instrumenting JavaScript code to log function calls and arrow function expressions.

## Installation

You can install js-instrumenter via npm:

```bash
npm install js-instrumenter
```

## Usage

### CLI

To instrument a JavaScript file using the CLI:

```bash
js-instrumenter <input-file>
```

This will generate an instrumented version of the input file with `.instrumented.js` extension.

### Node.js

You can also use js-instrumenter programmatically in your Node.js code:

```javascript
const fs = require("fs");
const instrumentCode = require("js-instrumenter");

const code = fs.readFileSync("example.js", "utf8");
const instrumentedCode = instrumentCode(code);

fs.writeFileSync("example.instrumented.js", instrumentedCode);
```

## License

This project is licensed under the MIT License.