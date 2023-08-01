import { FunctionComponent } from 'react';
import { useMsal } from "@azure/msal-react";

const LogoutButton: FunctionComponent = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect({
        postLogoutRedirectUri: "/", 
      });
  };

  return (
    <button onClick={handleLogout} style={{ fontSize: '20px', padding: '10px 20px', cursor: 'pointer', background: '#0078d4', color: 'white', border: 'none', borderRadius: '5px' }}>
        Log out
    </button>
  );
};

export default LogoutButton;
