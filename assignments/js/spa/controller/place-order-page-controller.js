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