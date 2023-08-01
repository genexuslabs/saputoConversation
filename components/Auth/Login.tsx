import { useMsal } from '@azure/msal-react';
import { t } from 'i18next';
import { FunctionComponent } from 'react';
import { getProduct } from '@/utils/app/product';
import { BrowserAuthError } from '@azure/msal-browser';

interface LoginComponentProps {
  onLogin: () => void;
}

const IconSaia = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 186 201" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M128.655 152.647C155.75 147.407 176.278 123.511 176.278 94.9006C176.278 62.4635 149.902 36.0776 117.465 36.0776H68.5354C36.1076 36.0776 9.72168 62.4728 9.72168 94.9006C9.72168 123.501 30.2472 147.402 57.3405 152.645L65.6671 136.453C58.5526 135.942 51.9256 133.639 46.2369 129.993C34.6481 122.604 26.9472 109.635 26.9472 94.9006C26.9472 77.1031 38.1822 61.8824 53.933 55.9577C58.5213 54.1503 63.4934 53.1464 68.6835 53.1464H117.325C136.127 53.1464 152.063 65.6519 157.253 82.782C158.423 86.6177 159.053 90.6869 159.053 94.9006C159.053 96.6214 158.948 98.3181 158.744 99.9846C156.412 120.353 140.29 135.03 120.332 136.462L128.655 152.647ZM87.0772 136.489L78.9482 151.404L81.2582 153.714H104.741L107.051 151.404L98.9222 136.489H87.0772Z" fill="#985AE5"/>
    <path d="M97.4464 118.474H117.66C130.904 118.474 141.689 107.699 141.689 94.446C141.689 81.1927 130.914 70.4175 117.66 70.4175H69.0187C55.7748 70.4175 44.9902 81.1927 44.9902 94.446C44.9902 107.699 55.7655 118.474 69.0187 118.474H97.4464ZM79.3021 150.949L93.3535 165L107.405 150.949L93.3535 125.166L79.3021 150.949Z" fill="#EEBEFF"/>
  </svg>
);


interface LoginComponentProps {
  onLogin: () => void;
}


const LoginComponent: FunctionComponent<LoginComponentProps> = ({ onLogin }) => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup().then((response) => {
      onLogin();
    }).catch((error) => {
      if (error instanceof BrowserAuthError && error.errorCode === 'user_cancelled') {
        
      } else {
        console.log(error);
      }
    }

    );
  };

  const containerStyle : React.CSSProperties  = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const textStyle : React.CSSProperties  = {
    color: 'white',
    marginBottom: '4rem',
    textAlign: 'center',
  };

  const buttonStyle : React.CSSProperties  = {
    fontSize: '20px',
    padding: '10px 20px',
    cursor: 'pointer',
    background: '#0078d4',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
  };

  const textButtonStyle : React.CSSProperties  = {
    color: 'white',
    textAlign: 'center',
    padding: '5px',
  };

  const iconWrapperStyle:React.CSSProperties  = {
    display: 'inline-block',
    width: '20px',
    height: '20px',
    position: 'relative',
    backgroundSize: 'contain',
    backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='21' height='21'%3E%3Cpath fill='%23f25022' d='M1 1h9v9H1z'/%3E%3Cpath fill='%2300a4ef' d='M1 11h9v9H1z'/%3E%3Cpath fill='%237fba00' d='M11 1h9v9h-9z'/%3E%3Cpath fill='%23ffb900' d='M11 11h9v9h-9z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50%',
  };

  return (
    <div style={containerStyle}>
      <IconSaia size={100} />
      <div style={textStyle}>{getProduct().welcomeMessage}</div>
      <button style={buttonStyle} title={t('login') || ''} onClick={handleLogin}>
        <div style={iconWrapperStyle} data-provider="windowslive" />
        <div style={textButtonStyle}>Login with Microsoft Account</div>
      </button>
    </div>
  );
};

export default LoginComponent;
