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
