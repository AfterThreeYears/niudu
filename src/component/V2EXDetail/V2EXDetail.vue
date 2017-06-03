<template>
  <div id="v2exDetail">
    <h2 class="v2exDetail-title">{{detail.content.title}}</h2>
    <br>
    <h5
      v-html="detail.content.lastReply"
      class="v2exDetail-info"
    />
    <br>
    <hr />
    <br>
    <div
      class="markdown-body v2exDetail-content"
      v-html="detail.content.markdown"
    />
    <br>
    <hr />
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
            <p class="v2exDetail-replyContent" v-html="reply.replyContent" />
          </div>
          <div class="v2exDetail-detail-right">
            <span>{{+idx + 1}}楼</span>
          </div>
        </div>
      </li>
    </ul>
    <infinite-scroll
      :is-loading="isLoading"
      :load-err="loadErr"
      :is-end="isEnd"
      @load="handleFetchTopics"
    />
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import InfiniteScroll from '@/component/common/InfiniteScroll';
import LazyImg from '@/component/common/LazyImg';
import titleMixin from '@/mixins/title';
import './V2EXDetail.css';

export default {
  name: 'v2ex-detail',
  data() {
    return {
      isLoading: false,
      isEnd: false,
      loadErr: false,
    }
  },
  asyncData({ store, route }) {
    // store.commit('header/setHead', {
    //   status: false,
    // });
    store.commit('v2exDetail/resetPage');
    store.commit('header/setLoading', true);
    // 进来之前把所有的数据先清空
    store.commit('v2exDetail/reset');
    const id = route.params.id;
    const pageIndex = 1;
    return store.dispatch('v2exDetail/fetchDetail', {
      id, pageIndex,
    }).then(() => {
      store.commit('header/setLoading', false);
    })
  },
  mixins: [titleMixin],
  title() {
    return this.detail.content.title;
  },
  components: {
    LazyImg,
    InfiniteScroll,
  },
  computed: {
    ...mapState({
      v2exTopics(state) {
        return state.v2exList.entities;
      },
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
  mounted() {
    this.isEnd = this.detail.replier.length < this.limit;
  },
  async beforeRouteLeave(to, from, next) {
    if (!this.v2exTopics.length) {
      this.setLoading(true);
      await this.fetchTopics();
      this.setLoading(false);
      next();
    } else {
      next();
    }
  },
  methods: {
    ...mapMutations({
      // setHead: 'header/setHead',
      setDetail: 'v2exDetail/setDetail',
      setLoading: 'header/setLoading',
      increasePage: 'v2exDetail/increasePage',
      reset: 'v2exDetail/reset',
      resetPage: 'v2exDetail/resetPage',
    }),
    ...mapActions({
      fetchDetail: 'v2exDetail/fetchDetail',
      fetchTopics: 'v2exList/fetchTopics',
    }),
    handleFetchTopics(reload) {
      return new Promise(async (resolve, reject) => {
        this.isLoading = true;
        // 重载不增加页数
        if (!reload) this.increasePage();
        try {
          const {id, pageIndex, limit} = this;
          const replyList = await this.fetchDetail({
            id, pageIndex
          });
          this.isLoading = false;
          this.loadErr = false;
          resolve();
          if (replyList >= limit) {
            this.isEnd = false;
          } else {
            // 到底部了
            this.isEnd = true;
          }
        } catch (e) {
          //出现错误了
          reject();
          this.loadErr = true;
        }
      });
    },
  },
};
</script>
