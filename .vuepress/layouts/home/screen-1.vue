<template>
  <div class="screen flex screen-1">
    <h1>Satori.js</h1>
    <p class="desc">
      THE UNIVERSAL MESSENGER PROTOCOL
    </p>
  </div>
</template>

<script lang="ts" setup>

defineEmits(['scroll-screen'])

</script>

<style lang="scss" scoped>

.screen-1 {
  h1 {
    font-size: 3rem;
  }

  .koi {
    color: var(--c-love);
  }

  .desc {
    color: var(--c-text-lightest);
    text-transform: uppercase;
    text-align: center;
    line-height: 2;

    br {
      @media (min-width: 600px) {
        display: none;
      }
    }
  }
}

</style>
