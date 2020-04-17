import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    payments: {},
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    isLoading: false

  },
  mutations: {
    updatePayments(state, data) {
      state.payments = data
    },
    auth_request(state) {
      state.status = 'loading'
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
    },
    auth_success(state, {token, user}) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    set_animation(state, arg) {
      state.isLoading = arg
    }
  },
  actions: {

    singin({commit}, auth) {
      commit('set_animation', true)
      return new Promise((resolve, reject) => {
        commit('auth_request')
        Axios({url: 'https://api-sacco.tritel.co.ke/api/token', method: 'GET', auth: auth,})
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            Axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', {token, user})
            commit('set_animation', false)
            resolve(resp)

          })
          .catch(err => {
            alert(err)
            commit('auth_error')
            commit('set_animation', false)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    signup({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        Axios({url: 'https://api-sacco.tritel.co.ke/api/signUp', data: user, method: 'POST',})
          .then(resp => {

            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({commit}) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete Axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    fetchUser({commit}) {
      return new Promise((resolve, reject) => {
        Axios({
          url: 'https://api-sacco.tritel.co.ke/api/getMemberStatus',
          method: "GET",
          headers: {Authorization: "Bearer " + this.state.token}
        }).then(resp=>{
          resolve(resp)
        }).catch(err=>{
          reject(err)
        })
      })
    },
    registerUser({commit},data){
      return new Promise((resolve, reject) => {
        commit("set_animation", true);
        Axios({
          url: "https://api-sacco.tritel.co.ke/api/registerMember",
          data: data,
          method: "POST",
          headers: {Authorization: "Bearer " + this.state.token}

        })
          .then(res => {
            resolve(res)
            commit("set_animation", false);

          })
          .catch(err => {
            reject(err)
            commit("set_animation", false);
          });
      })
    },
    makePayment({commit},data){
      return new Promise((resolve, reject) => {
        commit("set_animation", true);
        Axios({
          url: "https://api-sacco.tritel.co.ke/api/MakePayment",
          data: data,
          method: "POST",
          headers: {Authorization: "Bearer " + this.state.token}

        })
          .then(res => {
            resolve(res)
            commit("set_animation", false);
          })
          .catch(err => {
            reject(err)
            commit("set_animation", false);
          });
      })
    }

  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    loading: state => state.isLoading
  },
  modules: {}
})
