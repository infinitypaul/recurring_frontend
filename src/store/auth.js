import axios from 'axios'

export default ({
    namespaced:  true,
    state: {
        access_token: null,
        user: null
    },

    getters :{
        authenticated (state) {
            return state.access_token && state.user
        },

        user (state) {
            return state.user
        }
    },

    mutations: {
        SET_TOKEN (state, access_token) {
            state.access_token = access_token;
        },
        SET_USER(state, data){
            state.user = data
        },
    },

    actions: {
        async signIn ({ dispatch }, credentials) {
            let response = await axios.post('login', credentials)
            const data = {
                'user' : response.data.data,
                'token' : response.data.meta.access_token
            };
            return dispatch('attempt', data)
        },

        async attempt ({ commit, state }, {token, user}) {
            if (token) {
                commit('SET_TOKEN', token)
            }

            if (!state.access_token) {
                return
            }

            if(typeof user !== "undefined"){
                commit('SET_USER', user)
                return
            }

            try {
                let response = await axios.get('dashboard')
                commit('SET_USER', response.data.data)
            } catch (e) {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            }
        },

        async signUp({dispatch}, credentials){
            let response = await axios.post('register', credentials)
            const data = {
                'user' : response.data.data,
                'token' : response.data.meta.access_token
            };
            return dispatch('attempt', data)
        },

        logOut ({ commit }) {
            console.log('hi')
            return axios.post('dashboard/logout').then(() => {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            })
        }
    }

});