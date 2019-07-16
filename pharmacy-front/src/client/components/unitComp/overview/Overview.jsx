import React from 'react'
import './Overview.css'
import {Card,Button,Label,Image, Message,Icon} from 'semantic-ui-react'
import SearchCom from '../search/Search'
import {connect} from 'react-redux'
import LoadingMessage from '../../unitComp/alert/LoadingMessage'
import ConfirmUi from '../../unitComp/confirmUI/ConfirmUI'
import {checkoutToggleAction,loginToggleAction} from '../../action/UniverseAction'

class Overview extends React.Component{

    state={
        selectedDrugs:[],
        
        confirm:false,
        loading:false,
        notUser:false
        
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
 

    onAddOrder=(drug)=>{
        const {userID,onAddOrder}=this.props

        if(!!userID){
                onAddOrder(drug);
        }else{
            this.setState({notUser:true})
        }
    }

    onAddCart=(drug)=>{
        const {onAddCart,userID}=this.props
        if(!!userID){
            this.setState({loading:true})
            onAddCart(drug).then(res=>this.alertMessage('Add successfully ..')).catch(err=>this.alertMessage('This drugs already in cart..'))
        }else{
            this.setState({notUser:true})
        }
    }
    
    alertMessage=(message)=>{
        this.setState({loading:false,confirm:true,message})
    }

    

    onCheckout=()=>{
        this.setState({confirm:false})
        this.props.checkoutToggleAction()
    }

    onContinue=()=>this.setState({confirm:false})

    onLogin=()=>{
        this.setState({notUser:false})
        this.props.loginToggleAction()
    }

    getView=(drugs)=>{
        const {onDrugClick,onMore,title}=this.props;
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
                                            <Button size='tiny' color='teal' onClick={()=>this.onAddCart(drug)} icon='cart'/>
                                            <Button.Or/>
                                            <Button size='tiny' color='teal' onClick={()=>this.onAddOrder({name:drug['DRUG_NAME'],price: drug['PRICE'],drugID:drug["DRUG_ID"]}) }>add to order</Button>
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
            const {selectedDrugs,loading,message,confirm,notUser}=this.state
            
            return (
            <div className="cat-overview">
                <SearchCom
                    queryChange={this.queryChange}
                    selectResult={this.selectResult}
                    
                    resultRenderer={({title})=><Label>{title} Results shown below..</Label>}
                    options={[{title:selectedDrugs.length.toString()}]}
                />
                <LoadingMessage visiblity={!loading} text={'Adding ...'}/>
                <ConfirmUi open={confirm} text={message} click1={this.onCheckout} click2={this.onContinue} btn1={'checkout'} btn2={'continue'}/>
                <ConfirmUi open={notUser} text={"You are not loggedin ..."} click1={this.onLogin} click2={()=>this.setState({notUser:false})} btn1={'login'} btn2={'Cancel'}/>
                {
                    !!selectedDrugs.length ? this.getView(selectedDrugs) :this.getView(drugs)
                }
            </div>

    )}

}

const mapStateToProps=state=>({
    cart:state.Cart,
    userID:state.User.USER_ID
})

export default  connect(mapStateToProps,{checkoutToggleAction,loginToggleAction})(Overview);