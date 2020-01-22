var isDone = true;
var decLiteral = 20; // 10进制
var hexLiteral = 0x14; // 16进制
var binaryLiteral = 20; // 2进制
var octalLiteral = 20; // 8进制
var myName = 'bobo';
var age = 30;
var sentence = "Hello,myname is " + myName;
var list = [1, 2, 3];
var list1 = [1, 3, 4];
// 元组
var list2 = [123, 'sdfdf']; // 可以的
// let list3 :[number,string] = ["123",123] // 不可以
list2.push(1);
console.log(list2);
// 枚举 可以正向也可以反向查
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var c = Color.Blue;
var colorName = Color[2];
console.log('cccccc', c);
console.log('colorName', colorName);
