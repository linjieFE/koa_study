const Koa=require('koa')//引入koa
const json=require('koa-json')//引入koa-json
//实例化一个app
const app = new Koa();
//服务器发送内容
//koa 使用异步方式 所有的函数都会用async，async提供一个context上下文。content函数把node中提供的一些 request、response等一些我们常用的属性封装在context中
//详见 https://koa.bootcss.com (上下文（Content）)
//这里我们用ctx来接收context对象（类似ajax => res） 常见：ctx.request、ctx.response

app.use(json());

// app.use(async ctx=>(ctx.body="hello Koa!"))//打开浏览器 显示内容 "hello Koa!"
app.use(async ctx=>(ctx.body={msg:"hello Koa!"}))//显示内容为一个对象 "{msg:'hello Koa!'}"

//2）cnpm install koa-json  //格式化json工具。koa很多内置模块都是"koa-"开头
//   1.引用 2.app.use(json())
//localhost：3000
app.listen(3000,()=>{
    console.log("server启动了！")
})


