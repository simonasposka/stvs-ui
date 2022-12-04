import middleware from '@/router/middleware';

import DashboardWrapper from '@/views/dashboard/DashboardWrapper';
import ArticlesIndex from '@/views/dashboard/ArticlesIndex';
import ArticlesShow from '@/views/dashboard/ArticlesShow';
import ArticlesCreate from '@/views/dashboard/ArticlesCreate';
import ArticlesEdit from '@/views/dashboard/ArticlesEdit';

// Teams
import TeamsIndex from '@/views/dashboard/TeamsIndex';
import TeamsShow from '@/views/dashboard/TeamsShow';
import TeamsCreate from '@/views/dashboard/TeamsCreate';
import TeamsEdit from '@/views/dashboard/TeamsEdit';

import AddUserToTeam from '@/views/dashboard/AddUserToTeam';
import TeamUserShow from '@/views/dashboard/TeamUserShow';


export default [
    {
        path: '/dashboard',
        component: DashboardWrapper,
        children: [
            {
                path: '',
                name: 'dashboard',
                beforeEnter: middleware.user,
                component: ArticlesIndex
            },
            {
                path: 'articles/create',
                name: 'articles_create',
                beforeEnter: middleware.user,
                component: ArticlesCreate
            },
            {
                path: 'articles/:id',
                name: 'dashboard_articles_show',
                beforeEnter: middleware.user,
                component: ArticlesShow
            },
            {
                path: 'articles/:id/edit',
                name: 'dashboard_articles_edit',
                beforeEnter: middleware.user,
                component: ArticlesEdit
            },
            {
                path: 'teams',
                name: 'teams_index',
                beforeEnter: middleware.user,
                component: TeamsIndex
            },
            {
                path: 'teams/create',
                name: 'teams_create',
                beforeEnter: middleware.user,
                component: TeamsCreate
            },
            {
                path: 'teams/:id',
                name: 'teams_show',
                beforeEnter: middleware.user,
                component: TeamsShow
            },
            {
                path: 'teams/:id/edit',
                name: 'teams_edit',
                beforeEnter: middleware.user,
                component: TeamsEdit
            },
            {
                path: 'teams/:id/users/add',
                name: 'add_user_to_team',
                beforeEnter: middleware.admin,
                component: AddUserToTeam
            },
            {
                path: 'teams/:id/users/:userId/data',
                name: 'team_user_show',
                beforeEnter: middleware.user,
                component: TeamUserShow
            },
        ]
    },
];