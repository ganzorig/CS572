const child_process = require('child_process');
var fib = require('./fibonacci');

// solutio 1 using set timeout
console.log('1: Start');

// make it async
setTimeout(function () {
  console.log('Fibonacci of 30: ' + fib.calc(30));
  console.log('Fibonacci of -10: ' + fib.calc(-10));
}, 0);

console.log('3: End');

// solution 2 using child process
console.log('1: Start');

// first using another IO
const newProcess = child_process.spawn('node', ['./fibonacci2.js'], {
  stdio: 'inherit',
});

console.log('3: End');
