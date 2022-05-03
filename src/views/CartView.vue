<script setup>
import CartItem from '@/components/items/CartItem.vue'
import { createHydrationRenderer, onMounted, onUpdated } from 'vue'
import { useShopCartStore } from "@/stores/shopCart";
import { storeToRefs } from 'pinia';

const shopCartStore = useShopCartStore()

const { cartItems, cartTotalPrice } = storeToRefs(shopCartStore)

onMounted(() => {
    shopCartStore.updateCartItems()
})

</script>
<template>
    <main class="homeView">
        <section class="shopGrid">
            <CartItem
                v-for="cartItem in cartItems.value"
                :title="cartItem.title"
                :image="cartItem.image"
                :price="cartItem.price"
                :id="cartItem.id"
                :quantity="cartItem.qty"
            />
        </section>
        <section>
            <h3>
                Total Price:
                <b>{{ cartTotalPrice }}$</b>
            </h3>
        </section>
    </main>
</template>
