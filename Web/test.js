import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 50, // 50 user cùng lúc
    duration: '30s'
};

export default function () {

    const payload = JSON.stringify({
        username: 'test',
        password: '123'
    });

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const res = http.post(
        'https://truongstar.onrender.com/api/l/dangnhap',
        payload,
        params
    );

    check(res, {
        'status is 200': (r) => r.status === 200
    });

    sleep(1);
}