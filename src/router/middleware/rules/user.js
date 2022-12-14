import store from '../../../store';

export default (to, from, next) => {
    if (store.getters['auth/authenticated']) {
        next();
    } else {
        next({ name: 'login' });
    }
}