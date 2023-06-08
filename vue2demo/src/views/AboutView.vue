<template>
  <div class="about">
    <h1>This is an about page 编码</h1>
    <ul>
      <li v-for="(searchWord) in searchKeys " :key=searchWord.sa>
        {{searchWord.q}}
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import storeAbout from '../store/modules/about'

export default {
  asyncData({ store, client }) {
    if (!store.hasModule('about')) {
      store.registerModule('about', storeAbout)
    }
    if (!client) {
      return store.dispatch('about/getKeywords')
    }
    return null
  },
  metaInfo: {
    title: '哎哟',
  },
  destroyed() {
    this.$store.unregisterModule('about')
  },
  computed: {
    ...mapState('about', ['keywords']),
    searchKeys() {
      // return this.$store.state.about.keywords || []
      return this.keywords || []
    },
  },
}
</script>
