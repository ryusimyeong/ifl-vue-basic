## 7-5 EventBus

이벤트버스는 이벤트를 중앙에서 통제.

(Vuex는 데이터를 중앙에서 통제)

이벤트 버스는 이벤트를 최상위 컴포넌트에서 모두 통제할 수 있어서 편하다.

### EventBus.js

```js
// EventBus
import Vue from "vue";

export default new Vue();
```

위와 같이 빈 vue 인스턴스를 만든다.

### TickTackTo.vue

```js
import EventBus from "./EventBus";
```

스크립트 부분에 import한 뒤

**methods**에 사용할 함수를 정의한다. 

```js
methods: {
  onClickTd() {}
}
```

그리고 **created()**에 **$on**을 이용하여 등록한다. 

첫 번째 인자는 사용할 이름, 두 번째 인자는 등록할 함수

```js
created() {
  EventBus.$on("clickTd", this.onClickTd);
}
```

### TdComponent.vue

사용할 하위 컴포넌트에서는 $emit을 이용한다. 두 번째 파라미터부터 인자를 보낼 수도 있다.

```js
methods: {
    onClickTd() {
      // $on에 등록한 이벤트가 실행된다.
      // 2번째 인자부터는 인자를 넘길 수 있다.
      EventBus.$emit("clickTd", this.rowIndex, this.cellIndex);
    }
  }
```