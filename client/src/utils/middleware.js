import auth from '@/utils/auth';

const middleware = {
  auth(to, from, next) {
    return auth.check()
      .then((response) => {
        if (response.status === 'failure') {
          next({
            path: 'Login',
          });
        } else {
          next();
        }
      });
  },
};

export default middleware;
