interface ClockInterface {
  currentTime: Date
}

class Clock implements ClockInterface {

  currentTime: Date

  constructor(h: number, m: number){
    this.currentTime = new Date()
  }

  setTime(d: Date) {
    this.currentTime = d
  }
}
