const f = (a, b, c) => {
  try {
    x = a;
    y = g(50);
  } catch {}
};

function g() {
  console.log("what");
  return 2 + 3;
}

async function k() {
  return await new Promise((resolve) => {
    resolve(1);
  });
}

const m = async () => {
  return await new Promise((resolve) => {
    resolve(1);
  });
};

const z = () => {
  const r = () => {
    console.log(12);
  };
};

const h = () => {
  return () => {
    console.log(12);
  };
};

const l = (...args) => {
  return z(...args);
};

const o = (x, ...args) => {
  const y = x + 1;
  return z(...args);
};

const q = () => 12;

function u(e) {
  return (x = g(x, e));
}

function t() {
  console.log(this);
}

f(1);
g(1);
k(1);
l(1);
h(1);
h(1);
z(1);
m(1);
o(1);
q(1);
t(1);
