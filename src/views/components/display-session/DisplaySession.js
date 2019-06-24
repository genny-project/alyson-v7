import React from 'react';
import ReactJson from 'react-json-view';
import { connect } from 'react-redux';

import store from '../../../redux/store';
import './index.css';

class DisplaySession extends React.Component {
  state = { 
    
    justReRender: false,
    minimized: false
   }; // eslint-disable-line

  handleClick = () => {
    this.setState({
      justReRender: true, // eslint-disable-line
    });
  };

  handleMinimize = () => {
    console.log( 'Handle minimize Triggered' );
    // this.setState({
    //   minimized: true
    // })

    this.setState(state => {minimized: !state.minimized})
  };

  render() {
    const token = JSON.stringify( store.getState().testReducer );
    const height = "100px";
  

    return (
      <div style={{ 
        padding: 10,
        background: '##eef4ff',
        overflow: 'scroll', 
        borderTop: "1px solid #e3e3e3"
      }}
        >
      
        <pre style={{ width: '900px' }}>
          <button onClick={this.handleClick}>
Re-render the page
          </button>
          <div style={{ height: 300, overflow: 'scroll', overflowY: 'auto ' }}>
            <h3>
From Redux store
            </h3>
            <ReactJson src={store.getState().keycloak} />
          </div>
          <h3> Session </h3>
          <ReactJson src={store.getState().testReducer} />
        </pre>


      </div>
    );
  }
}
export default connect(
  null,
  null
)( DisplaySession );
