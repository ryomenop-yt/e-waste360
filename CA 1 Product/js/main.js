/* =====================================================
   E-Waste 360° - Main interactivity
   Initialises per-page features based on present elements
   ===================================================== */

(function () {
    'use strict';

    var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
    var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function showToast(msg) {
        var t = document.createElement('div');
        t.className = 'toast';
        t.innerHTML = '<i class="fa-solid fa-circle-check"></i>' + msg;
        document.body.appendChild(t);
        requestAnimationFrame(function () { t.classList.add('show'); });
        setTimeout(function () {
            t.classList.remove('show');
            setTimeout(function () { t.remove(); }, 500);
        }, 3200);
    }

    /* ============ Reveal on scroll ============ */
    var revealEls = $$('.reveal');
    if (revealEls.length && 'IntersectionObserver' in window) {
        var ro = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    ro.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(function (el) { ro.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('visible'); });
    }

    /* ============ Counters ============ */
    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-target'), 10);
        if (isNaN(target)) { return; }
        if (reducedMotion) { el.textContent = target; return; }
        var duration = 1500;
        var start = null;
        function step(ts) {
            if (!start) { start = ts; }
            var p = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.floor(eased * target);
            if (p < 1) { requestAnimationFrame(step); }
            else { el.textContent = target; }
        }
        requestAnimationFrame(step);
    }

    var counterEls = $$('.counter, .hero-stat-num');
    if (counterEls.length && 'IntersectionObserver' in window) {
        var co = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { animateCounter(e.target); co.unobserve(e.target); }
            });
        }, { threshold: 0.4 });
        counterEls.forEach(function (el) { co.observe(el); });
    } else {
        counterEls.forEach(animateCounter);
    }

    /* ============ Button ripple ============ */
    $$('.btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            if (reducedMotion) { return; }
            var rect = btn.getBoundingClientRect();
            var size = Math.max(rect.width, rect.height);
            var glow = document.createElement('span');
            glow.className = 'ripple';
            glow.style.width = glow.style.height = size + 'px';
            glow.style.left = (e.clientX - rect.left - size / 2) + 'px';
            glow.style.top = (e.clientY - rect.top - size / 2) + 'px';
            btn.appendChild(glow);
            setTimeout(function () { glow.remove(); }, 700);
        });
    });

    /* ============ 3D tilt on hover ============ */
    function initTilt() {
        $$('.tilt').forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var px = (e.clientX - rect.left) / rect.width - 0.5;
                var py = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = 'perspective(800px) rotateY(' + (px * 7) + 'deg) rotateX(' + (-py * 7) + 'deg) translateY(-6px)';
            });
            card.addEventListener('mouseleave', function () {
                card.style.transform = '';
            });
        });
    }
    if (!(('ontouchstart' in window) || navigator.maxTouchPoints > 0)) { initTilt(); }

    /* ============ Hero particles (canvas) ============ */
    function initParticles() {
        var canvas = $('#particleCanvas');
        if (!canvas || reducedMotion) { return; }
        var ctx = canvas.getContext('2d');
        var particles = [];
        var count = 70;

        function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        resize();
        window.addEventListener('resize', resize, { passive: true });

        function rand(a, b) { return a + Math.random() * (b - a); }

        for (var i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: rand(-0.35, 0.35),
                vy: rand(-0.35, 0.35),
                r: rand(1, 2.6),
                a: rand(0.15, 0.6)
            });
        }

        var running = true;
        document.addEventListener('visibilitychange', function () {
            running = document.visibilityState === 'visible';
        });

        function loop() {
            if (!running) { requestAnimationFrame(loop); return; }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(function (p) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) { p.vx *= -1; }
                if (p.y < 0 || p.y > canvas.height) { p.vy *= -1; }
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 229, 160, ' + p.a + ')';
                ctx.fill();
            });
            // Connecting lines
            for (var a = 0; a < particles.length; a++) {
                for (var b = a + 1; b < particles.length; b++) {
                    var dx = particles[a].x - particles[b].x;
                    var dy = particles[a].y - particles[b].y;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.strokeStyle = 'rgba(11, 182, 255, ' + (0.12 * (1 - dist / 120)) + ')';
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    }
    initParticles();

    /* ============ Lifecycle modal ============ */
    function initLifecycle() {
        var modal = $('#lifecycleModal');
        if (!modal) { return; }
        var data = [
            { t: 'Raw Materials', i: 'fa-mountain', x: 'Metals, plastics, rare earths and glass are extracted from the earth. Mining these materials has its own environmental cost, which is why recovering them from e-waste matters.' },
            { t: 'Manufacturing', i: 'fa-industry', x: 'Components such as chips, circuit boards and screens are manufactured and assembled into finished electronics. This stage consumes energy, water and materials.' },
            { t: 'Distribution', i: 'fa-truck-fast', x: 'Finished products move through supply chains to retailers, offices and consumers. Packaging and transport add to a product\u2019s footprint.' },
            { t: 'Consumer Use', i: 'fa-user', x: 'The device is used by consumers or businesses for its working life. Energy use, care and maintenance affect how long it lasts.' },
            { t: 'Repair / Upgrade', i: 'fa-screwdriver-wrench', x: 'When problems arise, a device may be repaired or upgraded. Repairing and upgrading extends useful life and delays it becoming waste.' },
            { t: 'Reuse', i: 'fa-arrows-rotate', x: 'Still-working devices can be donated, resold or repurposed. Reuse gives electronics a second life and keeps them out of waste streams.' },
            { t: 'Collection', i: 'fa-box', x: 'Retired electronics are gathered through collection points, take-back programs and collection drives so they can be managed properly rather than dumped.' },
            { t: 'Recycling', i: 'fa-recycle', x: 'Devices are processed to reclaim components and materials. Responsible recycling recovers value and keeps hazardous materials out of the environment.' },
            { t: 'Material Recovery', i: 'fa-gem', x: 'Precious metals like gold, silver and copper, plus rare earths and plastics, are extracted from recycled electronics and returned to industry.' },
            { t: 'Safe Disposal', i: 'fa-shield-halved', x: 'Residues and hazardous materials that cannot be recovered are handled and disposed of safely at certified facilities to protect people and the planet.' }
        ];
        var icon = $('#modalIcon');
        var title = $('#modalTitle');
        var text = $('#modalText');

        $$('.tl-stage').forEach(function (stage) {
            stage.addEventListener('click', function () {
                var idx = parseInt(stage.getAttribute('data-stage'), 10);
                var d = data[idx];
                if (!d) { return; }
                icon.innerHTML = '<i class="fa-solid ' + d.i + '"></i>';
                title.textContent = d.t;
                text.textContent = d.x;
                modal.classList.add('open');
            });
        });

        window.closeModal = function () { modal.classList.remove('open'); };
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') { window.closeModal(); }
        });
    }
    initLifecycle();

    /* ============ Tabs (What You Can Do) ============ */
    function initTabs() {
        $$('.tab-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var target = btn.getAttribute('data-tab');
                $$('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                $$('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
                var panel = $('#tab-' + target);
                if (panel) { panel.classList.add('active'); }
            });
        });
    }
    initTabs();

    /* ============ Impact cards toggle ============ */
    $$('.impact-card').forEach(function (card) {
        card.addEventListener('click', function () { card.classList.toggle('open'); });
    });

    /* ============ 5R flip cards ============ */
    $$('.r-card').forEach(function (card) {
        card.addEventListener('click', function () { card.classList.toggle('flipped'); });
    });

    /* ============ Quiz engine (one-at-a-time) ============ */
    var QUIZ_DATA = [
        { q: 'What is e-waste?', opts: ['Discarded electrical and electronic equipment', 'Only discarded batteries', 'Recycled paper waste', 'Plastic packaging'], correct: 0, exp: 'E-waste is defined as discarded electrical and electronic equipment and components.' },
        { q: 'Which of these is an example of e-waste?', opts: ['A glass bottle', 'An old smartphone', 'A cardboard box', 'A paper bag'], correct: 1, exp: 'Smartphones, laptops, chargers and televisions are all common examples of e-waste.' },
        { q: 'What is a major environmental impact of improperly disposed e-waste?', opts: ['It improves soil fertility', 'It releases hazardous substances like lead and mercury', 'It has no impact', 'It cleans the air'], correct: 1, exp: 'Hazardous substances leak into soil and water, causing pollution and health risks.' },
        { q: 'Why is e-waste different from normal household waste?', opts: ['It is always biodegradable', 'It contains valuable resources and hazardous materials', 'It is heavier', 'It smells bad'], correct: 1, exp: 'E-waste contains recoverable metals (gold, copper) and hazardous substances, so it needs special handling.' },
        { q: 'What is the best option for a working old laptop you no longer need?', opts: ['Throw it in normal garbage', 'Burn it', 'Reuse, donate or resell it', 'Break it and throw it anywhere'], correct: 2, exp: 'Reusing, donating or reselling a working device gives it a second life and prevents waste.' },
        { q: 'Which "R" means fixing a device instead of immediately replacing it?', opts: ['Refuse', 'Recycle', 'Repair', 'Reduce'], correct: 2, exp: 'Repair extends a product\u2019s useful life and delays it becoming e-waste.' },
        { q: 'Who is primarily responsible for managing e-waste under Extended Producer Responsibility (EPR)?', opts: ['Only consumers', 'Only local governments', 'The producers/importers of the electronics', 'Only recyclers'], correct: 2, exp: 'EPR makes producers responsible for the end-of-life management of the products they sell.' },
        { q: 'What should you do with old batteries?', opts: ['Put them in normal garbage', 'Recycle them separately', 'Throw them in water', 'Bury them in soil'], correct: 1, exp: 'Batteries contain hazardous materials and must be recycled separately, never in normal trash.' },
        { q: 'What is a key action consumers can take to reduce e-waste?', opts: ['Upgrade to every new model', 'Buy more gadgets', 'Buy durable products and repair them', 'Leave devices running always'], correct: 2, exp: 'Buying durable goods and repairing them reduces the need for frequent replacements.' },
        { q: 'What does "Reduce" in the 5Rs of responsible electronics mean?', opts: ['Throw away more', 'Reduce unnecessary electronic consumption', 'Recycle everything immediately', 'Buy more devices'], correct: 1, exp: 'Reducing means cutting down on unnecessary electronic consumption at the source.' }
    ];

    function initQuiz() {
        var app = $('#quizApp');
        if (!app) { return; }

        var startScreen = $('#quizStart');
        var startBtn = $('#quizStartBtn');
        var askPanel = $('#quizAsk');
        var resultPanel = $('#quizResultPanel');
        var nextBtn = $('#quizNextBtn');
        var backBtn = $('#quizBackBtn');
        var retakeBtn = $('#quizRetakeBtn');
        var counter = $('#quizCounter');
        var timerEl = $('#quizTimer');
        var barFill = $('#quizProgressFill');
        var stepsEl = $('#quizSteps');
        var card = $('#quizCard');
        var hint = $('#quizHint');

        var questions = [];
        var answers = [];
        var current = 0;
        var total = QUIZ_DATA.length;
        var score = 0;
        var timerId = null;
        var startTime = 0;
        var elapsed = 0;

        function shuffle(arr) {
            var a = arr.slice();
            for (var i = a.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
            }
            return a;
        }

        function buildQuestions() {
            questions = shuffle(QUIZ_DATA).map(function (item) {
                var idxOrder = item.opts.map(function (_, i) { return i; });
                idxOrder = shuffle(idxOrder);
                return {
                    q: item.q,
                    startPositions: idxOrder,
                    correctPos: idxOrder.indexOf(item.correct),
                    opts: idxOrder.map(function (i) { return item.opts[i]; }),
                    exp: item.exp
                };
            });
            answers = new Array(total).fill(-1);
            current = 0;
            score = 0;
        }

        function showScreen(showEl) {
            [startScreen, askPanel, resultPanel].forEach(function (el) {
                if (el) { el.hidden = true; }
            });
            showEl.hidden = false;
        }

        function renderSteps() {
            var html = '';
            for (var i = 0; i < total; i++) {
                var cls = 'q-step';
                if (i === current) { cls += ' current'; }
                else if (answers[i] !== -1) {
                    cls += (answers[i] === questions[i].correctPos ? ' right' : ' wrong');
                }
                html += '<button type="button" class="' + cls + '" data-idx="' + i + '">' + (i + 1) + '</button>';
            }
            stepsEl.innerHTML = html;
            stepsEl.querySelectorAll('.q-step').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    goTo(parseInt(btn.getAttribute('data-idx'), 10));
                });
            });
            updateBar();
        }

        function updateBar() {
            var answered = answers.filter(function (a) { return a !== -1; }).length;
            barFill.style.width = Math.round((answered / total) * 100) + '%';
            counter.innerHTML = 'Question <strong>' + (current + 1) + '</strong> / ' + total +
                ' &nbsp;\u00B7&nbsp; answered <strong id="quizAnsweredCount">' + answered + '</strong>';
        }

        function buildOptsHtml(q) {
            var answered = answers[current] !== -1;
            var optsHtml = '<div class="quiz-opts">';
            q.opts.forEach(function (opt, i) {
                var letter = String.fromCharCode(65 + i);
                var cls = 'q-opt';
                if (answered) {
                    cls += ' disabled';
                    if (i === q.correctPos) { cls += ' correct'; }
                    if (i === answers[current] && answers[current] !== q.correctPos) { cls += ' wrong'; }
                }
                optsHtml += '<button type="button" class="' + cls + '"><span class="q-letter">' + letter +
                    '</span><span class="q-opt-text">' + opt + '</span></button>';
            });
            optsHtml += '</div>';
            if (answered) {
                optsHtml += renderFeedback(q, answers[current]);
            }
            return optsHtml;
        }

        function renderQuestion(dir) {
            card.classList.remove('slide-in', 'slide-out');
            if (dir === -1) { card.classList.add('slide-out'); }
            setTimeout(function () {
                var q = questions[current];
                var html = '<div class="quiz-qnum">QUESTION ' + (current + 1) + '</div>';
                html += '<h3 class="quiz-q-title">' + q.q + '</h3>';
                html += buildOptsHtml(q);
                card.innerHTML = html;
                card.classList.remove('slide-out');
                card.classList.add('slide-in');

                if (answers[current] === -1) {
                    $$('.q-opt', card).forEach(function (opt, optIdx) {
                        opt.addEventListener('click', function () { selectAnswer(optIdx); });
                    });
                }
                renderControls();
            }, dir === -1 ? 200 : 0);
        }

        function renderControls() {
            nextBtn.disabled = answers[current] === -1;
            backBtn.disabled = current === 0;
            var isLast = current === total - 1;
            nextBtn.innerHTML = isLast
                ? '<i class="fa-solid fa-flag-checkered"></i> See Results'
                : 'Next <i class="fa-solid fa-arrow-right"></i>';
            hint.textContent = isLast
                ? 'This is the last question \u2014 answer it to see your results.'
                : 'Tip: press 1\u20134 to choose an answer, Enter to continue.';
        }

        function renderFeedback(q, chosen) {
            var isRight = chosen === q.correctPos;
            var ok = '<div class="quiz-feedback ' + (isRight ? 'correct-fb' : 'wrong-fb') + ' show">';
            ok += '<i class="fa-solid ' + (isRight ? 'fa-circle-check' : 'fa-circle-xmark') + '"></i><div>';
            ok += '<strong>' + (isRight ? 'Correct!' : 'Not quite.') + '</strong>';
            ok += '<div>' + q.exp + '</div></div></div>';
            return ok;
        }

        function selectAnswer(val) {
            var q = questions[current];
            if (answers[current] !== -1) { return; }
            answers[current] = val;
            if (val === q.correctPos) { score++; }

            card.innerHTML = '<div class="quiz-qnum">QUESTION ' + (current + 1) + '</div>' +
                '<h3 class="quiz-q-title">' + q.q + '</h3>' + buildOptsHtml(q);
            renderControls();
            renderSteps();
        }

        function goTo(i) {
            if (i < 0 || i >= total) { return; }
            var dir = i < current ? -1 : 1;
            current = i;
            renderSteps();
            renderQuestion(dir);
        }

        function showResults() {
            clearInterval(timerId);
            stopTimer();
            showScreen(resultPanel);
            var pct = Math.round((score / total) * 100);
            $('#quizRing').style.setProperty('--score', pct);
            $('#quizPct').textContent = pct;
            $('#quizPctLabel').textContent = '%';
            var titleEl = $('#quizResultTitle');
            var msgEl = $('#quizResultMsg');
            titleEl.textContent = pct >= 80 ? 'E-Waste Expert!' :
                pct >= 60 ? 'Great Job!' :
                pct >= 40 ? 'Good Effort!' : 'Keep Learning!';
            msgEl.textContent = pct >= 80 ? 'Outstanding! You clearly understand responsible e-waste management.' :
                pct >= 60 ? 'Solid understanding \u2014 review the explanations below to sharpen your knowledge.' :
                pct >= 40 ? 'You are on the right track. Go through the explanations to level up.' :
                'Every expert started somewhere. Explore the site sections and retake the quiz!';

            $('#quizStatCorrect').textContent = score;
            $('#quizStatWrong').textContent = total - score;

            var best = parseInt(localStorage.getItem('ewaste360_best') || '0', 10);
            if (score > best) {
                best = score;
                localStorage.setItem('ewaste360_best', String(best));
            }
            $('#quizBest').innerHTML = best === 0 && score === 0 ? '' :
                'Your best score: <strong>' + best + ' / ' + total + '</strong>';

            // Review list
            var review = '';
            questions.forEach(function (q, i) {
                var chosen = answers[i];
                var right = chosen === q.correctPos;
                var status = right
                    ? '<span class="ri-status ri-ok"><i class="fa-solid fa-check"></i></span>'
                    : '<span class="ri-status ri-no"><i class="fa-solid fa-xmark"></i></span>';
                review += '<div class="review-item"><h5>' + status + '<span>' + (i + 1) + '. ' + q.q + '</span></h5>';
                review += '<p>Your answer: <span class="' + (right ? 'rev-correct' : 'rev-wrong') + '">' +
                    (chosen !== -1 ? String.fromCharCode(65 + chosen) + '. ' + q.opts[chosen] : 'Not answered') + '</span></p>';
                if (!right) {
                    review += '<p>Correct answer: <span class="rev-correct">' + String.fromCharCode(65 + q.correctPos) + '. ' + q.opts[q.correctPos] + '</span></p>';
                }
                review += '<p class="rev-exp">' + q.exp + '</p></div>';
            });
            $('#quizReview').innerHTML = review;
            resultPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        function startTimer() {
            elapsed = 0;
            startTime = Date.now();
            if (timerId) { clearInterval(timerId); }
            timerId = setInterval(function () {
                elapsed = Math.floor((Date.now() - startTime) / 1000);
                var m = String(Math.floor(elapsed / 60)).padStart(2, '0');
                var s = String(elapsed % 60).padStart(2, '0');
                timerEl.innerHTML = '<i class="fa-solid fa-stopwatch"></i> ' + m + ':' + s;
            }, 1000);
        }

        function stopTimer() {
            if (timerEl) { timerEl.innerHTML = '<i class="fa-solid fa-stopwatch"></i> 00:00'; }
        }

        // Controls
        if (startBtn) {
            startBtn.addEventListener('click', function () {
                buildQuestions();
                showScreen(askPanel);
                renderSteps();
                renderQuestion(1);
                startTimer();
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                if (answers[current] === -1) { return; }
                if (current === total - 1) { showResults(); }
                else { goTo(current + 1); }
            });
        }
        if (backBtn) {
            backBtn.addEventListener('click', function () { goTo(current - 1); });
        }
        if (retakeBtn) {
            retakeBtn.addEventListener('click', function () {
                showScreen(startScreen);
                buildQuestions();
            });
        }

        // Keyboard
        document.addEventListener('keydown', function (e) {
            if (askPanel.hidden) { return; }
            if (e.key >= '1' && e.key <= '4') {
                var n = parseInt(e.key, 10) - 1;
                var opts = $$('.q-opt', card);
                if (opts[n] && answers[current] === -1) { opts[n].click(); }
            } else if (e.key === 'Enter') {
                if (nextBtn && !nextBtn.disabled) { nextBtn.click(); }
            }
        });

        showScreen(startScreen);
        buildQuestions();
    }
    initQuiz();

    /* ============ Self-Check ============ */
    var SC_QUESTIONS = [
        { q: 'How many unused electronic devices do you have at home (old phones, chargers, cables, etc.)?', opts: ['None or very few (0\u20132)', 'A few (3\u20135)', 'Many (more than 5)'] },
        { q: 'Do you repair devices before replacing them?', opts: ['Always / usually', 'Sometimes', 'Rarely / never'] },
        { q: 'Do you recycle batteries separately instead of putting them in normal garbage?', opts: ['Always', 'Sometimes', 'No'] },
        { q: 'Do you donate or resell working electronics you no longer need?', opts: ['Yes, regularly', 'Sometimes', 'No'] },
        { q: 'Do you use proper e-waste collection / recycling channels for unusable devices?', opts: ['Yes, always', 'Sometimes', 'No'] }
    ];

    function initSelfCheck() {
        var box = $('#selfCheckBox');
        if (!box) { return; }
        var listEl = $('#selfCheckQuestions');
        var btn = $('#selfCheckBtn');
        var result = $('#selfCheckResult');
        var ring = $('#scRing');
        var scoreEl = $('#scScore');
        var titleEl = $('#scTitle');
        var msgEl = $('#scMsg');
        var retry = $('#scRetryBtn');

        function render() {
            var html = '';
            SC_QUESTIONS.forEach(function (item, i) {
                html += '<div class="sq-question"><h4>' + (i + 1) + '. ' + item.q + '</h4><div class="sq-options">';
                item.opts.forEach(function (opt, j) {
                    html += '<label class="sq-option"><input type="radio" name="sc-' + i + '" value="' + j + '"><span>' + opt + '</span></label>';
                });
                html += '</div>';
                // arrow script
                html += '</div>';
            });
            listEl.innerHTML = html;
            $$('.sq-option', listEl).forEach(function (opt) {
                opt.addEventListener('click', function () {
                    var group = opt.closest('.sq-options');
                    $$('.sq-option', group).forEach(function (o) { o.classList.remove('selected'); });
                    opt.classList.add('selected');
                    var radio = opt.querySelector('input');
                    radio.checked = true;
                });
            });
        }

        if (btn) {
            btn.addEventListener('click', function () {
                var score = 0;
                var answered = 0;
                SC_QUESTIONS.forEach(function (item, i) {
                    var sel = $('input[name="sc-' + i + '"]:checked');
                    if (sel) {
                        answered++;
                        var v = parseInt(sel.value, 10);
                        score += v === 0 ? 20 : (v === 1 ? 10 : 0);
                    }
                });
                if (answered < SC_QUESTIONS.length) {
                    showToast('Please answer all ' + SC_QUESTIONS.length + ' questions first.');
                    return;
                }
                box.hidden = true;
                result.hidden = false;
                scoreEl.textContent = score;
                ring.style.setProperty('--score', score);
                var t, m;
                if (score >= 80) { t = 'Eco Champion \uD83C\uDF31'; m = 'Outstanding! You actively manage electronics responsibly. Keep spreading awareness.'; }
                else if (score >= 60) { t = 'Responsible User \u267B\uFE0F'; m = 'Good work! A few small changes can make you an official Eco Champion.'; }
                else if (score >= 40) { t = 'Needs Improvement'; m = 'You have a good start. Begin with repair and proper recycling habits.'; }
                else { t = 'Start Your E-Waste Journey'; m = 'Everyone starts somewhere. Small steps make a big difference!'; }
                titleEl.textContent = t;
                msgEl.textContent = m;
                result.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        }
        if (retry) {
            retry.addEventListener('click', function () {
                result.hidden = true;
                box.hidden = false;
                render();
                box.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        }

        render();
    }
    initSelfCheck();

    /* ============ 5-Day Challenge ============ */
    function initChallenge() {
        var clash = $('#challengeBox');
        if (!clash) { return; }
        var checks = $$('.challenge-check');
        var fill = $('#challengeFill');
        var doneEl = $('#challengeDone');
        var note = $('#challengeNote');
        var KEY = 'ewaste360_challenge';
        var fired = false;

        function update() {
            var done = 0;
            checks.forEach(function (c) { if (c.checked) { done++; } });
            var pct = Math.round((done / checks.length) * 100);
            fill.style.width = pct + '%';
            doneEl.textContent = done;
            if (done === 0) {
                note.textContent = 'Start the challenge and check off each day as you complete it.';
            } else if (done === checks.length) {
                note.textContent = '\uD83C\uDF89 Amazing! You completed the 5-Day E-Waste Challenge.';
                if (!fired) { fired = true; confetti(120); }
            } else {
                note.textContent = 'Great progress! ' + (checks.length - done) + ' day' + (checks.length - done === 1 ? '' : 's') + ' to go.';
            }
        }

        function save() {
            var state = [];
            checks.forEach(function (c, i) { if (c.checked) { state.push(i); } });
            try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
        }

        function load() {
            var saved = [];
            try { saved = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) {}
            checks.forEach(function (c, i) {
                var on = saved.indexOf(i) !== -1;
                c.checked = on;
                c.closest('.challenge-item').classList.toggle('completed', on);
            });
            update();
        }

        checks.forEach(function (c) {
            c.addEventListener('change', function () {
                c.closest('.challenge-item').classList.toggle('completed', c.checked);
                update();
                save();
            });
        });

        load();
    }
    initChallenge();

    /* ============ Confetti ============ */
    function confetti(count) {
        if (reducedMotion) { return; }
        var layer = document.createElement('div');
        layer.className = 'confetti-layer';
        var colors = ['#00e5a0', '#0bb6ff', '#ffc24b', '#ff5470', '#8b5cf6', '#ffffff'];
        for (var i = 0; i < count; i++) {
            var p = document.createElement('div');
            p.className = 'confetti-piece';
            p.style.left = Math.random() * 100 + '%';
            p.style.width = p.style.height = (8 + Math.random() * 6) + 'px';
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            p.style.animationDuration = (2 + Math.random() * 2.5) + 's';
            p.style.animationDelay = (Math.random() * 0.6) + 's';
            layer.appendChild(p);
        }
        document.body.appendChild(layer);
        setTimeout(function () { layer.remove(); }, 5200);
    }

})();