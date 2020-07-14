<!-- 자바스크립트 파일이라고 생각하자 -->
<!-- vue component를 작성한다. -->

<!-- html -->
<template>
  <div>
    <h1>숫자야구</h1>
    <h1>{{ result }}</h1>
    <!-- v-on: 을 @로 바꿀 수 있다. -->
    <!-- .prevent 는 e.preventDefault() -->
    <form @submit.prevent="onSubmitForm">
      <input
        type="text"
        minlength="4"
        maxlength="4"
        ref="answer"
        v-model="inputValue"
      />
      <button type="submit">입력</button>
    </form>
    <div>시도: {{ tries.length }}</div>
    <ul>
      <!-- "" 안은 JS 코드이므로 try, function 등 예약어를 사용할 수 없다 -->
      <!-- v-for에는 key가 필요하다. v-bind가 필요하다 -->
      <li v-for="t in tries" :key="t.try">
        <div>{{ t.try }}</div>
        <div>{{ t.result }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
// 자바스크립트 코드는 <script> 안에 넣으면 된다.
// 임의의 4자리 수를 반환하는 함수
const getNumber = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];

  for (let i = 0; i < 4; i++) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

// component 부분
// main.js에서 import 하면 export default 객체가 가져가진다
export default {
  data() {
    return {
      answer: getNumber(), // 배열
      inputValue: "",
      result: "",
      tries: []
    };
  },
  methods: {
    onSubmitForm(e) {
      // e.preventDefault(); 대신 template 부분에서 @submit.prevent로 바꿀 수 있다.
      // 배열과 문자열을 비교하기 위해 join();
      if (this.inputValue === this.answer.join("")) {
        // input 입력값을 tries에 넣는다.
        this.tries.push({
          try: this.inputValue,
          result: "홈런"
        });
        this.result = "홈런";
        alert("홈런입니다. 게임을 다시 시작합니다.");
        // 초기화
        this.inputValue = "";
        this.tries = [];
        this.$refs.answer.focus();
      } else {
        // 틀렸을 때
        if (this.tries.length >= 9) {
          // 10번 넘게 틀렸을 때
          this.inputValue = "";
          this.result = `10번 초과! 실패! 답은 ${this.answer.join(
            ""
          )} 였습니다.`;
          alert("실패했습니다. 게임을 다시 시작합니다.");
          // 초기화
          this.answer = getNumber();
          this.tries = [];
          this.$refs.answer.focus();
        }
        let strikes = 0;
        let balls = 0;
        const answerArray = this.inputValue.split("").map(v => Number(v));

        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === this.answer[i]) {
            // 숫자 및 자릿수가 맞을 때
            strikes++;
          } else if (this.answer.includes(answerArray[i])) {
            // 숫자만 정답
            balls++;
          }
        }
        this.tries.push({
          try: this.inputValue,
          result: `${strikes} 스트라이크, ${balls} 볼`
        });
        this.inputValue = "";
        this.$refs.answer.focus();
      }
    }
  }
};
</script>

<!-- css -->
<style></style>
