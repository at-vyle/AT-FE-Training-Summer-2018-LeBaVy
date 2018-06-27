function ex1(n1,n2) {
  return (n1==n2)?n1*6:n1+n2;
}
console.log(ex1(7,7));
function ex2(n) {
  return (n>19)?(n-19)*3:19-n;
}
console.log(ex2(12));
function ex3(input) {
  var sum = 0;
  var output= [];
  for (var i = 0; i < input.length; i++) {
    if(input[i]!='*') sum += +input[i];
  }
  var digit = (sum%3==0)?0:3-sum%3;
  while(digit<10){
    output.push(input.replace("*",digit));
    digit+=3;
  }
  return output;
}
console.log(ex3("124*"));
function ex4(input) {
  var input = ex3(input);
  var output = [];
  for (n in input) {
    if(parseInt(input[n])%2==0) output.push(input[n]);
  }
  return output;
}
console.log(ex4("124*"));