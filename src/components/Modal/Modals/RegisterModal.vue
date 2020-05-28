<template>
    <Modal name="register">
        <template slot="header"  slot-scope="{ params }">
            {{params.name}}
        </template>
        <template slot="body">
            <!-- Default form login -->
            <form class="text-center border border-light p-5" @submit.prevent="submit">


                <!-- Email -->
                <label for="fullName"></label>
                <input type="text" id="fullName" class="form-control mb-4" placeholder="Full Name" v-model="form.name">


                <!-- Email -->
                <label for="defaultLoginFormEmail"></label>
                <input type="email" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="E-mail" v-model="form.email">

                <!-- Password -->
                <label for="defaultLoginFormPassword"></label>
                <input type="password" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Password" v-model="form.password">


                <!-- Sign in button -->
                <button class="btn btn-info btn-block my-4" type="submit">Sign in</button>

                <!-- Register -->
                <p>Not a member?
                    <a href="" @click.prevent="switchToSignIn">Sign In</a>
                </p>

            </form>

        </template>
    </Modal>
</template>

<script>
    import Modal from '@/components/Modal/Modal.vue'
    import { mapActions } from 'vuex'

    export default {
        name: "RegisterModal",
        data(){
            return {
                form:{
                    name:'',
                    email:'',
                    password:''
                }
            }
        },
        components:{
            Modal
        },
        methods:{
            ...mapActions({
                signUp: 'auth/signUp'
            }),
            submit(){
                this.signUp(this.form).then(() => {
                    console.log('signup')
                }).catch((e) => {
                    console.log(e)
                })
            },
            switchToSignIn(){
                this.$modal.show('signIn', { name: 'Login'})
                this.$modal.hide('register')
            }
        }
    }
</script>

<style scoped>

</style>