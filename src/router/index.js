import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

// Import the function that is used by the views as an interface to the API
import getDataFromApi from "../js/getDataFromApi.js";

Vue.use(VueRouter);

const routes = [
    // The landing page
    {
        path: "/",
        name: "Launches",
        component: () => import("@/views/Launches.vue"),
        props: {
            getDataFromApi: getDataFromApi
        }
    },

    // The list of agencies
    {
        path: "/agencies",
        name: "Agencies",
        component: () => import("@/views/Agencies.vue"),
        props: {
            getDataFromApi: getDataFromApi
        }
    },

    // The details of a single agency
    {
        path: "/agencies/:agencyId",
        name: "Agency",
        component: () => import("@/views/Agency.vue"),
        props: {
            getDataFromApi: getDataFromApi
        }
    },

    // The list of rockets
    {
        path: "/rockets",
        name: "Rockets",
        component: () => import("@/views/Rockets.vue"),
        props: {
            getDataFromApi: getDataFromApi
        }
    },

    // A single rocket
    {
        path: "/rockets/:rocketId",
        name: "Rocket",
        component: () => import("@/views/Rocket.vue"),
        props: {
            getDataFromApi: getDataFromApi
        }
    },

    // The list of launches
    {
        path: "/launches",
        name: "Launches",
        component: () => import("@/views/Launches.vue"),
        props: {
            getDataFromApi: getDataFromApi
        }
    },

    // A single launch
    {
        path: "/launches/:launchId",
        name: "Launch",
        component: () => import("@/views/Launch.vue"),
        props: {
            getDataFromApi: getDataFromApi
        }
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
