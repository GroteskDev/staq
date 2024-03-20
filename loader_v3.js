document.addEventListener("DOMContentLoaded", function () {
    
    // store loader wrapper element
    let loader = document.querySelector('.loader')

    let pageLoadTl = gsap.timeline({paused: true})
    pageLoadTl.set(".loader-overlay", {
        display: "none"
    }).from(".nav-animate",{
        opacity:0,
        delay: 0.3
    }).from(".page-wrapper", {
        opacity: 0,
        y: -64,
        duration: 0.75,
        ease: "power2.out",
        delay: 0.3,
    },"<")

    if(localStorage.getItem('visited') == null){
        // set loader opacity to 1
        loader.style.opacity = "1"

        // store progress of loader bar
        function updateProgress(){
            let progress = Math.round(loader.progress() * 100)
            $('.loader-text').text(progress)
        }

        // loadertl setup / callback for complete
        let loaderTl = gsap.timeline({
            onComplete:()=>{
                // console.log('timeline complete')
                pageLoadTl.restart()
            }
        });
        
        //loader animation
        loaderTl.to(".loader-bar",{
            width:"100%",
            duration:4,
            ease:"power2.inOut",
            
        })
            .to(".loader-text",{opacity:0})
            .to(".loader-animation",{opacity:0},"<")
            .set(".loader",{backgroundColor:"rgba(39,39,42,0)"},"<")
            .to(".loader-bar.is-top",{duration:0.3, yPercent:-100})
            .to(".loader-bar.is-bottom",{duration:0.3, yPercent:100},"<")
            .set(".loader", {display:"none"})
    } else {
        // set loader to display none
        loader.style.display = "none"

        //play page fade
        pageLoadTl.restart()
    }

    localStorage.setItem('visited', 'true')


});
