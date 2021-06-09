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

    const fd = new FormData();
    fd.append('file', file[0]);
    fd.append('user_id', user.User.id);
    fd.append('folder_id', Number(user.User.root_id));
    fd.append('path', ''); // 수정사항
    fd.append('file', file[0].name);
    fd.append('size', file[0].size);

    console.log('fd', fd);

    return api.post('/files/', fd, headers);
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
