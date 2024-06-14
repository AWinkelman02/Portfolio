const navControls = document.getElementsByClassName('nav-control');
const learnMore = document.getElementById('learn-more');

//learnMore.addEventListener('click', scrollToLocation('About'));

for (let i = 0; i < navControls.length; i++) {
    navControls[i].addEventListener('click', (e)=>{
        scrollToLocation(e.target.getAttribute('data'));
    })
}

function scrollToLocation(location){
    let local = document.getElementById(`${location}`);
    local.scrollIntoView({
        behavior: "smooth", 
        block: "start",
        inline: "nearest"
})
}