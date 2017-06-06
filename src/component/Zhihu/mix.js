export default {
  data() {
    return {
      location: 0,
      top: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      addEventListener('scroll', () => {
        const fixedEl = this.$refs.fixed;
        let index = 0;
        if (this.location > document.body.scrollTop) {
          // 往上

        } else {
          // 往下
          // console.log(Array.from(fixedEl));
          Array.from(fixedEl).forEach((item, idx) => {
            if (item.style.position === 'fixed') return;
            const absTop = item.getBoundingClientRect().top;
            console.log(absTop);
            if (absTop < 36) {
              item.style.position = 'absolute';
              console.log(document.body.scrollTop + absTop, 'top');
              item.style.top = `${document.body.scrollTop + absTop}px`;
              // item.parentNode.previousElementSibling.firstElementChild.style.position = 'absolute';
              // item.parentNode.previousElementSibling.firstElementChild.style.top = 'absolute';
            }
            if (absTop < 0) {
              item.style.position = 'fixed';
              item.style.top = '0';
              window.$(item).next('.zhihu-fixed-bottom').css('margin-bottom', '36px');
            }
            if (this.top > absTop) {
              this.top = absTop;
              index = idx;
            }
          });
        }
        this.location = document.body.scrollTop;
        // console.log(index, this.top);
      }, false);
    });
  },
};
