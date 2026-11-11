(()=>{const D=window.PORTFOLIO,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],pad=n=>String(n).padStart(2,"0");
const RM=matchMedia("(prefers-reduced-motion:reduce)").matches;
const secs=[["about","ABOUT"],["profile","PROFILE"],["projects","PROJECTS"],["competencies","CORE COMPETENCIES"],["contact","CONTACT"]];
$("#menu").innerHTML=secs.map(([i,l])=>`<a href="#${i}">${l}</a>`).join("");
const burger=$("#burger"),menu=$("#menu");
burger.onclick=()=>{const o=menu.classList.toggle("show");burger.setAttribute("aria-expanded",o);burger.setAttribute("aria-label",o?"메뉴 닫기":"메뉴 열기")};
menu.onclick=e=>{if(e.target.tagName==="A"){menu.classList.remove("show");burger.setAttribute("aria-expanded",false)}};
const p=D.profile,c=D.config,P=D.projects;
const hl=t=>t.replace(/(\d+(?:\.\d+)?\s?(?:%|명|종|곳|개|일|세트|배|주일|위))/g,'<strong class="k">$1</strong>');
const lines=t=>hl(t).replace(/\.\s+/g,".\n").split("\n").map(x=>`<span class="ln">${x}</span>`).join("");
/* 사진 자리(사진이 없으면 안내 문구가 보임) */
const ph=(src,cap)=>`<span class="ph">${cap||""}<img src="${src}" alt="" loading="lazy" onerror="this.remove()"></span>`;

/* HERO (기존 형식 유지) */
$("#heroText").innerHTML=`<h1>${p.main.split("\n").map((l,i,a)=>i===a.length-1&&a.length>1?`<em>${l}</em>`:l).join("<br>")}</h1><p class="lead">${p.sub}</p>`;

/* ABOUT */
const A=D.about,Ls=x=>x.split("\n").map(l=>`<span class="ln2">${l}</span>`).join("");
$("#aboutTop").innerHTML=`<div class="tt"><p class="lab">${A.label}</p><h2>${A.head}</h2>${A.body.map(b=>`<p>${Ls(b)}</p>`).join("")}</div><div class="opts">${D.keywords.map(([a,b])=>`<div class="opt"><b>${a}</b><span>${b}</span></div>`).join("")}</div>`;

/* PROFILE + 이력 */
const [y,m,d]=p.birth.split("-").map(Number),t=new Date();let age=t.getFullYear()-y;if(t.getMonth()+1<m||(t.getMonth()+1===m&&t.getDate()<d))age--;
const rowsOf=x=>x.r.map(r=>{if(x.h.length===1)return `<div class="row">${r[0]}</div>`;
 const jp=x.t==="OVERSEAS EXPERIENCE"&&r[2]?`<span class="jp">${r[2]}</span>`:"",sub=x.t!=="OVERSEAS EXPERIENCE"&&r[2]?`<span class="x">${r[2]}</span>`:"";
 return `<div class="row"><span class="d">${r[0]}</span>${r[1]}${jp}${sub}</div>`}).join("");
const card=x=>`<div class="pf"><h3>${x.t}</h3>${rowsOf(x)}</div>`,T=D.tables;
$("#aboutRoot").innerHTML=`<div><div class="pho">${ph(p.photo,"프로필 사진").replace('class="ph"','class="ph" role="img" aria-label="'+p.photoAlt+'"')}</div>
<div class="pf kv"><div class="row"><span class="d">이름</span><span>${p.name} / ${p.en}</span></div><div class="row"><span class="d">생년월일</span><span>${p.birth.replace(/-/g,". ")} (만 ${age}세)</span></div><div class="row"><span class="d">E-mail</span><span><a href="mailto:${c.email}">${c.email}</a></span></div></div></div>
<div class="stk">${[0,1,4].map(i=>card(T[i])).join("")}</div><div class="stk">${[2,3,5].map(i=>card(T[i])).join("")}</div>`;

/* PROJECTS */
$("#projRoot").innerHTML=P.map((j,i)=>{const R=j.result,big=R.items.filter(i=>i[1]),tag=R.items.filter(i=>!i[1]);
const pills=[j.tag,...j.kpis.slice(1).map(([v,l])=>v+" "+l)],mt=j.kpis[0];
return `<article class="proj" id="${j.id}"><button class="phead" aria-expanded="false" aria-controls="${j.id}-p" data-cur="자세히 보기"><span><span class="no">PROJECT ${j.no}</span><h3>${j.title}</h3><span class="sb">${j.meta}</span>${j.role?`<span class="sb"><b>ROLE</b> | ${j.role}</span>`:""}<span class="tg">${pills.map(x=>`<span>${x}</span>`).join("")}</span></span><span class="met"><b>${mt[0]}</b><i>${mt[1]}</i></span><span class="more">자세히 보기 +</span></button>
<div class="panel" id="${j.id}-p"><div><div class="pbody lay-${j.layout}${j.layout==="mixr"?" lay-mix":j.layout==="resgal"?" lay-bottom":""}"><div class="pt">
<div class="blk pjb"><h4>PROJECT</h4>${j.lead?`<p class="quote">${j.lead}</p>`:""}<p>${lines(j.body)}</p></div>
<div class="blk ppb"><h4>${j.plabel||"PROCESS"}</h4><div class="steps ${j.steps}" style="--n:${j.process.length}">${j.process.map((s,k)=>`<div class="step${s.hot?" hot":""}"><span class="sn">${pad(k+1)}</span><div><h5>${s.h.replace(/^\d+\.\s*/,"")}</h5>${s.d?`<p>${lines(s.d)}</p>`:""}${s.b.length?`<ul class="bl">${s.b.map(x=>`<li>${hl(x)}</li>`).join("")}</ul>`:""}</div></div>`).join("")}</div></div></div>
<div class="pr"><div class="blk"><h4>RESULT</h4>${j.bars?`<div class="bars" role="group" aria-label="설문 응답 비율">${j.bars.map(([l,v])=>`<div class="bar"><div>${l}</div><span style="width:${v*2}%">${v}%</span></div>`).join("")}</div>`:""}${big.length?`<div class="${j.rstyle==="stat"?"stat":"kbs"}">${big.map(([v,l])=>`<div${j.rstyle==="stat"?"":' class="kb"'}><b>${v}</b><span>${l}</span></div>`).join("")}</div>`:""}${tag.length?`<ul class="res">${tag.map(([v])=>`<li>${v}</li>`).join("")}</ul>`:""}${R.note?`<p class="jl">${R.note}</p>`:""}</div>${j.insight?`<div class="blk"><h4>INSIGHT</h4><p class="quote">“${j.insight}”</p></div>`:""}${j.link?`<div class="blk"><h4>직무 연결</h4><p class="jl">${lines(j.link)}</p></div>`:""}</div>
<div class="gal${j.sm?" sm":""}" data-i="${i}" style="--ar:${j.ar||"4/3"}"><button class="gm" aria-label="사진 크게 보기" data-cur="크게 보기"></button><div class="gc"></div><div class="gt">${j.images.map((f,k)=>`<button class="th" aria-label="사진 ${k+1}: ${f.cap}">${ph(f.src,"")}</button>`).join("")}</div><p class="gh">작은 사진을 누르면 다음 사진으로 넘어갑니다. (큰 사진을 누르면 확대됩니다)</p></div>
</div></div></div></article>`}).join("");

/* 토글: 하나만 열림 + 전체 펼치기/접기 */
const arts=$$(".proj"),setO=(a,o)=>{a.classList.toggle("open",o);$(".phead",a).setAttribute("aria-expanded",o);$(".more",a).textContent=o?"접기 −":"자세히 보기 +";$(".panel",a).inert=!o};
arts.forEach(a=>setO(a,false));
const openOnly=(a,force)=>{const o=force||!a.classList.contains("open");arts.forEach(x=>setO(x,x===a&&o));if(o)setTimeout(()=>a.scrollIntoView({behavior:RM?"auto":"smooth",block:"start"}),340)};
$$(".phead").forEach(b=>b.onclick=()=>openOnly(b.closest(".proj")));
$("#openAll").onclick=()=>arts.forEach(a=>setO(a,true));$("#closeAll").onclick=()=>arts.forEach(a=>setO(a,false));

/* 사진 갤러리 + 확대 보기 */
const lb=$("#lb");
$$(".gal").forEach(g=>{const I=P[+g.dataset.i].images,mm=$(".gm",g),cp=$(".gc",g),ths=$$(".th",g);let cur=0;
 const show=k=>{cur=k;const f=I[k];mm.innerHTML=ph(f.src,f.cap);cp.innerHTML=`<b>${f.cap}</b><span>${f.note||""}</span>`;ths.forEach((x,n)=>x.classList.toggle("on",n===k))};
 ths.forEach((x,k)=>x.onclick=()=>show(k));show(0);
 mm.onclick=()=>{const f=I[cur];$("#lbc").innerHTML=`<img src="${f.src}" alt="${f.cap}" onerror="this.outerHTML='<div class=ph>'+this.alt+'</div>'"><p><b>${f.cap}</b><br>${f.note||""}</p>`;lb.showModal()}});
$("#lbx").onclick=()=>lb.close();lb.onclick=e=>{if(e.target===lb)lb.close()};

/* CORE COMPETENCIES (기존 형식 유지) */
$("#cmain").textContent=D.competencies.main;
$("#procRoot").innerHTML=D.competencies.rows.map(([n,ex],i)=>`<li><span>${pad(i+1)}</span><b>${n}</b><div class="chips">${ex.map(([l,id])=>`<a href="#${id}" data-open="${id}">${l}</a>`).join("")}</div></li>`).join("");
document.addEventListener("click",e=>{const a=e.target.closest("[data-open]");if(a){e.preventDefault();openOnly($("#"+a.dataset.open),true)}});

/* CONTACT */
$("#contactRoot").innerHTML=`<div class="done"><div class="ck" aria-hidden="true">✓</div><p class="lab">CONTACT</p><h2>${D.contact.main}</h2><p>${D.contact.body}</p>
<div class="rcpt"><div class="rr"><span>이름</span><b>${p.name}</b></div><div class="rr"><span>이메일</span><b><a href="mailto:${c.email}">${c.email}</a></b><button class="btn p sm" id="copy">이메일 복사</button></div></div>
<span class="ok" id="ok" role="status"></span><div class="btns" style="justify-content:center;margin-top:8px"><button class="btn" id="up">맨 위로</button></div></div>`;
$("#foot").textContent=`© ${new Date().getFullYear()} ${p.en}`;
$("#copy").onclick=async()=>{const o=$("#ok");try{await navigator.clipboard.writeText(c.email);o.textContent="이메일 주소를 복사했습니다: "+c.email}catch{const x=document.createElement("textarea");x.value=c.email;document.body.append(x);x.select();o.textContent=document.execCommand("copy")?"이메일 주소를 복사했습니다: "+c.email:"복사하지 못했습니다. 직접 선택해 주세요.";x.remove()}};
const tt=$("#totop");tt.onclick=$("#up").onclick=()=>scrollTo({top:0,behavior:RM?"auto":"smooth"});
addEventListener("scroll",()=>tt.classList.toggle("on",scrollY>600),{passive:true});

/* 내비게이션 현재 위치 */
const links=$$("#menu a"),io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting)links.forEach(a=>{const on=a.hash==="#"+en.target.id;a.classList.toggle("on",on);on?a.setAttribute("aria-current","true"):a.removeAttribute("aria-current")})}),{rootMargin:"-45% 0px -50% 0px"});
secs.forEach(([i])=>io.observe($("#"+i)));

/* 커서 라벨(마우스 환경에서만) */
if(matchMedia("(hover:hover) and (pointer:fine)").matches&&!RM){const cu=$("#cur");
 addEventListener("mousemove",e=>{cu.style.transform=`translate(${e.clientX+16}px,${e.clientY+16}px)`;const t=e.target.closest("[data-cur]");cu.classList.toggle("on",!!t);if(t)cu.textContent=t.dataset.cur});addEventListener("scroll",()=>cu.classList.remove("on"),{passive:true})}

/* 스크롤 등장 효과 */
const rv=(sel,step=.08)=>$$(sel).forEach((e,i)=>{e.classList.add("rv");e.style.setProperty("--d",(i%4)*step+"s")});
rv(".lab");rv(".prod>*");rv(".prof3>*");rv(".opt");rv(".pf");rv(".proj",0);rv("#competencies .st");rv(".proc li");rv(".done",0);
const rio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");rio.unobserve(e.target)}}),{threshold:.12,rootMargin:"0px 0px -6% 0px"});
$$(".rv").forEach(e=>rio.observe(e));

/* 스크롤 시 첫 화면이 옅어짐 */
const hg=$(".hero-grid"),cue=$(".scrollcue");
if(!RM){let tk=false;const f=()=>{const q=Math.min(1,scrollY/(innerHeight*.75));hg.style.opacity=1-q;hg.style.transform=`translateY(${-q*48}px)`;cue.style.opacity=1-q*2;tk=false};addEventListener("scroll",()=>{if(!tk){tk=true;requestAnimationFrame(f)}},{passive:true})}
})();
