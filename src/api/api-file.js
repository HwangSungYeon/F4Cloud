import api from './api-folderbase';

export const fileApi = {
  // 사용자의 폴더 및 파일 불러오기
  loadFiles: ({ user }) => {
    const headers = {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/x-www-form-urlencoded',
      Authorization: `${user.AccessToken}`,
      'Access-Key-Id': `${user.Credentials.AccessKeyId}`,
      'Secret-Key': `${user.Credentials.SecretKey}`,
      'Session-Token': `${user.Credentials.SessionToken}`,
      'ID-Token': `${user.IdToken}`,
      'Access-Control-Allow-Origin': true,
    };
    return api.get(`/folders/${user.User.root_id}/list`, {
      headers,
      params: {
        user_id: user.User.id,
      },
    });
  },
  uploadFile: ({ user }) => {
    const headers = {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/x-www-form-urlencoded',
      Authorization: `${user.AccessToken}`,
      'Access-Key-Id': `${user.Credentials.AccessKeyId}`,
      'Secret-Key': `${user.Credentials.SecretKey}`,
      'Session-Token': `${user.Credentials.SessionToken}`,
      'ID-Token': `${user.IdToken}`,
      'Access-Control-Allow-Origin': true,
    };
    return api.post('/files', {});
  },
  createFolder: ({ user, parent_id, user_id, newFolderName }) => {
    const headers = {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
      Authorization: `${user.AccessToken}`,
      'Access-Key-Id': `${user.Credentials.AccessKeyId}`,
      'Secret-Key': `${user.Credentials.SecretKey}`,
      'Session-Token': `${user.Credentials.SessionToken}`,
      'ID-Token': `${user.IdToken}`,
      'Access-Control-Allow-Origin': true,
    };
    return api.post(
      '/folders/',
      {
        parent_id: Number(parent_id),
        user_id: user_id,
        name: newFolderName,
        path: `${parent_id}/`,
      },
      { headers },
    );
  },
};
