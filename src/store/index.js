import {
  createStore
} from 'vuex'
import API from '../api/api.js'

export default createStore({
  state: {
    allRooms:[],
    nowRoom: {},
  },
  getters: {
  },
  mutations: {
    setRoomsData(state,roomsData){
      state.allRooms = roomsData;
    },
    setNowRoomData(state,roomData){
      state.nowRoom = roomData.room[0];
    },
  },
  actions: {
    async getRoomsData({commit}){
      try{
        const response = await API.get('rooms')
        commit('setRoomsData',response.data.items)
      }catch(e){
        console.log(e)
      }
    },
    async getNowRoomData({commit},roomID){
      try{
        const response = await API.get(`room/${roomID}`)
        commit('setNowRoomData',response.data)
      }catch(e){
        console.log(e)
      }
    }
  },
  modules: {}
})