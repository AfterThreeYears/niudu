<template>
  <div id="CNodeDetail">
    <h2 class="CNodeDetail-title">{{detail.title}}</h2>
    <br>
    <hr />
    <br>
    <div class="CNodeDetail-info">
      <span>发布于 {{detail.create_atStr}}</span>
      <span>作者 {{detail.author.loginname}}</span>
      <span>{{detail.visit_count}} 次浏览</span>
      <span>来自 {{detail.tab}}</span>
    </div>
    <br>
    <section v-html="detail.content" class="CNodeDetail-content" />
    <br>
    <p class="CNodeDetail-replies">{{replyLength}}回复</p>
    <br>
    <ul>
      <li
        v-for="(reply, index) in detail.replies"
        :key="index"
        class="CNodeDetail-replyList"
      >
        <p class="CNodeDetail-loginname">{{reply.author.loginname}}</p>
        <div class="CNodeDetail-headPic-wrap">
          <lazy-img
            :src="reply.author.avatar_url"
            :alt="reply.author.avatar_url"
            class="CNodeDetail-headPic"
          />
        </div>
        <span v-html="reply.content"></span>
        {{reply.create_atStr}}
        <span class="CNodeDetail-reply_name">
          <template v-if="reply.reply_name">@</template>{{reply.reply_name}}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex';
import LazyImg from '@/component/common/LazyImg';
import titleMixin from '@/mixins/title.js';
import './CNodeDetail.css';

export default {
  name: 'CNode-detail',
  asyncData({ store, route}) {
    const id = route.params.id;
    return store.dispatch('fetchTopicsDetail', {
      id,
    });
  },
  mixins: [titleMixin],
  title() {
    return 'CNode';
  },
  components: {
    LazyImg,
  },
  computed: {
    ...mapState({
      detail(state) {
        return state.cnode.detail;
      },
    }),
    ...mapGetters([
      'replyLength',
    ])
  },
  created() {
    console.log('created');
    this.setHead({
      status: false,
    });

    const id = this.$route.params.id;
    this.fetchTopicsDetail({
      id,
    });
  },
  beforeRouteEnter (to, from, next) {
    // 进入页面之前把store里面的detail清空
    // https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
    next(vm => {
      vm.setTopicsDetail({});
    });
  },
  methods: {
    ...mapMutations([
      'setHead',
      'setTopicsDetail',
    ]),
    ...mapActions([
      'fetchTopicsDetail',
    ]),
  },
};
</script>
