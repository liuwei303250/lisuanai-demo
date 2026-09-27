/* ============ 四级 / 五级页面（详情、编辑、深层明细） ============ */

/* ---- 四级 · 密钥详情 ---- */
page({ path:'/console/keys/:id', title:'密钥详情', level:4, parent:'API 密钥', group:'console', crumb:['API 密钥','密钥详情'], render(){
  return `<div class="stat-grid" style="grid-template-columns:repeat(3,1fr)">
    ${statCard('累计调用','12,486 次','近 7 日 1,284')}
    ${statCard('累计 Token','826.1 万','输入 88% / 输出 12%')}
    ${statCard('累计费用','¥247.83','本月 ¥86.42')}
  </div>
  <div class="card"><h3>密钥信息</h3>
    ${table(['字段','值'],[
      ['名称','生产环境'],
      ['密钥','sk-0d4e23c****2f71（完整密钥仅创建时展示一次）'],
      ['状态',badge('启用','green')],
      ['RPM 限制','60 次/分钟'],
      ['日调用限额','不限'],
      ['额度上限','不限'],
      ['模型白名单','全部模型'],
      ['IP 白名单','未设置'],
      ['创建时间','2026-09-26 14:30'],
      ['最近使用','2026-09-26 15:03'],
    ])}</div>
  <div class="card"><h3>近 7 日用量</h3>${bar([30,42,38,55,60,72,80])}</div>
  <div style="display:flex;gap:10px"><a class="btn btn-primary" href="#/console/keys/1/edit">编辑密钥</a><a class="btn btn-ghost" href="#/console/keys">返回列表</a></div>`;
}});
page({ path:'/console/keys/:id/edit', title:'编辑密钥', level:4, parent:'API 密钥', group:'console', crumb:['API 密钥','密钥详情','编辑'], render(){
  return `<div class="card" style="max-width:640px">
    ${formRow('密钥名称','<input class="inp" value="生产环境">','',true)}
    ${formRow('RPM 限制','<input class="inp" value="60">','每分钟最大请求数',false)}
    ${formRow('日调用限额','<input class="inp" value="0">','0 表示不限',false)}
    ${formRow('模型白名单','<textarea class="inp" placeholder="留空=全部模型"></textarea>','',false)}
    ${formRow('IP 白名单','<textarea class="inp" placeholder="留空=不限，支持 CIDR"></textarea>','',false)}
    <div style="margin-left:134px"><a class="btn btn-primary" href="#/console/keys/1">保存修改</a>
    <a class="btn btn-ghost" href="#/console/keys/1">返回详情</a></div>
  </div>`;
}});

/* ---- 四级 · 日志详情 + 五级 · 重试链路 ---- */
page({ path:'/console/logs/:id', title:'调用详情', level:4, parent:'调用日志', group:'console', crumb:['调用日志','调用详情'], render(){
  return `<div class="card"><h3>请求信息</h3>
    ${table(['字段','值'],[
      ['请求 ID','202609261503146218087108268d9d6T6WNHsax'],
      ['时间','2026-09-26 15:03:14'],
      ['模型','deepseek-v4-flash（请求）/ deepseek-v4-flash（实际）'],
      ['密钥','claude'],
      ['IP','112.49.***.**'],
      ['协议','OpenAI Compatible · /v1/chat/completions'],
    ])}</div>
  <div class="card"><h3>计费明细（为什么扣这么多？）</h3>
    ${table(['项目','值'],[
      ['输入 Token','84'],
      ['输出 Token','1'],
      ['模型倍率','0.1466'],
      ['补全倍率','4'],
      ['缓存倍率','0.02（本次未命中）'],
      ['分组倍率','1（default）'],
      ['销售折扣','24%'],
      ['渠道价折扣','24%'],
      ['分时折扣','周末闲时计划（已匹配）'],
      ['首充赠送抵扣','-1000 配额'],
      ['计费来源','余额钱包'],
      ['合计','6 配额（≈ ¥0.000012）'],
    ])}</div>
  <div class="card"><h3>路由信息</h3>
    ${table(['字段','值'],[
      ['渠道','route_slug: xy2（匿名）'],
      ['重试链路','无重试（一次成功）'],
      ['耗时','1.2s（首字节 0.4s）'],
    ])}</div>
  <div style="display:flex;gap:10px"><a class="btn btn-primary" href="#/console/logs/1/attempts">查看重试链路</a><a class="btn btn-ghost" href="#/console/logs">返回列表</a></div>`;
}});
page({ path:'/console/logs/:id/attempts', title:'重试链路 · 上游尝试瀑布', level:5, parent:'调用详情', group:'console', crumb:['调用日志','调用详情','重试链路'], render(){
  return `<div class="alert info">该请求的上游逐次尝试记录（Upstream Attempts）：渠道匿名展示，保护供应商身份。</div>
  ${table(['#','渠道','上游请求时间','状态码','延迟','结果','回退原因'],[
    ['1','route_slug: xy2','15:03:14.012','200','1.2s',badge('成功','green'),'—'],
  ])}
  <div class="card"><h3>失败重试示例（另一请求）</h3>
  ${table(['#','渠道','状态码','延迟','结果','回退原因'],[
    ['1','route_slug: ab7','429','0.6s',badge('失败','red'),'上游限流'],
    ['2','route_slug: cd3','500','0.3s',badge('失败','red'),'上游 5xx'],
    ['3','route_slug: ab7','200','2.1s',badge('成功','green'),'重试成功'],
  ])}</div>`;
}});

/* ---- 四级 · 订单详情 ---- */
page({ path:'/console/recharge/orders/:id', title:'订单详情', level:4, parent:'订单记录', group:'console', crumb:['充值中心','订单记录','订单详情'], render(){
  return `<div class="card" style="max-width:640px">
    ${table(['字段','值'],[
      ['订单号','LS20260926143201'],
      ['套餐','基础套餐（¥50 赠 ¥2.5）'],
      ['支付方式','微信支付'],
      ['支付时间','2026-09-26 14:32:08'],
      ['到账金额','¥52.5（余额 +¥50，赠额 +¥2.5）'],
      ['状态',badge('已支付','green')],
    ])}
    <div style="margin-top:14px"><a class="btn btn-ghost" href="#/console/recharge/orders">返回列表</a></div>
  </div>`;
}});

/* ---- 四级 · 下线用户详情 ---- */
page({ path:'/console/affiliate/level1/:id', title:'下线用户详情', level:4, parent:'一级下线', group:'console', crumb:['推广分销','一级下线','用户详情'], render(){
  return `<div class="stat-grid" style="grid-template-columns:repeat(3,1fr)">
    ${statCard('累计消费','¥6,800','本月 ¥1,240')}
    ${statCard('累计佣金','¥340','本月 ¥62')}
    ${statCard('绑定时间','2026-07-02','已绑定 86 天')}
  </div>
  <div class="card"><h3>消费明细</h3>
    ${table(['时间','模型','消费金额','佣金(5%)'],[
      ['2026-09-26 11:20','claude-sonnet-4-6','¥120','¥6.00'],
      ['2026-09-25 20:15','deepseek-v4-flash','¥18','¥0.90'],
      ['2026-09-24 09:02','gpt-4o-mini','¥45','¥2.25'],
    ])}</div>
  <div><a class="btn btn-ghost" href="#/console/affiliate/level1">返回一级下线</a></div>`;
}});

/* ---- 四级 · 佣金明细详情 ---- */
page({ path:'/console/affiliate/commissions/:id', title:'佣金明细详情', level:4, parent:'佣金记录', group:'console', crumb:['推广分销','佣金记录','明细详情'], render(){
  return `<div class="card" style="max-width:640px">
    ${table(['字段','值'],[
      ['来源','176****2533 的消费（一级下线）'],
      ['消费订单','LS20260926112005 · claude-sonnet-4-6'],
      ['消费金额','¥120'],
      ['佣金比例','5%'],
      ['佣金金额','¥6.00'],
      ['入账时间','2026-09-26 11:20:15'],
      ['状态',badge('已入账','green')],
    ])}
    <div style="margin-top:14px"><a class="btn btn-ghost" href="#/console/affiliate/commissions">返回佣金记录</a></div>
  </div>`;
}});

/* ---- 四级 · 提现详情 ---- */
page({ path:'/console/affiliate/withdraw/:id', title:'提现详情', level:4, parent:'佣金提现', group:'console', crumb:['推广分销','佣金提现','提现详情'], render(){
  return `<div class="card" style="max-width:640px">
    ${table(['字段','值'],[
      ['申请单号','WD20260905001'],
      ['金额','¥420'],
      ['收款方式','支付宝（138****）'],
      ['申请时间','2026-09-05 10:12'],
      ['审核','通过 · 无异常'],
      ['打款时间','2026-09-05 16:40'],
      ['状态',badge('已打款','green')],
    ])}
    <div style="margin-top:14px"><a class="btn btn-ghost" href="#/console/affiliate/withdraw">返回提现</a></div>
  </div>`;
}});

/* ---- 四级 · 转让详情 ---- */
page({ path:'/console/transfer/history/:id', title:'转让详情', level:4, parent:'转让记录', group:'console', crumb:['余额转让','转让记录','转让详情'], render(){
  return `<div class="card" style="max-width:640px">
    ${table(['字段','值'],[
      ['转让单号','TR20260918001'],
      ['方向','转出'],
      ['对方账号','176****2533'],
      ['金额','¥100（不参与任何分佣结算）'],
      ['手续费','¥0'],
      ['备注','设备采购'],
      ['时间','2026-09-18 10:22'],
      ['状态',badge('已完成','green')],
    ])}
    <div style="margin-top:14px"><a class="btn btn-ghost" href="#/console/transfer/history">返回转让记录</a></div>
  </div>`;
}});

/* ---- 四级 · 渠道详情 + 五级 · 模型映射/密钥更新/上游倍率变动 ---- */
page({ path:'/console/supplier/channels/:id', title:'渠道详情', level:4, parent:'渠道列表', group:'console', crumb:['供应商中心','渠道管理','渠道详情'], render(){
  return `<div class="stat-grid" style="grid-template-columns:repeat(4,1fr)">
    ${statCard('渠道余额','¥1,240','预计可用 12 天')}
    ${statCard('今日调用','4.2万 次','成功率 99.2%')}
    ${statCard('P99 延迟','2.1s','近 7 日平均')}
    ${statCard('熔断次数','0','近 7 日')}
  </div>
  <div class="card"><h3>渠道信息</h3>
    ${table(['字段','值'],[
      ['名称','深算云 · DeepSeek'],
      ['类型','模型原厂'],
      ['Base URL','https://api.xxx.com/v1（托管）'],
      ['API Key','sk-****（AES-256 加密托管）'],
      ['状态',badge('启用','green')],
      ['竞价权重','10'],
      ['熔断阈值','连续 5 次失败触发，冷却 300s'],
    ])}</div>
  <div style="display:flex;gap:10px;flex-wrap:wrap">
    <a class="btn btn-primary" href="#/console/supplier/channels/1/mapping">模型映射</a>
    <a class="btn btn-ghost" href="#/console/supplier/channels/1/credential">更新密钥</a>
    <a class="btn btn-ghost" href="#/console/supplier/channels/1/upstream-changes">上游倍率变动（2 条）</a>
    <a class="btn btn-ghost" href="#/console/supplier/channels">返回列表</a>
  </div>`;
}});
page({ path:'/console/supplier/channels/:id/mapping', title:'渠道模型映射', level:5, parent:'渠道详情', group:'console', crumb:['供应商中心','渠道管理','渠道详情','模型映射'], render(){
  return `<div class="alert info">上游模型名与平台模型名不一致时在此映射；映射后前端只显示平台模型名。</div>
  ${table(['上游模型名','平台模型名','输入价(拿货)','输出价(拿货)','对外倍率','操作'],[
    ['deepseek-chat','deepseek-v4-flash','¥0.001','¥0.008','1.2','编辑 · 删除'],
    ['deepseek-reasoner','deepseek-v4-pro','¥0.004','¥0.032','1.25','编辑 · 删除'],
    ['deepseek-coder','deepseek-v4-pro','¥0.004','¥0.032','1.25','编辑 · 删除'],
  ])}
  <a class="btn btn-primary" href="#/console/supplier/channels/1">保存映射</a>`;
}});
page({ path:'/console/supplier/channels/:id/credential', title:'更新渠道密钥', level:5, parent:'渠道详情', group:'console', crumb:['供应商中心','渠道管理','渠道详情','更新密钥'], render(){
  return `<div class="card" style="max-width:640px">
    <div class="alert warn">密钥更新后旧密钥立即失效；系统自动检测 401 并提醒更换。</div>
    ${formRow('当前密钥','<input class="inp" value="sk-****9f2a（已加密）" disabled>','',false)}
    ${formRow('新 API Key','<input class="inp" placeholder="sk-...">','',true)}
    ${formRow('确认','<input class="inp" placeholder="再次输入新 Key">','',true)}
    <div style="margin-left:134px"><a class="btn btn-primary" href="#/console/supplier/channels/1">更新并测试连通性</a></div>
  </div>`;
}});
page({ path:'/console/supplier/channels/:id/upstream-changes', title:'上游倍率变动', level:5, parent:'渠道详情', group:'console', crumb:['供应商中心','渠道管理','渠道详情','上游倍率变动'], render(){
  return `<div class="alert brand">系统每日检测上游官方价格变动，检测到差异后在此确认应用，防止拿货价失真。</div>
  ${table(['检测时间','模型','上游新价(输入/输出)','当前拿货价','差异','状态','操作'],[
    ['2026-09-26 04:00','deepseek-v4-flash','¥0.0009 / ¥0.0075','¥0.001 / ¥0.008','-10%',badge('待应用','amber'),'<a class="btn btn-primary btn-sm">应用</a> <a class="btn btn-ghost btn-sm">忽略</a>'],
    ['2026-09-25 04:00','deepseek-v4-pro','¥0.004 / ¥0.032','¥0.004 / ¥0.032','持平',badge('无变化','gray'),'—'],
  ])}`;
}});

/* ---- 四级 · 结算单详情 ---- */
page({ path:'/console/supplier/bills/:id', title:'结算单详情', level:4, parent:'结算账单', group:'console', crumb:['供应商中心','结算账单','结算单详情'], render(){
  return `<div class="card"><h3>账期 2026-09-01 ~ 09-15</h3>
    ${table(['模型','调用量','Token 用量','结算金额'],[
      ['deepseek-v4-flash','38.2万','7.1M','¥852'],
      ['deepseek-v4-pro','4.1万','1.2M','¥828'],
      ['合计','42.3万','8.3M','¥1,680'],
    ])}
    <div style="margin-top:14px"><button class="btn btn-ghost">导出 CSV</button> <a class="btn btn-ghost" href="#/console/supplier/bills">返回</a></div>
  </div>`;
}});

/* ---- 四级 · 代理客户详情 + 五级 · 折扣编辑 ---- */
page({ path:'/console/agent/clients/:id', title:'客户详情', level:4, parent:'客户管理', group:'console', crumb:['代理后台','客户管理','客户详情'], render(){
  return `<div class="stat-grid" style="grid-template-columns:repeat(3,1fr)">
    ${statCard('累计消费','¥6,800','本月 ¥1,240')}
    ${statCard('佣金贡献','¥340','费率 5%')}
    ${statCard('客户折扣','9 折','模型：全部文本')}
  </div>
  <div class="card"><h3>客户信息</h3>
    ${table(['字段','值'],[
      ['客户账号','176****2533'],
      ['层级','一级下线'],
      ['绑定时间','2026-07-02'],
      ['最近活跃','2026-09-26 11:20'],
    ])}</div>
  <div class="card"><h3>消费明细</h3>
    ${table(['时间','模型','消费','我的佣金(5%)'],[
      ['2026-09-26 11:20','claude-sonnet-4-6','¥120','¥6.00'],
      ['2026-09-25 20:15','deepseek-v4-flash','¥18','¥0.90'],
    ])}</div>
  <div style="display:flex;gap:10px"><a class="btn btn-primary" href="#/console/agent/clients/1/discount">设置模型折扣</a><a class="btn btn-ghost" href="#/console/agent/clients">返回客户列表</a></div>`;
}});
page({ path:'/console/agent/clients/:id/discount', title:'客户折扣编辑', level:5, parent:'客户详情', group:'console', crumb:['代理后台','客户管理','客户详情','折扣编辑'], render(){
  return `<div class="card" style="max-width:640px">
    <div class="alert info">代理可给名下客户设置模型折扣（从代理拿货价出，不影响代理佣金结算）。</div>
    ${formRow('折扣范围','<select class="inp"><option>全部文本模型</option><option>指定模型</option><option>指定模型组</option></select>','',true)}
    ${formRow('折扣力度','<select class="inp"><option>95 折</option><option>9 折（当前）</option><option>85 折</option><option>8 折</option></select>','',true)}
    ${formRow('生效时间','<input class="inp" placeholder="立即生效">','',false)}
    <div style="margin-left:134px"><a class="btn btn-primary" href="#/console/agent/clients/1">保存折扣</a></div>
  </div>`;
}});

/* ---- 四级 · 发票详情 ---- */
page({ path:'/console/invoice/history/:id', title:'发票详情', level:4, parent:'发票记录', group:'console', crumb:['发票中心','发票记录','发票详情'], render(){
  return `<div class="card" style="max-width:640px">
    ${table(['字段','值'],[
      ['发票号','INV20260805001'],
      ['抬头','某科技有限公司'],
      ['税号','9135**********123X'],
      ['金额','¥200（电子普票）'],
      ['申请时间','2026-08-05 10:00'],
      ['状态',badge('已开具','green')],
    ])}
    <div style="margin-top:14px"><button class="btn btn-primary">下载 PDF</button> <a class="btn btn-ghost" href="#/console/invoice/history">返回</a></div>
  </div>`;
}});

/* ---- 四级 · 工单详情 + 五级 · 工单评价 ---- */
page({ path:'/console/support/tickets/:id', title:'工单详情', level:4, parent:'我的工单', group:'console', crumb:['客户服务','我的工单','工单详情'], render(){
  return `<div class="card"><h3>TK2026092501 · 密钥调用报 401</h3>
    <div class="alert info">工单状态：处理中 · 最后回复 2026-09-25 18:02</div>
    <div style="border:1px solid var(--line);border-radius:8px;padding:14px;margin-bottom:12px">
      <p style="font-size:13px;color:var(--ink2)"><b>我</b> · 2026-09-25 17:50</p>
      <p style="font-size:13px;margin-top:6px">用新密钥调用 /v1/chat/completions 一直返回 401，密钥没输错。</p>
    </div>
    <div style="border:1px solid var(--line);border-radius:8px;padding:14px;margin-bottom:12px;background:#fffaf8">
      <p style="font-size:13px;color:var(--ink2)"><b>客服小芯</b> · 2026-09-25 18:02</p>
      <p style="font-size:13px;margin-top:6px">您好，经查该密钥已过期（有效期至 2026-08-21）。请在控制台 → API 密钥 → 编辑，续期后即可恢复调用。</p>
    </div>
    <textarea class="inp" style="width:100%" placeholder="补充说明…"></textarea>
    <div style="margin-top:10px"><a class="btn btn-primary btn-sm" href="#/console/support/tickets/1">回复</a>
    <a class="btn btn-ghost btn-sm" href="#/console/support/tickets/1/feedback">评价工单</a></div>
  </div>`;
}});
page({ path:'/console/support/tickets/:id/feedback', title:'工单评价', level:5, parent:'工单详情', group:'console', crumb:['客户服务','我的工单','工单详情','工单评价'], render(){
  return `<div class="card" style="max-width:560px;text-align:center;padding:40px">
    <h3>为本次服务打分</h3>
    <div style="font-size:42px;margin:18px 0;letter-spacing:8px">⭐⭐⭐⭐<span style="filter:grayscale(1)">⭐</span></div>
    <p style="color:var(--ink3);font-size:13px">4 星 · 很满意</p>
    <textarea class="inp" style="width:100%;margin:16px 0" placeholder="说说您的建议（选填）"></textarea>
    <div><a class="btn btn-primary" href="#/console/support/tickets/1">提交评价</a></div>
  </div>`;
}});

/* ---- 四级 · 设备详情 ---- */
page({ path:'/console/settings/devices/:id', title:'设备详情', level:4, parent:'登录设备', group:'console', crumb:['个人设置','登录设备','设备详情'], render(){
  return `<div class="card" style="max-width:640px">
    ${table(['字段','值'],[
      ['设备','iPhone 16'],
      ['浏览器','Safari 18'],
      ['IP','119.6.***.**（广东深圳）'],
      ['首次登录','2026-09-01 08:22'],
      ['最近登录','2026-09-24 09:12'],
      ['登录次数','47 次'],
      ['状态',badge('正常','green')],
    ])}
    <div style="margin-top:14px"><button class="btn btn-ghost">强制下线</button> <a class="btn btn-ghost" href="#/console/settings/devices">返回列表</a></div>
  </div>`;
}});

/* ---- 四级 · 代理结算单详情(补齐死链接) ---- */
page({ path:'/console/agent/settlements/:id', title:'结算单详情', level:4, parent:'代理后台·结算单', group:'console', crumb:['代理后台','结算单','结算单详情'], render(){ return `
  <div class="card"><h3>账期 2026-08（代理结算单）</h3>
    ${table(['项目','金额'],[
      ['客户消费总额','¥6,540'],
      ['佣金费率','15%'],
      ['佣金金额','¥981'],
      ['代扣税','¥0'],
      ['实发金额','¥981'],
    ])}
    <div style="margin-top:12px"><a class="btn btn-ghost btn-sm">导出 CSV</a> <a class="btn btn-ghost btn-sm" href="#/console/agent/settlements">返回列表</a></div>
  </div>
  <div class="card"><h3>客户消费明细</h3>${table(['客户','消费金额','佣金(15%)'],[
    ['176****2533','¥4,320','¥648'],
    ['138****1102','¥1,860','¥279'],
    ['其他 40 人','¥360','¥54'],
  ])}</div>`; }});

/* ---- 四级 · 代理提现详情(补齐死链接) ---- */
page({ path:'/console/agent/withdrawals/:id', title:'提现详情', level:4, parent:'代理后台·提现记录', group:'console', crumb:['代理后台','提现记录','提现详情'], render(){ return `
  <div class="card" style="max-width:680px">
    ${table(['字段','值'],[
      ['申请单号','AGWD20260905001'],
      ['金额','¥420'],
      ['收款方式','支付宝（138****）'],
      ['申请时间','2026-09-05 10:12'],
      ['审核','通过 · 无异常'],
      ['打款时间','2026-09-05 16:40'],
      ['状态',badge('已打款','green')],
    ])}
    <div style="margin-top:14px"><a class="btn btn-ghost" href="#/console/agent/withdrawals">返回提现记录</a></div>
  </div>`; }});

/* ---- 四级 · 二级下线详情(补齐死链接) ---- */
page({ path:'/console/affiliate/level2/:id', title:'下线用户详情', level:4, parent:'二级下线', group:'console', crumb:['推广分销','二级下线','用户详情'], render(){ return `
  <div class="stat-grid" style="grid-template-columns:repeat(3,1fr)">
    ${statCard('累计消费','¥540','本月 ¥120','💰')}
    ${statCard('累计佣金','¥27','本月 ¥6','🤝')}
    ${statCard('绑定时间','2026-08-20','已绑定 37 天','📅')}
  </div>
  <div class="card"><h3>用户信息</h3>${table(['字段','值'],[
    ['客户账号','159****7781'],
    ['层级','二级下线'],
    ['上级','176****2533（一级下线）'],
    ['最近活跃','2026-09-25 20:15'],
  ])}</div>
  <div class="card"><h3>消费明细</h3>${table(['时间','模型','消费金额','我的佣金(5%)'],[
    ['2026-09-25 20:15','deepseek-v4-flash','¥60','¥3.00'],
    ['2026-09-18 12:40','gpt-4o-mini','¥42','¥2.10'],
  ])}</div>
  <div><a class="btn btn-ghost" href="#/console/affiliate/level2">返回二级下线</a></div>`; }});
