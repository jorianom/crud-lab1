import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "https://unwjsgefgoybvwudqfef.supabase.co/rest/v1/",// para ejecutar en local sin superbase"http://localhost:3005/api",
  headers: {
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVud2pzZ2VmZ295YnZ3dWRxZmVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY0NzIyMDYsImV4cCI6MjAxMjA0ODIwNn0.vDOhVEApw4fx7iO_IkncZLtZOagv1Wovvi9bTUM5-kg`,
    'apikey': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVud2pzZ2VmZ295YnZ3dWRxZmVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY0NzIyMDYsImV4cCI6MjAxMjA0ODIwNn0.vDOhVEApw4fx7iO_IkncZLtZOagv1Wovvi9bTUM5-kg"
  },
  
});

export default clienteAxios;