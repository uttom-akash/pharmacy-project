import RequestHandler from '../../RequestHandler'


export default class DrugOverview extends RequestHandler{

    handle(req: any, res: any): void {
        const {limit}=req.body
        let query=`select d.DRUG_NAME as title,sum(ds.REMAIN_QTY) as quantity from DrugStates ds inner join Drugs (DRUG_ID) group by DRUG_ID   order by quantity limit ?`

        this.pool.query(query,[limit]).then((qtyDrugs:any)=>{
            query=`select d.DRUG_NAME as title,datediff(s.EXP_DATE,now())+1 days,ds.REMAIN_QTY as qty from DrugStates ds inner join Supply s using(DRUG_ID,SUPPLY_ID) inner join Drugs d using(DRUG_ID) having qty>=0 and days>0 order by days  limit ?`
            this.pool.query(query,[limit]).then((expDrugs:any)=>res.json({quantity:qtyDrugs,expire:expDrugs}))
        })
    }

}