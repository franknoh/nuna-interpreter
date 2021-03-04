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
                    this.stack.push(q - (Number(token[0] == '0') * 2 - 1) * p)
                }
            }
        })
        return result;
    },
    'last': function () {
        if (!!this.stack) return this.stack.pop()
        throw Error(`Operate with empty stack.`);
    },
    'tokenize': function (src) {
        var src = this.get(src) + '!'
        var base = '눈누나주거.!0'
        if (this.ver === '0.3') base = '눈누나주거.!0'
        var result = [];
        prev = '';
        count = 0;
        if (src.includes('0')) throw Error(`invalid character "${0}" found.`);
        src = src.replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g, '0')
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
};
module.exports = Nuna;