import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            alias: "/restorans",
            name: "restorans",
            component: () => import("./components/RestoransList")
        },
        {
            path: "/restorans/:id",
            name: "restoran-details",
            component: () => import("./components/Restoran")
        },
        {
            path: "/add",
            name: "add",
            component: () => import("./components/AddRestoran")
        }
    ]
});