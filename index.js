const mime = require('mime');
const path = require('path');
const {statSync, stat} = require('fs');
const Promise = require('bluebird');
const pstat = Promise.promisify(stat);
const createCache = require('./lib/getter_cache.js');
const cache = createCache();

class FileData {
    constructor(filename){
        Object.defineProperty(this, 'filename', {
            value: filename
        });
    }
    clearCache(){
        cache.clear(this);
        return this;
    }
    format(opts = {}){
        let {
            dir = this.dir,
            name = this.name,
            ext = this.ext,
            base
        } = opts;

        let p = path.format({
            dir,
            name,
            ext,
            base
        });

        let C = this.constructor;

        return new C(p);
    }
    toString(){
        return this.filename;
    }
}

cache.extend(FileData.prototype, {
    stats(){
        return statSync(this.filename);
    },
    ext(){
        return path.extname(this.filename);
    },
    mimetype(){
        return mime.getType(this.filename);
    },
    size(){
        return this.stats.size;
    },
    basename(){
        return path.basename(this.filename);
    },
    name(){
        return path.basename(this.filename, this.ext);
    },
    dir(){
        return path.dirname(this.filename);
    },
    type(){
        return this.stats.isSymbolicLink()
        ? 'link'
        : this.stats.isFile()
        ? 'file'
        : 'directory';
    }
});

module.exports = FileData;
