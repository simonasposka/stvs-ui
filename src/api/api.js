import axios from "axios";

let instance = axios.create({
    withCredentials: true,
});

instance.interceptors.request.use(request => {
    request.headers.common['Accept']       = 'application/json';
    request.headers.common['Content-Type'] = 'application/json';
    return request;
});

instance.interceptors.response.use(
    response => { return response; },
    async error => {
        if (error.response.status === 401) {
            // try to refresh token
            // if (!refreshed) {
                const expiredToken = JSON.parse(localStorage.getItem('access_token'));

                const { data } = await axios.post('/api/auth/refresh', {}, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${expiredToken}`
                    }
                })
                
                const user = data.data.user;
                const access_token = data.data.access_token;

                localStorage.user = JSON.stringify(user);
                localStorage.access_token = JSON.stringify(access_token);

                // localStorage.removeItem('user');
                // localStorage.removeItem('access_token');
                window.location.reload();
            //}
        }

        if (error.response && error.response.data) {
            return Promise.reject(error.response.data);
        }
        
        return Promise.reject(error.message);
        // return Promise.reject(error);
    }
);


export default instance;
