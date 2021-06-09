import { fileApi } from 'api/api-file';
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Modal.css';
import { useAuth } from '../../context/auth';
import { useDrive } from 'context/drive';

const CreateFolderModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, parent_id, user_id, newFolderName } = props;
  const { authTokens } = useAuth();
  const { drive, setDrive } = useDrive();
  console.log(props);

  const create = async () => {
    let result = null;
    try {
      result = await fileApi.createFolder({
        user: authTokens,
        parent_id,
        user_id,
        newFolderName,
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log(result.data);
      setDrive([...drive, { id: drive.length, ...result.data }]);
    }
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
          <footer>
            <button className="close" onClick={create}>
              생성
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default CreateFolderModal;
