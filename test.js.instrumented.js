const f = function (a, b, c) {
  console.log("Function f is called with", a, b, c);
  try {
    x = a;
    y = g(50);
  } catch {}
};
function g() {
  console.log("Function g is called with", arguments);
  console.log("what");
  return 2 + 3;
}
async function k() {
  console.log("Function k is called with", arguments);
  return await new Promise(resolve => {
    resolve(1);
  });
}
const m = async function () {
  console.log("Function m is called with");
  return await new Promise(resolve => {
    resolve(1);
  });
};
const z = function () {
  console.log("Function z is called with");
  const r = function () {
    console.log("Function r is called with");
    console.log(12);
  };
};
const h = function () {
  console.log("Function h is called with");
  return () => {
    console.log(12);
  };
};
const l = function (...args) {
  console.log("Function l is called with", ...args);
  return z(...args);
};
const o = function (x, ...args) {
  console.log("Function o is called with", x, ...args);
  const y = x + 1;
  return z(...args);
};
f(1);
g(1);
k(1);
l(1);
h(1);
h(1);
z(1);
m(1);
o(1);
