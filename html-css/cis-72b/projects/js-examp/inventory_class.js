/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 * Created by Scott Parker, 11:40 AM, 10/4/2017
 * Class to manage inventory items in local storage. Will enable the following:
 *      Create initial inventory file
 *      Add item to inventory
 *      Show all items in inventory
 * 
 */


function InvenManager() {
    if (localStorage.getItem("Inventory") === null) {
        //Create an array with 2 objects
        var inventoryItem1={"Product":"Chicken","Inventory":"155","Price":"3.55"};
        var inventoryItem2={"Product":"Milk","Inventory":"203","Price":"2.33"};
        var inventoryItem3={"Product":"Eggs","Inventory":"101","Price":"0.67"};
        var inventoryItem4={"Product":"Carrot","Inventory":"99","Price":"0.16"};
        var inventoryItem5={"Product":"Tuna","Inventory":"42","Price":"1.04"};
        var inventory=[];
        inventory[0]=inventoryItem1;
        inventory[1]=inventoryItem2;
        inventory[2]=inventoryItem3;
        inventory[3]=inventoryItem4;
        inventory[4]=inventoryItem5;
        //Display the array
        document.write("Creating basic inventory in localstorage");
        //Stringify the array
        var str=JSON.stringify(inventory);
        //Store into local Storage
        localStorage.setItem("Inventory",str);
    }
    this.inven=localStorage.getItem("Inventory");
}
        
InvenManager.prototype.display = function () {
    //Parse the information back into an array
    var inventory=JSON.parse(this.inven);
    //Display the array
    var temptxt="<h3>Inventory Items: <br></h3>";
    for(var items=0;items<inventory.length;items++){
        temptxt+=("<strong>Object Number: "+items+" </strong></br>");
        var obj=inventory[items];
        for(var property in obj){
        temptxt+=(property+"="+obj[property]+"</br>");
        }
    }
    document.getElementById("invdisplay").innerHTML = temptxt;
};     

InvenManager.prototype.addItem = function () {
    //Get the information from the local URL
    var url=document.location.href;
    //Call the getForm function to place into an object
    var $_GET=getForm(url);
    //Retrieve from Inventory (load localstorage file)
    var str=localStorage.getItem("Inventory");
    //Parse the inventory to an object
    var inventory=JSON.parse(str);
    //How many products are in inventory
    var number=inventory.length;
    //Add our new product to inventory
    inventory[number]=$_GET;
    //Put back the object into local storage after adding to the inventory object
    var str=JSON.stringify(inventory);
    localStorage.setItem("Inventory",str);
    this.inven=localStorage.getItem("Inventory");
    //Display the array of objects
    this.display();
};

InvenManager.prototype.remove = function () {
    //Get the information from the local URL
    var url=document.location.href;
    //Parse the URL to get item number to delete
    var delitem=delForm(url);
    //Load inventory from local storage
    var str=localStorage.getItem("Inventory");
    //Create inventory object
    var inventory=JSON.parse(str);
    var invtemp=[];
    var invsize=inventory.length;
    var flag=false;
    //rewrite inventory with the deleted item removed
    if (delitem<invsize) {
        for(var items=0;items<(invsize-1);items++){
            var newitem=items;
            if (items>=delitem) {
                newitem=items+1;
            } 
            invtemp[items]=inventory[newitem];
        }
        flag=true;
    } else {
        document.write("Must delete something that exists!<br>");
        flag=false;
    }
    //save back to local storage only if item deleted
    if (flag==true) {
        str=JSON.stringify(invtemp);
        localStorage.setItem("Inventory",str);
        this.inven=localStorage.getItem("Inventory");
    } else {
        document.write("Didn't change inventory values!");
    }
    //Display the array of objects (new inventory with the deleted item now missing)
    this.display();
}; 

InvenManager.prototype.reset = function () {
    //clear everything after ? in the URL (take the split array before ? and reassign to location bar
    var str = location.href.split('?')[0];
    location.href = str;
};


var inventory = new InvenManager();