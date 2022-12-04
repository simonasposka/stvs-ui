import api from '@/api/api';

export default {
    get(userId, token) {
        return api.get(`/api/users/${userId}`, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    },
    getAll(token) {
        return api.get(`/api/users`, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    },
    delete(userId, token) {
        return api.delete(`/api/users/${userId}`, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    }
}