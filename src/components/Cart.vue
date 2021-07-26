<template>
    <div class="cart">
        <h2 class="cart__title">Корзина</h2>
        <template v-if="$store.state.count">
            <table class="table">
                <thead>
                    <tr>
                        <td>Наименование товара и описание</td>
                        <td>Количество</td>
                        <td>Цена</td>
                        <td />
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in getProductsCart" :key="item.T">
                        <td>{{ item.name }}</td>
                        <td>
                            <div class="table__quantity">
                                <input type="number" @keyup="onKeyupInput($event, item)" :value="item.cart">
                                <span class="table__value">шт.</span>
                            </div>
                            <div class="table__warning" v-if="item.cart === item.P">Количество ограничено</div>
                        </td>
                        <td>
                            <div class="table__price">
                                {{ item.price }} ₽ 
                                <span class="table__value">/ шт.</span>
                            </div>
                        </td>
                        <td>
                            <span class="table__remove" @click="remove(item)">Удалить</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="total">
                Общая стоимость: 
                <span class="total__count">{{ amount }} ₽</span>
            </div>     
        </template>
        <template v-else>
            <div class="">
                Ваша корзина пуста
            </div>
        </template>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
    methods:{
        remove(product){
            const payload = { id: product.T, value: 0};

            this.$store.commit('ADD_TO_CART', payload);
            this.$store.commit('SET_TOTAL');
        },
        onKeyupInput(event, item) {
            const value = event.target.value;

            if (value) {
                const val = value.replace(/[^\d]/g, '');
                const result = val > item.P ? item.P : val;
                const payload = { id: item.T, value: +result};

                event.target.value = result;

                this.$store.commit('ADD_TO_CART', payload);
                this.$store.commit('SET_TOTAL');
            }
        }
    },
    computed:{
        ...mapGetters([
            'getProductsCart',
        ]),
        ...mapState([
            'amount'
        ])
    }
}
</script>

<style lang="scss">
    .cart{
        width: 100%;
        margin: 30px auto 20px auto;
        max-width: 800px;
    }
    .table {
        width: 100%;
        border-collapse: collapse; 
        border-top:1px solid #EEEEEE;
        margin-bottom: 20px;
        thead{
            td{
                color:#9F9F9F;
            }
        }
        tbody{
            td{
                color:#333333;
                vertical-align: top;
                padding: 15px 5px;
            }
        }
        tr{
            border-bottom:1px solid #EEEEEE;
        }
        th {
            font-weight: bold;
            padding: 5px;
            background: #efefef;
            border: 1px solid #dddddd;
        }
        td {
            padding: 10px 0;
            &:nth-child(1){
                width:48%;
                padding-left:0;
            }
            &:nth-child(2){
                width: 16%;
            }
            &:nth-child(4){
                padding-right:0;
                text-align: right;
            }
        } 
        &__warning{
            background: #FFFAF2;
            color: #FF662D;
            border: 1px dashed #FF662D;
            padding: 6px 4px;
            font-size: 13px;
            line-height: 14px;
            margin-top:5px;
        }
        &__quantity{
            display: flex;
            align-items: center;
            input[type="number"]{
                outline: none;
                border: 1px solid #9F9F9F;
                width: 40px;
                height: 24px;
                box-shadow: inset -1px 1px 3px #e8e8e8;
                font-size: 13px;
                color: #333333;
                padding: 0 4px; 
                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button{
                    -webkit-appearance: none;
                    margin: 0; 
                }
            }
        }
        &__price{
            display: flex;
            align-items: flex-end;
            font-weight: bold;
        }
        &__value{
            font-size: 13px;
            color:#9F9F9F;
            margin-left:3px;   
            font-weight: normal;
        }
        &__remove{
            cursor: pointer;
            &:hover{
                color:red;
            }
        }
    }    
    .total{
        font-size: 13px;
        color: #9F9F9F;
        display: flex;
        align-items: flex-end;
        line-height: 1;
        justify-content: flex-end;
        font-weight: normal;
        &__count{
            display: block;
            color:#FF8331;
            font-weight: bold;
            font-size: 15px;
            margin-left:3px;
        }
    }
    @media(max-width: 768px){
        .cart{
            padding:0 10px;
        }
        .table td {
            font-size: 12px;
        }
    }
</style>