<template>
  <div class="img-container">
    <Image
      v-for="image in state.filteredImages"
      :key="image.id"
      :imageSrc="image"
      alt="pic"
      @my-event="toggleModal"
    />
    <div class="delete-modal" v-if="state.showDeleteModal">
      <div class="modal-content">
        <p>Are you sure?</p>
        <div class="button-container">
          <button @click="toggleModal">Cancel</button>
          <button @click="deleteImage">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Image from "./Image.vue";
import { reactive, computed, watchEffect } from "vue";

export default {
  components: {
    Image,
  },
  props: { filter: String, images: Array },

  setup(props) {
    const state = reactive({
      images: [],
      filteredImages: computed(() => {
        let filter = new RegExp(props.filter, "i");
        return state.images.filter((img) => img.imageDescription.match(filter));
      }),
      showDeleteModal: false,
      currentImage: "",
    });

    watchEffect(() => {
      state.images = props.images;
    });

    function deleteImage() {
      state.showDeleteModal = false;
      fetch("http://localhost:3000/remove/" + state.currentImage, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          state.images = state.images.filter(
            (img) => img._id !== state.currentImage
          );
        });
    }

    function toggleModal(id) {
      state.showDeleteModal = !state.showDeleteModal;
      state.currentImage = id;
    }

    return { state, deleteImage, toggleModal };
  },
};
</script>

<style lang="scss" scoped>
.img-container {
  margin-top: 1rem;
  column-count: 3;
  column-gap: 1em;
}

.delete-modal {
  background-color: #fefefe8f;
  padding: 20px;
  border: 1px solid #888;
  width: 100%; /* Could be more or less, depending on screen size */
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-content {
    width: 40%;
    height: 30%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 2rem;
    border-radius: 12px;
    box-sizing: border-box;

    .button-container {
      margin-left: auto;
    }

    button {
      background-color: #eb5757;
      border-radius: 12px;
      padding: 1rem;
      color: #ffffff;
      border: none;
      font-size: 1rem;
      font-weight: 700;
      margin: 1rem;
      cursor: pointer;

      &:nth-of-type(1) {
        background-color: #ffffff;
        color: #bdbdbd;
      }
    }
  }
}
</style>