<script setup>
import { RouterLink } from 'vue-router'
import { useShopCartStore } from '@/stores/shopCart.js';
import { storeToRefs } from 'pinia';

const shopCartStore = useShopCartStore()
const { cartQuantity } = storeToRefs(shopCartStore)

const openCart = () => {
    console.log("Cart open works")
}
const openHamburger = () => {
    console.log("Hamburger works")
}
</script>
<template>
    <header>
        <section @click="openHamburger" class="hamburgerMenu"></section>
        <section>
            <RouterLink to="/">
                <h2>Crafty Commerce</h2>
            </RouterLink>
        </section>
        <section @click="openCart" class="cartImage" />
        <p>{{ cartQuantity }}</p>
    </header>
</template>
<style lang="scss">
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2vh 5vw;
    border: 5px solid;
    border-radius: 10px;
    > section {
        &:hover {
            cursor: pointer;
        }
    }
}
.cartImage {
    height: 50px;
    width: 50px;
    background: url("../../img/icons/cart.png") center/contain no-repeat;
}
.hamburgerMenu {
    height: 50px;
    width: 50px;
    background: url("@/img/icons/hamburger.jpg") center/cover no-repeat;
}
</style>