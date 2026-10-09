import QRCode from 'qrcode';

const sections = [
  { title:'一、单项选择题', desc:'本题共 12 小题，每小题 3 分，共 36 分。每小题只有一项符合题意。', type:'single' },
  { title:'二、多项选择题', desc:'本题共 6 小题，每小题 5 分，共 30 分。全部选对得满分，少选得 2 分，错选不得分。', type:'multi' },
  { title:'三、判断与研判题', desc:'本题共 3 小题，每小题 6 分，共 18 分。选择最符合公关专业判断的一项。', type:'single' },
  { title:'四、情境分析题', desc:'本题共 3 小题，三题分别 6、5、5 分，共 16 分。面对真实舆情场景，选择优先级最高的动作。', type:'single' },
];

const questions = [
  { s:0, t:'在新品发布前，团队用“核心主张—支撑证据—可引用表达”搭建统一传播骨架。这套工具最准确的称呼是？', o:['PESO 模型','Message House（信息屋）','Issue Tree（议题树）','SOV 看板'], a:1 },
  { s:0, t:'品牌遭遇热搜质疑，事实仍在核查。对外首轮回应最应遵循哪条原则？', o:['先给出完整责任归因','Holding Statement：先确认关注与核查进展','等待所有细节确认后再发声','转发支持者评论稀释话题'], a:1 },
  { s:0, t:'衡量一场公关战役在目标媒体中获得的讨论份额，最常用的指标是？', o:['CTR（点击率）','SOV（Share of Voice）','DAU（日活）','GRP（总收视点）'], a:1 },
  { s:0, t:'将“服务器故障”拆成用户影响、业务连续性、补偿预期、技术原因四组问题，便于逐层求证。这一步属于？', o:['Issue Tree 议题树','A/B Test','媒介排期','品牌资产盘点'], a:0 },
  { s:0, t:'以下哪种内容更接近 Earned Media（赢得媒体）？', o:['品牌自有公众号文章','购买信息流广告','媒体基于新闻价值独立报道','员工内网公告'], a:2 },
  { s:0, t:'危机回应中，发言人说“我们理解大家的担忧，已启动专项核查，今晚 20:00 更新进展”。这句话同时完成了？', o:['共情、承诺、时间锚点','辟谣、归因、转化','投放、种草、复购','沉默、降温、切割'], a:0 },
  { s:0, t:'针对媒体、员工、用户、监管部门分别设计信息重点，体现的是哪种公关基本功？', o:['统一口径等于所有人听同一句话','Stakeholder Mapping 利益相关方分层','只看头部 KOL 传播','把风险交给算法分发'], a:1 },
  { s:0, t:'舆情监测发现讨论量下降，但负面叙事仍在小圈层私聊、群组扩散。此类不可见扩散通常称为？', o:['Dark Social（暗社交）','Blue Ocean','First Moment of Truth','Banner Blindness'], a:0 },
  { s:0, t:'在 RACE 模型中，先通过监测与调研识别问题，属于哪个阶段？', o:['Act','Convert','Evaluate','Research'], a:3 },
  { s:0, t:'危机现场需要在信息不完整时快速形成“观察—判断—行动—复盘”闭环，对应哪种决策框架？', o:['OODA Loop','SWOT','4P','BCG Matrix'], a:0 },
  { s:0, t:'把“科技领先”翻译成“让普通人少等 10 分钟”，本质上是完成了什么？', o:['从品牌自夸到用户价值的叙事转译','降低传播预算','隐藏产品事实','把公关变成客服'], a:0 },
  { s:0, t:'媒体问及尚未确认的事故原因，最专业的回答是？', o:['猜测最可能的技术环节','明确已知、未知与下一次更新时间','把问题归咎于用户操作','引用未经核实的内部截图'], a:1 },
  { s:1, t:'一场覆盖新品发布的 PESO 组合，哪些属于 Paid / Earned / Shared / Owned 的合理动作？', o:['Paid：信息流投放与搜索广告','Earned：媒体基于新闻价值独立报道','Shared：用户与员工自发讨论扩散','Owned：品牌官网、公众号与产品页','四类都必须由公关部门亲自发布'], a:[0,1,2,3] },
  { s:1, t:'搭建危机响应战情室时，哪些做法能提升跨团队协同？', o:['设单一事实源与版本号','明确发言人、审批人与替补','用“已知/未知/待证实”标注信息','让每个团队各自对外解释','约定更新节奏与升级阈值'], a:[0,1,2,4] },
  { s:1, t:'下面哪些指标适合评估声誉型公关项目，而不是只看曝光量？', o:['目标人群正负向情感变化','关键议题 SOV 与 Share of Search','高质量媒体引用与消息准确率','只看微博热搜排名','员工/用户信任度调研'], a:[0,1,2,4] },
  { s:1, t:'为了让高管在采访中“像一个可信的人”而非背稿机器，哪些训练有效？', o:['Message House 关键词演练','Bridge & Flag：回到主张并主动补充重点','只背完整稿件，避免任何即兴','模拟尖锐追问与事实边界','准备可公开、不可公开、待确认清单'], a:[0,1,3,4] },
  { s:1, t:'针对 KOL/KOC 合作，哪些属于合规且可持续的判断？', o:['按受众信任与议题匹配度选择','明确商业合作与内容边界','只用粉丝数排序','给创作者真实可验证的体验材料','设置舆情回收与异常升级机制'], a:[0,1,3,4] },
  { s:1, t:'复盘一次争议传播，哪些动作能把“热闹”转化为组织能力？', o:['记录决策时间线与证据链','拆分触发点、放大器、受影响人群','只统计阅读量截图','把可复用话术、流程与权限沉淀成 playbook','给出下一次的预警指标'], a:[0,1,3,4] },
  { s:2, t:'判断：面对事实未明的争议，速度比准确更重要；先发一条情绪化回应，再补充事实，是成熟公关的常规做法。', o:['正确','错误'], a:1 },
  { s:2, t:'判断：高质量公关不是把所有负面评论“压下去”，而是让关键利益相关方获得可验证、可行动、可持续更新的信息。', o:['正确','错误'], a:0 },
  { s:2, t:'判断：当媒体报道准确但与品牌预期不一致时，公关的第一动作应是要求媒体删除，而非检查事实与叙事落差。', o:['正确','错误'], a:1 },
  { s:3, t:'某产品上线后出现“扣费不明”讨论，截图快速扩散。第一小时内的优先级排序，哪项最专业？', o:['先找出最早发帖人并私下要求删除','锁定事实源、保护用户、发布 holding statement 并给出下一更新时间','立刻投放正面广告覆盖关键词','让每位员工在评论区复制同一段话'], a:1 },
  { s:3, t:'某媒体将产品能力误写成“替代所有人工岗位”，讨论升温。最佳沟通动作是？', o:['指责媒体制造焦虑','提供准确能力边界、真实使用案例与专家采访，主动把叙事拉回用户价值','沉默等待热度过去','只在内部群里澄清'], a:1 },
  { s:3, t:'一次争议后，品牌想证明“我们变得更值得信任”。最有说服力的长期动作是？', o:['发布一张感谢海报','把改进措施、责任人、时间表、进度回报与用户反馈入口公开化','购买更多热搜','用新活动转移注意力'], a:1 },
];

const state = { answers:new Map(), started:Date.now(), timer:null, score:null };
const $ = (s) => document.querySelector(s);
const escapeHtml = (v) => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function renderQuestions(){
  let html = '', qi = 0;
  sections.forEach((sec, si) => {
    html += `<h2 class="section-title">${sec.title}<span>${sec.desc}</span></h2>`;
    questions.filter(q=>q.s===si).forEach(q=>{
      const multi = sec.type==='multi';
      html += `<article class="question" data-q="${qi}"><div class="question-title"><span class="q-num">${String(qi+1).padStart(2,'0')}</span>${escapeHtml(q.t)}</div>`;
      if (q.s===3) html += `<div class="scenario">场景题：请把“影响控制、事实透明、关系修复、组织学习”按优先级纳入判断。</div>`;
      html += '<div class="options">'+q.o.map((o,oi)=>`<label class="option"><input type="${multi?'checkbox':'radio'}" name="q${qi}" value="${oi}" /><span>${String.fromCharCode(65+oi)}　${escapeHtml(o)}</span></label>`).join('')+'</div></article>';
      qi++;
    });
  });
  $('#questions').innerHTML = html;
  $('#questions').addEventListener('change', e=>{ if(!e.target.matches('input')) return; const card=e.target.closest('.question'); card.querySelectorAll('.option').forEach(el=>el.classList.toggle('selected',el.querySelector('input').checked)); updateProgress(); });
}

function updateProgress(){
  const answered = [...document.querySelectorAll('.question')].filter(card=>[...card.querySelectorAll('input')].some(i=>i.checked)).length;
  const elapsed = Math.floor((Date.now()-state.started)/1000); const mm=String(Math.floor(elapsed/60)).padStart(2,'0'), ss=String(elapsed%60).padStart(2,'0');
  $('#progress').textContent=`已作答 ${answered} / ${questions.length}　用时 ${mm}:${ss}`;
}
function scoreQuiz(){
  let total=0, parts=[0,0,0,0];
  document.querySelectorAll('.question').forEach((card,qi)=>{ const q=questions[qi], vals=[...card.querySelectorAll('input:checked')].map(i=>Number(i.value)); if(!vals.length)return; const right=Array.isArray(q.a)? vals.length===q.a.length&&vals.every(v=>q.a.includes(v)) : vals[0]===q.a; let pts=0; if(right) pts=q.s===0?3:q.s===1?5:q.s===2?6:(qi===21?6:qi===22?5:5); else if(q.s===1&&vals.every(v=>q.a.includes(v))) pts=2; total+=pts; parts[q.s]+=pts; });
  const max=[36,30,18,16]; return {total,parts,max};
}
function rank(score){ if(score>=90)return ['首席叙事架构师','你把复杂议题变成共识，把不确定性变成行动。']; if(score>=80)return ['舆论场操盘手','你能在风向变化前，先一步看见真正的问题。']; if(score>=70)return ['声誉战略参谋','你有稳健的判断力，正在形成自己的战情方法论。']; if(score>=60)return ['传播战情分析师','你知道信息如何流动，下一步是让每次判断更有证据。']; return ['公关潜力新星','真正的专业从好奇开始，再用一次次复盘赢得信任。']; }
async function makeQR(canvas, url){ await QRCode.toCanvas(canvas,url,{width:180,margin:1,color:{dark:'#101b3d',light:'#ffffff'}}); }
function resultView(){
  const sc=state.score=scoreQuiz(), [title,copy]=rank(sc.total), name=escapeHtml($('#candidate').value.trim()||'匿名传播人');
  $('#quiz-view').hidden=true; $('#action-bar').hidden=true; const view=$('#results-view'); view.hidden=false;
  view.innerHTML=`<div class="result-top"><div><div class="result-kicker">2026 · 中国互联网公关传播力统一测试</div><div class="result-name">${name}</div><div class="result-title">${title}</div><div class="stamp">已完成全国Ⅰ卷</div></div><div class="score-badge"><canvas id="qr"></canvas><div class="score">${sc.total}</div><div class="unit">/ 100 分</div><div class="qr-caption">扫码 · 你也测一测</div></div></div><div class="result-body"><div><h2>你的传播能力谱系</h2><div class="bars">${['叙事架构','议题判断','战情协同','声誉修复'].map((n,i)=>{const pct=Math.round(sc.parts[i]/sc.max[i]*100);return `<div class="bar-row"><span>${n}</span><div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div><b class="bar-score">${pct}</b></div>`}).join('')}</div><div class="result-note">${copy}<br/>把专业写进每一次回应，把荣誉留在每一次复盘。</div></div><div><h2>转发你的结果</h2><p class="result-note">右上角二维码已绑定本测试地址。生成卡片只包含分数、称号与能力标签，不包含题目答案。</p><div class="result-actions"><button class="primary-btn" id="share-btn">生成转发图 ↗</button><button class="secondary-btn" id="again-btn">重新测一次</button></div><p class="result-note">这是一个开源测试卷：<a href="https://github.com/AM-young-fun/pr-test" target="_blank" rel="noreferrer">GitHub Star 项目 ↗</a> · <a href="https://github.com/AM-young-fun" target="_blank" rel="noreferrer">Follow 作者 ↗</a></p></div></div>`;
  makeQR($('#qr'), location.href.split('#')[0]+'?from=share'); $('#share-btn').addEventListener('click',()=>shareCard(sc,title,name)); $('#again-btn').addEventListener('click',()=>location.reload());
}
async function shareCard(sc,title,name){
  const c=document.createElement('canvas'); c.width=1080;c.height=1440;const x=c.getContext('2d'); x.fillStyle='#f8f5ed';x.fillRect(0,0,c.width,c.height); x.fillStyle='#101b3d';x.fillRect(0,0,c.width,25); x.strokeStyle='#d8d2c6';x.lineWidth=2;x.strokeRect(46,46,988,1348);
  x.fillStyle='#c33c35';x.font='700 22px sans-serif';x.fillText('叙事研究所  /  PUBLIC AFFAIRS LAB',90,120); x.fillStyle='#687181';x.font='500 24px serif';x.fillText('2026 年中国互联网公关传播力统一测试',90,190); x.fillStyle='#182033';x.font='900 54px serif';x.fillText('公关传播力（全国Ⅰ卷）',90,285); x.fillStyle='#182033';x.font='700 36px sans-serif';x.fillText(name,90,390); x.fillStyle='#c33c35';x.font='800 34px serif';x.fillText(title,90,450); x.fillStyle='#101b3d';x.font='900 230px monospace';x.fillText(String(sc.total),90,730);x.fillStyle='#6b7481';x.font='700 32px sans-serif';x.fillText('/ 100 分',480,725);
  const labels=['叙事架构','议题判断','战情协同','声誉修复']; labels.forEach((n,i)=>{const pct=Math.round(sc.parts[i]/sc.max[i]*100);const y=840+i*74;x.fillStyle='#182033';x.font='600 24px sans-serif';x.fillText(n,90,y);x.fillStyle='#dedbd3';x.fillRect(250,y-19,470,13);x.fillStyle='#4261a4';x.fillRect(250,y-19,470*pct/100,13);x.fillStyle='#182033';x.font='700 22px monospace';x.fillText(`${pct}`,750,y);});
  const qr=document.createElement('canvas'); await makeQR(qr,location.href.split('#')[0]+'?from=share');x.drawImage(qr,790,505,170,170);x.fillStyle='#c33c35';x.font='800 24px sans-serif';x.fillText('你也测一测',800,715);x.fillStyle='#687181';x.font='500 20px sans-serif';x.fillText('把专业写进每一次回应',90,1280);x.fillText('公关 / 声誉 / 叙事',90,1320);x.fillStyle='#101b3d';x.fillRect(90,1360,900,2);
  const blob=await new Promise(res=>c.toBlob(res,'image/png')); const file=new File([blob],'公关传播力测试成绩.png',{type:'image/png'}); if(navigator.share&&navigator.canShare?.({files:[file]})){try{await navigator.share({title:'我的公关传播力测试成绩',files:[file]});return;}catch(e){}} const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=file.name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000);
}
renderQuestions(); state.timer=setInterval(updateProgress,1000); $('#submit-btn').addEventListener('click',resultView); updateProgress();
