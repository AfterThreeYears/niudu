<template>
  <div class="SwipeItem">
    <slot />
  </div>
</template>

<script>
  import './SwipeItem.css';

  export default {
    name: 'swipe-item',

    mounted() {
      if (this.$parent && this.$parent.itemCreated) {
        this.$parent.itemCreated();
      }
    },
  };
</script>
