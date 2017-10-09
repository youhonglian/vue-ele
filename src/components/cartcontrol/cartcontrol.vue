<template>

  <div class="cartcontrol">
    <transition name="move">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart">
    <span class="inner icon-remove_circle_outline"></span>
    </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>

</template>

<script>
 import Vue from 'vue';
export default {
 props:{
     food:{
         type:Object
     }
 },
 methods:{
   addCart(event){
       if(!event._constructed){
              return;
        }
      if(!this.food.count){
        Vue.set(this.food,'count',1)
      }else{
        this.food.count++;
      }
      this.$emit('add', event.target);
   },
   decreaseCart(event){
        if(!event._constructed){
              return;
        }
        if(this.food.count){
           this.food.count--;
        }
   }
 }
}
</script>

<style  lang="scss">
 @import '../../common/fonts/style.css';
 @import '../../common/function/function.scss';
  .cartcontrol{
    font-size:0;
    .cart-decrease{
      display:inline-block;
      padding:px2rem(12px);
      &.move-enter-active,&.move-leave-active{
        transition:all 0.4s linear;
        opacity:1;
        transform:translate3D(0,0,0);
        .inner{
         transition:all 0.4s linear;
         transform:rotate(0);
        }
      }
     .inner{
           display:inline-block;
           line-height:px2rem(48px);
           font-size:px2rem(48px);
           color:rgb(0,160,220);
       }
       &.move-enter,&.move-leave-active{
          opacity:0;
          transform:translate3D(px2rem(48px),0,0);
          .inner{
             transform:rotate(0);
          }
       }
    }
    .cart-count{
      display:inline-block;
      vertical-align:top;
      width:px2rem(24px);
      padding-top:px2rem(24px);
      line-height:px2rem(24px);
      text-align:center;
      font-size:px2rem(20px);
      color:rgb(147,153,159);
    }
    .cart-add{
      display:inline-block;
      padding:px2rem(12px);
      line-height:px2rem(48px);
      font-size:px2rem(48px);
       color:rgb(0,160,220);
    }
  }

</style>