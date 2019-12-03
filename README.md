# step1 安装koa

# 1) 初始化package.json
#   npm init --yes
# 2) cnpm install koa

# 3) cnpm install nodemon -D  或 cnpm install nodemon -g 
#    可以让我们在不用重启项目的情况下，改变刷新当前项目的内容,
#    我这里用的是 -D 对当前项目安装 

# 4）改变当前package.josn的启动方式，初始化默认为“test” 我这里改为 "start"
#
#  ------ before ---
#  "scripts": {
#    "test": "echo \"Error: no test specified\" && exit 1"
#  },

#  ------ after ---
#  "scripts": {
#    "start": "nodemon app.js"
#  },

#step2 在根目前下创建 app.js 下面就可以开始引入KOA了


