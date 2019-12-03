//一、起步
const Koa=require('koa')//引入koa
const json=require('koa-json')//引入koa-json
const bodyParser = require('koa-bodyparser')//step13 5-3引入koa-bodyparser
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

app.use(bodyParser())//step13 5-4 

//step14 给上下文context 添加属性
/**
 * 1）定义一个 user 属性
 * 2）在第34行/test 引用 ${ctx.user} 
 * 3) 传参
 */
app.context.user="前端林姐姐"
//step 10 引入一个DB 这里先mock
// const things = ["my family", "programming", "music"]
const things = [
    {name:"my family",job:"programming",hobby:"music"}
]

//step5 
router.get("/test", ctx=> ctx.body = `hello ${ctx.user}`)//localhost:3000/test =>显示 hello!
router.get("/test2/:id", ctx=> ctx.body = `传递的参数是： ${ctx.params.id}`)//localhost:3000/test2 =>显示 传递的参数是： undefined
// router.get("/add", ctx=> ctx.body = "hello add!")//localhost:3000/add =>显示 hello add!

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

//step12 4-1 抽离
router.get ('/',index)

//step12 4-2 函数声名
async function index(ctx){
    await ctx.render("index",{
        title:"Hello Koa...",//传值，可传可不传 ，一般用来传数据.在本例中 不传值layou body会自动载入 index.html内容 传会显示 对象中所传的 title值
        //step 11 传载数据
        things:things
    })
}
//step12 4-3
router.get("/add", showAdd)
//step12 4-4 =>
/**  1) 新建一个add.html 编辑内容
 *   2) view下新建一个partials目录放 单独的组件 导航 
 *   3) 在layout.html中用ejs模板语言 把导航include引用进来
*/ 
async function showAdd(ctx){
    await ctx.render('add',{
        info:'add page'
    })
}

//step13 5-1 添加路由方法 
/**
 * 用koa写一个接口
 * 1）当点添加时，写一个post请求
 *  */
//step13 5-1
router.post("/add", add)

async function add(ctx){
    // await ctx.render('add')
    const body= ctx.request.body
    console.log(body)//=>step13 5-5 回到页面中输入内容 点击添加后 页面显示Not Found 终端打印出 { thing: '1212' } body.thing='1212'
    things.push({name:body.thing,job:'codeMonkey',hobby:'write bug'});
    ctx.redirect('/')//=>step13 5-6 完成后跳到主页
}
//step13 5-2 
/**
 * 1）input发送后 koa服务需要拿到前端传过来的数据
 * 2）需要安装 koa-bodyparser 来接收前端传来的数据 cnpm install koa-bodyparser
 * 3) 顶部引入 koa-bodyparser 再.use(bodyParser)
 */


// step4 配置路由模块
app.use(router.routes()).use(router.allowedMethods())//把router下的方法引用过来



//二、路由 step1
//1) 安装路由 cnpm install koa-router
//2）引入路由
app.listen(3000,()=>{
    console.log("server启动了！")
})


