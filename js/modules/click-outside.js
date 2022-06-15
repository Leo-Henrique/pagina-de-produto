export default function clickOutside(elements, callback) {
    const attr = "data-clickOutside";

    function handleAttribute() {
        elements.forEach((element) => {
            const children = element.querySelectorAll("*");

            if (!element.hasAttribute(attr)) {
                element.setAttribute(attr, "");
                children.forEach((child) => child.setAttribute(attr, ""));
            } else {
                element.removeAttribute(attr, "");
                children.forEach((child) => child.removeAttribute(attr, ""));
            }
        });
    }
    handleAttribute();

    function handleOutsideClick(e) {
        if (!e.target.hasAttribute(attr)) {
            callback();
            handleAttribute();
            document.removeEventListener("click", handleOutsideClick);
        }
    }
    document.addEventListener("click", handleOutsideClick);
}