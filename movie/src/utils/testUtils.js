import axios from 'axios';

export const mockAxios = (data) => {
  axios.mockResolvedValue({ data });
};