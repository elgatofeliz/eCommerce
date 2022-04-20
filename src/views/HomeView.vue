<script setup>
import ShopItem from '@/components/ShopItem.vue'
import FilterAside from '../components/aside/FilterAside.vue'
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
    <div class="mainFlex">
        <FilterAside />
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
    </div>
</template>
<style lang="scss">
</style>
