import clickOutside from "./click-outside.js";
import {btnMinus, unity, btnPlus} from "./add-to-cart.js";

const btn = document.getElementById("shoppingCart");
const cart = btn.nextElementSibling;

export function dropdown() {
    btn.addEventListener("click", () => {
        if (btn.ariaExpanded == "false") 
            openCart();
        else 
            closeCart();
    });
}
dropdown();

export function openCart() {
    if (!btn.hasAttribute("data-transition")) {

        btn.setAttribute("data-transition", "");
        btn.ariaExpanded = "true";
        btn.ariaLabel = "Ocultar o carrinho de compras";
        btn.classList.add("active");

        cart.classList.add("display");
        setTimeout(() => {
            cart.classList.add("show");
        }, 20)
        setTimeout(() => {
            btn.removeAttribute("data-transition", "");
            clickOutside([cart, btnMinus, unity, btnPlus], closeCart);
            document.addEventListener("keydown", closeCartKey);
        }, 300)
    }
}

function closeCart() {
    if (!btn.hasAttribute("data-transition")) {

        btn.setAttribute("data-transition", "");
        btn.ariaExpanded = "false";
        btn.ariaLabel = "Visualizar o carrinho de compras";
        btn.classList.remove("active");

        cart.classList.remove("show");
        document.removeEventListener("keydown", closeCartKey);
        setTimeout(() => {
            cart.classList.remove("display");
            btn.removeAttribute("data-transition", "");
        }, 300);
    }
}

function closeCartKey(event) {
    if (event.key === "Escape") {
        closeCart();
    }
}