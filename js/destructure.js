let [x, y, ...nums] = [0, 1, 2, 3, 4, 5, 6];
console.log(x, y, "nos", ...nums);

let { a, b, ...props } = { a: 1, b: 2, c: 3, d: { e: 4 } };
console.log(a, b, "props", props);
let k = { name: "pia", age: 3 };
let { name: n, age } = k;
console.log(n, age);
