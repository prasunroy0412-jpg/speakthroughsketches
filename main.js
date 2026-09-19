const menu=document.querySelector('.menu'),links=document.querySelector('.links');if(menu)menu.onclick=()=>links.classList.toggle('open');
const filters=document.querySelectorAll('[data-filter]'),arts=document.querySelectorAll('.art');filters.forEach(b=>b.onclick=()=>{filters.forEach(x=>x.classList.remove('on'));b.classList.add('on');arts.forEach(a=>a.style.display=(b.dataset.filter==='all'||a.dataset.cat===b.dataset.filter)?'block':'none')});
const lb=document.querySelector('.lightbox');document.querySelectorAll('.art img').forEach(i=>i.onclick=()=>{if(lb){lb.querySelector('img').src=i.src;lb.classList.add('open')}});if(lb){lb.onclick=e=>{if(e.target===lb||e.target.classList.contains('close'))lb.classList.remove('open')}}

document.querySelectorAll('.video-thumb[data-youtube]').forEach(btn=>btn.addEventListener('click',()=>{const id=btn.dataset.youtube,shape=btn.classList.contains('short')?'short':'wide',frame=document.createElement('iframe');frame.className='video-frame '+shape;frame.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(id)+'?autoplay=1&rel=0';frame.title=btn.getAttribute('aria-label')||'YouTube video';frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';btn.replaceWith(frame)}));

/* Lightweight scroll reveals and subtle hero movement; no animation library needed. */
(()=>{const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');if(reduce.matches||!('IntersectionObserver'in window))return;
const targets=document.querySelectorAll('.sectionhead,.featured,.home-video,.picks-intro,.pick,.featured-artists-home,.aboutgrid,.pagehero .wrap,.story,.story-full,.featured-artists-intro,.showcase-layout,.art,.timelapse-card');
const observer=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}})},{threshold:.07,rootMargin:'0px 0px 45px 0px'});
targets.forEach((el,i)=>{el.classList.add('reveal');if(el.matches('.pick,.art,.story'))el.classList.add('reveal-delay-'+(i%4));observer.observe(el)});
document.documentElement.classList.add('motion-ready');
const nav=document.querySelector('.nav'),hero=document.querySelector('.hero');let pending=false;
function onScroll(){if(pending)return;pending=true;requestAnimationFrame(()=>{const y=window.scrollY;nav?.classList.toggle('is-scrolled',y>18);if(hero&&y<window.innerHeight*1.5)hero.style.setProperty('--hero-drift',Math.min(y*.075,48)+'px');pending=false})}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
})();
