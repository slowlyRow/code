<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { MetaInfo } from 'vue-meta';

@Component({
  components: {
    HelloWorld,
  },
  metaInfo: {
    title: 'home',
  },
})
export default class HomeView extends Vue {}
</script>
