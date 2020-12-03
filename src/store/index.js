import {
  createStore
} from 'vuex'
import API from '../api/api.js'

export default createStore({
  state: {
    allRooms:[],
    nowRoom: {},
    nowRoomBookingDays:[],
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
    setNowBookingDays(state,roomData){
      state.nowRoomBookingDays = roomData.booking;
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
        const response = await API.get(`room/${roomID}`);
        commit('setNowRoomData',response.data);
        commit('setNowBookingDays',response.data)
      }catch(e){
        console.log(e)
      }
    }
  },
  modules: {}
})