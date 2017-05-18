<template>
  <div id="V2EX">
    <ul>
      <li class="V2EX-List" v-for="topic in v2exTopics">
        <h6 class="text-line-clamp2v V2EX-title">{{topic.title}}</h6>
        <div class="V2EX-detail">
          <div class="clearfix V2EX-detail-info">
            <section class="clearfix V2EX-detail-imgWrap">
              <lazy-img
                :src="topic.avatar"
                :alt="topic.avatar"
                class="V2EX-detail-info-img"
              />
            </section>
            <p class="text-ellipsis V2EX-detail-loginname">{{topic.author}}</p>
            <p class="text-ellipsis V2EX-detail-last_reply_at">{{topic.last_time}}</p>
          </div>
          <div class="V2EX-detail-params">
            <p class="V2EX-detail-tab">{{topic.node}}</p>
            <div class="V2EX-detail-count">
              <span class="V2EX-detail-text">
                <span class="V2EX-detail-reply_count">{{topic.count}}</span>
              </span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import LazyImg from '@/component/common/LazyImg';
import titleMixin from '@/mixins/title';
import { v2exTagArr } from '@/config/tabs';
import './V2EX.css';

export default {
  name: 'V2EX',
  asyncData({ store }) {
    return store.dispatch('v2exList/fetchTopics');
  },
  mixins: [titleMixin],
  title() {
    return 'V2EX';
  },
  components: {
    LazyImg,
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name) {
        vm.fetchTopics();
      }
    });
  },
  created() {
    this.allShow();
    this.setTagArrs(v2exTagArr);
  },
  methods: {
    ...mapActions({
      fetchTopics: 'v2exList/fetchTopics',
    }),
    ...mapMutations({
      allShow: 'header/allShow',
      setTagArrs: 'header/setTagArrs',
    }),
  },
  computed: {
    ...mapState({
      v2exTopics(state) {
        return state.v2exList.entities;
      },
    }),
  },
};
</script>
