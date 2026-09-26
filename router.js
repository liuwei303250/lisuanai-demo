/* 中芯力算 Demo 路由框架：页面注册表 + 布局渲染 + 自动页面地图 */
const PAGES = [];            // {path,title,level,parent,group,crumb,render}
const page = (p) => PAGES.push(p);

/* ---------- 通用组件 ---------- */
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

const badge = (t, c) => `<span class="badge ${c}">${t}</span>`;
const statCard = (k, v, d, ico) => `<div class="stat"><div class="k">${ico ? `<span class="ico">${ico}</span>` : ''}${k}</div><div class="v">${v}</div><div class="d">${d || ''}</div></div>`;
const pill = (t, dir) => `<span class="d-pill ${dir}">${t}</span>`;
const progress = (pct) => `<div class="progress"><i style="width:${pct}%"></i></div>`;
const bar = (arr) => {
  const w = 640, h = 64, p = 6, max = Math.max(...arr, 1);
  const pts = arr.map((v, i) => [p + i * (w - 2 * p) / (arr.length - 1), h - p - (v / max) * (h - 2 * p)]
    .map(x => x.toFixed(1)).join(',')).join(' ');
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><defs>
    <linearGradient id="gfill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#DA251C" stop-opacity=".30"/><stop offset="1" stop-color="#DA251C" stop-opacity="0"/></linearGradient>
    <linearGradient id="gline" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#DA251C"/><stop offset="1" stop-color="#F26B1A"/></linearGradient>
  </defs>
  <polygon points="0,${h} ${pts} ${w},${h}" fill="url(#gfill)"/>
  <polyline points="${pts}" fill="none" stroke="url(#gline)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
};
const table = (heads, rows) => `<div class="card" style="overflow-x:auto"><table class="tbl"><thead><tr>${heads.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table><div class="pager"><span>‹</span><span class="on">1</span><span>2</span><span>3</span><span>›</span></div></div>`;
const formRow = (label, control, hint, req) => `<div class="form-row"><label>${req?'<span class="req">*</span> ':''}${label}</label><div>${control}${hint?`<div class="hint">${hint}</div>`:''}</div></div>`;

/* 共享页签组件:items=[[href,label],...],activePath 高亮当前页 */
const tabs = (items, activePath) => `<div class="tabbar">${items.map(([h, t]) => `<a href="${h}" class="${activePath === h ? 'on' : ''}">${t}</a>`).join('')}</div>`;

/* Toast 操作反馈 */
function toast(msg) {
  let wrap = document.getElementById('toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'toast-wrap';
    document.body.appendChild(wrap);
  }
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 350); }, 2400);
}

/* AI 助手悬浮球 + 对话面板 */
const AI_REPLIES = {
  '查余额': '您的账户余额 ¥86.42，今日消费 ¥0.12。如需明细可前往「调用日志」查看逐笔计费。',
  '查用量': '近 7 日调用 8,936 次，TOP 模型为 deepseek-v4-flash（45%）。趋势详见「概览」页图表。',
  '如何充值': '前往「充值中心」选择套餐，支持微信/支付宝/对公转账，基础套餐 ¥50 赠 5% 额度。',
  '联系客服': '已为您准备好工单入口 → 客户服务 → 提交工单，平均响应 10 分钟。',
};
function aiWidget() {
  return `<button class="ai-fab" title="AI 助手">🤖</button>
  <div class="ai-panel" id="ai-panel">
    <div class="hd">🤖 小芯 AI 助手 <span style="font-size:11px;opacity:.8;margin-left:auto">在线</span></div>
    <div class="bd">
      <div class="ai-msg bot">您好，我是小芯。可以问我余额、用量、充值、客服等问题，也可以直接点下方快捷指令 👇</div>
    </div>
    <div class="ai-chips">
      ${Object.keys(AI_REPLIES).map(k => `<span class="ai-chip" data-q="${k}">${k}</span>`).join('')}
    </div>
    <div class="ft"><input class="inp" id="ai-input" placeholder="输入问题…"><button class="btn btn-primary btn-sm" id="ai-send">发送</button></div>
  </div>`;
}

/* ---------- Logo ---------- */
const logo = (dark) => `<div class="logo"><span class="logo-mark"><img src="assets/${dark?'logo-whiten':'logo'}.png" alt="中芯力算"></span></div>`;

/* ---------- 落地页布局 ---------- */
function lpNav(active) {
  const items = [['/#/','首页'],['#/models','模型广场'],['#/pricing','价格'],['#/docs','API文档'],['#/console','控制台']];
  return `<nav class="lp-nav"><div class="lp-nav-in">
    <a href="#/">${logo(false)}</a>
    <div class="lp-nav-links">${items.map(([p,t])=>`<a href="${p}" class="${p===active?'on':''}">${t}</a>`).join('')}</div>
    <div class="lp-nav-cta"><a class="btn btn-ghost" href="#/login">登录</a><a class="btn btn-primary" href="#/register">注册</a></div>
  </div></nav>`;
}
function lpFooter() {
  return `<footer class="lp-footer"><div class="lp-footer-in">
    <div><div style="color:#fff;font-size:16px;font-weight:700;margin-bottom:8px">中芯力算</div>
      <p>AI 大模型 API 聚合与 Token 按量计费分发平台</p><p>一站式接入全球主流大模型，按量计费、多级代理分销</p>
      <p style="margin-top:14px">© 2026 中芯力算 www.lisuanai.cn　|　闽ICP备XXXXXXXX号</p></div>
    <div><h4>产品</h4><p><a href="#/models">模型广场</a></p><p><a href="#/pricing">价格</a></p><p><a href="#/console">控制台</a></p><p><a href="#/docs">API 文档</a></p></div>
    <div><h4>服务</h4><p><a href="#/docs">接入指南</a></p><p><a href="#/console/support/help">帮助中心</a></p><p><a href="#/console/support/tickets/create">提交工单</a></p></div>
    <div><h4>生态</h4><p><a href="#/console/affiliate/join">代理加盟</a></p><p><a href="#/console/supplier">供应商入驻</a></p></div>
    <div><h4>关于</h4><p><a href="#/login">隐私政策</a></p><p><a href="#/login">用户协议</a></p><p><a href="#/login">联系我们</a></p></div>
  </div></footer>`;
}
function lpLayout(p, content) {
  return `${lpNav(p.path)}${content}${lpFooter()}${aiWidget()}`;
}

/* ---------- 控制台侧栏 ---------- */
const SB = [
  {g:'工作台', items:[['#/console','概览','📊'],['#/console/playground','在线体验','🧪'],['#/console/keys','API 密钥','🔑'],['#/console/logs','调用日志','📜']]},
  {g:'资金', items:[['#/console/recharge','充值中心','💰'],['#/console/transfer','余额转让','🔁'],['#/console/invoice','发票中心','🧾']]},
  {g:'增长', items:[['#/console/affiliate','推广分销','🤝'],['#/console/agent','代理后台','🏛️'],['#/console/supplier','供应商中心','🏭']]},
  {g:'其他', items:[['#/console/support','客户服务','🎧'],['#/console/settings','个人设置','⚙️'],['#/sitemap','页面地图','🗺️']]},
];
function sb() {
  return `<aside class="sidebar">
    <a href="#/">${logo(true)}</a>
    ${SB.map(g=>`<div class="sb-sec"><div class="sb-group">${g.g}</div><div class="sb-body">${g.items.map(([p,t,i])=>`<a class="sb-item" href="${p}"><span>${i}</span><span class="txt">${t}</span></a>`).join('')}</div></div>`).join('')}
    <div class="sb-foot">中芯力算 Demo v2.0<br>© 2026 lisuanai.cn</div>
  </aside>`;
}
function consoleLayout(p, content) {
  const crumbs = p.crumb || [p.title];
  const hd = `<div class="c-top"><div style="display:flex;align-items:center;gap:12px">
    <button class="burger" title="菜单">☰</button>
    <div><div class="c-title">${p.title}</div><div class="crumb">首页 / 控制台 ${crumbs.map(c=>` / <b>${c}</b>`).join('')}</div></div></div>
    <div style="display:flex;gap:10px;align-items:center"><input class="c-search" placeholder="搜索功能…">
      <div class="dd" id="dd-bell"><span class="dd-btn"><span>🔔</span><span class="dot"></span></span>
        <div class="dd-menu"><a href="#/console/settings/notifications">💰 佣金 +¥6.00 已入账</a><a href="#/console/support/tickets">🎧 工单 TK2026092501 有新回复</a><a href="#/console/settings/notifications">📢 查看全部通知</a></div></div>
      <div class="dd" id="dd-user"><span class="dd-btn">👤 langzhi ▾</span>
        <div class="dd-menu"><a href="#/console/settings">⚙️ 个人设置</a><a href="#/sitemap">🗺️ 页面地图</a><div class="sep"></div><a href="#/login">🚪 退出登录</a></div></div>
    </div></div>`;
  return `<div class="console">${sb()}<main class="c-main">${hd}${content}</main><div class="overlay" id="overlay"></div>${aiWidget()}</div>`;
}

/* ---------- 路由 ---------- */
function match(path) {
  const seg = path.split('/').filter(Boolean);
  let best = null;
  for (const p of PAGES) {
    const ps = p.path.split('/').filter(Boolean);
    if (ps.length !== seg.length) continue;
    let ok = true;
    for (let i = 0; i < ps.length; i++) {
      if (ps[i].startsWith(':')) continue;      // 动态段
      if (ps[i] !== seg[i]) { ok = false; break; }
    }
    if (ok) best = p;
  }
  return best;
}
function render() {
  const hash = location.hash.replace(/^#/, '') || '/';
  const p = match(hash) || match('/404');
  const html = p.group === 'landing' ? lpLayout(p, p.render()) : consoleLayout(p, p.render());
  document.getElementById('app').innerHTML = html;
  // 侧栏高亮:精确匹配或前缀匹配(子页面归属父菜单)
  document.querySelectorAll('.sb-item').forEach(a => {
    const h = a.getAttribute('href');
    const on = h === '#' + hash || (h !== '#/console' && hash.startsWith(h.slice(1) + '/'));
    a.classList.toggle('on', on);
  });
  // 顶部导航高亮(控制台前缀匹配)
  document.querySelectorAll('.lp-nav-links a').forEach(a => {
    const h = a.getAttribute('href');
    const on = h === '#' + hash || (h === '#/console' && hash.startsWith('/console'));
    a.classList.toggle('on', on);
  });
  // 恢复侧栏分组折叠状态
  try {
    const st = JSON.parse(localStorage.getItem('sb-collapse') || '{}');
    document.querySelectorAll('.sb-sec').forEach((s, i) => { if (st['sec' + i]) s.classList.add('collapsed'); });
  } catch (e) {}
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', render);
/* render() 由 index.html 在全部页面脚本加载完成后调用 */

/* ---------- 全局交互(事件委托) ---------- */
document.addEventListener('click', (e) => {
  // 复制按钮
  const cp = e.target.closest('.copy');
  if (cp) {
    const box = cp.closest('.key-box');
    if (box) {
      const txt = box.textContent.replace('复制', '').trim();
      (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(
        () => { cp.textContent = '已复制 ✓'; setTimeout(() => (cp.textContent = '复制'), 1500); },
        () => { cp.textContent = '复制失败'; setTimeout(() => (cp.textContent = '复制'), 1500); }
      );
    }
    return;
  }
  // 侧栏分组折叠(记忆状态)
  const sg = e.target.closest('.sb-group');
  if (sg) {
    const sec = sg.parentElement;
    sec.classList.toggle('collapsed');
    const state = {};
    document.querySelectorAll('.sb-sec').forEach((s, i) => (state['sec' + i] = s.classList.contains('collapsed')));
    localStorage.setItem('sb-collapse', JSON.stringify(state));
    return;
  }
  // 下拉菜单
  const ddb = e.target.closest('.dd-btn');
  if (ddb) {
    const dd = ddb.closest('.dd');
    const wasOpen = dd.classList.contains('open');
    document.querySelectorAll('.dd').forEach(d => d.classList.remove('open'));
    if (!wasOpen) dd.classList.add('open');
    return;
  }
  if (e.target.closest('.dd-menu')) return;
  document.querySelectorAll('.dd').forEach(d => d.classList.remove('open'));
  // 移动端抽屉
  if (e.target.closest('.burger')) {
    document.querySelector('.sidebar').classList.add('open');
    document.getElementById('overlay').classList.add('show');
    return;
  }
  if (e.target.closest('.overlay')) {
    document.querySelector('.sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
    return;
  }
  // AI 助手悬浮球
  if (e.target.closest('.ai-fab')) {
    document.getElementById('ai-panel').classList.toggle('open');
    return;
  }
  // AI 助手对话
  const chip = e.target.closest('.ai-chip');
  if (chip) {
    const q = chip.dataset.q;
    const bd = document.querySelector('#ai-panel .bd');
    bd.insertAdjacentHTML('beforeend', `<div class="ai-msg user">${q}</div><div class="ai-msg bot">${AI_REPLIES[q] || '抱歉，我还在学习中。'}</div>`);
    bd.scrollTop = bd.scrollHeight;
    return;
  }
  if (e.target.closest('#ai-send')) {
    const inp = document.getElementById('ai-input');
    const q = (inp.value || '').trim();
    if (!q) { toast('请先输入问题'); return; }
    const bd = document.querySelector('#ai-panel .bd');
    const a = AI_REPLIES[q] || '已收到您的问题，客服将尽快回复（演示环境为模拟回复）。';
    bd.insertAdjacentHTML('beforeend', `<div class="ai-msg user">${esc(q)}</div><div class="ai-msg bot">${a}</div>`);
    bd.scrollTop = bd.scrollHeight;
    inp.value = '';
    return;
  }
  // 主操作按钮 Toast 反馈(无跳转的演示按钮)
  const act = e.target.closest('a.btn-primary');
  if (act && !act.getAttribute('href')) { toast('✅ 操作成功 · 演示环境'); }
});
