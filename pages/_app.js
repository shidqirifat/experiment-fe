import { ToastContainer } from 'react-toastify';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
      <Component {...pageProps} />
    </>
  );
}
