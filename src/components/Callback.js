import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import authConfig from '../authConfig';
import './Callback.css'; // Import a CSS file for styling (create it if it doesn't exist)

const Callback = ({ auth, setAuth, userManager, userInfo, setUserInfo, handleLogout }) => {

  useEffect(() => {
    if (auth === null) {
      userManager.signinRedirectCallback().then((user) => {
        if (user) {
          setAuth(true);
          const access_token = user.access_token;
          // Make a request to the user info endpoint using the access token
          fetch(authConfig.userinfo_endpoint, {
            headers: {
              'Authorization': `Bearer ${access_token}`
            }
          })
            .then(response => response.json())
            .then(userInfo => {
              console.log('User Info Response:', userInfo); // Log the user info response
              setUserInfo(userInfo);
            })
            .catch(error => {
              console.error('Error fetching user info:', error); // Log any errors
              setAuth(false);
            });
        } else {
          setAuth(false);
        }
      }).catch((error) => {
        console.error('Error during signinRedirectCallback:', error); // Log any errors
        setAuth(false);
      });
    }
  }, [auth, userManager, setAuth, setUserInfo]);

  if (auth === true && userInfo) {
    // Extract role information
    const roles = userInfo['urn:zitadel:iam:org:project:roles'];

    const renderNavLinks = () => {
      if (!roles) return null;
      
      if (roles.hasOwnProperty('Dev')) {
        return (
          <>
          <li style={{ fontWeight: 'bold', color: 'black' }}>Blood<span style={{ color: 'red', fontWeight: 'bold' }}>X</span></li>
            <li><Link to="/callback/form">Form</Link></li>
            <li><Link to="/callback/table">Table</Link></li>
          </>
        );
      } else if (roles.hasOwnProperty('Hospital')) {
        return (
          <>
          <li style={{ fontWeight: 'bold', color: 'black' }}>Blood<span style={{ color: 'red', fontWeight: 'bold' }}>X</span></li>
          <li><Link to="/callback/form">Form</Link></li>
          </>
        
        );
      } else if (roles.hasOwnProperty('Blood Bank')) {
        return (
          <>
          <li style={{ fontWeight: 'bold', color: 'black' }}>Blood<span style={{ color: 'red', fontWeight: 'bold' }}>X</span></li>
        <li><Link to="/callback/table">Table</Link></li>
        </>
        );
      } else {
        return null;
      }
    };

    return (
      <div>
        <nav className="navbar">
        <div className="flex items-center">
      </div>
          <ul className="navbar-links">
            {renderNavLinks()}
          </ul>
          <div className="navbar-profile">
            <span>{userInfo.name}</span>
            <ul>
              {roles ? (
                Object.entries(roles).map(([role]) => (
                  <li key={role}>{role}</li>
                ))
              ) : (
                <li>No roles assigned</li>
              )}
            </ul>
          </div>
          <button onClick={handleLogout} className="navbar-logout">Log out</button>
        </nav>
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Callback;
