<template>
    <div class="catalog">
        <div class="row">
            <div v-for="(item, index) in setProductsInfo" :key="index" class="catalog__item">
                <div v-spoiler class="category">
                    <div class="category__title">
                        <div class="arrow">
                            <span class="arrow__left"></span>
                            <span class="arrow__right"></span>
                        </div>
                        {{ item[0].category }}
                    </div>
                    <div class="category__list">
                        <Item :product="product" v-for="product in item" :key="product.T"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Item from '@/components/Item'

export default {
    components:{
        Item
    },
    computed:{
        ...mapGetters([
            'setProductsInfo',
        ])
    } 
}
</script>

<style lang="scss">
    .catalog{
        width: 100%;
        margin-bottom: 20px;
        max-width: 1100px;
        margin: auto;
        display: flex;
        margin-top:30px;
        &__item{
            width:100%;
            break-inside: avoid;
            -webkit-column-break-inside: avoid;
            padding: 2.5px;
        }
    }
    .row{
        column-count: 2;
        width: 100%;
        -webkit-column-count: 2;
        column-gap: 0;
        -webkit-column-gap: 0;
    }
    .category{
        border:1px solid #888888;
        border-radius: 3px;
        position: relative;
        flex:1;
        &.hide{
            .category__list{
                display: none;
            }
            .arrow__left:after{
                transform-origin: center center;
                transform: rotate(-70deg);
            }
            .arrow__right:after{
                transform-origin: center center;
                transform: rotate(70deg);
            }
        }
        &__list{
            display: flex;
            flex-wrap: wrap;
        }
        &__title{
            position: relative;
            cursor: pointer;
            background: #C2CDD1;
            font-weight: bold;
            color:#444444;
            font-size: 15px;
            padding:3px 3px 3px 30px;
        }
    }
    .arrow {
        position: absolute;
        cursor: pointer;
        left:5px;
        top: 2px;
        &__left{
            position: absolute;
            background-color: transparent;
            top: 10px;
            left: 0;
            width: 8px;
            height: 2px;
            display: block;
            transform: rotate(35deg);
            float: right;
            border-radius: 2px;
            &:after{
                content: "";
                background-color: #444444;
                width: 8px;
                height: 2px;
                display: block;
                float: right;
                border-radius: 6px 10px 10px 6px;
                transition: all 0.5s cubic-bezier(0.25, 1.7, 0.35, 0.8);
                z-index: -1;
            } 
        }
        &__right{
            position: absolute;
            background-color: transparent;
            top: 10px;
            left: 6px;
            width: 8px;
            height: 2px;
            display: block;
            transform: rotate(-35deg);
            float: right;
            border-radius: 2px;
            &:after{
                content: "";
                background-color: #444444;
                width: 8px;
                height: 2px;
                display: block;
                float: right;
                border-radius: 10px 6px 6px 10px;
                transition: all 0.5s cubic-bezier(0.25, 1.7, 0.35, 0.8);
                z-index: -1;
            }
        }
    }
    @media(max-width: 768px){
        .row{
            display: flex;
            flex-wrap: wrap;
            padding:0 10px;
        }
    }
</style>