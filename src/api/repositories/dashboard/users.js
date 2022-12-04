import api from '@/api/api';

export default {
    getAll(token) {
        return api.get(`/api/users`, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    },
}