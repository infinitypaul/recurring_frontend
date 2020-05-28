<template>
    <Modal name="result" >
        <template slot="header"  slot-scope="{ params }">
            {{params.name}} {{ params.transaction.service.name }}
        </template>
        <template slot="body" slot-scope="{ params }">
            <template v-if="params.transaction.paid">
            <div class="jumbotron text-center">
                <h1 class="display-3">Thank You!</h1>
                <p class="lead"><strong>Payment Successful</strong>, Check Your Email For Further Instructions</p>
                <template v-if="!visibility">
                    <hr>
                    <p class="lead">
                        GoodNews!!! <a href="">Recurring Activated</a>
                    </p>

                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Plan</th>
                            <th scope="col">Next Bill Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>{{ recur.plan }}</td>
                            <td>{{ recur.payment_date}}</td>
                        </tr>

                        </tbody>
                    </table>
                    <p class="lead">
                        <a class="btn btn-primary btn-sm" href="#" role="button">Thanks, Stay Safe</a>
                    </p>

                </template>
            </div>


            <form v-if="user.auth_code && visibility" class="text-center border border-light p-4" @submit.prevent="processRecurring(params.transaction.reference)">
            <div class="d-flex justify-content-around">
                <div>
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" v-model="form.recurring" class="custom-control-input" id="defaultLoginFormRemember">
                        <label class="custom-control-label" for="defaultLoginFormRemember">Do You Need This Product Often</label>
                    </div>
                </div>
            </div>

            <transition name="bounce">
                <p v-if="form.recurring">
                    <label for="interval"></label>
                    <select name="" class="form-control mb-3" v-model="form.interval" id="interval">
                        <option disabled selected>Select An Interval</option>
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="monthly">Monthly</option>
                        <option value="biannually">Biannually</option>
                        <option value="annually">Annually</option>
                    </select>
                    <button class="btn btn-info btn-block my-4" type="submit"  >Submit</button>
                </p>
            </transition>


            </form>
            </template>
        </template>
    </Modal>
</template>

<script>
    import Modal from '@/components/Modal/Modal.vue'
    import {mapGetters } from 'vuex';
    import axios from "axios";
    export default {
        name: "ResultModal",
        data(){
            return {
                form : {
                    interval: 'Select An Interval',
                    recurring :  false
                },
                visibility: true,
                recur: []
            }
        },
        computed: {
            ...mapGetters({
                user : 'auth/user'
            })
        },
        components:{
            Modal
        },
        methods:{
            async processRecurring(reference){
                try{
                    let response =  await axios.post(`dashboard/transaction/recurring/${reference}`, this.form)
                    this.visibility = false
                    this.recur = response.data.data
                    console.log(response.data)
                }catch (e) {
                    console.log(e)
                }

            }
        }
    }
</script>

<style scoped>
    .bounce-enter-active {
        animation: bounce-in .5s;
    }
    .bounce-leave-active {
        animation: bounce-in .5s reverse;
    }
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }
</style>