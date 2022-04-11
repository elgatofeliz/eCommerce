<script setup>
import { useRoute, RouterLink } from 'vue-router';
import { useShopDataStore } from '../stores/shopData.js';

const shopDataStore = useShopDataStore()
const route = useRoute()

const itemId = route.params.id
const itemData = shopDataStore.itemData[itemId - 1]

console.log("ItemData", shopDataStore.itemData[itemId - 1])

</script>
<template>
    <main class="itemDetailView">
        <section class="detailWrapper">
            <RouterLink :to="`/category/${itemData.category}`">{{ itemData.category }}</RouterLink>
            <h2>{{ itemData.title }}</h2>
            <div class="imageWrapper">
                <img :src="`${itemData.image}`" :alt="`${itemData.title}`" />
            </div>
            <h3>Price: {{ itemData.price }}$</h3>
            <p>{{ itemData.description }}</p>
            <h4>Rating: {{ itemData.rating.rate }} / 5</h4>
            <button>Add to Cart</button>
        </section>
    </main>
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