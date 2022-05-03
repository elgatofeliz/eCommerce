import { defineStore } from 'pinia'

export const useShopDataStore = defineStore({
  id: 'shopData',
  state: () => ({
    itemData: [],
    workData: []
  }),
  actions: {
    setData(data) {
      const newData = data.map(elt => {
        let index = elt.price.toString().indexOf(".")
        if (index === -1) {
          elt.price = elt.price.toString().concat(".00")
          return elt
        }
        else {
          let length = elt.price.toString().slice(index)
          if (length.length < 3) {
            elt.price = elt.price.toString().concat("0")
            return elt
          }
          else {
            elt.price = elt.price.toString()
            return elt
          }
        }
      })
      this.itemData = newData
      this.workData = newData
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
