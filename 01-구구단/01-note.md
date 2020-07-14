## 1-1

SPA에서는 화면의 어떤 요소가 변하는지, 그리고 그 요소고 데이터에 따라 어떻게 변하는지가 가장 중요하다. 

여러 페이지가 아니라 한 개의 페이지로 변화를 표현해야 하기 때문이다.

즉, 우리는 데이터(state)를 관리한다. state에 따라 화면이 어떻게 변하는지를 관리한다.

## 1-2

기본적인 vue 인스턴스 만들기

```html
<script>
    // 여기서 app은 Vue의 인스턴스
    const app = new Vue({
      // 제어할 요소 선택
      // 어떤 부분이 바뀌는지, 그걸 데이터로 관리하는 게 가장 중요하다.
      // el, data, methods는 정해진 이름. 
      // liked, methods 등은 자유
      el: "#root",
      data: {
        liked: false
      },
      methods: {
        onClickButton() {
          // 여기서 this는 위의 data
          this.liked = true;
        }
      }
    });
  </script>
```

위의 코드를 통해 #root를 vue가 통제하고 있다.

```html
  <body>
    <div id="root">
      <!-- 'v-' vue가 통제하는 속성들 -->
      <!-- 아래의 liked는 data 내부의 liked -->
      <!-- liked가 true면 아래 div 표시 -->
      <div v-if="liked">좋아요 눌렀음</div>
      <!-- v-on:click 클릭 이벤트 연결 -->
      <!-- liked가 false면 아래 버튼 표시 -->
      <button v-else v-on:click="onClickButton">좋아요</button>
    </div>
  </body>
```

**v-if, v-else-if, v-else는 형제태그면서 인접해야 한다.**

**v-**가 붙은 속성의 **""** 안은 JS 코드를 작성할 수 있다.

```html
<div v-if="liked + 1 === 5"></div>
```

**v-if=""**의 ""에 들어가는 것은 vue 인스턴스의 **data**의 프로퍼티,

**v-on:event=""**의 ""에 들어가는 것은 vue 인스턴스의 **methods** 프로퍼티

## 1-3 보간법과 v-model

SPA에서는 **어떤 데이터에 의해 어떤 부분이 어떻게 변하는지**를 생각한다.

React의 state랑 Vue의 data랑 비슷하다.

```html
<body>
    <div id="root">
      <!-- {{}} 중괄호 두번으로 data 내부의 변수를 렌더링할 수 있다. -->
      <!-- 중괄호 안에도 JS 식이 가능하다. 예를 들면 사칙연산 -->
      <!-- {{firstNumber + secondNumber}} -->
      <div>{{firstNumber}}곱하기 {{secondNumber}}는?</div>
      <form action="">
        <!-- v-model -->
        <!-- input과 data를 연결할 수 있다. -->
        <!-- 아래는 input 태그의 value와 data.inputValue를 연결한 것 -->
        <input type="number" v-model="inputValue" />
        <button>입력</button>
        <!-- 위 input 태그에 작성하는 내용이 아래 div에 적힌다 -->
        <div>{{inputValue}}</div>
      </form>
      <div id="result"></div>
    </div>
    <script>
      const app = new Vue({
        el: "#root",
        data: {
          // Math.random() * 9 는 0이상 9미만의 난수를 발생
          // Math.ceil() 을 통해 1이상 9이하 정수를 얻는다.
          firstNumber: Math.ceil(Math.random() * 9),
          secondNumber: Math.ceil(Math.random() * 9),
          inputValue: "",
          result: ""
        },
        methods: {}
      });
    </script>
  </body>
```

vue 인스턴스의 data를 html 텍스트에 렌더링하고 싶으면 **{{}}**을 사용한다. 

## 1-4 

화면의 구성은 한 번 잡아놓으면 웬만하면 건들지 않는다. 거의 99%.

우리가 관리해야 하는 것은 data. **data가 어떻게 변하고, 그것에 따라 화면의 어떤 부분이 어떻게 변할지만 생각한다.**

data에 관련한 것이 아니라 태그에 직접 접근해야 할 때 **ref**를 사용한다. 예를 들면 input 태그에 focus 하기 등.

```html
<!-- vue는 아래 input태그에 ref를 통해 접근할 수 있다. -->
<input type="number" ref="answer" v-model="inputValue" />
```

위의 태그를 

```js
// this.$refs.설정한ref이름
// 아래와 같이 ref를 붙인 태그에 접근할 수 있다.
this.$refs.answer.focus();
```

vue 인스턴스 내에서 위와 같이 사용할 수 있다. 

ref는 어쩔 수 없는 상황이 아니면 사용한다. 특히 ref를 통해 value를 변경시키면 안된다. 모든 value는 data로 제어한다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>1. 구구단</title>
    <!-- vue CDN -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="root">
      <!-- {{}} 중괄호 두번으로 data 내부의 변수를 렌더링할 수 있다. -->
      <!-- 중괄호 안에도 JS 식이 가능하다. 예를 들면 사칙연산 -->
      <div>{{firstNumber}}곱하기 {{secondNumber}}는?</div>
      <!-- v-on:을 addEventListener로 생각하자 -->
      <form v-on:submit="onSubmitForm">
        <!-- v-model -->
        <!-- input과 data를 연결할 수 있다. -->
        <!-- 아래는 input 태그의 value와 data.inputValue를 연결한 것 -->
        <!-- vue는 아래 input태그에 ref를 통해 접근할 수 있다. -->
        <input type="number" ref="answer" v-model="inputValue" />
        <button type="submit">입력</button>
      </form>
      <div id="result">{{result}}</div>
    </div>
    <script>
      const app = new Vue({
        el: "#root",
        data: {
          // Math.random() * 9 는 0이상 9미만의 난수를 발생
          // Math.ceil() 을 통해 1이상 9이하 정수를 얻는다.
          firstNumber: Math.ceil(Math.random() * 9),
          secondNumber: Math.ceil(Math.random() * 9),
          inputValue: "",
          result: ""
        },
        methods: {
          onSubmitForm(e) {
            // form이 기본적으로 행하는 새로고침 방지
            e.preventDefault();
            // console.log() 를 사용하여 디버깅 가능
            // this 안에 data와 methods가 담겨 있다
            console.log(this);
            console.log(this.firstNumber, this.secondNumber, this.inputValue);
            if (
              this.firstNumber * this.secondNumber ===
              Number(this.inputValue)
            ) {
              this.result = "정답!";
              // 문제 다시 내기
              this.firstNumber = Math.ceil(Math.random() * 9);
              this.secondNumber = Math.ceil(Math.random() * 9);
              // 입력한 값 비우기
              this.inputValue = "";
              // this.$refs.설정한ref이름
              // 아래와 같이 ref를 붙인 태그에 접근할 수 있다.
              this.$refs.answer.focus();
            } else {
              this.result = "땡!";
              // 입력한 값 비우기
              this.inputValue = "";
              this.$refs.answer.focus();
            }
          }
        }
      });
    </script>
  </body>
</html>
```

## 1-5

위의 내용 복습

html 태그를 작성하고, 화면에서 변하는 부분을 data에 작성한다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <title>02.끝말잇기</title>
  </head>
  <body>
    <div id="root">
      <div>{{word}}</div>
      <!-- v-on: vue의 addEventListner -->
      <form v-on:submit="onSubmitForm">
        <!-- v-model : input태그와 inputValue 연결 -->
        <!-- ref : vue에서 html 태그 접근 -->
        <input id="answer" type="text" ref="answer" v-model="inputValue" />
        <button type="submit">입력</button>
        <div id="result">{{result}}</div>
      </form>
    </div>
    <script>
      const app = new Vue({
        el: "#root",
        data: {
          // 초반 제시어 "성수동"
          word: "성수동",
          inputValue: "",
          result: ""
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
      // 화면 시작 시 input 태그에 focus
      document.querySelector("#answer").focus();
    </script>
  </body>
</html>
```

## 1-6

화면 변화 v-show, v-if와 v-else 등으로 통제한다. 

모든 page의 요소를 작성해놓고 변화는 부분만 v-if등으로 data 조건 분기를 통해 제어한다. methods로 event를 제어한다.

SPA는 화면 전환은 빠르지만, 첫 화면 로딩이 느려지고 페이지 용량 자체가 커진다. 따라서 코드 스플릿, SSR로 해결한다.
