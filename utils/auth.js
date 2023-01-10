import { getCookie } from 'cookies-next';

export const getSessions = () => {
  const user = getCookie('user');
  return user ? JSON.parse(user) : {};
};
