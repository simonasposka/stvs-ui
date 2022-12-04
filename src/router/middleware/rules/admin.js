import store from '../../../store';

export default (to, from, next) => {
    if (store.getters['auth/authenticated'] && store.getters['auth/user']['is_admin'] == true) {
        next();
    } else {
        next({ name: 'login' });
    }
}