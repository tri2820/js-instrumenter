#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const instrumentCode = require("./index");

const inputFilePath = process.argv[2];

if (!inputFilePath) {
  console.error("Please provide a file to instrument.");
  process.exit(1);
}

const absolutePath = path.resolve(inputFilePath);

fs.readFile(absolutePath, "utf8", (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err.message}`);
    process.exit(1);
  }

  const instrumentedCode = instrumentCode(data);

  const outputFilePath = `${absolutePath}.instrumented.js`;
  fs.writeFile(outputFilePath, instrumentedCode, (err) => {
    if (err) {
      console.error(`Error writing file: ${err.message}`);
      process.exit(1);
    }

    console.log(`Instrumented code written to ${outputFilePath}`);
  });
});
