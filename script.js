const submitBtn = document.querySelector('.btn-buy');

submitBtn.addEventListener('click', () => {
  const cartItems = document.querySelectorAll('.cart-box'); // Get all cart items
  const totalValue = parseFloat(document.querySelector('.total-price').innerHTML.replace('Rs. ', ''));

  if (cartItems.length === 0 || totalValue === 0) {
    alert("Your cart is empty");
    return; // If the cart is empty, do nothing further
  }

  alert("Your order has been placed");

  // Remove all items from the cart
  cartItems.forEach(cartBox => {
    let title = cartBox.querySelector('.cart-product-title').innerHTML;
    itemList = itemList.filter(el => el.title != title);
    cartBox.remove(); // Remove this specific cart box
  });

  loadContent();
  
  alert("Thank you");
});




document.addEventListener('DOMContentLoaded',loadProduct);

function loadProduct(){
  loadContent();

}
function loadContent(){
  //Remove  Items  From Cart
  let btnRemove=document.querySelectorAll('.cart-remove');
  btnRemove.forEach((btn)=>{
    btn.addEventListener('click',removeItem);
  });

  //Product Item Change Event
  let qtyElements=document.querySelectorAll('.cart-quantity');
  qtyElements.forEach((input)=>{
    input.addEventListener('change',changeQty);
  });

  //Product Cart
  
  let cartBtns=document.querySelectorAll('.add-cart');
  cartBtns.forEach((btn)=>{
    btn.addEventListener('click',addCart);
  });

  updateTotal();
}


//Remove Item
function removeItem(){
  if(confirm('Are Your Sure to Remove')){
    let title=this.parentElement.querySelector('.cart-product-title').innerHTML;
    itemList=itemList.filter(el=>el.title!=title);
    this.parentElement.remove();
    loadContent();
  }
}

//Change Quantity
function changeQty(){
  if(isNaN(this.value) || this.value<1){
    this.value=1;
  }
  loadContent();
}

let itemList=[];

//Add Cart
function addCart(){
 let product=this.parentElement;
 let title=product.querySelector('.product-title').innerHTML;
 let price=product.querySelector('.product-price').innerHTML;
 let imgSrc=product.querySelector('.product-img').src;
 //console.log(title,price,imgSrc);
 
 let newProduct={title,price,imgSrc}

 //Check Product already Exist in Cart
 if(itemList.find((el)=>el.title==newProduct.title)){
  alert("Product Already added in Cart");
  return;
 }else{
  itemList.push(newProduct);
 }


let newProductElement= createCartProduct(title,price,imgSrc);
let element=document.createElement('div');
element.innerHTML=newProductElement;
let cartBasket=document.querySelector('.offcanvas-body');
cartBasket.append(element);
loadContent();
}


function createCartProduct(title,price,imgSrc){

  return `
  <div class="cart-box">
  <img src="${imgSrc}" class="cart-img">
  <div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="price-box">
      <div class="cart-price">${price}</div>
       <div class="cart-amt">${price}</div>
   </div>
    <input type="number" value="1" class="cart-quantity">
  </div>
  <i class="fa-solid fa-trash cart-remove " name="trash"></i>

</div>
  `;
}

function updateTotal()
{
  const cartItems=document.querySelectorAll('.cart-box');
  const totalValue=document.querySelector('.total-price');

  let total=0;

  cartItems.forEach(product=>{
    let priceElement=product.querySelector('.cart-price');
    let price=parseFloat(priceElement.innerHTML.replace("Rs: ",""));
    let qty=product.querySelector('.cart-quantity').value;
    total+=(price*qty);
    product.querySelector('.cart-amt').innerText="Rs: "+(price*qty);

  });

  totalValue.innerHTML='Rs.'+total;


  // Add Product Count in Cart Icon

  const cartCount=document.querySelector('.wish-count');
  let count=itemList.length;
  cartCount.innerHTML=count;

  if(count==0){
    cartCount.style.display='none';
  }else{
    cartCount.style.display='block';
  }


}