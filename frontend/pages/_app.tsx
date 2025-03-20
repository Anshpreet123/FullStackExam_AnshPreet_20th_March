// frontend/pages/_app.tsx
import { AppProps } from 'next/app';
import '../styles/globals.css'; 
import Navbar from '../components/Navbar';
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Navbar /> {/* Render the Navbar */}
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;