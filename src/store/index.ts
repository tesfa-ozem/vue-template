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
        auth_success(state, { token, user }) {
            state.status = 'success'
            state.token = token
            state.user = user
        },
        set_animation(state, arg) {
            state.isLoading = arg
        }
    },
    actions: {
        singin({ commit }, auth) {
            commit('set_animation', true)
            return new Promise((resolve, reject) => {
                commit('auth_request')
                Axios({ url: 'http://127.0.0.1:8000/api/dashboard/token', method: 'GET', auth: auth, })
                    .then(resp => {
                        const token = resp.data.token
                        const user = resp.data.user
                        localStorage.setItem('token', token)
                        Axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', { token, user })
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
        signup({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                Axios({ url: 'http://127.0.0.1:8000/api/dashboard/user', data: user, method: 'POST' })
                    .then(resp => {
                        // const token = resp.data.token
                        // const user = resp.data.user
                        // localStorage.setItem('token', token)
                        // Axios.defaults.headers.common['Authorization'] = token
                        // commit('auth_success', token, user)
                        // resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error', err)
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('token')
                delete Axios.defaults.headers.common['Authorization']
                resolve()
            })
        },
        register({ commit }, args) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                Axios({ url: 'http://127.0.0.1:8000/api/dashboard/user', data: args, method: 'POST' })
                    .then(resp => {
                        // const token = resp.data.token
                        // const user = resp.data.user
                        // localStorage.setItem('token', token)
                        // Axios.defaults.headers.common['Authorization'] = token
                        // commit('auth_success', token, user)
                        // resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error', err)
                        localStorage.removeItem('token')
                        reject(err)
                    })
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
