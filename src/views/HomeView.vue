<script setup>
import ShopItem from '@/components/ShopItem.vue'
import { useShopDataStore } from '@/stores/shopData.js'
import { storeToRefs } from 'pinia'

const shopDataStore = useShopDataStore()

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(json => {
        shopDataStore.setData(json)
    })

const { workData } = storeToRefs(shopDataStore)
</script>
<template>
    <main class="homeView">
        <section class="shopGrid">
            <ShopItem
                v-for="item in workData"
                :title="item.title"
                :image="item.image"
                :price="item.price"
                :id="item.id"
            />
        </section>
    </main>
</template>
<style lang="scss">
</style>
