import axios from 'axios';

const baseUrl = 'http://localhost';

export function sessionsCreate(email, password) {
  return axios
    .post(
      `${baseUrl}/api/sessions`,
      { email, password },
    );
}

export function usersCreate(name, surname, email, password, passwordConfirmation) {
  return axios
    .post(
      'http://localhost/api/users',
      { name, surname, email, password, passwordConfirmation },
    );
}

export function sessionsRead() {
  return axios
    .get(
      'http://localhost/api/sessions',
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
    );
}

export function sessionsDestroy() {
  localStorage.removeItem('token');
  return true;
}

