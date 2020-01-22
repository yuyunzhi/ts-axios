/**
 * 创建一个类 User
 * 当前目录运行 tsc great.ts 会编译出great.js文件
 */
class User{
    fullName:string
    firstName:string
    lastName:string

    constructor(firstName:string,lastName:string){
        this.fullName = firstName + " " + lastName
        this.lastName = lastName
        this.firstName = firstName
    }
}

interface Person{
    firstName:string,
    lastName:string
}

function greeter (person:Person) {
    return "Hello " + person.firstName + "" + person.lastName
}

const user = new User('yu','yunzhi')

console.log(greeter(user));

// 当前目录运行 tsc great.ts 会编译出great.js文件
