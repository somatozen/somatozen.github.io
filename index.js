const btnScrollToTop = document.getElementById("scroll-btn");

const nextImgBtn = document.getElementById('next-img-btn');
const previousImgBtn = document.getElementById('previous-img-btn');
const carouselElement = document.getElementById('carousel');

const dateDisplay = document.getElementById('date');
const noelContent = document.getElementById('noel-content');

const contactForm = document.getElementById('contact-form');
const userName = document.getElementById('user_name');
const userFirstName = document.getElementById('user_first-name');
const userEmail = document.getElementById('user_email');
const userTel = document.getElementById('user_tel');
const userObject = document.getElementById('user_object');
const userMessage = document.getElementById('user_message');
const sendButtonOfForm = document.getElementById('send-btn');

const nameRegex = /^[A-Z][A-Za-z\é\è\ê\ï\-]+$/;
const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const telRegex = /^(\+33|0|0033)[1-9][0-9]{8}$/;
const objectRegex = /^[A-Z][A-Za-z\é\è\ê\ï\ ]+$/;
const messageRegex = /^[A-Za-z0-9\é\è\ê\ï\-\'\.\,\?\!\ ]+$/;

const userNameIconValidation = document.getElementById('user_name_valid');
const userFirstNameIconValidation = document.getElementById('user_first-name_valid');
const userEmailIconValidation = document.getElementById('user_email_valid');
const userTelIconValidation = document.getElementById('user_tel_valid');
const userObjectIconValidation = document.getElementById('user_object_valid');
const userMessageIconValidation = document.getElementById('user_message_valid');

const userNameErrorMessage = document.getElementById('user-name-error-message');
const userFirstNameErrorMessage = document.getElementById('user-first-name-error-message');
const userEmailErrorMessage = document.getElementById('user-email-error-message');
const userTelErrorMessage = document.getElementById('user-tel-error-message');
const userObjectErrorMessage = document.getElementById('user-object-error-message');
const userMessageErrorMessage = document.getElementById('user-message-error-message');

let date = new Date();

class ScrollBtn {
    /**
     * @param {HTMLElement} btnScrollToTop
     */
    constructor (btnScrollToTop) {
        this.btnScrollToTop = btnScrollToTop;
        window.addEventListener('scroll', () => {
            (window.scrollY > 500) ? this.btnScrollToTop.style.display = "flex" : this.btnScrollToTop.style.display = "none";
        })
        this.btnScrollToTop.addEventListener('click', this.scrollToTop );
    }
    scrollToTop = () => {
        window.scroll(0 , 0)
    }
}

class Carousel {
    /**
     * @param {HTMLElement} element 
     * @param {HTMLElement} previousBtn 
     * @param {HTMLElement} nextBtn 
     */
    constructor (element, previousBtn, nextBtn) {
        this.element = element;
        this.previousBtn = previousBtn;
        this.nextBtn = nextBtn;
        this.numberOfPressBtn = 0;
        this.positionValue = 0;
        this.nextBtn.addEventListener('click', this.translateImgContainerToRight);
        this.previousBtn.addEventListener('click', this.tranlateImgContainerToLeft);
    }
    translateImgContainerToRight = () => {    
        if (this.numberOfPressBtn !== 6) {
            this.numberOfPressBtn ++;
            this.positionValue += 2;
            this.element.style.transform = `translateX(-${this.numberOfPressBtn * 14.2857}%)`;
        } else {
            this.numberOfPressBtn = 0;
            this.positionValue = 0;
            this.element.style.transform = `translateX(-${this.numberOfPressBtn * 14.2857}%)`;
        } 
    }
    tranlateImgContainerToLeft = () => {
        if (this.numberOfPressBtn !== 0) {
            this.numberOfPressBtn --;
            this.positionValue -= 2;
            this.element.style.transform = `translateX(-${this.numberOfPressBtn * 14.2857}%)`;
        } else {
            this.numberOfPressBtn = 6
            this.positionValue = 12;
            this.element.style.transform = `translateX(-${this.numberOfPressBtn * 14.2857}%)`;
        }
    }
}

class checkInput {
    /**
     * @param {HTMLElement} inputElement
     * @param {RegExp} inputRegExp
     * @param {HTMLElement} validIconElement
     * @param {HTMLElement} errorMessageElement
     */
    isValid;
    constructor (inputElement, inputRegExp, validIconElement, errorMessageElement) {
        this.inputElement = inputElement;
        this.inputRegExp = inputRegExp;
        this.validIconElement = validIconElement;
        this.errorMessageElement = errorMessageElement;
        this.inputElement.addEventListener('input', this.testInputValue);
        
    }
    testInputValue = (e) => {
        (this.inputRegExp.test(e.target.value)) ? this.changeStyleInputValid() : this.changeStyleInputInvalid();
    }
    changeStyleInputValid = () => {
        this.isValid = true; 
        this.inputElement.style.background = '#008000CC';
        this.validIconElement.style.display = 'flex';
        this.errorMessageElement.style.display = 'none';
    }
    changeStyleInputInvalid = () => {
        this.isValid = false;
        this.inputElement.style.background = '#ff0000CC';
        this.validIconElement.style.display = 'none';
        this.errorMessageElement.style.display = 'flex';
        
    }
}

const displayNoelContent = () => {
    ((date.getMonth() === 11) && (date.getDate() >= 1) && (date.getDate() <= 25)) 
    ? noelContent.style.display = 'flex' : noelContent.style.display = 'none';
}

const scrollBtn = new ScrollBtn (btnScrollToTop);

if (carouselElement) {
    const carousel = new Carousel (carouselElement, previousImgBtn, nextImgBtn);
}

if (dateDisplay) {
    dateDisplay.textContent = date.getFullYear();
}

if (noelContent) {
    displayNoelContent();
}

 
if (contactForm) {
    const checkNameInput = new checkInput(userName, nameRegex, userNameIconValidation, userNameErrorMessage);
    const checkFirstNameInput = new checkInput(userFirstName, nameRegex, userFirstNameIconValidation, userFirstNameErrorMessage);
    const checkEmailInput = new checkInput(userEmail, emailRegex, userEmailIconValidation, userEmailErrorMessage);
    const checkTelInput = new checkInput(userTel, telRegex, userTelIconValidation, userTelErrorMessage);
    const checkObjectInput = new checkInput(userObject, objectRegex, userObjectIconValidation, userObjectErrorMessage);
    const checkMessageInput = new checkInput(userMessage, messageRegex, userMessageIconValidation, userMessageErrorMessage);
    const enableFormSendButton = () => {
        ((checkNameInput.isValid === true) && (checkFirstNameInput.isValid === true) && 
        (checkEmailInput.isValid === true) && (checkTelInput.isValid === true) && (checkObjectInput.isValid === true) 
        && (checkMessageInput.isValid === true)) 
        ? sendButtonOfForm.removeAttribute('disabled') : sendButtonOfForm.setAttribute('disabled', true); 
    }
    contactForm.addEventListener('input', enableFormSendButton);
}





const sendMail = () => {
    const inputMessageValue = `${userMessage.value + "%0A" + userName.value + "%0A" + userFirstName.value + "%0A" + userTel.value}`;
    window.open(`mailto:somatozen@gmail.com?subject=${userObject.value}&body=${inputMessageValue}`)
}

if (sendButtonOfForm) {
    sendButtonOfForm.addEventListener('click', sendMail); 
}  










