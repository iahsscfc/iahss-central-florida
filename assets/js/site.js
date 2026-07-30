const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.site-nav');toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open')});document.querySelectorAll('.site-nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}));const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const summitDays=document.getElementById('summit-days');
if(summitDays){
  const eventDate=new Date('2026-11-12T08:00:00-05:00');
  const now=new Date();
  const days=Math.max(0,Math.ceil((eventDate-now)/(1000*60*60*24)));
  summitDays.textContent=String(days);
}
