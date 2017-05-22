<template>
  <div id="v2exDetail">
    <h2 class="v2exDetail-title">{{detail.content.title}}</h2>
    <br>
    <hr />
    <br>
    <h5 v-once v-html="detail.content.lastReply" />
    <p v-once v-html="detail.content.markdown" />
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
        <p v-html="reply.replyContent" />
      </li>
    </ul>
    <LoadMore
      :is-loading="isLoading"
      :load-err="loadErr"
      :is-end="isEnd"
      @fetch="autoFetch"
    />
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import LoadMore from '@/component/common/LoadMore';
import LazyImg from '@/component/common/LazyImg';
import titleMixin from '@/mixins/title';
import loadMoreFn from '@/mixins/loadMore';
import './V2EXDetail.css';

export default {
  name: 'v2ex-detail',
  asyncData({ store, route }) {
    const id = route.params.id;
    const pageIndex = 1;
    return store.dispatch('v2exDetail/fetchDetail', {
      id, pageIndex,
    });
  },
  mixins: [titleMixin, loadMoreFn],
  title() {
    return this.detail.content.title;
  },
  components: {
    LazyImg,
    LoadMore,
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
        vm.reset();
        vm.setLoading(true);
        const id = to.params.id;
        const pageIndex = 1;
        await vm.fetchDetail({
          id, pageIndex
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
      reset: 'v2exDetail/reset',
    }),
    ...mapActions({
      fetchDetail: 'v2exDetail/fetchDetail',
    }),
    handleFetchTopics(reload) {
      return new Promise(async (resolve, reject) => {
        // 重载不增加页数
        if (!reload) this.increasePage();
        try {
          const {id, pageIndex, limit} = this;
          const replyList = await this.fetchDetail({
            id, pageIndex
          });
          if (replyList >= limit) {
            resolve(false);
          } else {
            // 到底部了
            resolve(true);
          }
        } catch (e) {
          //出现错误了
          reject();
        }

      });
    },
  },
};
</script>
