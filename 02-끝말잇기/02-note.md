
## 2-1 컴포넌트의 필요성

컴포넌트를 왜 만들까

data를 겹치지 않고, 동일한 코드를 재사용하기 위해서는 각기 다른 data를 다 설정해줘야 한다. 끝말잇기로 예를 들면 inputValue1, inputValue2, inputValue3 식으로 data를 여러 개 만들어야 한다.

프로그래밍에서는 코드 중복을 최대한 줄여야 한다.

**반복되는 부분을 컴포넌트로 만들어서 재사용한다.**

컴포넌트 만들기

```html
<script>
  Vue.component("component-name", {
    template: ``,
    data() {
      return {}
    },
    methods: {

    }
  });
</script>
```

```html
  <body>
    <div id="root">
      <!-- vue 컴포넌트 이름을 태그 이름으로 사용한다. -->
      <word-relay />
      <word-relay />
      <word-relay />
    </div>
    <script>
      // Vue Component 만들기
      // 주로 파스칼 케이스나 케밥케이스를 사용한다.
      // Vue.component("컴포넌트 이름", {프로퍼티});
      Vue.component("word-relay", {
        // 화면에 표시될 기본 html 코드를 작성한다
        template: `
          <div>{{word}}</div>
          <form v-on:submit="onSubmitForm">
            <input id="answer" type="text" ref="answer" v-model="inputValue" />
            <button type="submit">입력</button>
            <div id="result">{{result}}</div>
          </form>
        `,
        data() {
          return {
            word: "성수동",
            inputValue: "",
            result: ""
          }
        },
        methods: {
          onSubmitForm(e) {
            e.preventDefault();
            if (this.word[this.word.length - 1] === this.inputValue[0]) {
              this.result = "정답!";
              this.word = this.inputValue; // 입력한 값을 제시어로
              this.inputValue = ""; // input 태그 비우기
              this.$refs.answer.focus(); // ref에 접근하기
            } else {
              this.result = "땡";
              this.inputValue = ""; // input 태그 비우기
              this.$refs.answer.focus();
            }
          }
        }
      });
    </script>
    <script>
      // new Vue 는 vue 인스턴스
      const app = new Vue({
        el: "#root"
      });
      // 화면 시작 시 input 태그에 focus
      document.querySelector("#answer").focus();
    </script>
  </body>

```

#### tips

코드 변수를 설정하는 방식들

1. **PascalCase** : 첫 글자와 띄어쓰기를 대문자로 구분
2. **camelCase** : 띄어쓰기를 대문자로 구분(첫 글자 소문자)
3. **kebab-case** : 첫 글자 소문자, 띄어쓰기는 **-**로 구분
4. **snake_case** : 첫 글자 소문자, 띄어쓰기는 언더바 **_**로 구분

## 2-2 컴포넌트의 특성

1. 컴포넌트에서 data는 객체를 반환하는 함수 형태로 정의되어야 한다.
2. 컴포넌트의 template내 최상위 태그는 반드시 하나여야 한다. div나 span등으로 묶어준다.

```js
data() {
  return {
    word: "성수동",
    inputValue: "",
    result: ""
  };
}
```

컴포넌트 자체가 재사용되는 코드. 재사용된 각 컴포넌트끼리 다른 data를 참조할 수 있도록 새로운 data를 반환하는 것이다.

```html
<div>{{word}}</div>
<form v-on:submit="onSubmitForm">
  <input id="answer" type="text" ref="answer" v-model="inputValue" />
  <button type="submit">입력</button>
</form>
<div id="result">{{result}}</div>
```
위 코드를 아래와 같이 고친다.

```html
<div>
  <div>{{word}}</div>
  <form v-on:submit="onSubmitForm">
    <input id="answer" type="text" ref="answer" v-model="inputValue" />
    <button type="submit">입력</button>
  </form>
  <div id="result">{{result}}</div>
</div>
```

쓸데없는 div를 사용하지 않으려면 (React의 Fragments처럼) 

```html
<template></template>
```
로 묶어주면 된다. 위 문법은 webpack을 사용해야만 가능하다.

컴포넌트들은 코드를 재사용하지만 각각 독립적으로 data를 만든다. 

컴포넌트는 인스턴스보다 위에 만든다.

스크립트는 div#root 아래에 있어야 한다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <title>02.끝말잇기-컴포넌트</title>
  </head>
  <body>
    <div id="root">
      <!-- vue 컴포넌트 이름을 태그 이름으로 사용한다. -->
      <!-- <word-relay /> 태그는 제대로 작동하지 않는다. -->
      <word-relay></word-relay>
      <word-relay></word-relay>
      <word-relay></word-relay>
    </div>
    <script>
      // Vue Component 만들기
      // 주로 케밥케이스를 사용한다. vue에서 대문자를 소문자로 인식하는 것 같다.
      // Vue.component("컴포넌트 이름", {프로퍼티});
      // 현재 아래 컴포넌트는 전역 컴포넌트.
      Vue.component("word-relay", {
        // 화면에 표시될 기본 html 코드를 작성한다
        template: `
        <div>
          <div>{{word}}</div>
          <form v-on:submit="onSubmitForm">
            <input id="answer" type="text" ref="answer" v-model="inputValue" />
            <button type="submit">입력</button>
          </form>
          <div id="result">{{result}}</div>
        </div>
        `,
        // 컴포넌트에선 data를 함수 형태로 만들어야 한다.
        // data 객체를 return 하는 함수
        data() {
          return {
            word: "성수동",
            inputValue: "",
            result: ""
          };
        },
        methods: {
          onSubmitForm(e) {
            e.preventDefault();
            if (this.word[this.word.length - 1] === this.inputValue[0]) {
              this.result = "정답!";
              this.word = this.inputValue; // 입력한 값을 제시어로
              this.inputValue = ""; // input 태그 비우기
              this.$refs.answer.focus(); // ref에 접근하기
            } else {
              this.result = "땡";
              this.inputValue = ""; // input 태그 비우기
              this.$refs.answer.focus();
            }
          }
        }
      });
    </script>
    <script>
      // new Vue 는 vue 인스턴스
      const app = new Vue({
        el: "#root"
      });
    </script>
  </body>
</html>

```

## 2-3 props 와 webpack 의 필요성

대부분 비슷한데, 조금씩은 다른 게 많이 나온다.

이럴 때 props를 사용한다.

vue html 은 케밥케이스로 작성하면, vue 자바스크립트 부분에선 카멜케이스로 받을 수 있다.

```html
<!-- word-relay 컴포넌트에 startWord라는 props를 전달 -->
<!-- vue는 케밥 케이스로 작성한다. -->
<word-relay start-word="성수"></word-relay>
<word-relay start-word="뚝섬"></word-relay>
<word-relay start-word="혜화"></word-relay>
```

```js
Vue.component("word-relay", {
  template: `
  <div>
    <div>{{word}}</div>
    <form v-on:submit="onSubmitForm">
      <input id="answer" type="text" ref="answer" v-model="inputValue" />
      <button type="submit">입력</button>
    </form>
    <div id="result">{{result}}</div>
  </div>
  `,
  // props 받기
  props: ["startWord"],
  data() {
    return {
      // props에 접근하기
      word: this.startWord,
      inputValue: "",
      result: ""
    };
  },
}
```

script 방식으로 작성하면, 나중에 엄청나게 많은 script를 사용하게 되면 그 순서를 정하는게 매우 힘들다.

그 복잡함을 webpack이 해결해준다.

이 많아진 script를 해결하는 게 webpack


```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <title>02.끝말잇기-컴포넌트</title>
  </head>
  <body>
    <div id="root">
      <!-- word-relay 컴포넌트에 startWord라는 props를 전달 -->
      <!-- vue는 케밥 케이스로 작성한다. -->
      <word-relay start-word="성수"></word-relay>
      <word-relay start-word="뚝섬"></word-relay>
      <word-relay start-word="혜화"></word-relay>
    </div>
    <script>
      // 현재 아래 컴포넌트는 전역 컴포넌트.
      // 아래 컴포넌트 이름을 wordRelay로 해도 된다.
      Vue.component("word-relay", {
        template: `
        <div>
          <div>{{word}}</div>
          <form v-on:submit="onSubmitForm">
            <input id="answer" type="text" ref="answer" v-model="inputValue" />
            <button type="submit">입력</button>
          </form>
          <div id="result">{{result}}</div>
        </div>
        `,
        // props 받기
        // vue html에서 케밥케이스로 작성했지만 자바스크립트에선 카멜케이스로 자동으로 변한다.
        // 자바스크립트에서 변수명에 -를 사용할 수 없기 때문
        props: ["startWord"],
        data() {
          return {
            // props에 접근하기
            word: this.startWord,
            inputValue: "",
            result: ""
          };
        },
        methods: {
          onSubmitForm(e) {
            e.preventDefault();
            if (this.word[this.word.length - 1] === this.inputValue[0]) {
              this.result = "정답!";
              this.word = this.inputValue;
              this.inputValue = "";
              this.$refs.answer.focus();
            } else {
              this.result = "땡";
              this.inputValue = "";
              this.$refs.answer.focus();
            }
          }
        }
      });
    </script>
    <script>
      const app = new Vue({
        el: "#root"
      });
    </script>
  </body>
</html>
```