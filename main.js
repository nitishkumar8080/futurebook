import './style.css';
import { chapterCatalog } from './chapters.js';
import { studyContent } from './studyContent.js';

const subjects = [
  {name:'Physics', icon:'⚡', tone:'blue', exams:['JEE','NEET'], chapters:12, desc:'Concepts, formulas & numericals'},
  {name:'Chemistry', icon:'🧪', tone:'green', exams:['JEE','NEET'], chapters:14, desc:'Organic, inorganic & physical'},
  {name:'Mathematics', icon:'📐', tone:'purple', exams:['JEE'], chapters:16, desc:'Practice problem-solving'},
  {name:'Biology', icon:'🌿', tone:'orange', exams:['NEET'], chapters:18, desc:'Botany, zoology & diagrams'},
  {name:'Reasoning', icon:'🧩', tone:'pink', exams:['SSC','Banking'], chapters:10, desc:'Logic, patterns & aptitude'},
  {name:'General Awareness', icon:'🌍', tone:'yellow', exams:['SSC','Banking'], chapters:9, desc:'Static GK & current affairs'}
];
const quiz = [
 {q:'Which SI unit is used for force?', opts:['Joule','Newton','Watt','Pascal'], answer:1, why:'Force is measured in newtons (N).'},
 {q:'The pH of a neutral solution at 25°C is:', opts:['0','5','7','14'], answer:2, why:'At 25°C, a neutral aqueous solution has pH 7.'},
 {q:'Which organelle is known as the powerhouse of the cell?', opts:['Nucleus','Ribosome','Mitochondrion','Golgi apparatus'], answer:2, why:'Mitochondria generate most cellular ATP.'}
];
let selectedExam = 'All exams', currentQuiz = 0, score = 0, answered = false;
const app = document.querySelector('#app');
const safe = s => String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(){
 app.innerHTML = `
 <header class="topbar"><a class="brand" href="#" aria-label="FutureBook home"><span class="brand-mark">F</span><span>future<span class="brand-light">book</span><small>LEARN FOR WHAT'S NEXT</small></span></a><nav><a href="#library">Library</a><a href="#practice">Practice</a><a href="#plan">Study plan</a></nav><button class="profile" id="profileBtn" title="Profile">👤</button></header>
 <main>
  <section class="hero"><div class="hero-copy"><div class="eyebrow"><span class="live-dot"></span> YOUR NEXT CHAPTER STARTS HERE</div><h1>Big goals.<br><span>One page at a time.</span></h1><p>Everything you need to prepare for JEE, NEET and competitive exams — all in one focused study space.</p><div class="hero-actions"><a class="btn primary" href="#library">Explore library <span>↗</span></a><a class="btn ghost" href="#practice">Try a quick quiz <span>→</span></a></div><div class="hero-note"><span>✓</span> Free to get started <span class="dot-sep">·</span> Learn at your pace</div></div><div class="hero-art"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="book-illustration"><div class="book-ribbon"></div><div class="book-label">FUTURE<br><b>BOOK</b><small>YOUR STUDY COMPANION</small></div><div class="book-lines"><i></i><i></i><i></i></div></div><div class="float-card card-top"><span>✦</span><div><b>Small steps</b><small>Big progress</small></div></div><div class="float-card card-bottom"><span>✓</span><div><b>Keep going!</b><small>Your future is built daily</small></div></div><div class="spark spark-a">✦</div><div class="spark spark-b">✧</div></div></section>
  <section class="stats"><div><strong>06</strong><span>Study areas</span></div><div><strong>JEE + NEET</strong><span>Core exam tracks</span></div><div><strong>01</strong><span>Goal: your progress</span></div><div class="stats-quote">“Consistency beats cramming.”</div></section>
  <section id="library" class="section"><div class="section-heading"><div><div class="eyebrow muted">YOUR STUDY LIBRARY</div><h2>Choose your next subject</h2><p>Start with a topic. Build your understanding step by step.</p></div><label class="search"><span>⌕</span><input id="searchInput" placeholder="Search subjects..." aria-label="Search subjects"></label></div>
  <div class="filters" id="filters">${['All exams','JEE','NEET','SSC','Banking'].map(x=>`<button class="filter ${x===selectedExam?'active':''}" data-exam="${x}">${x}</button>`).join('')}</div>
  <div class="subject-grid" id="subjectGrid">${subjectCards()}</div></section>
  <section id="practice" class="practice-section"><div class="practice-intro"><div class="eyebrow">QUICK PRACTICE</div><h2>One question closer<br>to your goal.</h2><p>Try a short sample quiz and check your understanding. This demo quiz is only a starting point.</p><div class="practice-meta"><span>⏱ No timer</span><span>✦ Instant feedback</span></div></div><div class="quiz-card" id="quizCard">${quizMarkup()}</div></section>
  <section id="plan" class="section plan-section"><div><div class="eyebrow muted">YOUR ROUTINE, YOUR PACE</div><h2>Make a little progress today.</h2><p>Choose one small task and mark it done. Your checklist stays on this device.</p></div><div class="tasks"><label><input type="checkbox" data-task="read"> <span><b>Read one concept</b><small>Spend 20 minutes understanding the basics.</small></span></label><label><input type="checkbox" data-task="practice"> <span><b>Solve 5 questions</b><small>Practice makes concepts stick.</small></span></label><label><input type="checkbox" data-task="review"> <span><b>Review mistakes</b><small>Learn from what you got wrong.</small></span></label></div></section>
  <section class="cta"><div><div class="eyebrow">THE FUTURE IS A HABIT</div><h2>Show up today.<br>Thank yourself tomorrow.</h2></div><a href="#library" class="btn light">Back to library ↑</a></section>
 </main><footer><a class="brand footer-brand" href="#"><span class="brand-mark">F</span><span>future<span class="brand-light">book</span></span></a><span>Demo prototype · Built for curious minds</span><span>Study smart. Keep moving.</span></footer>
 <div class="toast" id="toast" role="status"></div>`;
 bind();
}
function subjectCards(){
 const q = document.querySelector('#searchInput')?.value?.toLowerCase() || '';
 const list = subjects.filter(s=>(selectedExam==='All exams'||s.exams.includes(selectedExam)) && (s.name.toLowerCase().includes(q)||s.desc.toLowerCase().includes(q)));
 if(!list.length)return '<div class="empty">No subjects found. Try another search.</div>';
 return list.map(s=>`<article class="subject-card"><div class="subject-top"><span class="subject-icon ${s.tone}">${s.icon}</span><span class="chip">${s.exams.join(' · ')}</span></div><h3>${s.name}</h3><p>${s.desc}</p><div class="subject-bottom"><span>${s.chapters} topic groups</span><button class="open-subject" data-subject="${s.name}">Explore <span>↗</span></button></div></article>`).join('');
}
function quizMarkup(){
 if(currentQuiz>=quiz.length)return `<div class="quiz-finish"><div class="finish-icon">🎉</div><div class="eyebrow muted">QUIZ COMPLETE</div><h3>You scored ${score} out of ${quiz.length}</h3><p>${score===quiz.length?'Brilliant work! Keep that momentum.':'Good effort. Review the explanations and try again.'}</p><button class="btn primary" id="restartQuiz">Try again ↻</button></div>`;
 const item=quiz[currentQuiz];
 return `<div class="quiz-head"><span class="quiz-tag">SAMPLE QUIZ</span><span class="quiz-count">QUESTION ${currentQuiz+1} / ${quiz.length}</span></div><div class="progress"><i style="width:${(currentQuiz+1)/quiz.length*100}%"></i></div><h3>${item.q}</h3><div class="options">${item.opts.map((o,i)=>`<button class="option" data-option="${i}" ${answered?'disabled':''}><span class="option-letter">${'ABCD'[i]}</span>${o}</button>`).join('')}</div><div id="feedback">${answered?feedbackMarkup(item):''}</div>${answered?`<button class="btn primary next-btn" id="nextQuestion">${currentQuiz===quiz.length-1?'See results':'Next question →'}</button>`:''}`;
}
function feedbackMarkup(item){return `<div class="feedback ${item.answer===Number(document.querySelector('.option.selected')?.dataset.option)?'correct':'info'}"><b>Explanation</b><p>${item.why}</p></div>`}
function bind(){
 document.querySelector('#filters').addEventListener('click',e=>{const b=e.target.closest('[data-exam]');if(!b)return;selectedExam=b.dataset.exam;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));document.querySelector('#subjectGrid').innerHTML=subjectCards();bindSubjects();});
 document.querySelector('#searchInput').addEventListener('input',()=>document.querySelector('#subjectGrid').innerHTML=subjectCards());
 bindSubjects();
 document.querySelector('#quizCard').addEventListener('click',e=>{
  const opt=e.target.closest('[data-option]');if(opt&&!answered){answered=true;if(Number(opt.dataset.option)===quiz[currentQuiz].answer)score++;document.querySelectorAll('.option').forEach(b=>{b.disabled=true;if(Number(b.dataset.option)===quiz[currentQuiz].answer)b.classList.add('right');});opt.classList.add('selected');document.querySelector('#quizCard').innerHTML=quizMarkup();return;}
  if(e.target.closest('#nextQuestion')){currentQuiz++;answered=false;document.querySelector('#quizCard').innerHTML=quizMarkup();}
  if(e.target.closest('#restartQuiz')){currentQuiz=0;score=0;answered=false;document.querySelector('#quizCard').innerHTML=quizMarkup();}
 });
 document.querySelectorAll('[data-task]').forEach(el=>{el.checked=localStorage.getItem('fb-task-'+el.dataset.task)==='1';el.addEventListener('change',()=>localStorage.setItem('fb-task-'+el.dataset.task,el.checked?'1':'0'));});
 document.querySelector('#profileBtn').addEventListener('click',()=>toast('Profile and sign-in can be added in the next version.'));
}
function bindSubjects(){
 document.querySelectorAll('[data-subject]').forEach(b=>b.addEventListener('click',()=>openChapterModal(b.dataset.subject)));
}
function openChapterModal(subject){
 const exams = chapterCatalog[subject] || {};
 const examNames = Object.keys(exams);
 const chosenExam = selectedExam !== 'All exams' && exams[selectedExam] ? selectedExam : (examNames[0] || '');
 const groups = exams[chosenExam] || {};
 const modal = document.createElement('div');
 modal.className = 'chapter-overlay';
 modal.innerHTML = `<section class="chapter-modal" role="dialog" aria-modal="true" aria-label="${safe(subject)} chapter list">
  <div class="chapter-modal-head"><div><div class="eyebrow muted">CHAPTER LIBRARY</div><h2>${safe(subject)}</h2><p>Chapter list starter · notes and tests can be added chapter-wise.</p></div><button class="chapter-close" aria-label="Close chapter list">×</button></div>
  <div class="chapter-exams">${examNames.map(ex=>`<button class="chapter-exam ${ex===chosenExam?'active':''}" data-chapter-exam="${safe(ex)}">${safe(ex)}</button>`).join('')}</div>
  <div class="chapter-groups">${Object.entries(groups).map(([grade,chapters])=>`<div class="chapter-grade"><h3>${safe(grade)}</h3><ol>${chapters.map(ch=>`<li><button class="chapter-open" data-open-chapter="${safe(ch)}">${safe(ch)} <span>Study →</span></button></li>`).join('')}</ol></div>`).join('') || '<p>No chapter list is available for this exam yet.</p>'}</div>
  <p class="chapter-disclaimer">Note: This is a chapter-name catalog, not full notes or an official syllabus guarantee. Check the latest NTA syllabus before exam preparation.</p>
 </section>`;
 document.body.appendChild(modal);
 modal.addEventListener('click',e=>{const b=e.target.closest('[data-open-chapter]');if(b){modal.remove();openStudyChapter(b.dataset.openChapter);}});
 const close = ()=>modal.remove();
 modal.addEventListener('click',e=>{if(e.target===modal||e.target.closest('.chapter-close'))close();});
 modal.querySelectorAll('[data-chapter-exam]').forEach(btn=>btn.addEventListener('click',()=>{
   const exam=btn.dataset.chapterExam, groupsNow=exams[exam]||{};
   modal.querySelectorAll('[data-chapter-exam]').forEach(x=>x.classList.toggle('active',x===btn));
   modal.querySelector('.chapter-groups').innerHTML=Object.entries(groupsNow).map(([grade,chapters])=>`<div class="chapter-grade"><h3>${safe(grade)}</h3><ol>${chapters.map(ch=>`<li><button class="chapter-open" data-open-chapter="${safe(ch)}">${safe(ch)} <span>Study →</span></button></li>`).join('')}</ol></div>`).join('') || '<p>No chapter list is available for this exam yet.</p>';
 }));
}
function openStudyChapter(chapter){
 const data=studyContent[chapter];
 const modal=document.createElement('div'); modal.className='chapter-overlay';
 if(!data){
  modal.innerHTML=`<section class="chapter-modal study-modal"><div class="chapter-modal-head"><div><div class="eyebrow muted">CHAPTER WORKSPACE</div><h2>${safe(chapter)}</h2><p>This chapter is listed in the library. Full notes and chapter-specific question sets have not been authored in this starter ZIP yet.</p></div><button class="chapter-close" aria-label="Close">×</button></div><div class="chapter-grade"><h3>Planned learning sections</h3><ol><li>Quick revision notes</li><li>Important definitions / formulas</li><li>Original practice MCQs with explanations</li><li>Previous-year questions only where usage rights permit</li></ol></div><p class="chapter-disclaimer">We’ll add verified content chapter-by-chapter. Always compare exam preparation with the latest official syllabus.</p></section>`;
 } else {
  modal.innerHTML=`<section class="chapter-modal study-modal"><div class="chapter-modal-head"><div><div class="eyebrow muted">${safe(data.level)} · CHAPTER NOTES</div><h2>${safe(chapter)}</h2><p>Starter revision notes and original practice questions.</p></div><button class="chapter-close" aria-label="Close">×</button></div><div class="study-notes">${data.notes.map(([title,body],i)=>`<article class="note-block"><h3>${i+1}. ${safe(title)}</h3><p>${safe(body)}</p></article>`).join('')}</div><div class="study-question"><div class="eyebrow muted">PRACTICE CHECK</div><div class="study-q-count"></div><h3 class="study-q-text"></h3><div class="study-options"></div><div class="study-feedback"></div><button class="btn primary study-next" disabled>Check answer</button></div><p class="chapter-disclaimer">These are original starter practice questions, not previous-year questions. Content is educational and should be cross-checked with current official materials.</p></section>`;
  let qi=0, selected=null, checked=false;
  const renderQ=()=>{const q=data.questions[qi];selected=null;checked=false;modal.querySelector('.study-q-count').textContent=`QUESTION ${qi+1} / ${data.questions.length}`;modal.querySelector('.study-q-text').textContent=q.q;modal.querySelector('.study-options').innerHTML=q.opts.map((o,i)=>`<button class="study-option" data-study-option="${i}"><b>${'ABCD'[i]}.</b> ${safe(o)}</button>`).join('');modal.querySelector('.study-feedback').innerHTML='';const next=modal.querySelector('.study-next');next.disabled=true;next.textContent='Check answer';};
  modal.addEventListener('click',e=>{const opt=e.target.closest('[data-study-option]');if(opt&&!checked){selected=Number(opt.dataset.studyOption);modal.querySelectorAll('.study-option').forEach(x=>x.classList.toggle('chosen',x===opt));modal.querySelector('.study-next').disabled=false;}});
  modal.querySelector('.study-next').addEventListener('click',()=>{if(!checked){if(selected===null)return;checked=true;const q=data.questions[qi];modal.querySelectorAll('.study-option').forEach((x,i)=>{if(i===q.a)x.classList.add('right');if(i===selected&&selected!==q.a)x.classList.add('wrong');});modal.querySelector('.study-feedback').innerHTML=`<div class="feedback ${selected===q.a?'correct':'info'}"><b>${selected===q.a?'Correct!':'Review this one'}</b><p>${safe(q.why)}</p></div>`;const b=modal.querySelector('.study-next');b.textContent=qi===data.questions.length-1?'Restart questions →':'Next question →';}else{qi=qi===data.questions.length-1?0:qi+1;renderQ();}});
  renderQ();
 }
 document.body.appendChild(modal);modal.addEventListener('click',e=>{if(e.target===modal||e.target.closest('.chapter-close'))modal.remove();});
}
function toast(msg){const el=document.querySelector('#toast');el.textContent=msg;el.classList.add('show');clearTimeout(window.fbToast);window.fbToast=setTimeout(()=>el.classList.remove('show'),3000);}
render();
if('serviceWorker' in navigator && location.protocol.startsWith('https')) navigator.serviceWorker.register('/sw.js').catch(()=>{});
