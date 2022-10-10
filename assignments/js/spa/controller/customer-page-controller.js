$('#cus-add-btn').click(function () {
    addNewCustomer();
    printAllCustomers();
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
    for (let customer of customers) {
        var row = "<tr><td>" + c.code + "</td><td>" + c.name + "</td><td>" + c.address + "</td><td>" + c.salary + "</td></tr>";
        $('#customer-table-body').append(row);
    }
}