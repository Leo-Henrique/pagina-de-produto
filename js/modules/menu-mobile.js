import clickOutside from "./click-outside.js";

export default function menuMobile() {
    const btn = document.getElementById("headerBtnMobile");
    const logo = btn.nextElementSibling;
    const menu = document.getElementById("headerMenu");
    const body = document.body;

    function openMenu(btnWidth) {
        btn.ariaExpanded = "true";
        btn.ariaLabel = "Fechar menu de navegação";
        btn.innerHTML = `<svg width="14" height="15" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#69707D" fill-rule="evenodd"/></svg>`;
        btn.classList.add("close");
        logo.style.marginLeft = btnWidth + "px";
        body.classList.add("scrollbar");

        menu.classList.add("display");
        setTimeout(() => {
            menu.classList.add("show");
            btn.classList.add("show");
            clickOutside([menu.firstElementChild], closeMenu);
        }, 20);
    }
    function closeMenu() {
        btn.ariaExpanded = "false";
        btn.ariaLabel = "Abrir menu de navegação";
        btn.innerHTML = `<svg width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M16 12v3H0v-3h16Zm0-6v3H0V6h16Zm0-6v3H0V0h16Z" fill="#69707D" fill-rule="evenodd"/></svg>`;
        logo.style.removeProperty("margin-left");
        body.classList.remove("scrollbar");

        btn.classList.remove("show");
        btn.classList.remove("close");
        menu.classList.remove("show");
        setTimeout(() => {
            menu.classList.remove("display");
        }, 300);
    }

    btn.addEventListener("click", () => {
        const btnWidth = btn.offsetWidth;

        if (btn.ariaExpanded == "false") 
            openMenu(btnWidth);
        else 
            closeMenu();
    });
}
menuMobile();