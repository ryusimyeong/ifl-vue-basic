<!-- html -->
<template>
  <div>
    <h1>로또추첨기</h1>
    <div id="result">
      <!-- props도 v-bind로 넘길 수 있다. -->
      <lotto-ball v-for="ball in winBalls" :key="ball" :number="ball"></lotto-ball>
    </div>
    <div>보너스</div>
    <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
    <button @click="onClickRedo" v-if="redo">한 번 더!</button>
  </div>
</template>

<!-- js -->
<script>
// 자식 컴포넌트 import
import LottoBall from "./LottoBall";

const timeouts = []; // clearTimeout을 처리하기 위한 배열

// 공 6개와 보너스 공 1개
const getWinNumbers = () => {
  console.log("getWinNumbers");
  // 길이가 45이고 요소가 1, 2, 3, ... 45인 배열
  const candidate = Array(45)
    .fill(1)
    .map((v, i) => v + i);
  // 뽑힐 공이 담길 빈 배열
  const shuffle = [];
  // candidate의 원소를 1개씩 제거해나가는 반복문
  while (candidate.length > 0) {
    shuffle.push(
      // splice(i번째 요소부터, n개의 원소를 제거) 제거된 원소를 요소로 하는 배열 return
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
};

export default {
  // 자식 컴포넌트 등록하기
  components: {
    // key는 template에서 사용할 태그 이름. value는 import한 변수
    // 아래 코드는 LottoBall만 써도 vue가 알아서 왼쪽의 kebob으로 바꿔 준다.
    "lotto-ball": LottoBall
  },
  data() {
    return {
      // 공 구하기
      winNumbers: getWinNumbers(),
      // 화면에 공 하나씩하나씩 보여주기 위한 변수
      winBalls: [],
      bonus: null,
      redo: false
    };
  },
  computed: {},
  methods: {
    // 여러 번 사용하는 함수는 method로 만들어서 재사용한다.
    showBalls() {
      // 화면이 렌더링된 직후 실행
      for (let i = 0; i < this.winNumbers.length - 1; i++) {
        // winNumbers 안에는 보너스 공이 들어있기 때문에 일단 6개만 뽑는다.
        // 1개씩 등장시키기 위해 각 공마다 등장 시점을 다르게 정해준다.
        timeouts[i] = setTimeout(() => {
          this.winBalls.push(this.winNumbers[i]);
        }, (i + 1) * 1000);
      }
      // 보너스 공을 보여주고 한 번 더 버튼 표시
      timeouts[6] = setTimeout(() => {
        this.bonus = this.winNumbers[6];
        this.redo = true;
      }, 7000);
    },
    onClickRedo() {
      this.winNumbers = getWinNumbers();
      this.winBalls = [];
      this.bonus = null;
      this.redo = false;
      // this.showBalls();
    }
  },
  // life cycle
  mounted() {
    this.showBalls();
  },
  beforeDestroy() {
    // timeout을 제거하여 memory leak 방지
    timeouts.forEach(t => clearTimeout(t));
  },
  // watch
  // 감시하고자 하는 data로 함수를 만든다.
  // current와 old를 이용할 수 있다.
  // 이때 data는 원시형 자료인 게 좋다. 참조형이면 주소가 같아 똑같아진다.
  // watch는 웬만하면 사용하지 말자. 프로그램이 커지면 복잡해진다.
  watch: {
    bonus(currentValue, oldValue) {
      console.log(currentValue, oldValue);
      // winBalls의 길이가 0이 되면 showBalls 실행
      if (currentValue === null) {
        this.showBalls();
      }
    }
  }
};
</script>

<!-- css -->
<style scoped></style>
