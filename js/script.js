const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");

const cartButton = document.getElementById("cartButton");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const checkoutButton = document.getElementById("checkoutButton");

const toast = document.getElementById("toast");


let cart = [];


/* =========================================
   MOBILE MENU
========================================= */

menuButton.addEventListener("click", () => {

    mainNav.classList.toggle("open");

});


/*
    Cerrar el menú cuando
    el usuario selecciona una opción.
*/

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        mainNav.classList.remove("open");

    });

});


/* =========================================
   CART
========================================= */

function openCart() {

    cartPanel.classList.add("open");

    cartOverlay.classList.add("active");

    document.body.classList.add("no-scroll");

}


function closeCartPanel() {

    cartPanel.classList.remove("open");

    cartOverlay.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


cartButton.addEventListener(
    "click",
    openCart
);


closeCart.addEventListener(
    "click",
    closeCartPanel
);


cartOverlay.addEventListener(
    "click",
    closeCartPanel
);


/* =========================================
   ADD PRODUCT
========================================= */

const addCartButtons =
    document.querySelectorAll(".add-cart");


addCartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name =
            button.dataset.name;

        const price =
            Number(button.dataset.price);


        addToCart(name, price);

    });

});


function addToCart(name, price) {

    const existingProduct =
        cart.find(product =>
            product.name === name
        );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            quantity: 1

        });

    }


    updateCart();

    showToast(
        `${name} fue añadido al carrito.`
    );

}


/* =========================================
   REMOVE PRODUCT
========================================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    cartItemsContainer.innerHTML = "";


    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `
            <p class="empty-cart">
                Tu carrito está vacío.
            </p>
        `;

    }


    cart.forEach((product, index) => {

        const item =
            document.createElement("div");

        item.className =
            "cart-item";


        item.innerHTML = `

            <div class="cart-item-info">

                <h4>
                    ${product.name}
                </h4>

                <p>
                    ${formatCurrency(product.price)}
                    × ${product.quantity}
                </p>

            </div>

            <button
                class="remove-item"
                data-index="${index}">
                ×
            </button>

        `;


        cartItemsContainer.appendChild(item);

    });


    const removeButtons =
        document.querySelectorAll(".remove-item");


    removeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const index =
                Number(button.dataset.index);

            removeFromCart(index);

        });

    });


    updateCartCount();

    updateCartTotal();

}


/* =========================================
   CART COUNT
========================================= */

function updateCartCount() {

    const totalItems =
        cart.reduce(
            (total, product) =>
                total + product.quantity,
            0
        );


    cartCount.textContent =
        totalItems;

}


/* =========================================
   CART TOTAL
========================================= */

function updateCartTotal() {

    const total =
        cart.reduce(
            (sum, product) =>
                sum +
                product.price *
                product.quantity,
            0
        );


    cartTotal.textContent =
        formatCurrency(total);

}


/* =========================================
   FORMAT CURRENCY
========================================= */

function formatCurrency(value) {

    return new Intl.NumberFormat(
        "es-CO",
        {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0
        }
    ).format(value);

}


/* =========================================
   WHATSAPP CHECKOUT
========================================= */

checkoutButton.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            showToast(
                "Primero añade productos al carrito."
            );

            return;

        }


        let message =
            "Hola, Mecánicas Six-seven. " +
            "Quiero solicitar una cotización:%0A%0A";


        cart.forEach(product => {

            message +=
                `• ${product.name} ` +
                `x${product.quantity} ` +
                `- ${formatCurrency(product.price * product.quantity)}%0A`;

        });


        const total =
            cart.reduce(
                (sum, product) =>
                    sum +
                    product.price *
                    product.quantity,
                0
            );


        message +=
            `%0ATotal aproximado: ` +
            `${formatCurrency(total)}`;


        const whatsappURL =
            `https://api.whatsapp.com/send?phone=573106629962&text=${message}`;


        window.open(
            whatsappURL,
            "_blank"
        );

    }
);


/* =========================================
   FAQ
========================================= */

const faqQuestions =
    document.querySelectorAll(
        ".faq-question"
    );


faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const currentItem =
            question.parentElement;


        document
            .querySelectorAll(".faq-item")
            .forEach(item => {

                if (item !== currentItem) {

                    item.classList.remove(
                        "active"
                    );

                }

            });


        currentItem.classList.toggle(
            "active"
        );

    });

});


/* =========================================
   CATEGORY FILTER
========================================= */

const categoryButtons =
    document.querySelectorAll(
        ".category-link"
    );


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category =
            button.dataset.category;


        const products =
            document.querySelectorAll(
                ".product-card"
            );


        products.forEach(product => {

            const productCategory =
                product.dataset.category;


            if (
                productCategory === category ||
                (
                    category === "motores" &&
                    productCategory === "motor"
                )
            ) {

                product.style.display =
                    "";

            } else {

                product.style.display =
                    "none";

            }

        });


        const productsSection =
            document.getElementById(
                "productos"
            );


        productsSection.scrollIntoView({
            behavior: "smooth"
        });

    });

});


/* =========================================
   SHOW ALL PRODUCTS
   When clicking "Productos"
========================================= */

document
    .querySelector('a[href="#productos"]')
    .addEventListener("click", () => {

        document
            .querySelectorAll(".product-card")
            .forEach(product => {

                product.style.display =
                    "";

            });

    });


/* =========================================
   TOAST
========================================= */

let toastTimeout;


function showToast(message) {

    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimeout
    );


    toastTimeout =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3000);

}


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".category-card, .product-card, .service-card"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    element.classList.add(
        "reveal"
    );

    revealObserver.observe(
        element
    );

});


/* =========================================
   DYNAMIC REVEAL STYLES
========================================= */

const revealStyle =
    document.createElement("style");


revealStyle.textContent = `

    .reveal {

        opacity: 0;

        transform:
            translateY(30px);

        transition:
            opacity .6s ease,
            transform .6s ease;

    }

    .reveal.visible {

        opacity: 1;

        transform:
            translateY(0);

    }

`;


document.head.appendChild(
    revealStyle
);


/* =========================================
   HEADER SCROLL EFFECT
========================================= */

const header =
    document.querySelector(
        ".header"
    );


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 50) {

            header.style.boxShadow =
                "0 5px 30px rgba(0,0,0,.35)";

        } else {

            header.style.boxShadow =
                "none";

        }

    }
);


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeCartPanel();

            mainNav.classList.remove(
                "open"
            );

        }

    }
);


/* =========================================
   INITIALIZE
========================================= */

updateCart();