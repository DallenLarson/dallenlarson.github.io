const details = {
 nibble: { label: 'DESKTOP SOFTWARE / OPEN SOURCE', title: 'Nibble', body: '<p>A Windows browser implemented in C# with WPF and .NET 8, using Microsoft Edge WebView2 for page rendering.</p><h3>The engineering decision</h3><p>Reuse the installed WebView2 runtime instead of bundling Chromium. That keeps the browser executable small while leaving engine updates to Microsoft. The application requires the .NET Desktop and WebView2 runtimes.</p><h3>Beyond the first screen</h3><ul><li>Tab management, private windows, personalized themes, and browser registration.</li><li>A per-user installer and release-feed update flow.</li><li>Documented build, verification, and desktop smoke-test workflows.</li></ul><p>The public release is currently unsigned; the repository documents installation constraints.</p><p><a href="https://github.com/DallenLarson/nibble">Explore the source and release documentation</a></p>' },
 atelier: { label: 'WEB PRODUCT / LOCAL-FIRST', title: 'Atelier', body: '<p>A CS2 market tracker built with plain JavaScript and a small Node.js server, without third-party runtime packages.</p><h3>Designed around ownership</h3><p>Wishlists, targets, cached artwork, and price observations stay on the user’s computer. A local server refreshes market data and serves the interface.</p><h3>Product details</h3><ul><li>Search, categories, sorting, and target-price tracking.</li><li>Up to 90 days of locally recorded price observations.</li><li>Cached data during connection failures and reduced-motion support.</li></ul><p><a href="https://github.com/DallenLarson/cs2-atelier">Explore the implementation</a></p>' },
 clay: { label: 'ROOK STUDIOS / CONTRACT ENGINEERING', title: 'CLAY-TIME™', body: '<p>Lead programming work spanning more than 130 production scripts and multiple gameplay mechanics.</p><h3>My contribution</h3><ul><li>Gameplay systems implemented in Unity and C#.</li><li>Physics optimization to reduce frame drops.</li><li>Asynchronous loading and iteration on game performance.</li></ul><p>This is professional project experience; source code is not presented as a public repository.</p><p><a href="mailto:dallen@dallenlarson.com">Get in touch about my experience</a></p>' },
 emblem: { label: 'UNITY / OPEN-SOURCE FRAMEWORK', title: 'Emblem Forge', body: '<p>A customizable C# framework for turn-based tactical strategy games in Unity.</p><h3>Systems that fit together</h3><ul><li>Game management for turn flow and win/loss conditions.</li><li>Unit movement, attacking, health, and action ranges.</li><li>Grid generation, terrain, and tile occupancy.</li></ul><p>The public repository includes setup documentation and an MIT license. The available release is labeled pre-release.</p><p><a href="https://github.com/DallenLarson/EmblemForge">Explore the framework</a></p>' },
 epicor: { label: 'SIX S PARTNERS / ENTERPRISE SOFTWARE', title: 'Epicor Kinetic', body: '<p>Enterprise engineering experience connecting operational needs to practical software changes.</p><h3>Areas of work</h3><ul><li>Kinetic interfaces and dashboards.</li><li>Business Activity Queries, BPMs, and custom workflows.</li><li>Epicor REST integrations with third-party systems.</li><li>SQL performance and cross-functional delivery.</li></ul><p>Client implementations are discussed at a capability level, without publishing private source or business data.</p><p><a href="mailto:dallen@dallenlarson.com">Discuss enterprise engineering</a></p>' }
};
const dialog = document.querySelector('#project-dialog');
let opener;
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
 const project = details[button.dataset.project]; opener = button;
 document.querySelector('#dialog-label').textContent = project.label;
 document.querySelector('#dialog-title').textContent = project.title;
 document.querySelector('#dialog-body').innerHTML = project.body;
 dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r=dialog.getBoundingClientRect(); if(event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => opener?.focus());
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
