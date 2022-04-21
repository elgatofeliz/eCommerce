import { defineStore } from "pinia";
import uuid4 from "uuid4";

export const useShopCartStore = defineStore('cartStore', {

    state: () => ({
        cartData: [],
        cartQuantity: ""
    }),

    actions: {

        loadCartInstance() {
            const cs = localStorage.getItem('cart')

            if (!cs) {
                this.cartData = []
            }

            else {
                this.cartData = JSON.parse(cs)
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
        },

        removeFromCart(id) {
            this.cartData.products = this.cartData.products.filter((cartItem) => cartItem.id != id)
        }
    }
})