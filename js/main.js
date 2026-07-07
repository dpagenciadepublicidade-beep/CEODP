// Menu mobile
const toggle=document.getElementById('menuToggle');
const nav=document.getElementById('nav');
if(toggle&&nav){
  toggle.addEventListener('click',()=>{
    const aberto=nav.classList.toggle('aberto');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded',aberto);
  });
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    nav.classList.remove('aberto');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded','false');
  }));
}
// Animações de scroll
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
},{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>observer.observe(el));
// Formulário -> WhatsApp
const form=document.getElementById('formContato');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const f=e.target;
    const msg=`Olá! Quero solicitar um orçamento com a DP.%0A%0A*Nome:* ${encodeURIComponent(f.nome.value)}%0A*E-mail:* ${encodeURIComponent(f.email.value)}%0A*Telefone:* ${encodeURIComponent(f.telefone.value||'-')}%0A*Serviço:* ${encodeURIComponent(f.servico.value)}%0A*Projeto:* ${encodeURIComponent(f.mensagem.value)}`;
    window.open(`https://wa.me/5553991548509?text=${msg}`,'_blank');
    f.reset();
  });
}

// ===== Simulador de cases (modal com iframe) =====
const simOverlay=document.getElementById('simOverlay');
if(simOverlay){
  const simFrame=document.getElementById('simFrame');
  const simTitulo=document.getElementById('simTitulo');
  const simNovaAba=document.getElementById('simNovaAba');
  const abrir=(url,titulo)=>{
    simFrame.src=url;simTitulo.textContent=titulo;simNovaAba.href=url;
    simOverlay.classList.add('aberto');document.body.classList.add('sim-travado');
  };
  const fechar=()=>{
    simOverlay.classList.remove('aberto');document.body.classList.remove('sim-travado');
    simFrame.src='about:blank'; // para o carregamento ao fechar
  };
  document.querySelectorAll('.case-item[data-url]').forEach(c=>{
    c.addEventListener('click',()=>abrir(c.dataset.url,c.dataset.titulo||'Case DP'));
  });
  document.getElementById('simFechar').addEventListener('click',fechar);
  simOverlay.addEventListener('click',e=>{if(e.target===simOverlay)fechar();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')fechar();});
}

// ===== Animações extras (v2) =====
// Barra de progresso de leitura no topo
const barraProg=document.createElement('div');
barraProg.className='scroll-progress';
document.body.appendChild(barraProg);
addEventListener('scroll',()=>{
  const h=document.documentElement;
  barraProg.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
},{passive:true});
// Contadores animados (hero-stats: +100, 100% etc.)
document.querySelectorAll('.hero-stats strong').forEach(el=>{
  const m=el.textContent.trim().match(/^(\D*)(\d+)(\D*)$/);
  if(!m)return;
  const alvo=parseInt(m[2],10);
  const obs=new IntersectionObserver(es=>{es.forEach(e=>{
    if(!e.isIntersecting)return;obs.unobserve(el);
    const t0=performance.now(),dur=1500;
    (function tick(n){
      const p=Math.min((n-t0)/dur,1);
      el.textContent=m[1]+Math.round(alvo*(1-Math.pow(1-p,3)))+m[3];
      if(p<1)requestAnimationFrame(tick);
    })(t0);
  })},{threshold:.5});
  obs.observe(el);
});
