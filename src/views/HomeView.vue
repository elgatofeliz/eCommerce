<script setup>
import ShopItem from '@/components/items/ShopItem.vue'
import FilterAside from '../components/aside/FilterAside.vue'

import { onMounted } from 'vue';

import { useShopDataStore } from '@/stores/shopData.js'
import { useShopCartStore } from "@/stores/shopCart";

import { storeToRefs } from 'pinia'

const shopDataStore = useShopDataStore()
const shopCartStore = useShopCartStore()

const { workData } = storeToRefs(shopDataStore)

onMounted(() => {
    shopCartStore.updateCartItems()
})

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
