import Vue from 'vue'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)

Vue.mixin({
  metaInfo: {
    // meta: [
    //   { name: 'description', content: 'ssr' },
    // ],
    titleTemplate: '%s-ssr',
  },
})
