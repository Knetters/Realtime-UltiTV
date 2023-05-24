

gsap.from('.goal-scored', {
    x: "700%",
    delay: .2,
    duration: 1.7,
    ease: "circ.out"
})

gsap.from('.goal-time', {
    x: "200%",
    delay: 1,
    duration: .8,
    ease: "circ.out"
})

gsap.from('.char', {
    x: 300,
    stagger: 0.1,
    delay: 0.2,
    duration: .3,
    ease: "power4.out",
})

