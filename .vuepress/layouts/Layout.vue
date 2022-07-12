<template>
  <parent-layout :class="{ home: frontmatter.home }">
    <template #navbar-after>
      <div class="navbar-icons">
        <a class="icon" @click="toggleDarkMode">
          <svg v-show="isDarkMode" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22C6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z" fill="currentColor"></path></svg>
          <svg v-show="!isDarkMode" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M12 18a6 6 0 1 1 0-12a6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636L5.636 7.05L3.515 4.93zM16.95 18.364l1.414-1.414l2.121 2.121l-1.414 1.414l-2.121-2.121zm2.121-14.85l1.414 1.415l-2.121 2.121l-1.414-1.414l2.121-2.121zM5.636 16.95l1.414 1.414l-2.121 2.121l-1.414-1.414l2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z" fill="currentColor"></path></svg>
        </a>
      </div>
    </template>

    <template #page v-if="frontmatter.home">
      <home-page></home-page>
    </template>
  </parent-layout>
</template>

<script setup lang="ts">

import HomePage from './home/index.vue'
import { usePageFrontmatter } from '@vuepress/client'
import { useDarkMode } from '@vuepress/theme-default/lib/client/composables'
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'

const frontmatter = usePageFrontmatter()

const isDarkMode = useDarkMode()
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
}

</script>

<style lang="scss">

.navbar-icons {
  margin: -2px 0.5rem 0 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;

  a.icon {
    width: 1.25rem;
    height: 1.25rem;
    line-height: 2rem;
    color: var(--c-text-light);
    cursor: pointer;
    transition: .3s ease;
    user-select: none;

    &:hover {
      color: var(--c-text-dark);
    }
  }
}

.home .navbar {
  border-bottom: none;
  background-color: transparent;
}

.toggle-dark-button {
  display: none;
}

@media (min-width: 750px) {
  .DocSearch-Button .DocSearch-Search-Icon {
    margin: 0 0.25rem;
  }
}

.DocSearch-Button-Keys {
  height: 18px;
}

</style>
