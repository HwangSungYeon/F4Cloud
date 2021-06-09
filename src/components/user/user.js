import styled from 'styled-components';
import AsideNavbar from '../../components/asidenav/AsideNavbar';
import React, { useState } from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import DataTable from 'components/content/DataTable';
import 'react-pro-sidebar/dist/css/styles.css';
import * as s from './user.styles';
import { useAuth } from 'context/auth';
import { useDrive } from 'context/drive';
import { fileApi } from 'api/api-file';
import CreateFolderModal from '../modal/CreateFolderModal';
const Wrapper = styled.div`
  display: flex;
  position: sticky;
  flex-direction: column;
  column: 100%;
`;
const Users = () => {
  const { authTokens } = useAuth();
  const { drive, setDrive } = useDrive();

  // 현재 위치의 폴더 id
  const [currentFolder, setCurrentFolder] = useState(authTokens.User.root_id);
  const [newFolderName, setNewFolderName] = useState(null);
  const [createFolderModal, setCreateFolderModal] = useState(false);
  const [createFileModal, setCreateFileModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileChangedHandler = (event) => {
    const file = event.target.files;
    console.log('ss', file);
    setSelectedFile(file);
  };

  const create = () => setCreateFolderModal(true);
  const createFolder = async () => {
    let result = null;
    try {
      result = await fileApi.createFolder({
        user: authTokens,
        parent_id: currentFolder,
        user_id: authTokens.User.id,
        newFolderName,
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log(result.data);
      setDrive([...drive, { id: drive.length, ...result.data }]);
    }
  };

  const createFile = async () => {
    console.log('craetefile');
    let result = null;
    try {
      result = await fileApi.uploadFile({
        user: authTokens,
        file: selectedFile,
      });
    } catch (error) {
      console.log(error);
    } finally {
      if (result) {
        console.log('file result', result);
      }
    }
  };

  return (
    <Wrapper>
      <s.UserAside>
        <s.UserWrapper>
          <AsideNavbar />
        </s.UserWrapper>
        <s.UserWrapper>
          <s.UserContainer>
            <button onClick={create}>폴더생성</button>
            <button onClick={() => setCreateFileModal(true)}>파일업로드</button>

            {createFileModal ? (
              <CreateFolderModal
                open={createFileModal}
                close={() => setCreateFileModal(false)}
                header="파일 생성"
                buttonText={'업로드'}
                onClick={createFile}
              >
                <input type="file" onChange={fileChangedHandler} />
              </CreateFolderModal>
            ) : null}
            {createFolderModal ? (
              <CreateFolderModal
                open={createFolderModal}
                close={() => setCreateFolderModal(false)}
                header="폴더 생성"
                buttonText={'생성'}
                onClick={createFolder}
              >
                <input
                  type="text"
                  placeholder="폴더명"
                  onChange={(e) => setNewFolderName(e.target.value)}
                />
              </CreateFolderModal>
            ) : null}
            <s.UserTitle>내 드라이브</s.UserTitle>
            <s.UserSearchForm>
              <s.UserSearchInput
                name="search"
                id="search"
                type="search"
                placeholder="드라이브에서 검색"
              />
              <s.UserSearchBtn>검색</s.UserSearchBtn>
            </s.UserSearchForm>
          </s.UserContainer>
          <DataTable />

          <s.UserWrapper>
            <s.UserContainer>{/* <UserSubTitle>클라우드 자료</UserSubTitle> */}</s.UserContainer>
          </s.UserWrapper>
        </s.UserWrapper>
      </s.UserAside>
    </Wrapper>
  );
};
export default Users;
