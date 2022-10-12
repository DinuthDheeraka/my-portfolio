var itemValidations = new Array();
itemValidations.push({input:$('#input-itm-id'),regex:/I-[0-9]{3}-[0-9]{3}$/,valid:$('#itm-id-valid'),name:'itm-id'});
itemValidations.push({input:$('#input-itm-name'),regex:/[A-Za-z ]{2,}/,valid:$('#itm-name-valid'),name:'itm-name'});
itemValidations.push({input:$('#input-itm-price'),regex:/[0-9]{2,}/,valid:$('#itm-price-valid'),name:'itm-price'});
itemValidations.push({input:$('#input-itm-qty'),regex:/[0-9]{1,10000}/,valid:$('#itm-qoh-valid'),name:'itm-qty'});

$('#itm-add-btn').click(function () {
    if(validateAllInputs(itemValidations)){
        addNewItem();
        loadItemTblData();
        clearInputFieldsData($('#input-itm-id'),$('#input-itm-name'),
            $('#input-itm-price'),$('#input-itm-qty'));
        loadItemIdsToCmbx();
    }else{
        alert('please fill the inputs');
    }
});

$('#item-search-btn').click(function () {
    setItemData(searchItem($('#input-itm-search').val()));
});

$('#itm-update-btn').click(function () {
    updateItem(searchIndex($('#input-itm-id').val()));
    loadItemTblData();
});

$('#itm-delete-btn').click(function () {
    deleteItem(searchIndex($('#input-itm-id').val()));
    loadItemTblData();
});

function deleteItem(itemIndex) {
    items.splice(itemIndex,1);
}

function updateItem(itemIndex) {
    items[itemIndex] = {
        code: $('#input-itm-id').val(),
        name: $('#input-itm-name').val(),
        price: $('#input-itm-price').val(),
        qty: $('#input-itm-qty').val()
    }
}

function searchIndex(itemId) {
    for(let i = 0; i<items.length; i++){
        if(items[i].code==itemId){
            return i;
        }
    }
    return -1;
}

function searchItem(itemId) {
    for(let item of items){
        if(item.code==itemId){
            return item;
        }
    }
    return null;
}

function setItemData(item) {
    if(item!=null){
        $('#input-itm-id').val(item.code);
        $('#input-itm-name').val(item.name);
        $('#input-itm-price').val(item.price);
        $('#input-itm-qty').val(item.qty);
    }
}

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
    $('#itm-tbl-body').empty();
    for(let i of items){
        let row = "<tr><td>" + i.code + "</td><td>" + i.name + "</td><td>" + i.price + "</td><td>" + i.qty + "</td></tr>";
        $('#itm-tbl-body').append(row);
    }
}

function clearInputFieldsData() {
    for(let i = 0; i<arguments.length; i++){
        arguments[i].val('');
    }
}

function updateItemQOH(itemCode,operation,qty) {
    let item = items[searchIndex(itemCode)];
    if(operation=='decrease'){
        item.qty = parseInt(item.qty)-parseInt(qty);
    }else{
        item.qty = parseInt(item.qty)+parseInt(qty);
    }
}

// -----------------------------------validations
$('.itm-inp').on('keydown', function(e) {
    if (e.keyCode == 9) {
        $(this).focus();
        e.preventDefault();
    }
    if(e.keyCode == 13){
        switch ($(this).attr('id')) {
            case 'input-itm-id':
                if(validateInput('itm-id')){
                    $('#input-itm-name').focus();
                    e.preventDefault();
                }
                break;
            case 'input-itm-name':
                if(validateInput('itm-name')){
                    $('#input-itm-price').focus();
                    e.preventDefault();
                }
                break;
            case 'input-itm-price':
                if(validateInput('itm-price')){
                    $('#input-itm-qty').focus();
                    e.preventDefault();
                }
                break;
            case 'input-itm-qty':
                if(validateInput('itm-qty')){
                    if(validateAllInputs(itemValidations)){
                        addNewItem();
                        loadItemTblData();
                        clearInputFieldsData($('#input-itm-name'),$('#input-itm-id'),$('#input-itm-price'),$('#input-itm-qty'));
                        $('#input-itm-id').focus();
                        e.preventDefault();
                    }
                }
                break;
        }
    }
});

$('.itm-inp').on('keyup', function(e) {
    validateAllInputs(itemValidations);
});
