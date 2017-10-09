<template>
  <div id="app">
   <v-header v-bind:seller="seller"></v-header>
   <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
       <router-link to="/seller">商家</router-link>
      </div>
   </div>
   <keep-alive>
    <router-view :seller="seller"></router-view>
   </keep-alive>
  </div>
</template>

<script>
import vHeader from './components/header/header.vue'
 import {urlParse} from './common/js/util.js'
export default {
  name: 'app',
  components:{
    vHeader
  },
  data(){
    return {
      seller:{
        id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
      }
    }
  },
  created(){
    this.$axios.get('http://47.94.155.140/api/seller').then((res)=>{
        if(res.data.errno===0)
         {
           this.seller=res.data.data;
         }
    });
  }

}
</script>

<style lang="scss" >
@import './common/function/function.scss';
#app{
  .tab{
    display:flex;
    width:100%;
    line-height:px2rem(80px);
    height:px2rem(80px);
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
    .tab-item{
      flex:1;
      text-align:center;
      a{
        text-decoration:none;
        color:rgb(77,85,93);
        font-size:px2rem(28px);
        display:block;
        &.active{
          color:rgb(240,20,20);
        }
      }

    }
  }
}
</style>
