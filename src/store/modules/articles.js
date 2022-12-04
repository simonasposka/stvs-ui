import repository from '@/api/repositories/home/articles';

export const state = {
    articles: null,
};

export const getters = {
    articles: state => state.articles
};

export const mutations = {
    SET_ARTICLES(state, articles) {
        state.articles = articles;
    }
};

export const actions = {
    async getPublicArticles({ commit }) {
        const { data } = await repository.getPublicArticles();
        commit('SET_ARTICLES', data.data);
    }
}