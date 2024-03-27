import { createRouter, createWebHashHistory } from "vue-router";

import Home from "./pages/Home.vue";
import DataBag from "./pages/DataBag.vue";
import CreateGraph from "./pages/CreateGraph.vue";
import Extraction from "./pages/Extraction.vue";
import KgUnion from "./pages/KgUnion.vue";
import ReqLog from "./pages/ReqLog.vue";
import Login from "./pages/Login.vue";
import KgShow from "./pages/KgShow.vue"
import Register from "./pages/Register.vue"
import auth from '@/utils/auth'
import GraphShow from "./pages/show/GraphShow.vue"
//import Show from "@/pages/show/Show.vue"

const routes = [{
    path: "/", component: Home, name: "home"
}, {
    path: "/DataBag", component: DataBag, name: "DataBag"
}, {
    path: "/CreateGraph", component: CreateGraph, name: "CreateGraph"
}, {
    path: "/Extraction", component: Extraction, name: "Extraction"
}, {
    path: "/KgUnion", component: KgUnion, name: "KgUnion"
}, {
    path: "/ReqLog", component: ReqLog, name: "ReqLog"
},{
    path: "/Login", component: Login, name: "Login"
},
{
    path: "/Register", component: GraphShow, name: "Register"
},{
    path:"/KgShow", component:KgShow, name:"KgShow"
    , children:[
        {
            path:"/KgShow/GraphShow", component:GraphShow, name:"GraphShow"}
    ]
}
// ,
//  {   path:"/KgShow/GraphShow", component:GraphShow, name:"GraphShow"}

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if(!auth.is_authed){
      if (to.name !== 'Login') {
        next({ name: 'Login' });
      } else {
        next();
      }
    }else{
        if(to.name === 'Login'){
            next({name:'home'});
        }
        else{
            next();
        }
       
    }
});

export default router;