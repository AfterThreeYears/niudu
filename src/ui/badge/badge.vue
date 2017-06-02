<template>
  <span
    class="ui-badge"
    :style="{ backgroundColor: color }"
    :class="['is-' + type, 'is-size-' + size]"
  >
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'badge',
  props: {
    color: String,
    type: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'normal'
    }
  }
}
</script>

<style>

.ui-badge {
  color: #fff;
  text-align: center;
  display: inline-block;
}
.ui-badge.is-size-large {
  border-radius: 18px;
  font-size: 0.32rem;
  padding: 0.05rem 0.25rem;
}
.ui-badge.is-size-normal {
  border-radius: 16px;
  font-size: 0.30rem;
  padding: 0.04rem 0.20rem;
}
.ui-badge.is-size-small {
  border-radius: 14px;
  font-size: 0.28rem;
  padding: 0.03rem 0.16rem;
}
.ui-badge.is-warning {
  background-color: $warning-color;
}
.ui-badge.is-error {
  background-color: $error-color;
}
.ui-badge.is-primary {
    background-color: $color-blue;
}
.ui-badge.is-success {
    background-color: $success-color;
}

</style>
