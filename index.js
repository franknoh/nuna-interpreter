Nuna = require('./nuna');
Nuna.init();

// test.nuna
// output: `누나`
console.log(Nuna.exec(`test`));
console.log(Nuna.exec(`./test`));
console.log(Nuna.exec(`test.nuna`));
console.log(Nuna.exec(`./test.nuna`));

// text
// output: `누나`
console.log(Nuna.exec(`
눈나..나..주...나..........거나..........거....나..........거나..........거나....누........나.........💕
누나..나..나..거나..나.....나.....거...나..나.....거나..나.....주..눈나..........나..........💕!
`));

