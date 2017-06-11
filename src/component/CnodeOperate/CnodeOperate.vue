<template>
  <div class="CnodeOperate">
    <section v-if="isLogin">
      <textarea v-model="content" placeholder="发表你的看法..." />
      <button @click="handleReply">回复</button>
      <button @click="signOut">注销</button>
    </section>
    <section v-else>
      <input
        type="text" v-model="token" placeholder="请输入accesstoken" />
      <button @click="login">登录</button>
    </section>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import Toast from '@/ui/toast';
import './CnodeOperate.css';

export default {
  name: 'Cnode-operate',
  data() {
    return {
      isLogin: '',
      content: '',
      token: '',
    };
  },
  props: {
    reply_id: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.token = localStorage.cnodeToken;
    this.isLogin = !!localStorage.cnodeToken;
  },
  methods: {
    ...mapActions({
      fetchComment: 'cNodeDetail/fetchComment',
      validateLogined: 'cNodeDetail/validateLogined',
      fetchTopicsDetail: 'cNodeDetail/fetchTopicsDetail',
    }),
    async handleReply() {
      const {id, content, token} = this;
      const body = {
        id,
        accesstoken: token,
        content,
        reply_id: this.reply_id,
      };
      if (!body.reply_id) delete body.reply_id;
      try {
        const data = await this.fetchComment(body);
      } catch (e) {
        Toast({
          message: e.response.data.error_msg,
          duration: 1000 * 3,
        });
        return;
      }
      this.fetchTopicsDetail({
        id,
      });
    },
    async login() {
      let data = null;
      try {
        data = await this.validateLogined(this.token);
      } catch (e) {
        Toast({
          message: e.response.data.error_msg,
          duration: 1000 * 3,
        });
        return;
      }
      Toast({
        message: '登陆成功',
        duration: 1000 * 3,
      });
      localStorage.cnodeToken = this.token;
      this.isLogin = true;
    },
    signOut() {
      localStorage.cnodeToken = '';
      this.token = false;
      this.isLogin = false;
      Toast({
        message: '注销成功',
        duration: 1000 * 3,
      });
    },
    setContent(content = '') {
      this.content = content;
    },
  },
  computed: {
    ...mapState({
      id(state) {
        return state.cNodeDetail.detail.id;
      },
    }),
  },
};
</script>
