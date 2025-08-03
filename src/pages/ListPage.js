import { Button, Table } from 'antd';
import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import styled from 'styled-components';

import MainLayout from '../layouts/MainLayout';
import fetcher from '../lib/fetcher';
import deleteSurvey from '../services/deleteSurvey';

const getColumns = (onDelete) => [
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
      <Button type="primary" danger onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onDelete(record.id);
      }}>
        삭제
      </Button>
    ),
  },
];

const PAGE_SIZE = 20;
function ListPage() {
  const { data, error, mutate } = useSWR('/surveys?_sort=id&_order=desc', fetcher);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = useCallback(async (id) => {
    try {
      await deleteSurvey(id);
      mutate(); // 삭제 후 캐시 갱신
    } catch (error) {
      console.error('삭제 중 오류가 발생했습니다:', error);
    }
  }, [mutate]);

  const columns = useMemo(() => getColumns(handleDelete), [handleDelete]);

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
