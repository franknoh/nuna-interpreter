# nuna-interpreter
 비공식 nodejs NUNA 인터프리터

# 사용법

```javascript
Nuna = require('./nuna');
Nuna.init(); // 선택
```

```javascript
Nuna.get(src) // .nuna로 끝나는 파일의 값 또는 src값 반환
Nuna.list(dict) // dict 경로에있는 모든 .nuna파일 반환, dict가 없으면 ./가 기본경로
Nuna.init(ver) // ver으로 초기화, 0.2가 기본 (0.3은 아직 구현 안됨)
Nuna.exec(src) // src의 실행결과 또는 src.nuna의 실행결과 반환
```

# 예시

```javascript
Nuna = require('./nuna');
Nuna.init();

// dict
// output: ["test.nuna", "main.nuna"...]
console.log(Nuna.list());
```

```javascript
Nuna = require('./nuna');
Nuna.init();

// test.nuna
// output: `누나`
console.log(Nuna.exec(`test`));
```

```javascript
Nuna = require('./nuna');
Nuna.init();

// text
// output: `누나`
console.log(Nuna.exec(`
눈나..나..주...나..........거나..........거....나..........거나..........거나....누........나.........💕
누나..나..나..거나..나.....나.....거...나..나.....거나..나.....주..눈나..........나..........💕!
`));
```
