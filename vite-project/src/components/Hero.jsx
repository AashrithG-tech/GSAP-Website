import React from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {SplitText} from "gsap/all";

const Hero = () => {

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

    }, [])
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
        </>
    )
}

export default Hero;

