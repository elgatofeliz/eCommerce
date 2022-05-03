<script setup>
import { useRoute, RouterLink } from 'vue-router';
import { useShopDataStore } from '../stores/shopData.js';
import { useShopCartStore } from '../stores/shopCart.js';
import { watch, ref } from 'vue';

import CategoryAside from '../components/aside/CategoryAside.vue'

const shopCartStore = useShopCartStore()
const shopDataStore = useShopDataStore()
const route = useRoute()

const itemId = route.params.id
const itemData = ref(shopDataStore.itemData[itemId - 1])
const itemQuantity = ref(1)

console.log("ItemData", shopDataStore.itemData[itemId - 1])

watch(
    () => route.params.id,
    (current, past) => {
        itemData.value = shopDataStore.itemData[current - 1]
        itemQuantity.value = 1
    }
)

const addToCart = () => {
    const quantity = itemQuantity.value
    const product = { name: itemData.value.title, id: itemData.value.id, qty: quantity }
    shopCartStore.addToCart(product)
}
</script>
<template>
    <div class="mainFlex">
        <CategoryAside :category="`${itemData.category}`" />
        <main class="itemDetailView">
            <section class="detailWrapper">
                {{ itemData.category }}
                <h2>{{ itemData.title }}</h2>
                <div class="imageWrapper">
                    <img :src="`${itemData.image}`" :alt="`${itemData.title}`" />
                </div>
                <h3>Price: {{ itemData.price }}$</h3>
                <p>{{ itemData.description }}</p>
                <h4>Rating: {{ itemData.rating.rate }} / 5</h4>
                <div>
                    <input type="number" min="1" max="10" v-model="itemQuantity" />
                    <button @click="addToCart">Add to Cart</button>
                </div>
            </section>
        </main>
    </div>
</template>
<style lang="scss">
.itemDetailView {
    display: flex;
    justify-content: center;
}
.imageWrapper {
    display: inline-block;
    height: 40vh;

    > img {
        height: 100%;
    }
}
.detailWrapper {
    width: 60vw;
    border: 5px solid #2e2e2e;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
}
</style>