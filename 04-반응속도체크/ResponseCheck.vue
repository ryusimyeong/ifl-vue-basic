<!-- html -->
<template>
  <div>
    <h1>반응속도 체크 - 비동기 처리 연습</h1>
    <!-- v-bind: html 속성에 vue data를 사용하고 싶을 때 사용 -->
    <!-- v-bind: 를 축약하면 : -->
    <!-- html 속성 앞에 : 을 붙이면 vue data를 쓸 수 있다 -->
    <!-- <div id="screen" v-bind:class="state">{{}}</div> -->
    <div id="screen" :class="state" @click="onClickScreen">
      {{ message }}
    </div>
    <div v-show="result.length">
      <!-- computed에 설정한 average 함수 -->
      <div>평균 시간: {{ average }} ms</div>
      <button @click="onClickReset">리셋</button>
    </div>
  </div>
</template>

<!-- js -->
<script>
// 초록 화면이 보여진 시각과 내가 클릭한 시각의 차를 구하기 위한 JS
let startTime = 0;
let endTime = 0;
let timeout = null; // setTimeout() 함수를 담을 변수

export default {
  data() {
    return {
      result: [],
      state: "waiting",
      message: "클릭해서 시작하세요"
    };
  },
  // 데이터를 계산해서 화면에 보여준다면, {{}} 안에서 계산하는 것보다 computed를 이용해서 처리한다.
  // 일반 data를 가공해서 사용할 때 computed를 쓴다.
  // computed를 쓰는 이유? 가공한 값이 캐싱이 된다. 성능 개선에 도움이 된다.
  computed: {
    average() {
      // reduce 함수. 초기값이 빈 배열이면 에러가 나므로 초기값 0 설정
      // 초기값이 NaN 이 뜨기 때문에 || 대체 연산자 이용
      return this.result.reduce((a, v) => a + v, 0) / this.result.length || 0;
    }
  },
  methods: {
    onClickReset() {
      this.result = [];
    },
    // onRest() {},
    // screen click 이벤트 함수
    onClickScreen() {
      if (this.state === "waiting") {
        this.state = "ready";
        this.message = "초록색이 되면 클릭하세요";
        timeout = setTimeout(() => {
          startTime = new Date(); // 초록화면이 보여진 시각
          this.state = "now";
          this.message = "지금 클릭하세요!!";
        }, Math.floor(Math.random() * 1000) + 2000); // 2~3초
      } else if (this.state === "ready") {
        clearTimeout(timeout); // setTimeout 지우기
        this.state = "waiting";
        this.message = "지금이 아닙니다. 다시 시작하세요";
      } else if (this.state === "now") {
        endTime = new Date(); // 내가 클릭한 시각
        this.state = "waiting";
        this.message = "클릭해서 시작하세요.";
        this.result.push(endTime - startTime); // 내 반응속도
      }
    }
  }
};
</script>

<!-- css -->
<style scoped>
/* style 태그에 scoped를 붙여주면 아래 style 들은 해당 component에만 유효하다 */
/* vue style을 사용하기 위해선 vue-style-loader가 필요하다 */
#screen {
  width: 300px;
  height: 200px;
  text-align: center;
  user-select: none;
}
/* class에 따른 style 변화 */
#screen.waiting {
  background-color: aqua;
}
#screen.ready {
  background-color: red;
  color: white;
}
#screen.now {
  background-color: green;
}
</style>
