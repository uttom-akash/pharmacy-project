export default class RandomGenerator{
    private static _instance:RandomGenerator
    
    private constructor(){}


    public static getInstance():RandomGenerator{
        return this._instance || (this._instance = new this())
    }


    public getNumber():string{
        let mx=1000000
        let mn=1000
        let randomNumber:number=Math.floor(Math.random()*(mx-mn))+mn
        return randomNumber.toString()
    } 
}