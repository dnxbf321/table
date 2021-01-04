import React from 'react'

export default function TableHTML(): JSX.Element {
  return (
    <table border={1}>
      <thead>
        <tr>
          <td>列 1</td>
          <td>列 2</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>row 1, cell 1</td>
          <td>row 1, cell 2</td>
        </tr>
        <tr>
          <td>row 2, cell 1</td>
          <td>row 2, cell 2</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2}>共 2 条记录</td>
        </tr>
      </tfoot>
    </table>
  )
}
