/*
 * @Date: 2020-08-25 10:44:31
 * @Author: dengjiayao
 * -----
 * @Description: 表格组件。支持表头固定、左/右侧连续列固定
 */
import React, { useState, useEffect, useRef, useMemo, ReactNode } from 'react'
import { Spin, Empty, Pagination } from 'antd'
import { useDebounceFn } from 'ahooks'
import { Column, SortOrder } from './useTable'
import './index.less'

export interface Pagination {
  total: number
  current: number
  pageSize: number
  onChange: (current: number) => void
}

export interface TableProps<T = any> {
  columns: Column<T>[]
  scrollWidth: number
  dataSource?: T[] // 当 custom 为 true 时，可不传
  legend?: string | boolean // 表头。boolean 时，可使用 slot='mc-table-legend' 渲染
  fixedHeader?: boolean
  loading?: boolean
  wrapperClassName?: string
  bordered?: boolean
  outerBordered?: boolean
  pagination?: Pagination
  onChange?: (currentPage: number, sorter?: { order: SortOrder; field: Column<T>['title'] }) => void // 注意：当 pagination 有定义 onChange 时，翻页不会调用 Table 的 onChange
  rowKey?: (row: T) => string
  summary?: ReactNode
}

const nextSortOrder: { [prop: string]: SortOrder } = {
  true: 'descend',
  descend: 'ascend',
  ascend: true,
}
const emptyArr = []
const defaultRowKey = row => row?.id

export default function TableLayout<T>(props: TableProps<T>): JSX.Element {
  const {
    columns = emptyArr,
    dataSource = emptyArr,
    scrollWidth = '100%',
    fixedHeader = false,
    loading = false,
    wrapperClassName = '',
    bordered = false,
    outerBordered = true,
    legend,
    pagination,
    onChange,
    rowKey = defaultRowKey,
    summary,
  } = props
  const refWrapper = useRef<HTMLDivElement>()
  const [wrapperRect, setWrapperRect] = useState<any>()
  const [scrollX, setScrollX] = useState<any>(0)

  const { run: handleScroll } = useDebounceFn(
    e => {
      setScrollX(e.target.scrollLeft)
    },
    {
      wait: 300,
      trailing: true,
    }
  )

  // 手动触发一次 onScroll 事件
  useEffect(() => {
    setScrollX(1)
    setTimeout(() => {
      setScrollX(0)
    }, 100)
  }, [])

  // 获取容器大小
  useEffect(() => {
    if (refWrapper.current) {
      const rect = refWrapper.current.getBoundingClientRect()
      setWrapperRect(rect)
    }
  }, [refWrapper])

  const wrapperCs = useMemo(() => {
    const cs = [wrapperClassName]
    if (bordered) {
      cs.push('mc-table-wrapper-bordered')
    }
    if (outerBordered) {
      cs.push('mc-table-wrapper-outerBordered')
    }
    if (fixedHeader) {
      cs.push('mc-table-wrapper-fixedHeader')
    }
    if (legend) {
      cs.push('mc-table-wrapper-with-legend')
    }
    if (pagination && pagination.total > 0) {
      cs.push('mc-table-wrapper-with-pagination')
    }
    if (wrapperRect && wrapperRect.width < scrollWidth) {
      cs.push('mc-table-wrapper-scrollX')
      if (scrollX > 0) {
        cs.push('mc-table-wrapper-scrollX-n')
      }
      if (scrollX + wrapperRect.width >= scrollWidth) {
        cs.push('mc-table-wrapper-scrollX-end')
      }
    }
    return cs
  }, [wrapperClassName, bordered, fixedHeader, scrollX, wrapperRect, scrollWidth, pagination])

  const notEmpty = useMemo(() => {
    return dataSource.length > 0 || (pagination && pagination.total > 0)
  }, [dataSource, pagination])

  return (
    <Spin spinning={loading} wrapperClassName="mc-table-outer">
      <div
        ref={el => {
          refWrapper.current = el
        }}
        className={`mc-table-wrapper ${wrapperCs.join(' ')}`}
      >
        {legend && <div className="mc-table-legend">{legend}</div>}
        <div
          className="mc-table"
          onScroll={e => {
            e.persist()
            handleScroll(e)
          }}
        >
          <div className="mc-table-tr mc-table-thead-tr" style={{ width: scrollWidth }}>
            {columns.map(col => (
              <div
                key={`mc-table-th_${col.key || col.title}`}
                className={`mc-table-th ${
                  col.sortOrder ? `mc-table-th-sort-${col.sortOrder}` : ''
                } ${col.className}`}
                style={col.style}
                onClick={() => {
                  if (col.sortOrder && onChange) {
                    onChange((pagination && pagination.current) || 1, {
                      order: nextSortOrder[`${col.sortOrder}`],
                      field: col.title,
                    })
                  }
                }}
              >
                <div className="mc-table-th-inner">{col.title}</div>
              </div>
            ))}
          </div>
          {notEmpty ? (
            dataSource.map((data, idx) => (
              <div
                key={`mc-table-tbody-tr_${rowKey(data)}`}
                className="mc-table-tr mc-table-tbody-tr"
                style={{ width: scrollWidth }}
              >
                {columns.map(col => (
                  <div
                    key={`mc-table-td_${rowKey(data)}_${col.key || col.title}`}
                    className={`mc-table-td ${col.className}`}
                    style={col.style}
                    onClick={() => {
                      if (col.onClick) {
                        col.onClick(data[col.dataIndex as string], data, idx)
                      }
                    }}
                  >
                    <div className="mc-table-td-inner">
                      {col.render
                        ? col.render(data[col.dataIndex as string], data, idx)
                        : data[col.dataIndex as string]}
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="mc-table-empty-data">
              <Empty description="暂无数据" />
            </div>
          )}
        </div>
        {pagination && pagination.total > 0 && (
          <div className="mc-table-pagination-wrapper">
            {summary && <div className="mc-table-pagination-summary">{summary}</div>}
            <Pagination
              total={pagination.total}
              current={pagination.current}
              pageSize={pagination.pageSize}
              showSizeChanger={false}
              onChange={(e: any) => {
                if (pagination.onChange) {
                  pagination.onChange(e.detail.value)
                } else if (onChange) {
                  onChange(e.detail.value)
                }
              }}
              className="mc-table-pagination"
            />
          </div>
        )}
      </div>
    </Spin>
  )
}
