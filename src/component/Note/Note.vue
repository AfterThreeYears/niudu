<template>
  <div id="note">
    Note
    <div>
      <button @click='adds'>add</button>
      <button @click='handleRemove'>remove</button>
      <button @click="filter">love</button>
      <button @click="all">all</button>
      <button @click="save">save</button>
      <button @click="handleLike">{{isLike ? '讨厌' : '喜欢'}}</button>
      <h1>list</h1>
      <ul>
        <li
          v-for="note in noteList"
          @click="choseNote(note)"
        >
          {{note.brandName}}
        </li>
      </ul>
    </div>
    <hr />
    <input :value="curNote.brandName" @input="handleUpdateTitle" />
    <textarea
     :value="curNote.productNameZH"
     @input="handleUpdateContent"
     rows="8"
     cols="80"
     class="content"
    >
    </textarea>
    <img :src="curNote.showPicPath" alt="">
  </div>
</template>

<script>
import {mapGetters, mapState, mapActions, mapMutations} from 'vuex';
import './Note.css';
export default {
  name: 'Note',
  data() {
    return {
      status: 'all',
    }
  },
  asyncData ({ store }) {
    // console.log('asyncData哈哈哈哈');
    return store.dispatch('initData');
  },
  computed: {
    ...mapState({
      noteList(state) {
        if (this.status === 'all') {
          return state.note.noteList;
        } else if (this.status === 'like') {
          return state.note.noteList.filter(item => item.love);
        }
      },
      curNote(state) {
        return state.note.curNote;
      },
    }),
    isLike() {
      return this.curNote.love;
    },
  },
  methods: {
    ...mapActions([
      'remove',
      'save',
      'add',
      'toggleLike',
      'all',
    ]),
    ...mapMutations([
      'setCurNote',
      'updateTitle',
      'updateContent',
    ]),
    adds() {
      this.add();
    },
    choseNote(note) {
      this.setCurNote(note);
    },
    handleUpdateTitle(e) {
      this.updateTitle({
        value: e.target.value,
      });
    },
    handleUpdateContent(e) {
      this.updateContent({
        value: e.target.value,
      });
    },
    handleLike() {
      this.toggleLike();
    },
    handleRemove() {
      this.remove();
    },
    all() {
      this.status = 'all';
    },
    filter() {
      this.status = 'like';
    }
  },
};


</script>
