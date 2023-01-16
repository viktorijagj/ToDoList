$(document).ready(function(){
   //variables
    var newlistElement; // here goes new list element
    var newListCreated = true; //check if new list element ist created
    var createdList = document.getElementById("createdList");
    var message = document.querySelector(".message");
    
    
    $('#addElement').on('click', function(e){
        e.preventDefault();
        if(($('#createElement').val() == '')){
             message.innerHTML="Внесете текст во полето..";  
             return false;
        }
        //check if element is created for the first time
        if(newListCreated == true){
            message.innerHTML="";
            var elementValue = $('#createElement').val();
            //if true than create li element
            newlistElement = '<li class="elCreated" style="position:relative"><span class="handle"><i class="fa fa-bars" aria-hidden="true"></i></span><input class="itemOfTheList" value="' +elementValue+ '"><a href ="#" class="removeBtn" style="display:none;position:absolute;top:.8em;right:8em;color:red;text-decoration:none;padding:5px;">X</a></li>';
            newListCreated=false;
        
        } //if element is already crated for the first time then clone the last li element and replace its value with the entered one!
        else{
            message.innerHTML="";
            var elementValue = $('#createElement').val();
           newlistElement = $('#createdList li:last').clone();
           newlistElement.find('input').attr('value', elementValue);
        }
        // showing or not the clear button
        var elementsNumb = $("#createdList li").length+1;
        //if there is a li element than show it
        if(elementsNumb>=1){
            $('#clearButton').css('display','block');
        }
        if(elementsNumb==0){
            $('#clearButton').css('display','none');
        }
        //apend the created li element to the list
        $('#createdList').append(newlistElement);
        
        
        $('#createElement').val('');
        $('createElement').focus();
        $('.sortable').sortable('destroy');
        $('.sortable').sortable({
            handle: '.handle'});
        //save the created list
        localStorage.setItem('saveList',createdList.innerHTML);
    });
    
    //enter new li element by pressing "ENTER"btn
    $('input[type="text"]').on('keydown',function(e){
     var key=e.charCode ? e.charCode : e.keyCode ? e.keyCode:0;
        //check if enter(enter=13) is presed
        if(key == 13){
            e.preventDefault();
            var inputField = 
            //this showes the current field
            $(this).closest('#inputContainer').find(':input:visible');
            inputField.eq(inputField.index(this)+1).focus();
        }
    });
    //find all changes of the list
    //find all element of the list with class itemOfTheList
    $('#createdList').on('change','.itemOfTheList', function(e){
       var currentValue = $(this).val();
        $(this).attr('value', currentValue);
        localStorage.setItem('saveList',createdList.innerHTML);
    });
    
    //sortable
    $('.sortable').sortable().bind('sortupdate', function(){
     localStorage.setItem('saveList',createdList.innerHTML);   
    });
    //show the X delete btn of the element
    $('#createdList').on('mouseover','li',function(){
        var aElement = $(this).find('a');
        aElement.css('display','block');
    });
    //hide the X delete btn of the element 
    $('#createdList').on('mouseout','li',function(){
        var aElement = $(this).find('a');
        aElement.css('display', 'none');
    });
    //remove list item
    $('#createdList').on('click','.removeBtn', function(e){
        e.preventDefault();
        $(this).parent().remove();
        localStorage.setItem('saveList',createdList.innerHTML);
    });
    //clear all items
    $('#clearButton').on('click','#clearAllBtn', function(e){
        e.preventDefault();
        $('#createdList').children().remove(); 
        newListCreated = true;
        $('#createElement').val(''); //reset the input value
        $('#clearButton').css('display', 'none'); //hide the clear btn
        $('#createElement').focus(); //focus to the input filed
        localStorage.setItem('saveList',createdList.innerHTML);
    });
     displayList();
    
    function displayList(){
        var items = localStorage.getItem('saveList');
        if(items){
            createdList.innerHTML = items;
            //make the list sortable
            $('.sortable').sortable('destroy');
            $('.sortable').sortable({
            handle: '.handle'});
            //code for showing or not the clear button
            var elementsNumb = $("#createdList li").length+1;
            //if there is a li element than show it
            if(elementsNumb>1){
            $('#clearButton').css('display','block');
        }
            
        }
    }
    
   
});