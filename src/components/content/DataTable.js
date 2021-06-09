import { DataGrid } from '@material-ui/data-grid';
import { useDrive } from 'context/drive';
const columns = [
  { field: 'id', headerName: 'ID', width: 100, sortable: true },
  { field: 'folder_id', headerName: 'folder_id', width: 100 },
  { field: 'parent_id', headerName: 'parent_id', width: 100 },
  { field: 'user_id', headerName: '소유자', width: 100 },
  { field: 'name', headerName: '이름', width: 100 },
  { field: 'path', headerName: '경로', width: 100 },
  { field: 'created_at', headerName: '생성 날짜', width: 100 },
  { field: 'modified_at', headerName: '수정 날짜', width: 100 },

  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 90,
  // },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   // valueGetter: (params) =>
  //   //   `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  // },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataTable() {
  const { drive } = useDrive();
  console.log('Datatable', drive);
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={drive} columns={columns} pageSize={10} checkboxSelection />
    </div>
  );
}
