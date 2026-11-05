const planets = [
  { name: 'Mercury', id: 'PIA16853', type: 'TERRESTRIAL', image: 'https://images-assets.nasa.gov/image/PIA16853/PIA16853~thumb.jpg', fallback: 'https://images-assets.nasa.gov/image/PIA16853/PIA16853~large.jpg', credit: 'NASA / JHU-APL / CARNEGIE', distance: '57.9 million km', year: '88 Earth days', fact: 'The smallest planet—and the closest to the Sun.', description: 'A small, cratered rocky world racing around the Sun. Despite being closest to the Sun, Mercury is not the hottest planet; Venus holds that distinction.', nasaSource: 'https://images.nasa.gov/details/PIA16853' },
  { name: 'Venus', id: 'PIA00104', type: 'TERRESTRIAL', image: 'https://images-assets.nasa.gov/image/PIA00104/PIA00104~thumb.jpg', fallback: 'https://images-assets.nasa.gov/image/PIA00104/PIA00104~large.jpg', credit: 'NASA / JPL', distance: '108.2 million km', year: '225 Earth days', fact: 'The hottest planet, due to its dense atmosphere.', description: 'Venus is a rocky planet wrapped in dense clouds. Its runaway greenhouse effect creates a scorching surface hotter than Mercury, even though Venus is farther from the Sun.', nasaSource: 'https://images.nasa.gov/details/PIA00104' },
  { name: 'Earth', id: 'AS17-148-22727', type: 'TERRESTRIAL', image: 'https://images-assets.nasa.gov/image/AS17-148-22727/AS17-148-22727~thumb.jpg', fallback: 'https://images-assets.nasa.gov/image/AS17-148-22727/AS17-148-22727~large.jpg', credit: 'NASA / APOLLO 17', distance: '149.6 million km', year: '365.25 days', fact: 'The only world known to support life.', description: 'Our ocean-rich home has liquid water on its surface and a protective atmosphere. Earth remains the only planet known to host life.', nasaSource: 'https://images.nasa.gov/details/AS17-148-22727' },
  { name: 'Mars', id: 'PIA00407', type: 'TERRESTRIAL', image: 'https://images-assets.nasa.gov/image/PIA00407/PIA00407~thumb.jpg', fallback: 'https://images-assets.nasa.gov/image/PIA00407/PIA00407~large.jpg', credit: 'NASA / JPL', distance: '227.9 million km', year: '687 Earth days', fact: 'Iron-rich dust gives Mars its rusty-red color.', description: 'Mars is a cold desert world with ancient river valleys, giant volcanoes, and a thin atmosphere. Robotic explorers investigate its past and whether it could once have supported microbial life.', nasaSource: 'https://images.nasa.gov/details/PIA00407' },
  { name: 'Jupiter', id: 'PIA02873', type: 'GAS GIANT', image: 'https://images-assets.nasa.gov/image/PIA02873/PIA02873~thumb.jpg', fallback: 'https://images-assets.nasa.gov/image/PIA02873/PIA02873~large.jpg', credit: 'NASA / JPL / CASSINI', distance: '778.6 million km', year: '11.86 Earth years', fact: 'The largest planet; home to the Great Red Spot.', description: 'A giant world made mostly of hydrogen and helium. Jupiter has no solid surface like Earth, and its immense Great Red Spot is a long-lived atmospheric storm.', nasaSource: 'https://images.nasa.gov/details/PIA02873' },
  { name: 'Saturn', id: 'PIA09793', type: 'GAS GIANT', image: 'https://images-assets.nasa.gov/image/PIA09793/PIA09793~thumb.jpg', fallback: 'https://images-assets.nasa.gov/image/PIA09793/PIA09793~large.jpg', credit: 'NASA / JPL / SSI', distance: '1.43 billion km', year: '29.4 Earth years', fact: 'Its bright rings are made mostly of ice and rocky debris.', description: 'Saturn is a gas giant famous for its broad ring system. The rings span a huge distance but are remarkably thin compared with their width.', nasaSource: 'https://images.nasa.gov/details/PIA09793' },
  { name: 'Uranus', id: 'PIA18182', type: 'ICE GIANT', image: 'https://images-assets.nasa.gov/image/PIA18182/PIA18182~thumb.jpg', fallback: 'https://images-assets.nasa.gov/image/PIA18182/PIA18182~large.jpg', credit: 'NASA / JPL-CALTECH', distance: '2.87 billion km', year: '84 Earth years', fact: 'Its extreme axial tilt makes it rotate almost on its side.', description: 'An ice giant with a blue-green atmosphere colored in part by methane. Its extreme axial tilt gives Uranus unusual, long-lasting seasons.', nasaSource: 'https://images.nasa.gov/details/PIA18182' },
  { name: 'Neptune', id: 'PIA01492', type: 'ICE GIANT', image: 'https://images-assets.nasa.gov/image/PIA01492/PIA01492~thumb.jpg', fallback: 'https://images-assets.nasa.gov/image/PIA01492/PIA01492~large.jpg', credit: 'NASA / JPL', distance: '4.50 billion km', year: '164.8 Earth years', fact: 'The most distant planet, with supersonic winds.', description: 'A distant, cold ice giant. Neptune was the first planet located through mathematical prediction before it was observed through a telescope.', nasaSource: 'https://images.nasa.gov/details/PIA01492' }
];

const grid = document.querySelector('#planet-grid');
const dialog = document.querySelector('#planet-dialog');
const dialogClose = document.querySelector('#dialog-close');
const dialogImage = document.querySelector('#dialog-image');
let previouslyFocused = null;

function renderPlanetCards() {
  const fragment = document.createDocumentFragment();
  planets.forEach((planet, index) => {
    const card = document.createElement('article');
    card.className = 'planet-card reveal';
    const button = document.createElement('button');
    button.className = 'planet-image-button';
    button.type = 'button';
    button.setAttribute('aria-label', `Open ${planet.name} image and NASA details`);
    const image = document.createElement('img');
    image.src = planet.image;
    image.alt = `${planet.name}, NASA mission image`;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.width = 640;
    image.height = 420;
    image.addEventListener('error', () => {
      if (image.src !== planet.fallback) image.src = planet.fallback;
    }, { once: true });
    const hint = document.createElement('span');
    hint.className = 'image-open-hint';
    hint.textContent = 'VIEW NASA DETAILS ↗';
    button.append(image, hint);
    button.addEventListener('click', () => openPlanet(planet, button));
    const body = document.createElement('div');
    body.className = 'planet-card-body';
    const kicker = document.createElement('div');
    kicker.className = 'planet-kicker';
    kicker.innerHTML = `<span>PLANET ${String(index + 1).padStart(2, '0')}</span><span>${planet.type}</span>`;
    const title = document.createElement('h3');
    title.textContent = planet.name;
    const description = document.createElement('p');
    description.textContent = planet.fact;
    const fact = document.createElement('div');
    fact.className = 'planet-card-fact';
    fact.innerHTML = `<span>ORBITAL PERIOD</span><span>${planet.year}</span>`;
    body.append(kicker, title, description, fact);
    card.append(button, body);
    fragment.append(card);
  });
  grid.append(fragment);
}

function openPlanet(planet, trigger) {
  previouslyFocused = trigger;
  document.querySelector('#dialog-title').textContent = planet.name;
  document.querySelector('#dialog-kicker').textContent = `NASA IMAGE LIBRARY / ${planet.id}`;
  document.querySelector('#dialog-facts').textContent = `${planet.type} · ${planet.distance} from the Sun · ${planet.year} per orbit`;
  document.querySelector('#dialog-description').textContent = `${planet.description} Loading additional image details from NASA…`;
  document.querySelector('#dialog-source').textContent = `NASA IMAGE AND VIDEO LIBRARY · ${planet.id}`;
  document.querySelector('#dialog-credit').textContent = `IMAGE: ${planet.credit}`;
  dialogImage.alt = `${planet.name}, NASA mission image. ${planet.credit}.`;
  dialogImage.src = planet.fallback;
  document.body.classList.add('dialog-open');
  dialog.showModal();
  dialogClose.focus();
  loadNasaDetails(planet);
}

async function loadNasaDetails(planet) {
  const description = document.querySelector('#dialog-description');
  try {
    const response = await fetch(`https://images-api.nasa.gov/search?nasa_id=${encodeURIComponent(planet.id)}&media_type=image`);
    if (!response.ok) throw new Error('NASA image service is unavailable');
    const result = await response.json();
    const metadata = result.collection?.items?.[0]?.data?.[0];
    if (!metadata) throw new Error('No NASA image details were returned');
    // Do not overwrite a newer planet if the visitor changed selections quickly.
    if (document.querySelector('#dialog-kicker').textContent !== `NASA IMAGE LIBRARY / ${planet.id}`) return;
    const nasaDescription = (metadata.description || metadata.title || planet.description).replace(/\s+/g, ' ').trim();
    const excerpt = nasaDescription.length > 560 ? `${nasaDescription.slice(0, 557).trim()}…` : nasaDescription;
    description.textContent = excerpt;
    const center = metadata.center ? ` · ${metadata.center}` : '';
    const year = metadata.date_created ? ` · ${new Date(metadata.date_created).getUTCFullYear()}` : '';
    document.querySelector('#dialog-source').textContent = `NASA IMAGE AND VIDEO LIBRARY · ${metadata.nasa_id || planet.id}${center}${year}`;
    if (metadata.photographer) document.querySelector('#dialog-credit').textContent = `IMAGE: ${metadata.photographer}${center}`;
  } catch (error) {
    if (document.querySelector('#dialog-kicker').textContent !== `NASA IMAGE LIBRARY / ${planet.id}`) return;
    description.textContent = `${planet.description} NASA's image details could not be reached just now; the planetary facts and image remain available here.`;
    document.querySelector('#dialog-source').textContent = `NASA IMAGE AND VIDEO LIBRARY · ${planet.id} · OFFLINE FALLBACK`;
  }
}

dialogClose.addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  previouslyFocused?.focus();
});
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
renderPlanetCards();

const questions = [
  { q: 'Which planet is the hottest in our Solar System?', answers: ['Mercury', 'Venus', 'Mars', 'Jupiter'], correct: 1, note: 'Venus’s thick atmosphere traps heat through an intense greenhouse effect.' },
  { q: 'Which planet is famous for its Great Red Spot?', answers: ['Saturn', 'Neptune', 'Jupiter', 'Uranus'], correct: 2, note: 'The Great Red Spot is a long-lived storm in Jupiter’s atmosphere.' },
  { q: 'Which planet rotates with an extreme tilt, almost on its side?', answers: ['Earth', 'Venus', 'Uranus', 'Mercury'], correct: 2, note: 'Uranus has an axial tilt of about 98 degrees.' },
  { q: 'What gives Mars much of its reddish appearance?', answers: ['Copper clouds', 'Iron-rich dust', 'Lava oceans', 'Red plants'], correct: 1, note: 'Iron minerals in Martian rocks and dust have oxidized—like rust.' },
  { q: 'Which planet is the largest in our Solar System?', answers: ['Saturn', 'Jupiter', 'Earth', 'Neptune'], correct: 1, note: 'Jupiter is more than twice as massive as all the other planets combined.' }
];
let questionIndex = 0;
let score = 0;
let answered = false;
const quizQuestion = document.querySelector('#quiz-question');
const quizOptions = document.querySelector('#quiz-options');
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
  document.querySelector('#quiz-card').setAttribute('aria-label', `Question ${questionIndex + 1} of ${questions.length}`);
  quizQuestion.textContent = question.q;
  quizFeedback.textContent = '';
  quizFeedback.className = 'quiz-feedback';
  quizOptions.replaceChildren();
  question.answers.forEach((answer, answerIndex) => {
    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'quiz-option';
    option.textContent = answer;
    option.addEventListener('click', () => chooseAnswer(answerIndex));
    quizOptions.append(option);
  });
  const next = document.querySelector('#quiz-next');
  next.disabled = true;
  next.innerHTML = questionIndex === questions.length - 1 ? 'See my result <span aria-hidden="true">→</span>' : 'Next question <span aria-hidden="true">→</span>';
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
  quizScore.textContent = `SCORE  ${String(score).padStart(2, '0')}`;
  document.querySelector('#quiz-next').disabled = false;
}

function renderQuizResult() {
  const message = score === questions.length ? 'Outstanding. You know your way around the Solar System.' : score >= 3 ? 'Nice work. Your cosmic curiosity is paying off.' : 'Good start. The planets are always here for another visit.';
  document.querySelector('#quiz-card').innerHTML = `<div class="quiz-result"><div class="result-score">${score}<span> / ${questions.length}</span></div><h3>Orbit complete.</h3><p>${message}</p><button class="button button-primary" id="quiz-restart" type="button">Try again <span aria-hidden="true">↻</span></button></div>`;
  document.querySelector('#quiz-restart').addEventListener('click', restartQuiz);
}

function restartQuiz() {
  score = 0;
  questionIndex = 0;
  document.querySelector('#quiz-card').innerHTML = '<div class="quiz-topline"><span id="quiz-progress">QUESTION 01 / 05</span><span class="quiz-score" id="quiz-score">SCORE&nbsp; 00</span></div><div class="progress-track" aria-hidden="true"><span id="quiz-progress-bar"></span></div><h3 class="quiz-question" id="quiz-question"></h3><div class="quiz-options" id="quiz-options" role="group" aria-label="Answer choices"></div><div class="quiz-feedback" id="quiz-feedback" aria-live="polite"></div><div class="quiz-controls"><span>ONE ANSWER. INFINITE CURIOSITY.</span><button class="button button-primary quiz-next" id="quiz-next" type="button" disabled>Next question <span aria-hidden="true">→</span></button></div>';
  renderQuizResult(); // replaced below with a fresh quiz card and question controls
  document.querySelector('#quiz-card').innerHTML = '<div class="quiz-topline"><span id="quiz-progress">QUESTION 01 / 05</span><span class="quiz-score" id="quiz-score">SCORE&nbsp; 00</span></div><div class="progress-track" aria-hidden="true"><span id="quiz-progress-bar"></span></div><h3 class="quiz-question" id="quiz-question"></h3><div class="quiz-options" id="quiz-options" role="group" aria-label="Answer choices"></div><div class="quiz-feedback" id="quiz-feedback" aria-live="polite"></div><div class="quiz-controls"><span>ONE ANSWER. INFINITE CURIOSITY.</span><button class="button button-primary quiz-next" id="quiz-next" type="button" disabled>Next question <span aria-hidden="true">→</span></button></div>';
  renderQuestion();
}

document.querySelector('#quiz-next').addEventListener('click', () => {
  if (!answered) return;
  if (questionIndex === questions.length - 1) renderQuizResult();
  else {
    questionIndex += 1;
    renderQuestion();
  }
});
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

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    }
  }), { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
} else document.querySelectorAll('.reveal').forEach((item) => item.classList.add('is-visible'));
