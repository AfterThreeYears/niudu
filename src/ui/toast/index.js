import Vue from 'vue';

const ToastConstructor = Vue.extend(require('./toast.vue'));
const toastPool = [];

const getAnInstance = () => {
  if (toastPool.length > 0) {
    const instance = toastPool[0];
    toastPool.splice(0, 1);
    return instance;
  }
  return new ToastConstructor({
    el: document.createElement('div'),
  });
};


const removeDom = (event) => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target);
  }
};

const returnAnInstance = (instance) => {
  if (instance) {
    toastPool.push(instance);
  }
};

ToastConstructor.prototype.close = function close() {
  this.visible = false;
  this.$el.addEventListener('transitionend', removeDom);
  this.closed = true;
  returnAnInstance(this);
};

const Toast = (options = {}) => {
  const duration = options.duration || 3000;

  const instance = getAnInstance();
  instance.closed = false;
  clearTimeout(instance.timer);
  instance.message = typeof options === 'string' ? options : options.message;
  instance.position = options.position || 'middle';
  instance.className = options.className || '';
  instance.iconName = options.iconName || '';

  document.body.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.visible = true;
    instance.$el.removeEventListener('transitionend', removeDom);
    instance.timer = setTimeout(() => {
      if (instance.closed) return;
      instance.close();
    }, duration);
  });
  return instance;
};

export default Toast;
