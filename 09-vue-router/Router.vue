<!-- html -->
<template>
  <div>
    <!-- router-view가 아니면 공통 -->
    <div>
      <!-- React의 Link -->
      <router-link to="/game/index?data=1&hello=2">게임매쳐</router-link>
      <router-link to="/game/number-baseball">숫자야구</router-link>
      <router-link to="/game/response-check">반응속도</router-link>
      <router-link to="/game/gawi-bawi-bo">가위바위보</router-link>
      <router-link to="/game/lotto-generator">로또생성기</router-link>
    </div>
    <!-- route들이 나타남 -->
    <router-view></router-view>
  </div>
</template>

<!-- js -->
<script>
import router from "./routes";

export default {
  router,
};
</script>

<!-- css -->
<style></style>
