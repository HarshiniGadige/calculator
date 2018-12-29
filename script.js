window.onload = function() {
    var display = 0;
    var buttons = document.getElementsByTagName('button');
    var cursor = document.getElementById('cursor');
    cursor.value = "0"
    var number = "", operand = "";
    var x = 0, y = 0;
    var m = 0;

    

    var calculate = function(n1, op, n2) {
        var n3;
        console.log(n1,n2);
        switch (op) {
            case '+':
                if(isNaN(n2))
                    n2 = n1;
                n3 = n1 + n2;
                break;
            case '-':
                if(isNaN(n2))
                    n2 = n1;
                n3 = n1 - n2;
                break;
            case '*':
                if(isNaN(n2))
                    n2 = n1;
                n3 = n1 * n2;
                break;
            case '/':
                if(n2 == 0) {
                    return "Error"
                } else if(isNaN(n2)) {
                    n2 = n1;
                }
                n3 = n1 / n2;
                break;
            case '1/x':
                if(n1 == 0) {
                    return "Error"
                }
                n3 = 1/n1;
                break;
            default:
                n3 = 0;
        }
        return n3;

    }


    var memory = function(key, mem) {
        if(key == "MS") {
            return m;
        } else if(key == "MC") {
            m = 0;
        } else if(key == "MR") {
            return m;
        } else if(key == "M+") {
            console.log(m, mem);
            m = parseFloat(m) + parseFloat(mem);
            return mem;
        } else if(key == "M-") {
            m = parseFloat(m) - parseFloat(mem);
            return mem;
        }
    }

    var keyAnalyser = function(key) {
        var keyPressed = key;
        if(!isNaN(keyPressed)) {
            if(cursor.value == 0 || number == 0)
                number=keyPressed;
            else
                number+=keyPressed;
            cursor.value = number;
        } else if(keyPressed == ".") {
            number+=keyPressed
        } else if(keyPressed == '+' || keyPressed == '-' || 
                keyPressed == '*' || keyPressed == '/') {
            x = parseFloat(cursor.value) || 0;
            operand = keyPressed;
            number="";
        } else if(keyPressed == '1/x') {
            x = parseFloat(cursor.value) || 0;
            cursor.value = calculate(x, '1/x', 0);
        } else if(keyPressed == 'sqrt') {
            cursor.value = Math.sqrt(cursor.value);
            number = cursor.value;
        } else if(keyPressed == '%') {
            cursor.value = cursor.value/100;
            number = cursor.value;
        } else if(keyPressed == '+/-') {
            cursor.value = cursor.value*(-1);   
            number = cursor.value;
        } else if(keyPressed == '←') {
            if (number == 0) {
                cursor.value = 0;
                number=0;
                }
            else if((number.length)==1){
                cursor.value = 0;
                number=0;
            } 
            else {
                number = number.substring(0,number.length - 1);
                cursor.value = number;   
            }
        }
        else if(keyPressed == '=' || keyPressed == "Enter") {
            y = parseFloat(number);
            cursor.value = calculate(x, operand, y);
            x = parseFloat(cursor.value);
        } else if(keyPressed == "CE" || keyPressed == "C") {
            x = y = cursor.value = number = 0;
        } else if(keyPressed == "MS" || keyPressed == "M+" || keyPressed == "M-") {
            memory(keyPressed, cursor.value);
        } else if(keyPressed == "MR") {
            cursor.value = memory(keyPressed, m);
        } else if(keyPressed == "MC" ) {
            memory(keyPressed, m);
        }
    }

    for(var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            var key = this.innerHTML;
            console.log(key);
            keyAnalyser(key);
        });   

        buttons[i].addEventListener('keypress', function(event) {
            var key = event.key;
            if(key == "Enter")
                key = "=";
            console.log(key);
            keyAnalyser(key);
        });
    }
};