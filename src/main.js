import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LazyLoad from "./directives/LazyLoad";
import axios from 'axios'

Vue.config.productionTip = false

require('@/store/subscriber')

axios.defaults.baseURL = 'http://ace.test/api/v1';


Vue.directive("lazyLoad", LazyLoad);
const Modal = {
    install (Vue){
        this.event = new Vue();
        Vue.prototype.$modal = {
            show(modal, params={}) {
                Modal.event.$emit('show', modal, params);
            },
            hide(modal) {
                Modal.event.$emit('hide', modal);
            },
            event: this.event
        }
    }
}

Vue.use(Modal);

 store.dispatch('auth/attempt', {token:localStorage.getItem('access_token')}).then(() => {
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
 })
