# TypeScript实现yAxios


## 一、yAxios基础功能实现

- 处理请求url参数:params拼接解析到url
- 处理请求body:JSON.stringify、toISOString
- 处理请求header:headers的key大小写统一，根据data类型默认Content-Type
- 获取响应数据:promise、request.onreadystatechange
- 处理响应header：字符串转解析对象
- 处理响应data：能够解析成对象则JSON.parse
