function createGetter(cache, name, fn){
    let obj = {};

    function getInit(ctx){
        if(!cache.has(ctx)){
            cache.set(ctx, {});
        }

        obj.get = getter;

        return getter(ctx);
    }

    function getter(ctx){
        let c = cache.get(ctx);
        if(c[name] === void 0){
            c[name] = fn.call(ctx);
        }

        return c[name];
    }

    obj.get = getInit;

    return obj;
}

module.exports = function createCache(){

    const cache = new WeakMap();

    function extend(proto, ...sources){
        sources.forEach(src=>{
            Object.keys(src).forEach(prop=>{
                let getter = createGetter(cache, prop, src[prop]);

                Object.defineProperty(proto, prop, {
                    get(){
                        return getter.get(this);
                    }
                });
            });
        });
    }

    function clear(ctx){
        cache.set(ctx, {});
    }

    return {
        extend,
        clear
    };
}
