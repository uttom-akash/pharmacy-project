
export default class TimeStamp{
    private static _instance:TimeStamp
    private date:Date 

    private constructor(){
          this.date=new Date()    
    }


    public static getInstance():TimeStamp{
        return this._instance || (this._instance = new this())
    }

    public timeStamp():string{
        return `${this.date.getFullYear()}-${this.date.getMonth() +
            1}-${this.date.getDate()} ${this.date.getHours()}:${this.date.getMinutes()}:${this.date.getSeconds()}`;        
    }

    public time():string{
        return `${this.date.getHours()}:${this.date.getMinutes()}:${this.date.getSeconds()}`
    }

    public dateMonthYear():string{
        return `${this.date.getFullYear()}-${this.date.getMonth() + 1}-${this.date.getDate()}`;
    }
}