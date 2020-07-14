# 4: 반응속도 체크 게임 - 비동기 처리 연습

## 4-1

웹팩은 자바스크립트 파일을 하나로 합쳐주는 역할을 한다.

자바스크립트가 아닌 파일을 만났을 때는 **로더**를 통해 처리한다.

entry, module, plugins, output

위 네 개가 중요하다.

### 웹팩 watch - 자동 빌드

**--watch**를 붙여주면 webpack이 파일의 변화를 감지하여 자동으로 다시 빌드한다.

```json
{
  "scripts": {
    "build": "webpack --watch"
  },
}
```

## 4-2 v-bind, vue style

기본 html 속성(어트리뷰트) 앞에 **:**을 붙여주면 Vue data를 활용할 수 있다고 기억하자

```html
<!-- v-bind -->
<h1 v-bind:class="state">{{message}}</h1>
<!-- 축약 -->
<h1 :class="state">{{message}}</h1>
```

### vue style 

필요한 로더를 설치한다. 

웹팩과 관련된 모든 것은 **-D**를 붙여 설치한다.

```shell
$ npm i css-loader vue-style-loader -D
```

**webpack.config.js** 의 **module** 부분에 위 로더들을 추가한다

```js
module.exports = {
  module: {
    rules: [
      {
        // .css 파일은 vue-style-loader가 처리한다
        test: /\.css$/,
        loader: ["vue-style-loader", "css-loader"]
      }
    ]
  },
}
```
웹팩은 여러 개의 파일을 하나의 자바스크립트로 합쳐주는 번들러.

로더는 자바스크립트가 아닌 것들을 자바스크립트로 만들어주는 아이들. 플러그인은 output 산출 이전에 부가 기능을 처리


### scoped

지역 스타일링. style 태그에 **scoped**를 붙여주면 해당 component에서만 유효항 style selecting을 할 수 있다.

전역 스타일에서는 사용하지 않는다.

```html
<!-- css -->
<style scoped>
/* style 태그에 scoped를 붙여주면 아래 style 들은 해당 component에만 유효하다 */
/* vue style을 사용하기 위해선 vue-style-loader가 필요하다 */
#screen {
  width: 300px;
  height: 200px;
  text-align: center;
  user-select: none;
}
/* class에 따른 style 변화 */
#screen.waiting {
  background-color: aqua;
}
#screen.ready {
  background-color: red;
  color: red;
}
#screen.now {
  background-color: green;
}
</style>
```

## 4-3 webpack-dev-server

--watch 는 빌드만 자동으로 해준다. 새로고침은 따로 해줘야 한다.

새로고침조차 자동으로 해줄 수 있다.

```shell
npm i webpack-dev-server -D
```

설치 후 package.json scripts 작성

```json
{
  "scripts": {
    "build": "webpack --watch",
    "dev": "webpack-dev-server --hot"
  },
}
```

webpack.config.js 에서 output에 publicPath: "/dist" 추가

/dist는 내가 설정한 디렉토리

```js
output: {
  filename: "[name].js",
  path: path.join(__dirname, "dist"),
  publicPath: "/dist"
}
```

모두 처리한 뒤 서버를 실행하고 localhost:8080으로 들어간다

## 4-4 게임 완성

### setTimeout() 지우기

setTimeout() 을 별도의 변수에 담은 다음

clearTimeout() 을 이용한다.

```js
let timeout = null;
timeout = setTimeout(() => {}, 5);

clearTimeout(timeout);
```

setInterval도 동일한 방식으로 **clearInterval()**을 사용한다

### 게임 전체  

Array.prototype.reduce() 함수의 사용에 유의하자

```vue
<!-- html -->
<template>
  <div>
    <h1>반응속도 체크 - 비동기 처리 연습</h1>
    <!-- v-bind: html 속성에 vue data를 사용하고 싶을 때 사용 -->
    <!-- v-bind: 를 축약하면 : -->
    <!-- html 속성 앞에 : 을 붙이면 vue data를 쓸 수 있다 -->
    <!-- <div id="screen" v-bind:class="state">{{}}</div> -->
    <div id="screen" :class="state" @click="onClickScreen">
      {{ message }}
    </div>
    <div>
      <div>
        평균 시간:
        <!-- reduce 함수. 초기값이 빈 배열이면 에러가 나므로 초기값 0 설정 -->
        <!-- 초기값이 NaN 이 뜨기 때문에 || 대체 연산자 이용 -->
        {{ result.reduce((a, v) => a + v, 0) / result.length || 0 }} ms
      </div>
      <button @click="onClickReset">리셋</button>
    </div>
  </div>
</template>

<!-- js -->
<script>
// 초록 화면이 보여진 시각과 내가 클릭한 시각의 차를 구하기 위한 JS
let startTime = 0;
let endTime = 0;
let timeout = null; // setTimeout() 함수를 담을 변수

export default {
  data() {
    return {
      result: [],
      state: "waiting",
      message: "클릭해서 시작하세요"
    };
  },
  methods: {
    onClickReset() {
      this.result = [];
    },
    // onRest() {},
    // screen click 이벤트 함수
    onClickScreen() {
      if (this.state === "waiting") {
        this.state = "ready";
        this.message = "초록색이 되면 클릭하세요";
        timeout = setTimeout(() => {
          startTime = new Date(); // 초록화면이 보여진 시각
          this.state = "now";
          this.message = "지금 클릭하세요!!";
        }, Math.floor(Math.random() * 1000) + 2000); // 2~3초
      } else if (this.state === "ready") {
        clearTimeout(timeout); // setTimeout 지우기
        this.state = "waiting";
        this.message = "지금이 아닙니다. 다시 시작하세요";
      } else if (this.state === "now") {
        endTime = new Date(); // 내가 클릭한 시각
        this.state = "waiting";
        this.message = "클릭해서 시작하세요.";
        this.result.push(endTime - startTime); // 내 반응속도
      }
    }
  }
};
</script>

<!-- css -->
<style scoped>
/* style 태그에 scoped를 붙여주면 아래 style 들은 해당 component에만 유효하다 */
/* vue style을 사용하기 위해선 vue-style-loader가 필요하다 */
#screen {
  width: 300px;
  height: 200px;
  text-align: center;
  user-select: none;
}
/* class에 따른 style 변화 */
#screen.waiting {
  background-color: aqua;
}
#screen.ready {
  background-color: red;
  color: white;
}
#screen.now {
  background-color: green;
}
</style>

```

## 4-5 computed, v-show, template

### computed - 매우 중요하다

위의 예제에서 result는 그냥 쓰이지 않고 가공을 통해 쓰인다.

이렇게 data가 그냥 쓰이지 않고 가공되어서 사용된다면 computed를 사용한다.

computed 된 값들은 캐싱이 되어 성능 개선에 도움을 준다

vue 프로퍼티에 computed 를 추가한다.

### v-show 와 v-if 의 차이

둘 다 조건이 true여야 화면에 나타난다.

차이점으로 **v-show**는 해당 **태그가 존재**하며 display:none 처리가 된다.

**v-if**는 태그 자체가 **사라진다**.

화면의 레이아웃에 영향을 주는 요소이므로 상황에 맞게 사용한다.
```html
<!-- condition이 false 일 때 -->
<!-- 태그는 존재하지만 display:none -->
<h1 v-show="condition"></h1>
<!-- 태그 자체가 사라진다. -->
<h1 v-if="condition"></h1>
```

### template

template 내부에서 쓸 데 없는 div 등을 사용하고 싶지 않으면 **template** 태그를 사용하면 된다.

그러면 브라우져는 해당 태그는 없는 셈 치지만 v-if 등 vue의 기능을 사용할 수 있다.

```html
<div>
  <h1>반응속도 체크 - 비동기 처리 연습</h1>
  <div id="screen" :class="state" @click="onClickScreen">
    {{ message }}
  </div>
  <!-- 아래 div는 쓸데 없다. -->
  <div v-show="result.length"> 
    <div>평균 시간: {{ average }} ms</div>
    <button @click="onClickReset">리셋</button>
  </div>
</div>
```

```html
<div>
  <h1>반응속도 체크 - 비동기 처리 연습</h1>
  <div id="screen" :class="state" @click="onClickScreen">
    {{ message }}
  </div>
  <!-- 이렇게 바꿔주면 v-show는 사용할 수 있다. -->
  <!-- 아래의 div, button은 위의 div#screen과 형제가 된다. -->
  <template v-show="result.length"> 
    <div>평균 시간: {{ average }} ms</div>
    <button @click="onClickReset">리셋</button>
  </template>
</div>
```

최상위 div에는 template를 사용할 수 없다. 최상위 div는 다른 방법으로 없앤다.

### 전체 코드

computed 부분을 잘 보자

```vue
<!-- html -->
<template>
  <div>
    <h1>반응속도 체크 - 비동기 처리 연습</h1>
    <!-- v-bind: html 속성에 vue data를 사용하고 싶을 때 사용 -->
    <!-- v-bind: 를 축약하면 : -->
    <!-- html 속성 앞에 : 을 붙이면 vue data를 쓸 수 있다 -->
    <!-- <div id="screen" v-bind:class="state">{{}}</div> -->
    <div id="screen" :class="state" @click="onClickScreen">
      {{ message }}
    </div>
    <div v-show="result.length">
      <!-- computed에 설정한 average 함수 -->
      <div>평균 시간: {{ average }} ms</div>
      <button @click="onClickReset">리셋</button>
    </div>
  </div>
</template>

<!-- js -->
<script>
// 초록 화면이 보여진 시각과 내가 클릭한 시각의 차를 구하기 위한 JS
let startTime = 0;
let endTime = 0;
let timeout = null; // setTimeout() 함수를 담을 변수

export default {
  data() {
    return {
      result: [],
      state: "waiting",
      message: "클릭해서 시작하세요"
    };
  },
  // 데이터를 계산해서 화면에 보여준다면, {{}} 안에서 계산하는 것보다 computed를 이용해서 처리한다.
  // 일반 data를 가공해서 사용할 때 computed를 쓴다.
  // computed를 쓰는 이유? 가공한 값이 캐싱이 된다. 성능 개선에 도움이 된다.
  computed: {
    average() {
      // reduce 함수. 초기값이 빈 배열이면 에러가 나므로 초기값 0 설정
      // 초기값이 NaN 이 뜨기 때문에 || 대체 연산자 이용
      return this.result.reduce((a, v) => a + v, 0) / this.result.length || 0;
    }
  },
  methods: {
    onClickReset() {
      this.result = [];
    },
    // onRest() {},
    // screen click 이벤트 함수
    onClickScreen() {
      if (this.state === "waiting") {
        this.state = "ready";
        this.message = "초록색이 되면 클릭하세요";
        timeout = setTimeout(() => {
          startTime = new Date(); // 초록 화면이 보여진 시각
          this.state = "now";
          this.message = "지금 클릭하세요!!";
        }, Math.floor(Math.random() * 1000) + 2000); // 2~3초
      } else if (this.state === "ready") {
        clearTimeout(timeout); // setTimeout 지우기
        this.state = "waiting";
        this.message = "지금이 아닙니다. 다시 시작하세요";
      } else if (this.state === "now") {
        endTime = new Date(); // 내가 클릭한 시각
        this.state = "waiting";
        this.message = "클릭해서 시작하세요.";
        this.result.push(endTime - startTime); // 내 반응속도
      }
    }
  }
};
</script>

<!-- css -->
<style scoped>
/* style 태그에 scoped를 붙여주면 아래 style 들은 해당 component에만 유효하다 */
/* vue style을 사용하기 위해선 vue-style-loader가 필요하다 */
#screen {
  width: 300px;
  height: 200px;
  text-align: center;
  user-select: none;
}
/* class에 따른 style 변화 */
#screen.waiting {
  background-color: aqua;
}
#screen.ready {
  background-color: red;
  color: white;
}
#screen.now {
  background-color: green;
}
</style>

```