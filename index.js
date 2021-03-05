Nuna = require('./nuna');

Nuna.init('0.2');
console.log(Nuna.exec(`v0.2`))

Nuna.init('0.3');
console.log(Nuna.exec(`v0.3`))

console.log(Nuna.list())

console.log(Nuna.ver)