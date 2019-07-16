import React, { Component } from 'react'
import {Menu, Header, Segment, Sidebar,Label} from 'semantic-ui-react'
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

    componentDidUpdate=(prevProps)=>{
        if(prevProps.userID!==this.props.userID){
            const {userID}=this.props;
            api.getUnseenNotification({userID}).then(notes=>!!notes.length && this.setState({unseenNotes:notes,childActiveItem:notes[0]['HEADER'],activeNote:notes[0]}))    
        }
    }

    
    handleItemClick=(name)=>{

            const {userID}=this.props
            if(name==='Unseen'){
                api.getUnseenNotification({userID}).then(notes=>!!notes.length && this.setState({unseenNotes:notes,childActiveItem:notes[0]['HEADER'],activeNote:notes[0]}))    
            }else{
                api.getSeenNotification({userID}).then(notes=>!!notes.length && this.setState({seenNotes:notes,childActiveItem:notes[0]['HEADER'],activeNote:notes[0]}))    
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
            <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu}   inverted vertical visible >
                                {notifications.map((note,index)=>
                                        <Menu.Item key={index} name={note['HEADER']} active={childActiveItem === note['HEADER']} onClick={(e,{name})=>this.childHandleItemClick(note,type)}>
                                            <Header as='h4'style={{color:'whitesmoke'}}>{note['HEADER']}</Header>
                                            <p style={{color:'gray',fontSize:'10px'}}>{note['DATE_TIME']}</p>
                                        </Menu.Item> 
                                )}
                    </Sidebar>

                    <Sidebar.Pusher>
                        <Segment basic style={{height:'80vh'}}>
                            {!!activeNote ? <React.Fragment>
                                                        <Header as='h4'>{activeNote['HEADER']}</Header>
                                                        <p>{activeNote['MESSAGE']}</p>
                                                </React.Fragment>
                                           :
                                           
                                           <Header as='h3'> No Message (-_-)</Header>
                            }
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
        )
    }

    render() {

        const {activeItem,unseenNotes,seenNotes} =this.state
        return (
            <div style={{padding:'3rem'}}>
                <Menu pointing inverted>
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