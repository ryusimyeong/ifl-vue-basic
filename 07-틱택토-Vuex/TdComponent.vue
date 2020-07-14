<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
import { mapState } from "vuex";
import {
  CLICK_CELL,
  SET_WINNER,
  RESET_GAME,
  NO_WINNER,
  CHANGE_TURN,
} from "./store";

export default {
  props: {
    rowIndex: Number,
    cellIndex: Number,
  },
  // Vuex의 state를 사용하려면 computed에 연결해야 한다.
  computed: {
    // mapState 구체적으로 작성하기
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
    // cellData() {
    //   return this.$store.state.tableData[this.rowIndex][this.cellIndex];
    // },
    // tableData() {
    //   return this.$store.state.tableData;
    // },
    // turn() {
    //   return this.$store.state.turn;
    // },
  },
  methods: {
    onClickTd() {
      // 이미 차 있는 칸이라면 함수 종료
      if (this.cellData) return;

      const rootData = this.$root.$data;
      // store를 사용할 때는 commit 사용
      // 첫 번째는 mutations 이름. 두번쨰는 인자
      this.$store.commit(CLICK_CELL, {
        rowIndex: this.rowIndex,
        cellIndex: this.cellIndex,
      });

      let win = false;
      // 가로줄 3목
      if (
        this.tableData[this.rowIndex][0] === this.turn &&
        this.tableData[this.rowIndex][1] === this.turn &&
        this.tableData[this.rowIndex][2] === this.turn
      ) {
        win = true;
      }
      // 세로줄 3목
      if (
        this.tableData[0][this.cellIndex] === this.turn &&
        this.tableData[1][this.cellIndex] === this.turn &&
        this.tableData[2][this.cellIndex] === this.turn
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
        this.$store.commit(SET_WINNER, this.turn); // 해당 턴 사람 승리
        this.$store.commit(RESET_GAME); // 초기화
      } else {
        // 무승부인 경우
        let draw = true; // draw 이 true면 무승부

        // tableData에 빈 칸이 있으면 draw 아님
        this.tableData.forEach((row) => {
          row.forEach((cell) => {
            if (!cell) {
              draw = false;
            }
          });
        });

        if (draw) {
          this.$store.commit(NO_WINNER); // 무승부
          this.$store.commit(RESET_GAME); // 초기화
        } else {
          // 누군가 이기지도 않았고, 무승부도 아님
          this.$store.commit(CHANGE_TURN); // 턴 바꾸기
        }
      }
    },
  },
};
</script>

<style scoped></style>
