import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

// Create the DataManager object. It is used by the views as an interface to the API
import DataManager from "../DataManager.js";
const dataManager = new DataManager();

Vue.use(VueRouter);

const routes = [
    // The landing page
    {
        path: "/",
        name: "Home",
        component: Home
    },

    // The list of agencies
    {
        path: "/agencies",
        name: "Agencies",
        component: () => import("@/views/Agencies.vue")
    },

    // The details of a single agency
    {
        path: "/agencies/:agencyId",
        name: "Agency",
        component: () => import("@/views/Agency.vue")
    },

    // The list of rockets
    {
        path: "/rockets",
        name: "Rockets",
        component: () => import("@/views/Rockets.vue")
    },

    // A single rocket
    {
        path: "/rockets/:rocketId",
        name: "Rocket",
        component: () => import("@/views/Rocket.vue")
    },

    // The list of launches
    {
        path: "/launches",
        name: "Launches",
        component: () => import("@/views/Launches.vue"),
        props: {
            dataManager: dataManager
        }
    },

    // A single launch
    {
        path: "/launches/:launchId",
        name: "Launch",
        component: () => import("@/views/Launch.vue"),
        props: {
            dataManager: dataManager
        }
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
