// 데이터가 중앙 통제되는 곳
// store를 여러 개 만들 수 있다.
import Vue from 'vue';
import Vuex from 'vuex';

// vue랑 vuex를 연결하기. store를 생성하기 전에 반드시 해줘야 한다
// Vue 라이브러리 사용하기.
Vue.use(Vuex); // this.$store가 생성

// mutation 미리 설정
export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export default new Vuex.Store({
  state: {
    // data 저장
    tableData: [],
    data: {
      row: 0,
      cell: 0,
      mine: 0,
    },
    timer: 0,
    result: '',
  },
  getters: {},
  // state를 바꾸려면 mutation 사용
  mutations: {
    [START_GAME](state, { row, cell, mine }) {},
    [OPEN_CELL](state) {},
    [CLICK_MINE](state) {},
    [FLAG_CELL](state) {},
    [QUESTION_CELL](state) {},
    [NORMALIZE_CELL](state) {},
    [INCREMENT_TIMER](state) {},
  },
  actions: {},
});
