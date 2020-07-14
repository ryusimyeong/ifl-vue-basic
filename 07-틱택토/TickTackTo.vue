<!-- html -->
<template>
  <div>
    <div>{{ turn }}님의 턴입니다.</div>
    <table-component :table-data="tableData"></table-component>
    <div v-if="winner">{{ winner }}님의 승리</div>
  </div>
</template>

<!-- js -->
<script>
import TableComponent from "./TableComponent";

export default {
  components: {
    TableComponent,
  },
  data() {
    return {
      // 2차원 배열 데이터
      tableData: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      // 차례를 뜻하는 변수
      turn: "O",
      winner: "",
    };
  },
  computed: {},
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
