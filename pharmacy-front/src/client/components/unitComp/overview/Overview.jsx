import React from 'react'
import './Overview.css'
import {Card,Button,Label,Image} from 'semantic-ui-react'
import SearchCom from '../search/Search'

export default class Overview extends React.Component{

    state={
        selectedDrugs:[]
    }



    selectResult=(e,{result})=>{}

    queryChange=(value)=>new Promise(resolve=>{
        const {drugs,title}=this.props;
        let re=new RegExp(`^${value}.*`,'i')
        
        if(!!drugs.length){
            let selectedDrugs=drugs.filter(catDrugs=>{
                if(!!re.exec(catDrugs[title]))return  catDrugs;
            })
            this.setState({selectedDrugs})
            resolve();
        }   
    },reject=>{})
 


    getView=(drugs)=>{
        const {onDrugClick,onAddCart,onAddOrder,onMore,title}=this.props;
        return(
          <React.Fragment>
              {
                !!drugs && drugs.length && drugs.map((CatDrugs,index)=>
                    <div className='category' key={index}>
                        <Label className="title">{CatDrugs[title]}</Label>              
                        <Card.Group>
                        {
                            CatDrugs["DRUGS"].map((drug,index1)=>
                                <Card key={index1}>
                                    <Card.Content extra onClick={()=>onDrugClick(drug['DRUG_ID'])}>
                                        <Label size='tiny' tag>৳&nbsp;{drug['PRICE']}</Label>
                                        <Image  size='small' src={drug['IMAGE_SRC']} />
                                        <Card.Header>{drug['DRUG_NAME']}</Card.Header>
                                    </Card.Content>
                                    <Card.Content extra>
                                     <Button.Group>         
                                            <Button size='tiny' color='teal' onClick={()=>onAddCart(drug["DRUG_ID"]) } icon='cart'/>
                                            <Button.Or/>
                                            <Button size='tiny' color='teal' onClick={()=>onAddOrder({name:drug['DRUG_NAME'],price: drug['PRICE'],drugID:drug["DRUG_ID"]}) }>add to order</Button>
                                      </Button.Group>
                                    </Card.Content>
                                </Card>
                        )}
                        </Card.Group>
                        <Button  size='mini' color='teal' onClick={()=>{if(title==='BRAND')onMore(CatDrugs['BRAND']);else onMore(CatDrugs['CATEGORY_ID']) }}>See more</Button>
                    </div>   
                    )
                
                }
          </React.Fragment>
        )
    }



    render(){
            const {drugs}=this.props;
            const {loading,query,selectedDrugs}=this.state;

            console.log(selectedDrugs);
            
            return (
            <div className="cat-overview">
                <SearchCom
                    queryChange={this.queryChange}
                    selectResult={this.selectResult}
                    
                    resultRenderer={({title})=><Label>{title} Results shown below..</Label>}
                    options={[{title:selectedDrugs.length.toString()}]}
                />
                {
                    !!selectedDrugs.length ? this.getView(selectedDrugs) :this.getView(drugs)
                }
            </div>

    )}

}