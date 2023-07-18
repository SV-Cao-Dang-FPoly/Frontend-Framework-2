import instance from './instance';

export const signin = (user: any) => {
  return instance.post(`/signin`, user);
};
export const Signup = async (user) => {
  try {
    const response = await instance.post('/signup', user);
  } catch (error) {
    console.error('Error:', error);
  }
};
