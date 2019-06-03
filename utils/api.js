var HOST_URI = 'http://127.0.0.1:2018';

function _obj2uri(obj){
    var p = Object.keys(obj).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]);
    }).join('&');
    return p
}

function _search(o) {
    return  HOST_URI + '/search?' + _obj2uri(o);
}

function _info(o) {
    return HOST_URI + "/info?" + _obj2uri(o);
}

module.exports = {
    search: _search,
    info : _info,
};