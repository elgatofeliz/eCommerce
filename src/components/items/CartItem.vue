<script setup>
import { defineProps, ref } from "vue";
import { RouterLink } from "vue-router";
import { useShopCartStore } from "@/stores/shopCart";

const shopCartStore = useShopCartStore()

const itemQuantity = ref(1)

const props = defineProps({
    title: String,
    image: String,
    price: Number,
    id: Number,
    quantity: Number
})

const removeItemFromCart = () => {
    const quantity = itemQuantity.value
    const id = props.id;

    const item = { id: id, rmQty: quantity, cartQty: props.quantity }
    shopCartStore.removeFromCart(item)
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
            Price per unit:
            <b>{{ props.price }}$</b>
        </p>
        <p>
            Quantity in Cart:
            <b>{{ props.quantity }}</b>
        </p>
        <p>
            Total Price:
            <b>{{ props.quantity * props.price }}$</b>
        </p>
        <div>
            <input type="number" min="1" max="10" v-model="itemQuantity" />
            <button @click="removeItemFromCart" class="button">Remove from Cart</button>
        </div>
    </article>
</template>
