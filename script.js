const planets = [
  { name: 'Mercury', type: 'TERRESTRIAL', image: 'https://images-assets.nasa.gov/image/PIA16853/PIA16853~large.jpg', credit: 'NASA / JHU-APL / CARNEGIE', source: 'https://solarsystem.nasa.gov/planets/mercury/overview/', distance: '57.9 million km (0.39 AU)', year: '88 Earth days', fact: 'Mercury is the smallest planet and has extreme temperature changes.', summary: 'A small, cratered rocky world racing around the Sun. Despite being closest to the Sun, it is not the hottest planet—that distinction belongs to Venus.' },
  { name: 'Venus', type: 'TERRESTRIAL', image: 'https://images-assets.nasa.gov/image/PIA00104/PIA00104~large.jpg', credit: 'NASA / JPL', source: 'https://solarsystem.nasa.gov/planets/venus/overview/', distance: '108.2 million km (0.72 AU)', year: '225 Earth days', fact: 'A thick carbon-dioxide atmosphere traps heat, making Venus the hottest planet.', summary: 'A rocky planet wrapped in dense clouds. Its runaway greenhouse effect creates a scorching surface hotter than Mercury’s, even though Venus is farther from the Sun.' },
  { name: 'Earth', type: 'TERRESTRIAL', image: 'https://images-assets.nasa.gov/image/AS17-148-22727/AS17-148-22727~large.jpg', credit: 'NASA / APOLLO 17', source: 'https://solarsystem.nasa.gov/planets/earth/overview/', distance: '149.6 million km (1 AU)', year: '365.25 days', fact: 'Earth is the only world on which life is currently known to exist.', summary: 'Our ocean-rich home has liquid water on its surface and a protective atmosphere. It remains the only planet known to host life.' },
  { name: 'Mars', type: 'TERRESTRIAL', image: 'https://images-assets.nasa.gov/image/PIA00407/PIA00407~large.jpg', credit: 'NASA / JPL', source: 'https://solarsystem.nasa.gov/planets/mars/overview/', distance: '227.9 million km (1.52 AU)', year: '687 Earth days', fact: 'Iron minerals in Martian dust give the planet its familiar red color.', summary: 'A cold desert world with ancient river valleys, giant volcanoes, and a thin atmosphere. Robotic explorers study whether microbial life could ever have existed there.' },
  { name: 'Jupiter', type: 'GAS GIANT', image: 'https://images-assets.nasa.gov/image/PIA02873/PIA02873~large.jpg', credit: 'NASA / JPL / CASSINI', source: 'https://solarsystem.nasa.gov/planets/jupiter/overview/', distance: '778.6 million km (5.20 AU)', year: '11.86 Earth years', fact: 'Jupiter is the largest planet; its Great Red Spot is a giant storm.', summary: 'A giant world made mostly of hydrogen and helium. Jupiter has no solid surface like Earth, and its powerful storms have been observed for centuries.' },
  { name: 'Saturn', type: 'GAS GIANT', image: 'https://images-assets.nasa.gov/image/PIA09793/PIA09793~large.jpg', credit: 'NASA / JPL / SPACE SCIENCE INSTITUTE', source: 'https://solarsystem.nasa.gov/planets/saturn/overview/', distance: '1.43 billion km (9.58 AU)', year: '29.4 Earth years', fact: 'Saturn’s spectacular rings are made mostly of countless pieces of ice and rock.', summary: 'A gas giant famous for its broad ring system. The rings are vast but remarkably thin, and Saturn itself is less dense than water on average.' },
  { name: 'Uranus', type: 'ICE GIANT', image: 'https://images-assets.nasa.gov/image/PIA18182/PIA18182~large.jpg', credit: 'NASA / JPL-CALTECH', source: 'https://solarsystem.nasa.gov/planets/uranus/overview/', distance: '2.87 billion km (19.2 AU)', year: '84 Earth years', fact: 'Uranus rotates at an extreme tilt, essentially rolling around the Sun on its side.', summary: 'An ice giant with a blue-green atmosphere colored in part by methane. Its extreme axial tilt gives it unusual, long-lasting seasons.' },
  { name: 'Neptune', type: 'ICE GIANT', image: 'https://images-assets.nasa.gov/image/PIA01492/PIA01492~large.jpg', credit: 'NASA / JPL', source: 'https://solarsystem.nasa.gov/planets/neptune/overview/', distance: '4.50 billion km (30.1 AU)', year: '164.8 Earth years', fact: 'Neptune is the most distant planet from the Sun and has supersonic winds.', summary: 'A distant, cold ice giant. Neptune was the first planet located through mathematical prediction before it was observed through a telescope.' }
];

const selector = document.querySelector('#planet-selector');
const planetImage = document.querySelector('#planet-image');
const planetSource = document.querySelector('#planet-source');
const planetMore = document.querySelector('#planet-more');
let selectedPlanet = 0;

planets.forEach((planet, index) => {
  const button = document.createElement('button');
  button.className = 'planet-tab';
  button.type = 'button';
  button.setAttribute('aria-pressed', String(index === selectedPlanet));
  button.setAttribute('aria-label', `Show ${planet.name} facts`);
  button.innerHTML = `<span>${String(index + 1).padStart(2, '0')}</span>${planet.name}`;
  button.addEventListener('click', () => showPlanet(index));
  selector.append(button);
});

function showPlanet(index) {
  selectedPlanet = index;
  const planet = planets[index];
  selector.querySelectorAll('.planet-tab').forEach((button, buttonIndex) => {
    button.setAttribute('aria-pressed', String(buttonIndex === index));
  });
  document.querySelector('#planet-index').textContent = `PLANET ${String(index + 1).padStart(2, '0')}`;
  document.querySelector('#planet-kind').textContent = planet.type;
  document.querySelector('#planet-name').textContent = planet.name;
  document.querySelector('#planet-summary').textContent = planet.summary;
  document.querySelector('#planet-distance').textContent = planet.distance;
  document.querySelector('#planet-year').textContent = planet.year;
  document.querySelector('#planet-fact').textContent = planet.fact;
  document.querySelector('#planet-credit').textContent = `IMAGE: ${planet.credit}`;
  planetSource.href = planet.source;
  planetMore.href = planet.source;
  planetImage.alt = `${planet.name}, shown in a NASA spacecraft image or global mosaic. Image credit: ${planet.credit}.`;
  planetImage.style.opacity = '0.35';
  const nextImage = new Image();
  nextImage.onload = () => {
    planetImage.src = planet.image;
    planetImage.style.opacity = '1';
  };
  nextImage.onerror = () => {
    planetImage.style.opacity = '1';
    planetImage.alt = `NASA image for ${planet.name} could not be loaded. Open the NASA source link for its image and information.`;
  };
  nextImage.src = planet.image;
}
showPlanet(0);

const questions = [
  { q: 'Which planet is the hottest in our Solar System?', answers: ['Mercury', 'Venus', 'Mars', 'Jupiter'], correct: 1, note: 'Venus’s thick atmosphere traps heat in an intense greenhouse effect.' },
  { q: 'Which planet is known for its giant Great Red Spot storm?', answers: ['Saturn', 'Neptune', 'Jupiter', 'Uranus'], correct: 2, note: 'The Great Red Spot is a long-lived storm in Jupiter’s atmosphere.' },
  { q: 'Which planet has an extreme tilt and rotates almost on its side?', answers: ['Earth', 'Venus', 'Uranus', 'Mercury'], correct: 2, note: 'Uranus has an axial tilt of about 98 degrees.' },
  { q: 'What gives Mars much of its reddish appearance?', answers: ['Copper clouds', 'Iron-rich dust', 'Lava oceans', 'Red plants'], correct: 1, note: 'Iron minerals in Martian rocks and dust have oxidized—like rust.' },
  { q: 'Which statement about Kepler-442 b is scientifically careful?', answers: ['NASA has found life there', 'It is a confirmed second Earth', 'It is a candidate in its star’s habitable zone', 'It is inside our Solar System'], correct: 2, note: 'A habitable-zone orbit is not proof of surface water, habitability, or life.' }
];
let questionIndex = 0;
let score = 0;
let answered = false;
const quizQuestion = document.querySelector('#quiz-question');
const quizOptions = document.querySelector('#quiz-options');
const quizNext = document.querySelector('#quiz-next');
const quizFeedback = document.querySelector('#quiz-feedback');
const quizProgress = document.querySelector('#quiz-progress');
const quizScore = document.querySelector('#quiz-score');
const progressBar = document.querySelector('#quiz-progress-bar');

function renderQuestion() {
  answered = false;
  const question = questions[questionIndex];
  quizProgress.textContent = `QUESTION ${String(questionIndex + 1).padStart(2, '0')} / ${String(questions.length).padStart(2, '0')}`;
  quizScore.textContent = `SCORE  ${String(score).padStart(2, '0')}`;
  progressBar.style.width = `${(questionIndex / questions.length) * 100}%`;
  quizQuestion.textContent = question.q;
  quizFeedback.textContent = '';
  quizFeedback.className = 'quiz-feedback';
  quizOptions.replaceChildren();
  question.answers.forEach((answer, answerIndex) => {
    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'quiz-option';
    option.textContent = answer;
    option.setAttribute('aria-pressed', 'false');
    option.addEventListener('click', () => chooseAnswer(answerIndex));
    quizOptions.append(option);
  });
  quizNext.disabled = true;
  quizNext.innerHTML = questionIndex === questions.length - 1 ? 'See my result <span aria-hidden="true">→</span>' : 'Next question <span aria-hidden="true">→</span>';
}

function chooseAnswer(answerIndex) {
  if (answered) return;
  answered = true;
  const question = questions[questionIndex];
  const options = [...quizOptions.querySelectorAll('.quiz-option')];
  options.forEach((option, index) => {
    option.disabled = true;
    if (index === question.correct) option.classList.add('correct');
  });
  if (answerIndex === question.correct) {
    score += 1;
    quizFeedback.textContent = `Correct. ${question.note}`;
    quizFeedback.classList.add('good');
  } else {
    options[answerIndex].classList.add('incorrect');
    quizFeedback.textContent = `Not quite. ${question.note}`;
    quizFeedback.classList.add('try-again');
  }
  options[answerIndex].setAttribute('aria-pressed', 'true');
  quizScore.textContent = `SCORE  ${String(score).padStart(2, '0')}`;
  quizNext.disabled = false;
}

function showResult() {
  progressBar.style.width = '100%';
  quizProgress.textContent = 'MISSION COMPLETE';
  const message = score === questions.length ? 'Outstanding. You know your way around the cosmos.' : score >= 3 ? 'Nice work. Your cosmic curiosity is paying off.' : 'Good start. The planets are always here for another visit.';
  document.querySelector('#quiz-card').innerHTML = `<div class="quiz-result"><div class="result-score">${score}<span> / ${questions.length}</span></div><h3>Orbit complete.</h3><p>${message}</p><button class="button button-primary" id="quiz-restart" type="button">Try again <span aria-hidden="true">↻</span></button></div>`;
  document.querySelector('#quiz-restart').addEventListener('click', restartQuiz);
}

function restartQuiz() {
  score = 0;
  questionIndex = 0;
  document.querySelector('#quiz-card').innerHTML = '<div class="quiz-topline"><span id="quiz-progress">QUESTION 01 / 05</span><span class="quiz-score" id="quiz-score">SCORE&nbsp; 00</span></div><div class="progress-track" aria-hidden="true"><span id="quiz-progress-bar"></span></div><h3 class="quiz-question" id="quiz-question"></h3><div class="quiz-options" id="quiz-options" role="group" aria-label="Answer choices"></div><div class="quiz-feedback" id="quiz-feedback" aria-live="polite"></div><div class="quiz-controls"><span>ONE ANSWER. INFINITE CURIOSITY.</span><button class="button button-primary quiz-next" id="quiz-next" type="button" disabled>Next question <span aria-hidden="true">→</span></button></div>';
  // Rebind references after rebuilding the quiz card.
  bindQuiz();
  renderQuestion();
}

function bindQuiz() {
  const nextButton = document.querySelector('#quiz-next');
  nextButton.addEventListener('click', () => {
    if (!answered) return;
    if (questionIndex === questions.length - 1) {
      showResult();
      return;
    }
    questionIndex += 1;
    renderQuestion();
  });
  // Keep the module-level references in sync after a restart.
  window.quizNext = nextButton;
}

// Attach through a stable handler so a restarted quiz uses its new button node.
let activeNextButton = quizNext;
function attachNextButton() {
  activeNextButton = document.querySelector('#quiz-next');
  activeNextButton.addEventListener('click', () => {
    if (!answered) return;
    if (questionIndex === questions.length - 1) showResult();
    else { questionIndex += 1; renderQuestion(); }
  });
}
// Replace the initial button listener setup with the shared restart-safe handler.
quizNext.replaceWith(quizNext.cloneNode(true));
attachNextButton();
const originalRestartQuiz = restartQuiz;
window.restartQuiz = originalRestartQuiz;
renderQuestion();

const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Open navigation menu' : 'Close navigation menu');
  navLinks.classList.toggle('is-open', !expanded);
});
navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation menu');
  navLinks.classList.remove('is-open');
}));

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    }
  }), { threshold: 0.1 });
  revealItems.forEach((item) => observer.observe(item));
} else revealItems.forEach((item) => item.classList.add('is-visible'));
