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
    path: '/room',
    name: 'RoomPage',
    component: () => import(/* webpackChunkName: "about" */ '../views/RoomPage.vue'),
    async beforeEnter(to,from,next){
      const roomID = store.state.allRooms[0].id
      await store.dispatch('getNowRoomData',roomID);
      next();
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
