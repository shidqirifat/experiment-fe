import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import '../styles/globals.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
