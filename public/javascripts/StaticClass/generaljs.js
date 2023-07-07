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

       formatHeaderRowExcel=(sheetName)=>{
          for(let i=1;i<topRowCell-1;i++){
            sheetName.getRow(i).getCell(1).font = {
              bold: true,
              size: 14,
              // underline: "double",
            };
            sheetName.getRow(i).getCell(2).font = {
              bold: true,
              size: 14,
              // underline: "double",
            };
        
          }
        }

         setAlternatingRowsBackgroundExcel(gridCell, excelCell) {
          if (
            // gridCell.rowType === "header" || 
          gridCell.rowType === "data") {
            if (excelCell.fullAddress.row % 2 !== 0) {
              excelCell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "D3D3D3" },
                bgColor: { argb: "D3D3D3" },
              };
            
            }
          }
          excelCell.font={
            size:'11',
            name:'EUDC'
          }
          excelCell.border = {
            top: {style:'thin', color: {argb:'00000000'}},
            left: {style:'thin', color: {argb:'00000000'}},
            bottom: {style:'thin', color: {argb:'00000000'}},
            right: {style:'thin', color: {argb:'00000000'}}
          };
        }
    
         setHeaderRowsBackgroundExcel(gridCell, excelCell) {
          if (gridCell.rowType === "header") {
            excelCell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "EEE8AA" },
              bgColor: { argb: "EEE8AA" },
            };

            excelCell.font={
              bold:true,
              size:'11',
              name:'EUDC'
            }
          }
        }

    



    
}

