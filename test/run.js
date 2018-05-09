const FileData = require('../');

let f = new FileData('./files/index.html');
let p = createPrint(f);
p('filename');
p('ext');
p('mimetype');
p('basename');
p('name');
p('dir');
p('type');

console.log('toString: '+f)
console.log('format: ', f.format({ext: '.md'}).filename)

let f2 = new FileData('./files/index.html').preload();

f2.then(f2=>{
    let p2 = createPrint(f2);
    p2('size');
});



function createPrint(f){
    return function p(prop){
        console.log(prop,': ',f[prop])
    };
}
