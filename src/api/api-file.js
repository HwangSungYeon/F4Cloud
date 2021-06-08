import api from './api-base';

export const fileApi = {
  loadFiles: ({ data }) => {
    console.log('data', data);
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${data.AccessToken}`,
      'Access-Key-Id': `${data.Credentials.AccessKeyId}`,
      'Secret-Key': `${data.Credentials.SecretKey}`,
      'Session-Token': `${data.Credentials.SessionToken}`,
      'ID-Token': `${data.IdToken}`,
      user_id: `${data.User.id}`,
    };
    return api.get(`/folders/${data.User.root_id}/list`, { headers });
  },
};
