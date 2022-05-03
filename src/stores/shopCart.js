import { defineStore } from "pinia";
import uuid4 from "uuid4";

import { useShopDataStore } from '@/stores/shopData.js'

export const useShopCartStore = defineStore('cartStore', {

    state: () => ({
        cartData: {},
        cartItems: {},
        cartQuantity: 0,
        cartTotalPrice: 0
    }),

    actions: {

        quantity() {
            if (this.cartData.products !== []) {
                let quantity = 0
                this.cartData.products.forEach(item => {
                    quantity += item.qty
                })
                this.cartQuantity = quantity
            }
        },
        totalPrice() {
            if (this.cartItems) {
                let price = 0
                this.cartItems.value.forEach((item) => {
                    let itemTotal = item.qty * item.price
                    price += itemTotal
                })
                this.cartTotalPrice = price
            }
        },

        loadCartInstance() {
            const cs = localStorage.getItem('cart')

            if (!cs) {
                this.cartData = []
            }

            else {
                this.cartData = JSON.parse(cs)
                this.quantity()
                console.log(this.cartQuantity)
                this.updateCartItems()
                console.log(this.cartItems)
            }
        },

        addToCart(product) {
            const cs = localStorage.getItem('cart')

            let isAdded = false

            //check, is there is data in localStorage
            if (!cs) {
                this.cartData = {
                    cid: uuid4(),
                    products: [
                        product
                    ]
                }
            }
            //if there is already data in localStorage
            else {
                // extract data from localStorage
                let cartLocalStorage = JSON.parse(cs)
                // reassign data
                cartLocalStorage.products = cartLocalStorage.products.map((cartItem) => {
                    //check, if product is already in cart
                    if (cartItem.id == product.id) {
                        //if product is already in cart, increase quantity
                        isAdded = true;
                        return { name: cartItem.name, id: cartItem.id, qty: cartItem.qty + product.qty }
                    }
                    return { name: cartItem.name, id: cartItem.id, qty: cartItem.qty }
                })
                // if product was not in the cart already, just add it
                if (!isAdded) {
                    cartLocalStorage.products.push({ name: product.name, id: product.id, qty: product.qty })
                }

                //update cartData state
                this.cartData = cartLocalStorage
            }

            // update data in localStorage
            localStorage.setItem('cart', JSON.stringify(this.cartData))

            //update cartQuantity
            this.quantity()
            this.totalPrice()
        },

        removeFromCart(item) {

            const difference = item.cartQty - item.rmQty

            if (difference === 0) {
                this.cartData.products = this.cartData.products.filter((cartItem) => {
                    return cartItem.id != item.id
                })
            }

            if (difference > 0) {
                this.cartData.products = this.cartData.products.map((cartItem) => {
                    if (cartItem.id === item.id) {
                        cartItem.qty = difference
                        return cartItem
                    } else {
                        return cartItem
                    }
                })
            }

            localStorage.setItem('cart', JSON.stringify(this.cartData))
            this.quantity()
            this.updateCartItems()
            this.totalPrice()
        },

        updateCartItems() {
            const shopDataStore = useShopDataStore()
            console.log("Data Store", shopDataStore.itemData)

            let newArray = []

            shopDataStore.itemData.forEach((item) => {
                this.cartData.products.forEach((elt) => {
                    if (item.id === elt.id) {
                        item.qty = elt.qty
                        newArray.push(item)
                    }
                })
            })

            this.cartItems.value = newArray
            this.totalPrice()
        }
    }
})
