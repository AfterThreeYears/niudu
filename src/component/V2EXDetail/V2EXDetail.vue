<template>
  <div id="v2exDetail">
    <h2 class="v2exDetail-title">{{detail.content.title}}</h2>
    <br>
    <hr />
    <br>
    <h6>{{detail.content.lastReply}}</h6>
    <p>{{detail.content.markdown}}</p>
    <ul>
      <li
        v-for="(reply, index) in detail.replier"
        :key="index"
      >
        <div class="v2exDetail-headPic-wrap">
          <lazy-img
            :src="reply.avatar"
            :alt="reply.avatar"
            class="v2exDetail-headPic"
          />
        </div>
        <p>{{reply.dark}} {{reply.small}}</p>
        <p>{{reply.replyContent}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import LazyImg from '@/component/common/LazyImg';
import titleMixin from '@/mixins/title';
import loadMore from '@/mixins/loadMore';
import './V2EXDetail.css';

export default {
  name: 'v2ex-detail',
  asyncData({ store, route }) {
    const id = route.params.id;
    const pageIndex = 1;
    console.log(id, pageIndex);
    return store.dispatch('v2exDetail/fetchDetail', {
      id, pageIndex,
    });
  },
  mixins: [titleMixin, loadMore],
  title() {
    return this.detail.content.title;
  },
  components: {
    LazyImg,
  },
  computed: {
    ...mapState({
      detail(state) {
        return state.v2exDetail.detail;
      },
      pageIndex(state) {
        return state.v2exDetail.pageIndex;
      },
      limit(state) {
        return state.v2exDetail.limit;
      },
    }),
    id() {
      return this.$route.params.id || 1;
    },

  },
  created() {
    this.setHead({
      status: false,
    });
  },
  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      if (from.name) {
        vm.setLoading(true);
        const id = to.params.id;
        const pageIndex = vm.$route.query.pageIndex;
        await vm.fetchDetail({
          id,
        });
        vm.setLoading(false);
      }
    });
  },
  methods: {
    ...mapMutations({
      setHead: 'header/setHead',
      setDetail: 'v2exDetail/setDetail',
      setLoading: 'header/setLoading',
      increasePage: 'v2exDetail/increasePage',
    }),
    ...mapActions({
      fetchDetail: 'v2exDetail/fetchDetail',
    }),
    handleFetchTopics() {
      return new Promise(async (resolve) => {
        this.increasePage();
        const {id, pageIndex, limit} = this;
        const replyList = await this.fetchDetail({
          id, pageIndex
        });
        if (replyList === limit) {
          resolve();
        } else {
          // 到底部了
        }
      });
    },
  },
};
</script>
