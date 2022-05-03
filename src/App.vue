<script setup>
import Header from '@/components/header/HeaderItem.vue'

import { RouterView } from 'vue-router';
import { onMounted } from 'vue'
import { useShopCartStore } from "@/stores/shopCart";
import { useShopDataStore } from "@/stores/shopData";

onMounted(() => {
  const shopDataStore = useShopDataStore()
  const shopCartStore = useShopCartStore()

  console.log("Hi")

  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => {
      shopDataStore.setData(json)
    })
    .then(shopCartStore.loadCartInstance())
})
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
