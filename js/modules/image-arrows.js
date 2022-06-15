export default function imageArrows() {
    const prev = document.querySelector(".product-img-current .prev button");
    const next = document.querySelector(".product-img-current .next button");
    const imgCurrent = document.querySelector(".product-img-current img");

    function handleChange(condition, exprTrue, exprFalse) {
        if (!imgCurrent.hasAttribute("data-transition")) {
            const imgSrc = imgCurrent.dataset.src;
            const changeSrc = (change) => imgSrc.replace("number", change);
    
            function setChange(change) {
                imgCurrent.setAttribute("data-transition", "");
                imgCurrent.classList.add("change-arrows");
                setTimeout(() => {
                    imgCurrent.setAttribute("src", changeSrc(change));
                    imgCurrent.setAttribute("data-current", change);
    
                    imgCurrent.classList.remove("change-arrows");
                    imgCurrent.removeAttribute("data-transition", "");
                }, 300);
            }
    
            condition ? setChange(exprTrue) : setChange(exprFalse);
        }
    }

    [next, prev].forEach((btn) => {
        function handleArrows() {
            const imgNumber = +imgCurrent.dataset.current;
            const totalImages = document.querySelectorAll(".product-img-nav button").length;
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