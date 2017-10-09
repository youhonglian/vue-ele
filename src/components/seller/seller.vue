<template>
<div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="(item,index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {saveToLocal, loadFromLocal} from '../../common/js/store.js'
  import star from '../star/star.vue'
  import split from '../split/split.vue'
export default {
  props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    watch: {
      'seller'() {
        this.$nextTick(() => {
          this._initScroll();
          this._initPics();
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPics();
      });
    },
    methods: {
      toggleFavorite(event) {
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      },
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      }
    },
    components: {
      star,
      split
    }
}
</script>

<style  lang="scss">
@import '../../common/function/function.scss';
.seller{
    position: absolute;
    top:px2rem(348px);
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview{
      position: relative;
      padding:px2rem(36px);
      .title{
        margin-bottom:px2rem(16px);
        line-height:px2rem(28px);
        color: rgb(7, 17, 27);
        font-size: px2rem(28px);
      }
      .desc{
        padding-bottom:px2rem(36px);
        border-bototm:1px solid rgba(7, 17, 27, 0.1);
        font-size: 0;
        .star{
          display: inline-block;
          margin-right:px2rem(16px);
          vertical-align: top;
        }
        .text{
          display: inline-block;
          margin-right:px2rem(24px);
          line-height: px2rem(36px);
          vertical-align: top;
          font-size:px2rem(20px);
          color: rgb(77, 85, 93);
        }
      }
      .remark{
        display: flex;
        padding-top:px2rem(36px);
        .block{
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          &:last-child{
            border: none;
          }
          h2{
            margin-bottom:px2rem(8px);
            line-height:px2rem(20px);
            font-size: px2rem(20px);
            color: rgb(147, 153, 159);
          }
          .content{
            line-height:px2rem(48px);
            font-size: px2rem(20px);
            color: rgb(7, 17, 27);
            .stress{
              font-size:px2rem(48px);
            }
          }
        }
      }
      .favorite{
        position: absolute;
        width:px2rem(100px);
        right:px2rem(22px);
        top:px2rem(36px);
        text-align: center;
        .icon-favorite{
          display: block;
          margin-bottom:px2rem(8px);
          line-height:px2rem(48px);
          font-size: px2rem(48px);
          color: #d4d6d9;
          &.active{
            color: rgb(240, 20, 20);
          }
        }
        .text{
          line-height: px2rem(20px);
          font-size: px2rem(20px);
          color: rgb(77, 85, 93);
        }
      }
    }
    .bulletin{
      padding:px2rem(36px) px2rem(36px) 0 px2rem(36px);
      .title{
        margin-bottom:px2rem(16px);
        line-height:px2rem(28px);
        color: rgb(7, 17, 27);
        font-size:px2rem(28px);
      }
      .content-wrapper{
        padding: 0 px2rem(24px) px2rem(32px) px2rem(24px);
        border-bottom:1px solid rgba(7, 17, 27, 0.1);
        .content{
          line-height:px2rem(48px);
          font-size:px2rem(24px);
          color: rgb(240, 20, 20);
        }
      }
      .supports{
        .support-item{
          padding:px2rem(32px) px2rem(24px);
          border-bottom:rgba(7, 17, 27, 0.1);
          font-size: 0;
          
        }
        .icon{
          display: inline-block;
          width:px2rem(32px);
          height:px2rem(32px);
          vertical-align: top;
          margin-right:px2rem(12px);
          background-size:px2rem(32px) px2rem(32px);
          background-repeat: no-repeat;
           &.decrease
                {
                 background-image:url('decrease_4@2x.png');
                }
               &.discount
                {
                 background-image:url('discount_4@2x.png');
                }
               &.guarantee
                {
                 background-image:url('guarantee_4@2x.png');
                }
               &.invoice
               {
                 background-image:url('invoice_4@2x.png');
                }
              &.special
                {
                 background-image:url('special_4@2x.png');
                }
        }
        .text{
          line-height:px2rem(32px);
          font-size:px2rem(32px);
          color: rgb(7, 17, 27);
        }
      }
    }
    .pics{
      padding:px2rem(36px);
      .title{
        margin-bottom:px2rem(24px);
        line-height:px2rem(28px);
        color: rgb(7, 17, 27);
        font-size:px2rem(28px);
      }
      .pic-wrapper{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        .pic-list{
          font-size: 0;
          .pic-item{
            display: inline-block;
            margin-right:px2rem(12px);
            width:px2rem(240px);
            height:px2rem(180px);
            &:last-child{
              margin: 0;
            }
          }
        }
      }
    }
    .info{
      padding: px2rem(36px) px2rem(36px) 0 px2rem(36px);
      color: rgb(7, 17, 27);
      .title{
        padding-bottom:px2rem(24px);
        line-height:px2rem(28px);
        border-bottom:rgba(7, 17, 27, 0.1);
        font-size:px2rem(28px);
      }
      .info-item{
        padding:px2rem(32px) px2rem(24px);
        line-height:px2rem(32px);
        border-bottom:rgba(7, 17, 27, 0.1);
        font-size:px2rem(24px);
      }
    }
}
</style>