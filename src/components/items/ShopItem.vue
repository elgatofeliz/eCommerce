<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';
import { useShopCartStore } from '@/stores/shopCart.js';

const shopCartStore = useShopCartStore()

const props = defineProps({
    title: String,
    image: String,
    price: String,
    id: Number,
})

const addToCart = () => {
    const product = { name: props.title, id: props.id, qty: 1 }
    shopCartStore.addToCart(product)
}

</script>
<template>
    <article class="shopItem">
        <RouterLink :to="`/items/${props.id}`">
            <h3>{{ props.title }}</h3>
            <div class="imageWrapperThumbnail">
                <img :src="`${props.image}`" :alt="`${props.title}`" />
            </div>
        </RouterLink>
        <p>
            Price:
            <b>{{ props.price }}$</b>
        </p>
        <button @click="addToCart" class="button">Add to Cart</button>
    </article>
</template>
