// about
// eslint-disable-next-line import/extensions
import { get } from '@/http/index.ts'

export default {
  namespaced: true,
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
      // const url = 'http://192.168.0.117:8000/test.json'
      // get(url).then(() => {
      //   commit('setKeywords', result.g)
      // }).catch((err) => {
      //   console.log('err: ', err);
      // })
      Promise.resolve({
        q: '',
        p: false,
        bs: '',
        csor: '0',
        err_no: 0,
        errmsg: '',
        g: [{ type: 'his_normal', sa: 'h_1', q: '香茅草对女性有啥危害' }, { type: 'his_normal', sa: 'h_2', q: '香茅草榨汁' }, { type: 'his_normal', sa: 'h_3', q: 'http://192.168.0.115:8006/' }, { type: 'his_normal', sa: 'h_4', q: 'https://192.168.0.115:8006' }, { type: 'his_normal', sa: 'h_5', q: 'http://192.168.0.115:8006' }, { type: 'his_normal', sa: 'h_6', q: '美的能用小爱控制吗' }, { type: 'his_normal', sa: 'h_7', q: 'nodejs' }, { type: 'his_normal', sa: 'h_8', q: 'process.env' }, { type: 'his_normal', sa: 'h_9', q: '北京市天气' }, { type: 'his_normal', sa: 'h_10', q: '天气' }],
        queryid: '0x44bd30a2847919',
      }).then((res) => {
        commit('setKeywords', res.g)
      }).catch((err) => {
        console.log('err: ', err);
      })
    },
  },
};
