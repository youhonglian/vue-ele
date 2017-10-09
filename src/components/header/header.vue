<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar">
    </div>
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper">
        <div class="detail-main">
           <h1 class="name">{{seller.name}}</h1>
           <div class="star-wrapper">
              <v-star :size="48" :score="seller.score"></v-star>
           </div>
           <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>   
           </div>
           <ul class="supports" v-if="seller.supports">
              <li class="support-item" v-for="(item,index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]" ></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
           </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>   
           </div>
           <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
           </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
  
</template>

<script>
import vStar from '../star/star.vue';
export default {
  data () {
    return {
      detailShow:false
    }
  },
  props:{
    seller:{
      type:Object
    }
  },
   created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
   },
  methods:{
    showDetail(){
      this.detailShow=true;
    },
    hideDetail(){
      this.detailShow=false;
    }
  },
  components:{
    vStar
  }
}
</script>

<style  lang="scss">
  @import '../../common/function/function.scss';
  @import '../../common/fonts/style.css';
   .header{
     overflow:hidden;
     color:#fff;
     background-color:rgba(7,17,27,.5);
     position:relative;
     .content-wrapper{
       position:relative;
       padding:px2rem(48px) px2rem(24px) px2rem(36px) px2rem(48px);
       font-size:0;
        .avatar{
          display:inline-block;
          img{
            height:px2rem(128px);
            width:px2rem(128px);
            border-radius:px2rem(4px);
          }
          vertical-align:top;
        }
        .content{
          display:inline-block;
          margin-left:px2rem(32px);
          .title{
            margin:px2rem(4px) 0 px2rem(16px) 0;
            .brand{
              height:px2rem(36px);
              width:px2rem(60px);
              display:inline-block;
              vertical-align:top;
              background-image:url('./brand@2x.png');
              background-size:px2rem(60px) px2rem(36px);
              background-repeat:no-repeat;
            }
            .name{
              margin-left:px2rem(12px);
              font-size:px2rem(32px);
              line-height:px2rem(36px);
              font-weight:bold;
            }
        
          }
          .description{
            margin-bottom:px2rem(20px);
            font-size:px2rem(24px);
            line-height:px2rem(24px);
            font-weight:200;
            color:rgb(255,255,255);
          }
          .support{
            .icon{
              display:inline-block;
              width:px2rem(24px);
              height:px2rem(24px);
              margin-right:px2rem(8px);
              background-size:px2rem(24px) px2rem(24px);
              background-repeat:no-repeat;
              background-image:url('./decrease_1@2x.png');

            }
            .text{
              font-size:px2rem(20px);
              line-height:px2rem(24px);
              font-weight:200;
              color:rgb(255,255,255);
              vertical-align:top;
            }
          }
        }
        .support-count{
          position:absolute;
          right:px2rem(24px);
          bottom:px2rem(28px);
          padding:0 px2rem(16px);
          height:px2rem(48px);
          line-height:px2rem(48px);
          border-radius:px2rem(28px);
          background-color:rgba(0,0,0,.2);
          text-align:center;
          .count{
            font-size:px2rem(20px);
            vertical-align:top;
          }
          .icon-keyboard_arrow_right{
            font-size:px2rem(20px);
            line-height:px2rem(48px);
            margin-left:px2rem(4px);
          }
        }

     }
     .bulletin-wrapper{
       position:relative;
       height:px2rem(56px);
       line-height:px2rem(56px);
       padding:0 px2rem(44px) 0 px2rem(24px);
       white-space:nowrap;
       overflow:hidden;
       text-overflow:ellipsis;
       background-color:rgba(7,17,27,.2);
       .bulletin-title{
         margin-top:px2rem(14px);
         display:inline-block;
         width:px2rem(44px);
         height:px2rem(24px);
         background-image:url('./bulletin@2x.png');
         background-size:px2rem(44px) px2rem(24px);
         background-repeat:no-repeat;
       }
       .bulletin-text{
         vertical-align:top;
         margin:0 px2rem(8px);
         font-size:px2rem(20px);
       }
       .icon-keyboard_arrow_right{
         position:absolute;
         font-size:px2rem(20px);
         right:px2rem(20px);
         bottom:px2rem(16px);
       }
     }
     .background{
       position:absolute;
       top:0;
       left:0;
       z-index:-1;
       filter:blur(10px);
       height:100%;
       img{
        width:px2rem(750px);
        height:100%;
       }
     }
     .detail{
       position:fixed;
       top:0;
       left:0;
       width:100%;
       height:100%;
       overflow:auto;
       z-index:100;
       background:rgba(7,17,27,.8);
       .detail-wrapper{
         min-height:100%;
         clear:both;
         overflow:hidden;
         .detail-main{
         margin-top:px2rem(128px);
         padding-bottom:px2rem(128px);
         .name{
           line-height:px2rem(32px);
           font-size:px2rem(32px);
           font-weight:700;
           text-align:center;
         }
         .star-wrapper{
           margin-top:px2rem(36px);
           padding:px2rem(4px) 0;
           text-align:center;
         }
         .title{
           display:flex;
           width:80%;
           margin:px2rem(56px) auto px2rem(48px) auto;
           .line{
             flex:1;
             position:relative;
             top:px2rem(-12px);
             border-bottom:1px solid rgba(255,255,255,.2);
           }
           .text{
             padding:0px px2rem(24px) 0px px2rem(24px);
             font-size:px2rem(28px);
             font-weight:700;
           }
         }
         .supports{
           width:80%;
           margin:0 auto;
           .support-item{
             padding:0 px2rem(24px);
             margin-bottom:px2rem(24px);
             font-size:0;
             &:last-child{
               margin-bottom:0;
             }
             .icon{
               display:inline-block;
               width:px2rem(32px);
               height:px2rem(32px);
               vertical-align:top;
               margin-right:px2rem(12px);
               background-size:px2rem(32px) px2rem(32px);
               background-repeat:no-repeat;
                &.decrease
                {
                 background-image:url('decrease_1@2x.png');
                }
               &.discount
                {
                 background-image:url('discount_1@2x.png');
                }
               &.guarantee
                {
                 background-image:url('guarantee_1@2x.png');
                }
               &.invoice
               {
                 background-image:url('invoice_1@2x.png');
                }
              &.special
                {
                 background-image:url('special_1@2x.png');
                }
             }
             .text{
               line-height:px2rem(32px);
               font-size:px2rem(24px);
             }
           }
         }
         .bulletin{
           width:80%;
           margin:0 auto;
           .content{
             padding:0 px2rem(24px);
             line-height:px2rem(48px);
             font-size:px2rem(24px);
           }
         }
         }
       }
       .detail-close{
         position:relative;
         width:px2rem(64px);
         height:px2rem(64px);
         margin:px2rem(-128px) auto 0 auto;
         clear:both;
         font-size:px2rem(64px);

       }
     }
   }
</style>
