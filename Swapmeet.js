"use strict";
/**
 * Navagation settings for picture galery on home page 
 *  @typedef {HTMLElement} scrollContainer
 *  @typedef {HTMLElement} backBtn
 *  @typedef {HTMLElement} nextBtn
 **/ 
let scrollContainer = document.querySelector(".gallery");
/**
 * @description get back button html element
 * @type {HTMLElement} backBtn
 */
let backBtn = document.getElementById("backBtn");
/**
 * @description get back button html element
 *
 * @type {HTMLElement} nextBtn
 */
let nextBtn = document.getElementById("nextBtn");


/**
 * @description Scroll wheel - on click the pictures rotate
 * @event scrollContainer#wheel
 **/
scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
    scrollContainer.style.scrollBehavior = "auto";
});
/**
 * @description Next button rotates the images to the next set
 * @event nextBtn#click
 **/
nextBtn.addEventListener("click", ()=>{
    scrollContainer.style.scrollBehavior = "smooth";
    scrollContainer.scrollLeft += 900;
});
/**
 * @description - Back button rotates the images to the previous set
 * @event backBtn#click
 **/
backBtn.addEventListener("click", ()=>{
    scrollContainer.style.scrollBehavior = "smooth";
    scrollContainer.scrollLeft -= 900;
});

