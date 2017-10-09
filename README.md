vue文档看了好久了，自己练习的一直都是小demo，对vue的理解还是很浅显的。突然看到慕课网有vue饿了么视频，自己就跟着老师一起做，通过看文档把vue1.0改成了vue2.0，用sass代替了stylus，自适应方案改成了手淘的flexiable+rem方案，vue-resource改成了最新官方推荐的axios。vue-router也从原来的写法里升级成了最新的写法。通过本次的模仿，自己学到了好多，对组件化，项目的搭建有了深刻的认识，还学会了使用坐着的better-scroll滚动插件，对于css掌握了好多原来没有注意到的小技巧。
### 线上地址和部署
[link](http://47.94.155.140/#/)
使用阿里云服务器部署,用express提供数据接口，express用了cors中间件实行跨域
### 使用Build Setup
***

```
#安装依赖
npm install
#运行
npm run dev
```
### 遇到的问题
***

```
1.图标字体的问题
图标自己路径没有引入真确
2.sass的使用
需要安装sass,sass-loader,写的sass函数要在每个使用的vue组件里引用
3.运行不起来，提示没有模块依赖
可能npm的时候没有安装好，重新安装一下就ok了
4.vue的生命周期变了，好多移除了没有用的
```





