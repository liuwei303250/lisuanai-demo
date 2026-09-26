/* 中芯力算 Demo 路由框架：页面注册表 + 布局渲染 + 自动页面地图 */
const PAGES = [];            // {path,title,level,parent,group,crumb,render}
const page = (p) => PAGES.push(p);

/* ---------- 通用组件 ---------- */
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const L = (v) => v;

const badge = (t, c) => `<span class="badge ${c}">${t}</span>`;
const statCard = (k, v, d, cls) => `<div class="stat"><div class="k">${k}</div><div class="v">${v}</div><div class="d ${cls||''}">${d}</div></div>`;
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

/* ---------- Logo ---------- */
const logo = (dark) => `<div class="logo"><span class="logo-mark"><img src="assets/logo.png" alt="中芯力算"></span><span class="logo-text" style="${dark?'color:#fff':''}">中芯力算</span><span class="logo-sub">lisuanai.cn</span></div>`;

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
  return `${lpNav(p.path)}${content}${lpFooter()}`;
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
  return `<div class="console">${sb()}<main class="c-main">${hd}${content}</main><div class="overlay" id="overlay"></div></div>`;
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
  // 高亮侧栏/顶部导航
  document.querySelectorAll('.sb-item').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + hash));
  document.querySelectorAll('.lp-nav-links a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + hash));
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', render);

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
  }
});

render();
