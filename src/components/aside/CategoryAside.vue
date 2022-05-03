<script setup>
import { defineProps } from 'vue'
import { storeToRefs } from 'pinia';
import { useShopDataStore } from '@/stores/shopData.js'

import ShopItem from '@/components/items/ShopItem.vue'

const shopDataStore = useShopDataStore()
const { workData } = storeToRefs(shopDataStore)

const props = defineProps({
    category: String
})

shopDataStore.filterCategory(props.category)
</script>
<template>
    <aside>
        <ShopItem
            v-for="item in workData"
            :title="item.title"
            :image="item.image"
            :price="item.price"
            :id="item.id"
        />
    </aside>
</template>
<style scoped lang="scss">
aside {
    padding: 20px;
}
</style>