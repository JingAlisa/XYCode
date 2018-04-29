####一、文件结构介绍

app.js：

​	获取和设置全局的数据，比如：域名、用户ID

app.json：

​	小程序的全局配置，包括小程序的所有页面路径、对window对象的属性进行设置、底部tab设置等

app.wxss:

​	全局样式

project.config.json:

​	对开发工具的个性化设置



pages:

​	页面分别有：

​		home：主页

​		teams：所有战队页

​		teamDetail：战队详情页

​		addTeam：添加战队页

​		message：消息页

​	模板文件夹template：存放模板



utils：

​	存放公共的方法，比如向后台请求数据、提交数据等