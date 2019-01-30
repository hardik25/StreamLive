import axios from 'axios';

export default axios.create({
    baseURL: 'https://json-server-streamlive.herokuapp.com'
});
