$('#cus-add-btn').click(function () {
    addNewCustomer();
    printAllCustomers();
    loadCustomerTblData();
    // alert(111);
});

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