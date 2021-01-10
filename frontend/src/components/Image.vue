<template>
  <div class="image">
    <img :src="imageSrc.imageUrl" alt="pic" />
    <button @click="handleDelete(imageSrc._id)">Delete</button>
    <div class="description">{{ imageSrc.imageDescription }}</div>
  </div>
</template>

<script>
export default {
  props: {
    imageSrc: Object,
  },
  setup(props, { emit }) {
    function handleDelete(item) {
      emit("myEvent", item);
    }
    return { handleDelete };
  },
};
</script>

<style lang="scss" scoped>
.image {
  position: relative;
  img {
    margin-bottom: 1rem;
    width: 100%;
  }

  &:hover {
    img {
      filter: brightness(40%);
    }
    button {
      display: block;
    }

    .description {
      display: block;
    }
  }

  button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: none;
    background: none;
    border: 2px solid #eb5757;
    border-radius: 38px;
    color: #eb5757;
    padding: 0.5rem 1.5rem;
    font-weight: 500;
    font-size: 1rem;
    text-transform: lowercase;

    &:hover {
      color: #ffffff;
      background-color: #eb5757;
      cursor: pointer;
    }
  }
  .description {
    display: none;
    position: absolute;
    color: #ffffff;
    z-index: 1;
    bottom: 3rem;
    text-align: justify;
    font-weight: 500;
    font-size: 1.25rem;
    padding: 0 0.75rem;
  }
}
</style>