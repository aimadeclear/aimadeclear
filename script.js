// 스크롤 시 섹션 페이드인
const obs=new IntersectionObserver(es=>{
  es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');obs.unobserve(e.target)}})
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// 모바일 내비게이션 토글
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

function closeNav() {
  navMenu.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', '메뉴 열기');
}

navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
});

// 메뉴 링크 클릭 시 닫기
navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
