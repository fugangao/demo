import service from "../service";
import qs from 'qs'

export const loginApi = (data) => {
  return service({
    method: "post",
    url: "/login",
    data,
  });
};
export const student = (params) => {
  return service({
    method: "get",
    url: "/students",
    params
  });
}
export const delStu = (id) => {
  return service({
    method: "delete",
    url: `/students/${id}`,
  });
}
// export const getStu = () => {
//   return service({
//     method: "get",
//     url: "/students",
//   });
// }
// export const findStu = (params) => {
//   return service({
//     method: "get",
//     url: "/students",
//     params
//   });
// }
export const getInfo = (url = 'info', type = 'get', data = {}, params = {},) => {
  data = qs.stringify(data)
  return service({
    method: type,
    url,
    data,
    params
  });
};
export const delInfo = (id) => {
  return service({
    method: 'delete',
    url: `/info/${id}`,
  })
}
