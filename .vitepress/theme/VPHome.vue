<template>
  <div class="home">
    <div class="screen">
      <h1>Satori</h1>
      <p class="desc">
        THE UNIVERSAL MESSENGER PROTOCOL
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>

.home {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-y: auto;
  display: grid;
  grid-template-rows: repeat(1, 100vh);
}

.screen {
  padding: 6rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  font-size: 3rem;
  line-height: 1.5;
}

.desc {
  color: var(--vp-text-light);
  text-transform: uppercase;
  text-align: center;
  line-height: 2;
  margin: 1rem 0;
}

</style>
