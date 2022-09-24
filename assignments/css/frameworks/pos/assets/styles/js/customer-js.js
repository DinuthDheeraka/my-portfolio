$('#add-btn').click(function () {
    var c = {
        code : $('#inp-cus-code').val(),
        name : $('#inp-cus-name').val(),
        address : $('#inp-cus-address').val(),
        salary : $('#inp-cus-salary').val()
    };
    console.log(c.name+" "+c.code+" "+c.address+" "+c.salary);
});

