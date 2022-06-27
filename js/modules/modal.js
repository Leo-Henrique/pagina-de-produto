import imageArrows from "./image-arrows.js";
import tabs from "./tabs.js";
import clickOutside from "./click-outside.js";

export default function modal() {
    const btnOpen = document.querySelectorAll("[data-modalOpen]");
    const btnClose = document.querySelector("[data-modalClose]");
    const modal = document.getElementById("modalLightBox");
    const content = document.querySelector(".product-img");
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
            tabs();
            responsiveDialog();
            
            setTimeout(() => {
                modal.classList.add("show");
                responsiveDialog();
                window.addEventListener("resize", responsiveDialog);
            }, 20);
            setTimeout(() => {
                modal.removeAttribute("data-transition", "");
                clickOutside([modalBody.parentElement, btnClose], closeModal);
                document.addEventListener("keydown", closeModalKey);
            }, 300);
        }
    }
    btnOpen.forEach((btn) => btn.addEventListener("click", openModal));

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
        const elements = {
            dialog: modal.querySelector(".modal-dialog"),
            header: modal.querySelector(".modal-header"),
            img: modal.querySelector(".product-img-current"),
            nav: modal.querySelector(".product-img-nav"),
            hasNav: function(exprTrue, exprFalse) {
                if (!(getComputedStyle(this.nav).display === "none")) 
                    return exprTrue();
                else 
                    return exprFalse();
            },
        }
        const heights = {
            format: (element) => {
                return +(+getComputedStyle(element).height.replace("px", "")).toFixed(2);
            },
            get header() {return this.format(elements.header)},
            get img() {return this.format(elements.img)} ,
            get nav() {return this.format(elements.nav)},
            get modal() {
                const height = this.format(modal);
                const paddingY = +getComputedStyle(modal).paddingTop.replace("px", "") * 2;

                return height - paddingY;
            },
            max: {
                format: (element) => {
                    return +getComputedStyle(element).maxHeight.replace("px", "");
                },
                get header() {return this.format(elements.header);},
                get img() {return this.format(elements.img);},
                get nav() {return this.format(elements.nav);},
                get total() {
                    const exprTrue = () => this.header + this.img + this.nav;
                    const exprFalse = () => this.img;

                    return elements.hasNav(exprTrue, exprFalse);
                }
            },
        }

        function marginImg() {
            const exprTrue = () => heights.header + "px";
            const exprFalse = () => "initial";

            elements.img.style.marginTop = elements.hasNav(exprTrue, exprFalse);
        }
        marginImg();


        if (heights.modal <= heights.max.total) {
            const exprTrue = () => `calc(100% - ${heights.header}px - ${heights.nav}px)`;
            const exprFalse = () => "100%";

            elements.img.style.height = elements.hasNav(exprTrue, exprFalse);
            elements.img.style.height = elements.hasNav(exprTrue, exprFalse);
            elements.dialog.classList.remove("centralize");
        } else {
            elements.img.style.height = "initial";
            elements.dialog.classList.add("centralize");
        }
    }
}
modal();