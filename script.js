const obs=new IntersectionObserver(es=>{
  es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');obs.unobserve(e.target)}})
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
}

const updateGiscusTheme = (theme) => {
  const frame = document.querySelector('iframe.giscus-frame');
  if (!frame) return;

  frame.contentWindow.postMessage({
    giscus: {
      setConfig: {
        theme: theme === 'dark' ? 'dark' : 'light'
      }
    }
  }, 'https://giscus.app');
};

const getActiveTheme = () =>
  document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

const giscusObserver = new MutationObserver(() => updateGiscusTheme(getActiveTheme()));
const commentsPanel = document.querySelector('.comments-panel');
if (commentsPanel) {
  giscusObserver.observe(commentsPanel, { childList: true, subtree: true });
}

themeToggle.addEventListener('click', () => {
  let theme = document.documentElement.getAttribute('data-theme');
  if (theme === 'dark') {
    theme = 'light';
    document.documentElement.removeAttribute('data-theme');
  } else {
    theme = 'dark';
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  localStorage.setItem('theme', theme);
  updateGiscusTheme(theme);
});
