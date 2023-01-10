import axios from 'axios';
import { useRouter } from 'next/router';
import { getSessions } from '../utils/auth';

export default function useFetch() {
  const router = useRouter();

  const fetch = async ({ url, params, data, type, withToken = true }) => {
    // eslint-disable-next-line no-undef
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}${url}`;

    const user = withToken && getSessions();
    const option = {
      headers: {
        Authorization: withToken && `Bearer ${user?.token}`
      },
      params
    };
    let res;

    try {
      switch (type) {
        case 'POST':
          res = await axios.post(endpoint, data, option);
          break;
        case 'UPDATE':
          res = await axios.put(endpoint, data, option);
          break;
        case 'DELETE':
          res = await axios.delete(endpoint, option);
          break;
        default:
          res = await axios.get(endpoint, option);
          break;
      }

      return { data: res.data, status: res.status };
    } catch (error) {
      const { data, status } = error.response;
      // Unauthorized || Invalid Token || Expired Token
      if (status === 401) router.reload();

      return { message: data?.message || 'Failed Fetch Data', data, status };
    }
  };

  return { fetch };
}
