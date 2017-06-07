<template>
  <div>
    <p class='ui-fixed-title' ref="title">{{title}}</p>
    <ul class="ui-fixed">
        <li v-for="(list, index) in lists" key={{index}}>
            <p class="ui-fixed-sub-title" ref="fixed">{{list[0]}}</p>
            <div
              v-for="(item, idx) in list[1]"
              key={{idx}}
              class="ui-fixed-body"
            >
              {{item.name}}
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      location: 0,
      top: 0,
      title: '',
    };
  },
  props: {
    lists: {
      default: [
        ['', []],
      ],
    }
  },
  mounted() {
    this.$nextTick(() => {
      let el = null;
      addEventListener('scroll', () => {
        const fixedEl = this.$refs.fixed;
        let index = 0;

        if (+this.$refs.title.style.top.replace('px', '') === 0) {
          el = Array.from(fixedEl).reduce((result, current) => {
            return current.getBoundingClientRect().top < 0 && current.getBoundingClientRect().top > result.getBoundingClientRect().top ? current : result;
          }, Array.from(fixedEl)[0]);
          // console.log(el);
          this.title = el.innerHTML;
        }
        if (this.location > document.body.scrollTop) {
          // 往上
          if ($(el).parents('li').next().length) {
            const top = $(el).parents('li').next().find('.ui-fixed-sub-title')[0].getBoundingClientRect().top;
            console.log(top);
            if (top < 128 && top > 0) {
              this.$refs.title.style.top = `${top - 128}px`;
            } else if (top >= 128) {
              this.$refs.title.style.top = 0;
              // this.$refs.title.style.top = 0;
            }
          }
        } else {
          if ($(el).parents('li').next().length) {
            const top = $(el).parents('li').next().find('.ui-fixed-sub-title')[0].getBoundingClientRect().top;
            if (top < 128 && top > 0) {
              console.log(top);
              this.$refs.title.style.top = `${top - 128}px`;
            } else if (top <= 0) {
              this.$refs.title.style.top = 0;
            }
          }


          // 往下
          // console.log(Array.from(fixedEl));

          // Array.from(fixedEl).forEach((item, idx) => {
          //   if (item.style.position === 'fixed') return;
          //   const absTop = item.getBoundingClientRect().top;
          //   console.log(absTop);
          //   if (absTop < 80) {
          //     item.style.position = 'absolute';
          //     console.log('top是', document.body.scrollTop + absTop,
          //      `document.body.scrollTop是${document.body.scrollTop}`,
          //      `absTop是${absTop}`,
          //     );
          //     item.style.top = `${document.body.scrollTop + absTop}px`;
          //     const prev = $(item).parents('li').prev();
          //     if (prev.length) {
          //       prev.find('.ui-fixed-title')[0].style.top = `${-80 + absTop}px`;
          //     }
          //   }
          //   if (absTop <= 0) {
          //     item.style.position = 'fixed';
          //     item.style.top = '0';
          //     const siblings = $(item).parents('li').siblings();
          //     console.log(item, siblings);
          //     siblings.find('.ui-fixed-title')[0].style.position = 'initial';
          //     // $(item).next('.ui-fixed-title-bottom').css('margin-bottom', '80px');
          //   }
          //   if (this.top > absTop) {
          //     this.top = absTop;
          //     index = idx;
          //   }
          // });
        }
        this.location = document.body.scrollTop;
        // console.log(index, this.top);
      }, false);
    });
  },
};

</script>

<style lang="css">
.ui-fixed-title {
  height: 2rem;
  width: 100%;
  background: #ccc;
  position: fixed;
  top: 0;
}
.ui-fixed-sub-title {
  height: 2rem;
  width: 100%;
  background: #abcdef;
  border: 1px solid red;
}
.ui-fixed-body {
  height: 2rem;
  width: 100%;
}
</style>
