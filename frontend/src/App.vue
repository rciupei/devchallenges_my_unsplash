<template>
  <NavBar @update-search="search" @update-images="updateImages" />
  <ImageGallery :filter="state.text" :images="state.images" />
</template>

<script>
import NavBar from "./components/NavBar.vue";
import ImageGallery from "./components/ImageGallery.vue";

import { reactive, onMounted } from "vue";

export default {
  name: "App",
  components: {
    NavBar,
    ImageGallery,
  },
  setup() {
    const state = reactive({ text: "", images: [] });
    function search(a) {
      state.text = a;
    }
    function fetchData() {
      return fetch("http://localhost:3000")
        .then((res) => res.json())
        .then((json) => {
          state.images = json;
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function updateImages(img) {
      state.images = [img, ...state.images];
    }

    onMounted(() => {
      fetchData();
    });
    return { search, state, updateImages };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 90%;
  margin: 0 auto;
}
</style>
