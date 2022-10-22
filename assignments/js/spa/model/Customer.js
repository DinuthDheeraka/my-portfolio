function Customer(p_code,p_name,p_address,p_salary) {
    var code = p_code;
    var name = p_name;
    var address = p_address;
    var salary = p_salary;

    this.setCode = function (c) {
        code = c;
    }
    this.setName = function (n) {
        name = n;
    }
    this.setAddress = function (a) {
        address = a;
    }
    this.setSalary = function (s) {
        salary = s;
    }

    this.getCode = function () {
        return code;
    }
    this.getName = function () {
        return name;
    }
    this.getAddress = function () {
        return address;
    }
    this.getSalary = function () {
        return salary;
    }
}