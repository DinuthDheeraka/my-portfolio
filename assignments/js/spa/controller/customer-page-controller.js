var customerValidations = new Array();
customerValidations.push({input:$('#input-cus-id'),regex:/C-[0-9]{3}-[0-9]{3}$/,valid:$('#cus-id-valid'),name:'cus-id'});
customerValidations.push({input:$('#input-cus-name'),regex:/[A-Za-z ]{3,20}/,valid:$('#cus-name-valid'),name:'cus-name'});
customerValidations.push({input:$('#input-cus-address'),regex:/[A-Za-z ./]{3,}/,valid:$('#cus-address-valid'),name:'cus-address'});
customerValidations.push({input:$('#input-cus-tele'),regex:/[0-9]{10}$/,valid:$('#cus-tele-valid'),name:'cus-tele'});


$('#cus-add-btn').click(function () {
    if(validateAllInputs(customerValidations)){
        addNewCustomer();
        loadCustomerTblData();
        clearInputFieldsData($('#input-cus-id'),$('#input-cus-name'),
            $('#input-cus-address'),$('#input-cus-tele'));
        loadCustomerIdsToCmbx();
    }else{
        alert('Please fill the inputs');
    }
});

$('#customer-search-btn').click(function () {
    setCustomerData(searchCustomer($('#input-cus-search').val()));
});

$('#cus-update-btn').click(function () {
    updateCustomer(searchCustomerIndex($('#input-cus-id').val()));
    loadCustomerTblData();
});

$('#cus-delete-btn').click(function () {
    deleteCustomer(searchCustomerIndex($('#input-cus-id').val()));
    loadCustomerTblData();
});

function deleteCustomer(customerIndex) {
    customers.splice(customerIndex,1);
}

function updateCustomer(customerIndex) {
    customers[customerIndex] = {
        code: $('#input-cus-id').val(),
        name: $('#input-cus-name').val(),
        address: $('#input-cus-address').val(),
        salary: $('#input-cus-tele').val()
    }
}

function searchCustomerIndex(customerId) {
    for(let i = 0; i<customers.length; i++){
        if(customers[i].code==customerId){
            return i;
        }
    }
    return -1;
}

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
    let newCustomer = new Customer($('#input-cus-id').val(),$('#input-cus-name').val(),$('#input-cus-address').val(),$('#input-cus-tele').val());
    customers.push(newCustomer);
}

function printAllCustomers() {
    for(let customer of customers){
        console.log(customer);
    }
}

function loadCustomerTblData() {
    $('#customer-tbl-body').empty();
    for(let c of customers){
        let row = "<tr><td>" + c.getCode() + "</td><td>" + c.getName() + "</td><td>" + c.getAddress() + "</td><td>" + c.getSalary() + "</td></tr>";
        $('#customer-tbl-body').append(row);
    }
}

function clearInputFieldsData() {
    for(let i = 0; i<arguments.length; i++){
        arguments[i].val('');
    }
}

// -----------------------------------validations
// $('#input-cus-id').on('keyup',function () {
//     alert('fuck');
// });
$('.cus-inp').on('keydown', function(e) {
    if (e.keyCode == 9) {
        $(this).focus();
        e.preventDefault();
    }
    if(e.keyCode == 13){
        switch ($(this).attr('id')) {
            case 'input-cus-id':
               if(validateInput('cus-id')){
                    $('#input-cus-name').focus();
                    e.preventDefault();
               }
                break;
            case 'input-cus-name':
               if(validateInput('cus-name')){
                    $('#input-cus-address').focus();
                    e.preventDefault();
               }
                break;
            case 'input-cus-address':
               if(validateInput('cus-address')){
                    $('#input-cus-tele').focus();
                    e.preventDefault();
               }
                break;
            case 'input-cus-tele':
                if(validateInput('cus-tele')){
                    if(validateAllInputs(customerValidations)){
                        addNewCustomer();
                        loadCustomerTblData();
                        clearInputFieldsData($('#input-cus-id'),$('#input-cus-name'),$('#input-cus-address'),$('#input-cus-tele'));
                        $('#input-cus-id').focus();
                        e.preventDefault();
                    }
               }
                break;
        }
    }
});

$('.cus-inp').on('keyup', function(e) {
    validateAllInputs(customerValidations);
});