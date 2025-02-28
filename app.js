document.addEventListener("DOMContentLoaded", function () {
    const textArray = ["Hello", "Bonjour", "Hola", "Ciao", "こんにちは"]; // Add more languages if you want
    let textIndex = 0;

    barba.init({
        transitions: [
            {
                name: "smooth-fade",
                async leave(data) {
                    const transitionText = document.querySelector(".transition-text");
                    const changingText = document.getElementById("changing-text");

                    // Show the transition text
                    gsap.to(transitionText, { opacity: 1, duration: 0.5 });

                    // Loop through text changes before leaving
                    for (let i = 0; i < textArray.length; i++) {
                        await new Promise((resolve) => {
                            setTimeout(() => {
                                changingText.innerText = textArray[textIndex];
                                textIndex = (textIndex + 1) % textArray.length;
                                resolve();
                            }, 400);
                        });
                    }

                    // Fade out old page
                    await gsap.to(data.current.container, {
                        opacity: 0,
                        y: -30,
                        scale: 0.9,
                        duration: 0.6,
                        ease: "power2.inOut",
                    });

                    data.current.container.remove();
                },
                enter(data) {
                    const transitionText = document.querySelector(".transition-text");

                    // Fade in the new page
                    gsap.from(data.next.container, {
                        opacity: 0,
                        y: 30,
                        scale: 1.1,
                        duration: 0.6,
                        ease: "power2.inOut",
                    });

                    // Hide transition text after page appears
                    gsap.to(transitionText, { opacity: 0, duration: 0.5 });
                },
            },
        ],
    });
});
