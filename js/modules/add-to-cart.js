import clickOutside from "./click-outside.js";

export default function cart() {
    const unity = document.getElementById("unity");
    const errorMsg = btnPlus.nextElementSibling;
    const elementWarning = errorMsg.parentElement;

    function handleUnity() {
        const btnMinus = document.getElementById("btnMinus");
        const btnPlus = document.getElementById("btnPlus");
        const minValue = +unity.getAttribute("min");
        const maxValue = +unity.getAttribute("max");

        function handleUnityBtns(btn, index) {
            if (index === 0) {
                unity.value <= minValue ? unity.value = minValue : unity.value = unity.value - 1;
            } else {
                unity.value < minValue ? unity.value = minValue : unity.value = ++unity.value;

                if (unity.value >= maxValue)
                    unity.value = maxValue;
            }
        }
        [btnMinus, btnPlus].forEach((btn, index) => {
            btn.addEventListener("click", () => {
                handleUnityBtns(btn, index);
                closeError();
            });
        });
    
        function handleUnityInput(e) {
            e.target.value = !!e.target.value && Math.abs(e.target.value) >= 0 ? Math.abs(e.target.value) : null;
            closeError();
    
            if (e.target.value === "") 
                e.target.value = 0;
            else if (e.target.value >= maxValue)
                e.target.value = maxValue;
        }
        unity.addEventListener("input", handleUnityInput);
    }
    handleUnity();

    function handleCart() {
        const btnCart = document.getElementById("shoppingCart");
        const btnAddToCart = document.getElementById("addToCart");
        const cartContent = btnCart.nextElementSibling.querySelector(".cart-content");
        const btnCleanCart = cartContent.querySelector(".delete");

        function addCart() {
            const value = unity.value;
            const cartTitle = cartContent.querySelector(".texts .title");
            const cartPrice = cartContent.querySelector(".texts .price-and-unity");
            const cartTotal = cartContent.querySelector(".texts .price-total");
            const productTitle = document.querySelector(".product-texts-intro h1").innerText;
            const productPrice = document.querySelector(".product-texts-price ins").innerText;
            const productPriceValue = +productPrice.slice(2).trim().replace(",", ".");
    
            function setInfo() {
                btnCart.style.setProperty("--unitsInCartDisplay", "flex");
                btnCart.style.setProperty("--unitsInCartValue", `"${value}"`);
                setTimeout(() => {
                    btnCart.classList.add("added");
                    }, 20);
                setTimeout(() => {
                btnCart.classList.remove("added");
                }, 200);
                cartContent.classList.remove("empty");
                cartContent.classList.add("stocked");
                cartTitle.innerText = productTitle;
                window.scrollTo({
                    top: document.querySelector("header"),
                    behavior: "smooth"
                });
    
                closeError();
            }
    
            if (unity.value == 0) {
                openError();
            } else if (unity.value == 1) {
                setInfo();
    
                cartPrice.classList.add("single");
                cartTotal.classList.add("annulled");
                cartPrice.innerText = productPrice;
            } else {
                setInfo();
    
                cartPrice.classList.remove("single");
                cartTotal.classList.remove("annulled");
                cartPrice.innerText = `${productPrice} x ${value}`;
                cartTotal.innerText = (productPriceValue * value).toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
            }
        }
        btnAddToCart.addEventListener("click", addCart);
    
        function cleanCart() {
            btnCart.style.setProperty("--unitsInCartDisplay", "none");
            cartContent.classList.add("empty");
            cartContent.classList.remove("stocked");
        }
        btnCleanCart.addEventListener("click", cleanCart);
    }
    handleCart();

    function closeError() {
        if (!errorMsg.hasAttribute("data-transition")) {
            errorMsg.setAttribute("data-transition", "");

            errorMsg.classList.remove("show");
            elementWarning.classList.remove("warning");
            setTimeout(() => {
                errorMsg.classList.remove("display");
                errorMsg.removeAttribute("data-transition");
            }, 300);
        }
    }
    function openError() {
        unity.focus();

        if (!errorMsg.hasAttribute("data-transition")) {
            errorMsg.setAttribute("data-transition", "");
            errorMsg.classList.add("display");

            setTimeout(() => {
                errorMsg.classList.add("show");
                elementWarning.classList.add("warning");
            }, 20);
            setTimeout(() => {
                errorMsg.removeAttribute("data-transition", "");
                clickOutside(errorMsg, closeError);
            }, 300)
        }
    }
}

cart();