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
  createFolder: ({ user }) => {
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
    // {
    //   “parent_id”: 27,
    //   “user_id”: “test”,
    //   “name”: “folder_12”,
    //   “path”: “folder_2/”,
    //   }

    return api.post('/folders');
  },
};
