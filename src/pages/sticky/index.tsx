import React from 'react'
import styles from './index.less'

export default function Sticky(): JSX.Element {
  return (
    <>
      <div className={styles.blank} />
      <div className={styles.fixedHeight}>
        <div className={styles.container}>
          <div className={styles.stickyItem}>sticky 元素</div>
        </div>
      </div>
      <div className={styles.blank} />
    </>
  )
}
