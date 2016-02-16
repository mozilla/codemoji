var length = 593
var key = 263

// length and key are coprime must be coprime
// key cannot be 0

for(i=0;i<length;i++){
    if(decode(encode(i,key),key) != i){
        console.log(i, encode(i,key))
    }
}
    
console.log("done")

function encode (x, prime) {
    return (x*prime)%length
}

function decode (y, prime) {
    for (var i = 0; i < length; i++) {
        if( encode(i,prime) === y ){
            return i
        }
    }
}