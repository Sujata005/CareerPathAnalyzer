import axios from 'axios';

const BACKEND = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

export const skillGap = (role, skills) =>
  axios.post(`${BACKEND}/api/skill-gap`, { role, skills }).then(res => res.data);

export const roadmap = (role) =>
  axios.post(`${BACKEND}/api/roadmap`, { role }).then(res => res.data);

export const hackerNewsTop5 = () =>
  axios.get(`${BACKEND}/api/hackernews/top5`).then(res => res.data);
