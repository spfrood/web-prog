//Function which retrieves the information
//in a form
//Dr. Mark E. Lehr
//Example for CSC/CIS 17B
//$_GET object as implemented in PHP


function getForm(url){
    //create info obj, fill it with properties = to number of "?" in url, each 
    //property of info will be the data in url before the "?" so info[0] is everything
    //before the ? in the url of the page and info[1] is everything after the url
    var info=url.split("?");  
    //create nameValuePairs and fill it with properties = to number of "&" in 
    //info[1] (info object property 1, property 0 is not needed) split takes everything 
    //before the 1st & and puts it in nameValuePairs[0], then takes everything up to 
    //the 2nd & and puts it in nameValuePairs[1], and so forth
    var nameValuePairs=info[1].split("&");
    //create new object named $_GET of type "Object"? Is "Object" a built-in part of
    //javascript?
    var $_GET = new Object;
    //for loop to put the nameValuePairs into the $_GET object (array?)
    //Why does it use nameValuePairs instead of for (property in $_GET)?
    //does the name.length function return the number of items in the array? It looks like
    //it does but useful to know exactly how it works.
    for(var i=0;i<nameValuePairs.length-1;i++){
        //creates a temp object named 'map' to hold the separated data from the nameValuePairs.
        //In this case map is separating nameValuePairs[i] into two details, the field ID and the 
        //field value of the boxes on the form. Each data-box of the form consists of two different
        //types of data separated by an '=' symbol. When 'map' is created in the for loop 
        var map=nameValuePairs[i].split("=");
        //creates two values... name is the name-label of the form.html box.  It is the 'i' iteration 
        //of a data-box on the form.html page. It assigns the form box's name (map[0] to the name value and 
        //the text entered into the box (map[1]) is the data entered into the 'value' object
        var name=map[0];
        var value=map[1];
        //assigns the box on the form's id (name) to the $_GET object instead of an integer like normal array
        //and assigns the 'value' as the data entered into the array. Need more info on how this works.
        $_GET[name]=value;
    }
    //Function returns the $_GET object where the getForm function was called.
    return $_GET;
}

//Need more clarification on the structure of $_GET... How does this work with $_GET[xxxx]=something
//instead of $_GET[0]=something?

//Need more information about the 'action' and 'method' properties of <form> on the form.html 
//page.  Action is fairly self-explanitory... it's a page to go to when the submit is clicked. 
//Is 'get' a special/reserved word or method?

// !!! Really need more clarificaion on $_GET from the getform.html page 