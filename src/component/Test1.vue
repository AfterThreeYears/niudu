<template>
  <fixed :lists="lists" />
</template>
<script>
  import fixed from '@/ui/fixed';

  export default {
    data() {
      return {
        lists: [
            ["A", [{name: '安徽'}, {name: '安徽'}, {name: '安徽'}, {name: '安徽'}, {name: '安徽'}, {name: '安徽'}, {name: '安徽'}]],
            ["B", [{name: '部署'}, {name: '部署'}, {name: '部署'}, {name: '部署'}, {name: '部署'}, {name: '部署'}]],
            ["C", [{name: '测试'}, {name: '测试'}, {name: '测试'}, {name: '测试'}, {name: '测试'}, {name: '测试'},]],
            ["D", [{name: '地区'}, {name: '地区'}, {name: '地区'}, {name: '地区'}, {name: '地区'}, {name: '地区'}, {name: '地区'}, {name: '地区'}, {name: '地区'}]],
            ["E", [{name: '饿了么'}, {name: '饿了么'}, {name: '饿了么'}, {name: '饿了么'}, {name: '饿了么'}, {name: '饿了么'}, {name: '饿了么'}, {name: '饿了么'}]],
            ["F", [{name: '伐木'}, {name: '伐木'}, {name: '伐木'}, {name: '伐木'}, {name: '伐木'}, {name: '伐木'}, {name: '伐木'}, {name: '伐木'}]],
            ["G", [{name: '胳肢'}, {name: '胳肢'}, {name: '胳肢'}, {name: '胳肢'}, {name: '胳肢'}, {name: '胳肢'}, {name: '胳肢'}, {name: '胳肢'}, {name: '胳肢'}, {name: '胳肢'}]],
        ]
      };
    },
    components: {
      fixed,
    },
    mounted() {
      // this.$refs.span.innerHTML = this.html;
      // this.$refs.span.innerHTML = ReferrerKiller.imageHtml('http://pic4.zhimg.com/v2-86da69db8f3d4339efaf020fba2a784b.jpg');
    },
  }
</script>
