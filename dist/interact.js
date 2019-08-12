let trackpageContent = (() => {
    trackId = {
        id: -1
    }
    
    return {
        currentId: ID => {
            trackId.id = ID;
        },

        previousId: curId => {
            if(curId == 0)
                trackId.id = 7;
            else
                trackId.id = curId-1;
        },

        nextId: curId => {
            if(curId == 7)
                trackId.id = 0;
            else
                trackId.id = curId+1;
        },

        returnCurId : () => trackId
    }
})();

let changePageContent = (() => {
    let DOMstrings = {
        imageContainer: document.querySelector('.big-image'),
        backdrop: document.querySelector('.backdrop'),
        leftArrow: document.querySelector('.left-icon'),
        rightArrow: document.querySelector('.right-icon'),
        imageBox: document.querySelectorAll('.image-box'),
        closeBtn: document.querySelector('.close-btn'),
        animateSalutation: document.querySelector('.salutaion'),
        animateName: document.querySelector('.name'),
        abountMeSection: document.querySelector('.about-me'),
        abountMeText: 'about-me__text',
        abountMeImage: 'about-me__image',
        skillSetSection: document.querySelector('.skill-set'),
        skillSetBoxes: ['skill-1','skill-2','skill-3'],
        portfolioSection: document.querySelector('.portfolio'),
        contactMeSection: document.querySelector('.contact-form'),
        messageSection: document.querySelector('.message'),
        navContainer: document.querySelector('.container'),
        submitBtn: document.querySelector('.btn'),
        textFields: [document.getElementById('senderName'),document.getElementById('senderMail'),document.getElementById('senderMessage')]
    }
    return{
        showImage: element => {
            DOMstrings.backdrop.style.display='flex';
            DOMstrings.imageContainer.innerHTML = '';
            DOMstrings.imageContainer.innerHTML = `<img src="portfolio/image-${element}.PNG">`;
            document.getElementById('nav').classList.remove('sticky');
        },

        closeImage: () => {
            DOMstrings.backdrop.style.display='none';
            document.getElementById('nav').classList.add('sticky');
        },

        goLeft: nextImageId => {
            DOMstrings.imageContainer.innerHTML = '';
            DOMstrings.imageContainer.innerHTML = `<img src="portfolio/image-${nextImageId}.PNG">`;
        },

        goRight: nextImageId => {
            DOMstrings.imageContainer.innerHTML = '';
            DOMstrings.imageContainer.innerHTML = `<img src="portfolio/image-${nextImageId}.PNG">`;
        },

        getMessage: () => {
            return {
                inputName: DOMstrings.textFields[0].value,
                inputMail: DOMstrings.textFields[1].value,
                inputMessage: DOMstrings.textFields[2].value
            }
        },

        getDOMstrings: () => DOMstrings
    }
})();

let controller = ( (change,track) => {

    let DOM = change.getDOMstrings();

    const eventListners = () => {
        const images = DOM.imageBox;
        images.forEach(el => {
            el.addEventListener('click',openImage);
        });
        DOM.closeBtn.addEventListener('click',closeImage); 
        DOM.leftArrow.addEventListener('click',navigateLeft);
        DOM.rightArrow.addEventListener('click',navigateRight);
        window.addEventListener('load',loadOnAnimation);
        window.addEventListener('scroll',loadOnScroll);
        DOM.submitBtn.addEventListener('click',submitMessage);
        document.querySelector('.hamburger').addEventListener('click',showMobileNav);
        document.querySelector('.mobile-nav__close-icon').addEventListener('click',hideMobileNav);
    };
    
    const openImage = e => {
        let imageId,imageIdArr,id;

        imageId = e.target.parentElement.id;
        imageIdArr = imageId.split('-');
        id = imageIdArr[1];

        change.showImage(id);
        track.currentId(parseInt(id));
    }

    const closeImage = () =>{
        change.closeImage();
    }

    const navigateLeft = () => {
        let curId = track.returnCurId();
        track.previousId(curId.id);
        change.goLeft(curId.id);
    }

    const navigateRight = () => {
        let curId = track.returnCurId();
        track.nextId(curId.id);
        change.goRight(curId.id);
    }

    const loadOnAnimation = () =>{
        document.getElementById("salutation").classList.add("bounceInLeft");
        document.getElementById("name").classList.add("bounceInRight");
        document.getElementById("nav").classList.add("fadeInDown");
        
        document.querySelector('.bounceInLeft').addEventListener('animationstart',() => {
            //For salutation and name
            document.querySelector('.salutation').style.opacity = '1';
            document.querySelector('.name').style.opacity = '1';

            //For navigation and logo
            document.querySelector('.flex-container').style.opacity = '1';
        });
    }

    let loadOnScroll = () => {

        let boundriesOfAboutMe = DOM.abountMeSection.getBoundingClientRect();
        if(boundriesOfAboutMe.top <= 250){
            document.getElementById(DOM.abountMeText).classList.add('fadeInUp');
            document.querySelector('.about-me__text').style.opacity = 1;
            document.getElementById(DOM.abountMeImage).classList.add('fadeIn');
            document.querySelector('.about-me__image').style.opacity = 1;
        }

        let bounderiesOfSkillSet = DOM.skillSetSection.getBoundingClientRect();
        if(bounderiesOfSkillSet.top <= 200){
            let skillArr = DOM.skillSetBoxes;
            skillArr.forEach(el => {
                document.getElementById(el).classList.add('fadeInUp');
            });
            document.querySelector('.photography').style.opacity = 1;
            document.querySelector('.editing').style.opacity = 1;
            document.querySelector('.web-design').style.opacity = 1;
        }

        let boundriesOfPortfolio = DOM.portfolioSection.getBoundingClientRect();
        if(boundriesOfPortfolio.top <= 195){
            let leftSide = ['image-0','image-1','image-4','image-5'];
            let rightSide = ['image-2','image-3','image-6','image-7'];
            let imgageClasses = ['.img0','.img1','.img2','.img3','.img4','.img5','.img6','.img7'];
            leftSide.forEach(el => {
                document.getElementById(el).classList.add('fadeInLeft');
            });
            rightSide.forEach(el => {
                document.getElementById(el).classList.add('fadeInRight');
            });
            imgageClasses.forEach(el => {
                document.querySelector(el).style.opacity = '1';
            });
        }

        let boundriesOfContactMe = DOM.contactMeSection.getBoundingClientRect();
        if(boundriesOfContactMe.top <= 240){
            document.getElementById('contact-img').classList.add('fadeIn');
            document.getElementById('contact-details').classList.add('fadeInRight');

            document.querySelector('.place-img').style.opacity = '1';
            document.querySelector('.contact-details').style.opacity = '1';
        }

        let boundriesOfMessage = DOM.messageSection.getBoundingClientRect();
        if(boundriesOfMessage.top <= 575){
            document.getElementById('message').classList.add('fadeInUp');

            document.querySelector('.message').style.opacity = '1';
        }

        let boundriesOfBackground = DOM.navContainer.getBoundingClientRect();
        if(boundriesOfBackground.bottom <= 60){
            document.getElementById('nav').classList.add('sticky');
        }else{
            document.getElementById('nav').classList.remove('sticky');
        }
    }

    const submitMessage = () =>{
        const inputValues = changePageContent.getMessage();
        if(inputValues.inputName == '' && inputValues.inputMail == '' && inputValues.inputMessage == ''){
            DOM.textFields.forEach(el => {
                el.style.border = '1px solid red';
                el.classList.add('shake');
            });
        }else{ 
            if(inputValues.inputName == ''){
                DOM.textFields[0].style.border = '1px solid red';
                DOM.textFields[0].classList.add('shake');
            }
            if(inputValues.inputMail == ''){
                DOM.textFields[1].style.border = '1px solid red';
                DOM.textFields[1].classList.add('shake');
            }
            if(inputValues.inputMessage == ''){
                DOM.textFields[2].style.border = '1px solid red';
                DOM.textFields[2].classList.add('shake');
            }
        }
        if(inputValues.inputName != '' && inputValues.inputMail != '' && inputValues.inputMessage != ''){
            DOM.messageSection.classList.add('fadeOut');
            DOM.messageSection.innerHTML = '';
            DOM.messageSection.innerHTML = `<h2>Thank you for contacting! ${DOM.textFields[0].value} :)</h2>`;
            document.querySelector('.message h2').style.opacity = '1';
        }
    }

    const showMobileNav = () => {
        document.getElementById('open').classList.add('mobile-nav__open');
    }

    const hideMobileNav = () => {
        document.getElementById('open').classList.remove('mobile-nav__open');
    }
    
    return{
        init: () => eventListners()
    }
})(changePageContent,trackpageContent);

controller.init();