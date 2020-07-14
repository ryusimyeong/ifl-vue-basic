// 데이터가 중앙 통제되는 곳
// store를 여러 개 만들 수 있다.
import Vue from "vue";
import Vuex from "vuex";

// vue랑 vuex를 연결하기. store를 생성하기 전에 반드시 해줘야 한다
// Vue 라이브러리 사용핟=기.
Vue.use(Vuex); // this.$store가 생성

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
  getters: {
    // 기존의 state를 이용해서 뭔가 계산이나 문자열 추가 등을 할 때.
    // 캐싱
    turnMessage(state) {
      return `${state.turn} 님의 승리`;
    },
  },
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
