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
            <p class="CNode-detail-tab">{{topic.tabStr}}</p>
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
    <LoadMore
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
import LoadMore from '@/component/common/LoadMore';
import titleMixin from '@/mixins/title';
import { cnodeTagArr } from '@/config/tabs';
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
    return store.dispatch('cnode/fetchTopics');
  },
  mixins: [titleMixin],
  title() {
    return 'CNode';
  },
  components: {
    LazyImg,
    LoadMore,
  },
  computed: {
    ...mapState({
      cnodeTopics(state) {
        return state.cnode.entities;
      },
      limit(state) {
        return state.cnode.limit;
      },
    }),
  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      if (from.name && !vm.cnodeTopics.length) {
        vm.setLoading(true);
        try {
          await vm.fetchTopics();
        } catch (e) {}
        vm.setLoading(false);
      }
    });
  },
  mounted() {
    this.allShow();
    this.setTagArrs(cnodeTagArr);
    this.isEnd =  this.cnodeTopics.length < this.limit;
  },
  methods: {
    ...mapActions({
      fetchTopics: 'cnode/fetchTopics',
    }),
    ...mapMutations({
      increasePage: 'cnode/increasePage',
      allShow: 'header/allShow',
      setTagArrs: 'header/setTagArrs',
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
