import api from '@/api/api';

export default {
    getArticles(token) {
        return api.get(`/api/articles`, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    },
    createArticle(article, token) {
        return api.post(`/api/articles`, 
            article,
            { headers: {'Authorization': `Bearer ${token}`}}
        );
    },
    updateArticle(article, token) {
        return api.patch(`/api/articles/${article.id}`, 
            article,
            { headers: {'Authorization': `Bearer ${token}`}}
        );
    },
    deleteArticle(articleId, token) {
        return api.delete(`/api/articles/${articleId}`, 
            { headers: {'Authorization': `Bearer ${token}`}}
        );
    }
}