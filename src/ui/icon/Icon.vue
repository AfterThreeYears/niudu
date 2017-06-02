<script>
  import './Icon.css';

  export default {
    name: 'ui-icon',

    props: {
      name: {
        type: String,
        required: true,
      },
    },

    render(createElement) {
      if (process.env.VUE_ENV === 'server') return createElement('svg');

      const svgObject = require(`../../../public/svg/${this.name}.svg`); // eslint-disable-line global-require, import/no-dynamic-require

      // remove `xmlns` & `xmlns:xlink` for less size
      delete svgObject.attributes.xmlns;
      delete svgObject.attributes['xmlns:xlink'];
      return createElement('svg', {
        attrs: svgObject.attributes,
        class: [
          'Icon',
          `Icon-${this.name}`,
        ],
        domProps: {
          innerHTML: svgObject.content,
        },
      });
    },
  };
</script>
