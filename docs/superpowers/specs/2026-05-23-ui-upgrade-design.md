# 数智矫正 UI 升级 — 设计规格

## 目标

优化界面动画与视觉呈现，将大部分页面中的 3D 牙齿模型替换为更专业、加载更快的视觉元素。

## 核心决策

| 决策 | 内容 |
|------|------|
| 保留真牙模 | PatientHome（唯一），优化加载体验 |
| 3D 抽象科技元素 | LoginPage（品牌光环+粒子漩涡）、EndingPage（数据球体+雷达扫描） |
| SVG / 数据可视化 | AIAnalysisPage（六维雷达图）、AIDecisionCenter（AI决策流水线）、TreatmentProgress（进度时间轴+环形进度）、PatientDetail（指标卡片组） |
| 删除 | ProjectValue（与 EndingPage 重复） |

## 新增组件

### 1. BrandHalo3D.jsx — 品牌光环 + 粒子漩涡

- 用途：LoginPage 左侧，替代大尺寸牙模
- 元素：多层旋转光环（蓝金渐变）、浮动粒子漩涡、中央品牌图标
- 技术：Three.js 程序化几何体（Torus + Points + Ring），无外部模型
- 体积：~5KB JS
- Props: `{ autoRotate, height }`

### 2. DataSphere3D.jsx — 数据球体 + 雷达扫描

- 用途：EndingPage 中央，替代透明牙模
- 元素：线框经纬球体、环形雷达扫描波、表面热力点云
- 技术：Three.js WireframeGeometry(Sphere) + Torus + Points
- 体积：~4KB JS
- Props: `{ autoRotate, height }`

### 3. RadarChart.jsx — SVG 六维健康雷达图

- 用途：AIAnalysisPage 底部，替代装饰牙模
- 元素：六边形 SVG 雷达图、动态描边动画、各维度标签
- 技术：纯 SVG + framer-motion 动画
- 体积：~2KB JS
- Props: `{ data, labels, color }`

### 4. PipelineFlow.jsx — AI 决策流水线动画

- 用途：AIDecisionCenter 底部，替代"数据流可视化"牙模区
- 元素：4 步骤卡片（数据采集→特征提取→模型推理→决策输出）、粒子流连接线、性能统计
- 技术：flex 布局 + framer-motion 交错动画 + SVG 连接箭头
- 体积：~3KB JS
- Props: `{ steps }`

### 5. SkeletonLoader.jsx — 牙模加载骨架屏

- 用途：PatientHome 牙模加载时的占位 UI
- 元素：脉冲光环 + "正在加载牙齿模型..." 文字
- 技术：CSS animation + framer-motion opacity pulse
- 体积：~1KB JS

## 页面修改

### LoginPage

- 移除：ToothModel + ParticleBackground Canvas + Environment
- 新增：BrandHalo3D 组件替代
- 保留：右侧登录表单、角色切换、品牌覆盖层

### PatientHome

- 保留：ToothModel + Canvas + Environment
- 新增：SkeletonLoader 加载骨架屏包裹，模型就绪后淡入切换
- 优化：ToothModel 已模块级预加载

### AIAnalysisPage

- 移除：底部 Canvas + ToothModel + 热力标签
- 新增：RadarChart 六维雷达图，数据来自 riskFactors

### AIDecisionCenter

- 移除：底部 Canvas + ToothModel + ParticleBackground
- 新增：PipelineFlow 决策流水线组件

### TreatmentProgress

- 移除：ToothModel + Canvas + Environment
- 新增：环形进度组件 + 疗程时间轴

### PatientDetail

- 移除：ToothModel + Canvas + Environment
- 新增：4 格患者指标概览卡片组

### EndingPage

- 移除：Canvas + ToothModel + Environment + HUD scan line
- 新增：DataSphere3D + 简化光晕背景
- 保留：品牌标语、标签、页脚

### ProjectValue

- 删除：整个页面文件
- App.jsx：移除 lazy import、从页面列表中移除、totalPages 减 1

### App.jsx

- 移除 ProjectValue 的 lazy import
- 更新页面列表
- totalPages = role 相关页面数 + 2（Login + Ending）变为正确值

## 技术约束

- 不引入任何新 npm 依赖
- 所有新组件使用现有技术栈（React + Three.js + framer-motion）
- 保持现有页面布局结构，仅替换 3D 模型区域
- 9 个页面 → 8 个页面（删 ProjectValue）

## 预期效果

- 首屏 JS + 资源总体积从 ~8MB → ~400KB（不计 PatientHome 的 5.4MB 牙模）
- 8 个页面不再等待 OBJ 模型 + 25MB 贴图加载
- 所有页面即时渲染，无需等待外部分模型文件
- 视觉更精致、专业、科技感
