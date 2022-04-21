<script setup>
import { reactive } from 'vue';
import InputCheckbox from '@/components/input/inputCheckbox.vue'
import InputRange from '../input/inputRange.vue';
import { storeToRefs } from 'pinia';
import { useShopDataStore } from '@/stores/shopData.js'

const shopDataStore = useShopDataStore()
const { workData, itemData } = storeToRefs(shopDataStore)

const state = reactive({
    jewelleryChecked: false,
    electronicsChecked: false,
    womensChecked: false,
    mensChecked: false,
    minPrice: '0',
    maxPrice: '0'
})

const handlePriceMin = () => {
    console.log(state.minPrice)
    shopDataStore.filterPriceMin(state.minPrice)
}

const handlePriceMax = () => {
    console.log(state.maxPrice)
    shopDataStore.filterPriceMax(state.maxPrice)
}

const handleCategory = () => {
    /*
        console.log("Jewellery", state.jewelleryChecked)
        console.log("Electronics", state.electronicsChecked)
        console.log("Womens", state.womensChecked)
        console.log("Mens", state.mensChecked)
    
        console.log("MaxPrice", state.maxPrice)
        console.log("MinPrice", state.minPrice)
    */
    if (state.jewelleryChecked) {
        shopDataStore.filterCategory("jewelery")
    }
    else if (state.electronicsChecked) {
        shopDataStore.filterCategory("electronics")
    }
    else if (state.womensChecked) {
        shopDataStore.filterCategory("women's clothing")
    }
    else if (state.mensChecked) {
        shopDataStore.filterCategory("men's clothing")
    }
    else {
        shopDataStore.filterCategory()
    }
}

const resetFilter = () => {
    shopDataStore.resetData()

    state.jewelleryChecked = false
    state.electronicsChecked = false
    state.womensChecked = false
    state.mensChecked = false
    state.minPrice = '0'
    state.maxPrice = '0'

    document.getElementById("checkJewelery").checked = false
    document.getElementById("checkElectro").checked = false
    document.getElementById("checkWomClo").checked = false
    document.getElementById("checkMenClo").checked = false
}
</script>
<template>
    <aside>
        <section>
            <InputCheckbox
                category="Jewellery"
                id="checkJewelery"
                v-model="state.jewelleryChecked"
                @change="handleCategory"
            />
            <br />
            <InputCheckbox
                category="Electronics"
                id="checkElectro"
                v-model="state.electronicsChecked"
                @change="handleCategory"
            />
            <br />
            <InputCheckbox
                category="Women's clothing"
                id="checkWomClo"
                v-model="state.womensChecked"
                @change="handleCategory"
            />
            <br />
            <InputCheckbox
                category="Men's clothing"
                id="checkMenClo"
                v-model="state.mensChecked"
                @change="handleCategory"
            />
        </section>
        <section>
            <InputRange
                minMax="min"
                minValue="0"
                maxValue="999"
                v-model="state.minPrice"
                @change="handlePriceMin"
            />
            <br />
            <button @click="resetFilter">reset filter</button>
            <InputRange
                minMax="max"
                minValue="0"
                maxValue="999"
                v-model="state.maxPrice"
                @change="handlePriceMax"
            />
        </section>
    </aside>
</template>
<style lang="scss">
aside {
    > section {
        height: 30vh;
        display: grid;
        place-items: center;
        border: 3px solid black;
        padding: 10px;
        border-radius: 7px;
        margin: 10px 0;
    }
}
</style>
