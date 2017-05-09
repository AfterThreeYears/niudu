<template>
  <div id="Hello">
    Hello
    <h1>背景图</h1>
    <div class="bg" />
    <h1>IMG</h1>
    <img src="~public/images/common/kol.png" alt="">
    <pre>{{user}}</pre>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import './Hello.css';

export default {
  name: 'Hello',
  asyncData({ store }) {
    return store.dispatch('fetchUserTest');
  },
  computed: {
    ...mapState({
      user(state) {
        return state.users.entities['1561426455'];
      },
    })
  },
};
</script>
