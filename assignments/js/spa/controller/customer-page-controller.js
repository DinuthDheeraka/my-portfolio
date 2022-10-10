$('#cus-add-btn').click(function () {
    addNewCustomer();
    loadCustomerTblData();
    clearInputFieldsData($('#input-cus-id'),$('#input-cus-name'),
        $('#input-cus-address'),$('#input-cus-tele'));
});

$('#customer-search-btn').click(function () {
    setCustomerData(searchCustomer($('#input-cus-search').val()));
});

function searchCustomer(customerId) {
    for(let customer of customers){
        if(customer.code==customerId){
            return customer;
        }
    }
    return null;
}

function setCustomerData(customer) {
    if(customer!=null){
        $('#input-cus-id').val(customer.code);
        $('#input-cus-name').val(customer.name);
        $('#input-cus-address').val(customer.address);
        $('#input-cus-tele').val(customer.salary);
    }
}

function addNewCustomer() {
    let newCustomer = {
        code: $('#input-cus-id').val(),
        name: $('#input-cus-name').val(),
        address: $('#input-cus-address').val(),
        salary: $('#input-cus-tele').val()
    };
    customers.push(newCustomer);
}

function printAllCustomers() {
    for(let customer of customers){
        console.log(customer);
    }
}

function loadCustomerTblData() {
    let c = customers[customers.length-1];
    let row = "<tr><td>" + c.code + "</td><td>" + c.name + "</td><td>" + c.address + "</td><td>" + c.salary + "</td></tr>";
    $('#customer-tbl-body').append(row);
}

function clearInputFieldsData() {
    for(let i = 0; i<arguments.length; i++){
        arguments[i].val('');
    }
}