# nuna-interpreter
 비공식 nodejs NUNA 인터프리터

![npm (scoped)](https://img.shields.io/npm/v/@franknoh/nuna-interpreter?style=for-the-badge)

# 사용법

```shell
$ npm install @franknoh/nuna-interpreter
```

```javascript
Nuna = require('@franknoh/nuna-interpreter');
//Nuna = require('./nuna');
Nuna.init(); // 선택
```

```javascript
Nuna.get(src) // .nuna로 끝나는 파일의 값 또는 src값 반환
Nuna.list(dict) // dict 경로에있는 모든 .nuna파일 반환, dict가 없으면 ./가 기본경로
Nuna.init(ver) // ver으로 초기화, 0.2가 기본
Nuna.ver // 현제 인터프리터의 버전 반환
Nuna.exec(src) // src의 실행결과 또는 src.nuna의 실행결과 반환
```

# 예시

```javascript
Nuna = require('@franknoh/nuna-interpreter');
Nuna.init();

// dict
// output: ["test.nuna", "main.nuna"...]
console.log(Nuna.list());
```

```javascript
Nuna = require('@franknoh/nuna-interpreter');
Nuna.init();

// test.nuna
// output: `누나`
console.log(Nuna.exec(`test`));
```

```javascript
Nuna = require('@franknoh/nuna-interpreter');
Nuna.init();

// text
// output: `누나`
console.log(Nuna.exec(`
눈나..나..주...나..........거나..........거....나..........거나..........거나....누........나.........💕
누나..나..나..거나..나.....나.....거...나..나.....거나..나.....주..눈나..........나..........💕!
`));
```

# changelog

- 3/4
  - 오류수정, 0.2v와 0.3v 구분
  - package 출시
