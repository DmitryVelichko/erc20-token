import '../styles/globals.css';

// INTERNAL IMPORT

import { ERC20Provider } from '../context/CalamansiToken';
import NavBar from '../components/NavBar/NavBar'

const MyApp = ({ Component, pageProps }) => (
  <ERC20Provider>
    <Component {...pageProps} />
  </ERC20Provider>
);

export default MyApp;
