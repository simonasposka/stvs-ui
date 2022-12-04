import api from '@/api/api';

export default {
    getPublicArticles() {
        return api.get(`/api/public/articles`);
    },
}