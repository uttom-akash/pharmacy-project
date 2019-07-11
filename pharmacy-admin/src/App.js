import React from 'react';
import './App.css';
import SideBar from './component/navbar/jsx/SideBar'
import Route from './component/navbar/jsx/Route'
import {BrowserRouter} from 'react-router-dom'
import {Icon} from 'semantic-ui-react'
    

class App extends React.Component {

  state={
    width:30
  }

  onCollapse=()=>this.setState({width: (this.state.width>30 ? 30: 200)})

  render() {
    const {width}=this.state
    return (
      <BrowserRouter>
      <div>
      <div className="title-bar"></div>  
      <div className="App">
          <SideBar onClick={this.onCollapse} width={width}/>
          <div id="main">
            <Route/>
          </div>   
     </div>
      </div>
     </BrowserRouter>
    );
  }
}

export default App;
