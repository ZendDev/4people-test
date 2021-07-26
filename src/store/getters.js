const getters = {
    setProductsInfo: state => {
        const productList = state.products
        // Групируем по категориям
        if (!productList|| !productList.length) return []
        return productList.reduce((res, item) => {
            res[item.G] = res[item.G] || []
            res[item.G].push(item)
          return res
        }, {})
    },
    getProductsCart: state => {
      return state.products.filter(item => item.cart)
    }
}

export default getters