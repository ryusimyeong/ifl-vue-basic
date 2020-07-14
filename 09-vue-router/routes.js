import Vue from "vue";
import VueRouter from "vue-router";
import NumberBaseBall from "../03-숫자야구/NumberBaseBall";
import ResponseCheck from "../04-반응속도체크/ResponseCheck";
import GawiBawiBo from "../05-가위바위보/GawiBawiBo";
import LottoGenerator from "../06-로또추첨기/LottoGenerator";
import GameMatcher from "./GameMatcher";

Vue.use(VueRouter);

export default new VueRouter({
  // mode: "history", // router가 history로 변함. 기본값은 해쉬.
  routes: [
    { path: "/number-baseball", component: NumberBaseBall },
    { path: "/response-check", component: ResponseCheck },
    { path: "/gawi-bawi-bo", component: GawiBawiBo },
    { path: "/lotto-generator", component: LottoGenerator },
    // 동적 라우팅
    { path: "/game/:name", component: GameMatcher },
  ],
});
