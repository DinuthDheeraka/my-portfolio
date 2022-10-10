$(document).ready(function () {
    $('#order-page-customer-code').on('keypress', function (e) {
        if (e.which == 13) {
            let customer = searchCustomer($('#order-page-customer-code').val());
            if(customer!=null){
                $('#order-page-customer-name').val(customer.name);
                $('#order-page-customer-address').val(customer.address);
                $('#order-page-customer-tele').val(customer.salary);
            }
        }
    });
});

$(document).ready(function () {
    $('#order-page-item-code').on('keypress', function (e) {
        if (e.which == 13) {
            let item = searchItem($('#order-page-item-code').val());
            if(item!=null){
                $('#order-page-item-name').val(item.name);
                $('#order-page-item-price').val(item.price);
                $('#order-page-item-qoh').val(item.qty);
            }
        }
    });
});

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
    orders.push(orderItem);
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