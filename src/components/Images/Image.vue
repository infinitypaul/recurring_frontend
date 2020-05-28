<template>
    <figure v-lazy-load class="image__wrapper">
        <ImageSpinner
          class="image__spinner"

        />
        <img class="card-img-top" :data-url="src" height="250">
    </figure>
</template>

<script>
import ImageSpinner from "./ImageSpinner";

    export default {
        name: "GroupImage",
        props :{
            src: {
                type: String,
                required: true
            }
        },
        components: {
            ImageSpinner
        }
    }
</script>

<style scoped>
    .image__wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
    }
    .image__wrapper.loaded .image__item {
        visibility: visible;
        opacity: 1;
        border: 0;
    }
    .image__wrapper.loaded .image__spinner {
        display: none;
        width: 100%;
    }
    .image__item {
        transition: all 0.4s ease-in-out;
        opacity: 0;
        visibility: hidden;
    }
</style>