import { Button, Table } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import styled from 'styled-components';

import MainLayout from '../layouts/MainLayout';
import fetcher from '../lib/fetcher';
const columns = [
  {
    title: '번호',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <span>{text}</span>,
  },
  {
    title: '제목',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '생성일',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text) => {
      let formattedDate = new Date(text).toLocaleDateString();
      return <span>{formattedDate}</span>;
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Button type="primary" onClick={() => console.log(record.id)}>
        삭제
      </Button>
    ),
  },
];

const PAGE_SIZE = 20;
function ListPage() {
  const { data, error } = useSWR('/surveys', fetcher);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <div>
      <MainLayout selectedKey="list">
        <CreateButtonWrapper>
          <Button type="primary" onClick={() => navigate('/builder')}>새로운 설문조사 작성</Button>
        </CreateButtonWrapper>
        <Table
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                navigate(`/builder/${record.id}`);
              }, // click row
            };
          }}
          columns={columns}
          dataSource={data.map((item) => ({...item, key: item.id}))}
          pagination={
            {
              total: data.length,
              pageSize: PAGE_SIZE,
              current: currentPage,
              onChange: (page) => {
                setCurrentPage(page);
              },
            }
          }
        />
      </MainLayout>
    </div>
  );
}

const CreateButtonWrapper = styled.div`
  margin-bottom: 20px;
  text-align: right;
`;

export default ListPage;
