<template>
  <div class="home">
    <div class="screen">
      <h1>Satori</h1>
      <p class="desc">
        {{ frontmatter.home.description }}
      </p>
      <div class="actions">
        <a class="action-button secondary" :href="frontmatter.links.starter">{{ frontmatter.home.primary }}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useData } from 'vitepress'

const { frontmatter } = useData()

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

.actions {
  margin: 1.5rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 2.2rem;
  justify-content: center;

  @media (max-width: 600px) {
    margin: 4rem 0 0 0;
    flex-direction: column;
  }

  .action-button {
    flex: 1 0 auto;
    user-select: none;
    display: inline-block;
    font-size: 1.05rem;
    line-height: 1.4;
    padding: 0.5rem 2.2rem;
    border-width: 2px;
    border-style: solid;
    border-radius: 2rem;
    transition:
      color 0.3s ease,
      background-color 0.3s ease,
      border-color 0.3s ease;
    box-sizing: border-box;
    cursor: pointer;

    @media (max-width: 600px) {
      padding: 0.5rem 4rem;
    }

    &.secondary {
      color: var(--vp-button-brand-hover-bg);
      border-color: var(--vp-button-brand-bg);
      &:hover {
        color: var(--vp-button-brand-text);
        background-color: var(--vp-button-brand-bg);
      }
    }
  }
}

</style>
