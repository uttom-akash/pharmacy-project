import React from 'react'
import {Accordion,Icon,List} from 'semantic-ui-react';
import ListItem from '../listItem/ListItem'
import NavLink from '../nav/NavLink'

export default function CollapseList({list,handleClick,activeIndex}) {
    return (
        <Accordion fluid >
            <Accordion.Title  onClick={handleClick} active={activeIndex===0} index={0} >
                <List selection verticalAlign='middle'>
                   <ListItem icon={'tasks'} text={'Tasks'}><Icon name={activeIndex===0 ? "angle down":"angle right"} /></ListItem>
                </List>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
                <List selection verticalAlign='middle' style={{marginLeft:'25px'}}>
                {list.map(item=><ListItem icon="plus" ><NavLink classname="Link" Cname={item.name} Cpath={item.path}/></ListItem>)}
                </List>
          </Accordion.Content>
        </Accordion>
   
    )
}
