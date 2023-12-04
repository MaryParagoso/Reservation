const overlayColor = 'rgba(0, 0, 0, 0.5)';
const overlayColor2 = 'rgba(0, 0, 0, 0.5)';
const backgroundImageUrl = 'https://raw.githubusercontent.com/kishan0725/AJAX-Movie-Recommendation-System-with-Sentiment-Analysis/master/static/image.jpg';

const contentStyle = {
  padding: '0',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  background: `linear-gradient(${overlayColor}, ${overlayColor}), url("${backgroundImageUrl}")`,
  boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.5)',
};

const centerContent = { 
  display: 'flex', 
  flexDirection: 'column', 
  justifyContent: 'center', 
  alignItems: 'center', 
  minHeight: '100vh', 
  fontSize: '15px',
}

const Context = { 
  fontSize: '20px',
  margin: '8px', 
}

const Context1 = { 
  fontSize: '75px' 
}

const Context2 = { 
  fontSize: '35px' 
}

const breadcrumbStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  width: '100%',
  padding: '20px',
  color: 'white',
  height: '90px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '25px',
  background: 'rgba(255, 0, 0, 0.5)',
  backdropFilter: 'blur(4px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
};

const breadcrumbContent = {
  margin: '16px 10px',
  color: 'white',
  fontSize: '50px',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
};

const siteLayoutContent = {
  background: `
    linear-gradient(to right, transparent, black 70%),
    linear-gradient(${overlayColor2}, ${overlayColor2}),
    url("${backgroundImageUrl}")
  `,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  background: `linear-gradient(${overlayColor}, ${overlayColor}))`,
  backgroundSize: 'cover',
  imageRendering: 'pixelated',
  padding: '15px',
};

const buttonLogin = {
  fontSize: '25px', 
  width: '250px', 
  height: '60px', 
  marginRight: '50px', 
  color: '#b20710', 
  borderColor: '#b20710', 
  background: 'rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(5px)',
}

const buttonSignup = {
  fontSize: '25px', 
  width: '250px', 
  height: '60px', 
  backgroundColor: '#b20710', 
  background: 'rgba(255, 0, 0, 0.4)',
  backdropFilter: 'blur(5px)',
}

const button1 = {
  fontSize: '25px', 
  width: '250px', 
  height: '60px', 
  marginRight: '50px', 
  color: '#b20710', 
  borderColor: '#b20710', 
  background: 'rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(5px)',
}

const button2 = {
  fontSize: '25px', 
  width: '250px', 
  height: '60px', 
  backgroundColor: '#b20710', 
  background: 'rgba(255, 0, 0, 0.4)',
  backdropFilter: 'blur(5px)',
}

const reservationButton = {
  fontSize: '23px',
  width: '300px',
  height: '45px',
  color: 'white',
  backgroundColor: '#b20710',
  background: 'rgba(255, 0, 0, 0.5)',
  backdropFilter: 'blur(8px)',
  borderRadius: '10px',
};

const highlight = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '10px',
  boxShadow: '0 4px 8px rgba(255, 255, 255, 0.1)',
  padding: '20px',
  borderRadius: '10px',
  backgroundColor: 'rgba(200, 200, 200, 0.5)',
  border: '1px solid red',
}

const seatRow = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const seatButton = {
  fontSize: '18px', 
  width: '100px', 
  height: '38px', 
  margin: '10px', 
  color: 'white', 
  borderColor: '#b20710', 
  background: '#393a3a',
  backdropFilter: 'blur(5px)',
}

const selectedButton = {
  fontSize: '18px', 
  width: '100px', 
  height: '38px', 
  margin: '10px', 
  color: 'white', 
  borderColor: '#b20710', 
  background: '#b20710',
  backdropFilter: 'blur(5px)',
}

const unselectedButton = {
  fontSize: '18px', 
  width: '100px', 
  height: '38px', 
  margin: '10px', 
  color: 'white', 
  borderColor: '#b20710', 
  background: 'black',
  backdropFilter: 'blur(5px)',
}

const center = {
  textAlign: "center",
}

const proceedButton = {
  fontSize: '20px',
  width: '250px',
  height: '45px',
  color: 'white',
  backgroundColor: '#b20710',
  background: 'rgba(255, 0, 0, 0.5)',
  backdropFilter: 'blur(8px)',
  borderRadius: '10px',
  marginTop: '10px',
}

const legend = {
  width:'200px',
  paddingTop: '20px',
}

const selectedSeats = {
  width:'200px',
  paddingTop: '20px',
}

export { highlight, overlayColor, overlayColor2, contentStyle, 
  centerContent, Context, Context1, Context2, proceedButton,
  breadcrumbStyle, breadcrumbContent, siteLayoutContent, 
  footerStyle, buttonLogin, buttonSignup, center, legend,
  button1, button2, reservationButton, seatRow, seatButton,
  unselectedButton, selectedButton, selectedSeats };