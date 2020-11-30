import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    "success": true,
    "items": [{
        "id": "3Elqe8kfMxdZv5xFLV4OUeN6jhmxIvQSTyj4eTgIowfIRvF4rerA2Nuegzc2Rgwu",
        "imageUrl": "https://images.unsplash.com/photo-1551776235-dde6d482980b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80",
        "normalDayPrice": 1380,
        "holidayPrice": 1500,
        "name": "Single Room"
      },
      {
        "id": "g0mYhN6ignMz4VYW7eiWsXZN8DHolHzH8LuVmM6hq5h6BrrqrLMw4aJgHv7LZ3RQ",
        "imageUrl": "https://images.unsplash.com/photo-1564182379166-8fcfdda80151?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80",
        "normalDayPrice": 1899,
        "holidayPrice": 2000,
        "name": "Deluxe Single Room"
      },
      {
        "id": "RA8NhExaXXZB7EODVALSDvFFQzj1JP0a4C1pwZ1acPaieRBwiWoCb0FE0KUbXaxg",
        "imageUrl": "https://images.unsplash.com/photo-1526913621366-a4583840d736?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "normalDayPrice": 2460,
        "holidayPrice": 2500,
        "name": "Double Room"
      },
      {
        "id": "kICyWhZ5XsfI4n1d4gBOsDjIyIxNozwgmxYKyZpzi5pjLcU2Nl4RhiGrn6zaPuTJ",
        "imageUrl": "https://images.unsplash.com/photo-1519710889408-a67e1c7e0452?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80",
        "normalDayPrice": 2888,
        "holidayPrice": 3000,
        "name": "Deluxe Double Room"
      },
      {
        "id": "VCxbQq1vLeUtxW781k9Dlq3mHBRNl5YP19Lhq8k5TbIr2BeH58gRpnNKGoEgkysz",
        "imageUrl": "https://images.unsplash.com/photo-1558976825-6b1b03a03719?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "normalDayPrice": 3350,
        "holidayPrice": 3500,
        "name": "Twin Room"
      },
      {
        "id": "YovqNpFDaal598jbpd1A14gXwDE6gekTqJgxOAGcq78B8YnP7claymQVFy2GTwgb",
        "imageUrl": "https://images.unsplash.com/photo-1552902019-ebcd97aa9aa0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80",
        "normalDayPrice": 3899,
        "holidayPrice": 4000,
        "name": "Deluxe Twin Room"
      }
    ],
    "nowRoom": {
      "id": "kICyWhZ5XsfI4n1d4gBOsDjIyIxNozwgmxYKyZpzi5pjLcU2Nl4RhiGrn6zaPuTJ",
      "name": "Deluxe Double Room",
      "imageUrl": [
        "https://images.unsplash.com/photo-1519710889408-a67e1c7e0452?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80",
        "https://images.unsplash.com/photo-1519974719765-e6559eac2575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80"
      ],
      "normalDayPrice": 2888,
      "holidayPrice": 3000,
      "descriptionShort": {
        "GuestMin": 2,
        "GuestMax": 3,
        "Bed": [
          "Queen"
        ],
        "Private-Bath": 1,
        "Footage": 30
      },
      "description": "Deluxe Double Room is reserved for two or three guests. There is a bedroom with a queen size bed and a private bathroom. Everything you need prepared for you: sheets and blankets, towels, soap and shampoo, hairdryer are provided. In the room there is AC and of course WiFi.",
      "checkInAndOut": {
        "checkInEarly": "15:00",
        "checkInLate": "19:00",
        "checkOut": "11:00"
      },
      "amenities": {
        "Wi-Fi": true,
        "Breakfast": true,
        "Mini-Bar": true,
        "Room-Service": true,
        "Television": true,
        "Air-Conditioner": true,
        "Refrigerator": true,
        "Sofa": true,
        "Great-View": true,
        "Smoke-Free": true,
        "Child-Friendly": true,
        "Pet-Friendly": true
      },
      "booking": []
    },
  },
  getters: {
  },
  mutations: {
  },
  actions: {},
  modules: {}
})