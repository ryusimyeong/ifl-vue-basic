<template>
  <table>
    <tr-component
      v-for="(rowData, index) in tableData"
      :key="index"
      :row-index="index"
    ></tr-component>
  </table>
</template>

<script>
import TrComponent from "./TrComponent";

export default {
  computed: {
    tableData() {
      return this.$store.state.tableData;
    },
  },
  components: {
    TrComponent,
  },
};
</script>

<style scoped></style>
