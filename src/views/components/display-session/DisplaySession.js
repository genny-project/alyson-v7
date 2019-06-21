import React from 'react';
import ReactJson from 'react-json-view';
import store from '../../../redux/store';
import './index.css';

export default function DisplaySession() {
  return (
    <div style={{ padding: 10, background: '#e3e3e3', overflow: 'scroll' }}>
      <pre style={{ width: '900px' }}>
        <h1>
          {' '}
From Local Storage
        </h1>
        <span>
kcSessionStateState:
        </span>
        <p style={{ color: 'green' }}>
          {JSON.stringify( localStorage.getItem( 'kcSessionState' ))}
        </p>

        <p>
kcAuth:
        </p>
        <p style={{ color: 'green' }}>
          {JSON.stringify( localStorage.getItem( 'kcAuth' ))}
        </p>

        <div style={{ height: 300, overflow: 'scroll', overflowY: 'auto ' }}>
          <h1>
            {' '}
From Redux store
          </h1>

          <p>
            <ReactJson src={store.getState().keycloak} />
          </p>
        </div>
      </pre>
    </div>
  );
}
