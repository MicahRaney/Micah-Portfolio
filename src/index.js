


document.addEventListener('DOMContentLoaded', function () {

    let ishovering = false;

    function skillHover () {

        const ACTIVE_CLASS = 'is-active';
        const SELECTOR_ATTRIBUTE = 'data-skill-select';
        const TARGET_ATTRIBUTE = 'data-skill-type';
        const PARENT_ID = "#skill-select-wrap"
        const SCROLL_SPEED_MS = 2500


        const selectorItems = [...document.querySelectorAll(`[${SELECTOR_ATTRIBUTE}]`)];
        const targetItems = [...document.querySelectorAll(`[${TARGET_ATTRIBUTE}]`)];
        const parentDiv = document.querySelector("#skill-select-wrap")
        
        
        if(selectorItems.length === 0 || targetItems.length === 0 || parentDiv === null) return;
        
        // util function to hightlight a skill
        function highlightSkill(skillSelector, hideOthers = false){

            skillSelector.classList.add(ACTIVE_CLASS);
            selectorItems.forEach(otherSelector=>{
                if(skillSelector !== otherSelector){
                    otherSelector.classList.remove(ACTIVE_CLASS);
                }
            })
            
            let skillType = skillSelector.getAttribute(SELECTOR_ATTRIBUTE);
            targetItems.forEach((target)=>{
                let targetType = target.getAttribute(TARGET_ATTRIBUTE);

                if(targetType.includes(skillType)){
                    target.classList.add(ACTIVE_CLASS);
                    target.style.display = 'block';
                    // gsap.to(target, {opacity: 1});
                    target.hidden = false
                }
                else {
                    target.classList.remove(ACTIVE_CLASS);
                    if (hideOthers && target.getAttribute(TARGET_ATTRIBUTE).length > 0) {
                        target.style.display = 'none';
                    }
                }
            });
        }

        // set up a timer to iterate through and highlight
        // gather all the skills to rotate through them
        let i = 1;
        function iterateSkill(){
            if (i >= selectorItems.length) {
                i = 0;
            }
            selectorItems[i].classList.add(ACTIVE_CLASS);
            highlightSkill(selectorItems[i]);
            i+=1;
        }
        
        // Create a timer to iterate through skill selectors
        let timer = setInterval(iterateSkill, SCROLL_SPEED_MS);

        // Add listeners 
        selectorItems.forEach((selector)=>{
            selector.addEventListener('mouseenter', e => {
                highlightSkill(selector, true);
                clearInterval(timer);
            })
        });
        
        // Restart the timer if mouse leaves the parent div
        parentDiv.addEventListener('mouseleave', e => {
            timer = setInterval(iterateSkill, SCROLL_SPEED_MS);
            targetItems.forEach((target)=>{
                target.style.display = 'block';
            })

        })

        // highlight the first selection
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