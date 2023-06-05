<template>
  <div class="about">
    <h1>This is an about page 编码</h1>
    <HelloWorld />
  </div>
</template>
<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  components: {
    HelloWorld,
  },
  metaInfo: {
    title: '哎哟',
  },
}
</script>
