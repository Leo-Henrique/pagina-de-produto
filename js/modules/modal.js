import imageArrows from "./image-arrows.js";
import tabsNav from "./tabs-nav.js";
import clickOutside from "./click-outside.js";

export default function modal() {
    const btnOpen = document.querySelector("[data-modalOpen]");
    const btnClose = document.querySelector("[data-modalClose]");
    const modal = document.getElementById("modalLightBox");
    const content = btnOpen.parentElement.parentElement;
    let contentClone;

    function openModal() {
        if (!modal.hasAttribute("data-transition")) {
            const modalBody = modal.querySelector(".modal-body");
            contentClone = content.cloneNode(true);

            modal.setAttribute("data-transition", "");
            modal.setAttribute("aria-modal", true);
            modal.setAttribute("role", "dialog");
            modal.removeAttribute("aria-hidden");
            content.removeAttribute("data-imgActive");
            contentClone.setAttribute("data-imgActive", "")
            modalBody.appendChild(contentClone);
            modal.classList.add("display");
            document.body.classList.add("modal-scrollbar");

            imageArrows();
            tabsNav();
            
            setTimeout(() => {
                modal.classList.add("show");
                window.addEventListener("resize", responsiveDialog);
            }, 20);
            setTimeout(() => {
                modal.removeAttribute("data-transition", "");
                clickOutside([modalBody.parentElement], closeModal);
                document.addEventListener("keydown", closeModalKey);
                
            }, 300);
        }
    }
    btnOpen.addEventListener("click", openModal);

    function closeModal() {
        if (!modal.hasAttribute("data-transition")) {

            modal.setAttribute("data-transition", "");
            modal.setAttribute("aria-hidden", true);
            modal.removeAttribute("aria-modal");
            modal.removeAttribute("role");
            content.setAttribute("data-imgActive", "");
            modal.classList.remove("show");

            document.removeEventListener("keydown", closeModalKey);
            window.removeEventListener("resize", responsiveDialog);
            setTimeout(() => {
                modal.classList.remove("display");
                document.body.classList.remove("modal-scrollbar");
                modal.removeAttribute("data-transition");
                contentClone.remove();
            }, 300)
        }
    }
    btnClose.addEventListener("click", closeModal);

    function closeModalKey(e) {
        if (e.key === "Escape") 
            closeModal();
    }

    function responsiveDialog() {
        const header = modal.querySelector(".modal-header");
        const nav = modal.querySelector(".product-img-nav");
        const headerHeight = header.offsetHeight + "px";
        const navHeight = nav.offsetHeight + "px";
        const productImgCurrent = modal.querySelector(".product-img-current")

        productImgCurrent.style.height = `calc(100% - ${headerHeight} - ${navHeight})`;
        productImgCurrent.style.marginTop = headerHeight;
        console.log(navHeight)
    }
}
modal();