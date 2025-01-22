$(document).ready(function () {

    // Toggle Navbar
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Scroll and Load Events
    const handleScroll = () => {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // Scroll Spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    };

    $(window).on('scroll load', _.debounce(handleScroll, 50));

    // Smooth Scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear');
    });

    // Visibility Change for Dynamic Title
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Jigar Sable";
            $("#favicon").attr("href", "assets/images/favicon.png");
        } else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });

    // Typed.js Effect
    new Typed(".typing-text", {
        strings: ["frontend development", "backend development", "web designing", "android development", "web development"],
        loop: true,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 500,
    });

    // Fetch Data and Render Skills
    async function fetchData(type = "skills") {
        try {
            const response = await fetch(type === "skills" ? "skills.json" : "./projects/projects.json");
            if (!response.ok) throw new Error(`Failed to fetch ${type}`);
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    function renderSkills(skills) {
        const skillsContainer = document.getElementById("skillsContainer");
        let skillHTML = skills.map(skill => `
            <div class="bar">
                <div class="info">
                    <img src=${skill.icon} alt="skill" />
                    <span>${skill.name}</span>
                </div>
            </div>
        `).join('');
        skillsContainer.innerHTML = skillHTML;
    }

    function renderProjects(projects) {
        const projectsContainer = document.querySelector("#work .box-container");
        const projectHTML = projects
            .slice(0, 10)
            .filter(project => project.category !== "android")
            .map(project => `
                <div class="box tilt">
                    <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
                    <div class="content">
                        <div class="tag"><h3>${project.name}</h3></div>
                        <div class="desc">
                            <p>${project.desc}</p>
                            <div class="btns">
                                <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                                <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        projectsContainer.innerHTML = projectHTML;

        // Initialize Tilt.js
        VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });

        // ScrollReveal Animation for Projects
        ScrollReveal().reveal('.work .box', { interval: 200 });
    }

    // Initialize Skills and Projects
    fetchData().then(renderSkills);
    fetchData("projects").then(renderProjects);

    // ScrollReveal Animations
    const scrollRevealConfig = {
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    };
    const srtop = ScrollReveal(scrollRevealConfig);

    srtop.reveal('.home .content h3, .home .content p, .home .content .btn', { delay: 200 });
    srtop.reveal('.home .image', { delay: 400 });
    srtop.reveal('.home .linkedin, .home .github, .home .twitter, .home .telegram, .home .instagram, .home .dev', { interval: 600 });
    srtop.reveal('.about .content h3, .about .content .tag, .about .content p, .about .content .box-container, .about .content .resumebtn', { delay: 200 });
    srtop.reveal('.skills .container, .skills .container .bar', { interval: 200 });
    srtop.reveal('.education .box', { interval: 200 });
    srtop.reveal('.experience .timeline, .experience .timeline .container', { interval: 400 });
    srtop.reveal('.contact .container, .contact .container .form-group', { delay: 400 });

    // Disable Developer Mode
    document.onkeydown = function (e) {
        if (
            e.keyCode === 123 || 
            (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(String.fromCharCode(e.keyCode))) || 
            (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
        ) {
            return false;
        }
    };

    // Tawk.to Live Chat Integration
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
        var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
    })();

});
