import { normalizeStyle } from "vue";
import { createStore } from "vuex";
import axiosClient from '../../axios';

const tmpSurveys = [
    {
        id: 1,
        title: "Survey laravel",
        slug: "Survey-laravel",
        status: "draff",
        image: "https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg",
        description: "Nulla occaecat reprehenderit amet elit non deserunt esse voluptate est exercitation incididunt pariatur cupidatat et. Sint occaecat elit pariatur quis enim aliqua pariatur. Qui amet minim aliquip sit id qui officia irure velit occaecat dolor irure aliqua.",
        created_at: "2022-07-15 14:00:00",
        updated_at: "2022-07-15 14:00:00",
        expire_at: "2022-07-15 14:00:00",
        questions: [
            {
                id: 1,
                type: "select",
                question: "Non id labore proident cupidatat.",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "21d2585b-4176-4d8d-ad33-4fe6a169a42e",
                            text: "USA"
                        },
                        {
                            uuid: "cbceceb5-76a3-46fa-b38e-e6430d88d4e6",
                            text: "Georgia"
                        },
                    ]
                },
            },
            {
                id: 2,
                type: "checkbox",
                question: "Non id labore proident cupidatat.",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "622a69aa-9c7b-4e9f-81eb-955161b9e1a9",
                            text: "USA"
                        },
                        {
                            uuid: "0f482d74-ee9e-4a25-a998-688b708d0556",
                            text: "Georgia"
                        },
                    ]
                },
            },
        ],
    },
    {
        id: 2,
        title: "Survey vue",
        slug: "Survey-vue",
        status: "draff",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png",
        description: "Nulla occaecat reprehenderit amet elit non deserunt esse voluptate est exercitation incididunt pariatur cupidatat et. Sint occaecat elit pariatur quis enim aliqua pariatur. Qui amet minim aliquip sit id qui officia irure velit occaecat dolor irure aliqua.",
        created_at: "2022-07-15 14:00:00",
        updated_at: "2022-07-15 14:00:00",
        expire_at: "2022-07-15 14:00:00",
        questions: [
            {
                id: 1,
                type: "select",
                question: "Non id labore proident cupidatat.",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "fa5266eb-f5f2-4ae3-836a-1dc38a2b37bb",
                            text: "USA"
                        },
                        {
                            uuid: "5af2656b-12fb-472e-bfee-5a746232429a",
                            text: "Georgia"
                        },
                    ]
                },
            },
            {
                id: 2,
                type: "checkbox",
                question: "Non id labore proident cupidatat.",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "57e442f5-e175-4a5c-befa-37900757f5ea",
                            text: "USA"
                        },
                        {
                            uuid: "ec53d174-ab93-4e02-a031-d627626ca0f6",
                            text: "Georgia"
                        },
                    ]
                },
            },
        ],
    }
];

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN'),
        },
        surveys: [...tmpSurveys],
        questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
    },
    getters: {},
    actions: {
        saveSurvey({commit}, survey){
            delete survey.image_url;
            let response;
            if(survey.id){
                response = axiosClient.put(`/survey/${survey.id}`, survey)
                                        .then((res) => {
                                            commit("updateSurvey", res.data)
                                            return res;
                                        })
            }else{
                response = axiosClient.post(`/survey`, survey)
                                        .then((res) => {
                                            commit("saveSurvey", res.data)
                                            return res;
                                        })
            }

            return response;
        },
        register({ commit }, user){
            return axiosClient.post('/register', user)
                    .then(({data}) => {
                        commit('setUser', data);
                        return data;
                    });
            
        },
        login({ commit }, user){
            return axiosClient.post('/login', user)
                    .then(({data}) => {
                        commit('setUser', data);
                        return data;
                    });
        },
        logout({ commit }){
            return axiosClient.post('/logout')
                .then((res) => {
                    commit('logout');
                    return res;
                });
        }
    },
    mutations: {
        saveSurvey: (state, survey) => {
            state.surveys = [...state.surveys, ...survey.data];
        },
        updateSurvey: (state, survey) => {
            state.surveys = state.surveys.map((s) => {
                if(s.id == survey.data.id){
                    return survey.data;
                }
                return s;
            })
        },
        logout: (state) => {
            state.user.token = null;
            state.user.data = {};
            sessionStorage.removeItem('TOKEN');
        },
        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem('TOKEN', userData.token);
        }

    },
    modules: {},
});

export default store;
