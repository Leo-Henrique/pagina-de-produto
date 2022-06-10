export default function clickOutside(element, callback) {
    const attr = "data-clickOutside";

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
}