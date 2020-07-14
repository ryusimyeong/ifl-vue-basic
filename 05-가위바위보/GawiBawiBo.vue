<!-- html -->
<template>
  <div>
    <!-- JS 방식으로 CSS 속성을 표시해야 한다. -->
    <div id="computer" :style="computedStyleObject"></div>
    <div>
      <!-- onClickButton에 인자를 넣어서 활용 가능 -->
      <!-- 즉시 실행되지 않는다. - 헷갈리는 부분 -->
      <button @click="onClickButton('rock')">바위</button>
      <button @click="onClickButton('scissor')">가위</button>
      <button @click="onClickButton('paper')">보</button>
    </div>
    <div>{{ result }}</div>
    <div>현재 {{ score }}점</div>
  </div>
</template>

<!-- js -->
<script>
// 이미지 스프라이팅을 위한 좌표
// 명시적인 코딩을 위해 변수에 값을 담아 작성한다
const coords = {
  rock: "0px",
  scissor: "-142px",
  paper: "-284px"
};
// 점수 계산을 위한 숫자
const scores = {
  rock: 0,
  scissor: 1,
  paper: -1
};

// computer의 선택 구하기
// Object.entries(obj)는 obj의 key, value로 이루어진 배열들을 원소로 하는 한 개의 배열을 return
// Array.prototype.find() 는 배열에서 조건값을 true로 만족하는 값을 return
// 결국 imgCoord에 들어온 값에 따라 key를 반환
const computerChoice = imgCoord => {
  return Object.entries(coords).find(v => {
    return v[1] === imgCoord;
  })[0];
};

let interval = null; // setInterval 저장할 변수
let timeout = null;

export default {
  data() {
    return {
      imgCoord: coords.rock,
      result: "",
      score: 0
    };
  },
  // style에 추가적인 문자열 처리가 붙어 있으므로 computed로 처리한다
  computed: {
    computedStyleObject() {
      return {
        background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0px`
      };
    }
  },
  methods: {
    changeHand() {
      interval = setInterval(() => {
        if (this.imgCoord === coords.rock) {
          this.imgCoord = coords.scissor;
        } else if (this.imgCoord === coords.scissor) {
          this.imgCoord = coords.paper;
        } else if (this.imgCoord === coords.paper) {
          this.imgCoord = coords.rock;
        }
      }, 100);
    },
    onClickButton(choice) {
      // 결과 확인을 위해 interval 멈추기
      clearInterval(interval);
      const myScore = scores[choice];
      const computerScore = scores[computerChoice(this.imgCoord)];
      const diff = myScore - computerScore;
      if (diff === 0) {
        this.result = "비겼습니다.";
      } else if ([-1, 2].includes(diff)) {
        // diff === -1 || diff === 2
        this.result = "이겼습니다.";
        this.score += 1;
      } else {
        this.result = "졌습니다.";
        this.score -= 1;
      }
      // 결과 계산 후 1초 뒤에 다시 손 변화
      timeout = setTimeout(this.changeHand, 1000);
    }
  },
  // life cycle
  beforeCreate() {
    console.log("before create");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("before mount");
  },
  mounted() {
    console.log("mounted");
    // 화면이 렌더링 되자마자 컴퓨터 손 바꾸기
    this.changeHand();
  },
  beforeUpdate() {
    console.log("before update");
  },
  updated() {
    console.log("updated");
  },
  beforeDestroy() {
    console.log("before destroy");
    // 화면에서 사라질 때, 설정한 interval 등을 정리해줘야 한다.
    // destroyed에서 해도 된다.
    // timeout과 interval 등은 여기서 꼭 정리해줘야 한다.
    clearInterval(interval);
    clearTimeout(timeout);
  },
  destroyed() {
    console.log("destroyed");
  }
};
</script>

<!-- css -->
<style scoped>
#computer {
  width: 142px;
  height: 200px;
  background-position: 0 0;
}
</style>
