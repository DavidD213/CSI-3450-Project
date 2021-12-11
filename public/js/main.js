
(function ($) {
    "use strict";



  
  
    /*==================================================================
    [ Validate ]*/


    function ClearFields() {
        document.getElementById("form-group").value = "";
   }
   function dontGo(event) {
    event.preventDefault();

    }
    document.getElementById("clickMe").addEventListener("click",dontGo);




    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });


    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    

})(jQuery);