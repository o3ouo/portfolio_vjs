document.addEventListener('DOMContentLoaded', function () {

    /* 페이지 스크롤 */
    const wrap = document.querySelector('.wrap');
    const container = document.querySelectorAll('.container');
    let page = 0;
    const lastPage = container.length - 1;
    let isScrolling = false;

    function enableScroll() {
        window.addEventListener('wheel', onScroll, { passive: false });
    }

    function disableScroll() {
        window.removeEventListener('wheel', onScroll, { passive: false });
    }

    function onScroll(e) {
        if (isScrolling) return;

        isScrolling = true;
        setTimeout(() => isScrolling = false, 500);

        e.preventDefault();
        if (e.deltaY > 0) {
            page++;
        } else if (e.deltaY < 0) {
            page--;
        }
        if (page < 0) page = 0;
        if (page > lastPage) page = lastPage;

        console.log(e.deltaY);
        wrap.style.top = page * -100 + 'vh';
    }

    function checkScreenSize() {
        if (window.innerWidth > 768) {
            enableScroll();
        } else {
            disableScroll();
        }
    }

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();



    /* 인트로 타이틀 텍스트 롤링 복제 */
    const itemList = document.querySelector('.slide-txt');
    const items = document.querySelectorAll('.slide-txt-item');
    const numItems = items.length;

    for (let i = 0; i < numItems; i++) {
        itemList.appendChild(items[i].cloneNode(true));
    }



    /* 스킬 롤링 복제 */
    const roller = document.querySelector('.skills-bar');
    roller.id = 'roller1'

    const clone = roller.cloneNode(true);
    clone.id = 'roller2';
    document.querySelector('.skills').appendChild(clone);

    document.querySelector('#roller1').style.left = '0px';
    document.querySelector('#roller2').style.left = document.querySelector('.skills-list').offsetWidth + 'px';

    roller.classList.add('original');
    clone.classList.add('clone');



    /* 메뉴 열고 닫기 & 메뉴 해당 섹션 이동 */
    const menuClick = document.querySelectorAll('.menu-click');
    const close = document.querySelector('.close-btn');
    const menuBox = document.querySelector('.menu');
    const menuItems = document.querySelectorAll('.menu-txt a');
    const navItems = document.querySelectorAll('.nav-lise');

    menuClick.forEach((menu) => {
        menu.addEventListener('click', () => {
            if (window.matchMedia('(max-width: 768px)').matches) {
                menuBox.style.width = '100%';
                menuBox.style.right = '0';
            } else {
                menuBox.style.width = '50%';
                menuBox.style.right = '0';
            }
        });
    });

    close.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 768px)').matches) {
            menuBox.style.right = '-100%'
        } else {
            menuBox.style.right = '-50%'
        }
    });

    const closeMenuAndScroll = (event) => {
        event.preventDefault();
        close.click();
        const targetId = event.currentTarget.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    };

    menuItems.forEach((item) => {
        item.addEventListener('click', closeMenuAndScroll);
    });
    
    

    /* 메뉴 프리뷰 버튼 */
    const slide = document.querySelector('.menu-bottom');
    let currentIndex = 0;

    const leftArrow = slide.querySelector('.arrow:nth-of-type(1)');
    const rightArrow = slide.querySelector('.arrow:nth-of-type(2)');
    const imgWrap = slide.querySelector('.img-wrap');
    const workImages = slide.querySelectorAll('.work-img');
    let imageWidth = workImages[0].offsetWidth;

    function updateSlider() {
        const offset = -currentIndex * imageWidth;
        console.log(`Updating slider: offset=${offset}px`);
        imgWrap.style.transform = `translateX(${offset}px)`;
    }

    rightArrow.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('Right arrow clicked');
        if (currentIndex < workImages.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    leftArrow.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('Left arrow clicked');
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    window.addEventListener('resize', () => {
        imageWidth = workImages[0].offsetWidth;
        updateSlider();
    });



    /* 다크모드 기능 */
    const isUserColorTheme = localStorage.getItem('color-theme');
    const isOsColorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const getUserTheme = () => (isUserColorTheme ? isUserColorTheme : isOsColorTheme);

    if (getUserTheme() === 'dark') {
        localStorage.setItem('color-theme', 'dark');
        document.documentElement.setAttribute('color-theme', 'dark');
        document.body.classList.add('dark-mode');
    } else {
        localStorage.setItem('color-theme', 'light');
        document.documentElement.setAttribute('color-theme', 'light');
    }

    const modeButtons = document.querySelectorAll('.mode-btn');

    modeButtons.forEach((btn) => {
        btn.textContent = getUserTheme() === 'dark' ? 'Light Mode' : 'Dark Mode';

        btn.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                btn.textContent = 'Light Mode';
                document.documentElement.setAttribute('color-theme', 'dark');
                localStorage.setItem('color-theme', 'dark');
            } else {
                btn.textContent = 'Dark Mode';
                document.documentElement.setAttribute('color-theme', 'light');
                localStorage.setItem('color-theme', 'light');
            }
        });
    });



    /* work  aroow 버튼 */
    let workIndex = 0;

    const leftBtn = document.querySelector('.l-arrow');
    const rightBtn = document.querySelector('.r-arrow');
    const slider = document.querySelector('.contents-slider');
    const contents = document.querySelectorAll('.contents');
    const workSection = document.querySelector('.work');

    let slideWidth = contents[0].offsetWidth;

    const backgroundImages = [
        {
            image: "url('./img/circle_gyojibhab.png')",
            position: "left top"
        },
        {
            image: "url('./img/circle_ihm.png')",
            position: "center top"
        },
        {
            image: "url('./img/circle_bmw.png')",
            position: "center"
        },
        {
            image: "url('./img/circle_ten.png')",
            position: "right center"
        },
    ];

    function setInitialBackground() {
        workSection.style.backgroundImage = backgroundImages[workIndex].image;
        workSection.style.backgroundPosition = backgroundImages[workIndex].position;
    }

    rightBtn.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('rightBtn');
        if (workIndex < contents.length - 1) {
            workIndex++;
            sliderUpdate();
        }
    });

    leftBtn.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('leftBtn');
        if (workIndex > 0) {
            workIndex--;
            sliderUpdate();
        }
    });

    function sliderUpdate() {
        const move = -workIndex * slideWidth;
        console.log(`slide move: move=${move}px`);
        slider.style.transform = `translateX(${move}px)`;

        console.log(`${backgroundImages[workIndex]}`)
        workSection.style.backgroundImage = backgroundImages[workIndex].image;
        workSection.style.backgroundPosition = backgroundImages[workIndex].position;
    }

    window.addEventListener('resize', () => {
        slideWidth = contents[0].offsetWidth;
        sliderUpdate();
    });

    setInitialBackground();


    //////////////////////////////////////
});
