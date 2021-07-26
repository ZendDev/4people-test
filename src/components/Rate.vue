<template>
    <div class="rate">
        <div class="rate__text">Изменить курс $</div>
        <input type="number" @change="onChangeInput" placeholder="Press Enter :)" v-model="rate">
        <span class="rate__rub">₽</span>
    </div>
</template>

<script>
export default {
    data(){
        return{
            rate: ''
        }
    },
    methods:{
        onChangeInput(){
            this.$store.commit('SET_RATE', this.rate);
            this.$store.commit('UPDATE_PRICE');
            this.$store.commit('SET_TOTAL');
        }
    }
}
</script>

<style lang="scss">
    .rate{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        input{
            margin:0 5px;
            outline: none;
            border: 1px solid #9F9F9F;
            width: 100px;
            height: 24px;
            box-shadow: inset -1px 1px 3px #e8e8e8;
            font-size: 13px;
            color: #333333;
            padding: 0 4px; 
            &::placeholder{
                color: gray;
                font-size: 13px;
            }
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button{
                -webkit-appearance: none;
                margin: 0; 
            }
        }
    }
</style>