# 中芯力算网站 Demo 设计说明与页面结构梳理

**公司名称**：中芯力算　**域名**：www.lisuanai.cn
**设计参照**：kove.cn（白色 SaaS 落地页 + 深色侧栏控制台 + 卡片化布局）
**交付日期**：2026-09-26　**Demo 文件**：`中芯力算demo\index.html`（位于 E:\claude	oken中转站\，双击即可浏览，无需服务器）

---

## 一、设计规范

| 项目 | 规范 |
|---|---|
| 品牌主色 | 中国红 `#DA251C`（品牌 logo 底色，源自中芯力算_origin.svg） |
| 品牌辅色 | 深红 `#B01E16`、橙 `#F26B1A`、浅红底 `#FEF0EF` |
| 文字色阶 | 主 `#13131C` / 次 `#4B5563` / 弱 `#6B7280` |
| 状态色 | 成功 `#16A34A`、警告 `#D97706`、失败 `#DC2626` |
| 落地页风格 | 白底 + 灰底（#F7F8FA）分区交替、固定毛玻璃导航、圆角卡片（12px）、hover 浮起效果——参照 kove.cn |
| 控制台风格 | 深色侧栏（#13131C）+ 浅灰工作区、统计卡 + 表格 + 标签徽章、面包屑导航 |
| Logo | 真实品牌 logo（assets/logo.png，中芯力算_whiten 红底白字版，圆角裁切） |

## 二、页面总览

**共 68 个页面**：一级 7 · 二级 13 · 三级 28 · 四级 14 · 五级 6（另有 20 个动态路由详情页）。

## 三、完整页面层级（一至五级）

### 一级页面（全局导航，7 个）

| # | 页面 | 路由 | 说明 |
|---|---|---|---|
| 1 | 首页 | / | Hero + 优势 4 卡 + 4 步接入 + 热门模型 + 代理招募 CTA |
| 2 | 模型广场 | /models | 200+ 模型卡片（文本/图像/视频/向量分类筛选） |
| 3 | 价格 | /pricing | 充值套餐 4 档 + 模型单价示例表（含按张/按秒计费） |
| 4 | API 文档 | /docs | Base URL、cURL/Python 快速开始、接口列表 |
| 5 | 登录 | /login | 账号密码登录 |
| 6 | 注册 | /register | 手机验证码注册 + 邀请码（送 ¥2 体验金） |
| 7 | 页面地图 | /sitemap | **自动生成完整 1–5 级页面树，点击直达任意页面** |

### 二级页面（控制台侧栏主菜单，13 个）

| # | 页面 | 路由 |
|---|---|---|
| 1 | 概览 | /console |
| 2 | 在线体验 | /console/playground |
| 3 | API 密钥 | /console/keys |
| 4 | 调用日志 | /console/logs |
| 5 | 充值中心 | /console/recharge |
| 6 | 余额转让 | /console/transfer |
| 7 | 供应商中心 | /console/supplier |
| 8 | 代理后台 | /console/agent |
| 9 | 推广分销 | /console/affiliate |
| 10 | 发票中心 | /console/invoice |
| 11 | 客户服务 | /console/support |
| 12 | 个人设置 | /console/settings |
| 13 | 页面地图 | /sitemap |

### 三级页面（28 个）

| 所属 | 页面 | 路由 |
|---|---|---|
| 在线体验 | 文本对话 / 图像生成 / 视频生成 | /console/playground/{chat,image,video} |
| API 密钥 | 创建密钥 | /console/keys/create |
| 充值中心 | 订单记录 / 支付结果 | /console/recharge/{orders,result} |
| 余额转让 | 转让记录 | /console/transfer/history |
| 供应商中心 | 渠道列表 / 新建渠道 / 价格设置 / 结算账单 / 健康报告 | /console/supplier/{channels,channels/create,pricing,bills,health} |
| 代理后台 | 客户管理 / 折扣模板 / 结算单 / 提现记录 | /console/agent/{clients,templates,settlements,withdrawals} |
| 推广分销 | 一级下线 / 二级下线 / 佣金记录 / 佣金提现 / 代理加盟 / 邀请链接与海报 | /console/affiliate/{level1,level2,commissions,withdraw,join,links} |
| 发票中心 | 发票记录 | /console/invoice/history |
| 客户服务 | 帮助中心 / 我的工单 / 提交工单 | /console/support/{help,tickets,tickets/create} |
| 个人设置 | 基本资料 / 修改密码 / 实名认证 / 两步验证 / 登录设备 / 消息通知 | /console/settings/{profile,password,realname,2fa,devices,notifications} |

### 四级页面（详情/编辑，14 个）

| 所属 | 页面 | 路由 |
|---|---|---|
| API 密钥 | 密钥详情 / 编辑密钥 | /console/keys/:id 与 /console/keys/:id/edit |
| 调用日志 | 调用详情（含计费明细） | /console/logs/:id |
| 充值中心 | 订单详情 | /console/recharge/orders/:id |
| 推广分销 | 下线用户详情 / 佣金明细详情 / 提现详情 | /console/affiliate/level1/:id、commissions/:id、withdraw/:id |
| 余额转让 | 转让详情 | /console/transfer/history/:id |
| 供应商中心 | 渠道详情 / 结算单详情 | /console/supplier/channels/:id、bills/:id |
| 代理后台 | 客户详情 | /console/agent/clients/:id |
| 发票中心 | 发票详情 | /console/invoice/history/:id |
| 客户服务 | 工单详情（对话式） | /console/support/tickets/:id |
| 个人设置 | 设备详情 | /console/settings/devices/:id |

### 五级页面（深层明细，6 个）

| 所属 | 页面 | 路由 |
|---|---|---|
| 供应商中心 | 渠道模型映射 / 更新渠道密钥 / 上游倍率变动 | /console/supplier/channels/:id/{mapping,credential,upstream-changes} |
| 调用日志 | 重试链路·上游尝试瀑布 | /console/logs/:id/attempts |
| 代理后台 | 客户折扣编辑 | /console/agent/clients/:id/discount |
| 客户服务 | 工单评价 | /console/support/tickets/:id/feedback |

## 四、Demo 特色功能点（与竞品实测结论呼应）

1. **页面地图页**：自动生成全站 1–5 级页面树（级别徽章 + 路由 + 父级关系），点击直达——满足"完整展示梳理"要求；
2. **计费明细透明化**：调用详情页展示完整倍率链/折扣链/分时折扣（参照 tokease 实测字段设计）；
3. **重试链路瀑布**：渠道匿名（route_slug）+ 逐次尝试记录（参照 OpenRouter Upstream Requests 设计）；
4. **上游倍率变动检测**：供应商渠道页含每日官方价变动检测与应用（参照 tokease upstream_updates）；
5. **三类钱包隔离**：佣金与余额分列、转让不参与分佣（参照 kove 实测字段结构）；
6. **密钥级管控**：RPM 限流、日限额、额度上限、模型白名单、IP 白名单。

## 五、文件清单

| 文件 | 说明 |
|---|---|
| demo/index.html | Demo 主文件（样式 + 框架），双击打开 |
| demo/assets/logo.png | 品牌 logo（中芯力算_whiten.png 复刻） |
| demo/router.js | 路由框架 + 布局渲染 + 通用组件 |
| demo/pages-landing.js | 一级落地页 + 页面地图 |
| demo/pages-console.js | 二级/三级控制台页面 |
| demo/pages-detail.js | 四级/五级详情页面 |
