<template>
  <div id="CNode">
    <ul>
      <li class="CNode-List" v-for="topic in cnodeTopics">
        <router-link :to="{ name: 'CNodeDetail', params: { id: topic.id }}">
          <h6 class="text-line-clamp2v CNode-title">{{topic.title}}</h6>
          <div class="CNode-detail">
            <div class="clearfix CNode-detail-info">
              <section class="clearfix CNode-detail-imgWrap">
                <lazy-img
                  :src="topic.author.avatar_url"
                  :alt="topic.author.avatar_url"
                  class="CNode-detail-info-img"
                />
              </section>
              <p class="text-ellipsis CNode-detail-loginname">{{topic.author.loginname}}</p>
              <p class="text-ellipsis CNode-detail-last_reply_at">{{topic.last_reply_at_str}}</p>
            </div>
            <div class="CNode-detail-params">
              <badge size="large" type="primary">{{topic.tabStr}}</badge>
              <div class="CNode-detail-count">
                <span class="CNode-detail-text">
                  <span class="CNode-detail-reply_count">{{topic.reply_count}}</span>/{{topic.visit_count}}
                </span>
              </div>
            </div>
          </div>
        </router-link>
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
import { mapState, mapActions, mapMutations } from 'vuex';
import LazyImg from '@/component/common/LazyImg';
import InfiniteScroll from '@/component/common/InfiniteScroll';
import titleMixin from '@/mixins/title';
import './CNode.css';

export default {
  name: 'CNode',
  data() {
    return {
      isLoading: false,
      isEnd: false,
      loadErr: false,
    }
  },
  asyncData({ store }) {
    store.commit('header/setLoading', true);
    return store.dispatch('cnode/fetchTopics').then(() => {
      store.commit('header/setLoading', false);
    });
  },
  mixins: [titleMixin],
  title() {
    return 'CNode';
  },
  components: {
    LazyImg,
    InfiniteScroll,
  },
  computed: {
    ...mapState({
      cnodeTopics(state) {
        return state.cnode.list;
      },
      limit(state) {
        return state.cnode.limit;
      },
    }),
  },
  watch: {
    cnodeTopics() {
      this.isEnd =  this.cnodeTopics.length < this.limit;
    },
  },
  methods: {
    ...mapActions({
      fetchTopics: 'cnode/fetchTopics',
    }),
    ...mapMutations({
      increasePage: 'cnode/increasePage',
      setLoading: 'header/setLoading',
    }),
    handleFetchTopics(reload) {
      return new Promise(async (resolve, reject) => {
        this.isLoading = true;
        // 重载不增加页数
        if (!reload) this.increasePage();
        try {
          const list = await this.fetchTopics();
          this.isLoading = false;
          this.loadErr = false;
          resolve();
          if (list >= this.limit) {
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
