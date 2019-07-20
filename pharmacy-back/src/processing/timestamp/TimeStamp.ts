
export default class TimeStamp{
    private date:Date 

    private constructor(){
          this.date=new Date()    
    }
    


    public static getInstance():TimeStamp{
        return new this()
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

    public setDate(date:any){
        this.date=new Date(date)
    }
    public setDays(days:number,date:any){
        let setter=new Date(date)
        let time=setter.getTime()+1000*60*60*24*days;
        this.date.setTime(time)
    }

    public getDate(){
        console.log(this.dateMonthYear());
        
    }
}