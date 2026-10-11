let category = 'all';
const search = document.querySelector('#search');
function filterProjects() { let count=0; document.querySelectorAll('.project').forEach(project => { const visible=(category==='all'||project.dataset.category===category)&&project.textContent.toLowerCase().includes(search.value.trim().toLowerCase()); project.hidden=!visible;if(visible)count++; });document.querySelector('#empty').hidden=count>0; }
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {category=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});filterProjects();}));
search.addEventListener('input',filterProjects);
document.querySelector('#year').textContent = new Date().getFullYear();
// A brief spring on release; honor the visitor's motion preference.
document.querySelectorAll('.button,.nav-contact,.filter,.project-links button,.career-link').forEach(control => {
 control.addEventListener('click', () => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  control.classList.remove('press-pop');
  void control.offsetWidth;
  control.classList.add('press-pop');
 });
 control.addEventListener('animationend', () => control.classList.remove('press-pop'));
});
