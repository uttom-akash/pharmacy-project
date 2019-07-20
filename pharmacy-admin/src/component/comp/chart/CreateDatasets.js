
const getDate=(date)=>new Date(date).getDate()

const mod=(date,days)=>date%days ? date%days: 1;

const  createDataset=(list,start,days,cb,param,param1,param2)=>{

			let sales=[],label=[]
            
            let listIterator=0;

			for(let i=0;i<days;i++){

				if(listIterator<list.length  &&  getDate(list[listIterator]['date'])===mod(start+i,31)){
					sales[i]=list[listIterator][param]
					label[i]=i;
					listIterator++
				}else{
					sales[i]=0;
					label[i]=i
				}
            }     
       cb({[param1]:sales,[param2]:label})     
}


export default createDataset;