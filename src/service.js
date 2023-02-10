import axios from "axios";
import { ElMessage } from "element-plus";
import { ElLoading } from 'element-plus'

const service = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

let loadingInstance = null
service.interceptors.request.use(
  (config) => {
    config.headers['token'] = localStorage.getItem("token");

    loadingInstance = ElLoading.service({ fullscreen: true })
    console.log(222);
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
service.interceptors.response.use(
  (res) => {
    const { message, status } = res.data;
    console.log(111);
    if (status !== 200) {
      ElMessage({ message: message || "error", type: "warning" });
    }

    loadingInstance.close()
    return res;
  },
  (err) => {
    loadingInstance.close()
    return Promise.reject(err);
  }
);
export default service;
