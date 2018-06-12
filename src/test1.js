function firstLetterToUp(str){ 
    return String(str).replace('^\s*|\s*$')
                .replace(/\b\w+\b/g,function(word){ 
                    word = word.toLowerCase();
                    return word[0].toUpperCase() + word.substring(1);
                });
}

var b = firstLetterToUp('  aBCDE Bda erew');
console.log(b);