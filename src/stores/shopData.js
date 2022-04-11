import { defineStore } from 'pinia'

export const useShopDataStore = defineStore({
  id: 'shopData',
  state: () => ({
    itemData: [],
    workData: []
  }),
  actions: {
    setData(data) {
      this.itemData = data
      this.workData = data
    },
    filterCategory(category) {
      if (category) {
        this.workData = this.workData.filter((elt) => {
          if (elt.category === category) {
            return elt
          }
        })
      } else {
        this.workData = this.itemData
      }
    },
    filterPriceMin(price) {
      if (price != 0) {
        this.workData = this.workData.filter((elt) => {
          return elt.price > price
        })
      }
    },
    filterPriceMax(price) {
      if (price != 0) {
        this.workData = this.workData.filter((elt) => {
          return elt.price < price
        })
      }
    },
    resetData() {
      this.workData = this.itemData
    }
  }
})
