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
import EventBus from "./EventBus";

export default {
  components: {
    TableComponent
  },
  data() {
    return {
      // 2차원 배열 데이터
      tableData: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ],
      // 차례를 뜻하는 변수
      turn: "O",
      winner: ""
    };
  },
  computed: {},
  methods: {
    onChangeData() {
      // this.tableData[0][1] = "O"; --> 작동하지 않음
      // Vue.set(this.tableData[0], 1, "O"); // Vue.set()을 이용해서 값 변경하기
      this.$set(this.tableData[0], 1, "O"); // 위와 동일
    },
    // 하위 컴포넌트 $emit으로부터 받는 파라미터
    onClickTd(rowIndex, cellIndex) {
      // 이미 차 있는 칸이라면 함수 종료
      if (this.cellData) return;

      // 하위 컴포넌트에서 상위 컴포넌트 data 변경하기
      this.$set(
        this.tableData[rowIndex], // 마지막 직전까지의 인덱스
        cellIndex, // 마지막 인덱스
        this.turn // 변경하려는 값
      );
      // 3목 체크
      let win = false;
      // 가로줄 3목
      if (
        this.tableData[rowIndex][0] === this.turn &&
        this.tableData[rowIndex][1] === this.turn &&
        this.tableData[rowIndex][2] === this.turn
      ) {
        win = true;
      }
      // 세로줄 3목
      if (
        this.tableData[0][cellIndex] === this.turn &&
        this.tableData[1][cellIndex] === this.turn &&
        this.tableData[2][cellIndex] === this.turn
      ) {
        win = true;
      }
      // 대각선 3목
      if (
        this.tableData[0][0] === this.turn &&
        this.tableData[1][1] === this.turn &&
        this.tableData[2][2] === this.turn
      ) {
        win = true;
      }
      if (
        this.tableData[0][2] === this.turn &&
        this.tableData[1][1] === this.turn &&
        this.tableData[2][0] === this.turn
      ) {
        win = true;
      }
      // 누군가 이겼다면
      if (win) {
        // 해당 턴 사람 승리
        this.winner = this.turn;
        // 초기화
        this.turn = "O";
        this.tableData = [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""]
        ];
      } else {
        // 무승부인 경우
        let draw = true; // draw 이 true면 무승부

        // tableData에 빈 칸이 있으면 draw 아님
        this.tableData.forEach(row => {
          row.forEach(cell => {
            if (!cell) {
              draw = false;
            }
          });
        });

        // 무승부
        if (draw) {
          // 초기화
          this.winner = "";
          this.turn = "O";
          this.tableData = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
          ];
        } else {
          // 누군가 이기지도 않았고, 무승부도 아님
          // 게임이 진행 중
          this.turn = this.turn === "O" ? "X" : "O";
        }
      }
    }
  },
  // created 에 EventBus 작성
  created() {
    EventBus.$on("clickTd", this.onClickTd);
  }
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
