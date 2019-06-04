//Functions for processing different $_GET from url passed
//in a form
//revised by: Scott Parker
//Example for CSC/CIS 17B

function getForm(url){
    var info=url.split("?");
    var nameValuePairs=info[1].split("&");
    var $_GET = new Object;
    for(var i=0;i<nameValuePairs.length-1;i++){
        var map=nameValuePairs[i].split("=");
        var name=map[0];
        var value=map[1];
        $_GET[name]=value;
    }
    return $_GET;
}

function delForm(url) {
    var info=url.split("?");
    var detail=info[1].split("&");
    var item=detail[0].split("=");
    return item[1];
}