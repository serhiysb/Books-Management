import axios from "axios";

export default axios.create({
    // baseURL:"http://localhost:3002",
    baseURL:"http://localhost:4000",
    headers:{
        "Content-Type":"application/json"
    }
})