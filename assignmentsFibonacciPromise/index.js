const child_process = require('child_process');
var fib = require('./fibonacci');

const fib30 = new Promise((resolve, reject) => {
  const result = fib.calc(30);

  if (result > 0) {
    resolve(result);
  } else {
    reject('Wrong calculation');
  }
});

const fib10 = new Promise((resolve, reject) => {
  const result = fib.calc(-10);

  if (result >= 0) {
    resolve(result);
  } else {
    reject('Wrong calculation');
  }
});

const child = new Promise((resolve, reject) => {
  resolve(
    child_process.spawn('node', ['./fibonacci2.js'], {
      stdio: 'inherit',
    })
  );
});

// solution 1 using promise
console.log('1: Start');

// promises
fib30
  .then((result) => console.log('Fibonacci of 30: ', result))
  .catch((err) => console.log(err));

fib10
  .then((result) => console.log('Fibonacci of -10: ', result))
  .catch((err) => console.log(err));

console.log('3: End');

// solution 2 using child process with promise
console.log('2.1: Start');

// child process
child.then(console.log('run'));

console.log('2.3: End');

// calc all
Promise.all([fib30, fib10])
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
