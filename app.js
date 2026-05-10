/* Main interactive behavior (module) */
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const sections = Array.from(document.querySelectorAll('section'));
const themesGrid = document.getElementById('themesGrid');
const startExplore = document.getElementById('startExplore');
const contactForm = document.getElementById('contactForm');
const accessWeb = document.getElementById('accessWeb');
const downloadBtn = document.getElementById('downloadBtn');
const loginBtn = document.getElementById('loginBtn');
// new sidebar controls (behave like the topbar download & login)
const sidebarDownload = document.getElementById('sidebarDownload');
const sidebarUser = document.getElementById('sidebarUser');

menuToggle.addEventListener('click', ()=> sidebar.classList.toggle('open') );
/* accessWeb placeholder */
if(accessWeb){
  accessWeb.addEventListener('click', (e)=>{ e.preventDefault(); alert('Accéder à la version web — lien à configurer.'); });
}
if(downloadBtn){
  downloadBtn.addEventListener('click', (e)=>{ e.preventDefault(); alert('Téléchargement de l\'application — liens Google Play / App Store à configurer.'); });
}
// sidebar download mirrors the top download behaviour
if(sidebarDownload){
  sidebarDownload.addEventListener('click', (e)=>{ e.preventDefault(); alert('Téléchargement de l\'application — liens Google Play / App Store à configurer.'); });
}
if(loginBtn){
  // simple client-side navigation to a welcome page (stands in for a real Google login flow)
  loginBtn.addEventListener('click', (e)=>{
    window.location.href = 'welcome.html';
  });
}
// sidebar user icon mirrors the login button and navigates to the same welcome page
if(sidebarUser){
  sidebarUser.addEventListener('click', (e)=>{
    window.location.href = 'welcome.html';
  });
}

/* Show only one section at a time */
function showSection(id){
  sections.forEach(sec=>{
    if(sec.id === id){
      sec.style.display = 'block';
    } else {
      sec.style.display = 'none';
    }
  });
  navLinks.forEach(l=> l.classList.toggle('active', l.dataset.target === id) );
  // close sidebar on mobile
  if(window.innerWidth < 700) sidebar.classList.remove('open');
}

/* Initialize: show intro only */
showSection('intro');

navLinks.forEach(link=>{
  link.addEventListener('click', (e)=>{
    const targetId = link.dataset.target;
    if(targetId) showSection(targetId);
  });
});

/* Predefined themes - sample, adaptable to Belgian curriculum */
const THEMES = [
  { id:'m1', title:'1ère année (≈ 2,5–4 ans)', tag:'Maternelles', desc:'Développement du langage oral, motricité, premiers nombres (1–5), découverte des formes, éveil sensoriel, autonomie de base et premières activités créatives.' },
  { id:'m2', title:'2ème année (≈ 4–5 ans)', tag:'Maternelles', desc:'Langage plus structuré, vocabulaire enrichi, comptage jusqu’à 10, repérage spatial, premières expériences scientifiques et coordination motrice.' },
  { id:'m3', title:'3ème année (≈ 5–6 ans)', tag:'Maternelles', desc:'Pré-lecture et pré-écriture, comptage jusqu’à 20+, logique simple, repères temporels, expériences guidées et autonomie renforcée.' },

  { id:'p1', title:'1ère année (≈ 6–7 ans)', tag:'Primaires', desc:'Entrée lecture/écriture, nombres jusqu’à 100, opérations simples, formes de base, repères temps/espace et découverte sciences.' },
  { id:'p2', title:'2ème année (≈ 7–8 ans)', tag:'Primaires', desc:'Lecture fluide, écriture de récits courts, multiplication, mesures simples, solides et premières notions du monde vivant.' },
  { id:'p3', title:'3ème année (≈ 8–9 ans)', tag:'Primaires', desc:'Compréhension de textes, multiplication/division, fractions simples, géométrie, sciences fondamentales et bases histoire/géo.' },
  { id:'p4', title:'4ème année (≈ 9–10 ans)', tag:'Primaires', desc:'Analyse de textes, fractions/décimaux, géométrie avancée, périmètres/aires et sciences (énergie, électricité).' },
  { id:'p5', title:'5ème année (≈ 10–11 ans)', tag:'Primaires', desc:'Textes argumentatifs, pourcentages, proportionnalité, volumes, écologie et histoire Europe/Belgique.' },
  { id:'p6', title:'6ème année (≈ 11–12 ans)', tag:'Primaires', desc:'Analyse critique, écriture structurée, maths avancées, démarche scientifique et citoyenneté complète.' }
];

function renderThemes(){
  themesGrid.innerHTML = '';
  // color classes to cycle through: primary (m), secondary (s), tertiary (t)
  const colorClasses = ['m1','m2','m3','s1','s2','s3','t1','t2','t3'];
  THEMES.forEach((t, idx)=>{
    const card = document.createElement('div');
    card.className = 'card';
    // include data-index to allow mapping to metallic classes
    card.innerHTML = `
      <div class="tag">${t.tag}</div>
      <h3>${t.title}</h3>
      <p>${t.desc}</p>
      <div class="meta">
        <button class="btn small metallic" data-id="${t.id}" data-idx="${idx}">
          <span class="animal-icon" aria-hidden></span>
          <span class="btn-label">Voir</span>
        </button>
      </div>
    `;
    themesGrid.appendChild(card);

    // if the card tag mentions "Maternelles" or "Primaires", apply a metallic grey variant
    if(/matern|primair/i.test(t.tag)){
      card.classList.add('metal-grey');
    }

    // assign a bright metallic variant cycling through the palette and inject an animal icon with colored background
    const btn = card.querySelector('button[data-id]');
    const cls = colorClasses[idx % colorClasses.length];
    if(btn) {
      btn.classList.add(cls);
      // also add the same variant class to the card title so the title color matches the button
      const titleEl = card.querySelector('h3');
      if(titleEl) titleEl.classList.add(cls);

      // explicit animal emoji per theme to match grade labels (M1..P6)
      const animals = {
        m1: '🐣', // 1ère maternelle
        m2: '🐿️', // 2ème maternelle
        m3: '🦊', // 3ème maternelle
        p1: '🐼', // 1ère primaire
        p2: '🐬', // 2ème primaire
        p3: '🦉', // 3ème primaire
        p4: '🐺', // 4ème primaire
        p5: '🦅', // 5ème primaire
        p6: '🦁'  // 6ème primaire
      };
      const colors = ['#e64545','#ff6b00','#ffb300','#00bcd4','#3c8d0d','#7d3aa7','#e02359','#2b3aa6','#00a140'];
      const icon = btn.querySelector('.animal-icon');
      if(icon){
        const themeId = btn.dataset.id;
        const a = animals[themeId] || '🐶';
        // keep a pleasant tint based on index as before
        const bg = colors[idx % colors.length];
        icon.textContent = a;
        icon.style.background = bg;
      }
    }
  });

  // attach click handlers for "Voir" to open modal with specific content
  const modal = document.getElementById('themeModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalImg = document.getElementById('modalImg');
  const modalMore = document.getElementById('modalMore');
  const modalAudio = document.getElementById('modalAudio');

  // map of extra content per theme (image and longer description / link)
  const THEME_DETAILS = THEMES.reduce((acc,t)=>{
    acc[t.id] = {
      title: t.title,
      img: '/banner.png',
      // default: simple paragraph for other themes
      desc: `<p>${t.desc} — Contenu détaillé et ressources pédagogiques spécifiques à ce niveau.</p>`
    };
    return acc;
  }, {});

  // replace M1 with a rich, iconified bullet-list + animations
  THEME_DETAILS['m1'] = {
    title: '1ère année (≈ 2,5–4 ans)',
    img: '/banner.png',
    desc: `
      <!-- Objectif card placed above competences -->
      <div class="objective-card">
        <div class="objective-inner">
          <div class="obj-ico">🎯</div>
          <div class="obj-text">
            <p><strong>Découverte du monde et autonomie de base</strong></p>
            <p class="muted">Favoriser l'exploration, les premiers repères numériques et la confiance dans les gestes de la vie quotidienne.</p>
          </div>
        </div>
      </div>

      <!-- small regional description for 1ère maternelle (Bruxelles) -->
      <p class="muted" style="margin-top:8px;font-size:13px">En Région de Bruxelles-Capitale (Belgique) : accueil des enfants ≈ 2,5–4 ans centré sur le jeu symbolique, le langage oral, la socialisation et les premiers repères sensoriels et numériques.</p>

      <div class="theme-grid" style="margin-top:12px">
        <div class="theme-col">
          <h4>Compétences clés</h4>
          <ul class="feature-list">
            <li><span class="ico">🗣️</span> Développer le langage oral</li>
            <li><span class="ico">🧭</span> Explorer le corps et l’espace</li>
            <li><span class="ico">🔢</span> Découvrir les nombres jusqu’à 5</li>
            <li><span class="ico">🤸</span> Développer la motricité globale et fine</li>
          </ul>
        </div>
        <div class="theme-col">
          <h4>Thèmes</h4>
          <ul class="activity-list">
            <li><span class="ico">🏷️</span> Nommer objets de la classe</li>
            <li><span class="ico">🎶</span> Comptines et chansons</li>
            <li><span class="ico">🟦</span> Jeux de tri (couleurs / formes)</li>
            <li><span class="ico">🛝</span> Parcours moteurs (courir, sauter, grimper)</li>
            <li><span class="ico">🎨</span> Dessin libre et peinture</li>
            <li><span class="ico">🎭</span> Jeux d’imitation</li>
            <li><span class="ico">🧩</span> Manipulation (pâte à modeler, blocs)</li>
            <li><span class="ico">🧥</span> Premiers gestes d’autonomie (s’habiller, ranger)</li>
          </ul>
        </div>
      </div>

      <p class="muted" style="margin-top:12px">Ressources et exemples d'activités disponibles dans les modules dédiés.</p>
    `
  };

  // rich modal content for 2ème année mirroring 1ère année format
  THEME_DETAILS['m2'] = {
    title: '2ème année (≈ 4–5 ans)',
    img: '/banner.png',
    desc: `
      <!-- Objectif card placed above competences -->
      <div class="objective-card">
        <div class="objective-inner">
          <div class="obj-ico">🎯</div>
          <div class="obj-text">
            <p><strong>Structurer le langage et la logique</strong></p>
            <p class="muted">Consolider le langage oral, introduire des consignes en plusieurs étapes et développer des premiers raisonnements logiques.</p>
          </div>
        </div>
      </div>

      <!-- small regional description for 2ème maternelle (Bruxelles) -->
      <p class="muted" style="margin-top:8px;font-size:13px">En Région de Bruxelles-Capitale (Belgique) : la 2ème maternelle renforce le vocabulaire, la compréhension de consignes multi-étapes et les premiers apprentissages numériques et logiques.</p>

      <div class="theme-grid" style="margin-top:12px">
        <div class="theme-col">
          <h4>Compétences clés</h4>
          <ul class="feature-list">
            <li><span class="ico">📚</span> Enrichir le vocabulaire</li>
            <li><span class="ico">🧠</span> Comprendre consignes en plusieurs étapes</li>
            <li><span class="ico">🔢</span> Compter jusqu’à 10</li>
            <li><span class="ico">🧭</span> Se repérer dans l’espace</li>
          </ul>
        </div>
        <div class="theme-col">
          <h4>Thèmes</h4>
          <ul class="activity-list">
            <li><span class="ico">📖</span> Raconter une histoire vécue</li>
            <li><span class="ico">📦</span> Jeux de classement (taille, forme)</li>
            <li><span class="ico">🔢</span> Comptage d’objets du quotidien</li>
            <li><span class="ico">🧪</span> Expériences simples (eau, sable, aimants)</li>
            <li><span class="ico">🧠</span> Jeux de mémoire</li>
            <li><span class="ico">✂️</span> Découpage et collage précis</li>
            <li><span class="ico">🏃</span> Parcours moteurs complexes</li>
            <li><span class="ico">🎭</span> Jeux de rôle (magasin, maison)</li>
          </ul>
        </div>
      </div>

      <p class="muted" style="margin-top:12px">Ressources détaillées et exemples d’activités disponibles dans les modules dédiés pour ce niveau.</p>
    `
  };

  // rich modal content for 3ème année (≈ 5–6 ans) matching format of others
  THEME_DETAILS['m3'] = {
    title: '3ème année (≈ 5–6 ans)',
    img: '/banner.png',
    desc: `
      <!-- Objectif card placed above competences -->
      <div class="objective-card">
        <div class="objective-inner">
          <div class="obj-ico">🎯</div>
          <div class="obj-text">
            <p><strong>Préparer la primaire</strong></p>
            <p class="muted">Renforcer les bases de la lecture/écriture, consolider le comptage et la compréhension du temps pour faciliter la transition vers la 1ère primaire.</p>
          </div>
        </div>
      </div>

      <!-- small regional description for 3ème maternelle (Bruxelles) -->
      <p class="muted" style="margin-top:8px;font-size:13px">En Région de Bruxelles-Capitale (Belgique) : la 3ème maternelle prépare activement l'entrée à l'école primaire en consolidant compétences pré-lectrices, écriture initiale et repères numériques et temporels.</p>

      <div class="theme-grid" style="margin-top:12px">
        <div class="theme-col">
          <h4>Compétences clés</h4>
          <ul class="feature-list">
            <li><span class="ico">🔤</span> Pré-lecture (sons, lettres)</li>
            <li><span class="ico">✍️</span> Pré-écriture (prénom, mots simples)</li>
            <li><span class="ico">🔢</span> Compter jusqu’à 20+</li>
            <li><span class="ico">⏳</span> Comprendre le temps (hier/demain)</li>
          </ul>
        </div>
        <div class="theme-col">
          <h4>Thèmes</h4>
          <ul class="activity-list">
            <li><span class="ico">🔎</span> Reconnaître lettres et sons</li>
            <li><span class="ico">✍️</span> Écrire son prénom sans modèle</li>
            <li><span class="ico">🗣️</span> Jeux de syllabes</li>
            <li><span class="ico">🧩</span> Petits problèmes logiques</li>
            <li><span class="ico">📅</span> Calendrier des jours</li>
            <li><span class="ico">🧪</span> Expériences scientifiques guidées</li>
            <li><span class="ico">🎲</span> Jeux de société simples</li>
            <li><span class="ico">🧥</span> Activités d’autonomie complète</li>
          </ul>
        </div>
      </div>

      <p class="muted" style="margin-top:12px">Ressources et exemples d'activités prêts pour accompagner la préparation à la première primaire.</p>
    `
  };

  /* Rich modal content for primary years (P1 - P6) */
  THEME_DETAILS['p1'] = {
    title: '1ère année (≈ 6–7 ans)',
    img: '/banner.png',
    desc: `
      <div class="objective-card">
        <div class="objective-inner">
          <div class="obj-ico">🎯</div>
          <div class="obj-text">
            <p><strong>Entrée dans les apprentissages fondamentaux</strong></p>
            <p class="muted">Accompagner la découverte structurée de la lecture, de l'écriture et des premiers calculs plus formels.</p>
          </div>
        </div>
      </div>

      <div class="theme-grid" style="margin-top:12px">
        <div class="theme-col">
          <h4>Compétences clés</h4>
          <ul class="feature-list">
            <li><span class="ico">📝</span> Lire et écrire des phrases simples</li>
            <li><span class="ico">🔢</span> Compter jusqu’à 100</li>
            <li><span class="ico">➕➖</span> Addition et soustraction</li>
            <li><span class="ico">🧭</span> Découvrir espace et temps</li>
          </ul>
        </div>
        <div class="theme-col">
          <h4>Activités</h4>
          <ul class="activity-list">
            <li><span class="ico">📚</span> Lecture de mots simples</li>
            <li><span class="ico">✍️</span> Écriture de phrases courtes</li>
            <li><span class="ico">🗒️</span> Dictées faciles</li>
            <li><span class="ico">🧮</span> Problèmes concrets (achat, objets)</li>
            <li><span class="ico">🎲</span> Jeux de calcul mental</li>
            <li><span class="ico">🔷</span> Dessin de formes géométriques</li>
            <li><span class="ico">🔎</span> Observation de la nature</li>
            <li><span class="ico">🕘</span> Repérage dans la journée</li>
          </ul>
        </div>
      </div>
    `
  };

  THEME_DETAILS['p2'] = {
    title: '2ème année (≈ 7–8 ans)',
    img: '/banner.png',
    desc: `
      <div class="objective-card">
        <div class="objective-inner">
          <div class="obj-ico">🎯</div>
          <div class="obj-text">
            <p><strong>Automatisation des bases</strong></p>
            <p class="muted">Renforcer fluidité de lecture, calculs simples et premières mesures pratiques.</p>
          </div>
        </div>
      </div>

      <div class="theme-grid" style="margin-top:12px">
        <div class="theme-col">
          <h4>Compétences clés</h4>
          <ul class="feature-list">
            <li><span class="ico">🔊</span> Lecture fluide</li>
            <li><span class="ico">✖️</span> Multiplication</li>
            <li><span class="ico">📏</span> Mesures simples</li>
            <li><span class="ico">📖</span> Compréhension de textes</li>
          </ul>
        </div>
        <div class="theme-col">
          <h4>Activités</h4>
          <ul class="activity-list">
            <li><span class="ico">🔈</span> Lecture à voix haute</li>
            <li><span class="ico">📝</span> Rédaction de petits récits</li>
            <li><span class="ico">✖️</span> Tables de multiplication</li>
            <li><span class="ico">📏</span> Mesures (mètre, litre, kg)</li>
            <li><span class="ico">🧩</span> Jeux de problèmes</li>
            <li><span class="ico">🧪</span> Expériences scientifiques simples</li>
            <li><span class="ico">🎭</span> Jeux de rôle et dialogues</li>
            <li><span class="ico">🌱</span> Observation du vivant</li>
          </ul>
        </div>
      </div>
    `
  };

  THEME_DETAILS['p3'] = {
    title: '3ème année (≈ 8–9 ans)',
    img: '/banner.png',
    desc: `
      <div class="objective-card">
        <div class="objective-inner">
          <div class="obj-ico">🎯</div>
          <div class="obj-text">
            <p><strong>Structuration du raisonnement</strong></p>
            <p class="muted">Faire évoluer la compréhension et la logique mathématique vers des démarches plus abstraites.</p>
          </div>
        </div>
      </div>

      <div class="theme-grid" style="margin-top:12px">
        <div class="theme-col">
          <h4>Compétences clés</h4>
          <ul class="feature-list">
            <li><span class="ico">📚</span> Compréhension de textes</li>
            <li><span class="ico">➗</span> Division et fractions simples</li>
            <li><span class="ico">🔺</span> Géométrie de base</li>
            <li><span class="ico">🔬</span> Sciences fondamentales</li>
          </ul>
        </div>
        <div class="theme-col">
          <h4>Thèmes</h4>
          <ul class="activity-list">
            <li><span class="ico">📝</span> Résumer un texte</li>
            <li><span class="ico">🧠</span> Résolution de problèmes</li>
            <li><span class="ico">🥧</span> Fractions (partage)</li>
            <li><span class="ico">📐</span> Construction de figures</li>
            <li><span class="ico">⚗️</span> Expériences matière/énergie</li>
            <li><span class="ico">🗺️</span> Cartes simples</li>
            <li><span class="ico">⏳</span> Chronologie historique</li>
            <li><span class="ico">🧩</span> Jeux de logique</li>
          </ul>
        </div>
      </div>
    `
  };

  THEME_DETAILS['p4'] = {
    title: '4ème année (≈ 9–10 ans)',
    img: '/banner.png',
    desc: `
      <div class="objective-card">
        <div class="objective-inner">
          <div class="obj-ico">🎯</div>
          <div class="obj-text">
            <p><strong>Approfondissement et organisation</strong></p>
            <p class="muted">Approfondir méthodes de travail, savoir analyser et appliquer notions numériques et spatiales.</p>
          </div>
        </div>
      </div>

      <div class="theme-grid" style="margin-top:12px">
        <div class="theme-col">
          <h4>Compétences clés</h4>
          <ul class="feature-list">
            <li><span class="ico">🧐</span> Analyse de textes</li>
            <li><span class="ico">🔢</span> Décimaux et fractions</li>
            <li><span class="ico">📐</span> Géométrie avancée</li>
            <li><span class="ico">🔬</span> Notions scientifiques</li>
          </ul>
        </div>
        <div class="theme-col">
          <h4>Thèmes</h4>
          <ul class="activity-list">
            <li><span class="ico">✍️</span> Rédaction structurée</li>
            <li><span class="ico">🔢</span> Calculs décimaux</li>
            <li><span class="ico">📏</span> Aires et périmètres</li>
            <li><span class="ico">⚡</span> Expériences électricité/énergie</li>
            <li><span class="ico">🗺️</span> Lecture de cartes</li>
            <li><span class="ico">📊</span> Analyse de documents</li>
            <li><span class="ico">🤝</span> Projets en groupe</li>
            <li><span class="ico">🧩</span> Résolution de problèmes complexes</li>
          </ul>
        </div>
      </div>
    `
  };

  THEME_DETAILS['p5'] = {
    title: '5ème année (≈ 10–11 ans)',
    img: '/banner.png',
    desc: `
      <div class="objective-card">
        <div class="objective-inner">
          <div class="obj-ico">🎯</div>
          <div class="obj-text">
            <p><strong>Raisonnement et autonomie intellectuelle</strong></p>
            <p class="muted">Développer argumentation, proportionnalité et compréhension des enjeux environnementaux.</p>
          </div>
        </div>
      </div>

      <div class="theme-grid" style="margin-top:12px">
        <div class="theme-col">
          <h4>Compétences clés</h4>
          <ul class="feature-list">
            <li><span class="ico">🗣️</span> Textes argumentatifs</li>
            <li><span class="ico">📈</span> Pourcentages</li>
            <li><span class="ico">⚖️</span> Proportionnalité</li>
            <li><span class="ico">🌍</span> Sciences environnementales</li>
          </ul>
        </div>
        <div class="theme-col">
          <h4>Thèmes</h4>
          <ul class="activity-list">
            <li><span class="ico">🗣️</span> Débats simples</li>
            <li><span class="ico">➗</span> Calcul de pourcentages</li>
            <li><span class="ico">📐</span> Problèmes de proportion</li>
            <li><span class="ico">🌱</span> Étude des écosystèmes</li>
            <li><span class="ico">🏛️</span> Histoire Belgique/Europe</li>
            <li><span class="ico">📊</span> Graphiques et données</li>
            <li><span class="ico">🤝</span> Projets collaboratifs</li>
            <li><span class="ico">🧠</span> Analyse critique simple</li>
          </ul>
        </div>
      </div>
    `
  };

  THEME_DETAILS['p6'] = {
    title: '6ème année (≈ 11–12 ans)',
    img: '/banner.png',
    desc: `
      <div class="objective-card">
        <div class="objective-inner">
          <div class="obj-ico">🎯</div>
          <div class="obj-text">
            <p><strong>Préparation secondaire</strong></p>
            <p class="muted">Structurer raisonnement critique, méthodologie scientifique et autonomie dans le travail.</p>
          </div>
        </div>
      </div>

      <div class="theme-grid" style="margin-top:12px">
        <div class="theme-col">
          <h4>Compétences clés</h4>
          <ul class="feature-list">
            <li><span class="ico">🔎</span> Analyse critique</li>
            <li><span class="ico">✍️</span> Rédaction structurée</li>
            <li><span class="ico">📐</span> Maths avancées</li>
            <li><span class="ico">🔬</span> Démarche scientifique complète</li>
          </ul>
        </div>
        <div class="theme-col">
          <h4>Thèmes</h4>
          <ul class="activity-list">
            <li><span class="ico">📝</span> Dissertation simple</li>
            <li><span class="ico">🧩</span> Problèmes complexes</li>
            <li><span class="ico">🔬</span> Expériences complètes</li>
            <li><span class="ico">📚</span> Analyse de textes</li>
            <li><span class="ico">🔗</span> Projets interdisciplinaires</li>
            <li><span class="ico">🏛️</span> Citoyenneté et débat</li>
            <li><span class="ico">📈</span> Lecture de données complexes</li>
            <li><span class="ico">🗂️</span> Organisation autonome du travail</li>
          </ul>
        </div>
      </div>
    `
  };

  // map short team/subtitle labels (emoji + name) per level to display under modal title
  const SUBTITLES = {
    m1: '🐣 Les Poussins Courageux',
    m2: '🐿️ Les Écureuils Malins',
    m3: '🦊 Les Renards Curieux',
    p1: '🐼 Les Pandas Appliqués',
    p2: '🐬 Les Dauphins Astucieux',
    p3: '🦉 Les Hiboux Futés',
    p4: '🐺 Les Loups Organisés',
    p5: '🦅 Les Aigles Ambitieux',
    p6: '🦁 Les Lions Confiants'
  };

  themesGrid.querySelectorAll('button[data-id]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const id = e.currentTarget.dataset.id;
      const data = THEME_DETAILS[id] || {};
      // set modal title text
      modalTitle.textContent = data.title || 'Thème';
      // copy metallic variant class (m1..m3 / s1..s3 / t1..t3) from the clicked button so modal title & subtitle color match
      const variantClass = Array.from(e.currentTarget.classList).find(c=> /^(m|s|t)\d$/.test(c));
      // reset any previous variant classes and apply the found one
      modalTitle.className = '';
      modalSubtitle.className = 'muted';
      if(variantClass){
        modalTitle.classList.add(variantClass);
        modalSubtitle.classList.add(variantClass);
      }
      // subtitle (emoji + team name) under the title
      modalSubtitle.textContent = SUBTITLES[id] || '';
      // allow rich HTML (lists, icons, small animations)
      modalDesc.innerHTML = data.desc || '';
      modalImg.src = data.img || '/banner.png';
      modalImg.alt = data.title || '';
      // set "Voir plus" to navigate to Playlists and close modal
      modalMore.href = '#playlists';
      modalMore.onclick = (ev)=>{
        ev.preventDefault();
        modal.setAttribute('aria-hidden','true');
        // navigate to playlists section
        showSection('playlists');
      };
      // set audio source for the modal player (same demo song for each theme)
      if(modalAudio){
        // prefer the theme-specific file if needed; default demo file used here
        modalAudio.src = '/Les_Poussins_Courageux.mp3';
        modalAudio.load();
      }

      // show modal
      modal.setAttribute('aria-hidden','false');

      // trap focus briefly and wire close buttons (pause & reset audio on close)
      const closeButtons = modal.querySelectorAll('[data-close]');
      closeButtons.forEach(cb=> cb.addEventListener('click', ()=> {
        modal.setAttribute('aria-hidden','true');
        if(modalAudio){
          modalAudio.pause();
          modalAudio.currentTime = 0;
        }
      }));
    })
  });
}

renderThemes();

startExplore.addEventListener('click', ()=> {
  showSection('themes');
});

// "Découvrir nos playlists" button -> navigate to playlists
const tryAI = document.getElementById('tryAI');
if(tryAI){
  tryAI.addEventListener('click', (e)=>{
    e.preventDefault();
    showSection('playlists');
    // small visual feedback: pulse the playlists section briefly
    const pl = document.getElementById('playlists');
    if(pl){
      pl.animate([{ transform: 'scale(0.995)' }, { transform: 'scale(1)' }], { duration: 220, easing: 'ease-out' });
    }
  });
}

// about card quick link to playlists
const aboutPlaylists = document.getElementById('aboutPlaylists');
if(aboutPlaylists){
  aboutPlaylists.addEventListener('click',(e)=>{
    e.preventDefault();
    showSection('playlists');
  });
}

/* (Removed AI generator and audio prototype handlers) */

/* Contact form faux envoi -> open mail client with prefilled mailto to project email */
contactForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const establishment = document.getElementById('establishment').value.trim();
  const email = document.getElementById('email').value.trim();
  const interest = document.getElementById('interest').value;
  const message = document.getElementById('message').value.trim();

  // require name, email, subject and message
  const missing = [];
  if(!name) missing.push('Nom Prénom');
  if(!email) missing.push('Email');
  if(!interest) missing.push('Sujet');
  if(!message) missing.push('Message');

  if(missing.length){
    document.getElementById('formMsg').textContent = `Veuillez remplir le(s) champ(s) obligatoire(s) : ${missing.join(', ')}.`;
    return;
  }

  // build subject and body, safely encode
  const subject = encodeURIComponent(`Contact LGEC — ${interest}`);
  let bodyLines = [];
  bodyLines.push(`Nom / Prénom: ${name}`);
  if(establishment) bodyLines.push(`Établissement: ${establishment}`);
  bodyLines.push(`Email: ${email}`);
  bodyLines.push(`Sujet: ${interest}`);
  bodyLines.push('');
  bodyLines.push('Message:');
  bodyLines.push(message);
  const body = encodeURIComponent(bodyLines.join('\n'));

  const to = 'moh.boussati@gmail.com';
  const mailto = `mailto:${to}?subject=${subject}&body=${body}`;

  // open user's mail client with prefilled message
  window.location.href = mailto;

  document.getElementById('formMsg').textContent = 'Ouverture du client mail...';
  contactForm.reset();
});

/* Accessibility: close sidebar on outside click (mobile) */
document.addEventListener('click', (e)=>{
  if(window.innerWidth < 700 && sidebar.classList.contains('open')){
    const withinSidebar = e.composedPath().includes(sidebar) || e.composedPath().includes(menuToggle);
    if(!withinSidebar) sidebar.classList.remove('open');
  }
});

/* Remove scroll-based highlighting since sections are toggled */