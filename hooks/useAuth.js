import { setCookie, deleteCookie, getCookies } from 'cookies-next';
import useFetch from './useFetch';

export default function useAuth() {
  const { fetch } = useFetch();

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

    setCookie('user', JSON.stringify(data), { maxAge: 7 * 24 * 60 * 60 });

    if (status === 200) window.location.reload();
  };

  const logout = async () => {
    const { status } = await fetch({
      type: 'POST',
      url: '/auth/logout'
    });

    clearCookies();
    if (status === 200) window.location.reload();
  };

  const clearCookies = () => {
    for (const cookie in getCookies()) {
      deleteCookie(cookie);
    }
  };

  return { login, logout };
}
