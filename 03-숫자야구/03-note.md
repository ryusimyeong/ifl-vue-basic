## 3-1 웹팩 사용하기

script 파일이 많아져서 script 파일을 관리하는 어려움이 webpack을 배우는 어려움을 넘어설 때 웹팻을 사용한다.

script 파일이 너무 많아져서 그걸 한 번에 합치려고 webpack을 사용한다.

### npm 초기화

```
$ npm init
```

을 통해 package.json을 만들고 패키지 버전을 관리한다.

### vue 및 webpack 설치

```
$ npm i vue
```

로 vue를 설치한다.

아래 명령어로 웹팩 설치
```
$ npm i webpack webpack-cli -D
```
**-D** 는 옵션인데, 개발할 때만 웹팩, 웹팩 cli를 사용하겠다는 뜻.

vue는 package.json의 dependency에 적히고, webpack 등은 devDependencties에 적힌다.

vue는 개발할 때나 배포할 때 모두 사용되고, webpack 등은 개발할 때만 사용된다.

### webpack.config.js

webpack.config.js 라는 파일을 생성한다

webpack 설정을 작성하는 파일이다.

```js
// 웹팩 처리를 할 때 사용하는 객체
// 웹팩 설정을 모두 넣는다
module.exports = {
  entry: {},
  module: {},
  plugins: [],
  output: {}
};
```

entry, module, plugins, output 설정이 제일 중요하다.

```js
// 웹팩 처리를 할 때 사용하는 객체
// 웹팩 설정을 모두 넣는다
module.exports = {
  // main.js는 합쳐질 script 파일의  대표 파일.
  entry: {
    // 여기서 app은 하나로 합쳐질 파일의 이름
    app: "./main.js"
  },
  // 웹팩의 핵심
  module: {
    // 어떻게 js 파일들을 합칠 건지?
    rules: [{}]
  },
  plugins: [],
  output: {
    // [name] = entry에서 작성한 이름, app.
    filename: "[name].js",
    // 합쳐진 파일이 저장될 디렉토리
    path: "./dist"
  }
};

// 여기서 app, dist, main 등은 이름을 바꿀 수 있다.

```

## 3-2 프로젝트 구조와 웹팩 빌드

main.js 와 NumberBaseball.vue를 합쳐서 ./dist/app.js로 만들어야 한다

### NumberBaseball.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- webpack으로 합친 파일 -->
    <script src="./dist/app.js"></script>
  </body>
</html>
```

### main.js

main.js 는 Vue 인스턴스 역할을 한다

```js
// package.json 에서 Vue 가져오기
import Vue from "vue";
import NumberBaseball from "./NumberBaseball.vue";

// #root에 마운트 만들기
// vue instance
// $mount() -> el 역할.
new Vue(NumberBaseball).$mount("#root");
```

### NumberBaseball.vue 

vue 컴포넌트를 작성하는 파일. 자바스크립트 파일이라고 생각하자

```vue
<!-- 자바스크립트 파일이라고 생각하자 -->
<!-- vue component를 작성한다. -->

<!-- html -->
<template>
  <div>
    <h1>{{result}}</h1>
    <form v-on:submit="onSubmitForm">
      <input type="text" ref="answer" v-model="inputValue" />
      <button type="submit">입력</button>
    </form>
    <div>시도: {{result}}</div>
  </div>
</template>

<script>
// component 부분
export default {
  data() {
    return {
      inputValue: "",
      result: ""
    };
  },
  methods: {
    onSubmitForm(e) {
      e.preventDefault();
    }
  }
};
</script>

<!-- css -->
<style></style>

```

### webpack.config.js

output의 경로는 절대 경로로 설정해야 한다. 

node 안에서 현재 디렉토리의 절대경로를 알기 쉽게 만들어주는 것이 있다.

```js
const path = require('path');
```

로 얻고, 아래와 같이 작성한다.

```js
// node에 기본적으로 있는 path
const path = require("path");

// 웹팩 처리를 할 때 사용하는 객체
// 웹팩 설정을 모두 넣는다
module.exports = {
  // main.js는 합쳐질 script 파일의  대표 파일.
  entry: {
    // 여기서 app은 하나로 합쳐질 파일의 이름
    app: path.join(__dirname, "./main.js")
  },
  // 웹팩의 핵심
  module: {
    // 어떻게 js 파일들을 합칠 건지?
    rules: [{}]
  },
  plugins: [],
  output: {
    // [name] = entry에서 작성한 이름, app.
    filename: "[name].js",
    // 합쳐진 파일이 저장될 디렉토리
    // 디렉토리는 절대경로로 설정해야 한다
    // path 내부의 join 메소드 이용
    // 현재 디렉토리는 __dirname으로 접근 가능. 그 다음 아규먼트는 현재 디렉토리 하위 디렉토리
    path: path.join(__dirname, "dist")
  }
};

// 여기서 app, dist, main 등은 이름을 바꿀 수 있다.
```

### package.json

**scripts**에 build를 추가한다.

```json
{
  "scripts": {
    "build": "webpack"
  },
}
```

위와 같이 작성 후

```shell
$ npm run build
```

를 입력하면 **webpack**이 실행된다. (webpack을 실행하는 명령어는 webpack)

## 3-3 웹팩 로더

웹팩은 자바스크립트 파일만 합칠 수 있다.

우리는 main.js에 모든 .vue 파일들을 합쳐야 하는데 웹팩은 기본적으로 .vue 파일을 읽을 수 없다.

이때 사용하는 게 config 파일의 module에서 rules.

```shell
npm i vue-loader -D
```

vue-loader 설치하고

plugin을 require 하여 넣어준다

```shell
$ npm i vue-template-compiler -D
```

template compiler 설치

**이때 vue-template-compiler의 버젼은 vue 의 버젼과 일치해야 한다**

### require, import 

어떤 건 require로 불러오고 어떤 건 import로 가져오지?

일단 node 환경에서는 require, vue 환경에서는 import를 사용하자.

```js
// vue-loader 플러그인
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require("path");

module.exports = {
  mode: "development", // 개발 상태, 배포면 production
  devtool: "eval", // 개발 중일 때. webpack 처리가 빨라진다. 배포중일 땐 hidden-source-map을 주로 쓴다
  resolve: {
    // import 할때 .js와 .vue는 생략이 가능
    extensions: [".js", ".vue"]
  },
  entry: {
    app: path.join(__dirname, "./main.js")
  },
  // 웹팩의 핵심
  module: {
    // 어떻게 js 파일들을 합칠 건지?
    rules: [
      {
        // 파일명이 .vue로 끝나는 파일들은 vue-loader를 사용한다
        // $는 정규표현식에서 '끝'
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  },
  // vue-loader 플러그인
  plugins: [new VueLoaderPlugin()],
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist")
  }
};


```

## 3-4 v-for로 반복문 사용하기

반복하여 만들 태그에 v-for 키워드를 넣는다

forEach 메소드처럼 ""안에 **"item in array"** 방식으로 코드를 적는다.

이때 "" 안은 JS 코드이므로 try, function 등 예약어는 사용할 수 없다.

만약 이때 item이 객체면 프로퍼티도 역시 접근할 수 있다.

아래 코드 참조

```html
<div>
  <h1>숫자야구</h1>
  <h1>{{ result }}</h1>
  <!-- v-on: 을 @로 바꿀 수 있다. -->
  <!-- .prevent 는 e.preventDefault() -->
  <form @submit.prevent="onSubmitForm">
    <input
      type="number"
      minlength="4"
      maxlength="4"
      ref="answer"
      v-model="inputValue"
    />
    <button type="submit">입력</button>
  </form>
  <div>시도: {{ tries.length }}</div>
  <ul>
    <!-- "" 안은 JS 코드이므로 try, function 등 예약어를 사용할 수 없다 -->
    <li v-for="t in tries">
      <div>{{ t.try }}</div>
      <div>{{ t.result }}</div>
    </li>
  </ul>
</div>
```

### event 코드 축약하기

**v-on:event** 를 **@event**로 바꿀 수 있다.

```html
<form v-on:submit="" >
<form @submit="" >
```

그리고 해당 이벤트에 e.preventDefault()를 해야한다면

```html
<form @submit.prevent="" >
```
로 축약할 수 있다.

## 3-5 숫자야구 완성하기

화면에 보여지면 data. 화면과는 상관없이 그저 계산으로만 쓰이면 그냥 변수로 선언한다.

vue 내부에서 this를 통해 data와 methods에 접근할 수 있다.

```vue
<!-- 자바스크립트 파일이라고 생각하자 -->
<!-- vue component를 작성한다. -->

<!-- html -->
<template>
  <div>
    <h1>숫자야구</h1>
    <h1>{{ result }}</h1>
    <!-- v-on: 을 @로 바꿀 수 있다. -->
    <!-- .prevent 는 e.preventDefault() -->
    <form @submit.prevent="onSubmitForm">
      <input
        type="text"
        minlength="4"
        maxlength="4"
        ref="answer"
        v-model="inputValue"
      />
      <button type="submit">입력</button>
    </form>
    <div>시도: {{ tries.length }}</div>
    <ul>
      <!-- "" 안은 JS 코드이므로 try, function 등 예약어를 사용할 수 없다 -->
      <li v-for="t in tries">
        <div>{{ t.try }}</div>
        <div>{{ t.result }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
// 자바스크립트 코드는 <script> 안에 넣으면 된다.
// 임의의 4자리 수를 반환하는 함수
const getNumber = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];

  for (let i = 0; i < 4; i++) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

// component 부분
// main.js에서 import 하면 export default 객체가 가져가진다
export default {
  data() {
    return {
      answer: getNumber(), // 배열
      inputValue: "",
      result: "",
      tries: []
    };
  },
  methods: {
    onSubmitForm(e) {
      // e.preventDefault(); 대신 template 부분에서 @submit.prevent로 바꿀 수 있다.
      // 배열과 문자열을 비교하기 위해 join();
      if (this.inputValue === this.answer.join("")) {
        // input 입력값을 tries에 넣는다.
        this.tries.push({
          try: this.inputValue,
          result: "홈런"
        });
        this.result = "홈런";
        alert("홈런입니다. 게임을 다시 시작합니다.");
        // 초기화
        this.inputValue = "";
        this.tries = [];
        this.$refs.answer.focus();
      } else {
        // 틀렸을 때
        if (this.tries.length >= 9) {
          // 10번 넘게 틀렸을 때
          this.inputValue = "";
          this.result = `10번 초과! 실패! 답은 ${this.answer.join(
            ""
          )} 였습니다.`;
          alert("실패했습니다. 게임을 다시 시작합니다.");
          // 초기화
          this.answer = getNumber();
          this.tries = [];
          this.$refs.answer.focus();
        }
        let strikes = 0;
        let balls = 0;
        const answerArray = this.inputValue.split("").map(v => Number(v));

        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === this.answer[i]) {
            // 숫자 및 자릿수가 맞을 때
            strikes++;
          } else if (this.answer.includes(answerArray[i])) {
            // 숫자만 정답
            balls++;
          }
        }
        this.tries.push({
          try: this.inputValue,
          result: `${strikes} 스트라이크, ${balls} 볼`
        });
        this.inputValue = "";
        this.$refs.answer.focus();
      }
    }
  }
};
</script>

<!-- css -->
<style></style>

```

### module system

vue에서는 import, export를 사용한다.

webpack에서는 require, module.exports를 사용한다.