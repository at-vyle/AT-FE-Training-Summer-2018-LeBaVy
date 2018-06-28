window.onload = function() {
  var listShoes = [
    {
      'id':1,
      'name':'Giày nữ -Giày nữ hàn quốc',
      'image':'nuhanquoc.jpg',
      'price':125000
    },
    {
      'id':2,
      'name':'Giày thể  thao nữ',
      'image':'thethaonu.jpg',
      'price':265000
    },
    {
      'id':3,
      'name':'Giày slip on nơ hạt',
      'image':'slipom.jpg',
      'price':355000
    },
    {
      'id':4,
      'name':'Giày thể thao nữ xám sọc trắng',
      'image':'ttnusoctrang.jpg',
      'price':435000
    },
    {
      'id':5,
      'name':'Giày Sneaker nữ',
      'image':'sneakernu.jpg',
      'price':135000
    },
    {
      'id':6,
      'name':'Giày lười nữ đen lưới',
      'image':'luoinuden.jpg',
      'price':425000
    },
    {
      'id':7,
      'name':'Giày lười nữ trắng',
      'image':'luoinutrang.jpg',
      'price':725000
    },
    {
      'id':8,
      'name':'Giày Sneaker nữ trắng',
      'image':'sneakernutrang.jpg',
      'price':325000
    }
  ];
  function showListProducts() {
    var html='';
    for (i in listShoes) {
      html += 
      '<li class="product-item">' +
        '<div class="product-div">' +
          '<img class="img-product" src="images/' + listShoes[i].image + '" alt="Image">' +
          '<h4 class="name-product">' + listShoes[i].name + '</h4>' +
          '<span class="price-product">' + listShoes[i].price + ' đ</span>' +
          '<a href="javascript:void(0)" class="add-cart" id="' + listShoes[i].id + '" href="#"><img class="img-add-cart" src="images/add-cart.png" alt="Add cart"></a>' +
        '</div>' +
      '</li>';
    }
    document.getElementById('product-list').innerHTML = html;
  }
  function addToCart() {
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
    addCart[i].addEventListener('click',function() {
      var idValue = this.getAttribute('id');
      if(idList.length > 0){
        var resultObject = search(this.getAttribute('id'), idList);
        var cartItem;
        if(!resultObject){
          cartItem  = {id:this.getAttribute('id'), quanlity:1};
          idList.push(cartItem);
        }else{
          for (var j = 0; j < idList.length; j++) {
            if(this.getAttribute('id') === idList[j].id){
              idList[j].quanlity += 1;
            }
          }
        }
      }else {
        cartItem  = {'id':this.getAttribute('id'),'quanlity':1};
        idList.push(cartItem);
      }
      ++total;
      localStorage.setItem('id-product', JSON.stringify(idList));
      localStorage.setItem('total', total);
      updateCart(total);   
    });
    }
  }
  function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].id === nameKey) {
          return myArray[i];
        }
    }
  }
  function updateCart(numbers) {
    var numberCart = document.getElementById('quanlity');
    numberCart.innerHTML = numberCart ? numbers : '';
  }
  var idList = JSON.parse(localStorage.getItem('id-product'));
  var total = 0;
  if(!idList){
    idList = [];
  }else {
    total = localStorage.getItem('total');
    updateCart(total);
  }
  var productList = document.getElementById('product-list');
  if(productList){
    showListProducts();
    addToCart();
  }
}
