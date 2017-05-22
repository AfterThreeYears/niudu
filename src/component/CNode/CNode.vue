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
      @fetch="autoFetch"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import LazyImg from '@/component/common/LazyImg';
import LoadMore from '@/component/common/LoadMore';
import titleMixin from '@/mixins/title';
import loadMore from '@/mixins/loadMore';
import { cnodeTagArr } from '@/config/tabs';
import './CNode.css';

export default {
  name: 'CNode',
  asyncData({ store }) {
    return store.dispatch('cnode/fetchTopics');
  },
  mixins: [titleMixin, loadMore],
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
    next(vm => {
      if (from.name) {
        vm.setLoading(true);
        vm.fetchTopics().then(() => {
          vm.setLoading(false);
        });
      }
    });
  },
  created() {
    this.allShow();
    this.setTagArrs(cnodeTagArr);
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
        // 重载不增加页数
        if (!reload) this.increasePage();
        try {
          const list = await this.fetchTopics();
          if (list >= this.limit) {
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
