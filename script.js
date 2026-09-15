const buttons = document.querySelectorAll('.chips button');
const answer = document.querySelector('.answer strong');
const answerP = document.querySelector('.answer p');
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    answer.textContent = btn.dataset.answer;
    answerP.textContent = "That's enough to start a conversation. We can work backwards from the problem.";
  });
});

const menu = document.querySelector('.menu');
const links = document.querySelector('.links');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  if (window.innerWidth <= 800) {
    links.style.display = open ? '' : 'flex';
    links.style.position = 'absolute';
    links.style.top = '78px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.padding = '20px';
    links.style.background = '#07090d';
    links.style.flexDirection = 'column';
    links.style.alignItems = 'stretch';
    links.style.borderBottom = '1px solid rgba(242,240,234,.12)';
  }
});
document.querySelectorAll('.links a').forEach(a => a.addEventListener('click', () => {
  if (window.innerWidth <= 800) {
    links.style.display = '';
    menu.setAttribute('aria-expanded','false');
  }
}));
