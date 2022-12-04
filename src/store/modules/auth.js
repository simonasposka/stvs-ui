import repository from '@/api/repositories/auth';

export const state = {
    user: localStorage.user ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.user ? JSON.parse(localStorage.getItem('access_token')) : null
};

export const getters = {
    user: state => state.user,
    token: state => state.token,
    authenticated: state => state.user !== null,
};

export const mutations = {
    SET_USER(state, user) {
        state.user = user;
    },
    SET_TOKEN(state, token) {
        state.token = token;
    }
};

export const actions = {
    async login({commit}, payload) {
        const { data } = await repository.login(payload);

        const user = data.data.user;
        const access_token = data.data.access_token;

        commit('SET_USER', user);
        commit('SET_TOKEN', access_token);

        localStorage.user = JSON.stringify(user);
        localStorage.access_token = JSON.stringify(access_token);
        console.log(data.data);
    },
    async logout({ commit }) {
        commit('SET_USER', null);
        commit('SET_TOKEN', null);

        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
    },
    async register(_, payload) {
        await repository.register(payload);
    }
}