<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
export default {
  props: {
    cellData: String,
    rowIndex: Number,
    cellIndex: Number,
  },
  methods: {
    onClickTd() {
      // 이미 차 있는 칸이라면 함수 종료
      if (this.cellData) return;

      const rootData = this.$root.$data;
      // 하위 컴포넌트에서 상위 컴포넌트 data 변경하기
      this.$set(
        rootData.tableData[this.rowIndex], // 마지막 직전까지의 인덱스
        this.cellIndex, // 마지막 인덱스
        rootData.turn // 변경하려는 값
      );
      // 3목 체크
      let win = false;
      // 가로줄 3목
      if (
        rootData.tableData[this.rowIndex][0] === rootData.turn &&
        rootData.tableData[this.rowIndex][1] === rootData.turn &&
        rootData.tableData[this.rowIndex][2] === rootData.turn
      ) {
        win = true;
      }
      // 세로줄 3목
      if (
        rootData.tableData[0][this.cellIndex] === rootData.turn &&
        rootData.tableData[1][this.cellIndex] === rootData.turn &&
        rootData.tableData[2][this.cellIndex] === rootData.turn
      ) {
        win = true;
      }
      // 대각선 3목
      if (
        rootData.tableData[0][0] === rootData.turn &&
        rootData.tableData[1][1] === rootData.turn &&
        rootData.tableData[2][2] === rootData.turn
      ) {
        win = true;
      }
      if (
        rootData.tableData[0][2] === rootData.turn &&
        rootData.tableData[1][1] === rootData.turn &&
        rootData.tableData[2][0] === rootData.turn
      ) {
        win = true;
      }
      // 누군가 이겼다면
      if (win) {
        // 해당 턴 사람 승리
        rootData.winner = rootData.turn;
        // 초기화
        rootData.turn = "O";
        rootData.tableData = [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ];
      } else {
        // 무승부인 경우
        let draw = true; // draw 이 true면 무승부

        // tableData에 빈 칸이 있으면 draw 아님
        rootData.tableData.forEach((row) => {
          row.forEach((cell) => {
            if (!cell) {
              draw = false;
            }
          });
        });

        // 무승부
        if (draw) {
          // 초기화
          rootData.winner = "";
          rootData.turn = "O";
          rootData.tableData = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
          ];
        } else {
          // 누군가 이기지도 않았고, 무승부도 아님
          // 게임이 진행 중
          rootData.turn = rootData.turn === "O" ? "X" : "O";
        }
      }
    },
  },
};
</script>

<style scoped></style>
