<template>
  <div class="ball" :style="styleObject">{{ number }}</div>
</template>

<script>
export default {
  name: "LottoBall", // 이거 안 적으면 파일명이 컴포넌트 이름이 된다.
  // 부모 컴포넌트로부터 받는 props
  // number는 변수 이름. Number는 자료형: Number, String, Boolean 등
  // props로 받은 값은 readonly. 수정할 수 없다.
  props: {
    number: Number
  },
  // number라는 prop을 갖고 계산을 하기 때문에 computed를 사용한다.
  // 기존 값을 계산하여 새로운 값을 만든다면 computed를 쓴다.
  computed: {
    styleObject() {
      let background = null;
      if (this.number < 10) {
        background = "red";
      } else if (this.number < 20) {
        background = "orange";
      } else if (this.number < 30) {
        background = "yellow";
      } else if (this.number < 40) {
        background = "green";
      } else {
        background = "blue";
      }
      return { background };
    }
  }
};
</script>

<style scoped>
.ball {
  display: inline-block;
  border: 1px solid black;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  margin-right: 20px;
}
</style>
