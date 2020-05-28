<template>
    <div class="card" style="width: 18rem;">
        <LazyImage :src="service.image" />
        <div class="card-body">
            <h5 class="card-title">{{service.name}}</h5>
            <p class="card-text">{{service.description}}.</p>
            <a href="#" class="btn btn-primary" @click.prevent="loadModal(service.id)">Buy Now</a>
        </div>
        <div class="card-footer text-muted">
            ₦ {{service.price}}
        </div>
    </div>
</template>

<script>
    import LazyImage from '@/components/Images/Image.vue';
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: "Service",
        data(){
            return {
                random : Math.floor(Math.random() * 10)
            }
        },
        computed: {
            ...mapGetters({
                authenticated: 'auth/authenticated'
            })
        },
        props :{
            service :{
                type: Object,
                require: true
            }
        },
        components:{
            LazyImage
        },
        methods:{
            ...mapActions({
                setProduct: 'product/setProduct',

            }),
            loadModal(id){
                this.setProduct(id);
                if(this.authenticated){
                    this.$modal.show('order', { name: 'Order '})
                    return;
                }
                this.$modal.show('signIn', { name : "Login"})
            }
        }
    }
</script>

<style scoped>
    .thumbnail img {
        width: 100%;
    }
</style>