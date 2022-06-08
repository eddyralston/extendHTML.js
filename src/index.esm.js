function getAttribute(host,attr,callback){
    var els = host.querySelectorAll('['+attr+']');
    var object = {};
    var length = els.length;
    for (var i = 0; i < length; i++) {
        var name = els[i].getAttribute(attr);
        callback(object,els[i],name);
    }
    return object;
}
function taggedString(str, ...args){
    var result = str[0]; var len = args.length;
    for (var i=0; i<len; i++) result += args[i] + str[i+1];
    return result
}
function _html(str){
    var el = document.createElement('div');
    el.innerHTML = str
    return el.firstElementChild;
}
const appendOnly = (parent, child) => {
    parent.innerHTML = '';
    parent.appendChild(child);
}
function html (str, ...args){
    var el = _html(taggedString(str, ...args));
    el.attach = function(host){ requestAnimationFrame(()=>host.append(el));return el; }
    el.attachOnly = function(host){ requestAnimationFrame(()=>appendOnly(host,el)); return el; }
    el.extend = function(... callback){
        el.child = getAttribute(el, 'child', (obj,child,name)=>{
            obj[name] = child;
        });
        el.data = getAttribute(el, 'data', (obj,child,name)=>{
            child.addEventListener('input',()=>obj[name]=child.value);
        });
        el.methods = getAttribute(el,'method',(obj,child,name)=>{
            child.addEventListener('click',()=>obj[name](this))
        });
        callback.forEach(arg=>{
            if(typeof arg === 'function'){
                var methods = arg(el);
                for (var method in methods) el.methods[method] = methods[method];
            }
            else if (typeof arg === 'object'){
                for (var method in arg) el.methods[method] = arg[method];
            }
        })
        return el
    }
    return el
}

const id = id => document.getElementById(id);

export {html,id}