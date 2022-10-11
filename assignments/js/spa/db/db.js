var customers = new Array();
customers.push({code: 'C-000-000', name: 'Dinuth Dheeraka', address: 'Kalutara', salary: 100000});
customers.push({code: 'C-000-001', name: 'Sethmal Fonseka', address: 'Galle', salary: 200000});
customers.push({code: 'C-000-002', name: 'Kaveen Kashmika', address: 'Jaffna', salary: 300000});

var items = new Array();
items.push({code:'I-000-000',name:'Kome',price:400, qty:10});
items.push({code:'I-000-001',name:'Toffee',price:500, qty:20});
items.push({code:'I-000-002',name:'Coke',price:600, qty:30});

var orders = new Array();

var ordersHistory = new Array();
var test = new Array();
test.push({code:'I-000-001',name:'Kome',price: 100, qty:10});
test.push({code:'I-000-002',name:'Toffee',price: 5, qty:50});
ordersHistory.push({
    orderCode : 'OR-0000',
    customerCode : 'C-000-000',
    total : 10,
    subtotal : 10,
    discount : 10,
    cash : 10,
    balance : 10,
    itemsList : test
});