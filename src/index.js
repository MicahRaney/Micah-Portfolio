


document.addEventListener('DOMContentLoaded', function () {

    function skillHover () {

        const ACTIVE_CLASS = 'is-active';
        const SELECTOR_ATTRIBUTE = 'data-skill-select';
        const TARGET_ATTRIBUTE = 'data-skill-type';


        const selectorItems = [...document.querySelectorAll(`[${SELECTOR_ATTRIBUTE}]`)];
        const targetItems = [...document.querySelectorAll(`[${TARGET_ATTRIBUTE}]`)];

        if(selectorItems.length === 0 || targetItems.length === 0) return;
        
        function highlightSkill(skillSelector){
            let skillType = skillSelector.getAttribute(SELECTOR_ATTRIBUTE);
            targetItems.forEach((target)=>{
                let targetType = target.getAttribute(TARGET_ATTRIBUTE);

                if(targetType.includes(skillType)){
                    target.classList.add(ACTIVE_CLASS);
                }
                else {
                    target.classList.remove(ACTIVE_CLASS);
                }
            });
        }

        // Add listeners
        selectorItems.forEach((selector)=>{
            selector.addEventListener('mouseenter', e => {
                selector.classList.add(ACTIVE_CLASS);
                selectorItems.forEach(otherSelector=>{
                    if(selector !== otherSelector){
                        otherSelector.classList.remove(ACTIVE_CLASS);
                    }
                })
                highlightSkill(selector);
            })
        });

        highlightSkill(selectorItems[0]);
    }

    function jobAnimate(){
        const TITLE_CLASS = '.hero_title-dynamic';
        const CURSOR_CLASS = '.hero_title-cursor';
        const WORDS = ["Software","Reliability","Data","Electrical"];


        const cursor = document.querySelector(CURSOR_CLASS);
        if(!cursor) return;
        const title = document.querySelector(TITLE_CLASS);
        if(!title) return;

        title.textContent = '';

        gsap.to(cursor, {
            opacity: 0,
            repeat: -1,
            yoyo: true,
            duration: 0.1,
            repeatDelay: .5,
            ease: "power3.inOut"
          });

        
        let tlMaster = gsap.timeline({ repeat: -1 });

        WORDS.forEach((word) => {
            let tlText = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 });
            tlText.to(title, { duration: 1, text: word });
            tlMaster.add(tlText);
        });
    }

    
    skillHover();
    jobAnimate();
})