import repository from '@/api/repositories/dashboard/articles';
import teamsRepository from '@/api/repositories/dashboard/teams';
import usersRepository from '@/api/repositories/dashboard/users';

export const state = {
    articles: null,
    myTeams: null,
    users: null,
    adminUsers: null,
    adminArticles: null,
};

export const getters = {
    articles: state => state.articles,
    myTeams: state => state.myTeams,
    users: state => state.users,
    adminUsers: state => state.adminUsers,
    adminArticles: state => state.adminArticles,
};

export const mutations = {
    SET_ARTICLES(state, articles) {
        state.articles = articles;
    },
    SET_MY_TEAMS(state, myTeams) {
        state.myTeams = myTeams;
    },
    SET_USERS(state, users) {
        state.users = users;
    },

    // Admin only
    SET_USERS_FOR_ADMIN(state, users) {
        state.adminUsers = users;
    },
    SET_ARTICLES_FOR_ADMIN(state, articles) {
        state.adminArticles = articles;
    }
};

export const actions = {
    // Articles
    async getArticles({ commit }, token) {
        const { data } = await repository.getArticles(token);
        commit('SET_ARTICLES', data.data);
    },
    async createArticle(_, { article, token }) {
        await repository.createArticle(article, token);
    },
    async updateArticle(_, { article, token }) {
        await repository.updateArticle(article, token);
    },
    async deleteArticle(_, {id, token}) {
        await repository.deleteArticle(id, token);
    },

    // Teams
    async getMyTeams({ commit }, token) {
        const { data } = await teamsRepository.getMyTeams(token);
        commit('SET_MY_TEAMS', data.data);
    },
    async createTeam(_, { team, token }) {
        await teamsRepository.createTeam(team, token);
    },
    async updateTeam(_, { team, token }) {
        await teamsRepository.updateTeam(team, token);
    },
    async deleteTeam(_, { id, token }) {
        await teamsRepository.deleteTeam(id, token);
    },
    async getTeamUsers(_, { id, token }) {
        const { data } = await teamsRepository.getTeamUsers(id, token);
        return data.data;
    },
    async getTeamArticles(_, { id, token }) {
        const { data } = await teamsRepository.getTeamArticles(id, token);
        return data.data;
    },

    async getUserDataPerTeam(_, { teamId, userId, token }) {
        const { data } = await teamsRepository.getUserDataPerTeam(teamId, userId, token);
        return data.data;
    },

    // Users
    async addUserToTeam(_, { teamId, userId, token }) {
        await teamsRepository.addUserToTeam(teamId, userId, token);
    },
    async removeUserFromTeam(_, { userId, teamId, token }) {
        await teamsRepository.removeUserFromTeam(userId, teamId, token);
    },
    async getUsers({ commit }, token) {
        const { data } = await usersRepository.getAll(token);
        commit('SET_USERS', data.data);
    },

    // Admin
    async getAllUsers({ commit }, token) {
        const { data } = await usersRepository.getAll(token);
        commit('SET_USERS_FOR_ADMIN', data.data);
    },

    async getUser(_, { userId, token }) {
        const { data } = await usersRepository.get(userId, token);
        return data.data;
    },

    async deleteUser(_, { userId, token }) {
        await usersRepository.delete(userId, token);
    }
}