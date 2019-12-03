//一、起步
const Koa=require('koa')//引入koa
const json=require('koa-json')//引入koa-json
//step2
const KoaRouter=require('koa-router')//引入koa-router

//step7 
const path =  require('path');

//step8
const render=require('koa-ejs')//引入koa-ejs模块引擎 引入之前先下

const app = new Koa();
//step3 实例化koa-router
const router = new KoaRouter()
app.use(json());//格式化json

//step 9 引入一个DB 这里先mock
// const things = ["my family", "programming", "music"]
const things = [
    {name:"my family",job:"programming",hobby:"music"}
]

//step5 
router.get("/test", ctx=> ctx.body = "hello Router")//localhost:3000/test =>显示 hello Router!
router.get("/add", ctx=> ctx.body = "hello add!")//localhost:3000/add =>显示 hello add!

//step6 安装一个模板引擎ejs 渲染一个html页面 demo 
//1) cnpm install koa-ejs

// step9 配置模板引擎
/**
 * 指向 layout body内容为 html
 */
render(app,{
    root:path.join(__dirname,"views") ,//配置模板引擎根目录  join(文件名，文件夹名称) 同时在目录下建立views目录
    layout:'layout', //布局 同时在views目录下建立对应的layout.html文件
    viewExt:'html',//文件后缀
    cache:false,//是否缓存
    debug:false //是否启用debug
})

// 路上跳转index '/'目录会自动跟踪指向目录的index.html 所以这里还要在views文件夹个建立一个index.html
router.get ('/',async ctx =>{
    await ctx.render("index",{
        title:"Hello Koa...",//传值，可传可不传 ，一般用来传数据.在本例中 不传值layou body会自动载入 index.html内容 传会显示 对象中所传的 title值
        //step 10
        things:things
    })
})
// step4 配置路由模块
app.use(router.routes()).use(router.allowedMethods())//把router下的方法引用过来


//二、路由 step1
//1) 安装路由 cnpm install koa-router
//2）引入路由
app.listen(3000,()=>{
    console.log("server启动了！")
})


