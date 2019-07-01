import sha256 from 'crypto-js/sha256'
import Crypto from '../Crypto'


export default class Hash implements Crypto{
    private static instance:Crypto

    private constructor(){} 
    
    public static getInstance():Crypto{
       return this.instance || (this.instance=new this())
    }

    execute(text:string) {
        return sha256(text).toString()
    }
}