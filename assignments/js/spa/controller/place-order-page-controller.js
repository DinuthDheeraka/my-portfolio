var selectedItemCode = '';
var selectedCustomer = '';
$(document).ready(function () {
    loadItemIdsToCmbx();
    loadCustomerIdsToCmbx();
    loadCustomerTblData();
    loadItemTblData();
});

$(document).ready(function () {
    $('#order-page-discount').on('keyup', function (e) {
        if($('#order-page-discount').val()!=''){
            setSubTotal();
        }else{
            $('#order-page-sub-total').val($('#order-page-total').val());
        }
    });
});

$(document).ready(function () {
    $('#order-page-cash').on('keyup', function (e) {
        if($('#order-page-cash').val()!=''){
            setBalance();
        }else{
            $('#order-page-balance').val('');
        }
    });
});

$('#order-page-search-bar').on('keypress',function (e) {
    if(e.which==13){
        let orderHistory = findOrder($('#order-page-search-bar').val());
        if(orderHistory!=null){
            setSearchedOrderItems(orderHistory.itemsList);
            setSearchedCustomerData(orderHistory.customerCode);
            setSearchedPaymentsDetails(orderHistory);
        }
    }
});

$('#purchase-btn').click(function () {
    let itemList = duplicateArray(orders);
    addNewOrderHistory(itemList);
    $('#order-page-tbl-body').empty();
    orders = new Array();
});

function setSearchedPaymentsDetails(orderHistory) {
    $('#order-page-total').val(orderHistory.total);
    $('#order-page-sub-total').val(orderHistory.subtotal);
    $('#order-page-discount').val(orderHistory.discount);
    $('#order-page-cash').val(orderHistory.cash);
    $('#order-page-balance').val(orderHistory.balance);
}

function addNewOrderHistory(itemList) {
    ordersHistory.push({
        orderCode : $('#order-page-order-code').val(),
        customerCode : selectedCustomer,
        total : $('#order-page-total').val(),
        subtotal : $('#order-page-sub-total').val(),
        discount : $('#order-page-discount').val(),
        cash : $('#order-page-cash').val(),
        balance :$('#order-page-balance').val(),
        itemsList : itemList
    });
}

function duplicateArray(arr) {
    let itemList = new Array();
    for(let o of arr){
        itemList.push(o);
    }
    return itemList;
}

function findOrder(orderId) {
    for(let o of ordersHistory){
        if(o.orderCode==orderId){
            return o;
        }
    }
    return null;
}

function setSearchedOrderItems(itemList) {
    $('#order-page-tbl-body').empty();
    for(let o of itemList){
        let row = "<tr><td>" + o.code + "</td><td>" + o.name + "</td><td>" + o.price + "</td><td>" + o.qty + "</td><td>" + o.price*o.qty + "</td></tr>";
        $('#order-page-tbl-body').append(row);
    }
}

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
    $('#order-page-balance').val( parseFloat($('#order-page-cash').val())-parseFloat($('#order-page-sub-total').val()) );
}

function setSubTotal() {
    let discount = parseFloat($('#order-page-total').val())/100*parseFloat($('#order-page-discount').val());
    // $('#order-page-sub-total').val( parseFloat($('#order-page-total').val())-parseFloat($('#order-page-discount').val()) );
    $('#order-page-sub-total').val( parseFloat($('#order-page-total').val())-discount );
}

function setSearchedItemData(itemCode) {
    // clearInputItemData();
    let item = searchItem(itemCode);
    if(item!=null){
        // $('#order-page-item-code').val(item.code);
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
    $('#order-page-sub-total').val(calculateTotalPrice());
});

function addNewItemForOrderTbl() {
    let orderItem = {
        code: selectedItemCode,
        name: $('#order-page-item-name').val(),
        price: $('#order-page-item-price').val(),
        qty: $('#order-page-item-qty').val()
    }
    if(getOrderItemIndex(selectedItemCode)!=-1){
        updateItemQTY(getOrderItemIndex(selectedItemCode),orderItem.qty);
    }else{
        orders.push(orderItem);
    }
    updateItemQOH(orderItem.code,'decrease',orderItem.qty);
    loadItemTblData();
    setSearchedItemData(selectedItemCode);
}

function loadOrderItemTblData() {
    $('#order-page-tbl-body').empty();
    for(let o of orders){
        let row = "<tr><td>" + o.code + "</td><td>" + o.name + "</td><td>" + o.price + "</td><td>" + o.qty + "</td><td>" + o.price*o.qty + "</td></tr>";
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
    selectedItemCode = e.target.value;
});

$('#customer-id-cmbx').change(function (e) {
    setSearchedCustomerData(e.target.value);
    selectedCustomer = e.target.value;
});