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
  uploadFile: ({ user, file }) => {
    const headers = {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'multipart/form-data; boundary={Boundary}',
      Authorization: `${user.AccessToken}`,
      'Access-Key-Id': `${user.Credentials.AccessKeyId}`,
      'Secret-Key': `${user.Credentials.SecretKey}`,
      'Session-Token': `${user.Credentials.SessionToken}`,
      'ID-Token': `${user.IdToken}`,
      'Access-Control-Allow-Origin': true,
    };

    const formData = new FormData();
    formData.append('file', file[0]);
    formData.append('user_id', user.User.id);
    formData.append('folder_id', Number(user.User.root_id));
    formData.append('path', `${user.User.root_id}/`); // 수정사항
    formData.append('file', file[0].name);
    formData.append('size', file[0].size);

    console.log('fd', formData, user, file[0]);

    return api.post('/files/', formData, { headers });
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
