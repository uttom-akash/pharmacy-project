import RequestHandler from '../../RequestHandler'


export default class DrugsOverview extends RequestHandler{

    handle(req: any, res: any): void {
        let {limit}=req.body
        limit=parseInt(limit)

        let query=`select d.DRUG_NAME as name,sum(ds.REMAIN_QTY) as quantity from DrugStates ds inner join Drugs d using(DRUG_ID) group by DRUG_ID   order by quantity limit ?`

        this.pool.query(query,[limit]).then((qtyDrugs:any)=>{
            query=`select d.DRUG_NAME as name,datediff(s.EXP_DATE,now())+1 days,ds.REMAIN_QTY as qty from DrugStates ds inner join Supply s using(DRUG_ID,SUPPLY_ID) inner join Drugs d using(DRUG_ID) having qty>=0 and days>0 order by days  limit ?`
            this.pool.query(query,[limit]).then((expDrugs:any)=>res.json({quantity:qtyDrugs,expire:expDrugs}))
        })
    }

}