<template>
  <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
import EventBus from "./EventBus";

export default {
  props: {
    cellData: String,
    rowIndex: Number,
    cellIndex: Number
  },
  methods: {
    onClickTd() {
      // 이미 차 있는 칸이라면 함수 종료
      if (this.cellData) return;
      // $on에 등록한 이벤트가 실행된다.
      // 2번째 인자부터는 인자를 넘길 수 있다.
      EventBus.$emit("clickTd", this.rowIndex, this.cellIndex);
    }
  }
};
</script>

<style scoped></style>
