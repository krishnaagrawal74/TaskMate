const illustration = document.getElementById('illustration')
setInterval(changeColor, 600)
function changeColor() {
    let r = (Math.random())

    illustration.style.filter = `grayscale(0.9) contrast(5) hue-rotate(${360 * r}deg)`
}

let nav = document.querySelector('nav')

// scripts.js
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
        page.classList.remove('visible');
    });
    document.querySelectorAll('article').forEach(a => {
        a.classList.add('novisible');
        a.classList.remove('yesvisible');
    });

    // Show the selected page
    const selectedPage = document.getElementById(pageId);
    
    const content = selectedPage.querySelector('article')
    if (selectedPage) {
        selectedPage.classList.remove('hidden');
        selectedPage.classList.add('visible');
        if (content) {
            content.classList.remove('novisible');
            content.classList.add('yesvisible');
        }

        if (pageId != 'home') {

            nav.style.backgroundColor = `var(--rightbgCol)`
            nav.firstElementChild.style.filter = 'invert(1)'
        }
        else {
            nav.style.backgroundColor = ''
            nav.firstElementChild.style.filter = 'invert(0)'


        }

    }

    // Remove active class from all buttons
    document.querySelectorAll('.nav-button').forEach(button => {
        button.classList.remove('active');
    });

    // Add active class to the corresponding button
    const activeButton = document.getElementById(`nav-${pageId}`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// Initially show the home page and mark the Home button as active
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
});

(function() {
    emailjs.init("C2sTXzTnuVlx10SK7");
})();

document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const serviceID = 'service_usfhbf5';
    const templateID = 'template_lsns8of';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            document.getElementById('status').innerHTML = 'Feedback sent successfully!';
        }, (err) => {
            document.getElementById('status').innerHTML = 'Failed to send feedback. Error: ' + JSON.stringify(err);
        });
});
