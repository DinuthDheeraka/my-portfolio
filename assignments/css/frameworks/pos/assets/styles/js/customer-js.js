var customers = new Array();
$('#add-btn').click(function () {
    var c = {
        code : $('#inp-cus-code').val(),
        name : $('#inp-cus-name').val(),
        address : $('#inp-cus-address').val(),
        salary : $('#inp-cus-salary').val()
    };
    customers.push(c);
    // printCustomers();
    loadCustomers();
});

$('#get-all-btn').click(function () {
    printCustomers();
    // loadCustomers();
});

$('#customer-search-btn').click(function () {
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
        rowClickEvent();
        doubleClickEvent();
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

function rowClickEvent() {
    $('#customer-table-body>tr:last-child').click(function () {
        $('#inp-cus-code').val(($(this)).children('td:nth-child(1)').text());
        $('#inp-cus-name').val(($(this)).children('td:nth-child(2)').text());
        $('#inp-cus-address').val(($(this)).children('td:nth-child(3)').text());
        $('#inp-cus-salary').val(($(this)).children('td:nth-child(4)').text());
    });
}

function doubleClickEvent() {
    $('#customer-table-body>tr:last-child').dblclick(function () {
        $('#customer-table-body>tr:last-child').remove();
    });
}

$(document).ready(function(){
    $('input').on('keypress', function(e) {
        if(e.which == 13) {
            switch($(this).attr('id')){
                case 'inp-cus-code':
                    $('#inp-cus-name').focus();
                    e.preventDefault();
                    break;
                case 'inp-cus-name':
                    $('#inp-cus-address').focus();
                    e.preventDefault();
                    break;
                case 'inp-cus-address':
                    $('#inp-cus-salary').focus();
                    e.preventDefault();
                    break;
                case 'inp-cus-salary':
                    $('#inp-cus-code').focus();
                    e.preventDefault();
                    break;
            }
        }
    });
});

