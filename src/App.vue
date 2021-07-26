<template>
  <div id="app">
    <notifications />
    <Rate />
    <List />
    <Cart />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Rate from '@/components/Rate';
import List from '@/components/List';
import Cart from '@/components/Cart';

export default {
  name: 'App',
  data () {
    return {
      polling: null
    }
  },
  components:{
    Rate,
    List,
    Cart
  },
  methods:{
    ...mapActions([
      'getProducts'
    ])
  },
  mounted() {
    this.getProducts()
    this.polling = setInterval(this.getProducts, 15000)
  },
  beforeDestroy () {
    clearInterval(this.polling);
  }
}
</script>

<style lang="scss">
  .vue-notification-wrapper .vue-notification {
    &.success {
      border-left-color: #42A85F;
      background: url('~@/assets/images/down.svg') no-repeat top 5px left 0 #68CD86;
      height:60px;
      color:#42A85F;
    }

    &.error {
      background: url('~@/assets/images/up.svg') no-repeat top 5px left 0 #E54D42;
      border-left-color: #B82E24;
      height:60px;
      color:#B82E24;
    }
  }
  .notification-title{
    padding-left:45px;
    color: inherit;
  }
  .notification-content{
    color:#FFF;
    padding-left:45px;
    margin-top:5px;
  }
  *{
    box-sizing: border-box;
    font-family: Arial;
    font-size: 14px;
    color: #333333;
    transition: 0.1s;
  }
</style>
