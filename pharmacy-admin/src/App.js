import React from 'react';
import SideBar from './component/navbar/jsx/Sidebar'
import {BrowserRouter} from 'react-router-dom'
    

class App extends React.Component {

  state={
    width:30
  }

  onCollapse=()=>this.setState({width: (this.state.width>30 ? 30: 200)})

  render() {
    const {width}=this.state
    return (
      <BrowserRouter>
        <SideBar/>
      </BrowserRouter>
    );
  }
}

export default App;
