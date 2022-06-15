export default function tabsNav() {
    const btns = Array.from(document.querySelectorAll(".product-img-nav button"));
    const imgCurrent = document.querySelector(".product-img-current img");

    btns.forEach((btn, index, array) => {
        function handleClick() {
            if (!imgCurrent.hasAttribute("data-transition") && !btn.classList.contains("active")) {
                imgCurrent.setAttribute("data-transition", "")
                imgCurrent.classList.add("change");

                array.forEach((item) => item.classList.remove("active"));
                btn.classList.add("active");
    
                setTimeout(() => {
                    const numberImage = index + 1;
                    const imgSrc = imgCurrent.getAttribute("src");
    
                    imgCurrent.setAttribute("src", `${imgSrc.slice(0, imgSrc.length - 5)}${numberImage}.jpg`);
                    imgCurrent.classList.remove("change");
                }, 300)
                setTimeout(() => {
                    imgCurrent.removeAttribute("data-transition");
                }, 600);
            }
        }
        btn.addEventListener("click", handleClick);
    });
}
tabsNav();