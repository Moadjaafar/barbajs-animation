document.addEventListener("DOMContentLoaded", function () {
    // Create background particles
    // createParticles();
    
    // Text to display during transitions
    const textArray = [
        "Hello", "Bonjour", "Hola", "Ciao", "こんにちは", 
        "Привет", "你好", "안녕하세요", "Olá", "مرحبا"
    ];
    
    let textIndex = 0;
    
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.error("GSAP is not loaded. Please include the GSAP library.");
        return;
    }
    
    // Initialize Barba
    barba.init({
        transitions: [{
            name: "enhanced-transition",
            async leave(data) {
                const transitionWrapper = document.querySelector(".transition-wrapper");
                const changingText = document.getElementById("changing-text");
                
                // First animate the current page
                await gsap.to(data.current.container, {
                    opacity: 0,
                    y: -50,
                    scale: 0.95,
                    duration: 0.5,
                    ease: "power2.out"
                });
                
                // Show the transition screen
                gsap.to(transitionWrapper, { 
                    opacity: 1, 
                    duration: 0.5,
                    ease: "power1.inOut"
                });
                
                // Text cycling animation
                for (let i = 0; i < 5; i++) {
                    await typeText(changingText, textArray[textIndex]);
                    textIndex = (textIndex + 1) % textArray.length;
                    await new Promise(resolve => setTimeout(resolve, 200));
                }
                
                data.current.container.remove();
            },
            
            async enter(data) {
                const transitionWrapper = document.querySelector(".transition-wrapper");
                
                // Prepare the new page for animation
                gsap.set(data.next.container, {
                    opacity: 0,
                    y: 50,
                    scale: 0.95
                });
                
                // Hide the transition screen
                await gsap.to(transitionWrapper, { 
                    opacity: 0, 
                    duration: 0.5,
                    ease: "power1.inOut"
                });
                
                // Animate in the new page
                await gsap.to(data.next.container, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out"
                });
                
                // Add extra animations for elements inside the page
                const heading = data.next.container.querySelector('h1');
                const paragraph = data.next.container.querySelector('p');
                // const link = data.next.container.querySelector('a');
                
                gsap.from([heading, paragraph, link], {
                    opacity: 0,
                    y: 20,
                    stagger: 0.15,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        }]
    });
    
    // Typing animation function
    async function typeText(element, text) {
        return new Promise(resolve => {
            element.textContent = '';
            let i = 0;
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 50);
                } else {
                    setTimeout(resolve, 300);
                }
            }
            
            type();
        });
    }
    
    // Create background particles
    // function createParticles() {
    //     const container = document.getElementById('particles');
    //     const particleCount = 30;
        
    //     for (let i = 0; i < particleCount; i++) {
    //         const particle = document.createElement('div');
    //         particle.classList.add('particle');
            
    //         // Random properties
    //         const size = Math.random() * 15 + 5;
    //         const x = Math.random() * 100;
    //         const y = Math.random() * 100;
    //         const duration = Math.random() * 20 + 10;
    //         const delay = Math.random() * 5;
            
    //         particle.style.width = `${size}px`;
    //         particle.style.height = `${size}px`;
    //         particle.style.left = `${x}vw`;
    //         particle.style.top = `${y}vh`;
            
    //         container.appendChild(particle);
            
    //         // Animate particle
    //         gsap.to(particle, {
    //             y: `${Math.random() * 30 - 15}vh`,
    //             x: `${Math.random() * 30 - 15}vw`,
    //             opacity: Math.random() * 0.5 + 0.1,
    //             duration: duration,
    //             repeat: -1,
    //             yoyo: true,
    //             ease: "sine.inOut",
    //             delay: delay
    //         });
    //     }
    // }
});