export default ({
    namespaced:  true,
    state: {
        productIndex: null
    },

    getters :{
        productIndex (state) {
            return state.productIndex
        }
    },

    mutations: {
        SET_PRODUCT (state, productIndex) {
            state.productIndex = productIndex;
        }
    },

    actions: {
        setProduct ({ commit }, productIndex) {
            commit('SET_PRODUCT', productIndex)
        }
    }
});