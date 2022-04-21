<script setup>
import { RouterView } from 'vue-router';
import Header from '@/components/header/HeaderItem.vue'
</script>

<template>
  <Header />
  <RouterView />
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
