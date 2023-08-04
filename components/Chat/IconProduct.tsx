
export const IconProduct = ({ size = 24, color = 'red', ...otherProps }) => {
  return (
   <GlobantIcon size={size}/>

  );
};

const GlobantIcon = ( { size = 24 }) => {
  const imageUrl = "https://driftt.imgix.net/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fbot-avatars-prod%2F129%2F7625d7908f30f1fb4a7eff1835b17669ubiwte9k58y9?fit=max&fm=png&h=200&w=200&s=d420b4b747b73851b87899abaeba475f";

  return (
    <img src={imageUrl} alt="Globant" width={size} height={size}/>
  );
}