import { FunctionComponent } from 'react';
import { useMsal } from "@azure/msal-react";

const UserInfo: FunctionComponent = () => {
  const { accounts } = useMsal();
  const account = accounts[0] || null;

  return (
    <div>
      {account && (
        <div>
          <p>{account.username}</p>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
