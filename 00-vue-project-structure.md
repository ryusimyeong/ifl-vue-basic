### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>05-가위바위보</title>
  </head>
  <body>
    <!-- vue의 컴포넌트들이 mount될 div -->
    <div id="root"></div>
    <!-- webpack으로 합친 파일 -->
    <!-- 디렉토리와 파일의 이름은 webpack.config.js에서 설정한다. -->
    <script src="./dist/app.js"></script>
  </body>
</html>
```

### index.js

```js
// package.json 에서 Vue 가져오기
import Vue from "vue";
// index.js에 모든 vue 파일을 import 해야 한다
// webpack.confing.js의 resolve>extensions 에서 .js와 .vue를 명시했기 때문에 확장자는 적지 않아도 된다.
import VueComponent from "./VueComponent";

// #root에 마운트 만들기
// vue instance
// $mount() -> el 역할을 한다.
new Vue(VueComponent).$mount("#root");
```

### VueComponent.vue

```vue
<!-- html -->
<template> </template>

<!-- js -->
<script>
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<!-- css -->
<style scoped></style>
```