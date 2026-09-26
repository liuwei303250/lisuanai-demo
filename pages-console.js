/* ============ 控制台 二级/三级页面 ============ */

/* ---- 二级 · 概览 ---- */
page({ path:'/console', title:'概览', level:2, group:'console', crumb:['概览'], render(){
  return `
  <div class="stat-grid">
    ${statCard('账户余额', '¥86.42', '充值 →', '')}
    ${statCard('今日消费', '¥0.12', '↑ 3.2% 较昨日')}
    ${statCard('今日调用', '1,284 次', '↑ 8.1%')}
    ${statCard('可用模型', '212 个', '文本/图像/视频/向量')}
  </div>
  <div class="card"><h3>近 7 日调用趋势</h3>${bar([32,45,38,60,55,72,88])}</div>
  <div class="card"><h3>模型用量 TOP 5</h3>${table(['模型','调用次数','Token 用量','费用','占比'],[
    ['deepseek-v4-flash','6,420','12.8M','¥3.84','45%'],
    ['claude-sonnet-4-6','2,150','3.2M','¥9.60','28%'],
    ['gpt-4o-mini','1,860','2.1M','¥1.26','11%'],
    ['kimi-k2.5','640','0.9M','¥1.08','8%'],
    ['其他','510','0.7M','¥0.82','8%'],
  ])}</div>
  <div class="card"><h3>最新动态</h3>
    <p style="font-size:13px;color:var(--ink2)">🟢 今日 14:32 · 充值 ¥50 到账（赠 ¥2.5）</p>
    <p style="font-size:13px;color:var(--ink2)">🔑 今日 14:30 · 创建密钥「生产环境」</p>
    <p style="font-size:13px;color:var(--ink2)">💰 昨日 22:10 · 佣金 +¥3.20（来自二级下线）</p>
  </div>`;
}});

/* ---- 二级 · 在线体验 ---- */
page({ path:'/console/playground', title:'在线体验', level:2, group:'console', crumb:['在线体验'], render(){
  return `<div class="tabbar">
    <a class="on" href="#/console/playground/chat">文本对话</a>
    <a href="#/console/playground/image">图像生成</a>
    <a href="#/console/playground/video">视频生成</a>
  </div>
  <div class="alert info">在线体验直接使用账户余额计费（与 API 调用同价）。选择一个入口开始体验 →</div>
  <div class="lp-grid g3" style="margin-top:6px">
    <div class="lp-card"><div class="ico">💬</div><h3>文本对话</h3><p>流式输出 · 多模型对比 · 系统提示词 · 参数调节</p><a href="#/console/playground/chat" class="btn btn-ghost btn-sm" style="margin-top:12px">进入 →</a></div>
    <div class="lp-card"><div class="ico">🎨</div><h3>图像生成</h3><p>文生图 / 图生图 · 1K/2K 分辨率 · 按张计费</p><a href="#/console/playground/image" class="btn btn-ghost btn-sm" style="margin-top:12px">进入 →</a></div>
    <div class="lp-card"><div class="ico">🎬</div><h3>视频生成</h3><p>文生视频 / 图生视频 · 720p/480p · 按次计费</p><a href="#/console/playground/video" class="btn btn-ghost btn-sm" style="margin-top:12px">进入 →</a></div>
  </div>`;
}});

/* ---- 二级 · API 密钥 ---- */
page({ path:'/console/keys', title:'API 密钥', level:2, group:'console', crumb:['API 密钥'], render(){
  return `
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
    <div class="alert brand" style="margin:0;flex:1">密钥请妥善保管，泄露可能造成资金损失。支持限流、模型白名单、IP 白名单。</div>
    <a class="btn btn-primary" href="#/console/keys/create">+ 创建密钥</a>
  </div>
  ${table(['名称','密钥','状态','用量/限额','RPM 限制','模型白名单','最近使用','操作'],[
    ['生产环境','sk-0d4e23c****2f71',badge('启用','green'),'826.1万 / 不限', '60','全部','2026-09-26 14:46','<a href="#/console/keys/1">详情</a> · <a href="#/console/keys/1/edit">编辑</a>'],
    ['测试用','sk-Hc3GN****aOmV',badge('启用','green'),'3 / 10万','30','deepseek-*','2026-09-26 15:03','<a href="#/console/keys/2">详情</a> · <a href="#/console/keys/2/edit">编辑</a>'],
    ['已停用','sk-xxxx****xxxx',badge('已停用','gray'),'0 / 5万','—','—','2026-08-12','<a href="#/console/keys/3">详情</a>'],
  ])}`;
}});
page({ path:'/console/keys/create', title:'创建 API 密钥', level:3, parent:'API 密钥', group:'console', crumb:['API 密钥','创建密钥'], render(){
  return `<div class="card" style="max-width:640px">
    ${formRow('密钥名称','<input class="inp" placeholder="如：生产环境">','用于区分密钥用途',true)}
    ${formRow('RPM 限制','<input class="inp" value="60">','每分钟最大请求数，防止密钥被刷',false)}
    ${formRow('日调用限额','<input class="inp" placeholder="0 表示不限">','按天限额（次）',false)}
    ${formRow('额度上限','<input class="inp" placeholder="0 表示不限">','该密钥最多可消费的额度',false)}
    ${formRow('模型白名单','<textarea class="inp" placeholder="留空=全部模型；如 deepseek-v4-flash, gpt-4o-mini"></textarea>','仅允许白名单内模型',false)}
    ${formRow('IP 白名单','<textarea class="inp" placeholder="留空=不限；支持 CIDR，如 1.2.3.4/32"></textarea>','仅白名单 IP 可调用',false)}
    <div style="margin-left:134px"><a class="btn btn-primary" href="#/console/keys">创建密钥</a> <a class="btn btn-ghost" href="#/console/keys">取消</a></div>
  </div>`;
}});

/* ---- 二级 · 调用日志 ---- */
page({ path:'/console/logs', title:'调用日志', level:2, group:'console', crumb:['调用日志'], render(){
  return `
  <div class="card" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
    <input class="inp" style="width:180px" placeholder="日期范围">
    <input class="inp" style="width:140px" placeholder="模型">
    <input class="inp" style="width:140px" placeholder="密钥">
    <select class="inp" style="width:120px"><option>全部状态</option><option>成功</option><option>失败</option></select>
    <button class="btn btn-primary btn-sm">查询</button>
    <button class="btn btn-ghost btn-sm">导出 CSV</button>
  </div>
  ${table(['时间','模型','密钥','输入/输出 Token','费用','渠道','状态','耗时','操作'],[
    ['09-26 15:03:14','deepseek-v4-flash','claude','84 / 1','¥0.000012','xy2',badge('成功','green'),'1.2s','<a href="#/console/logs/1">详情</a>'],
    ['09-26 14:46:39','deepseek-v4-flash','默认密钥','31 / 1','¥0.000039','xy2',badge('成功','green'),'0.9s','<a href="#/console/logs/2">详情</a>'],
    ['09-26 11:20:05','claude-sonnet-4-6','生产环境','1,204 / 356','¥0.046','ab7',badge('重试后成功','amber'),'3.8s','<a href="#/console/logs/3">详情</a>'],
    ['09-26 09:01:11','gpt-5.5','生产环境','—','¥0',badge('—','gray'),badge('失败(熔断)','red'),'—','<a href="#/console/logs/4">详情</a>'],
  ])}`;
}});

/* ---- 二级 · 充值中心 ---- */
page({ path:'/console/recharge', title:'充值中心', level:2, group:'console', crumb:['充值中心'], render(){
  return `
  <div class="tabbar"><a class="on" href="#/console/recharge">购买套餐</a><a href="#/console/recharge/orders">订单记录</a></div>
  <div class="alert brand">当前余额 ¥86.42 · 余额永久有效，无有效期限制</div>
  <div class="lp-grid g4">
    ${[
      ['体验套餐','¥1','赠 ¥0','适合个人体验',''],
      ['基础套餐','¥50','赠 ¥2.5（5%）','适合个人开发者','推荐'],
      ['标准套餐','¥200','赠 ¥15（7.5%）','适合小团队',''],
      ['企业套餐','¥1000','赠 ¥100（10%）','对公转账 · 可开专票',''],
    ].map(([n,pr,g,d,t])=>`<div class="lp-card" style="text-align:center;${t?'border:2px solid var(--brand)':''}">
      ${t?`<div class="badge brand">${t}</div>`:'<div style="height:20px"></div>'}
      <h3>${n}</h3><div style="font-size:28px;font-weight:700;margin:8px 0">${pr}</div>
      <p style="color:var(--green)">${g}</p><p style="color:var(--ink3);font-size:12px;margin:8px 0 14px">${d}</p>
      <a class="btn ${t?'btn-primary':'btn-ghost'}" href="#/console/recharge/result">立即购买</a>
    </div>`).join('')}
  </div>
  <div class="card"><h3>支付方式</h3><p style="font-size:13px;color:var(--ink2)">💚 微信支付　💙 支付宝　🏦 对公转账（联系客服获取账户）　🪙 USDT</p></div>`;
}});
page({ path:'/console/recharge/orders', title:'订单记录', level:3, parent:'充值中心', group:'console', crumb:['充值中心','订单记录'], render(){
  return `${table(['订单号','套餐','金额','赠额','支付方式','状态','时间','操作'],[
    ['LS20260926143201','基础套餐','¥50','¥2.5','微信支付',badge('已支付','green'),'2026-09-26 14:32','<a href="#/console/recharge/orders/1">详情</a>'],
    ['LS20260920081233','体验套餐','¥1','¥0','支付宝',badge('已支付','green'),'2026-09-20 08:12','<a href="#/console/recharge/orders/2">详情</a>'],
    ['LS20260915093010','标准套餐','¥200','¥15','对公转账',badge('待审核','amber'),'2026-09-15 09:30','<a href="#/console/recharge/orders/3">详情</a>'],
  ])}`;
}});
page({ path:'/console/recharge/result', title:'支付结果', level:3, parent:'充值中心', group:'console', crumb:['充值中心','支付结果'], render(){
  return `<div class="card" style="text-align:center;padding:56px">
    <div style="font-size:56px">✅</div>
    <h3 style="font-size:20px;margin:12px 0">支付成功</h3>
    <p style="color:var(--ink3)">订单号 LS20260926143201 · 实付 ¥50 · 到账 ¥52.5（含赠额 ¥2.5）</p>
    <div style="margin-top:24px"><a class="btn btn-primary" href="#/console">返回概览</a> <a class="btn btn-ghost" href="#/console/keys">去创建密钥</a></div>
  </div>`;
}});

/* ---- 二级 · 余额转让 ---- */
page({ path:'/console/transfer', title:'余额转让', level:2, group:'console', crumb:['余额转让'], render(){
  return `<div class="tabbar"><a class="on" href="#/console/transfer">发起转让</a><a href="#/console/transfer/history">转让记录</a></div>
  <div class="card" style="max-width:640px">
    <div class="alert warn">余额转让为站内额度互转：最小 ¥10、须为 10 的整数倍、需支付密码；转让金额不参与任何分佣结算。</div>
    ${formRow('对方账号','<input class="inp" placeholder="手机号 / 用户名 / 邀请码">','',true)}
    ${formRow('转让金额','<input class="inp" value="100">','当前可转余额 ¥86.42',true)}
    ${formRow('支付密码','<input class="inp" type="password">','',true)}
    ${formRow('备注','<input class="inp" placeholder="选填">','')}
    <div style="margin-left:134px"><a class="btn btn-primary" href="#/console/transfer">确认转让</a></div>
  </div>`;
}});
page({ path:'/console/transfer/history', title:'转让记录', level:3, parent:'余额转让', group:'console', crumb:['余额转让','转让记录'], render(){
  return `${table(['时间','方向','对方账号','金额','状态','备注','操作'],[
    ['2026-09-18 10:22','转出','176****2533','¥100',badge('已完成','green'),'设备采购','<a href="#/console/transfer/history/1">详情</a>'],
    ['2026-09-02 16:40','转入','137****8890','¥50',badge('已完成','green'),'—','<a href="#/console/transfer/history/2">详情</a>'],
  ])}`;
}});

/* ---- 二级 · 供应商中心 ---- */
page({ path:'/console/supplier', title:'供应商中心', level:2, group:'console', crumb:['供应商中心'], render(){
  return `<div class="stat-grid">
    ${statCard('本月结算额','¥3,240','待结算 ¥860')}
    ${statCard('在售渠道','5 个','3 正常 · 1 熔断 · 1 待审核')}
    ${statCard('本月调用量','86.4万 次','↑ 12%')}
    ${statCard('健康评分','92 分','优秀')}
  </div>
  <div class="lp-grid g4">
    <div class="lp-card"><div class="ico">🏭</div><h3>渠道管理</h3><p>新建渠道 · 余额/密钥托管 · 熔断与重试</p><a href="#/console/supplier/channels" class="btn btn-ghost btn-sm" style="margin-top:10px">管理 →</a></div>
    <div class="lp-card"><div class="ico">💰</div><h3>价格设置</h3><p>渠道×模型定价矩阵 · 倍率调整</p><a href="#/console/supplier/pricing" class="btn btn-ghost btn-sm" style="margin-top:10px">设置 →</a></div>
    <div class="lp-card"><div class="ico">📄</div><h3>结算账单</h3><p>T+1 结算单 · 明细导出</p><a href="#/console/supplier/bills" class="btn btn-ghost btn-sm" style="margin-top:10px">查看 →</a></div>
    <div class="lp-card"><div class="ico">📈</div><h3>健康报告</h3><p>错误率 / P99 / 熔断次数周报</p><a href="#/console/supplier/health" class="btn btn-ghost btn-sm" style="margin-top:10px">查看 →</a></div>
  </div>`;
}});
page({ path:'/console/supplier/channels', title:'渠道列表', level:3, parent:'供应商中心', group:'console', crumb:['供应商中心','渠道管理'], render(){
  return `<div style="text-align:right;margin-bottom:12px"><a class="btn btn-primary" href="#/console/supplier/channels/create">+ 新建渠道</a></div>
  ${table(['渠道','类型','模型数','余额','状态','成功率','今日调用','操作'],[
    ['深算云 · DeepSeek','模型原厂','8','¥1,240',badge('启用','green'),'99.2%','4.2万','<a href="#/console/supplier/channels/1">详情</a>'],
    ['星河AI · 中转','中转站','45','$86',badge('启用','green'),'98.6%','2.1万','<a href="#/console/supplier/channels/2">详情</a>'],
    ['某某 · Claude 直连','独立账号','3','$12',badge('熔断中','amber'),'89.1%','0.3万','<a href="#/console/supplier/channels/3">详情</a>'],
    ['新渠道 · 待审核','个人中转站','—','—',badge('待审核','gray'),'—','—','<a href="#/console/supplier/channels/4">详情</a>'],
  ])}`;
}});
page({ path:'/console/supplier/channels/create', title:'新建渠道', level:3, parent:'供应商中心', group:'console', crumb:['供应商中心','渠道管理','新建渠道'], render(){
  return `<div class="card" style="max-width:640px">
    ${formRow('渠道名称','<input class="inp" placeholder="如：深算云 DeepSeek">','',true)}
    ${formRow('渠道类型','<select class="inp"><option>模型原厂</option><option>公有云</option><option>Token 工厂</option><option>聚合平台</option><option>个人中转站</option></select>','',true)}
    ${formRow('Base URL','<input class="inp" placeholder="https://api.xxx.com/v1">','',true)}
    ${formRow('API Key','<input class="inp" placeholder="sk-...">','AES-256 加密托管，仅管理员可见',true)}
    ${formRow('模型映射','<textarea class="inp" placeholder="上游模型名=对外模型名，每行一条"></textarea>','渠道模型名与平台模型名不一致时配置',false)}
    ${formRow('竞价权重','<input class="inp" value="10">','路由选择权重，越大越优先',false)}
    <div style="margin-left:134px"><a class="btn btn-primary" href="#/console/supplier/channels">保存并测试</a> <a class="btn btn-ghost" href="#/console/supplier/channels">取消</a></div>
  </div>`;
}});
page({ path:'/console/supplier/pricing', title:'价格设置', level:3, parent:'供应商中心', group:'console', crumb:['供应商中心','价格设置'], render(){
  return `${table(['渠道','模型','对外单价(输入/输出)','拿货价','利润率','倍率','操作'],[
    ['深算云','deepseek-v4-flash','¥0.0012 / ¥0.0096','¥0.001 / ¥0.008','20%','1.2','<a href="#/console/supplier/channels/1/mapping">编辑</a>'],
    ['深算云','deepseek-v4-pro','¥0.005 / ¥0.04','¥0.004 / ¥0.032','25%','1.25','<a href="#/console/supplier/channels/1/mapping">编辑</a>'],
    ['星河AI','claude-sonnet-4-6','¥0.016 / ¥0.085','¥0.014 / ¥0.075','13%','1.13','<a href="#/console/supplier/channels/2/mapping">编辑</a>'],
  ])}`;
}});
page({ path:'/console/supplier/bills', title:'结算账单', level:3, parent:'供应商中心', group:'console', crumb:['供应商中心','结算账单'], render(){
  return `${table(['账期','结算金额','调用量','状态','出账时间','操作'],[
    ['2026-09-01 ~ 09-15','¥1,680','42.3万',badge('已结算','green'),'2026-09-16 05:00','<a href="#/console/supplier/bills/1">详情</a>'],
    ['2026-09-16 ~ 09-25','¥860','26.1万',badge('待结算','amber'),'T+1 自动出账','<a href="#/console/supplier/bills/2">详情</a>'],
  ])}`;
}});
page({ path:'/console/supplier/health', title:'健康报告', level:3, parent:'供应商中心', group:'console', crumb:['供应商中心','健康报告'], render(){
  return `<div class="card"><h3>本周渠道健康（09-19 ~ 09-26）</h3>
  ${table(['渠道','成功率','错误率','P99 延迟','熔断次数','健康评分'],[
    ['深算云','99.2%','0.8%','2.1s','0','95',],
    ['星河AI','98.6%','1.4%','3.4s','0','92'],
    ['Claude 直连','89.1%','10.9%','8.2s','2','71'],
  ])}</div>
  <div class="alert warn">「Claude 直连」错误率连续 2 天超 10%，建议检查上游余额或下线该渠道。</div>`;
}});

/* ---- 二级 · 代理后台 ---- */
page({ path:'/console/agent', title:'代理后台', level:2, group:'console', crumb:['代理后台'], render(){
  return `<div class="stat-grid">
    ${statCard('本月佣金','¥1,268','可提现 ¥420')}
    ${statCard('名下客户','86 人','一级 42 · 二级 44')}
    ${statCard('客户本月消费','¥8,540','↑ 18%')}
    ${statCard('代理费率','15%','阶梯：10%–20%')}
  </div>
  <div class="lp-grid g4">
    <div class="lp-card"><div class="ico">👥</div><h3>客户管理</h3><p>客户列表 · 消费明细 · 折扣设置</p><a href="#/console/agent/clients" class="btn btn-ghost btn-sm" style="margin-top:10px">管理 →</a></div>
    <div class="lp-card"><div class="ico">🏷️</div><h3>折扣模板</h3><p>模型折扣模板 · 批量下发</p><a href="#/console/agent/templates" class="btn btn-ghost btn-sm" style="margin-top:10px">管理 →</a></div>
    <div class="lp-card"><div class="ico">📄</div><h3>结算单</h3><p>月度结算 · 明细导出</p><a href="#/console/agent/settlements" class="btn btn-ghost btn-sm" style="margin-top:10px">查看 →</a></div>
    <div class="lp-card"><div class="ico">💸</div><h3>提现记录</h3><p>提现审核进度</p><a href="#/console/agent/withdrawals" class="btn btn-ghost btn-sm" style="margin-top:10px">查看 →</a></div>
  </div>`;
}});
page({ path:'/console/agent/clients', title:'客户管理', level:3, parent:'代理后台', group:'console', crumb:['代理后台','客户管理'], render(){
  return `${table(['客户','层级','本月消费','累计消费','佣金贡献','折扣','状态','操作'],[
    ['176****2533','一级','¥1,240','¥6,800','¥186','9 折',badge('活跃','green'),'<a href="#/console/agent/clients/1">详情</a>'],
    ['138****1102','一级','¥860','¥2,400','¥129','95 折',badge('活跃','green'),'<a href="#/console/agent/clients/2">详情</a>'],
    ['159****7781','二级','¥120','¥540','¥18','无',badge('活跃','green'),'<a href="#/console/agent/clients/3">详情</a>'],
    ['137****3345','一级','¥0','¥320','¥0','无',badge('沉默','gray'),'<a href="#/console/agent/clients/4">详情</a>'],
  ])}`;
}});
page({ path:'/console/agent/templates', title:'折扣模板', level:3, parent:'代理后台', group:'console', crumb:['代理后台','折扣模板'], render(){
  return `<div style="text-align:right;margin-bottom:12px"><a class="btn btn-primary" href="#/console/agent/templates">+ 新建模板</a></div>
  ${table(['模板名','模型范围','折扣','适用客户数','更新时间','操作'],[
    ['大客户 9 折','全部文本模型','9 折','12','2026-09-20','<a href="#/console/agent/clients/1/discount">编辑</a> · 批量下发'],
    ['DeepSeek 促销','deepseek-*','85 折','36','2026-09-15','<a href="#/console/agent/clients/1/discount">编辑</a> · 批量下发'],
  ])}`;
}});
page({ path:'/console/agent/settlements', title:'结算单', level:3, parent:'代理后台', group:'console', crumb:['代理后台','结算单'], render(){
  return `${table(['账期','客户消费','佣金费率','佣金金额','代扣税','实发','状态','操作'],[
    ['2026-08','¥6,540','15%','¥981','¥0','¥981',badge('已结算','green'),'<a href="#/console/agent/settlements/1">详情</a>'],
    ['2026-09','¥8,540','15%','¥1,281','¥0','¥1,281',badge('结算中','amber'),'<a href="#/console/agent/settlements/2">详情</a>'],
  ])}`;
}});
page({ path:'/console/agent/withdrawals', title:'提现记录', level:3, parent:'代理后台', group:'console', crumb:['代理后台','提现记录'], render(){
  return `${table(['申请时间','金额','收款方式','状态','审核备注','操作'],[
    ['2026-09-05 10:12','¥420','支付宝',badge('已打款','green'),'—','<a href="#/console/agent/withdrawals/1">详情</a>'],
    ['2026-08-02 09:40','¥981','银行卡',badge('已打款','green'),'—','<a href="#/console/agent/withdrawals/2">详情</a>'],
  ])}`;
}});

/* ---- 二级 · 推广分销 ---- */
page({ path:'/console/affiliate', title:'推广分销', level:2, group:'console', crumb:['推广分销'], render(){
  return `<div class="tabbar">
    <a class="on" href="#/console/affiliate">推广概览</a>
    <a href="#/console/affiliate/level1">一级下线</a>
    <a href="#/console/affiliate/level2">二级下线</a>
    <a href="#/console/affiliate/commissions">佣金记录</a>
    <a href="#/console/affiliate/withdraw">佣金提现</a>
    <a href="#/console/affiliate/links">邀请链接</a>
    <a href="#/console/affiliate/join">代理加盟</a>
  </div>
  <div class="stat-grid">
    ${statCard('邀请码','langzhi','好友注册时填写')}
    ${statCard('累计佣金','¥2,180','可提现 ¥420')}
    ${statCard('一级下线','42 人','消费返佣 5%')}
    ${statCard('二级下线','44 人','消费返佣 5%')}
  </div>
  <div class="card"><h3>推广规则</h3>
    <p style="font-size:13px;color:var(--ink2)">✅ 好友通过您的邀请链接注册 → 自动绑定推广关系</p>
    <p style="font-size:13px;color:var(--ink2)">💰 好友每次消费，您自动获得 <b>5%</b> 佣金；好友的好友消费，您再获 <b>5%</b></p>
    <p style="font-size:13px;color:var(--ink2)">💸 佣金可提现（≥¥10），需实名认证；转让与赠额不参与分佣</p>
  </div>
  <div class="card"><h3>佣金趋势</h3>${bar([20,32,28,45,40,55,68])}</div>`;
}});
page({ path:'/console/affiliate/level1', title:'一级下线', level:3, parent:'推广分销', group:'console', crumb:['推广分销','一级下线'], render(){
  return `${table(['下线用户','注册时间','累计消费','佣金比例','累计佣金','状态','操作'],[
    ['176****2533','2026-07-02','¥6,800','5%','¥340',badge('活跃','green'),'<a href="#/console/affiliate/level1/1">详情</a>'],
    ['138****1102','2026-07-18','¥2,400','5%','¥120',badge('活跃','green'),'<a href="#/console/affiliate/level1/2">详情</a>'],
    ['137****3345','2026-08-11','¥320','5%','¥16',badge('沉默','gray'),'<a href="#/console/affiliate/level1/4">详情</a>'],
  ])}`;
}});
page({ path:'/console/affiliate/level2', title:'二级下线', level:3, parent:'推广分销', group:'console', crumb:['推广分销','二级下线'], render(){
  return `${table(['下线用户','上级','注册时间','累计消费','累计佣金','状态','操作'],[
    ['159****7781','176****2533','2026-08-20','¥540','¥27',badge('活跃','green'),'<a href="#/console/affiliate/level2/1">详情</a>'],
    ['180****9921','138****1102','2026-09-03','¥96','¥4.8',badge('活跃','green'),'<a href="#/console/affiliate/level2/2">详情</a>'],
  ])}`;
}});
page({ path:'/console/affiliate/commissions', title:'佣金记录', level:3, parent:'推广分销', group:'console', crumb:['推广分销','佣金记录'], render(){
  return `${table(['时间','来源','层级','消费金额','佣金','状态'],[
    ['2026-09-26 11:20','176****2533 消费','一级','¥120','¥6.00',badge('已入账','green')],
    ['2026-09-25 20:15','159****7781 消费','二级','¥60','¥3.00',badge('已入账','green')],
    ['2026-09-24 09:02','138****1102 消费','一级','¥45','¥2.25',badge('已入账','green')],
  ])}`;
}});
page({ path:'/console/affiliate/withdraw', title:'佣金提现', level:3, parent:'推广分销', group:'console', crumb:['推广分销','佣金提现'], render(){
  return `<div class="card" style="max-width:640px">
    <div class="alert info">可提现佣金 <b>¥420</b> · 最低提现 ¥10 · 需先完成实名认证</div>
    ${formRow('提现金额','<input class="inp" value="420">','',true)}
    ${formRow('收款方式','<select class="inp"><option>支付宝</option><option>微信</option><option>银行卡</option></select>','',true)}
    ${formRow('收款账号','<input class="inp">','',true)}
    ${formRow('收款人姓名','<input class="inp" placeholder="须与实名认证一致">','',true)}
    <div style="margin-left:134px"><a class="btn btn-primary" href="#/console/affiliate/withdraw">提交提现申请</a></div>
  </div>`;
}});
page({ path:'/console/affiliate/join', title:'代理加盟', level:3, parent:'推广分销', group:'console', crumb:['推广分销','代理加盟'], render(){
  return `<div class="card" style="max-width:720px">
    <h3>代理加盟申请</h3>
    <div class="alert brand">阶梯式返佣 10%–20%，按月结算，无业绩压力。申请通过后开通专属代理后台。</div>
    ${formRow('联系人','<input class="inp">','',true)}
    ${formRow('联系电话','<input class="inp">','',true)}
    ${formRow('推广渠道','<select class="inp"><option>自有社群</option><option>自媒体/公众号</option><option>淘宝/闲鱼店铺</option><option>线下渠道</option><option>其他</option></select>','',true)}
    ${formRow('自我介绍','<textarea class="inp" placeholder="推广资源与经验简介"></textarea>','',true)}
    ${formRow('资质附件','<button class="btn btn-ghost btn-sm">上传文件</button>','营业执照/身份证（选填，通过率更高）',false)}
    <div style="margin-left:134px"><a class="btn btn-primary" href="#/console/affiliate">提交申请</a></div>
  </div>`;
}});
page({ path:'/console/affiliate/links', title:'邀请链接与海报', level:3, parent:'推广分销', group:'console', crumb:['推广分销','邀请链接'], render(){
  return `<div class="card" style="max-width:720px">
    <h3>专属邀请链接</h3>
    <div class="key-box">https://www.lisuanai.cn/register?invite=langzhi<span class="copy">复制</span></div>
    <div class="hint">好友通过此链接注册后自动绑定推广关系，双方各得 ¥2 体验金</div>
  </div>
  <div class="lp-grid g3">
    <div class="lp-card" style="text-align:center"><div class="chart-placeholder" style="height:160px">海报 1</div><p style="margin-top:10px"><a class="btn btn-ghost btn-sm">下载海报</a></p></div>
    <div class="lp-card" style="text-align:center"><div class="chart-placeholder" style="height:160px">海报 2</div><p style="margin-top:10px"><a class="btn btn-ghost btn-sm">下载海报</a></p></div>
    <div class="lp-card" style="text-align:center"><div class="chart-placeholder" style="height:160px">海报 3</div><p style="margin-top:10px"><a class="btn btn-ghost btn-sm">下载海报</a></p></div>
  </div>`;
}});

/* ---- 二级 · 发票中心 ---- */
page({ path:'/console/invoice', title:'发票中心', level:2, group:'console', crumb:['发票中心'], render(){
  return `<div class="tabbar"><a class="on" href="#/console/invoice">申请开票</a><a href="#/console/invoice/history">发票记录</a></div>
  <div class="card" style="max-width:640px">
    ${formRow('发票类型','<select class="inp"><option>增值税普通发票（电子）</option><option>增值税专用发票</option></select>','',true)}
    ${formRow('抬头类型','<select class="inp"><option>企业</option><option>个人</option></select>','',true)}
    ${formRow('发票抬头','<input class="inp" placeholder="公司全称">','',true)}
    ${formRow('税号','<input class="inp" placeholder="统一社会信用代码">','',true)}
    ${formRow('开票金额','<input class="inp" value="200">','可开票金额 ¥200（近 90 天充值）',true)}
    ${formRow('接收邮箱','<input class="inp">','',true)}
    <div style="margin-left:134px"><a class="btn btn-primary" href="#/console/invoice">提交申请</a></div>
  </div>`;
}});
page({ path:'/console/invoice/history', title:'发票记录', level:3, parent:'发票中心', group:'console', crumb:['发票中心','发票记录'], render(){
  return `${table(['申请时间','发票号','抬头','金额','类型','状态','操作'],[
    ['2026-08-05 10:00','INV20260805001','某科技有限公司','¥200','电子普票',badge('已开具','green'),'<a href="#/console/invoice/history/1">下载</a>'],
    ['2026-09-20 14:30','INV20260920002','某科技有限公司','¥1000','专用发票',badge('开具中','amber'),'<a href="#/console/invoice/history/2">详情</a>'],
  ])}`;
}});

/* ---- 二级 · 客户服务 ---- */
page({ path:'/console/support', title:'客户服务', level:2, group:'console', crumb:['客户服务'], render(){
  return `<div class="tabbar"><a class="on" href="#/console/support/help">帮助中心</a><a href="#/console/support/tickets">我的工单</a><a href="#/console/support/tickets/create">提交工单</a></div>
  <div class="lp-grid g3">
    <div class="lp-card"><div class="ico">🔌</div><h3>快速接入</h3><p>如何创建密钥、替换 Base URL、Python/Node 示例</p><a href="#/docs" class="btn btn-ghost btn-sm" style="margin-top:10px">查看文档 →</a></div>
    <div class="lp-card"><div class="ico">💰</div><h3>计费说明</h3><p>Token 计费口径、缓存折扣、模型单价查询</p><a href="#/pricing" class="btn btn-ghost btn-sm" style="margin-top:10px">查看价格 →</a></div>
    <div class="lp-card"><div class="ico">🎧</div><h3>联系客服</h3><p>7×24 小时在线客服，工单平均响应 10 分钟</p><a href="#/console/support/tickets/create" class="btn btn-ghost btn-sm" style="margin-top:10px">提交工单 →</a></div>
  </div>`;
}});
page({ path:'/console/support/help', title:'帮助中心', level:3, parent:'客户服务', group:'console', crumb:['客户服务','帮助中心'], render(){
  return `${['如何创建 API 密钥？','如何充值？支持哪些支付方式？','Token 如何计费？缓存命中如何优惠？','邀请好友有什么奖励？','佣金如何提现？','余额可以转让给别人吗？','调用报 429 是什么原因？','如何申请代理加盟？']
  .map((q,i)=>`<div class="card" style="margin-bottom:10px;padding:16px 20px"><details><summary style="cursor:pointer;font-weight:600">${i+1}. ${q}</summary><p style="margin-top:10px;color:var(--ink3);font-size:13px">此处为帮助中心答案占位：详细操作步骤与截图说明（Demo 演示）。</p></details></div>`).join('')}`;
}});
page({ path:'/console/support/tickets', title:'我的工单', level:3, parent:'客户服务', group:'console', crumb:['客户服务','我的工单'], render(){
  return `${table(['工单号','主题','类型','状态','最后回复','操作'],[
    ['TK2026092501','密钥调用报 401','技术问题',badge('处理中','amber'),'2026-09-25 18:02','<a href="#/console/support/tickets/1">查看</a>'],
    ['TK2026091002','申请开具专票','财务',badge('已解决','green'),'2026-09-11 09:30','<a href="#/console/support/tickets/2">查看</a>'],
  ])}`;
}});
page({ path:'/console/support/tickets/create', title:'提交工单', level:3, parent:'客户服务', group:'console', crumb:['客户服务','提交工单'], render(){
  return `<div class="card" style="max-width:640px">
    ${formRow('工单类型','<select class="inp"><option>技术问题</option><option>财务/发票</option><option>账号问题</option><option>建议反馈</option><option>其他</option></select>','',true)}
    ${formRow('主题','<input class="inp" placeholder="一句话描述问题">','',true)}
    ${formRow('详细描述','<textarea class="inp" placeholder="请描述问题现象、复现步骤、相关请求 ID（如有）"></textarea>','',true)}
    ${formRow('附件','<button class="btn btn-ghost btn-sm">上传截图/日志</button>','支持 png/jpg/log，≤10MB',false)}
    <div style="margin-left:134px"><a class="btn btn-primary" href="#/console/support/tickets">提交工单</a></div>
  </div>`;
}});

/* ---- 二级 · 个人设置 ---- */
page({ path:'/console/settings', title:'个人设置', level:2, group:'console', crumb:['个人设置'], render(){
  return `<div class="tabbar">
    <a class="on" href="#/console/settings/profile">基本资料</a>
    <a href="#/console/settings/password">修改密码</a>
    <a href="#/console/settings/realname">实名认证</a>
    <a href="#/console/settings/2fa">两步验证</a>
    <a href="#/console/settings/devices">登录设备</a>
    <a href="#/console/settings/notifications">消息通知</a>
  </div>
  <div class="card" style="max-width:640px">
    ${formRow('用户名','<input class="inp" value="langzhi">','',false)}
    ${formRow('手机号','<input class="inp" value="134****5539">','',false)}
    ${formRow('邮箱','<input class="inp" value="3925****@qq.com">','',false)}
    ${formRow('邀请码','<input class="inp" value="langzhi" disabled>','好友注册时填写，不可修改',false)}
    <div style="margin-left:134px"><a class="btn btn-primary" href="#/console/settings">保存修改</a></div>
  </div>`;
}});
page({ path:'/console/settings/password', title:'修改密码', level:3, parent:'个人设置', group:'console', crumb:['个人设置','修改密码'], render(){
  return `<div class="card" style="max-width:640px">
    ${formRow('当前密码','<input class="inp" type="password">','',true)}
    ${formRow('新密码','<input class="inp" type="password">','至少 8 位，含字母与数字',true)}
    ${formRow('确认新密码','<input class="inp" type="password">','',true)}
    <div style="margin-left:134px"><a class="btn btn-primary" href="#/console/settings">确认修改</a></div>
  </div>`;
}});
page({ path:'/console/settings/realname', title:'实名认证', level:3, parent:'个人设置', group:'console', crumb:['个人设置','实名认证'], render(){
  return `<div class="card" style="max-width:640px">
    <div class="alert ok">✅ 已实名认证 · 认证仅留存流水号，敏感信息加密存储，不对外展示</div>
    ${formRow('姓名','<input class="inp" value="陈**">','',false)}
    ${formRow('证件类型','<select class="inp"><option>居民身份证</option><option>护照</option></select>','',false)}
    ${formRow('证件号码','<input class="inp" value="3501**********1234">','',false)}
    <div style="margin-left:134px"><a class="btn btn-primary" href="#/console/settings">重新认证</a></div>
  </div>`;
}});
page({ path:'/console/settings/2fa', title:'两步验证', level:3, parent:'个人设置', group:'console', crumb:['个人设置','两步验证'], render(){
  return `<div class="card" style="max-width:640px">
    <div class="alert warn">⚠️ 两步验证未开启。开启后登录需输入动态验证码，可显著提升账户安全。</div>
    ${formRow('验证方式','<select class="inp"><option>手机短信</option><option>TOTP 动态码（Google Authenticator）</option></select>','',false)}
    ${formRow('当前密码','<input class="inp" type="password">','',true)}
    <div style="margin-left:134px"><a class="btn btn-primary" href="#/console/settings">开启两步验证</a></div>
  </div>`;
}});
page({ path:'/console/settings/devices', title:'登录设备', level:3, parent:'个人设置', group:'console', crumb:['个人设置','登录设备'], render(){
  return `${table(['设备','浏览器','IP','地点','最近登录','操作'],[
    ['Windows 11','Chrome 128','112.49.***.**','福建福州','2026-09-26 15:27',badge('当前设备','brand')],
    ['iPhone 16','Safari 18','119.6.***.**','广东深圳','2026-09-24 09:12','<a href="#/console/settings/devices/2">详情</a> · 强制下线'],
    ['MacBook','Chrome 127','218.5.***.**','上海','2026-09-20 21:45','<a href="#/console/settings/devices/3">详情</a> · 强制下线'],
  ])}`;
}});
page({ path:'/console/settings/notifications', title:'消息通知', level:3, parent:'个人设置', group:'console', crumb:['个人设置','消息通知'], render(){
  return `<div class="card" style="max-width:640px">
    ${[
      ['余额变动提醒','站内信 + 邮件','✓'],
      ['消费告警（单日超 ¥50）','站内信','✓'],
      ['密钥即将到期提醒','站内信 + 短信',''],
      ['渠道熔断通知（供应商）','站内信','✓'],
      ['佣金入账提醒','站内信 + 邮件','✓'],
      ['系统公告','站内信','✓'],
    ].map(([k,v,c])=>`<div class="form-row"><label>${k}</label><div style="padding-top:8px;font-size:13px;color:var(--ink2)">${v}　${c?badge('已开启','green'):badge('未开启','gray')}</div></div>`).join('')}
    <div style="margin-left:134px"><a class="btn btn-primary" href="#/console/settings">保存设置</a></div>
  </div>`;
}});
