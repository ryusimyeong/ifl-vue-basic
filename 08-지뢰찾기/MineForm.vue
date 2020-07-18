<template>
  <div>
    <input
      type="number"
      placeholder="세로"
      :value="row"
      @change="onChangeRow"
    />
    <input
      type="number"
      placeholder="가로"
      :value="cell"
      @change="onChangeCell"
    />
    <input
      type="number"
      placeholder="지뢰"
      :value="mine"
      @change="onChangeMine"
    />
    <button @click="onClickBtn">시작</button>
  </div>
</template>

<script>
import { START_GAME } from './store';
export default {
  // 해당 컴포넌트에서만 사용하는 데이터는 지역 데이터를 만들어 쓰는 것이 합리적이다.
  data() {
    return {
      row: 10,
      cell: 10,
      mine: 20,
    };
  },
  methods: {
    onChangeRow(e) {
      this.row = e.target.value;
    },
    onChangeCell(e) {
      this.cell = e.target.value;
    },
    onChangeMine(e) {
      this.mine = e.target.value;
    },
    onClickBtn() {
      this.$store.commit(START_GAME, {
        row: this.row,
        cell: this.cell,
        mine: this.mine,
      });
    },
  },
};
</script>

<style></style>
