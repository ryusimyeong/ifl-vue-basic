## 7-6 Vuex

데이터를 중앙에서 통제한다.

store.js를 만든다. 

store를 여러 개 만들 수 있다.

```
$ npm i vuex
```

### store.js

store 기본 구조

```js
// 데이터가 중앙 통제되는 곳
// store를 여러 개 만들 수 있다.
import Vuex from "vuex";

// vue랑 vuex를 연결하기. store를 생성하기 전에 반드시 해줘야 한다
Vue.use(Vuex);

export default new Vuex.Store({
  // data와 비슷
  state: {},
  // computed와 비슷
  getters: {},
  // state를 수정할 때 사용 - 동기적으로.
  mutations: {},
  // 비동기를 사용할 때. 여러 뮤테이션을 연달아 실행할 때
  actions: {},
});

```

vuex와 최상위 컴포넌트도 연결해줘야 한다.

### TickTackTo.vue

```js
import store from "./store"; // 1. vuex와 최상위 컴포넌트 연결

export default {
  store, // 2. vuex와 최상위 컴포넌트 연결
}
```

store를 import하고 인스턴스 부분에 store르 등록

## 7-7 Vuex Mutations

### store.js

mutations의 함수 이름들은 대문자로 적는 게 컨벤션이다.

그리고 그 함수들을 다 변수로 만들고, 모듈로 만든다.

변수로 만드는 이유는 함수 이름 오타를 냈을 때 디버깅을 쉽게 하기 위해서다

만들어둔 mutations를 컴포넌트에서 사용할 때는

```js
this.$store.commit(mutation이름, 인자);
```

를 이용한다.

```js
// 데이터가 중앙 통제되는 곳
// store를 여러 개 만들 수 있다.
import Vuex from "vuex";
import Vue from "vue";

// 동적 속성
// mutations의 함수를 모두 변수로 만들고 모듈로 만든다.
// 변수로 만드는 이유는 오타로 인한 실수를 디버깅하기 위해서
export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";
export const RESET_GAME = "RESET_GAME";
export const NO_WINNER = "NO_WINNER";

export default new Vuex.Store({
  // data와 비슷
  state: {
    tableData: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    turn: "O", // 차례를 뜻하는 변수
    winner: "",
  },
  // computed와 비슷
  getters: {},
  // state를 수정할 때 사용 - 동기적으로.
  mutations: {
    // mutations의 함수는 대문자로 짓는 게 컨벤션
    [SET_WINNER](state, winner) {
      state.winner = winner;
    },
    [CLICK_CELL](state, { rowIndex, cellIndex }) {
      // 배열의 값을 index로 수정하고 있으니 Vue.set을 사용.
      // Vuex는 this.$set이 없기 때문에 Vue.set을 사용한다.
      Vue.set(state.tableData[rowIndex], cellIndex, state.turn);
    },
    [CHANGE_TURN](state) {
      state.turn = state.turn === "O" ? "X" : "O";
    },
    [RESET_GAME](state) {
      state.turn = "O";
      state.tableData = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
    },
    [NO_WINNER](state) {
      state.winner = "";
    },
  },
  // 비동기를 사용할 때. 여러 뮤테이션을 연달아 실행할 때
  actions: {},
});

```

## 7-8 Vuex state 사용하기

state는 computed를 이용한다.

부모 자식 간에 props를 주고 받을 필요가 많이 적어진다.

```js
export default {
  props: {
    rowIndex: Number,
    cellIndex: Number,
  },
  // Vuex의 state를 사용하려면 computed에 연결해야 한다.
  computed: {
    cellData() {
      return this.$store.state.tableData[this.rowIndex][this.cellIndex];
    },
    tableData() {
      return this.$store.state.tableData;
    },
    turn() {
      return this.$store.state.turn;
    },
  },
}
```

## 7-9 mapState 

state의 수가 많아져서 component에 적기 어려울 때 사용한다.

```js
export default {
  computed: {
    winner() {
      return this.$store.state.winner;
    },
    turn() {
      return this.$store.state.turn;
    },
  },
}
```

```js
export default {
  computed: {
    // state 한 방에 꺼내기
    ...mapState(["winner", "turn"]),
  },
}
```

state 하나하나를 구체적으로 설정해줄 수도 있다.
```js
export default {
  computed: {
    ...mapState({
      // 화살표 함수 형태
      tableData: (state) => state.tableData,
      // 일반 함수 형태. this를 사용할 수 있다.
      turn(state) {
        return state.turn;
      },
      cellData(state) {
        return state.tableData[this.rowIndex][this.cellIndex];
      },
    }),    
  },
}
```

## 7-10 slot

react의 children과 비슷한 개념

자식 컴포넌트 태그 사이에 태그를 넘겨주면 

자식 컴포넌트 내부에서 `<slot />`을 사용하면 넘겨진 태그를 rendering 할 수 있다.

왜 쓰느냐?

**부모 컴포넌트의 data, event를 이용해서 자식 컴포넌트에서 rendering 할 수 있다.**

자식 컴포넌트를 부모 컴포넌트가 제어하게 된다.

제어의 역전. Inversion Of Control(IOC).

### tips

v-for 의 key를 할 때, 배열이 중간에 삭제된다면 index를 하는 건 별로다. 중간 것이 삭제 되면 그 다음 것들도 다 리렌더링되기 때문이다.

Math.random() 등을 이용하자