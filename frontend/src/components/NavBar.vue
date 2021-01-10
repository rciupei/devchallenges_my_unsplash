<template>
  <div class="navbar">
    <div class="nav-left">
      <img src="../assets/my_unsplash_logo.svg" alt="logo" />
      <div class="input-container">
        <i class="fas fa-search"></i>
        <input
          type="text"
          placeholder="Search by name"
          v-model="searchInput.text"
          @input="handleEmit"
        />
      </div>
    </div>
    <div class="nav-right">
      <button @click="showAddModal">Add a photo</button>
    </div>
    <div class="nav-right">
      <button @click="addRandom">Add random photo</button>
    </div>
    <div class="add-modal" v-if="state.showModal">
      <div class="modal-content">
        <p>Add a new photo</p>
        <label for="imageLabel">Label</label>
        <input
          type="text"
          name="imageLabel"
          id="imageLabel"
          v-model="state.imageDescription"
        />
        <label for="photoUrl">Photo URL</label>
        <input
          type="text"
          name="photoUrl"
          id="photoUrl"
          v-model="state.imageUrl"
        />
        <div class="button-container">
          <button @click="showAddModal">Cancel</button>
          <button @click="addImage">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  setup(props, { emit }) {
    const searchInput = reactive({ text: "" });
    const state = reactive({
      showModal: false,
      imageDescription: "",
      imageUrl: "",
    });

    function handleEmit() {
      emit("updateSearch", searchInput.text);
    }

    function handleUpdateImages(img) {
      emit("updateImages", img);
    }

    function showAddModal() {
      state.showModal = !state.showModal;
    }

    async function addRandom() {
      let newImage = await fetch("http://localhost:3000/add-random")
        .then((res) => res.json())
        .then((res) => {
          return res;
        });
      handleUpdateImages(newImage);
    }

    async function addImage() {
      let newImage = await fetch("http://localhost:3000/add", {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: state.imageUrl,
          imageDescription: state.imageDescription,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          state.showModal = !state.showModal;
          state.imageDescription = "";
          state.imageUrl = "";

          return res;
        });
      handleUpdateImages(newImage);
    }

    return {
      searchInput,
      handleEmit,
      state,
      showAddModal,
      addImage,
      handleUpdateImages,
      addRandom,
    };
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;

  .nav-left {
    display: flex;
    flex-basis: 30%;
    justify-content: space-between;
  }

  .add-modal {
    background-color: #fefefe8f;
    padding: 20px;
    border: 1px solid #888;
    width: 100%; /* Could be more or less, depending on screen size */
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    /* opacity: 0.7; */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;

    .modal-content {
      box-sizing: border-box;
      width: 40%;
      height: 40%;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      font-size: 1rem;
      border-radius: 12px;
      padding: 1.5rem;

      p {
        font-size: 1.5rem;
        font-weight: 500;
      }

      input {
        padding: 0.5rem;
        width: 100%;
        border: 1px solid #4f4f4f;
        box-sizing: border-box;
        filter: drop-shadow(0px 1px 6px rgba(0, 0, 0, 0.1));
        border-radius: 12px;
      }

      .button-container {
        margin-left: auto;
      }

      button {
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

  .input-container {
    padding: 0.5rem;
    margin-left: 2rem;
    border: 1px solid #bdbdbd;
    color: #bdbdbd;
    border-radius: 12px;
    min-width: 15rem;

    input {
      border: none;
      padding: 0.5rem;
      margin-left: 0.5rem;
    }
  }

  button {
    background-color: #3db46d;
    border-radius: 12px;
    padding: 1rem;
    color: #ffffff;
    border: none;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
  }
}
</style>