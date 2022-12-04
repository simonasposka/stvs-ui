import store from '../../../store';

export default (to, from, next) => {
    if (store.getters['auth/authenticated']) {
        next({ name: 'dashboard' });
    } else {
        next();
    }
}