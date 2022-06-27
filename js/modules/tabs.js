export default function tabs() {
    const elementActive = document.querySelector("[data-imgActive]");
    const btns = elementActive.querySelectorAll(".tab-nav button");
    const imgs = elementActive.querySelectorAll(".tab-content li");
    
    function handleChange(btn, index, btnsArray) {
        if(!imgs[index].hasAttribute("data-transition") && !btn.classList.contains("active")) {

            setChangeImg(imgs, imgs[index]);
            setChangeNav(btnsArray, btn);
        }
    }
    btns.forEach((btn, index, btnsArray) => {
        btn.addEventListener("click", () => {
            handleChange(btn, index, btnsArray);
        });
    });
}
tabs();

export function setChangeImg(imgs, img) {
    imgs.forEach((item) => {
        item.setAttribute("data-transition", "");
        item.classList.remove("show");

        setTimeout(() => item.classList.remove("display"), 300);
        setTimeout(() => item.removeAttribute("data-transition"), 620);
    });
    setTimeout(() => img.classList.add("display"), 300);
    setTimeout(() => img.classList.add("show"), 320);
}

export function setChangeNav(btns, btn) {
    btns.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-selected", false);
    });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", true);
}