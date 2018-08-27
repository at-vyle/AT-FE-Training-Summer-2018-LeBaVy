window.onload = function() {
  var listShoes = [
    {
      'id':'1',
      'name':'Giày nữ -Giày nữ hàn quốc',
      'image':'nuhanquoc.jpg',
      'price':125000
    },
    {
      'id':'2',
      'name':'Giày thể  thao nữ',
      'image':'thethaonu.jpg',
      'price':265000
    },
    {
      'id':'3',
      'name':'Giày slip on nơ hạt',
      'image':'slipom.jpg',
      'price':355000
    },
    {
      'id':'4',
      'name':'Giày thể thao nữ xám sọc trắng',
      'image':'ttnusoctrang.jpg',
      'price':435000
    },
    {
      'id':'5',
      'name':'Giày Sneaker nữ',
      'image':'sneakernu.jpg',
      'price':135000
    },
    {
      'id':'6',
      'name':'Giày lười nữ đen lưới',
      'image':'luoinuden.jpg',
      'price':425000
    },
    {
      'id':'7',
      'name':'Giày lười nữ trắng',
      'image':'luoinutrang.jpg',
      'price':725000
    },
    {
      'id':'8',
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
          '<span class="price-product">' + listShoes[i].price + ' VND</span>' +
          '<a href="javascript:void(0)" class="add-cart" id="' + listShoes[i].id + '" href="#"><img class="img-add-cart" src="images/add-cart.png" alt="Add cart"></a>' +
        '</div>' +
      '</li>';
    }
    document.getElementById('product-list').innerHTML = html;
  }
  function addToCart(idList) {
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
    addCart[i].addEventListener('click',function() {
      var idValue = this.getAttribute('id');
      if(idList.length > 0){
        var resultObject = searchById(idValue, idList);
        var cartItem;
        if(!resultObject){
          cartItem  = {id:idValue, quanlity:1};
          idList.push(cartItem);
        }else{
          for (var j = 0; j < idList.length; j++) {
            if(idValue === idList[j].id){
              idList[j].quanlity += 1;
            }
          }
        }
      }else {
        cartItem  = {'id':idValue,'quanlity':1};
        idList.push(cartItem);
      }
      ++total;
      localStorage.setItem('id-product', JSON.stringify(idList));
      localStorage.setItem('total', total);
      updateCart(total);   
    });
    }
  }
  function searchById(nameKey, myArray){
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
  function showCarts(idCartList) {
    var html = '<tr class="table-row">' +
                '<th>Image</th>' +
                '<th>Name</th>' +
                '<th>Price</th>' +
                '<th>Quanlity</th>' +
                '<th>Action</th>' +
              '</tr>';
    var shoeObjectAdd;
    for (var i=0; i < idCartList.length; i++) {
      shoeObjectAdd = searchById(idCartList[i].id, listShoes);
      html +=
      '<tr class="table-row" id="product-item-' + idCartList[i].id + '">' +
        '<td>' +
          '<img class="img-product-cart" src="images/' + shoeObjectAdd.image + '" alt="">' +
        '</td>' +
        '<td>' +
          '<span class="name-product">' + shoeObjectAdd.name + '</span>' +
        '</td>' +
        '<td>' +
          '<span class="price-product">' + shoeObjectAdd.price + ' VND</span>' +
        '</td>' +
        '<td class="quanlity">' + idCartList[i].quanlity + '</td>' +
        '<td><a href="javascript:void(0)" class="item-del" id="' + shoeObjectAdd.id + '"><img class="remove-icon" src="images/remove.png" alt=""></a></td>' +
      '</tr>';
    }
    html += '<tfoot>'+
              '<tr class="sum-product">'+
                '<td colspan="2">Total</td>'+
                '<td id="sum-price">' + sumPrice(idCartList, listShoes) + ' VND</td>'+
                '<td id="total-product">' + total + '</td>'+
                '<td></td>'+
              '</tr>'+
            '</tfoot>';
    document.getElementById('cart-table').innerHTML = html;
  }
  function sumPrice(idCartList, listShoes) {
    var shoeObjectAdd, sumPrice = 0;
    for (var i = 0; i < idCartList.length; i++) {
      shoeObjectAdd = searchById(idCartList[i].id, listShoes);
      sumPrice += shoeObjectAdd.price * idCartList[i].quanlity;
    }
    return sumPrice;
  }
  function delCart(idCartList) {
    var listItemCartDel = document.getElementsByClassName('item-del');
    for (var i = 0; i < listItemCartDel.length; i++) {
      listItemCartDel[i].addEventListener('click', function() {
        var idDel = this.getAttribute('id');
        document.getElementById('product-item-' + idDel).style.display= 'none';
        idCartList = idCartList.filter(function(el) {
          return el.id !== idDel;
        });
        localStorage.setItem('id-product', JSON.stringify(idCartList));
        localStorage.setItem('total', countProduct(idCartList));
        updateCart(countProduct(idCartList));
        document.getElementById('sum-price').innerHTML = sumPrice(idCartList, listShoes) + ' VND';
        document.getElementById('total-product').innerHTML = countProduct(idCartList);
      });
    }
  }
  function countProduct(array) {
    var sum = 0;
    for (var index = 0; index < array.length; index++) {
      sum += array[index].quanlity;
    }
    return sum;
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
    addToCart(idList);
  }
  idList = JSON.parse(localStorage.getItem('id-product'));
  var cartTable = document.getElementById('cart-table');
  if(cartTable){
    showCarts(idList);
    delCart(idList);
  }
}
