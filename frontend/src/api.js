export const BASE_URL = "http://localhost:8000/api";

export function fetchLiveData() {
    return fetch(`${BASE_URL}/live`).then((res) => res.json());
}

export function fetchLast24HoursData(offset = 0, limit = 100) {
    return fetch(`${BASE_URL}/history?offset=${offset}&limit=${limit}`).then((res) => res.json());
}
