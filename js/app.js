const elements = document.querySelectorAll( ".from-right, .from-left, .from-top, .from-bottom");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }

    });

}, {
    threshold: 0.35
});

elements.forEach((element) => {
    observer.observe(element);
});

const form = document.querySelector(".contact-form");
const message = document.querySelector("#form-message");
if (form) {
form.addEventListener("submit", function (event) {
    
    event.preventDefault();


    const inputs = form.querySelectorAll("input, textarea, select");

    let empty = false;

    inputs.forEach(function (input) {
        if (input.value.trim() === "") {
            empty = true;                1212
        }
    });

    if (empty) {
        message.textContent = "Please fill in all fields.";
        message.classList.remove("success");
        message.classList.add("error", "show");

    } else {
        message.textContent = "✓ Your reservation has been sent successfully!";
        message.classList.remove("error");
        message.classList.add("success", "show");

        form.reset();
    }

    setTimeout(function () {
        message.classList.remove("show");
    }, 4000);
});           
}

 

/* =================================== */
/*           SHOPPING CART LOGIC              */
/* =================================== */


let cart ;

const cartString = localStorage.getItem("local-cart");

const totalElement = document.querySelector("#cart-total");
const cartCount = document.querySelector("#cart-count");

if(cartString){
      cart = JSON.parse(cartString);
}
else {
    cart = [];
}

function updateCartCount() {
  const cartCount = document.querySelector("#cart-count");

    if (cartCount) {
        let totalQuantity = 0;
        cart.forEach(function(item) {
         totalQuantity += item.quantity;
         });

        cartCount.textContent = totalQuantity;
    }
  
}

function updateTotalPrice() {
    let total = 0;

    cart.forEach(function(cartItem) {
        total = total + (cartItem.price * cartItem.quantity);
    });

    if (totalElement) {
        totalElement.textContent = total.toFixed(2);
    }
}

updateTotalPrice();


const cartContainer = document.querySelector("#cart-items-container");
if (cartContainer) {

        if (cart.length === 0) {
            const emptyMessage = document.createElement("p");
            emptyMessage.textContent = "Your cart is empty.";
            cartContainer.appendChild(emptyMessage);
        }
    else {
     
            cart.forEach(function(item) {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
        
            const itemInfo = document.createElement("div");
            itemInfo.classList.add("cart-item-info");

            const imageContainer = document.createElement("div");
            imageContainer.classList.add("cart-item-image-container");
      

            const itemImage = document.createElement("img");
            itemImage.src = item.image;
            itemImage.classList.add("cart-item-image");
            imageContainer.appendChild(itemImage);

        
            const itemName = document.createElement("h3");
            itemName.textContent = item.name;


            const actionsContainer = document.createElement("div");
            actionsContainer.classList.add("cart-item-actions"); 

            const quantityContainer = document.createElement("div");
            quantityContainer.classList.add("quantity-container");

            const minusButton = document.createElement("button");
            minusButton.textContent = "-";
            minusButton.classList.add("quantity-minus");

            const quantityNumber = document.createElement("span");
            quantityNumber.textContent = item.quantity;
            quantityNumber.classList.add("quantity-number");

            const plusButton = document.createElement("button");
            plusButton.textContent = "+";
            plusButton.classList.add("quantity-plus");

            plusButton.addEventListener("click", function() {
                item.quantity += 1;

                quantityNumber.textContent = item.quantity;
                

                localStorage.setItem("local-cart", JSON.stringify(cart));
                updateCartCount();
                updateTotalPrice();
            });

                const itemPrice = document.createElement("p");
                itemPrice.classList.add("cart-item-price");
                itemPrice.textContent = "$" + (item.price).toFixed(2);
            minusButton.addEventListener("click", function() {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    quantityNumber.textContent = item.quantity;
                    itemPrice.textContent = "$" + (item.price * item.quantity).toFixed(2);

                    localStorage.setItem("local-cart", JSON.stringify(cart));
                    updateCartCount();
                    updateTotalPrice();
                }
                else {
                    removeItem();
                    itemElement.remove();

                    localStorage.setItem("local-cart", JSON.stringify(cart));
                
                    updateCartCount();
                    updateTotalPrice();
                }
            });
           
                
                
            quantityContainer.appendChild(minusButton);
            quantityContainer.appendChild(quantityNumber);
            quantityContainer.appendChild(plusButton);
            

       
        
            const itemDescription = document.createElement("p");
            itemDescription.textContent = item.description;

            const itemAllergens = document.createElement("p");
            itemAllergens.textContent = item.allergens;



            itemInfo.appendChild(itemName);
            itemInfo.appendChild(itemPrice);
            itemInfo.appendChild(itemDescription);
            itemInfo.appendChild(itemAllergens);
         

            const nutritionContainer = document.createElement("div");
            nutritionContainer.classList.add("cart-item-nutrition");
            item.nutrition.forEach(function(nutritionItem) {
                const nutritionElement = document.createElement("p");

                const nutritionValue = document.createElement("span");
                nutritionValue.textContent = nutritionItem.value;

                const nutritionLabel = document.createElement("small");
                nutritionLabel.textContent = nutritionItem.label;
                nutritionContainer.appendChild(nutritionElement);
                    nutritionElement.appendChild(nutritionValue);
                    nutritionElement.appendChild(nutritionLabel);
            }); 
       
         itemInfo.appendChild(nutritionContainer);
         itemElement.appendChild(imageContainer);
         itemElement.appendChild(itemInfo);
         actionsContainer.appendChild(quantityContainer);
   
          const removeButton = document.createElement("button");
         removeButton.classList.add("remove-btn");
         removeButton.textContent = "Remove";

            actionsContainer.appendChild(removeButton);

            function removeItem() {
                cart = cart.filter(function(cartItem) {
                  return cartItem !== item;
                });
            }
                    
removeButton.addEventListener("click", function() {

    removeItem();

    localStorage.setItem("local-cart", JSON.stringify(cart));

    itemElement.remove();

    updateCartCount();
    updateTotalPrice();

    if (cart.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "Your cart is empty.";
        cartContainer.appendChild(emptyMessage);
    }
});
itemElement.appendChild(actionsContainer);
cartContainer.appendChild(itemElement);
        });
    }
}


const buttons = document.querySelectorAll(".add-to-cart-btn");



buttons.forEach(function(button) {

    button.addEventListener("click", function() {
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));
        const card = button.closest(".item-card");
        const nutrition = [];
 
        const description = card.querySelector(".item-description").textContent;
        const allergens = card.querySelector(".item-allergens").textContent;
        const imageSrc = card.querySelector("img").getAttribute("src");
        const nutritionItems = card.querySelectorAll(".item-nutrition-item");

    nutritionItems.forEach(function(nutritionItem) {

        const nutritionValue = nutritionItem.querySelector("span").textContent;
        const nutritionLabel = nutritionItem.querySelector("small").textContent;
        nutrition.push({
            value: nutritionValue,
            label: nutritionLabel 

        });
    });

    const product = {
         name: name,
         price: price,
         quantity: 1,
         description: description,
         allergens: allergens,
         nutrition: nutrition,
         image: imageSrc
    };
    const existingProduct = cart.find(function(cartItem) {
    return cartItem.name === product.name;
});
    if (existingProduct) {
        existingProduct.quantity += 1;
    }
    else {
        cart.push(product);
    }

    updateCartCount();
    updateTotalPrice();
    console.log(product);

   let message = button.parentElement.querySelector(".cart-message");

    if (!message) {
         message = document.createElement("p");
        message.classList.add("cart-message");
        button.after(message);
    }

    message.textContent = product.name + " added to cart!";
  setTimeout(function() {
    message.classList.add("fade-out");

    setTimeout(function() {
        message.remove();
    }, 500);

}, 2000);

    


    
        if (cartContainer) {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");

          itemElement.textContent = product.name + " - $" + product.price;

          cartContainer.appendChild(itemElement);
        }
        

        localStorage.setItem("local-cart" , JSON.stringify(cart));

    });
        
});
updateCartCount();



