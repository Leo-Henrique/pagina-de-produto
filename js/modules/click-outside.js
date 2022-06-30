export default function clickOutside(parents, callback) {
    const attr = "data-clickOutside";

    function handleElements() {
        function handleAttribute(parent) {
            const children = parent.querySelectorAll("*");

            if (!parent.hasAttribute(attr)) {
                parent.setAttribute(attr, "");
                children.forEach((child) => child.setAttribute(attr, ""));
            } else {
                parent.removeAttribute(attr, "");
                children.forEach((child) => child.removeAttribute(attr, ""));
            }
        }

        parents.forEach((parent) => {
            if (Array.isArray(parent)) 
                parent.forEach(element => handleAttribute(element));
            else 
                handleAttribute(parent); 
        });
    }
    handleElements();

    function handleOutsideClick(e) {
        if (!e.target.hasAttribute(attr)) {
            callback();
            handleElements();
            document.removeEventListener("click", handleOutsideClick);
        }
    }
    document.addEventListener("click", handleOutsideClick);
}