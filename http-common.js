import axios from 'axios';

//const _username = 'heeyRnrF)LZ%y#6XS{SS'
//const _password = 'RK]j6=,4uV<G_zY$p6Ns'
export const API = axios.create({
  baseURL: `http://52.220.32.14:10113/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  //auth: {
   // username: _username,
  //  password: _password
 // }
});