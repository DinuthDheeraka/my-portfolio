var customers = new Array();
$('#add-btn').click(function () {
    var c = {
        code : $('#inp-cus-code').val(),
        name : $('#inp-cus-name').val(),
        address : $('#inp-cus-address').val(),
        salary : $('#inp-cus-salary').val()
    };
    customers.push(c);
    alert(c.name+" "+c.code+" "+c.address+" "+c.salary);
    printCustomers();
    loadCustomers();
});

$('#get-all-btn').click(function () {
    printCustomers();
    // loadCustomers();
});

function printCustomers() {
    for(var i = 0; i<customers.length; ++i){
        console.log(customers[i].code);
    }
}

function loadCustomers() {
    for(var c of customers){
        var row =  "<tr><td>"+c.code+"</td><td>"+c.name+"</td><td>"+c.address+"</td><td>"+c.salary+"</td></tr>";
        $('#customer-table-body').append(row);
    }
}

