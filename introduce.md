# 创建表格组件

## 表格 html

表格由 `<table>` 标签来定义。每个表格均有若干行（由 `<tr>` 标签定义），每行被分割为若干单元格（由 `<td>` 标签定义）。字母 `td` 指表格数据（table data），即数据单元格的内容。数据单元格可以包含文本、图片、列表、段落、表单、水平线、表格等等。

```html
<table>
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
    <tr colspan="2">
      <td>共 2 条记录</td>
    </tr>
  </tfoot>
</table>
```

## 栅格系统

基本的栅格布局，它包含了：

- container: 包裹整个栅格系统的容器
- rows: 行
- columns: 列

运用栅格创建表格布局

```html
<div className="{styles.container}">
  <div className="{styles.row}">
    <div className="{styles.cell}">row 1, cell 1</div>
    <div className="{styles.cell}">row 1, cell 2</div>
  </div>
  <div className="{styles.row}">
    <div className="{styles.cell}">row 2, cell 1</div>
    <div className="{styles.cell}">row 2, cell 2</div>
  </div>
</div>
```

```less
.container {
  .row {
    display: flex;

    .cell {
      border: 1px solid #000;
    }
  }
}
```

## antd 表格

基于 [react-component/table](https://github.com/react-component/table) 封装

```html
<table class="ant-table-fixed" style="width: 1330px;">
  <colgroup>
    <col style="width: 200px; min-width: 200px;" />
    <col />
    <col style="width: 120px; min-width: 120px;" />
    <col style="width: 120px; min-width: 120px;" />
    <col style="width: 120px; min-width: 120px;" />
    <col style="width: 110px; min-width: 110px;" />
    <col style="width: 180px; min-width: 180px;" />
    <col style="width: 130px; min-width: 130px;" />
    <col style="width: 120px; min-width: 120px;" />
  </colgroup>
  <tbody class="ant-table-tbody">
    <tr class="ant-table-row ant-table-row-level-0" data-row-key="5fedb4e7513fbd1adb987be6">
      <td class="ant-table-fixed-columns-in-body ant-table-row-cell-break-word">
        <a><span class="multiline2 goalTitle___3cW-6">很长时间的目标</span></a>
      </td>
      <td class=""><div class="multiline2">很长时间的目标</div></td>
      <td class="ant-table-row-cell-break-word">销售额</td>
      <td class="ant-table-row-cell-break-word">2020-12-31</td>
      <td class="ant-table-row-cell-break-word">2021-01-10</td>
      <td class="ant-table-row-cell-break-word">
        <span class="statusRunning___32vg9">生效中</span>
      </td>
      <td class="ant-table-row-cell-break-word">芝华仕旗舰店</td>
      <td class="ant-table-row-cell-break-word">2020-12-31</td>
      <td class="ant-table-fixed-columns-in-body ant-table-row-cell-break-word">
        <button type="button" class="ant-btn btnDelete___1GqJo ant-btn-circle">
          操作
        </button>
      </td>
    </tr>
  </tbody>
</table>
```

列固定在左/右侧是怎么做的？

```html
<div class="ant-table-content">
  <div class="ant-table-scroll">...</div>
  <div class="ant-table-fixed-left">...</div>
  <div class="ant-table-fixed-right">...</div>
</div>
```

为固定列创建独立的 `table`，固定列行高需要根据内容动态计算。

为了实现表头固定、列固定，`rc-table` 分别创建 `table` 结构辅以复杂的 css、js 逻辑进行实现。

## position: sticky

https://developer.mozilla.org/zh-CN/docs/Web/CSS/position

元素根据正常文档流进行定位，然后相对它的最近滚动祖先（nearest scrolling ancestor）和 containing block (最近块级祖先 nearest block-level ancestor)，包括table-related元素，基于top, right, bottom, 和 left的值进行偏移。偏移值不会影响任何其他元素的位置。
该值总是创建一个新的层叠上下文（stacking context）。注意，一个sticky元素会“固定”在离它最近的一个拥有“滚动机制”的祖先上（当该祖先的overflow 是 hidden, scroll, auto, 或 overlay时），即便这个祖先不是最近的真实可滚动祖先。

## flex: flex-grow flex-shrink flex-basis

https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex

长度计算：
-  flex-basis 不为 auto 且相加小于容器长度：flex-basis + (total-length - flex-basis-total) * (flex-grow / flex-grow-total)
-  flex-basis 不为 auto 且相加大于容器长度：flex-basis + (total-length - flex-basis-total) * (flex-shrink / flex-shrink-total)

## 实现一个表格组件

[source code](https://github.com/dnxbf321/table/blob/master/src/components/table/index.tsx)

## 示例 source code

https://github.com/dnxbf321/table/tree/master/src/pages
