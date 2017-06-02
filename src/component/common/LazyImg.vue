<script>
  import { isImageLoaded } from '@/libs/lazyload';
  import './LazyImg.css';

  export default {
    name: 'lazy-img',

    props: {
      src: {
        type: String,
        default: '',
      },
      bgSrc: {
        type: String,
        default: '',
      },
      nodeName: {
        type: String,
        default: 'div',
      },
      alt: {
        type: String,
        default: '',
      },
      onload: null,
    },

    render(createElement) {
      let el = 'img';
      const attrs = {
        'data-original-src': this.src,
      };

      if (this.bgSrc) {
        attrs['lazy-bg'] = true;
        attrs['data-original-src'] = this.bgSrc;
        el = this.nodeName;
      }

      if (this.$__only__use__for__disable__lazyload || isImageLoaded(attrs['data-original-src'])) {
        return createElement(
          el,
          this.bgSrc ? {
            class: 'LazyLoad-bg',
            style: {
              backgroundImage: `url(${this.bgSrc})`,
            },
          } : {
            class: 'LazyLoad-Img',
            attrs: {
              src: this.src,
            },
          },
          this.$slots.default,
        );
      }

      return createElement(el, {
        attrs,
        class: {
          'LazyLoad-Img': true,
          'LazyLoad-loadingImg': true,
          'LazyLoad-bg': !!this.bgSrc,
        },
      }, this.$slots.default);
    },
  };
</script>
