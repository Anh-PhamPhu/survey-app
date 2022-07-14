import { normalizeStyle } from "vue";
import { createStore } from "vuex";
import axiosClient from '../../axios';

const tmpSurveys = [{
    id: 100,
    title: "Hello Survey",
    slug: "Hello-Survey",
    status: "draft",
    image:
        "/src/assets/logo.png",
    description:
        "HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello HelloHello",
    created_at: "2022-07-01 11:00:00",
    updated_at: "2022-07-01 11:00:00",
    expire_at: "2022-07-01 11:00:00",
    questions: [
        {
            id: 1,
            type: "select",
            question: "This is question is test",
            description: null,
            data: {
                options: [
                    {
                        uuid: "random",
                        text: "USA"
                    },
                    {
                        uuid: "random1",
                        text: "Georgia"
                    },
                    {
                        uuid: "random2",
                        text: "Germany"
                    }
                ]
            },
        },
    ],
},
{
    id: 101,
    title: "Hello Survey1",
    slug: "Hello-Survey",
    status: "draft",
    image:
        "/src/assets/logo.png",
    description:
        "Hello",
    created_at: "2022-07-01 11:00:00",
    updated_at: "2022-07-01 11:00:00",
    expire_at: "2022-07-01 11:00:00",
    questions: [
        {
            id: 1,
            type: "select",
            question: "This is question is test",
            description: null,
            data: {
                options: [
                    {
                        uuid: "random",
                        text: "USA"
                    },
                    {
                        uuid: "random1",
                        text: "Georgia"
                    },
                    {
                        uuid: "random2",
                        text: "Germany"
                    }
                ]
            },
        },
    ],
},
{
    id: 102,
    title: "Hello Survey2",
    slug: "Hello-Survey",
    status: "draft",
    image:
        "/src/assets/logo.png",
    description:
        "Hello",
    created_at: "2022-07-01 11:00:00",
    updated_at: "2022-07-01 11:00:00",
    expire_at: "2022-07-01 11:00:00",
    questions: [
        {
            id: 1,
            type: "select",
            question: "This is question is test",
            description: null,
            data: {
                options: [
                    {
                        uuid: "random",
                        text: "USA"
                    },
                    {
                        uuid: "random1",
                        text: "Georgia"
                    },
                    {
                        uuid: "random2",
                        text: "Germany"
                    }
                ]
            },
        },
    ],
}
]
const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN'),
        },
        surveys: [...tmpSurveys],
    },
    getters: {},
    actions: {
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
