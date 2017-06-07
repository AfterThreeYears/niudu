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
          Array.from(fixedEl).forEach((item, idx) => {
            if (item.style.position === 'fixed') return;
            const absTop = item.getBoundingClientRect().top;
            console.log(absTop);
            if (absTop < 80) {
              item.style.position = 'absolute';
              console.log('top是', document.body.scrollTop + absTop,
               `document.body.scrollTop是${document.body.scrollTop}`,
               `absTop是${absTop}`,
             );
              item.style.top = `${document.body.scrollTop + absTop}px`;
              const prev = $(item).parents('li').prev();
              if (prev.length) {
                prev.find('.zhihu-fixed')[0].style.top = `${-80 + absTop}px`;
              }
            }
            if (absTop < 0) {
              item.style.position = 'fixed';
              item.style.top = '0';
              // $(item).next('.zhihu-fixed-bottom').css('margin-bottom', '80px');
            }
            if (this.top > absTop) {
              this.top = absTop;
              index = idx;
            }
          });
        } else {
          // 往下
          // console.log(Array.from(fixedEl));
          Array.from(fixedEl).forEach((item, idx) => {
            if (item.style.position === 'fixed') return;
            const absTop = item.getBoundingClientRect().top;
            console.log(absTop);
            if (absTop < 80) {
              item.style.position = 'absolute';
              console.log('top是', document.body.scrollTop + absTop,
               `document.body.scrollTop是${document.body.scrollTop}`,
               `absTop是${absTop}`,
              );
              item.style.top = `${document.body.scrollTop + absTop}px`;
              const prev = $(item).parents('li').prev();
              if (prev.length) {
                prev.find('.zhihu-fixed')[0].style.top = `${-80 + absTop}px`;
              }
            }
            if (absTop <= 0) {
              item.style.position = 'fixed';
              item.style.top = '0';
              const siblings = $(item).parents('li').siblings();
              console.log(item, siblings);
              siblings.find('.zhihu-fixed')[0].style.position = 'initial';
              // $(item).next('.zhihu-fixed-bottom').css('margin-bottom', '80px');
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
