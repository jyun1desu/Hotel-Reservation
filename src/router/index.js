import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store/index.js'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    async beforeEnter(to,from,next){
      await store.dispatch('getRoomsData');
      next();
    }
  },
  {
    path: '/room/:roomId',
    name: 'RoomPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/RoomPage.vue'),
    async beforeEnter(routerTo,from,next){
      await store.dispatch('getNowRoomData',routerTo.params.roomId);
      next();
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
