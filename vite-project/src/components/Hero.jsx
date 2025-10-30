import React, {useRef} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import {useMediaQuery} from 'react-responsive'

// Register GSAP plugins once
gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {

    const videoRef = useRef();

    const isMobile = useMediaQuery({maxWidth: 767});

    useGSAP(() => {
        const heroSplit = new SplitText('.title',{type:'chars , words'});
        const paragraphSplit = new SplitText('.subtitle',{type:'lines'});

        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'))

        gsap.from(heroSplit.chars, {
            yPercent:50,
            stagger:0.05,
            duration:1,
            ease:'easeInOut',
        })

        gsap.from(paragraphSplit.lines, {
            duration:1,
            yPercent:100,
            stagger:0.1,
            ease:'easeInOut',
            opacity:0,
            delay:1
        });

        // Parallax leaves on scroll
        gsap.timeline({
            scrollTrigger:{
                trigger:'#hero',
                start:'top top',
                end:'bottom top',
                scrub:true,
            }
        })
            .to('.right-leaf',{y:200},0)
            .to('.left-leaf',{y:-200},0)

        // Scroll through the entire page: map page scroll (top->bottom) to video 0->duration
        const pageStart = 'top top';
        const pageEnd = 'max'

        const videoEl = videoRef.current;
        if (!videoEl) return;

        // Ensure video is ready; then create a ScrollTrigger that scrubs through the video
        const initScrollScrub = () => {
            const duration = videoEl.duration || 0;
            // Avoid NaN and zero-duration
            if (!duration || !isFinite(duration)) return;

            // Pause native play and set to start
            try { videoEl.pause(); } catch (e) {}
            try { videoEl.currentTime = 0; } catch (e) {}

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: pageStart,
                    end: pageEnd,
                    scrub: true,
                    invalidateOnRefresh: true,
                }
            });

            tl.fromTo(videoEl, { currentTime: 0 }, { currentTime: duration, ease: 'none' });
        };

        if (videoEl.readyState >= 1) {
            initScrollScrub();
            // Recalculate ScrollTrigger positions once duration is known
            ScrollTrigger.refresh();
        } else {
            const onMeta = () => {
                initScrollScrub();
                // Recalculate ScrollTrigger positions once duration is known
                ScrollTrigger.refresh();
                videoEl.removeEventListener('loadedmetadata', onMeta);
            };
            videoEl.addEventListener('loadedmetadata', onMeta);
        }

    }, { dependencies: [isMobile] })
    return (
        <>

            <section id="hero" className="noisy">
                <h1 className="title">MOJITO</h1>
                <img src="images/hero-left-leaf.png" alt="left-leaf" className="left-leaf" />
                <img src="images/hero-right-leaf.png" alt="right-leaf" className="right-leaf" />

                <div className="body">
                    <div className="content">
                        <div className="space-y-5 hidden md:block">
                            <p>Cool. Crisp. Classic</p>
                            <p className="subtitle">
                                Sip the Spirit <br /> of Summer
                            </p>
                        </div>

                        <div className="view-cocktails">
                            <p className="subtitle">
                                Every cocktail in our menu is a blend of premium ingredients, creative
                                ,flair and timeless recipes - designed to delight your senses.
                            </p>
                            <a href="#cocktails">View our cocktails</a>
                        </div>

                    </div>
                </div>

            </section>

            <div className="video absolute inset-0">
                <video ref={videoRef}
                       src="/videos/output.mp4"
                       muted playsInline preload="auto" />
            </div>
        </>
    )
}

export default Hero;

