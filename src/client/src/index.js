// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App';
// import ReactDOM from 'react-dom/client';



// const root = ReactDOM.createRoot(document.getElementById('root'));


// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

console.log("INDEX.JS LOADED");

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-vvaajzhqco4eadv3.us.auth0.com"
      clientId="jFWJerVb7s79dNJjvLym9KWuBqMmyF9b"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
