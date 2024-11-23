document.getElementById('getstarted').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
})

document.getElementById('readmore').addEventListener('click', function (event) {
    event.preventDefault();
    document.querySelector('.review').scrollIntoView({ behavior: 'smooth' });
})

document.querySelector('.btn-2').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })
})

document.getElementById('dial').addEventListener('click', function () {
    window.location.href = "tel:+919330378959";
})

