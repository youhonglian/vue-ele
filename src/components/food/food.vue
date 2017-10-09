<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <v-cartcontrol :food="food"></v-cartcontrol>
          </div>
          <transition name="fade">
            <div  @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">
              加入购物车
            </div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType"
                        :onlyContent="onlyContent" :desc="desc"
                        :ratings="food.ratings"></ratingselect>
          
           <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings"
                  class="rating-item ">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
 import BScroll from 'better-scroll'
 import vCartcontrol from '../cartcontrol/cartcontrol.vue'
 import Vue from 'vue'
 import split from '../split/split.vue'
 import ratingselect from '../ratingselect/ratingselect.vue'
 import {formatDate} from '../../common/js/date.js'
 const ALL=2
  export default {
   props: {
      food: {
        type: Object
      }
    }, 
    data(){
      return{
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    
    methods:{
      show(){
        this.showFlag=true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
       hide() {
        this.showFlag = false;
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('add', event.target);
        Vue.set(this.food, 'count', 1);
      },
       needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    components:{
     vCartcontrol,
     split,
     ratingselect
   },
   filters: {
      formatDate(time) {
        let date = new Date(time);
         return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  };
</script>

<style lang="scss">
@import '../../common/function/function.scss';
.food{
  position: fixed;
  left: 0;
  top: 0;
  bottom:px2rem(96px);
  z-index: 30;
  width: 100%;
  background: #fff;
  transform: translate3d(0, 0, 0);
  &.move-enter-active, &.move-leave-active{
      transition: all 0.2s linear;
  }
    &.move-enter, &.move-leave-active{
      transform: translate3d(100%, 0, 0);
    }
    .food-content{
      .image-header{
         position: relative;
         width: 100%;
         height: 0;
         padding-top: 100%;
         img{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
         }
         .back{
           position: absolute;
           top:px2rem(20px);
           left: 0;
           .icon-arrow_lift{
            display: block;
            padding:px2rem(20px);
            font-size:px2rem(40px);
             color: #fff;
           }
         }
      }
      .content{
        position: relative;
        padding:px2rem(36px);
       .title{
        line-height:px2rem(28px);
        margin-bottom: px2rem(16px);
        font-size:px2rem(28px);
        font-weight: 700;
        color: rgb(7, 17, 27);
        }
       .detail{
        margin-bottom: px2rem(36px);
        line-height: px2rem(20px);
        height:px2rem(20px);
        font-size: 0;
        .sell-count, .rating{
          font-size:px2rem(20px);
          color: rgb(147, 153, 159);
        }
        .sell-count{
          margin-right:px2rem(24px);
        }
       }
       .price{
        font-weight: 700;
        line-height: px2rem(48px);
        .now{
          margin-right: px2rem(16px);
          font-size:px2rem(28px);
          color: rgb(240, 20, 20);
        }
        .old{
          text-decoration: line-through;
          font-size:px2rem(20px);
          color: rgb(147, 153, 159);
        }
       }
       .cartcontrol-wrapper{
        position: absolute;
        right:px2rem(24px);
        bottom:px2rem(24px);
       }
       .buy{
        position: absolute;
        right:px2rem(36px);
        bottom:px2rem(36px);
        z-index: 10;
        height:px2rem(48px);
        line-height:px2rem(48px);
        padding: 0 px2rem(24px);
        box-sizing: border-box;
        border-radius: px2rem(24px);
        font-size: px2rem(20px);
        color: #fff;
        background: rgb(0, 160, 220);
        opacity: 1;
        &.fade-enter-active, &.fade-leave-active{
          transition: all 0.2s;
        }
        &.fade-enter, &.fade-leave-active{
          opacity: 0;
          z-index: -1;
        }
       }
      }
      .info{
        padding:px2rem(36px);
        .title{
        line-height:px2rem(28px);
        margin-bottom:px2rem(12px);
        font-size:px2rem(28px);
        color: rgb(7, 17, 27);
        }
       .text{
        line-height:px2rem(48px);
        padding: 0 px2rem(16px);
        font-size: px2rem(24px);
        color: rgb(77, 85, 93);
       }
      }
      .rating{
        padding-top:px2rem(36px);
       .title{
        line-height:px2rem(28px);
        margin-left:px2rem(36px);
        font-size:px2rem(28px);
        color: rgb(7, 17, 27);
        }
       .rating-wrapper{
         padding: 0 px2rem(36px);
         .rating-item{
          position: relative;
          padding:px2rem(32px) 0;
          border-bottom:1px solid rgba(7, 17, 27, 0.1);
          .user{
            position: absolute;
            right: 0;
            top: px2rem(32px);
            line-height:px2rem(24px);
            font-size: 0;
            .name{
              display: inline-block;
              margin-right:px2rem(12px);
              vertical-align: top;
              font-size:px2rem(20px);
              color: rgb(147, 153, 159);
            }
            .avatar{
              border-radius: 50%;
            }
          }
          .time{
            margin-bottom:px2rem(12px);
            line-height:px2rem(24px);
            font-size: px2rem(20px);
            color: rgb(147, 153, 159);
          }
          .text{
            line-height:px2rem(32px);
            font-size:px2rem(24px);
            color: rgb(7, 17, 27);
            .icon-thumb_up, .icon-thumb_down{
              margin-right:px2rem(8px);
              line-height:px2rem(32px);
              font-size:px2rem(24px);
            }
            .icon-thumb_up{
              color: rgb(0, 160, 220);
            }
            .icon-thumb_down{
              color: rgb(147, 153, 159)
            }
          }
         }
         .no-rating{
          padding:px2rem(32px) 0;
          font-size:px2rem(24px);
          color: rgb(147, 153, 159);
         }
       }
      }
    }
}
</style>