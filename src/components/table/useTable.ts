/*
 * @Date: 2020-09-01 10:14:06
 * @Author: dengjiayao
 * -----
 * @Description: 生成 table 的辅助方法
 */
import { ReactNode, useMemo } from 'react'
import './index.less'

type ColumnCallback<T, R> =
  | ((value: any, record: T, index: number) => R)
  | ((value: any, record: T) => R)
  | ((value: any) => R)

export type SortOrder = 'descend' | 'ascend' | boolean

export interface Column<T> {
  title: string
  width?: number
  minWidth?: number
  dataIndex?: keyof T
  className?: string
  style?: any
  render?: ColumnCallback<T, ReactNode>
  onClick?: ColumnCallback<T, void>
  fixed?: 'left' | 'right'
  sortOrder?: SortOrder
}

interface UseTableProps<T> {
  columns: Column<T>[]
  adaptive?: number // 未设置宽度的列的默认宽度
}

interface Return<T> {
  columns: Column<T>[]
  scrollWidth: number
}

const emptyArr = []

export default function useTable<T>(props: UseTableProps<T>): Return<T> {
  const { columns = emptyArr, adaptive = 200 } = props

  const xColumns = useMemo<Column<T>[]>(() => {
    return columns
      .map((col) => {
        col = { ...col }
        col.className = col.className || ''
        if (col.fixed) {
          col.width = col.width || col.minWidth || adaptive
        }
        col.minWidth = col.minWidth || col.width || adaptive
        col.style = {
          ...(col.style || {}),
          width: col.width || 'auto',
          minWidth: col.minWidth,
          flex: col.width === undefined ? `1 0 ${col.minWidth}px` : `0 0 ${col.minWidth}px`,
        }
        return col
      })
      .map((col, idx, all) => {
        if (col.fixed) {
          col.className = `mc-table-td-fixed ${col.className}`
          col.style.position = 'sticky'
        }
        if (col.fixed === 'right') {
          col.style.right = all.slice(idx + 1).reduce((right, v) => right + (v.width as number), 0)
          const isFirstLockRight = all.slice(0, idx).every((v) => !v.fixed || v.fixed === 'left')
          if (isFirstLockRight) {
            col.className = `mc-table-td-fixed-right-shadow ${col.className}`
          }
        }
        if (col.fixed === 'left') {
          col.style.left = all.slice(0, idx).reduce((left, v) => left + (v.width as number), 0)
          const isLastLockLeft = all.slice(idx + 1).every((v) => !v.fixed || v.fixed === 'right')
          if (isLastLockLeft) {
            col.className = `mc-table-td-fixed-left-shadow ${col.className}`
          }
        }
        return col
      })
  }, [columns])

  const scrollWidth = useMemo(() => {
    return columns.reduce((a, b) => a + (b.width || b.minWidth || adaptive), 0)
  }, [columns])

  return {
    columns: xColumns,
    scrollWidth,
  }
}
