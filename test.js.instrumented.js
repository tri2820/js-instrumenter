const f = () => {
  console.log('f is called with arguments:', arguments);
  try {
    x = 2;
    y = g(50);
  } catch {}
};
function g(x) {
  console.log('g is called with arguments:', arguments);
  return x + 2 + 5;
}
