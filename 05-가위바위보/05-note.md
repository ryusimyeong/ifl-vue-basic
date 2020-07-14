# 5 가위바위보 - vue lifecycle

## 5-1 vue-devtools

크롬 확장프로그램

크롬 웹 스토어 -> vue 검색 - Vue.js devtools 설치

설치하면 개발자도구에 Vue 라는 새로운 탭이 생기고 data를 쉽게 확인할 수 있다.

vue로 만든 페이지에 접속하면 해당 아이콘이 활성화 된다.

배포 환경에서는 vue-devtools를 못 보게 해야 보안에 좋다.

### 컴포넌트 이름

기본 html 태그와 구분을 위해 두 개 단어 이상으로 사용한다.

### webpack-dev-server를 사용했더니 dist가 없다?

webpack-dev-server를 사용하면 dist/app.js 등 하ㅂ쳐진 파일이 생기지 않는다. 

webpack의 output을 파일로 만들어 저장하는 게 아니라 컴퓨터 메모리에 저장한다. 

**output**에 작성한 **publicPath/filename**으로 메모리에 저장한다.

## 5-2 v-bind:class, v-bind:style

class 와 style은 v-bind를 이용할 때 값에 객체를 이용하여 여러 개를 넣을 수 있다.

```vue
<template>
  <div id="computer" :class="{ state: true, hello: false }" :style="{ color: "white", fontSize: "14px" }"></div>
</template>
```

### 이벤트 함수에 인자 넣어서 활용하기

```vue
<template>
  <!-- onClickButton에 인자를 넣어서 활용 가능 -->
  <!-- 즉시 실행되지 않는다. - 헷갈리는 부분 -->
  <button @click="onClickButton('바위')">바위</button>
  <button @click="onClickButton('가위')">가위</button>
  <button @click="onClickButton('보')">보</button>
</template>
```

인자를 넣어 활용할 수 있는데, 저 함수는 즉시 실행되지 않는다. 헷갈리는 부분

인스턴스 methods에 아래와 같이 작성

```
methods: {
  onClickButton(choice) {}
}
```

## 5-3 vue 라이프 사이클

컴포넌트가 생기고, 마운트 되고, 수정되고, 사라지는 라이프 사이클

**created, mounted, updated, destroyed**

위 네 개가 중요하다.

1. created - 컴포넌트가 생성되고, 화면에 나타나기 직전
2. mounted - 화면에 나타난 후. 비동기 처리가 여기서 주로 이뤄진다. 앞에 **async**를 붙일 수 있다.
3. updated - 화면의 data가 바뀌어서 화면이 다시 렌더링된 후
4. destroyed - 컴포넌트가 화면에서 사라진 후

각각 before~가 존재한다.

beforeCreate 컴포넌트가 생성되기 전
created 컴포넌트의 생성된 후.
beforeMount 화면에 렌더링되기 전
mounted 화면에 렌더링된 후
beforeUpdate 업데이트 되기 전
updated 업데이트된 후
beforeDestory 컴포넌트가 사라지기 전
destroyed 사라진 후

화면을 조작하는 코드는 mounted에 적어주는 게 좋다. 화면에 잘 출력된 다음 조작하는 게 오류가 없다.

데이터가 다 준비 되면 created. <- 자바스크립트에서만 존재

화면에 나타나면 mounted.

## 5-4 게임 완성. 

```vue
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

```