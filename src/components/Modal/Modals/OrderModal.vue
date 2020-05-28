<template>
    <Modal name="order" @before-open="loadProduct">
        <template slot="header"  slot-scope="{ params }">
            {{params.name}} {{ product.name }}
        </template>
        <template slot="body">
            <div class="thumbnail">
                <LazyImage :src="product.image" />
                <div class="caption">
                    ₦ {{ product.price }}
                    <p>{{ product.description }}</p>

                    <hr>

                        <button class="btn btn-info btn-block my-4" type="button" @click.prevent="recordTransaction" >Pay Now</button>

                </div>
            </div>
        </template>
    </Modal>
</template>

<script>
    import Modal from '@/components/Modal/Modal.vue'
    import LazyImage from '@/components/Images/Image.vue';
    import {mapGetters, mapActions } from 'vuex';
    import axios from 'axios';

    export default {
        name: "OrderModal",
        data(){
            return {
                product: {}
            }
        },
        components:{
            Modal,
            LazyImage
        },
        computed: {
            ...mapGetters({
                getProductIndex: 'product/productIndex',
                user : 'auth/user'
            })
        },
        methods:{
            ...mapActions({
                attempt: 'auth/attempt'
            }),
            async loadProduct(done){
                if(this.getProductIndex){
                    let response =  await axios.get(`services/${this.getProductIndex}`)
                    this.product = response.data.data
                    console.log(response.data)
                    done();
                }
            },
            async recordTransaction(){
               try {
                   let response = await axios.post(`dashboard/transaction/${this.product.id}`, {
                       'price' : this.product.price
                   });
                   this.sendToPayStack(response.data.data)
               }catch (e) {
                   console.log(e)
               }
            },
            sendToPayStack(response){
                let handler = window.PaystackPop.setup({
                    key: 'pk_test_2ab67d8b9bfa383b0d65450dbc518f1f5ec56c4b',
                    email: this.user.email,
                    amount: response.price * 100,
                    currency: "NGN",
                    ref: response.reference,
                    firstname: this.user.firstName,
                    lastname: this.user.lastName,
                    callback: (res) => this.verifyTransaction(res),
                    onClose: function(){
                        alert('window closed');
                    }
                });
                handler.openIframe();
            },
            async verifyTransaction(res){
                console.log(res.reference)
                try {
                    let response = await axios.post(`dashboard/transaction/verify/${res.reference}`);
                    this.attempt({user: response.data.meta.user})
                    this.$modal.hide('order');
                    this.$modal.show('result', { name: 'Checkout - ', transaction : response.data.data})
                    console.log(response.data)
                }catch (e) {
                    console.log(e)
                }
            }
        },

        created() {
            let payStack = document.createElement('script');    payStack.setAttribute('src',"//js.paystack.co/v1/inline.js");
            document.head.appendChild(payStack);
        }
    }
</script>

<style scoped>


</style>