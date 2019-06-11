var HOST_URI = 'http://127.0.0.1:2018';

function _obj2uri(obj){
    if (obj == null) {
        return "openid=" + wx.getStorageSync("openid")
    }

    var p = Object.keys(obj).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]);
    }).join('&');
    p = p + "&openid=" +  wx.getStorageSync("openid")
    return p
}

function _search(o) {
    return  HOST_URI + '/food/search?' + _obj2uri(o);
}

function _foodInfo(o) {
    return HOST_URI + "/food/info?" + _obj2uri(o);
}

function _eat(o) {
    return HOST_URI + "/eat?" + _obj2uri(o);
}

function _eatDates(o) {
    return HOST_URI + "/eat/dates?" + _obj2uri(o);
}

function _wxLogin(o) {
    return HOST_URI + "/wx/login?" + _obj2uri(o);
}

function _exercise(o) {
    return HOST_URI + "/exercise?" + _obj2uri(o);
}

function _run(o) {
    return HOST_URI + "/run?" + _obj2uri(o);
}

function _userInfo(o) {
    return HOST_URI + "/user/info?" + _obj2uri(o);
}

module.exports = {
    search: _search,
    foodInfo : _foodInfo,
    Eat:_eat,
    EatDates:_eatDates,
    wxLogin:_wxLogin,
    Exercise:_exercise,
    Run:_run,
    userInfo:_userInfo,
};