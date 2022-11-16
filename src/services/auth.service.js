import axios from "axios";

const API_URL = "http://food-court.tk/api/v1.0/";
// const API_URL = "https://192.168.0.200:7777/v1.0/";

const register = (username, email, password) => {
    return axios.post(API_URL + "auth/login", {
        username,
        email,
        password,
    });
};

const login = ({email, password}) => {
    return axios
        .post(API_URL + "auth/login", {
            email,
            password
        })
        .then((response) => {
            console.log(response.data)
            if (response.data.username) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
    return axios.post(API_URL + "signout").then((response) => {
        return response.data;
    });
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
}

export default AuthService;
