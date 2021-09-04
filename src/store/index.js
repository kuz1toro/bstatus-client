import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: '',
    page: '',
    listGdgTinggi: ''
  },
  mutations: {
    updateUserData(state, newData){
      state.userData = newData;
    },
    updatePage(state, newPage){
      state.page = newPage;
    },
    updateListGdgTinggi(state, newListGdgTinggi){
      state.listGdgTinggi = newListGdgTinggi;
    }
  },
  actions: {
    updateUserData(context, data){
      context.commit('updateUserData', data)
    },
    updatePage(context, data1){
      context.commit('updatePage', data1)
    },
    updateListGdgTinggi(context, newListGdgTinggi){
      context.commit('updateListGdgTinggi', newListGdgTinggi)
    },
  },
  getters: {
    page: state => {
      return state.page
    },
    userData: state => {
      return state.userData
    },
    total_gedung: state => {
      let total = 0
      if (Array.isArray(state.userData.gedung)) {
        state.userData.gedung.forEach((element) => { total = total + element.total_g } )
        return total
      }else{
        return 0
      }
      
    },
    gedung_rendah: state => {
      var gedung = []
      if (Array.isArray(state.userData.gedung)) {
        state.userData.gedung.forEach((element, index) => { if(index>0) {gedung[index-1] = element} } )
        return gedung
      }else{
        return ['kuswantoro']
      }
    },
    getlistGdgTinggi: state => {
      return state.listGdgTinggi
    },
  },
  modules: {
  }
})
