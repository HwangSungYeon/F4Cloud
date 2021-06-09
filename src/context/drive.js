import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from '../context/auth';
import { fileApi } from 'api/api-file';

export const DriveContext = createContext();

export const useDrive = () => React.useContext(DriveContext);

const DriveProvider = ({ children }) => {
  const { authTokens } = useAuth();
  const [folders, setFolders] = useState(null);
  const [files, setFiles] = useState(null);
  const [drive, setDrive] = useState([]);

  const loadFiles = async () => {
    let result = null;
    try {
      result = await fileApi.loadFiles({ user: authTokens });
    } catch (error) {
      console.log(error);
    } finally {
      if (result && result.status === 202) {
        setFolders(result.data.folders);
        setFiles(result.data.files);
      }
    }
  };

  useEffect(() => {
    if (authTokens) {
      console.log('진행됨');
      loadFiles();
    }
  }, [authTokens]);

  useEffect(() => {
    if (folders && files) {
      setDrive(drive.concat(folders, files).map((item, index) => ({ id: index, ...item })));
    }
  }, [folders, files]);

  console.log('drive ', folders, files, drive);
  return (
    <DriveContext.Provider value={{ folders, setFolders, files, setFiles, drive, setDrive }}>
      {children}
    </DriveContext.Provider>
  );
};

const { Consumer: DriveConsumer } = DriveContext;

export { DriveProvider, DriveConsumer };
