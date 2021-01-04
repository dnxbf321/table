import React from 'react'
import styles from './index.less'

export default function Grid(): JSX.Element {
  return (
    <div className={styles.grid}>
      <div className={styles.row}>
        <div className={styles.cell}>row 1, cell 1</div>
        <div className={styles.cell}>row 1, cell 2</div>
      </div>
      <div className={styles.row}>
        <div className={styles.cell}>row 2, cell 1</div>
        <div className={styles.cell}>row 2, cell 2</div>
      </div>
    </div>
  )
}
