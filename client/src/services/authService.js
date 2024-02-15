import axios from 'axios';

const axiosOptions = {
    validateStatus: function (status) {
        return true
    }, 
    withCredentials: true
}

class authService {

    signin(loginData, callback) {
        //use axios to post the collected credentials to the API endpoint
        axios.post(`${import.meta.env.VITE_API_URL}/users/login`, loginData, axiosOptions)
            .then(response => {
                switch (response.status) {
                    case 200: {
                        //successful login
                        sessionStorage.setItem("loggedIn", loginData.email) // --> setting {key, value}
                        callback(true)
                        break;
                    }
                    case 404:
                    case 400: 
                    case 401: 
                    case 500: {
                        callback(false, response.data)
                        break;
                    }
                }
                //callback(true, response.status, response.data)
            })
    }

    register(data, callback) {

        // use axios to post the collected data to the API endpoint
        axios.post(`${ import.meta.env.VITE_API_URL }/users/register`, data, axiosOptions)
            .then(response => {
                switch (response.status) {
                    case 201: {
                        //successful login
                        sessionStorage.setItem("loggedIn", data.email) // --> setting {key, value}
                        callback(true)
                        break;
                    }
                    case 422:
                    case 500: {
                        callback(false, response.data)
                        break;
                    }
                }
                
            })
            .catch(error => {
                console.log(error);
            })
    }

    isSignedIn() {
        return sessionStorage.getItem("loggedIn")?.length > 0;
    }

    singedInEmail() {
        return sessionStorage.getItem("loggedIn");
    }

    logout(callback) {
        //use axios to post the collected credentials to the API endpoint
        axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, axiosOptions)
            .then(response => {
                switch (response.status) {
                    case 204: {
                        //successful logout
                        sessionStorage.removeItem("loggedIn")
                        callback(true)
                        break;
                    }
                }
            })
    }
}

export default new authService();