import http from 'k6/http';
import { sleep } from 'k6';

// fixed test: 20 virtual users, 1-minute run
export const options = {
  vus: 20,
  duration: '1m',
};

export default function () {
  http.get('https://shop.smihula.com/en');
  sleep(1);
}
