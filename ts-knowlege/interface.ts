interface LabelValue {
  label: string
  size?: number
}

function printLabel(labelObj: LabelValue): void {
  console.log(labelObj.label)
}

let myObj = { size: 10, label: 'Size 10' }

printLabel(myObj)
printLabel({ label: '123' })


/**
 * 可选属性
 */

interface Square {
  color: string
  area: number
}

interface SquareConfig {
  color?: string
  width?: number
  [propName:number]:any // 索引类型的作用是可以添加除了定义的变量外其他类型
}


function createSquare(config: SquareConfig): Square {
  let newSquare = { color: 'white', area: 100 }
  if (config.color) {
    newSquare.color = config.color
  }

  if (config.width) {
    newSquare.area = config.width ** 2
  }
  console.log("newSquare",newSquare)
  return newSquare
}

let mySquare = { color: 'black', width: 100 }
createSquare({ color: 'black', width: 100,})


/**
 * 对象声明只读属性
 * 当你定义的变量为属性的话，可以使用只读
 */
interface Point {
  readonly x:number
  readonly y:number
}

let obj:Point = {x:1,y:2}
// obj.x = 2  不允许修改

let a:number[] = [1,2,3]
let b:Array<number> = [1,2,3]
let ro:ReadonlyArray<number> = [2,2,2]
// a = ro 不允许赋值，因为ro为只读
