import {setChangeImg, setChangeNav} from "./tabs.js";

export default function imageArrows() {
    const elementActive = document.querySelector("[data-imgActive]");
    const btnsNav = elementActive.querySelectorAll(".tab-nav button");
    const imgs = elementActive.querySelectorAll(".tab-content li");
    const prev = elementActive.querySelector(".product-img-current .prev button");
    const next = elementActive.querySelector(".product-img-current .next button");

    function handleChange(img, handleFirstOrLastElement, exprTrue, exprFalse) {
        if (img.classList.contains("display") && !img.hasAttribute("data-transition")) {
            function setChange(change) {
                const btnNavId = change.getAttribute("aria-labelledby");

                btnsNav.forEach(btn => {
                    if (btn.id === btnNavId) 
                        setChangeNav(btnsNav, btn);
                });
                setChangeImg(imgs, change);
            }
            handleFirstOrLastElement ? setChange(exprTrue) : setChange(exprFalse);
        }
    }

    prev.addEventListener("click", () => {
        imgs.forEach((img, index, imgsArray) => {
            const notTheFirstElement = index + 1 !== 1;
            const exprTrue = img.previousElementSibling;
            const exprFalse = imgsArray[imgsArray.length - 1];

            handleChange(img, notTheFirstElement, exprTrue, exprFalse);
        });
    });
    next.addEventListener("click", () => {
        imgs.forEach((img, index, imgsArray) => {
            const notTheLastElement = index + 1 !== imgsArray.length;
            const exprTrue = img.nextElementSibling;
            const exprFalse = imgsArray[0];

            handleChange(img, notTheLastElement, exprTrue, exprFalse);
        });
    });
}
imageArrows();