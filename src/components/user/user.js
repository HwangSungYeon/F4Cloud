import styled from 'styled-components';
import AsideNavbar from '../../components/asidenav/AsideNavbar';
import React, { useEffect, useState } from 'react';
import 'react-pro-sidebar/dist/css/styles.css';
import DataTable from 'components/content/DataTable';
import { fileApi } from 'api/api-file';
import * as s from './user.styles';
import { useAuth } from 'context/auth';
import CreateFolderModal from '../modal/CreateFolderModal';
const Wrapper = styled.div`
  display: flex;
  position: sticky;
  flex-direction: column;
  column: 100%;
`;
const Users = () => {
  const { authTokens } = useAuth();
  // 현재 위치의 폴더 id
  const [currentFolder, setCurrentFolder] = useState(authTokens.User.root_id);
  const [newFolderName, setNewFolderName] = useState(null);
  const [createFolderModal, setCreateFolderModal] = useState(false);

  const create = () => setCreateFolderModal(true);
  console.log(currentFolder, 'currentFolder');
  return (
    <Wrapper>
      <s.UserAside>
        <s.UserWrapper>
          <AsideNavbar />
        </s.UserWrapper>
        <s.UserWrapper>
          <s.UserContainer>
            <button>파일 업로드</button>
            <button onClick={create}>폴더생성</button>
            {createFolderModal ? (
              <CreateFolderModal
                open={createFolderModal}
                close={() => setCreateFolderModal(false)}
                header="폴더 생성"
                parent_id={currentFolder}
                user_id={authTokens.User.id}
                newFolderName={newFolderName}
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
              <s.UserSearchBtn>Submit</s.UserSearchBtn>
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
