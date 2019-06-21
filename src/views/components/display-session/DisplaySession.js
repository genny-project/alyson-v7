import React from 'react';

export default function DisplaySession() {
  return (
    <div style={{ padding: 10, background: '#e3e3e3' }}>
      <pre>
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
      </pre>
    </div>
  );
}
