
export const IconProduct = ({ size = 24, color = 'red', ...otherProps }) => {
  return (
   <GlobantIcon size={size}/>
  );
};

const GlobantIcon = ( { size = 24 }) => {
  const imageUrl = "https://companieslogo.com/img/orig/SAP.TO-3e936ff5.png?t=1660189903";

  return (
    <img src={imageUrl} alt="Globant" width={size} height={size}/>
  );
}