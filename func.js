/**
 * Created by Alice on 2/21/2017.
 */
function Post(url, params, callback, id) {
    var http = new XMLHttpRequest();
    http.open("POST", url, true);
    var result;
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            result = http.responseText;
            window[callback](result,id);
        }
    }
    http.send(params);
}
$(document).ready(function(){
    $('#get-all-user').click(function () {
        Post('api.php','action=getallusers','showresult','result0');
    });
    $('#get-user').click(function () {
        var username = $('#get-username').val();
        Post('api.php','action=getuser&username='+username,'showresult','result0');
    });
});

function showresult(text, id) {
    $('#'+id).html('<pre>'+text+'</pre>');
}