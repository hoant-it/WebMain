class generals{
    constructor(){

    }

     GetURLParameter(sParam){
        var sPageUrl= window.location.search.substring(1);
        var sUrlVariables= sPageUrl.split('&');
        for(var i =0; i< sUrlVariables.length; i++){
            var sParemetterName= sUrlVariables[i].split('=');
            if(sParemetterName[0] === sParam){
                return sParemetterName[1];
            }
        }
    }

      getDateTime=()=> {
        var now     = new Date(); 
        var year    = now.getFullYear();
        var month   = now.getMonth()+1; 
        var day     = now.getDate();
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        var second  = now.getSeconds(); 
        if(month.toString().length == 1) {
             month = '0'+month;
        }
        if(day.toString().length == 1) {
             day = '0'+day;
        }   
        if(hour.toString().length == 1) {
             hour = '0'+hour;
        }
        if(minute.toString().length == 1) {
             minute = '0'+minute;
        }
        if(second.toString().length == 1) {
             second = '0'+second;
        }   
        var dateTime =day+'-'+month+'-'+ year+' '+hour+':'+minute+':'+second;   
         return dateTime;
      }

    



    
}

