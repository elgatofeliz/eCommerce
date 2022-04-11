<script setup>
import { RouterView } from 'vue-router';
import Header from '@/components/header/HeaderItem.vue'
import AsideItem from './components/aside/AsideItem.vue'
</script>

<template>
  <Header />
  <section class="mainFlex">
    <AsideItem />
    <RouterView />
  </section>
</template>

<style lang="scss">
@import "@/scss/global-classes.scss";
main {
  width: 96vw;
}
.mainFlex {
  display: flex;
}
</style>
