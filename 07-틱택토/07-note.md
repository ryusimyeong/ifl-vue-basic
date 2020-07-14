# 7. 틱택토 - 2차원 배열, Vuex

프로그래밍에서 대부분의 자료가 2차원 배열 식으로 되어 있다.

예를 들면 엑셀 같은 경우가 2차원 배열 방식으로 데이터를 정리한다.

## 7-1 2차원 배열. 테이블 구조 짜기

컴포넌트 하나로 하지 않고 칸 하나마다 컴포넌트를 만들어주는 이유는 성능 때문이다.

컴포넌트를 하나만 하면 작은 부분만 변해도 전체 배열이 전부 다시 렌더링 되어야 하지만 컴포넌트를 칸 별로 잘게 쪼개 놓으면 변하는 부분만 렌더링시킬 수 있기 때문에 성능이 좋아진다.

### TickTackTo.vue

```vue
<!-- html -->
<template>
  <table-component :table-data="tableData"></table-component>
</template>

<!-- js -->
<script>
import TableComponent from "./TableComponent";

export default {
  components: {
    TableComponent
  },
  data() {
    return {
      // 2차원 배열 데이터
      tableData: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ]
    };
  },
  computed: {},
  methods: {}
};
</script>

<!-- css -->
<style scoped></style>

```

### TableComponent

```vue
<template>
  <table>
    <tr-component
      v-for="(rowData, index) in tableData"
      :key="index"
      :row-data="rowData"
      :row-index="index"
    ></tr-component>
  </table>
</template>

<script>
import TrComponent from "./TrComponent";

export default {
  props: {
    tableData: Array
  },
  component: {
    TrComponent
  }
};
</script>

<style scoped></style>

```

### TrComponent

```vue
<template>
  <tr>
    <td-component
      v-for="(cellData, index) in rowData"
      :key="index"
      :cell-data="cellData"
      :cell-index="index"
      :row-index="rowIndex"
    ></td-component>
  </tr>
</template>

<script>
import TdComponent from "./TdComponent";

export default {
  props: {
    rowData: Array,
    rowIndex: Number
  },
  component: {
    TdComponent
  }
};
</script>

<style scoped>
</style>
```

### TdComponent

```vue
<template>
  <td>{{cellData}}</td>
</template>

<script>
export default {
  props: {
    cellData: String,
    rowIndex: Number,
    cellIndex: Number
  }
};
</script>

<style scoped></style>

```

## 7-2 this.$root, this.$parent

Td위에 3개의 부모가 있다.

컴포넌트 수가 많아질수록 prop 관리가 어려워진다.

### 최상위 컴포넌트와 부모 컴포넌트 데이터에 바로 접근하기

```js
// 최상위 컴포넌트 data
console.log(this.$root.$data);

// 부모 컴포넌트 data
console.log(this.$parent.$data);
```

Vue 는 자식 컴포넌트에서 부모 컴포넌트의 data를 쉽게 조작할 수 있다.

## 7-3 Vue.set

2차원 배열에서 인덱스로 값에 접근하고 값을 변경하고 있다.

**뷰에서 배열이 있고, 배열 내부의 값을 인덱스를 이용해서 바꾸면 화면에 반영되지 않는다.**

**또 객체를 key로 값을 변경해도 화면에서 나타나지 않는다.**

대신 배열의 push 등의 메소드를 이용해서 값을 바꾸면 화면이 바뀐다.

### 해결 방법

#### 1

```js
// 1. vue import
import Vue from "vue";

// this.tableData[0][1] = "O"; --> 작동하지 않음
Vue.set(this.tableData[0], 1, "O"); // 2. Vue.set()을 이용해서 값 변경하기
```

#### 2

아니면  import 없이 아래와 같이 코딩

```js
this.$set(this.tableData[0], 1, "O"); 
```

여러 개의 인덱스를 사용하는 경우 가장 마지막 index가 두 번째 인자가 된다.

**배열에서 index**, **객체에서 key**를 사용하여 값을 변경할 때는 **this.$set**을 사용한다.

## 7-4 틱택토 완성

최상위 부모가 아니라 중간 부모들의 컴포넌트의 데이터를 수정해야 한다면 코드 작성이 굉장히 어려워진다.

이때 사용하는 게 Vuex (React의 Redux).

props 등 모든 data를 Vuex에서 중앙 통제를 해버린다.

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

## 7-6 Vuex 구조 세팅하기

