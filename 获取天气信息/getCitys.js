const fs = require('fs');
var citys = '';
fs.readFile('citys.json', function (err, data) {
    if (err) return err;
    citys = JSON.parse(data).citys;
    citys = citys.split(' ');
})

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.all('/citys', (request, response) => {
    //设置允许跨越
    let strs = request.body.city.split('');
    strs = changeRegStrs(strs);
    strs = strs.join('.*');
    var maxLength=5;
    let length = 0;
    var cityStr='';
    for (var i = 0; i < citys.length; i++) {
        if (citys[i].search(strs) != -1) {
            if(length==0){
                cityStr+=citys[i];
            }else {
                cityStr+=' '+citys[i];
            }
            length++;
            if (length >= maxLength) {
                break;
            }
        }
    }
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader('Access-Control-Allow-Method', '*');
    response.send(cityStr);
})
app.listen(8000, () => {
    console.log("服务器已启动，127.0.0.1:8000端口监听中...");
})
function changeRegStrs(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == ' ') {
            arr[i] = '';
        }
        if (arr[i] == '+' || arr[i] == '*' || arr[i] == '.' || arr[i] == '^' || arr[i] == '$' || arr[i] == '[' || arr[i] == ']' || arr[i] == '{' || arr[i] == '}' || arr[i] == '(' || arr[i] == ')' || arr[i] == '/' || arr[i] == '\\' || arr[i] == '?') {
            arr[i] = '\\' + arr[i];
        }
    }
    return arr;
}