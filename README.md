# BizCharts —— ant.design 主题风格的图表组件库

## 官方介绍

BizCharts 是阿里通用图表组件库，致力于打造企业中后台高效、专业、便捷的数据可视化解决方案，基于 G2 与 G2Plot 封装的 React 图表库，已经历阿里复杂业务场景长达三年的洗礼，在灵活性、易用性、丰富度上满足常规图表和高度自定义图表的业务实现。

## 特性

- 是基于 G2 4.X 封装的 React 图表库，具有 G2、React 的全部优点，可以让用户以组件的形式组合出无数种图表
- 集成了大量的统计工具，支持多种坐标系绘制，交互定制，动画定制以及图形定制等
- 性能稳定且具有强大的扩展能力和高度自定义能力
- 内置了 g2Plot 的 42 个基础图表

G2 特性

- 💯 完善的图形语法：数据到图形的映射，能够绘制出所有的图表。
- 🤩 全新的交互语法：通过触发和反馈机制可以组合出各种交互行为，对数据进行探索。
- 🦍 强大的 View 模块：可支持开发个性化的数据多维分析图形。
- 👬 双引擎渲染：Canvas 或 SVG 任意切换。
- 💄 可视化组件体系：面向交互、体验优雅。
- 🛡 全面拥抱 TypeScript：提供完整的类型定义文件。

## 简单的例子

[DEMO](http://localhost:81/demo)

```tsx
import React from 'react'
import { Chart, Interval } from 'bizcharts'

export default function Demo(): JSX.Element {
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ]

  return (
    <Chart height={320} autoFit data={data}>
      <Interval position="genre*sold" />
    </Chart>
  )
}
```

## 用法

[API 文档](https://bizcharts.net/product/BizCharts4/category/62/page/77)

- Chart - 画布
- View - 视图。一个 Chart 可以叠加多个视图
- Axis - 坐标轴。Axis name 属性与 Geom position 属性对应
- Tooltip - 提示。children 是函数时，可返回 ReactNode 进行自定义
- Legend - 图例。只有当 `<Geom />` 组件上有 `shape`, `color`, `size` 这三个属性中任意一个时，才会显示图例；设置 `<Legend />` 组件的 name 属性进行关联，可控制图例的显影
- Coordinate - 坐标系
- Annotation - 图形标注
- Slider - 数据量过大时缩略滑块
- Interaction - 图标交互。也可在 Chart 中配置 `defaultInteractions`、`interactions` 属性。
- Facet - 分面
- Line/Interval/Point/Geom/... - 具体图形组件。`<Interval />` 与 `<Gemo type="interval" />` 等效，推荐使用 `<Interval />` 这种形式，按需加载

## 要点

### Chart scale

配置别名，值转换

```js
scale = {
  dataField: {
    alias: '别名',
    formatter(value) {
      const newValue = value
      return newValue
    },
    range: [0, 1], // 坐标轴两端空白。分类数据的坐标轴两边默认会留下一定的空白，连续数据的坐标轴的两端没有空白刻度
  },
}
```

### Chart placeholder

定义无数据点时的显示

### Chart renderer

svg canvas

### position="x\*y"

绘制的图形折点的坐标，x 轴映射的字段\*y 轴映射的字段

### color、shape, size

- `color="x"` 映射数据字段 x，颜色从默认颜色配置中依次提取
- `color={['x', '#f00-#ff0']}` 颜色从 #f00 到 #ff0 自动生成
- `color={['x', ['#f00', '#ff0]]}` 颜色依次取 #f00、#ff0
- 回调函数形式
    ```js
    color={['x', (x) => {
      if (y > 0) return '#f00'
      return '#ff0'
    }}
    ```

### Geom tooltip 属性

```js
tooltip={['x*y', (x, y) => {
  return {
    x,
    y,
  }
}]}
```

return 值作为变量用于 itemTpl 的字符串模板

## 定制主题

[demo](http://localhost:81/demo4)

```tsx
import React from 'react'
import { Chart, Interval, useTheme, registerTheme, getTheme } from 'bizcharts'

// 注册自己的主题
registerTheme('my-theme', {
  defaultColor: '#6DC8EC',
  geometries: {
    interval: {
      rect: {
        default: { style: { fill: '#6DC8EC', fillOpacity: 0.95 } },
        active: { style: { stroke: '#5AD8A6', lineWidth: 1 } },
        inactive: { style: { fillOpacity: 0.3, strokeOpacity: 0.3 } },
        selected: {},
      },
    },
  },
})

const data = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 45 },
  { year: '1958 年', sales: 48 },
  { year: '1959 年', sales: 38 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 38 },
]

export default function Demo(): JSX.Element {
  const [theme] = useTheme('my-theme')
  // 不清楚主题属性有哪些，可以log出来看一下
  console.log(getTheme('my-theme'))
  return (
    <Chart
      height={400}
      autoFit
      data={data}
      theme={theme}
      interactions={['element-active']}
      padding={[30, 30, 30, 50]}
    >
      <Interval position="year*sales" />
    </Chart>
  )
}
```

[g2 自定义主题](https://g2.antv.vision/zh/docs/manual/developer/registertheme)

## 我为什么选 BizCharts

- 提供 React 组件，使用舒适，Typescript 支持较好
- 颜值，相较于 echarts，bizcharts 默认风格更现代化，贴近 ant.design 的设计
- 一些细节
  - x 轴 label 防重叠自动偏转；
  - legend 显示在轴范围内（echarts 会包含轴的 label 区域）
  - 柱状图 hover 态，高亮背景的显示
  - maker 因图表类型而异
  - tooltip 易定制
  - 高度、宽度自适应
