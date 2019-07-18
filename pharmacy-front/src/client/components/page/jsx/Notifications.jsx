import React, { Component } from 'react'
import {Menu, Header,Label} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {seenNotify} from '../../action/AuthActions'
import api from '../../api/Api'


class Notifications extends Component {
    state={
        activeItem:'Unseen',
        childActiveItem:'',
        activeNote:null,
        unseenNotes:[],
        seenNotes:[]
    }

    componentDidMount=()=>{
        const {userID}=this.props;
        if(!!userID)
        api.getUnseenNotification({userID}).then(notes=>!!notes.length && this.setState({unseenNotes:notes,childActiveItem:notes[0]['HEADER'],activeNote:notes[0]}))    
       
    }

    componentDidUpdate=(prevProps)=>{
        if(prevProps.userID!==this.props.userID){
            const {userID}=this.props;
            api.getUnseenNotification({userID}).then(notes=>!!notes.length && this.setState({unseenNotes:notes,childActiveItem:notes[0]['HEADER'],activeNote:notes[0]}))    
        }
    }

    
    handleItemClick=(name)=>{

            const {userID}=this.props
            if(name==='Unseen'){
                api.getUnseenNotification({userID}).then(notes=>!!notes.length ? this.setState({unseenNotes:notes,childActiveItem:notes[0]['HEADER'],activeNote:notes[0]}):this.setState({activeNote:null}))    
            }else{
                api.getSeenNotification({userID}).then(notes=>!!notes.length ? this.setState({seenNotes:notes,childActiveItem:notes[0]['HEADER'],activeNote:notes[0]}):this.setState({activeNote:null}))    
            }

            this.setState({activeItem:name})
    }

    childHandleItemClick=(notification,type)=>{
        
        const {userID}=this.props

        this.setState({childActiveItem:notification['HEADER'],activeNote:notification})
        if(type) this.props.seenNotify({userID,notificationID:notification['NOTIFICATION_ID']})
    }

    getView=(notifications,type)=>{
        const {childActiveItem,activeNote} =this.state
        return (
            <div style={{display:'flex'}}>
                   <Menu    vertical visible pointing secondary>
                                {notifications.map((note,index)=>
                                        <Menu.Item key={index} name={note['HEADER']} active={childActiveItem === note['HEADER']} onClick={(e,{name})=>this.childHandleItemClick(note,type)}>
                                            <Header as='h4'>{note['HEADER']}</Header>
                                            <p style={{color:'gray',fontSize:'10px'}}>{note['DATE_TIME']}</p>
                                        </Menu.Item> 
                                )}
                    </Menu>
                    {!!activeNote ? <div style={{padding:'2rem'}}>
                                                <Header as='h4'>{activeNote['HEADER']}</Header>
                                                <p>{activeNote['MESSAGE']}</p>
                                    </div>
                                    :
                                    
                                    <Header as='h3' style={{padding:'2rem'}}> No Message (-_-)</Header>
                    }
            </div>
                 
        )
    }

    render() {

        const {activeItem,unseenNotes,seenNotes} =this.state
        return (
            <div style={{padding:'3rem'}}>
                <Menu pointing >
                    <Menu.Item name='Unseen' active={activeItem === 'Unseen'} onClick={(e,{name})=>this.handleItemClick(name)}/>
                    <Menu.Item name='Seen'   active={activeItem === 'Seen'} onClick={(e,{name})=>this.handleItemClick(name)} />
                </Menu>
                {
                    activeItem==='Unseen' ? this.getView(unseenNotes,true):this.getView(seenNotes,false)
                }
            </div>
        )
    }
}


const mapStateToProps=state=>({
    userID:state.User.USER_ID,
    notifications:state.Notifications
})

export default connect(mapStateToProps,{seenNotify})(Notifications);