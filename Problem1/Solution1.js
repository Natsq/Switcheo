var sum_to_n_a = function(n) {
    sum = 0; 

    //for loop 
    for (i = 0; i <= n; i++){
        sum = sum + i; 
    }

    return sum; 
};

let result = sum_to_n_a(5);
console.log("Sum of numbers from 1 to 5 is: (Solution A) " + result);


var sum_to_n_b = function(n) {
    
    //Mathematical Formula 
    return n * (n+1)/2;

};

let result2 = sum_to_n_a(5);
console.log("Sum of numbers from 1 to 5 is: (Solution B) " + result2);



var sum_to_n_c = function(n) {

    //Recursion 
    if (n > 0){
        return n + sum_to_n_c(n-1);
    } else {
        return n; 
    }

};

let result3 = sum_to_n_c(5);
console.log("Sum of numbers from 1 to 5 is (Solution C): " + result3);