/* =====================================================
   E-Waste 360° - Shared Components (navbar, footer, pager)
   Injects shared UI based on body[data-page]
   ===================================================== */

(function () {
    'use strict';

    var PAGE = document.body.getAttribute('data-page') || 'home';

    var NAV_HOME = { id: 'home', label: 'Home', url: 'index.html', icon: 'fa-house' };
    var GROUPS = [
        {
            name: 'Learn', icon: 'fa-book-open',
            items: [
                { id: 'e-waste', label: 'E-Waste Basics', url: 'e-waste.html', icon: 'fa-lightbulb' },
                { id: 'lifecycle', label: 'Lifecycle', url: 'lifecycle.html', icon: 'fa-route' },
                { id: 'impact', label: 'Environmental Impact', url: 'impact.html', icon: 'fa-triangle-exclamation' }
            ]
        },
        {
            name: 'Industry', icon: 'fa-industry',
            items: [
                { id: 'industry', label: 'Industry Connection', url: 'industry.html', icon: 'fa-microchip' },
                { id: 'business', label: 'Business Solutions', url: 'business.html', icon: 'fa-briefcase' }
            ]
        },
        {
            name: 'Action', icon: 'fa-hands-holding-circle',
            items: [
                { id: 'management', label: '5Rs & Management', url: 'management.html', icon: 'fa-recycle' },
                { id: 'india', label: 'India & EPR', url: 'india.html', icon: 'fa-landmark' },
                { id: 'you-do', label: 'What You Can Do', url: 'you-do.html', icon: 'fa-user-check' }
            ]
        },
        {
            name: 'Community', icon: 'fa-comments',
            items: [
                { id: 'references', label: 'References', url: 'references.html', icon: 'fa-link' },
                { id: 'about', label: 'About the Project', url: 'about.html', icon: 'fa-graduation-cap' }
            ]
        }
    ];

    var PAGER_ORDER = [
        { id: 'e-waste', label: 'E-Waste Basics', url: 'e-waste.html' },
        { id: 'lifecycle', label: 'Lifecycle', url: 'lifecycle.html' },
        { id: 'impact', label: 'Environmental Impact', url: 'impact.html' },
        { id: 'industry', label: 'Industry Connection', url: 'industry.html' },
        { id: 'business', label: 'Business Solutions', url: 'business.html' },
        { id: 'management', label: '5Rs & Management', url: 'management.html' },
        { id: 'india', label: 'India & EPR', url: 'india.html' },
        { id: 'you-do', label: 'What You Can Do', url: 'you-do.html' },
        { id: 'quiz', label: 'Interactive Quiz', url: 'quiz.html' },
        { id: 'references', label: 'References', url: 'references.html' },
        { id: 'about', label: 'About the Project', url: 'about.html' }
    ];

    function isActive(itemId) {
        return itemId === PAGE;
    }

    /* ---------- Build Navbar ---------- */
    function buildNav() {
        var el = document.getElementById('navRoot');
        if (!el) { return; }

        var html = '<nav class="navbar" id="navbar">';
        html += '<div class="scroll-progress" id="scrollProgress"></div>';
        html += '<div class="nav-container">';
        html += '<a href="index.html" class="nav-logo"><span class="logo-icon"><i class="fa-solid fa-recycle"></i></span>';
        html += '<span class="logo-text">E-Waste <span class="logo-accent">360\u00B0</span></span></a>';

        html += '<button class="nav-toggle" id="navToggle" aria-label="Toggle navigation" aria-expanded="false"><i class="fa-solid fa-bars"></i></button>';

        html += '<ul class="nav-menu" id="navMenu">';

        // Home
        html += '<li class="nav-item"><a href="index.html" class="nav-link' + (isActive('home') ? ' active' : '') + '"><i class="fa-solid fa-house" style="display:none"></i>Home</a></li>';

        // Groups
        GROUPS.forEach(function (g) {
            var groupActive = g.items.some(function (it) { return isActive(it.id); });
            html += '<li class="nav-item has-sub' + (groupActive ? ' active-group' : '') + '">';
            html += '<a href="#" class="nav-link' + (groupActive ? ' active' : '') + '"><i class="fa-solid ' + g.icon + '" style="display:none"></i>' + g.name + ' <i class="fa-solid fa-chevron-down caret"></i></a>';
            html += '<ul class="nav-sub">';
            g.items.forEach(function (it) {
                html += '<li><a href="' + it.url + '" class="nav-link' + (isActive(it.id) ? ' active' : '') + '"><i class="fa-solid ' + it.icon + '"></i>' + it.label + '</a></li>';
            });
            html += '</ul>';
            html += '</li>';
        });

        // Quiz CTA
        html += '<li class="nav-item"><a href="quiz.html" class="nav-link nav-cta' + (isActive('quiz') ? ' active' : '') + '"><i class="fa-solid fa-gamepad"></i> Quiz</a></li>';

        html += '</ul></div></nav>';
        el.innerHTML = html;
    }

    /* ---------- Build Footer ---------- */
    function buildFooter() {
        var el = document.getElementById('footerRoot');
        if (!el) { return; }

        var learn = GROUPS[0].items.map(function (it) {
            return '<a href="' + it.url + '">' + it.label + '</a>';
        }).join('');
        var action = GROUPS[1].items.concat(GROUPS[2].items).map(function (it) {
            return '<a href="' + it.url + '">' + it.label + '</a>';
        }).join('');
        var community = '<a href="quiz.html">Interactive Quiz</a><a href="' + 'references.html">References</a><a href="' + 'about.html">About the Project</a>';

        var html = '<footer class="footer">';
        html += '<div class="container footer-container">';
        html += '<div class="footer-brand">';
        html += '<span class="footer-logo"><i class="fa-solid fa-recycle"></i> E-Waste <span>360\u00B0</span></span>';
        html += '<p>Understanding, Managing &amp; Reducing E-Waste in the IT and Electronics Industry. An academic project for Environmental Studies (CHE110).</p>';
        html += '</div>';
        html += '<div class="footer-links"><h4>Learn</h4>' + learn + '</div>';
        html += '<div class="footer-links"><h4>Explore</h4>' + action + '</div>';
        html += '<div class="footer-links"><h4>Community</h4>' + community + '</div>';
        html += '</div>';
        html += '<div class="footer-bottom" id="footerBottom"></div>';
        html += '</footer>';
        el.innerHTML = html;

        document.getElementById('footerBottom').innerHTML =
            '<p>&copy; 2026 E-Waste 360\u00B0 \u00B7 Environmental Studies (CHE110) \u00B7 Academic Task 1 \u2014 CA1</p>';
    }

    /* ---------- Build Page Pager ---------- */
    function buildPager() {
        var host = document.getElementById('pagerRoot');
        if (!host) { return; }
        var idx = -1;
        for (var i = 0; i < PAGER_ORDER.length; i++) {
            if (PAGER_ORDER[i].id === PAGE) { idx = i; break; }
        }
        if (idx === -1) { return; }
        var prev = idx > 0 ? PAGER_ORDER[idx - 1] : null;
        var next = idx < PAGER_ORDER.length - 1 ? PAGER_ORDER[idx + 1] : null;

        var html = '<div class="page-nav">';
        if (prev) {
            html += '<a href="' + prev.url + '"><span class="pn-dir">\u2190 Previous</span><span class="pn-name"><i class="fa-solid fa-chevron-left"></i> ' + prev.label + '</span></a>';
        } else {
            html += '<span></span>';
        }
        if (next) {
            html += '<a href="' + next.url + '" class="next"><span class="pn-dir">Next \u2192</span><span class="pn-name">' + next.label + ' <i class="fa-solid fa-chevron-right"></i></span></a>';
        } else {
            html += '<span></span>';
        }
        html += '</div>';
        host.innerHTML = html;
    }

    /* ---------- Scroll-to-top button ---------- */
    function buildScrollTop() {
        var host = document.getElementById('extrasRoot');
        if (!host) { return; }
        host.innerHTML = '<button class="scroll-top" id="scrollTopBtn" aria-label="Scroll to top"><i class="fa-solid fa-chevron-up"></i></button>';
    }

    /* ---------- Interactions ---------- */
    function initNav() {
        var toggle = document.getElementById('navToggle');
        var menu = document.getElementById('navMenu');
        if (!toggle || !menu) { return; }

        toggle.addEventListener('click', function () {
            var open = menu.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(open));
            toggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
        });

        // Mobile: open/close submenus by tapping the group label
        menu.querySelectorAll('.has-sub > .nav-link').forEach(function (link) {
            link.addEventListener('click', function (e) {
                var parent = this.parentElement;
                if (window.innerWidth <= 1100 && link.getAttribute('href') === '#') {
                    e.preventDefault();
                    parent.classList.toggle('open');
                    menu.querySelectorAll('.nav-item.open').forEach(function (o) {
                        if (o !== parent) { o.classList.remove('open'); }
                    });
                } else if (link.getAttribute('href') === '#') {
                    e.preventDefault();
                }
            });
        });

        // Close menu when tapping any real link
        menu.querySelectorAll('a[href$=".html"]').forEach(function (a) {
            a.addEventListener('click', function () {
                menu.classList.remove('open');
                toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
                toggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Navbar shadow
        var navbar = document.getElementById('navbar');
        window.addEventListener('scroll', function () {
            if (window.scrollY > 30) { navbar.classList.add('scrolled'); }
            else { navbar.classList.remove('scrolled'); }
        }, { passive: true });
    }

    function initScrollProgress() {
        var bar = document.getElementById('scrollProgress');
        if (!bar) { return; }
        var update = function () {
            var h = document.documentElement;
            var scrollable = h.scrollHeight - h.clientHeight;
            var pct = scrollable > 0 ? (h.scrollTop / scrollable) * 100 : 0;
            bar.style.width = pct + '%';
        };
        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    function initScrollTop() {
        var btn = document.getElementById('scrollTopBtn');
        if (!btn) { return; }
        window.addEventListener('scroll', function () {
            btn.classList.toggle('show', window.scrollY > 550);
        }, { passive: true });
        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------- Run ---------- */
    buildNav();
    buildFooter();
    buildPager();
    buildScrollTop();
    initNav();
    initScrollProgress();
    initScrollTop();
})();