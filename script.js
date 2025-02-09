fetch('data.json')
  .then(response => response.json())
  .then(data => {
    document.querySelector('meta[property="og:title"]').setAttribute('content', data.meta.title);
    document.querySelector('meta[property="og:description"]').setAttribute('content', data.meta.description);
    document.querySelector('meta[property="og:image"]').setAttribute('content', data.meta.image);
    document.querySelector('meta[property="og:url"]').setAttribute('content', data.meta.url);
    document.querySelector('meta[name="description"]').setAttribute('content', data.meta.description);
    document.title = data.meta.title; 
    document.querySelector('.cyber-title').textContent = data.profile.name;
    document.querySelector('.profile-img').src = data.profile.image;
    document.querySelector('.glow-text').textContent = data.profile.description;
    
    document.querySelector('.about-title').textContent = data.about.title;
    document.querySelector('.about-content').textContent = data.about.content;

    const projectsGrid = document.querySelector('.grid');
    data.projects.forEach(project => {
      if (project.title && project.description) {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project-card');
        projectElement.innerHTML = `
          <h3><a href="${project.link}" target="_blank">${project.title}</a></h3>
          <p>${project.description}</p>
        `;
        projectsGrid.appendChild(projectElement);
      }
    });

    if (data.meta.background) {
      const style = document.createElement('style');
      style.innerHTML = `
        body {
          background: url("${data.meta.background}");
          width: 100%;
          margin: 0;
          cursor: none;
          padding: 0;
          overflow: hidden;
          background-size: cover;
          background-repeat: no-repeat;
          background-attachment: fixed;
        }
      `;
      document.head.appendChild(style);
    }

    const socialGrid = document.querySelector('.social-grid');
    data.socialLinks.forEach(social => {
      if (social.name && social.link) {
        const socialLinkElement = document.createElement('a');
        socialLinkElement.classList.add('social-link');
        socialLinkElement.href = social.link;
        socialLinkElement.target = "_blank";
        socialLinkElement.innerHTML = `
          <img src="${social.logo}" alt="${social.name}" width="32" height="32">
          <span>${social.name}</span>
        `;
        socialGrid.appendChild(socialLinkElement);
      }
    });

    const contactSection = document.querySelector('.contact-info');
    data.contact.forEach(contact => {
      if (contact.type && contact.value) {
        const contactElement = document.createElement('p');
        contactElement.innerHTML = `<strong>${contact.type}:</strong> ${contact.value}`;
        contactSection.appendChild(contactElement);
      }
    });
  })
  .catch(error => {
    console.error('Error fetching JSON data:', error);
  });

const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX - cursor.offsetWidth / 2}px`; 
  cursor.style.top = `${e.clientY - cursor.offsetHeight / 2}px`;
});

document.addEventListener('mouseenter', () => {
  cursor.style.display = 'block';
});

document.addEventListener('mouseleave', () => {
  cursor.style.display = 'none';
});

const musicButton = document.getElementById('music-btn');
const backgroundMusic = document.getElementById('background-music');
let isPlaying = false;

document.body.addEventListener('click', () => {
  if (!isPlaying) {
    backgroundMusic.play();
    isPlaying = true;
    musicButton.textContent = '⏸'; 
  }
}, { once: true });

musicButton.addEventListener('click', () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    musicButton.textContent = '⏸'; 
  } else {
    backgroundMusic.pause();
    musicButton.textContent = '▶'; 
  }
});
