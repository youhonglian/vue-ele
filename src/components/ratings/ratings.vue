<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent"
                    :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script >
  import BScroll from 'better-scroll'
  import {formatDate} from '../../common/js/date.js'
  import star from '../star/star.vue'
  import ratingselect from '../ratingselect/ratingselect.vue'
  import split from '../split/split.vue'

  const ALL = 2;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      };
    },
    created() {
      this.$axios.get('http://47.94.155.140/api/ratings').then((res) => {
        if (res.data.errno ===0) {
          this.ratings = res.data.data;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          });
        }
      });
    },
    methods: {
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
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      star,
      split,
      ratingselect
    }
  };
</script>

<style lang="scss">
@import '../../common/function/function.scss';

  .ratings{
    position: absolute;
    top:px2rem(348px);
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview{
      display: flex;
      padding:px2rem(36px) 0; 
      .overview-left{
        flex: 0 0 px2rem(274px);
        padding:px2rem(12px) 0;
        width:px2rem(274px);
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;
        .score{
          margin-bottom:px2rem(12px);
          line-height:px2rem(56px);
          font-size:px2rem(48px);
          color: rgb(255, 153, 0);
        }
        .title{
          margin-bottom:px2rem(16px);
          line-height:px2rem(24px);
          font-size: px2rem(24px);
          color: rgb(7, 17, 27);
        }
        .rank{
          line-height:px2rem(20px);
          font-size:px2rem(20px);
          color: rgb(147, 153, 159);
        }
      }
      .overview-right{
        flex: 1;
        padding:px2rem(12px) 0 px2rem(12px) px2rem(48px);
        .score-wrapper{
          margin-bottom:px2rem(16px);
          font-size: 0;
          .title{
            display: inline-block;
            line-height:px2rem(36px);
            vertical-align: top;
            font-size:px2rem(24px);
            color: rgb(7, 17, 27);
          }
          .star{
            display: inline-block;
            margin: 0 px2rem(24px);
            vertical-align: top;
          }
          .score{
            display: inline-block;
            line-height:px2rem(36px);
            vertical-align: top;
            font-size:px2rem(24px);
            color: rgb(255, 153, 0);
          }
        }
        .delivery-wrapper{
          font-size: 0;
          .title{
            line-height:px2rem(36px);
            font-size: px2rem(24px);
            color: rgb(7, 17, 27);
          }
          .delivery{
            margin-left:px2rem(24px);
            font-size:px2rem(24px);
            color: rgb(147, 153, 159);
          }
        }
      }
    }
    .rating-wrapper{
      padding: 0 px2rem(36px);
      .rating-item{
        display: flex;
        padding: px2rem(36px) 0;
        border-bottom:1px solid rgba(7, 17, 27, 0.1);
        .avatar{
          flex: 0 0 px2rem(56px);
          width:px2rem(56px);
          margin-right:px2rem(24px);
          img{
            border-radius: 50%;
          }
        }
        .content{
          position: relative;
          flex: 1;
          .name{
            margin-bottom:px2rem(8px);
            line-height:px2rem(24px);
            font-size:px2rem(20px);
            color: rgb(7, 17, 27);
          }
          .star-wrapper{
            margin-bottom:px2rem(12px);
            font-size: 0;
            .star{
              display: inline-block;
              margin-right:px2rem(12px);
              vertical-align: top;
            }
            .delivery{
              display: inline-block;
              vertical-align: top;
              line-height:px2rem(24px);
              font-size:px2rem(20px);
              color: rgb(147, 153, 159);
            }
          }
          .text{
            margin-bottom:px2rem(16px);
            line-height:px2rem(36px);
            color: rgb(7, 17, 27);
            font-size:px2rem(24px);
          }
          .recommend{
            line-height:px2rem(32px);
            font-size: 0;
            .icon-thumb_up, .item{
              display: inline-block;
              margin: 0 px2rem(16px) px2rem(8px) 0;
              font-size:px2rem(18px);
            }
            .icon-thumb_up{
              color: rgb(0, 160, 220);
            }
            .item{
              padding: 0 px2rem(12px);
              border: 1px solid rgba(7, 17, 27, 0.1);
              border-radius: 1px;
              color: rgb(147, 153, 159);
              background: #fff;
            }
          }
          .time{
            position: absolute;
            top: 0;
            right: 0;
            line-height:px2rem(24px);
            font-size:px2rem(20px);
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }
</style>