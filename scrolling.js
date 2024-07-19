const navControls = document.getElementsByClassName('nav-control');
const learnMore = document.getElementById('learn-more');
const resume = document.getElementById('resume');

learnMore.addEventListener('click', () => {
    let local = document.getElementById("About");
    local.scrollIntoView({
        behavior: "smooth", 
        block: "start",
        inline: "nearest"
    })
});

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

resume.addEventListener('click', () =>{
    for (let i = 0; i < navControls.length; i++) {
        data = navControls[i].getAttribute('data');
        let local = document.getElementById(`${data}`);
        const { top, left, bottom, right } = local.getBoundingClientRect()
        console.log(data, top, left, bottom, right);

    }
})