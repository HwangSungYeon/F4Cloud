import styled from 'styled-components';
import AsideNavbar from '../../components/asidenav/AsideNavbar';
import React, { useEffect, useState } from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import DataTable from 'components/content/DataTable';
import { fileApi } from 'api/api-file';
import * as s from './user.styles';
import { useAuth } from 'context/auth';
import CreateFolderModal from '../modal/CreateFolderModaal';
const Wrapper = styled.div`
  display: flex;
  position: sticky;
  flex-direction: column;
  column: 100%;
`;
const Users = () => {
  const { authTokens } = useAuth();
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [createFolderModal, setCreateFolderModal] = useState(false);

  const upload = () => setCreateFolderModal(true);
  useEffect(async () => {
    let result = null;
    try {
      result = await fileApi.loadFiles({ user: authTokens });
    } catch (error) {
      console.log(error);
    } finally {
      if (result && result.status === 202) {
        console.log('result', result.data);
        setFolders(result.data.folders);
        setFiles(result.data.files);
      }
    }
  }, []);

  return (
    <Wrapper>
      <s.UserAside>
        <s.UserWrapper>
          <AsideNavbar />
        </s.UserWrapper>
        <s.UserWrapper>
          <s.UserContainer>
            <button onClick={upload}>업로드</button>
            {createFolderModal ? (
              <CreateFolderModal
                open={createFolderModal}
                close={() => setCreateFolderModal(false)}
                header="폴더 생성"
              >
                <input type="text" placeholder="폴더명" />
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
              <s.UserSearchBtn>Submit</s.UserSearchBtn>
            </s.UserSearchForm>
          </s.UserContainer>
          <DataTable folders={folders} files={files} />

          <s.UserWrapper>
            <s.UserContainer>{/* <UserSubTitle>클라우드 자료</UserSubTitle> */}</s.UserContainer>
          </s.UserWrapper>
        </s.UserWrapper>
      </s.UserAside>
    </Wrapper>
  );
};
export default Users;
