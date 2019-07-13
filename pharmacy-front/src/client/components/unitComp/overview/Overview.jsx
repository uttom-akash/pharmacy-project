import React from 'react'
import './Overview.css'
import {Card,Button,Label,Image} from 'semantic-ui-react'

export default ({drugs,onDrugClick,onAddCart,onMore,title})=>{
    return (
    <div className="cat-overview">
    {
        !!drugs && drugs.length && drugs.map(drug=>
            <div className='category'>
                <Label className="title">{drug[title]}</Label>              
                <Card.Group>
                {
                    drug["DRUGS"].map(drug=>
                        <Card >
                            <Card.Content extra onClick={()=>onDrugClick(drug['DRUG_ID'])}>
                                <Label size='tiny' tag>৳&nbsp;{drug['PRICE']}</Label>
                                <Image  size='small' src={drug['IMAGE_SRC']} />
                                <Card.Header>{drug['DRUG_NAME']}</Card.Header>
                            </Card.Content>
                            <Card.Content extra>
                            <Button size='tiny' color='teal' onClick={()=>onAddCart(drug["DRUG_ID"]) } icon='cart'/>
                            </Card.Content>
                        </Card>
                )}
                </Card.Group>
                <Button  size='mini' color='teal' onClick={()=>{if(title==='BRAND')onMore(drug['BRAND']);else onMore(drug['CATEGORY_ID']) }}>See more</Button>
            </div>   
        )
          
    }   
    </div>

)}