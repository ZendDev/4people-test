import Vue from 'vue'
// Считаем количество
function totals(products) {
    return products.reduce((res, item) => {
      if (!item.cart) return res
        res.amount = res.amount + item.cart * item.price;
        res.count = res.count + item.cart;
      return res;
    }, {
      amount: 0,
      count: 0,
    })
}

const mutations = {
    SET_PRODUCTS(state, payload) {
        state.products = payload
    },
    SET_RATE(state, payload){
        state.rate = payload
    },
    SET_TOTAL(state){
        const total = totals(state.products)
        state.amount = +total.amount.toFixed(2)
        state.count = total.count
    },    
    ADD_TO_CART(state, payload) {
        state.products.forEach((item, index) => {
            if (item.T === payload.id) {
                Vue.set(state.products[index], 'cart', payload.value)
            }
        });
    },
    UPDATE_PRICE(state) {
        const { rate, products } = state
        products.forEach((item) => {
            item.prevPrice = item.price
            item.price = +(item.C * rate).toFixed(2)
        })
    },
}

export default mutations