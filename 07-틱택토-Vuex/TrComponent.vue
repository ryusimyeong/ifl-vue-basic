<template>
  <tr>
    <td-component
      v-for="(cellData, index) in rowData"
      :key="index"
      :cell-index="index"
      :row-index="rowIndex"
    ></td-component>
  </tr>
</template>

<script>
import TdComponent from "./TdComponent";

export default {
  props: {
    rowIndex: Number,
  },
  components: {
    TdComponent,
  },
  computed: {
    rowData() {
      return this.$store.state.tableData[this.rowIndex];
    },
  },
};
</script>

<style scoped></style>
