const wait = require('./wait');

async function run() {
  console.log('Start');
  await wait(3); // waits for 3 seconds
  console.log('3 seconds later...');
}

run();
