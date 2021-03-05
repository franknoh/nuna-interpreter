const Fs = require('fs');
const Nuna = {
    'get': function (src) {
        if (typeof (src) != "string") throw Error(`srcipt must be string, not ${typeof (src)}`);
        return function () {
            if (!!Fs.existsSync(src)) {
                return Fs.readFileSync(src, 'utf8', function (res) {
                    if (!res) res = src;
                });
            } else if (!!Fs.existsSync('./' + src)) {
                return Fs.readFileSync('./+src', 'utf8', function (res) {
                    if (!res) res = src;
                });
            } else if (!!Fs.existsSync(src + '.nuna')) {
                return Fs.readFileSync(src + '.nuna', 'utf8', function (res) {
                    if (!res) res = src;
                });
            } else if (!!Fs.existsSync('./' + src + '.nuna')) {
                return Fs.readFileSync('./' + src + '.nuna', 'utf8', function (res) {
                    if (!res) res = src;
                });
            } else {
                return src;
            }
        }()
    },
    'list': function (dict) {
        if (dict === '' || dict === undefined) dict = './'
        if (typeof (dict) != "string") throw Error(`dirctory must be string, not ${typeof (dict)}`);
        var files = [];
        Fs.readdirSync(dict).forEach(file => {
            if (file.endsWith('.nuna')) files.push(file);
        });
        return files;
    },
    'init': function (v) {
        if (!v || v === '0.2') {
            this.ver = '0.2';
        } else if (v === '0.3') {
            this.ver = '0.3';
        }
        this.stack = [];
    },
    'exec': function (src) {
        if (!this.ver) this.init();
        var result = '';
        const tokens = this.tokenize(src);
        this.stack = [];
        tokens.forEach((token) => {
            if (this.ver === '0.2') {
                if ('눈누'.includes(token[0])) this.stack.push(token[1]);
                if ('나'.includes(token[0])) this.stack.push(this.last() * token[1]);
                if ('주'.includes(token[0])) this.stack.push(this.last() - token[1]);
                if ('거'.includes(token[0])) this.stack.push(this.last() + token[1]);
                if ('!'.includes(token[0])) {
                    this.stack.forEach((i) => {
                        result += String.fromCharCode(i);
                    })
                }
                if ('0'.includes(token[0])) {
                    p = this.stack.pop()
                    q = this.stack.pop()
                    this.stack.push(q - p)
                }
            } else if (this.ver === '0.3') {
                if ('눈누'.includes(token[0])) this.stack.push(token[1]);
                if ('나'.includes(token[0])) this.stack.push(this.last() * token[1]);
                if ('주'.includes(token[0])) this.stack.push(this.last() - token[1]);
                if ('거'.includes(token[0])) this.stack.push(this.last() + token[1]);
                if ('!'.includes(token[0])) {
                    this.stack.forEach((i) => {
                        result += String.fromCharCode(i);
                    })
                }
                if ('01'.includes(token[0])) {
                    p = this.stack.pop()
                    q = this.stack.pop()
                    this.stack.push(q + (Number(token[0] == '0') * 2 - 1) * p)
                }
            }
        })
        console.log(result);
        return {
            'result': result,
            'stack': this.stack
        };
    },
    'last': function () {
        if (!!this.stack[0]) return this.stack.pop()
        throw Error(`Operate with empty stack.`);
    },
    'tokenize': function (src) {
        var src = this.get(src) + '!'
        var base = '눈누나주거.!0'
        if (this.ver === '0.3') base = '눈누나주거.!01'
        var result = [];
        prev = '';
        count = 0;
        if (this.ver === '0.2') {
            if (src.includes('0')) throw Error(`invalid character "${0}" found.`);
            src = src.replace(/\ud83d\udc95/g, '0')
            src.split('\n').forEach((e) => {
                e.split('').forEach((t) => {
                    if (!base.includes(t)) {
                        if (t !== '\r') throw Error(`invalid character "${t}" found.`);
                    } else {
                        if (t === '.') {
                            cnt++;
                        } else {
                            if (!!prev) {
                                result.push([prev, cnt + !cnt]);
                            }
                            prev = t;
                            cnt = 0;
                        }
                    }
                })
            })
            return result;
        } else if (this.ver === '0.3') {
            if (src.includes('0')) throw Error(`invalid character "${0}" found.`);
            if (src.includes('1')) throw Error(`invalid character "${1}" found.`);
            src = src.replace(/\ud83d\udc95/g, '0').replace(/\u2665/g, '1')
            src.split('\n').forEach((e) => {
                e.split('').forEach((t) => {
                    if (!base.includes(t)) {
                        if (t !== '\r') throw Error(`invalid character "${t}" found.`);
                    } else {
                        if (t === '.') {
                            cnt++;
                        } else {
                            if (!!prev) {
                                result.push([prev, cnt + !cnt]);
                            }
                            prev = t;
                            cnt = 0;
                        }
                    }
                })
            })
            return result;
        }
    }
};
module.exports = Nuna;