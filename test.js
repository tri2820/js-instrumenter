const f = () => {
  try {
    x = 2;
    y = g(50);
  } catch {}
};

function g(x) {
  return x + 2 + 5;
}
