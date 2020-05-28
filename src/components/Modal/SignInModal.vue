<template>
        <Modal name="signIn">
                <template slot="header"  slot-scope="{ params }">
                        {{params.name}}
                </template>
                <template slot="body">
                        <form class="text-center border border-light p-5" @submit.prevent="submit">

                                <label for="defaultLoginFormEmail"></label>
                                <input type="email" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="E-mail" v-model="form.email">

                                <label for="password"></label>
                                <input type="password" id="password" class="form-control mb-4" placeholder="Password" v-model="form.password">

                                <button class="btn btn-info btn-block my-4" type="submit">Sign in</button>


                                <p>Not a member?
                                        <a href="" @click.prevent="register">Register</a>
                                </p>

                        </form>

                </template>
        </Modal>
</template>

<script>
    import Modal from '@/components/Modal/Modal.vue'
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: "SignInModal",
        data(){
          return {
                  form:{
                          email:'',
                          password:''
                  }
            }
          },
        components:{
            Modal
        },
            computed: {
                    ...mapGetters({
                            getProductIndex: 'product/productIndex'
                    })
            },
       methods:{
           ...mapActions({
                signIn: 'auth/signIn',

           }),
           submit(){
            this.signIn(this.form).then(() => {
                    console.log(this.getProductIndex)
                    if(this.getProductIndex){
                            this.$modal.hide('signIn')
                            this.$modal.show('order', { name: 'Order '})
                        return
                    }
                    console.log('hey', this.$modal)
             }).catch((e) => {
                     console.log(e)
            })
           },
          register(){
                  this.$modal.show('register', { name: 'Register'})
                  this.$modal.hide('signIn')
          }
       }
    }
</script>

<style scoped>

</style>