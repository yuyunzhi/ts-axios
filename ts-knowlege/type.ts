let isDone:boolean = true

let decLiteral:number = 20  // 10进制
let hexLiteral:number = 0x14 // 16进制
let binaryLiteral:number = 0b10100 // 2进制
let octalLiteral :number = 0o24 // 8进制

let myName:string = 'bobo'
let age:number = 30
let sentence:string = `Hello,myname is ${myName}`


let list:number[] = [1,2,3]
let list1:Array<number> = [1,3,4]

// 元组
let list2:[number,string] = [123,'sdfdf'] // 可以的
// let list3 :[number,string] = ["123",123] // 不可以
list2.push(1)
console.log(list2);

// 枚举 可以正向也可以反向查
enum Color{
    Red = 1,
    Green,
    Blue
}

let c:Color = Color.Blue
let colorName:string = Color[2]
console.log('cccccc',c); //3
console.log('colorName',colorName); //Green

// any
let notSure:any = 4
notSure = `hahahaha`
notSure = false

// void
function warnUser():void {
    console.log('This.is mu waring message');
}

// undefined null
let u:undefined = undefined
let m:null = undefined
let x:undefined = null

// never可以赋值给任一个类型,never的两个常用场景
function error(message:string):never{
    throw new Error(message)
}

function inifiniteLoop():never{
    while(true){

    }
}

// object
declare function create(o:object|null):void;
create({prop:0})
create(null)
// create('string') 不允许

let someValue:string = '123456'
// 强制 将string转化为number的两种方式
// let strLength:number = (<string>someValue).length
let strLength2:number = (someValue as string).length



