var customers = new Array();
$('#add-btn').click(function () {
    var c = {
        code : $('#inp-cus-code').val(),
        name : $('#inp-cus-name').val(),
        address : $('#inp-cus-address').val(),
        salary : $('#inp-cus-salary').val()
    };
    customers.push(c);
    printCustomers();
    loadCustomers();
});

$('#get-all-btn').click(function () {
    printCustomers();
    // loadCustomers();
});

$('#customer-search-btn').click(function () {
    alert("aaa");
    let customer = searchCustomer();
    $('#inp-cus-code').val(customer.code);
    $('#inp-cus-name').val(customer.name);
    $('#inp-cus-address').val(customer.address);
    $('#inp-cus-salary').val(customer.salary);
});

function printCustomers() {
    for(var i = 0; i<customers.length; ++i){
        console.log(customers[i].code);
    }
}

function loadCustomers() {
    $('#customer-table-body').empty();
    for(var c of customers){
        var row =  "<tr><td>"+c.code+"</td><td>"+c.name+"</td><td>"+c.address+"</td><td>"+c.salary+"</td></tr>";
        $('#customer-table-body').append(row);
    }
}

function searchCustomer() {
    for(var c of customers){
        if(c.code==$('#customer-search-bar').val()){
            return c;
            break;
        }
    }
}

