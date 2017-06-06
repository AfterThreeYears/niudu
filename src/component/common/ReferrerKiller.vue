<template>
  <!-- <div v-html="html"></div> -->
  <div>
    <iframe src="https://daily.zhihu.com">
      <img src="http://pic4.zhimg.com/v2-86da69db8f3d4339efaf020fba2a784b.jpg" alt="">
    </iframe>
  </div>
</template>

<script>
import LazyImg from '@/component/common/LazyImg';

export default {
  data() {
    return {
      html: `<iframe src="javascript:
      			<!doctype html>
      			<html>
        			<body>
        			   <img src='http://pic4.zhimg.com/v2-86da69db8f3d4339efaf020fba2a784b.jpg' />
        		  </body>
            </html>
            </iframe>;`,
    };
  }
};
</script>
