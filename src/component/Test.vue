<template>
  <div>
    <ui-icon name="alipay" />
    <ul>
      <li v-for="item in 20">
        <p>{{item}}</p>
        <router-link :to="{ name: 'test1' }">test1</router-link>
      </li>
    </ul>
    <div>
      <badge size="large" type="primary">10</badge>
      <badge size="large" type="warning">10</badge>
      <badge size="large" type="error">10</badge>
      <badge size="large" type="success">10</badge>
    </div>
    <br />
    <div>
      <badge size="normal" type="primary">10</badge>
      <badge size="normal" type="warning">10</badge>
      <badge size="normal" type="error">10</badge>
      <badge size="normal" type="success">10</badge>
    </div>
    <br />
    <div>
      <badge size="small" type="primary">10</badge>
      <badge size="small" type="warning">10</badge>
      <badge size="small" type="error">10</badge>
      <badge size="small" type="success">10</badge>
    </div>
    <br />
    <div>
      <badge size="large" color="#ccc">自定义大</badge>
      <badge size="normal" color="#abcdef">自定义中</badge>
      <badge size="small" color="#abcdff">自定义小</badge>
    </div>
  </div>
</template>

<script>
import badge from '@/ui/badge/index';
export default {
  components: {
    badge,
  }
}
</script>
