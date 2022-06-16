export default function imageArrows() {
    const elementActive = document.querySelector("[data-imgActive]");
    const prev = elementActive.querySelector(".product-img-current .prev button");
    const next = elementActive.querySelector(".product-img-current .next button");
    const imgCurrent = elementActive.querySelector(".product-img-current img");

    function handleChange(condition, exprTrue, exprFalse) {
        if (!imgCurrent.hasAttribute("data-transition")) {
            const imgSrc = imgCurrent.dataset.src;
            const changeSrc = (change) => imgSrc.replace("number", change);
            const navBtns = elementActive.querySelectorAll(".product-img-nav button");
    
            function setChange(change) {
                imgCurrent.setAttribute("data-transition", "");
                imgCurrent.classList.add("change-arrows");
                setTimeout(() => {
                    imgCurrent.setAttribute("src", changeSrc(change));
                    imgCurrent.setAttribute("data-current", change);

                    navBtns.forEach((btn, index) => {
                        btn.classList.remove("active");
                        if (index + 1 === change) {
                            btn.classList.add("active");
                        }
                    });
    
                    imgCurrent.classList.remove("change-arrows");
                }, 300);
                setTimeout(() => {
                    imgCurrent.removeAttribute("data-transition", "");
                }, 600)
            }
    
            condition ? setChange(exprTrue) : setChange(exprFalse);
        }
    }

    [next, prev].forEach((btn) => {
        function handleArrows() {
            const imgNumber = +imgCurrent.dataset.current;
            const totalImages = elementActive.querySelectorAll(".product-img-nav button").length;
            const parent = btn.parentElement;

            if (parent.classList.contains("prev")) {
                const condition = imgNumber !== 1;
                const exprTrue = imgNumber - 1;
                const exprFalse = totalImages;

                handleChange(condition, exprTrue, exprFalse);
    
            } else if (parent.classList.contains("next")) {
                const condition = imgNumber !== totalImages;
                const exprTrue = imgNumber + 1;
                const exprFalse = totalImages - totalImages + 1;

                handleChange(condition, exprTrue, exprFalse);
            }
        }
        btn.addEventListener("click", handleArrows);
    });
}
imageArrows();