import axios from 'axios';

//const _username = 'heeyRnrF)LZ%y#6XS{SS'
//const _password = 'RK]j6=,4uV<G_zY$p6Ns'
export const API = axios.create({
  //52.220.32.14:10113
  baseURL: `http://198.19.226.41:10001/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  //auth: {
   // username: _username,
  //  password: _password
 // }
});