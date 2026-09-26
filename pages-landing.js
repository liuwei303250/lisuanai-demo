/* ============ 落地页（一级页面，参照 kove.cn 白色 SaaS 风格） ============ */

page({ path:'/', title:'首页', level:1, group:'landing', crumb:['首页'], render(){ return `
<section class="lp-hero"><div class="lp-in">
  <h1>中芯力算 · <span class="hl">AI Token 聚合分发平台</span></h1>
  <p>一个 API Key 调用全球主流大模型 —— Claude / GPT / DeepSeek / 千问 / 视频图像全支持。按量计费、余额不过期、多级代理分销，助力开发者与渠道商低成本接入 AI 能力。</p>
  <div style="display:flex;gap:12px;justify-content:center">
    <a class="btn btn-primary" href="#/register">免费注册 · 送 ¥2 体验金</a>
    <a class="btn btn-ghost" href="#/models">浏览模型广场 →</a>
  </div>
  <div style="display:flex;justify-content:center;gap:48px;margin-top:44px;color:var(--ink3);font-size:13px">
    <div><div style="font-size:26px;font-weight:700;color:var(--ink)">200+</div>模型接入</div>
    <div><div style="font-size:26px;font-weight:700;color:var(--ink)">99.9%</div>可用性 SLA</div>
    <div><div style="font-size:26px;font-weight:700;color:var(--ink)">¥0.001</div>起 / 千 Token</div>
    <div><div style="font-size:26px;font-weight:700;color:var(--ink)">7×24h</div>客服支持</div>
  </div>
</div></section>

<section class="lp-sec lp-sec-white"><div class="lp-in">
  <div class="lp-sec-title"><h2>为什么选择中芯力算</h2><p>聚合上游、智能路由、透明计费，把复杂留给我们，把简单留给您</p></div>
  <div class="lp-grid g4">
    <div class="lp-card"><div class="ico">⚡</div><h3>智能路由</h3><p>竞价路由自动选择最优渠道，故障自动熔断切换，多模型 fallback 链保障可用性</p></div>
    <div class="lp-card"><div class="ico">🔐</div><h3>匿名渠道保护</h3><p>渠道以 route_slug 匿名呈现，密钥 AES-256 加密托管，供应商信息永不泄露</p></div>
    <div class="lp-card"><div class="ico">💰</div><h3>透明计费</h3><p>按上游真实 Token 用量计费，逐笔流水可查，缓存命中、推理 Token 分项展示</p></div>
    <div class="lp-card"><div class="ico">🤝</div><h3>多级分销</h3><p>两级推广返佣 + 代理阶梯费率，佣金可提现，专属代理后台与营销物料</p></div>
  </div>
</div></section>

<section class="lp-sec lp-sec-gray"><div class="lp-in">
  <div class="lp-sec-title"><h2>4 步接入</h2><p>从注册到调用，最快 1 分钟</p></div>
  <div class="lp-steps">
    <div class="lp-step"><h3>注册账号</h3><p>手机号验证码注册，自动赠送体验金</p></div>
    <div class="lp-step"><h3>创建 API 密钥</h3><p>控制台一键创建，支持限流与模型白名单</p></div>
    <div class="lp-step"><h3>充值</h3><p>微信 / 支付宝 / 对公转账，套餐赠额最高 10%</p></div>
    <div class="lp-step"><h3>开始调用</h3><p>OpenAI 兼容接口，替换 Base URL 即可</p></div>
  </div>
</div></section>

<section class="lp-sec lp-sec-white"><div class="lp-in">
  <div class="lp-sec-title"><h2>热门模型</h2><p>按量计费，输入 / 输出分价</p></div>
  <div class="lp-grid g3">
    <div class="model-card"><div><span class="model-name">claude-sonnet-4-6</span><span class="model-tag">热</span></div><div class="model-price">输入 <b>¥0.015</b> / 输出 <b>¥0.08</b>（每千 Token）</div><div class="model-meta"><span class="mtag">文本</span><span class="mtag">代码</span><span class="mtag">128K 上下文</span></div></div>
    <div class="model-card"><div><span class="model-name">gpt-5.5</span><span class="model-tag">热</span></div><div class="model-price">输入 <b>¥0.10</b> / 输出 <b>¥0.40</b>（每千 Token）</div><div class="model-meta"><span class="mtag">文本</span><span class="mtag">多模态</span><span class="mtag">工具调用</span></div></div>
    <div class="model-card"><div><span class="model-name">deepseek-v4-flash</span><span class="model-tag">低价</span></div><div class="model-price">输入 <b>¥0.001</b> / 输出 <b>¥0.008</b>（每千 Token）</div><div class="model-meta"><span class="mtag">文本</span><span class="mtag">推理</span><span class="mtag">缓存命中 2 折</span></div></div>
  </div>
</div></section>

<section class="lp-sec lp-sec-gray"><div class="lp-in">
  <div class="lp-sec-title"><h2>代理招募</h2><p>阶梯返佣 10%–20%，按月结算，专属后台</p></div>
  <div class="lp-cta">
    <h2>加入中芯力算代理计划</h2>
    <p style="opacity:.9;margin-bottom:20px">高额佣金返利 · 无业绩压力 · 全渠道扶持 · 结算透明</p>
    <a class="btn" href="#/register">立即申请 →</a>
  </div>
</div></section>`}});

page({ path:'/models', title:'模型广场', level:1, group:'landing', crumb:['模型广场'], render(){ return `
<section class="lp-sec lp-sec-white" style="padding-top:110px"><div class="lp-in">
  <div class="lp-sec-title"><h2>模型广场</h2><p>200+ 模型统一接入，一个 Key 全搞定</p></div>
  <div style="display:flex;gap:8px;justify-content:center;margin-bottom:30px">
    ${['全部','文本对话','推理','图像生成','视频生成','嵌入向量','语音识别','重排序'].map((t,i)=>`<span class="badge ${i===0?'brand':'gray'}" style="font-size:13px;padding:6px 14px;cursor:pointer">${t}</span>`).join('')}
  </div>
  <div class="lp-grid g4">
    ${[
      ['claude-opus-5','¥0.025 / ¥0.12','文本 · 推理 · 代码',['旗舰']],
      ['claude-sonnet-4-6','¥0.015 / ¥0.08','文本 · 代码',['热']],
      ['claude-fable-5-1','¥0.008 / ¥0.04','文本 · 长文写作',['新']],
      ['gpt-5.5','¥0.10 / ¥0.40','文本 · 多模态',['热']],
      ['gpt-4o-mini','¥0.0015 / ¥0.006','轻量 · 高并发',['低价']],
      ['deepseek-v4-flash','¥0.001 / ¥0.008','推理 · 缓存友好',['低价']],
      ['deepseek-v4-pro','¥0.004 / ¥0.032','深度推理',[]],
      ['kimi-k2.5','¥0.006 / ¥0.024','中文长文',[]],
      ['qwen3.7-max','¥0.008 / ¥0.04','中文 · 多模态',[]],
      ['wan2.7-image','¥0.30 / 张','图像生成 1K/2K',['图像']],
      ['seedance-2.0','¥0.43 / 次','视频生成 720p',['视频']],
      ['bge-m3','¥0.0005 / 千 Token','嵌入向量',['向量']],
    ].map(([n,pr,d,tags])=>`<div class="model-card"><div><span class="model-name">${n}</span>${tags.map(t=>`<span class="model-tag">${t}</span>`).join('')}</div><div class="model-price">${pr}</div><div class="model-meta"><span class="mtag">${d}</span></div></div>`).join('')}
  </div>
</div></section>`}});

page({ path:'/pricing', title:'价格', level:1, group:'landing', crumb:['价格'], render(){ return `
<section class="lp-sec lp-sec-white" style="padding-top:110px"><div class="lp-in">
  <div class="lp-sec-title"><h2>价格方案</h2><p>按量计费 · 余额不过期 · 无月费无最低消费</p></div>
  <div class="lp-grid g3" style="max-width:960px;margin:0 auto 48px">
    <div class="lp-card" style="text-align:center"><div class="badge gray">体验</div><h3 style="font-size:26px;margin:10px 0">¥1</h3><p>注册即送 ¥2 体验金</p><p style="color:var(--ink3)">适合个人体验</p></div>
    <div class="lp-card" style="text-align:center;border:2px solid var(--brand)"><div class="badge brand">推荐</div><h3 style="font-size:26px;margin:10px 0">¥50</h3><p>赠 5% 额度（¥2.5）</p><p style="color:var(--ink3)">适合个人开发者</p></div>
    <div class="lp-card" style="text-align:center"><div class="badge gray">企业</div><h3 style="font-size:26px;margin:10px 0">¥1000</h3><p>赠 10% 额度（¥100）</p><p style="color:var(--ink3)">对公转账 · 可开专票</p></div>
  </div>
  <div class="card" style="max-width:960px;margin:0 auto">
    <h3>模型单价示例（每千 Token，输入 / 输出）</h3>
    <table class="tbl"><thead><tr><th>模型</th><th>输入</th><th>输出</th><th>缓存读取</th><th>说明</th></tr></thead><tbody>
      <tr><td>claude-opus-5</td><td>¥0.025</td><td>¥0.12</td><td>¥0.005</td><td>旗舰推理</td></tr>
      <tr><td>claude-sonnet-4-6</td><td>¥0.015</td><td>¥0.08</td><td>¥0.005</td><td>综合首选</td></tr>
      <tr><td>gpt-5.5</td><td>¥0.10</td><td>¥0.40</td><td>—</td><td>多模态</td></tr>
      <tr><td>deepseek-v4-flash</td><td>¥0.001</td><td>¥0.008</td><td>¥0.0002</td><td>极致性价比</td></tr>
      <tr><td>wan2.7-image</td><td colspan="3">¥0.30 / 张（1K）/ ¥0.60 / 张（2K）</td><td>按张计费</td></tr>
      <tr><td>seedance-2.0</td><td colspan="3">¥0.43 / 次（720p）/ 按秒计费可选</td><td>视频任务</td></tr>
    </tbody></table>
  </div>
</div></section>`}});

page({ path:'/docs', title:'API 文档', level:1, group:'landing', crumb:['API 文档'], render(){ return `
<section class="lp-sec lp-sec-white" style="padding-top:110px"><div class="lp-in" style="max-width:860px">
  <div class="lp-sec-title"><h2>API 接入文档</h2><p>OpenAI 兼容接口，替换 Base URL 即可使用</p></div>
  <div class="card"><h3>Base URL</h3><div class="key-box">https://api.lisuanai.cn/v1<span class="copy">复制</span></div>
  <div class="alert info" style="margin-top:12px">鉴权：Authorization: Bearer &lt;您的 API Key&gt;　·　支持 /v1/chat/completions、/v1/embeddings、/v1/images/generations、/v1/models</div></div>
  <div class="card"><h3>快速开始 · cURL</h3><div class="key-box">curl https://api.lisuanai.cn/v1/chat/completions \\<br>&nbsp;&nbsp;-H "Authorization: Bearer sk-xxxx" \\<br>&nbsp;&nbsp;-H "Content-Type: application/json" \\<br>&nbsp;&nbsp;-d '{"model":"deepseek-v4-flash","messages":[{"role":"user","content":"你好"}]}'</div></div>
  <div class="card"><h3>快速开始 · Python</h3><div class="key-box">from openai import OpenAI<br>client = OpenAI(base_url="https://api.lisuanai.cn/v1", api_key="sk-xxxx")<br>r = client.chat.completions.create(model="deepseek-v4-flash",<br>&nbsp;&nbsp;&nbsp;&nbsp;messages=[{"role":"user","content":"你好"}])<br>print(r.choices[0].message.content)</div></div>
  <div class="card"><h3>接口列表</h3><table class="tbl"><thead><tr><th>接口</th><th>说明</th><th>计费</th></tr></thead><tbody>
    <tr><td>POST /v1/chat/completions</td><td>文本对话（含流式 SSE）</td><td>按 Token</td></tr>
    <tr><td>GET /v1/models</td><td>可用模型列表</td><td>免费</td></tr>
    <tr><td>POST /v1/embeddings</td><td>嵌入向量</td><td>按 Token</td></tr>
    <tr><td>POST /v1/images/generations</td><td>图像生成</td><td>按张</td></tr>
    <tr><td>POST /v1/video/generations</td><td>视频生成（异步任务）</td><td>按次/按秒</td></tr>
  </tbody></table></div>
</div></section>`}});

page({ path:'/login', title:'登录', level:1, group:'landing', crumb:['登录'], render(){ return `
<section class="lp-sec" style="padding-top:140px"><div class="lp-in" style="max-width:420px">
  <div class="card"><div style="text-align:center;margin-bottom:20px">${logo(false)}</div>
  <h3 style="text-align:center;font-size:20px;margin-bottom:20px">登录中芯力算</h3>
  <div class="form-row"><label>账号</label><div><input class="inp" placeholder="手机号 / 邮箱 / 用户名"></div></div>
  <div class="form-row"><label>密码</label><div><input class="inp" type="password" placeholder="请输入密码"></div></div>
  <div style="margin:18px 0 10px"><a class="btn btn-primary" style="width:100%" href="#/console">登 录</a></div>
  <div style="display:flex;justify-content:space-between;font-size:13px;color:var(--ink3)"><a href="#/register">注册账号</a><a href="#/login">忘记密码？</a></div>
  </div>
</div></section>`}});

page({ path:'/register', title:'注册', level:1, group:'landing', crumb:['注册'], render(){ return `
<section class="lp-sec" style="padding-top:140px"><div class="lp-in" style="max-width:420px">
  <div class="card"><div style="text-align:center;margin-bottom:20px">${logo(false)}</div>
  <h3 style="text-align:center;font-size:20px;margin-bottom:8px">创建账号</h3>
  <p style="text-align:center;color:var(--ink3);font-size:13px;margin-bottom:20px">注册即送 ¥2 体验金，新用户充值享赠额</p>
  <div class="form-row"><label>手机号</label><div><input class="inp" placeholder="11 位手机号"></div></div>
  <div class="form-row"><label>验证码</label><div style="display:flex;gap:10px"><input class="inp" style="flex:1" placeholder="短信验证码"><button class="btn btn-ghost btn-sm" style="width:110px">获取验证码</button></div></div>
  <div class="form-row"><label>邀请码</label><div><input class="inp" placeholder="选填"></div></div>
  <div class="form-row"><label>密码</label><div><input class="inp" type="password" placeholder="至少 8 位"></div></div>
  <div style="margin:18px 0 10px"><a class="btn btn-primary" style="width:100%" href="#/console">注 册</a></div>
  <div style="text-align:center;font-size:12px;color:var(--ink3)">注册即同意《用户协议》与《隐私政策》</div>
  </div>
</div></section>`}});

page({ path:'/404', title:'页面不存在', level:1, group:'landing', crumb:['404'], render(){ return `
<section class="lp-sec" style="padding-top:160px;text-align:center"><div class="lp-in">
  <div style="font-size:64px;font-weight:700;color:var(--brand)">404</div>
  <p style="color:var(--ink3);margin:12px 0 24px">您访问的页面不存在</p>
  <a class="btn btn-primary" href="#/">返回首页</a>
</div></section>`}});

/* ============ 页面地图（自动生成完整 1–5 级页面树） ============ */
page({ path:'/sitemap', title:'页面地图 · 完整页面层级', level:2, group:'console', crumb:['页面地图'], render(){
  const lvName = {1:'一级',2:'二级',3:'三级',4:'四级',5:'五级'};
  const byLevel = {};
  PAGES.filter(p=>p.path!=='/sitemap').forEach(p=>{ (byLevel[p.level]=byLevel[p.level]||[]).push(p); });
  let html = `<div class="alert brand">共 ${PAGES.length-1} 个页面 · 覆盖一级（全局导航）至五级（深层明细）· 点击任意条目可直接跳转该页面</div>`;
  [1,2,3,4,5].forEach(lv=>{
    const ps = (byLevel[lv]||[]).sort((a,b)=>a.path.localeCompare(b.path));
    if(!ps.length) return;
    html += `<div class="card sitemap"><h3>${lvName[lv]}页面（${ps.length} 个）</h3>`;
    ps.forEach(p=>{
      html += `<div class="lv"><span class="lv-tag l${lv}">L${lv}</span><a href="#${p.path}"><b>${p.title}</b>${p.parent?`　<span style="color:#b0b0b0;font-size:12px">← ${p.parent}</span>`:''}</a><span class="lv-path">${p.path}</span></div>`;
    });
    html += `</div>`;
  });
  return html;
}});
