<template>
<div class="shopcart">
    <div class="content" @click="toggleList" >
        <div class="content-left">
            <div class="logo-wrapper">
                <div class="logo" :class="{'highlight':totalCount>0}">
                    <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
                </div>
                <div class="num" v-show="totalCount>0">{{totalCount}}</div>
            </div>
            <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}元</div>
            <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
           <div class="pay" :class="payClass" @click.stop.prevent="pay">
               {{payDesc}}
           </div>
        </div>
    </div>
    <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop"  @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div v-show="ball.show" class="ball">
              <div class="inner inner-hook">
              </div>
            </div>
          </transition>
        </div>
    </div>
    <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <v-cartcontrol :food="food" > </v-cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </transition>
     <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import vCartcontrol from '../cartcontrol/cartcontrol.vue'
export default {
  data () {
    return {
     balls:[
         {show:false},
         {show:false},
         {show:false},
         {show:false},
         {show:false}
     ],
     dropBalls:[],
     fold: true
    }
  },
  props:{
      selectFoods:{
          type:Array,
          default(){
              return [{
                  price:10,
                  count:1
              }];
          }
      },
      deliveryPrice:{
          type:Number,
          default:0
      },
      minPrice:{
          type:Number,
          default:0
      }
  },
  computed:{
      totalPrice(){
          let total=0;
          this.selectFoods.forEach((food)=>{
               total+=food.price*food.count;

          })
             return total;

      },
      totalCount(){
          let count=0;
          this.selectFoods.forEach((food)=>{
              count+=food.count;
          })
          return count;
      },
      payDesc(){
    
           if(this.totalPrice===0){
               return `￥${this.minPrice}元起送`;
           }else if(this.totalPrice<this.minPrice){
               let diff=this.minPrice-this.totalPrice;
               
               return `还差￥${diff}元起送`;
           }else{
               return '去结算';
           }
      },
      payClass(){
          if(this.totalPrice<this.minPrice){
              return 'not-enough';
          }else{
              return 'enough';
          }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
  },
  methods:{
      drop(el){
          for(let i=0;i<this.balls.length;i++){
              let ball=this.balls[i];
              if(!ball.show){
                  ball.show=true;
                  ball.el=el;
                  this.dropBalls.push(ball);
                  return ;
              }
          }
      },
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      hideList() {
        this.fold = true;
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
       pay() {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert(`支付${this.totalPrice}元`);
      },
       beforeDrop(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping(el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
  },
  components: {
      vCartcontrol
  }
}
</script>

<style  lang="scss">
@import '../../common/function/function.scss';
.shopcart{
    position:fixed;
    left:0;
    bottom:0;
    z-index:50;
    height:px2rem(96px);
    width:100%;
    .content{
        display:flex;
        background:#141d27;
        height:100%;
        font-size:0;
        .content-left{
         flex:1;
        .logo-wrapper{
          display:inline-block;
          position:relative;
          top:px2rem(-20px);
          margin:0 px2rem(24px);
          padding:px2rem(12px);
          width:px2rem(112px);
          height:px2rem(112px);
          box-sizing:border-box;
          vertical-align:top;
          border-radius:50%;
          background:#141d27;
          z-index:50;
          .logo{
              width:100%;
              height:100%;
              border-radius:50%;
              background:#2b343c;
              &.highlight{
                  background:rgb(0,160,220);
              }
              .icon-shopping_cart{
                font-size:px2rem(48px);
                line-height:px2rem(88px);
                color:#80858a;
                margin-left:px2rem(22px);
               &.highlight{
                   color:#fff;
               }
              }

           }
         .num{
                position:absolute;
                top:0;
                right:0;
                width:px2rem(48px);
                height:px2rem(32px);
                line-height:px2rem(32px);
                text-align:center;
                border-radius:px2rem(32px);
                font-size:px2rem(18px);
                font-weight:700;
                color:#fff;
                background-color:rgb(240,20,20);
                box-shadow:0 4px 8px 0 rgba(0,0,0,.4);

            }
         }
         .price{
          display:inline-block;
          vertical-align:top;
          line-height:px2rem(48px);
          margin-top:px2rem(24px);
          line-height:px2rem(48px);
          box-sizing:border-box;
          padding-right:px2rem(24px);
          border-right:1px solid rgba(255,255,255,.1);
          font-weight:700;
          font-size:px2rem(32px);
          color:rgba(255,255,255,.4);
          &.highlight{
              color:#fff;
          }
         }
         .desc{
          display:inline-block;
          vertical-align:top;
          line-height:px2rem(48px);
          margin:px2rem(24px) 0 0 px2rem(24px);
          color:rgba(255,255,255,.4);
          font-size:px2rem(20px);
         }
         }
        .content-right{
            flex:0 0 px2rem(210px);
            width:px2rem(210px);
            .pay{
                height:px2rem(96px);
                line-height:px2rem(96px);
                text-align:center;
                font-size:px2rem(24px);
                color:rgba(255,255,255,.4);
                font-weight:700;
                background:#2b333b;
            &.not-enough{
                background:#2b333b;
            }
            &.enough{
                background:#00b43c;
                color:#fff;
            }
            }
        }
    }
    .ball-container{
        .ball{
            position:fixed;
            left:px2rem(64px);
            bottom:px2rem(44px);
            z-index:200;
            transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
             .inner{
                  width:px2rem(32px);
                  height:px2rem(32px);
                  border-radius:50%;
                  background-color:rgb(0,160,220);
                  transition:all 0.4s linear;
               }
           }
        
      
    }
    .shopcart-list{
      position: absolute;
      left: 0;
      top: 0;
      z-index:40;
      width: 100%;
      transform: translate3d(0, -100%, 0);
       &.fold-enter-active, &.fold-leave-active{
        transition: all 0.5s;
       }
      &.fold-enter, &.fold-leave-active{
         transform: translate3d(0, 0, 0);
      }
       .list-header{
         height:px2rem(80px);
         line-height:px2rem(80px);
         padding: 0 px2rem(36px);
         background: #f3f5f7;
         border-bottom: 1px solid rgba(7, 17, 27, 0.1);
         .title{
          float: left;
          font-size:px2rem(28px);
          color: rgb(7, 17, 27);
         }
        .empty{
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .list-content{
        padding: 0 px2rem(36px);
        max-height: px2rem(434px);
        overflow: hidden;
        background: #fff;
        .food{
          position: relative;
          padding: px2rem(24px) 0;
          box-sizing: border-box;
          border-bottom:1px solid rgba(7, 17, 27, 0.1);
          .name{
             line-height: px2rem(48px);
            font-size: px2rem(28px);
            color: rgb(7, 17, 27);
          }
          .price{
            position: absolute;
            right:px2rem(180px);
            bottom:px2rem(24px);
            line-height:px2rem(48px);
            font-size: px2rem(28px);
            font-weight: 700;
            color: rgb(240, 20, 20);
          }
          .cartcontrol-wrapper{
            position: absolute;
            right: 0;
            bottom:px2rem(12px);
          }
       }
      }
    }
    .list-mask{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index:-1;
      backdrop-filter: blur(10px);
      opacity: 1;
      background: rgba(7, 17, 27, 0.6);
      &.fade-enter-active, &.fade-leave-active{
        transition: all 0.5s;
      }
      &.fade-enter, &.fade-leave-active{
        opacity: 0;
        background: rgba(7, 17, 27, 0);
     }
    }
}
</style>