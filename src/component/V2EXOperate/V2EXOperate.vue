<template>
  <div class="V2EXOperate">
        <section class="V2EXOperate-section" v-if="isLogin">
        <p class="V2EXOperate-title">回复：</p>
        <textarea 
          class="V2EXOperate-textarea" 
          v-model="content" 
          placeholder="发表你的看法..." 
        />
        <button class="V2EXOperate-reply" @click="handleReply">回复</button>
        <!--<button @click="signOut">注销</button>-->
      </section>
      <section v-else>
        <div>
          <input type="text" v-model="account" placeholder="请输入账号" />
          <input type="password" v-model="passwd" placeholder="请输入密码" />
        </div>
        <button @click="login">登录</button>
      </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Toast from '@/ui/toast';
import './V2EXOperate.css';
const Cookies = require('js-cookie');

export default {
  name: 'v2ex-operate',
  data() {
    return {
      isLogin: '',
      content: '',
      token: '',
      account: '',
      passwd: '',
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
    this.isLogin = !!Cookies.get('A2');
  },
  methods: {
    ...mapActions({
      fetchComment: 'v2exDetail/fetchComment',
      fetchSignin: 'v2exDetail/fetchSignin',
      fetchDetail: 'v2exDetail/fetchDetail',
    }),
    async handleReply() {
      const {content} = this;
      const id = this.$route.params.id;
      const body = {
        id,
        content,
      };
      try {
        const data = await this.fetchComment(body);
      } catch (e) {
        Toast({
          message: e.response.data.error_msg,
          duration: 1000 * 3,
        });
        return;
      }
      // location.reload();
    },
    async login() {
      let data = null;
      const body = {
        account: this.account,
        passwd: this.passwd,
      };
      try {
        data = await this.fetchSignin(body);
      } catch (e) {
        console.log(e);
        Toast({
          message: e,
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
};
</script>
