$(document).ready(function () {
    loadItemIdsToCmbx();
    loadCustomerIdsToCmbx();
});


// $(document).ready(function () {
//     $('#order-page-customer-code').on('keypress', function (e) {
//         if (e.which == 13) {
//
//         }
//     });
// });

$(document).ready(function () {
    $('#order-page-discount').on('keypress', function (e) {
        if (e.which == 13) {
            setSubTotal();
        }
    });
});

$(document).ready(function () {
    $('#order-page-cash').on('keypress', function (e) {
        if (e.which == 13) {
            setBalance();
        }
    });
});

// $(document).ready(function () {
//     $('#order-page-item-code').on('keypress', function (e) {
//         if (e.which == 13) {
//             setSearchedItemData();
//         }
//     });
// });

function loadItemIdsToCmbx() {
    $('#item-id-cmbx').empty();
    for(let i of items){
        let option = "<option>"+i.code+"</option>";
        $('#item-id-cmbx').append(option);
    }
}

function loadCustomerIdsToCmbx() {
    $('#customer-id-cmbx').empty();
    for(let c of customers){
        let option = "<option>"+c.code+"</option>";
        $('#customer-id-cmbx').append(option);
    }
}

function setBalance() {
    $('#order-page-balance').val( parseInt($('#order-page-cash').val())-parseInt($('#order-page-sub-total').val()) );
}

function setSubTotal() {
    $('#order-page-sub-total').val( parseInt($('#order-page-total').val())-parseInt($('#order-page-discount').val()) );
}

function setSearchedItemData(itemCode) {
    clearInputItemData();
    let item = searchItem(itemCode);
    if(item!=null){
        $('#order-page-item-code').val(item.code);
        $('#order-page-item-name').val(item.name);
        $('#order-page-item-price').val(item.price);
        $('#order-page-item-qoh').val(item.qty);
    }
}

function setSearchedCustomerData(customerCode) {
    let customer = searchCustomer(customerCode);
    if(customer!=null){
        $('#order-page-customer-name').val(customer.name);
        $('#order-page-customer-address').val(customer.address);
        $('#order-page-customer-tele').val(customer.salary);
    }
}

function clearInputItemData() {
    $('#order-page-item-code').val('');
    $('#order-page-item-name').val('');
    $('#order-page-item-price').val('');
    $('#order-page-item-qoh').val('');
}

$('#order-page-add-item-btn').click(function () {
    addNewItemForOrderTbl();
    loadOrderItemTblData();
    $('#order-page-total').val(calculateTotalPrice());
});

function addNewItemForOrderTbl() {
    let orderItem = {
        code: $('#order-page-item-code').val(),
        name: $('#order-page-item-name').val(),
        price: $('#order-page-item-price').val(),
        qty: $('#order-page-item-qty').val()
    }
    if(getOrderItemIndex($('#order-page-item-code').val())!=-1){
        updateItemQTY(getOrderItemIndex($('#order-page-item-code').val()),orderItem.qty);
    }else{
        orders.push(orderItem);
    }
    updateItemQOH(orderItem.code,'decrease',orderItem.qty);
    loadItemTblData();
    setSearchedItemData();
}

function loadOrderItemTblData() {
    $('#order-page-tbl-body').empty();
    for(let o of orders){
        let row = "<tr><td>" + o.code + "</td><td>" + o.name + "</td><td>" + o.price + "</td><td>" + o.qty + "</td></tr>";
        $('#order-page-tbl-body').append(row);
    }
}

function calculateTotalPrice() {
    let total = 0;
    for(let o of orders){
        total+=(o.qty*o.price);
    }
    return total;
}

function getOrderItemIndex(itemCode) {
    for(let i = 0; i<orders.length; i++){
        if(orders[i].code==itemCode){
            return i;
        }
    }
    return -1;
}

function updateItemQTY(orderItemIndex,newQty) {
    let orderItem = orders[orderItemIndex];
    orderItem.qty =parseInt(orderItem.qty)+parseInt(newQty);
}

$('#item-id-cmbx').change(function (e) {
    setSearchedItemData(e.target.value);
});

$('#customer-id-cmbx').change(function (e) {
    setSearchedCustomerData(e.target.value);
});