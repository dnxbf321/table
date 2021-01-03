import React, { useMemo } from 'react'
import { Button } from 'antd'
import Mock from 'mockjs'
import { Column } from '@/components/table/useTable'
import Table from '@/components/table'

export default function Demo(): JSX.Element {
  const columns = useMemo<Column<any>[]>(
    () => [
      {
        title: '热度',
        dataIndex: 'words_count',
        width: 160,
      },
      {
        title: '关注点',
        dataIndex: 'question_list',
        render: value => (
          <ol>
            {value.map(v => (
              <li key={v}>{v}</li>
            ))}
          </ol>
        ),
      },
      {
        title: '咨询人数',
        dataIndex: 'customer_count',
        width: 160,
      },
      {
        title: '操作',
        width: 170,
        fixed: 'right',
        render: () => <Button>操作</Button>,
      },
    ],
    []
  )

  const dataSource = useMemo(() => {
    const list = Mock.mock({
      'list|5': [
        {
          id: '@id',
          'words_count|1-100': 0,
          'question_list|2-5': ['@csentence'],
          'customer_count|1-20': 0,
        },
      ],
    })
    return list.list
  }, [])

  return (
    <div style={{ width: 640, height: 500, margin: 'auto' }}>
      <Table<any>
        dataSource={dataSource}
        columns={columns}
        bordered
        outerBordered
        pagination={{
          total: 100,
          pageSize: 10,
          current: 1,
          onChange(page) {
            console.log(page)
          },
        }}
        loading={false}
        fixedHeader
        summary={`共 ${dataSource.length} 条记录`}
      />
    </div>
  )
}
