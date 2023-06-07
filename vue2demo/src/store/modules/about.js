// about
import { get } from '@/http/index.ts'

export default {
  state: () => ({
    keywords: [],
  }),
  getters: {
  },
  mutations: {
    setKeywords: (state, data) => {
      state.keywords = data
    },
  },
  actions: {
    getKeywords: ({ commit }) => {
      const url = 'http://192.168.0.117:8000/test.json'
      get(url).then((res) => {
        // console.log('res: ', res);
        // console.log('res.data: ', res.data);
        commit('setKeywords', res.data.g)
      }).catch((err) => {
        console.log('err: ', err);
      })
    },
  },
};
