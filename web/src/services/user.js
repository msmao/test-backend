import { extend } from 'umi-request';

const request = extend({
  // prefix: BASE_URL,
});

export async function queryUsers(params) {
  return request('/api/users', { params });
}

export async function createUser(params) {
  return request('/api/users', {
    method: 'post',
    data: params,
  });
}

export async function updateUser(id, params) {
  return request(`/api/users/${id}`, {
    method: 'put',
    data: params,
  });
}

export async function deleteUser(id) {
  return request(`/api/users/${id}`, {
    method: 'delete',
  });
}

export async function queryRelation(params) {
  return request(`/api/users/relation`, { params });
}

export async function followUser(id) {
  return request(`/api/users/${id}/follow`, {
    method: 'put',
  })
}

// export async function uploadFile(formData) {
//   return request('/api/upload', {
//     method: 'post',
//     data: formData,
//   });
// }
