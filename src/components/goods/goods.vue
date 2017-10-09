<template>
<div> 
<div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
        <ul>
            <li v-for="(item,index) in goods" class="menu-item" :class="{'current':index===currentIndex}" @click="selectMenu(index,$event)">
               <span class="text">
                  <span v-show="item.type>0" class="icon" :class="classMap[item.type]">
                  </span> {{item.name}} 
               </span>
            </li>
        </ul>
    </div>
    <div class="foods-wrapper"  ref="foodsWrapper">
        <ul>
            <li v-for="item in goods" class="food-list food-list-hook">
                <h1 class="title">{{item.name}}</h1>
                <ul>
                    <li @click="selectFood(food,$event)"  v-for="food in item.foods" class="food-item">
                        <div class="icon">
                            <img :src="food.icon">
                        </div>
                        <div class="content">
                            <h2 class="name">{{food.name}}</h2>
                            <p class="desc">{{food.description}}</p>
                            <div class="extra">
                                <span class="count">月售{{food.sellCount}}份</span>
                                <span>好评率{{food.rating}}%</span>
                            </div>
                            <div class="price">
                                <span class="now">￥{{food.price}}</span>
                                <span class="old"v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <v-cartcontrol :food="food"  @add="addFood"> </v-cartcontrol>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <v-shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice " :min-price="seller.minPrice"></v-shopcart>
</div>
<food @add="addFood" :food="selectedFood" ref="food"></food>
</div>
</template>
</div>
<script>
import BScroll from 'better-scroll'
import vShopcart from '../shopcart/shopcart.vue'
import vCartcontrol from '../cartcontrol/cartcontrol.vue'
import food from '../food/food.vue'
export default {
  data () {
    return {
      goods:[],
      listHeight:[],
      scrollY:0,
      selectedFood: {}
    }
  },
  props:{
    seller:{
      type:Object
    }
  },
    created(){
      this.classMap=['decrease','discount','special','invoice','guarantee'];
       this.$axios.get('http://47.94.155.140/api/goods').then((res)=>{
        if(res.data.errno===0)
         {
           this.goods=res.data.data;
           this.$nextTick(()=>{
             this._initScroll();
             this._calculateHeight();
           })
         }
    });
  },
    methods:{
      selectMenu(index){
        if(!event._constructed){
              return
        }
        let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el=foodList[index];
          this.foodsScroll.scrollToElement(el,300);
          console.log(index);
      },
       selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      },
    _initScroll(){
      this.menuScroll=new BScroll(this.$refs.menuWrapper,{
        click:true
      });
      this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{
        click:true,
        probeType:3
      });
      this.foodsScroll.on('scroll',(pos)=>{
        this.scrollY=Math.abs(Math.round(pos.y));
      })
    },
    _calculateHeight(){
      let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let height=0;
      this.listHeight.push(height); 
      for(let i=0;i<foodList.length;i++){
        let item=foodList[i];
         height+=item.clientHeight;
         this.listHeight.push(height);
      }
   
    },
    addFood(target){
      this.$nextTick(()=>{
         this.$refs.shopcart.drop(target);   
      })  
    }
  },
  computed:{
    currentIndex(){
      for(let i=0;i<this.listHeight.length;i++){
        let height1=this.listHeight[i];
        let height2=this.listHeight[i+1];
        if(!height2||(this.scrollY>=height1&&this.scrollY<height2)){
              return i;
        }
      }
      return 0;
    },
    selectFoods(){
      let foods=[];
      this.goods.forEach((good)=>{
        good.foods.forEach((food)=>{
            if(food.count){
              foods.push(food);
            }    
        });
      });
      return foods;
    }
  },
   components:{
     vShopcart,
     vCartcontrol,
     food
   },
}
</script>

<style  lang="scss">
@import '../../common/function/function.scss';
.goods{
  display:flex;
  position:absolute;
  top:px2rem(348px);
  bottom:px2rem(92px);
  width:100%;
  overflow:hidden;
  .menu-wrapper{
    flex:0 0 px2rem(160px);
    width:px2rem(160px);
    background:#f3f5f7;
    ul{
      .menu-item{
        display:table;
        height:px2rem(108px);
        width:px2rem(112px);
        line-height:px2rem(28px);
        padding: 0 px2rem(24px);
        &.current{
          position:relative;
          z-index:10;
          margin-top:px2rem(-2px);
          background:#fff;
          font-weight:700;
        }
        .text{
          display:table-cell;
          width:px2rem(112px);
          vertical-align:middle;
          font-size:px2rem(24px);
          position:relative;
          &:after{
              display:block;
              position:absolute;
              left:0;
              bottom:0;
              width:100%;
              border-top:1px solid rgba(7,17,27,.1);
              content:'';
              transform:scaleY(0.5);
            }
          .icon{
          display:inline-block;
          vertical-align:top;
          width:px2rem(24px);
          height:px2rem(24px);
          margin-right:px2rem(4px);
          background-size:px2rem(24px) px2rem(24px);
          background-repeat:no-repeat;
          &.decrease{
            background-image:url('./decrease_3@2x.png');
          }
          &.discount{
            background-image:url('./discount_3@2x.png');
          }
          &.guarantee{
            background-image:url('./guarantee_3@2x.png');
          }
          &.invoice{
            background-image:url('./invoice_3@2x.png');
          }
          &.special{
            background-image:url('./special_3@2x.png');
          }
        }
        }
      }
    }
  }
  .foods-wrapper{
    flex:1;
    ul{
      .food-list{
        .title{
          padding-left:px2rem(28px);
          height:px2rem(52px);
          line-height:px2rem(52px);
          border-left:2px solid #d9dde1;
          font-size:px2rem(24px);
          color:rgb(147,153,159);
          background:#f3f5f7;
          }
        ul{
        .food-item{
              display:flex;
              margin:px2rem(36px);
              padding-bottom:px2rem(36px);
              position:relative;
             &:after{
              display:block;
              position:absolute;
              left:0;
              bottom:0;
              width:100%;
              border-top:1px solid rgba(7,17,27,.1);
              content:'';
              transform:scaleY(0.5);
            }
            &:last-child{
              margin-bottom:0;
            }
            .icon{
               flex:0 0 px2rem(114px);
               margin-right:px2rem(20px);
               img{
                 width:px2rem(114px);
               }
            }
            .content{
              flex:1;
              position:relative;
              .name{
                margin:px2rem(4px) 0 px2rem(16px) 0;
                height:px2rem(28px);
                line-height:px2rem(28px);
                font-size:px2rem(28px);
                color:rgb(7,17,27);
              }
              .desc{
                margin-bottom:px2rem(16px);
                line-height:px2rem(20px);
                font-size:px2rem(20px);
                color:rgb(147,153,159);
              }
              .extra{
                line-height:px2rem(20px);
                font-size:px2rem(20px);
                color:rgb(147,153,159);
                .count{
                  margin-right:px2rem(16px);
                }
              }
              .price{
                font-weight:700;
                line-height:px2rem(48px);
                .now{
                  margin-right:px2rem(16px);
                  font-size:px2rem(28px);
                  color:rgb(240,20,20);
                }
                .old{
                  text-decoration:line-through;
                  font-size:px2rem(20px);
                  color:rgb(147,153,159);
                }
              }
              .cartcontrol-wrapper{
                   position: absolute;
                   right: 0;
                   bottom:px2rem(0px);
              }
            }
          }
        }
      }
    }
  }
}
</style>
