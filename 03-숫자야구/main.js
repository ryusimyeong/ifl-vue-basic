// package.json 에서 Vue 가져오기
import Vue from "vue";
// main.js에 모든 vue 파일을 import 해야 한다
import NumberBaseball from "./NumberBaseball";

// #root에 마운트 만들기
// vue instance
// $mount() -> el 역할을 한다.
new Vue(NumberBaseball).$mount("#root");
