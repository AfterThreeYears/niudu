<template>
  <div id="v2exDetail">
    <h2 class="v2exDetail-title">{{detail.content.title}}</h2>
    <br>
    <hr />
    <br>
    <div
      class="markdown-body v2exDetail-content"
      v-once
      v-html="detail.content.markdown"
    />
    <br>
    <hr />
    <br>
    <h5
      v-once
      v-html="detail.content.lastReply"
      class="v2exDetail-info"
    />
    <ul>
      <li
        class="v2exDetail-list"
        v-for="(reply, idx) in detail.replier"
        :key="idx"
      >

        <div class="clearfix v2exDetail-headPic-wrap">
          <lazy-img
            :src="reply.avatar"
            :alt="reply.avatar"
            class="v2exDetail-headPic"
          />
        </div>
        <div class="v2exDetail-detail">
          <div class="v2exDetail-detail-left">
            <p>{{reply.dark}} {{reply.small}}</p>
            <p v-html="reply.replyContent" />
          </div>
          <div class="v2exDetail-detail-right">
            <span>{{+idx + 1}}楼</span>
          </div>
        </div>
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
