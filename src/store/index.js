import {
  createStore
} from 'vuex'
import API from '../api/api.js'

export default createStore({
  state: {
    allRooms:[],
    nowRoom: {},
    nowRoomBookingDays:[],
    bookingResult:'',
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
    setBookingResult(state,result){
      state.bookingResult = result
    }
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
    },
    async postNewBooking({dispatch,commit},{roomID,bookingInfo}){
      try{
        await API.post(`room/${roomID}`,bookingInfo)
        commit('setBookingResult','sucess')
        dispatch('getNowRoomData',roomID)
      }catch(e){
        commit('setBookingResult','fail')
        console.log(e)
      }   
    }
  },
  modules: {}
})