<!-- html -->
<template>
  <div>
    <mine-form />
    <div>{{ timer }}</div>
    <table-component />
    <div>{{ result }}</div>
  </div>
</template>

<!-- js -->
<script>
import store from './store';
import { mapState } from 'vuex';
import TableComponent from './Tablecomponent';

export default {
  store,
  components: {
    TableComponent,
  },
  computed: {
    ...mapState(['time', 'result']),
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
