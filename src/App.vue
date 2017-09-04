<template>
  <div id="app">
    <img src="~public/images/common/rx.png" width="10" height="10" alt="" />
    <my-head />
    <div :class="classObject" >
      <div class="window-isLoading" v-show="isLoading">
        <div class="ball-clip-rotate"><div></div></div>
      </div>
      <router-view/>
    </div>
    <img
      class="ypy"
      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMTEiIGhlaWdodD0iMzgiIHZpZXdCb3g9IjAgMCAxMTEgMzgiPgogIDxnIGZpbGw9IiNGRkZGRkYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xKSI+CiAgICA8cGF0aCBkPSJNMzAuOCw0LjEgTDMwLjgsNC4xIEwzMC44LDQuMSBMMzAuOCw0LjEgTDMwLjgsNC4xIEMzMC4xLDMuNiAyOS40LDMuMSAyOC42LDIuNyBDMjguMSwyLjQgMjcuNCwyLjUgMjcsMyBMMjIuMyw5LjIgTDIyLDkuNiBDMjEuNSwxMC4zIDIwLjcsMTAuNiAxOS45LDEwLjYgTDE5LDEwLjYgQzE2LjcsMTAuNyAxNC40LDExLjkgMTIuOSwxMy45IEMxMS43LDE1LjUgMTEuMSwxNy40IDExLjIsMTkuMyBDMTEuMiwxOS42IDExLjQsMTkuOSAxMS43LDIwLjEgQzEyLjMsMjAuNCAxMi44LDIxIDEzLDIxLjcgQzEzLjIsMjIuOCAxMi41LDIzLjggMTEuNSwyNC4xIEMxMC4zLDI0LjUgOSwyMy43IDguNywyMi41IEM4LjUsMjEuOCA4LjcsMjEuMiA5LjEsMjAuNyBDOS4zLDIwLjQgOS40LDIwLjEgOS40LDE5LjcgQzkuMiwxNy4zIDkuOCwxNC44IDExLjQsMTIuNyBDMTMuNCwxMC4xIDE2LjQsOC43IDE5LjUsOC43IEMyMC4xLDguNyAyMC42LDguNCAyMSw3LjkgTDI1LjMsMi4yIEMyNS42LDEuOCAyNS40LDEuMSAyNC45LDEgQzE3LjcsLTEgOS43LDEuNCA0LjgsNy43IEMtMS40LDE1LjggMC4xLDI3LjUgOC4yLDMzLjggQzksMzQuNCA5LjcsMzQuOSAxMC42LDM1LjQgQzExLjEsMzUuNyAxMS44LDM1LjYgMTIuMiwzNS4xIEwxNi45LDI4LjkgTDE3LjIsMjguNSBDMTcuNywyNy44IDE4LjUsMjcuNSAxOS4zLDI3LjUgTDIwLjIsMjcuNSBDMjIuNSwyNy40IDI0LjgsMjYuMiAyNi4zLDI0LjIgQzI3LjUsMjIuNiAyOC4xLDIwLjcgMjgsMTguOCBDMjgsMTguNSAyNy44LDE4LjIgMjcuNSwxOCBDMjYuOSwxNy43IDI2LjQsMTcuMSAyNi4yLDE2LjQgQzI2LDE1LjMgMjYuNywxNC4zIDI3LjcsMTQgQzI4LjksMTMuNiAzMC4yLDE0LjQgMzAuNSwxNS42IEMzMC43LDE2LjMgMzAuNSwxNi45IDMwLjEsMTcuNCBDMjkuOSwxNy43IDI5LjgsMTggMjkuOCwxOC40IEMzMCwyMC44IDI5LjQsMjMuMyAyNy44LDI1LjQgQzI1LjgsMjggMjIuOCwyOS40IDE5LjcsMjkuNCBDMTkuMSwyOS40IDE4LjYsMjkuNyAxOC4yLDMwLjIgTDE0LDM1LjYgQzEzLjcsMzYgMTMuOSwzNi43IDE0LjQsMzYuOCBDMjEuNiwzOC45IDI5LjcsMzYuNSAzNC41LDMwLjEgQzQwLjcsMjIgMzksMTAuMyAzMC44LDQuMSBaIi8+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0MyA4KSI+CiAgICAgIDxwYXRoIGQ9Ik0xOC42LDIgTDE4LjYsMS42IEMxOC42LDEuMiAxOC4zLDEgMTgsMSBMMy41LDEgQzMuMiwxIDIuOSwxLjMgMi45LDEuNiBMMi45LDIuNSBDMi45LDIuOCAzLjIsMy4xIDMuNSwzLjEgTDE1LjgsMy4xIEMxNi4yLDMuMSAxNi40LDMuNCAxNi40LDMuOCBDMTYuMSw2LjEgMTUsMTAuNCAxMS42LDE0LjUgQzExLjQsMTQuOCAxMC45LDE0LjggMTAuNywxNC41IEM3LjksMTAuOSA3LDcuMiA2LjgsNS44IEM2LjcsNS41IDYuNSw1LjMgNi4yLDUuMyBMNS43LDUuMyBMNS4zLDUuMyBDNSw1LjMgNC43LDUuNiA0LjgsNiBDNS4xLDcuNiA2LjEsMTEuOSA5LjUsMTYgQzkuNywxNi4yIDkuNywxNi42IDkuNSwxNi44IEM1LjUsMjAuNSAxLjgsMjEuMyAwLjUsMjEuNSBDMC4yLDIxLjUgNy4xMDU0MjczNmUtMTUsMjEuOCA3LjEwNTQyNzM2ZS0xNSwyMi4xIEw3LjEwNTQyNzM2ZS0xNSwyMyBDNy4xMDU0MjczNmUtMTUsMjMuMyAwLjMsMjMuNiAwLjYsMjMuNiBDMi4xLDIzLjQgNi4zLDIyLjUgMTAuOCwxOC4zIEMxMSwxOC4xIDExLjQsMTguMSAxMS42LDE4LjMgQzEzLjgsMjAuMyAxNi42LDIyLjMgMjAuNCwyMy41IEMyMC43LDIzLjYgMjEsMjMuNCAyMS4xLDIzLjEgTDIxLjQsMjIuMyBDMjEuNSwyMiAyMS4zLDIxLjcgMjEsMjEuNiBDMTcuNSwyMC41IDE1LDE4LjcgMTMsMTYuOSBDMTIuOCwxNi43IDEyLjgsMTYuMyAxMywxNi4xIEMxOC41LDkuNCAxOC42LDIuMyAxOC42LDIgWiIvPgogICAgICA8cGF0aCBkPSJNMjguNiwwLjEgTDI3LjcsMC4xIEMyNy40LDAuMSAyNy4xLDAuNCAyNy4xLDAuNyBMMjcuMSwzLjggQzI3LjEsNC4xIDI2LjgsNC40IDI2LjUsNC40IEwyNC40LDQuNCBDMjQuMSw0LjQgMjMuOCw0LjcgMjMuOCw1IEwyMy44LDUuOSBDMjMuOCw2LjIgMjQuMSw2LjUgMjQuNCw2LjUgTDI2LjUsNi41IEMyNi44LDYuNSAyNy4xLDYuOCAyNy4xLDcuMSBMMjcuMSwxMS42IEMyNy4xLDExLjkgMjYuOCwxMi4yIDI2LjUsMTIuMiBMMjQuNCwxMi4yIEMyNC4xLDEyLjIgMjMuOCwxMi41IDIzLjgsMTIuOCBMMjMuOCwxMy43IEMyMy44LDE0IDI0LjEsMTQuMyAyNC40LDE0LjMgTDI2LjUsMTQuMyBDMjYuOCwxNC4zIDI3LjEsMTQuNiAyNy4xLDE0LjkgTDI3LjEsMTkuMiBDMjcuMSwyMC4xIDI2LjcsMjEuNiAyNC40LDIxLjggQzI0LjEsMjEuOCAyMy45LDIyLjEgMjMuOSwyMi40IEwyMy45LDIzIEMyMy45LDIzLjMgMjQuMiwyMy42IDI0LjUsMjMuNiBDMjYuOCwyMy40IDI5LjIsMjIuMSAyOS4yLDE4LjkgTDI5LjIsMTQuNiBDMjkuMiwxNC4zIDI5LjUsMTQgMjkuOCwxNCBMMzEuNywxNCBDMzIsMTQgMzIuMywxMy43IDMyLjMsMTMuNCBMMzIuMywxMi41IEMzMi4zLDEyLjIgMzIsMTEuOSAzMS43LDExLjkgTDI5LjgsMTEuOSBDMjkuNSwxMS45IDI5LjIsMTEuNiAyOS4yLDExLjMgTDI5LjIsNi44IEMyOS4yLDYuNSAyOS41LDYuMiAyOS44LDYuMiBMMzEuNyw2LjIgQzMyLDYuMiAzMi4zLDUuOSAzMi4zLDUuNiBMMzIuMyw0LjcgQzMyLjMsNC40IDMyLDQuMSAzMS43LDQuMSBMMjkuOCw0LjEgQzI5LjUsNC4xIDI5LjIsMy44IDI5LjIsMy41IEwyOS4yLDAuNiBDMjkuMiwwLjMgMjksMC4xIDI4LjYsMC4xIFoiLz4KICAgICAgPHBhdGggZD0iTTMzLjIsMjIuOCBDMzMuMiwyMy4xIDMzLjUsMjMuNCAzMy44LDIzLjQgTDQwLjMsMjMuNCBDNDMuMiwyMy40IDQ1LjUsMjEuMiA0NS41LDE4LjQgTDQ1LjUsNC43IEM0NS41LDQuNCA0NS4yLDQuMSA0NC45LDQuMSBMMzMuOCw0LjEgQzMzLjUsNC4xIDMzLjIsNC40IDMzLjIsNC43IEwzMy4yLDIyLjggWiBNNDAuNCwyMS40IEwzNS45LDIxLjQgQzM1LjYsMjEuNCAzNS4zLDIxLjEgMzUuMywyMC44IEwzNS4zLDE0LjYgQzM1LjMsMTQuMyAzNS42LDE0IDM1LjksMTQgTDQzLDE0IEM0My4zLDE0IDQzLjYsMTQuMyA0My42LDE0LjYgTDQzLjYsMTguNCBDNDMuNiwyMC4xIDQyLjEsMjEuNCA0MC40LDIxLjQgWiBNNDMuNiw2LjcgTDQzLjYsMTEuNCBDNDMuNiwxMS43IDQzLjMsMTIgNDMsMTIgTDM1LjksMTIgQzM1LjYsMTIgMzUuMywxMS43IDM1LjMsMTEuNCBMMzUuMyw2LjcgQzM1LjMsNi40IDM1LjYsNi4xIDM1LjksNi4xIEw0Myw2LjEgQzQzLjMsNi4yIDQzLjYsNi40IDQzLjYsNi43IFoiLz4KICAgICAgPHBhdGggZD0iTTQyLjEsMCBMMzYuMywwIEMzNiwwIDM1LjcsMC4zIDM1LjcsMC42IEwzNS43LDEuNSBDMzUuNywxLjggMzYsMi4xIDM2LjMsMi4xIEw0Mi4xLDIuMSBDNDIuNCwyLjEgNDIuNywxLjggNDIuNywxLjUgTDQyLjcsMC42IEM0Mi43LDAuMyA0Mi41LDAgNDIuMSwwIFoiLz4KICAgICAgPHBhdGggZD0iTTY0LjIsMC45IEw1Mi4yLDAuOSBDNTEuOSwwLjkgNTEuNiwxLjIgNTEuNiwxLjUgTDUxLjYsMi40IEM1MS42LDIuNyA1MS45LDMgNTIuMiwzIEw2NC4yLDMgQzY0LjUsMyA2NC44LDIuNyA2NC44LDIuNCBMNjQuOCwxLjUgQzY0LjgsMS4yIDY0LjUsMC45IDY0LjIsMC45IFoiLz4KICAgICAgPHBhdGggZD0iTTU5LjEsMTEuMiBMNjcuNSwxMS4yIEM2Ny44LDExLjIgNjguMSwxMC45IDY4LjEsMTAuNiBMNjguMSw5LjcgQzY4LjEsOS40IDY3LjgsOS4xIDY3LjUsOS4xIEw0OC45LDkuMSBDNDguNiw5LjEgNDguMyw5LjQgNDguMyw5LjcgTDQ4LjMsMTAuNiBDNDguMywxMC45IDQ4LjYsMTEuMiA0OC45LDExLjIgTDU0LjYsMTEuMiBDNTUuMSwxMS4yIDU1LjMsMTEuNyA1NS4xLDEyLjEgTDUxLjMsMTkgQzUxLjIsMTkuMiA1MS4xLDE5LjMgNTEuMSwxOS41IEM1MC44LDIwLjQgNTAuOSwyMS40IDUxLjUsMjIuMiBDNTIuMSwyMyA1My4xLDIzLjYgNTQuMiwyMy42IEw2NC42LDIzLjYgQzY1LjEsMjMuNiA2NS41LDIzLjQgNjUuNywyMyBDNjUuOSwyMi42IDY2LDIyLjEgNjUuOCwyMS43IEw2My40LDE3IEM2My4zLDE2LjcgNjIuOSwxNi42IDYyLjYsMTYuOCBMNjEuOCwxNy4yIEM2MS41LDE3LjMgNjEuNCwxNy43IDYxLjYsMTggTDYzLDIwLjggQzYzLjIsMjEuMiA2Mi45LDIxLjYgNjIuNSwyMS42IEw1NC4yLDIxLjYgQzUzLjgsMjEuNiA1My40LDIxLjQgNTMuMiwyMS4xIEM1My4xLDIxIDUyLjksMjAuNyA1MywyMC4zIEM1MywyMC4yIDUzLDIwLjIgNTMuMSwyMC4xIEw1Ny43LDEyIEM1OCwxMS41IDU4LjUsMTEuMiA1OS4xLDExLjIgWiIvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==" />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import lazyload from '@/libs/lazyload';
import MyHead from '@/component/Head/Head';

// const MyHead = r => require.ensure([], () => r(require('./component/Head/Head')), 'Head');
export default {
  components: {
    MyHead,
  },
  updated() {
    lazyload();
    // console.error('*******************updated*********************');
  },
  created() {
    // console.error('*******************created*********************');
  },
  mounted() {
    lazyload();

    // console.error('*******************mounted*********************');
  },
  computed: {
    ...mapState({
      // showNav(state) {
      //   return state.header.showNav;
      // },
      // showTab(state) {
      //   return state.header.showTab;
      // },
      // showHead(state) {
      //   return state.header.showHead;
      // },
      isLoading(state) {
        return state.header.isLoading;
      },
    }),
    classObject() {
      // const { showHead, showTab, showNav } = this;
      const {name} = this.$route;
      const array = ['v2ex', 'cnode', 'test'];
      if (!array.includes(name)) return { 'main-wrap-body-hide': true };
      // if (showNav && !showTab) return { 'main-wrap-body-showNav': true };
      return {
        'main-wrap-body-showTab': true,
      };
    },
  },
};
</script>
<style>
  #app {
    width: 10rem;
    margin: 0 auto;
    background: #fff;
    min-height: 100%;
  }
  .main-wrap-body-hide {
    padding-top: 0;
  }
  .main-wrap-body-showTab {
    padding: 1.64rem 0 0.3rem;
  }
  .main-wrap-body-showNav {
    padding: 0.83rem 0 0.3rem;
  }
  .window-isLoading {
    width: 10rem;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
  }

  .ball-clip-rotate > div {
    border-radius: 100%;
    border: 1px solid #ff2859;
    border-bottom-color: transparent;
    height: 0.6rem;
    width: 0.6rem;
    display: inline-block;
    animation: rotate .75s 0s linear infinite;
  }
  @keyframes rotate {
      0% {
          transform: rotate(0);
      }
      50% {
          transform: rotate(180deg);
      }
      100% {
          transform: rotate(360deg);
      }
  }
  .ypy {
    background: #ccc;
    margin: 0 auto;
    width: 2rem;
    display: block;
  }

</style>
