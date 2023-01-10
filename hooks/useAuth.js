import { setCookie, deleteCookie, getCookies } from 'cookies-next';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import useFetch from './useFetch';

export default function useAuth() {
  const { fetch } = useFetch();
  const router = useRouter();

  const login = async (form) => {
    const dataLogin = {
      email: form.email,
      password: form.password
    };

    const { data, status } = await fetch({
      type: 'POST',
      url: '/auth/login',
      data: dataLogin,
      withToken: false
    });
    if (status !== 200) return;

    toast.success('🦄 Successfully login!');
    setCookie('user', JSON.stringify(data), { maxAge: 7 * 24 * 60 * 60 });
    if (status === 200) router.push('/users');
  };

  const logout = async () => {
    const { status } = await fetch({
      type: 'POST',
      url: '/auth/logout'
    });
    if (status !== 200) return;

    toast.success('👋 Successfully logout!');
    clearCookies();
    if (status === 200) router.push('/');
  };

  const clearCookies = () => {
    for (const cookie in getCookies()) {
      deleteCookie(cookie);
    }
  };

  return { login, logout };
}
