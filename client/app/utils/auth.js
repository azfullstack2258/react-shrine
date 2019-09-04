import Cookies from 'js-cookie';

const Auth = {
  setUser: (name, token, email) => {
    Cookies.set('user', {
      name,
      email,
      token,
    });
  },
  getUser: () => {
    return Cookies.get('user');
  },
  getToken: () => {
    const user = Cookies.get('user');
    return user && JSON.parse(user).token;
  },
  logout: () => {
    Cookies.remove('user');
  },
};

export default Auth;
