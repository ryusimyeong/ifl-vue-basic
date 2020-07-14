<!-- html -->
<template>
  <div>
    <div>{{ turn }}님의 턴입니다.</div>
    <table-component></table-component>
    <div v-if="winner">{{ winner }} 님의 승리</div>
  </div>
</template>

<!-- js -->
<script>
import { mapState } from "vuex";
import store from "./store"; // 1. vuex와 최상위 컴포넌트 연결
import TableComponent from "./TableComponent";

export default {
  store, // 2. vuex와 최상위 컴포넌트 연결
  components: {
    TableComponent,
  },
  computed: {
    // state 한 방에 꺼내기
    ...mapState(["winner", "turn", "tableData"]),
    // getters 사용하기
    turnMessage() {
      return this.$store.getters.turnMessage;
    },
    // winner() {
    //   return this.$store.state.winner;
    // },
    // turn() {
    //   return this.$store.state.turn;
    // },
  },
  methods: {
    onChangeData() {
      // this.tableData[0][1] = "O"; --> 작동하지 않음
      // Vue.set(this.tableData[0], 1, "O"); // Vue.set()을 이용해서 값 변경하기
      this.$set(this.tableData[0], 1, "O"); // 위와 동일
    },
  },
};
</script>

<!-- css -->
<style>
table {
  border-collapse: collapse;
}

td {
  border: 1px solid black;
  width: 40px;
  height: 40px;
  text-align: center;
}
</style>
