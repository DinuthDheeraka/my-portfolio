$('#itm-add-btn').click(function () {
    addNewItem();
    loadItemTblData();
});

function addNewItem() {
    let newItem = {
        code: $('#input-itm-id').val(),
        name: $('#input-itm-name').val(),
        price: $('#input-itm-price').val(),
        qty: $('#input-itm-qty').val()
    };
    items.push(newItem);
}

function printAllCustomers() {
    for(let customer of customers){
        console.log(customer);
    }
}

function loadItemTblData() {
    let i = items[items.length-1];
    let row = "<tr><td>" + i.code + "</td><td>" + i.name + "</td><td>" + i.price + "</td><td>" + i.qty + "</td></tr>";
    $('#itm-tbl-body').append(row);
}