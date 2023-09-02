import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "https://qdsgpxoxdyjkvljjdngh.supabase.co/rest/v1/",// para ejecutar en local sin superbase"http://localhost:3005/api",
  headers: {
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkc2dweG94ZHlqa3ZsampkbmdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM2MTY4MjIsImV4cCI6MjAwOTE5MjgyMn0.YVH0ADrxYKJfSmYiWb6poiuN6LuofdEuBMknD1TS7Xc`,
    'apikey': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkc2dweG94ZHlqa3ZsampkbmdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM2MTY4MjIsImV4cCI6MjAwOTE5MjgyMn0.YVH0ADrxYKJfSmYiWb6poiuN6LuofdEuBMknD1TS7Xc"
  },
  
});

export default clienteAxios;