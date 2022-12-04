import api from '@/api/api';

export default {
    getMyTeams(token) {
        return api.get(`/api/teams`, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    },

    createTeam(team, token) {
        return api.post(`/api/teams`, team, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    },

    updateTeam(team, token) {
        return api.patch(`/api/teams/${team.id}`, team, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    },

    deleteTeam(id, token) {
        return api.delete(`/api/teams/${id}`, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    },
    

    getTeamUsers(id, token) {
        return api.get(`/api/teams/${id}/users`, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    },

    getTeamArticles(id, token) {
        return api.get(`/api/teams/${id}/articles`, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    },

    getUserDataPerTeam(teamId, userId, token) {
        return api.get(`/api/teams/${teamId}/users/${userId}/articles`, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    },

    addUserToTeam(teamId, userId, token) {
        return api.put(
            `/api/teams/${teamId}/users`,
            {user_id: userId}, 
            {headers: {'Authorization': `Bearer ${token}`}}
        );
    },

    removeUserFromTeam(userId, teamId, token) {
        return api.delete(`/api/teams/${teamId}/users/${userId}`, {
            headers: {'Authorization': `Bearer ${token}`}
        });
    },
}