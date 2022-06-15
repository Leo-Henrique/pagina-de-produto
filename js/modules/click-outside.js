export default function clickOutside(elements, callback) {
    const attr = "data-clickOutside";

    if (elements.length === 1) {
        if (!elements[0].hasAttribute(attr)) {
            elements[0].setAttribute(attr, "");
            document.addEventListener("click", handleOutsideClick);
        }
    
        function handleOutsideClick(e) {
            if (!elements[0].contains(e.target)) {
                callback();
                elements[0].removeAttribute(attr);
                document.removeEventListener("click", handleOutsideClick);
            }
        }

    } else {
        elements.forEach((element) => {
            if (!element.hasAttribute(attr)) {
                element.setAttribute(attr, "");
                element.querySelectorAll("*").forEach((children) => children.setAttribute(attr, ""));
            }
        });    

        function handleOutsideClick(e) {
            if (!e.target.hasAttribute(attr)) {
                callback();
                document.removeEventListener("click", handleOutsideClick);

                elements.forEach((element) => {
                    element.removeAttribute(attr, "");
                    element.querySelectorAll("*").forEach((children) => children.removeAttribute(attr, ""));
                });    
            }
        }
        document.addEventListener("click", handleOutsideClick);
    }
}























/*

    if (!element.hasAttribute(attr)) {
        element.setAttribute(attr, "");
        document.addEventListener("click", handleOutsideClick);
    }

    function handleOutsideClick(e) {
        if (!element.contains(e.target)) {
            callback();
            element.removeAttribute(attr);
            document.removeEventListener("click", handleOutsideClick);
        }
    }

*/