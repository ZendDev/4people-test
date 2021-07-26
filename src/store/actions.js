import Vue from 'vue'
import info from '@/helpers/names.json'
import axios from 'axios'

// Получаем рандомный курс 
function getRate(min, max) {
    return +(Math.random() * (max - min + 1) + min).toFixed(2);
}

// Сохраняем данные из корзины, чтобы не потерять их
function save(products) {
    let oldPrice = null
    if (products) {
      oldPrice = products.reduce((res, item) => {
        res[item.T] = {
          price: item.price,
          cart: item.cart,
        }
        return res;
      }, {});

    }
    return oldPrice;
}

// Добавляем категорию, название, цену у товара
function addInfo(data, rate, oldData) {
    data.forEach(item => {
      item.category = info[item.G].G
      item.name = info[item.G].B[item.T].N
  
      if (oldData && oldData[item.T]) {
        item.prevPrice = oldData[item.T].price
        item.cart = oldData[item.T].cart
      }
  
      item.price = +(item.C * rate).toFixed(2)
    })
}

const actions = {
    // Получаем товары
    async getProducts(ctx) {
        try{
            const response = await axios.get('data.json')
            const productsData = await response.data.Value.Goods


            const rate = getRate(20, 80)
            let difference
            // Показываем уведомление о курсе
            if(ctx.state.rate && ctx.state.rate < rate){
                difference = rate - ctx.state.rate
                Vue.notify({
                  title: 'Курс изменился',
                  text: `Доллар вырос на ${difference.toFixed(2)} ₽`,
                  type: 'error'
                })
            } else if(ctx.state.rate && ctx.state.rate > rate) {
                difference = ctx.state.rate - rate
                Vue.notify({
                  title: 'Курс изменился',
                  text: `Доллар упал на ${difference.toFixed(2)} ₽`,
                  type: 'success'
                })             
            }

            const oldData = save(ctx.state.products)
            
            addInfo(productsData, rate, oldData)

            ctx.commit('SET_RATE', rate)
            ctx.commit('SET_PRODUCTS', productsData)
            ctx.commit('SET_TOTAL', productsData)

        } catch(e){
            console.log(e)
        }
    }
}

export default actions