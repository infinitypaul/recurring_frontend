<template>
    <div class="row">
        <div class="col-sm-3" v-for="service in services" :key="service.id">
            <Service :service="service" />
        </div>
        <SignInModal />
        <RegisterModal />
        <OrderModal />
        <ResultModal />
    </div>


</template>

<script>
    import Service from "./Service";
    import SignInModal from '@/components/Modal/SignInModal.vue'
    import RegisterModal from '@/components/Modal/Modals/RegisterModal.vue'
    import OrderModal from '@/components/Modal/Modals/OrderModal.vue'
    import ResultModal from '@/components/Modal/Modals/ResultModal.vue'
    import axios from "axios";
    export default {
        name: "Services",
        data(){
            return {
                services : []
            }
        },
        components: {
            Service,
            SignInModal,
            RegisterModal,
            OrderModal,
            ResultModal
        },
        async mounted() {
            try{
                let response = await axios.get('services')
                this.services = response.data.data

            } catch (e) {
                console.log(e)
            }

        }

    }
</script>

<style scoped>

</style>