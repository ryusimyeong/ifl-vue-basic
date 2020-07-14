# 9 Vue Router

```
$ npm i vue-router
```

router는 눈속임이다. 하나의 페이지에서 화면과 주소만 바뀔 뿐이다.

routes.js 파일 생성

### routes.js

```js
import Vue from "vue";
import VueRouter from "vue-router";
import NumberBaseBall from "../03-숫자야구/NumberBaseBall";
import ResponseCheck from "../04-반응속도체크/ResponseCheck";
import GawiBawiBo from "../05-가위바위보/GawiBawiBo";
import LottoGenerator from "../06-로또추첨기/";

// 연결
Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: "/number-baseball", component: NumberBaseBall },
    { path: "/response-check", component: ResponseCheck },
    { path: "/gawi-bawi-bo", component: GawiBawiBo },
    { path: "/lotto-generator", component: LottoGenerator },
  ],
});

```

### Router.vue 

최상위 컴포넌트와 vue router 연결하기


```vue
<!-- html -->
<template> </template>

<!-- js -->
<script>
import router from "./routes";

export default {
  router,
};
</script>

<!-- css -->
<style></style>

```

## 9-2 router-view, 히스토리 라우터

해쉬라우터는 새로고침할 때 좋다. #이 붙어있음.

#데이터는 브라우저에서만 알수 있다. 새로고침할 때 편하다

새로고침은 서버에 요청을 보내는 것

실무에서는 검색 SEO 때문에 히스토리 라우터(리액트 브라우져 라우터)를 쓴다.

그런데 history router는 새로고침을 하면 깨진다.

왜냐면 router들의 주소는 가상의 주소이기 때문이다.

히스토리 router의 새로고침 문제를 해결하기 위해선 server를 만들어서 server에 해당 주소를 등록해줘야 한다.

### routes.js

```js
export default new VueRouter({
  mode: "history", // router가 history로 변함. 기본값은 해쉬.
  routes: [
    { path: "/number-baseball", component: NumberBaseBall },
    { path: "/response-check", component: ResponseCheck },
    { path: "/gawi-bawi-bo", component: GawiBawiBo },
    { path: "/lotto-generator", component: LottoGenerator },
  ],
});
```

## 9-3 동적 라우팅 매칭

**:id**를 이용한 동적 라우팅

```js
routes: [
  { path: "/number-baseball", component: NumberBaseBall },
  { path: "/response-check", component: ResponseCheck },
  { path: "/gawi-bawi-bo", component: GawiBawiBo },
  { path: "/lotto-generator", component: LottoGenerator },
  // 동적 라우팅
  { path: "/game/:name", component: GameMatcher },
],
```

this.$route로 현재 route의 정보를 알아낼 수 있다. (router는 router 전체)

this.$route 내부의 params에 :name으로 들어온 이름을 얻을 수 있다.

### GameMatcher.vue

```vue
<template>
  <div>
    <div v-if="currentGame === 'number-baseball'">
      <number-baseball></number-baseball>
    </div>
    <div v-else-if="currentGame === 'response-check'">
      <response-check></response-check>
    </div>
    <div v-else-if="currentGame === 'lotto-generator'">
      <lotto-generator></lotto-generator>
    </div>
    <div v-else>일치하는 게임이 없습니다.</div>
  </div>
</template>

<script>
import NumberBaseball from "../03-숫자야구/NumberBaseball";
import ResponseCheck from "../04-반응속도체크/ResponseCheck";
import LottoGenerator from "../06-로또추첨기/LottoGenerator";

export default {
  components: {
    NumberBaseball,
    ResponseCheck,
    LottoGenerator,
  },
  mounted() {
    console.log(this.$route);
  },
  computed: {
    currentGame() {
      return this.$route.params.name;
    },
  },
};
</script>

```

## 9-4 주소 쿼리스트링

**주소?data=1&hello=3** 주소를 통해 데이터를 전달하는 것

this.$route.query 로 접근할 수 있다.

쿼리스트링은 server에도 전달이 된다. 
page=3, offset 등 페이징 할 때 많이 쓴다.

현재 보고 있는 페이지를 기록해주는 것

params에는 해당 라우트의 대표적인 데이터를 담고 세부적인 내용은 query로 담는다.


근데 쿼리스트링에서 **#**을 붙여 쓰면 server는 모른다.

### tip

코드 스플리팅