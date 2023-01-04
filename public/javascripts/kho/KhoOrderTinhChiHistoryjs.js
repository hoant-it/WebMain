

const datChiCaptionTotal = "Total";
const datChiCaptionCT = "Details";
const topRowCell=10
const generalsa=new generals();
let _userName='';
let _dateTimeDatChi='';




const searchBoxGroupKH=(orderNo) =>{
    // var orderNo=$('#searchBoxNam').dxSelectBox('instance').option('value');
    let url=`KHOCHIHEADER_GROUPKH_Load_web_wacoal_V1/${orderNo}`
    const selectBoxData =  DevExpress.data.AspNet.createStore({
        key: "GROUPKH",
        loadMode:"raw",
        loadUrl:url,
    });

    var searchBox = $("#searchBoxKH").dxSelectBox({
        dataSource:selectBoxData,
        displayExpr: "GROUPKH",
        valueExpr: "GROUPKH",
        searchEnabled: true,
        searchExpr:'GROUPKH',
        searchMode:'contains',
        searchTimeout:200,
        minSearchLength:0,
        showDataBeforeSearch:false,
        showClearButton: true,
        placeholder: "Khách Hàng...",
              onValueChanged: function (data) {
                let groupKH=data.value
                dateDatchi(orderNo,groupKH)
  
        },
    }).dxSelectBox("instance");
}

const searchBoxNam=() =>{
    const selectBoxData =  DevExpress.data.AspNet.createStore({
        key: "ORDERNO",
        loadMode:"raw",
        loadUrl:"KHOCHIHEADER_ORDERNO_load_web_wacoal_v1",
    });

    var searchBox = $("#searchBoxNam").dxSelectBox({
        dataSource:selectBoxData,
        displayExpr: "ORDERNO",
        valueExpr: "ORDERNO",
        searchEnabled: true,
        searchExpr:'ORDERNO',
        searchMode:'contains',
        searchTimeout:200,
        minSearchLength:0,
        showDataBeforeSearch:false,
        showClearButton: true,
        placeholder: "Order...",
        onValueChanged: function (data) {
           
        // var $result = $(".current-value");

        if (data.value !== null) {
            let  orderNo=data.value
            searchBoxGroupKH(orderNo)
            // var selectedItem = data.component.option('selectedItem');
            // // $result.text(selectedItem.Name + " (ID: " + selectedItem.ID + ")");
            // console.log(" (ID: " + selectedItem.MAKH + ")")
        } else {
            console.log("Not selected")
            // $result.text("Not selected");
        }
    },
   
    }).dxSelectBox("instance");
}
const formatHeaderRow=(sheetName)=>{
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

const datChiXuatExcel=(orderNo,groupKH)=>{
   
    const dataGridDatChiTotal = $("#GridDatChiTotal").dxDataGrid("instance");
    const dataGridDatChiCT = $("#GridDatChiCT").dxDataGrid("instance");

    const workbook = new ExcelJS.Workbook();
    const TotalSheet = workbook.addWorksheet(datChiCaptionTotal);
    const CTSheet = workbook.addWorksheet(datChiCaptionCT);

    TotalSheet.getRow(8).getCell(1).value = "Thời Gian";
    TotalSheet.getRow(8).getCell(2).value = generalsa.getDateTime();
    var headerRowFROM = TotalSheet.getRow(1);
    //   headerRowFROM.height = 30;
      TotalSheet.mergeCells(1, 1, 1, 1);
      headerRowFROM.getCell(1).value = 'FROM';
      headerRowFROM.getCell(1).font = { name: 'Arial', size: 10 };
      headerRowFROM.getCell(1).alignment = { horizontal: 'left' };

      var headerRowVnWacoal = TotalSheet.getRow(1);
      //   headerRowFROM.height = 30;
        TotalSheet.mergeCells(1, 2, 1, 3);
        headerRowVnWacoal.getCell(2).value = 'VIETNAM WACOAL';
        headerRowVnWacoal.getCell(2).font = { name: 'Arial', size: 10 };
        headerRowVnWacoal.getCell(2).alignment = { horizontal: 'left' };
        
      var headerRowTo = TotalSheet.getRow(2);
        //   headerRowFROM.height = 30;
          TotalSheet.mergeCells(2, 1, 2, 1);
          headerRowTo.getCell(1).value = 'TO';
          headerRowTo.getCell(1).font = { name: 'Arial', size: 10 };
          headerRowTo.getCell(1).alignment = { horizontal: 'left' }; 

      var headerRow2c2 = TotalSheet.getRow(2);
          //   headerRowFROM.height = 30;
          TotalSheet.mergeCells(2, 2, 2, 3);
          headerRow2c2.getCell(2).value = 'WACOAL CORP.';
          headerRow2c2.getCell(2).font = { name: 'Arial', size: 10 };
          headerRow2c2.getCell(2).alignment = { horizontal: 'left' };

      var headerRow3c1 = TotalSheet.getRow(3);
            //   headerRowFROM.height = 30;
            TotalSheet.mergeCells(3, 1, 3, 1);
            headerRow3c1.getCell(1).value = 'ATTN';
            headerRow3c1.getCell(1).font = { name: 'Arial', size: 10 };
            headerRow3c1.getCell(1).alignment = { horizontal: 'left' }; 

     var headerRow3c5 = TotalSheet.getRow(3);
              //   headerRowFROM.height = 30;
             TotalSheet.mergeCells(3, 5, 3, 8);
             headerRow3c5.getCell(5).value = 'ORDER THREAD';
             headerRow3c5.getCell(5).font = { name: 'Arial', size: 16 ,bold:true};
             headerRow3c5.getCell(5).alignment = { horizontal: 'left' };  

        var headerRow5c1 = TotalSheet.getRow(5);
             TotalSheet.mergeCells(5, 1, 5, 1);
             headerRow5c1.getCell(1).value = 'ORDER';
             headerRow5c1.getCell(1).font = { name: 'Arial', size: 10 };
             headerRow5c1.getCell(1).alignment = { horizontal: 'left' };   
                
        var headerRow5c2 = TotalSheet.getRow(5);
             TotalSheet.mergeCells(5, 2, 5, 3);
             headerRow5c2.getCell(2).value = orderNo;
             headerRow5c2.getCell(2).font = { name: 'Arial', size: 10 };
             headerRow5c2.getCell(2).alignment = { horizontal: 'left' };
         var headerRow5c4 = TotalSheet.getRow(5);
             TotalSheet.mergeCells(5, 4, 5, 4);
             headerRow5c4.getCell(4).value = groupKH;
             headerRow5c4.getCell(4).font = { name: "Arial", size: 10 };
             headerRow5c4.getCell(4).alignment = { horizontal: "left" }; 

             var headerRow6c2 = TotalSheet.getRow(6);
             TotalSheet.mergeCells(6, 2, 6, 3);
             headerRow6c2.getCell(2).value = _userName;
             headerRow6c2.getCell(2).font = { name: 'Arial', size: 10 };
             headerRow6c2.getCell(2).alignment = { horizontal: 'left' };
         var headerRow6c4 = TotalSheet.getRow(6);
             TotalSheet.mergeCells(6, 4, 6, 4);
             headerRow6c4.getCell(4).value = _dateTimeDatChi;
             headerRow6c4.getCell(4).font = { name: "Arial", size: 10 };
             headerRow6c4.getCell(4).alignment = { horizontal: "left" };     
    generalsa.formatHeaderRowExcel(TotalSheet)         
    // formatHeaderRow(TotalSheet)
 
    CTSheet.getRow(1).getCell(1).value = "Đặt chỉ Chi Tiết";
    CTSheet.getRow(1).getCell(1).font = {
      bold: true,
      size: 16,
      underline: "double",
    };
    var headerRow5c1 = CTSheet.getRow(5);
    CTSheet.mergeCells(5, 1, 5, 1);
    headerRow5c1.getCell(1).value = 'ORDER';
    headerRow5c1.getCell(1).font = { name: 'Arial', size: 10 };
    headerRow5c1.getCell(1).alignment = { horizontal: 'left' };   
       
var headerRow5c2 = CTSheet.getRow(5);
CTSheet.mergeCells(5, 2, 5, 3);
    headerRow5c2.getCell(2).value = orderNo;
    headerRow5c2.getCell(2).font = { name: 'Arial', size: 10 };
    headerRow5c2.getCell(2).alignment = { horizontal: 'left' };
var headerRow5c4 = CTSheet.getRow(5);
CTSheet.mergeCells(5, 4, 5, 4);
    headerRow5c4.getCell(4).value = groupKH;
    headerRow5c4.getCell(4).font = { name: "Arial", size: 10 };
    headerRow5c4.getCell(4).alignment = { horizontal: "left" }; 

    var headerRow6c2 = CTSheet.getRow(6);
    CTSheet.mergeCells(6, 2, 6, 3);
    headerRow6c2.getCell(2).value = _userName;
    headerRow6c2.getCell(2).font = { name: 'Arial', size: 10 };
    headerRow6c2.getCell(2).alignment = { horizontal: 'left' };
var headerRow6c4 = CTSheet.getRow(6);
    CTSheet.mergeCells(6, 4, 6, 4);
    headerRow6c4.getCell(4).value = _dateTimeDatChi;
    headerRow6c4.getCell(4).font = { name: "Arial", size: 10 };
    headerRow6c4.getCell(4).alignment = { horizontal: "left" }; 

    CTSheet.getRow(8).getCell(1).value = "Thời Gian";
    CTSheet.getRow(8).getCell(2).value = generalsa.getDateTime();
    generalsa.formatHeaderRowExcel(CTSheet) 
//    formatHeaderRow(CTSheet)
    

   function setAlternatingRowsBackground(gridCell, excelCell) {
    if (gridCell.rowType === "header" || gridCell.rowType === "data") {
      if (excelCell.fullAddress.row % 2 === 0) {
        excelCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "D3D3D3" },
          bgColor: { argb: "D3D3D3" },
        };
      
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
  }

  function setHeaderRowsBackground(gridCell, excelCell) {
    if (gridCell.rowType === "header") {
      excelCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "D3D3D3" },
        bgColor: { argb: "D3D3D3" },
      };
    }
  }



    DevExpress.excelExporter
      .exportDataGrid({
        worksheet: TotalSheet,
        component: dataGridDatChiTotal,
        topLeftCell: { row: topRowCell, column: 1 },
        customizeCell(options) {
            var gridCell = options.gridCell;
                var excelCell = options.excelCell;
                
                if(gridCell.rowType === "data") {
                    if(gridCell.column.dataField.includes("COLOR")) {
                        excelCell.alignment = { horizontal: 'left' };
                      }
                      if(gridCell.column.dataField.includes("SL")) {
                        excelCell.value = parseInt(gridCell.value);
                        excelCell.numFmt = "0;-0;-;@";
                        excelCell.alignment = { horizontal: 'right' };
                      }
                 
                }
            
                if(gridCell.rowType === "totalFooter" ) {
                  excelCell.alignment= { horizontal: 'right' };
                }
        setHeaderRowsBackground(gridCell, excelCell);
   
        },
      })
      .then(() =>
        DevExpress.excelExporter.exportDataGrid({
          worksheet: CTSheet,
          component: dataGridDatChiCT,
          topLeftCell: { row: topRowCell, column: 1 },
          customizeCell(options) {
            var excelCell = options;
            excelCell.font = { name: "EUDC", size: 12 };
            excelCell.alignment = { horizontal: "left" };
            // setAlternatingRowsBackground(
            //   excelCell.gridCell,
            //   excelCell.excelCell
            // );
           generalsa.setAlternatingRowsBackgroundExcel(
                excelCell.gridCell,
                excelCell.excelCell
              );
          },
        })
      )
      .then(() => {
        
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            // `aaa.xlsx`
            `DatChi_${generalsa.getDateTime()}.xlsx`
          );
        });
      });

}

const tabPanelLoad = ( orderNo, groupKH) => {
  //  listDataTinhChiChiTotal=[]
  var urlDatChiCT = `KHOCHIDETAIL_Load_By_Order_GroupKH_web_wacoal_V1/${orderNo}/${groupKH}`

  var listDataDatChiCT = DevExpress.data.AspNet.createStore({
    key: "keyMAHANG",
    loadUrl: urlDatChiCT,
    onBeforeSend: function (method, ajaxOptions) {
      ajaxOptions.xhrFields = {
        withCredentials: true,
      };
    },
  });



  var urlDatChiTotal =
    "KHOCHIDETAILGROUP_Load_web_wacoal_V1/" + orderNo + "/" + groupKH ;

  var listDataTinhChiChiTotal = DevExpress.data.AspNet.createStore({
    key: "numberLoaichi",
    loadUrl: urlDatChiTotal,
    onBeforeSend: function (method, ajaxOptions) {
      ajaxOptions.xhrFields = {
        withCredentials: true,
      };
    },
  });

  $("#tabPanel").dxTabPanel({
    dataSource: [
      {
        title: datChiCaptionTotal,
        template() {
          return $("<div id='GridDatChiTotal'>").dxDataGrid({
            width: "100%",
            columns: [
              {
                caption: "R60",
                alignment: "center",
                columns: [
                  {
                    caption: "COLOR",
                    alignment: "center",
                    dataField: "COLOR_R60",
                    format: "string",
                  },
                  {
                    caption: "QTY",
                    alignment: "center",
                    dataField: "SL_R60",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                  },
                ],
              },
              {
                caption: "WA",
                alignment: "center",
                columns: [
                  {
                    caption: "COLOR",
                    alignment: "center",
                    dataField: "COLOR_WA",
                    // format: "fixedPoint"
                  },
                  {
                    caption: "QTY",
                    alignment: "center",
                    dataField: "SL_WA",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                  },
                ],
              },
              {
                caption: "WB",
                alignment: "center",
                columns: [
                  {
                    caption: "COLOR",
                    alignment: "center",
                    dataField: "COLOR_WB",
                    // format: "fixedPoint"
                  },
                  {
                    caption: "QTY",
                    alignment: "center",
                    dataField: "SL_WB",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                  },
                ],
              },
              {
                caption: "W300",
                alignment: "center",
                columns: [
                  {
                    caption: "COLOR",
                    alignment: "center",
                    dataField: "COLOR_W300",

                    // format: "fixedPoint"
                  },
                  {
                    caption: "QTY",
                    alignment: "center",
                    dataField: "SL_W300",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                  },
                ],
              },
              {
                caption: "KS60",
                alignment: "center",
                columns: [
                  {
                    caption: "COLOR",
                    alignment: "center",
                    dataField: "COLOR_KS60",
                    // format: "fixedPoint"
                  },
                  {
                    caption: "QTY",
                    alignment: "center",
                    dataField: "SL_KS60",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                  },
                ],
              },
              {
                caption: "UN420",
                alignment: "center",
                columns: [
                  {
                    caption: "COLOR",
                    alignment: "center",
                    dataField: "COLOR_UN420",
                    // format: "fixedPoint"
                  },
                  {
                    caption: "QTY",
                    alignment: "center",
                    dataField: "SL_UN420",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                  },
                ],
              },
              {
                caption: "UN280",
                alignment: "center",
                columns: [
                  {
                    caption: "COLOR",
                    alignment: "center",
                    dataField: "COLOR_UN280",
                    // format: "fixedPoint"
                  },
                  {
                    caption: "QTY",
                    alignment: "center",
                    dataField: "SL_UN280",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                  },
                ],
              },
              // {
              //     caption: "GOMU",
              //     alignment:"center",
              //     columns: [{
              //         caption: "COLOR",
              //         alignment:"center",
              //         dataField: "COLOR_GOMU",
              //         // format: "fixedPoint"
              //     }, {
              //         caption: "QTY",
              //         alignment:"center",
              //         dataField: "SL_GOMU",
              //         // format: function(value) {
              //         //     return value==0?'-':value;
              //         //   }
              //         // format: "percent"
              //     }]
              // } ,
              {
                caption: "R50",
                alignment: "center",
                columns: [
                  {
                    caption: "COLOR",
                    alignment: "center",
                    dataField: "COLOR_R50",
                    // format: "fixedPoint"
                  },
                  {
                    caption: "QTY",
                    alignment: "center",
                    dataField: "SL_R50",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                  },
                ],
              },
              {
                caption: "S80",
                alignment: "center",
                columns: [
                  {
                    caption: "COLOR",
                    alignment: "center",
                    dataField: "COLOR_S80",
                    // format: "fixedPoint"
                  },
                  {
                    caption: "QTY",
                    alignment: "center",
                    dataField: "SL_S80",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                  },
                ],
              },

              // 10:24 23-06-2022 bo cot 300W (300W, W300, N300 la 1) edit by Hoa

              // {
              //     caption: "300W",
              //     alignment:"center",
              //     columns: [{
              //         caption: "COLOR",
              //         alignment:"center",
              //         dataField: "COLOR_300W",
              //         // format: "fixedPoint"
              //     }, {
              //         caption: "QTY",
              //         alignment:"center",
              //         dataField: "SL_300W",
              //         // format: function(value) {
              //         //     return value==0?'-':value;
              //         //   }
              //         // format: "percent"
              //     }]
              // } ,
            ],
            summary: {
              totalItems: [
                {
                  column: "COLOR_R60",
                  summaryType: "count",
                  customizeText: function (data) {
                    return "Total";
                  },
                },
                {
                  column: "SL_R60",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },
                {
                  column: "SL_WA",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },
                {
                  column: "SL_WB",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },
                {
                  column: "SL_W300",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },
                {
                  column: "SL_KS60",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },
                // {column: "SL_GOMU",
                // summaryType: "sum",
                // customizeText: function(data) {
                //     return data.value;
                // }},
                {
                  column: "SL_UN420",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },
                {
                  column: "SL_UN280",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },
                {
                  column: "SL_R50",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },
                {
                  column: "SL_S80",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },
                // 10:24 23-06-2022 bo cot 300W (300W, W300, N300 la 1) edit by Hoa

                // {column: "SL_300W",
                // summaryType: "sum",
                // customizeText: function(data) {
                //     return data.value;
                // }},
              ],
            },
            showBorders: true,
            rowAlternationEnabled: true,
            columnsAutoWidth: true,
            height: 450,
            allowColumnReordering: true,
            rowAlternationEnabled: true,
            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            focusedRowEnabled: true,
            wordWrapEnabled: true,
            scrolling: {
              mode: "virtual",
            },

            dataSource: listDataTinhChiChiTotal,
          });
        },
      },
      {
        title: datChiCaptionCT,
        template() {
          return $("<div id='GridDatChiCT'>").dxDataGrid({
            width: "100%",
            columns: [
              {
                caption: "MÃ HÀNG",
                alignment: "left",
                dataField: "MAHANG",
              },
              {
                caption: "MÀU MH",
                alignment: "left",
                dataField: "MAUMH",
              },
              {
                caption: "SL Order",
                alignment: "left",
                dataField: "OrderQty",
              },
              {
                caption: "KH Order",
                alignment: "left",
                dataField: "MAKH",
              },

              {
                caption: "R60",
                alignment: "center",
                columns: [
                  {
                    caption: "COLOR",
                    alignment: "left",
                    dataField: "COLOR_R60",
                    format: "string",
                  },
                  {
                    caption: "QTY",
                    alignment: "center",
                    dataField: "SL_R60",
                    format: {
                      // type: 'percent',
                      precision: 1,
                    },
                    // dataType: "number",
                    // format:"number"
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                  },
                ],
              },
              {
                caption: "WA",
                alignment: "center",
                columns: [
                  {
                    caption: "COLOR",
                    alignment: "center",
                    dataField: "COLOR_WA",
                    // format: "fixedPoint"
                  },
                  {
                    caption: "QTY",
                    alignment: "center",
                    dataField: "SL_WA",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                  },
                ],
              },
              {
                caption: "WB",
                alignment: "center",
                columns: [
                  {
                    caption: "COLOR",
                    alignment: "center",
                    dataField: "COLOR_WB",
                    // format: "fixedPoint"
                  },
                  {
                    caption: "QTY",
                    alignment: "center",
                    dataField: "SL_WB",
                    // dataType: "number",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                  },
                ],
              },
              {
                caption: "W300",
                alignment: "center",
                columns: [
                  {
                    caption: "COLOR",
                    alignment: "center",
                    dataField: "COLOR_W300",

                    // format: "fixedPoint"
                  },
                  {
                    caption: "QTY",
                    alignment: "center",
                    dataField: "SL_W300",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                  },
                ],
              },

              {
                caption: "KS60",
                alignment: "center",
                columns: [
                  {
                    caption: "COLOR",
                    alignment: "center",
                    dataField: "COLOR_KS60",
                    // format: "fixedPoint"
                  },
                  {
                    caption: "QTY",
                    alignment: "center",
                    dataField: "SL_KS60",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                  },
                ],
              },
              {
                caption: "UN420",
                alignment: "center",
                columns: [
                  {
                    caption: "COLOR",
                    alignment: "center",
                    dataField: "COLOR_UN420",
                    // format: "fixedPoint"
                  },
                  {
                    caption: "QTY",
                    alignment: "center",
                    dataField: "SL_UN420",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                  },
                ],
              },
              {
                caption: "UN280",
                alignment: "center",
                columns: [
                  {
                    caption: "COLOR",
                    alignment: "center",
                    dataField: "COLOR_UN280",
                    // format: "fixedPoint"
                  },
                  {
                    caption: "QTY",
                    alignment: "center",
                    dataField: "SL_UN280",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                  },
                ],
              },
              // {
              //     caption: "GOMU",
              //     alignment:"center",
              //     columns: [{
              //         caption: "COLOR",
              //         alignment:"center",
              //         dataField: "COLOR_GOMU",
              //         // format: "fixedPoint"
              //     }, {
              //         caption: "QTY",
              //         alignment:"center",
              //         dataField: "SL_GOMU",
              //         // format: function(value) {
              //         //     return value==0?'-':value;
              //         //   }
              //         // format: "percent"
              //     }]
              // } ,
              {
                caption: "R50",
                alignment: "center",
                columns: [
                  {
                    caption: "COLOR",
                    alignment: "center",
                    dataField: "COLOR_R50",
                    // format: "fixedPoint"
                  },
                  {
                    caption: "QTY",
                    alignment: "center",
                    dataField: "SL_R50",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                  },
                ],
              },
              {
                caption: "S80",
                alignment: "center",
                columns: [
                  {
                    caption: "COLOR",
                    alignment: "center",
                    dataField: "COLOR_S80",
                    // format: "fixedPoint"
                  },
                  {
                    caption: "QTY",
                    alignment: "center",
                    dataField: "SL_S80",
                    // format: function(value) {
                    //     return value==0?'-':value;
                    //   }
                    // format: "percent"
                  },
                ],
              },
              // 10:31 23-06-2022 bo cot 300W (300W, W300, N300 la 1) edit by Hoa
              //    {
              //     caption: "300W",
              //     alignment:"center",
              //     columns: [{
              //         caption: "COLOR",
              //         alignment:"center",
              //         dataField: "COLOR_300W",
              //         // format: "fixedPoint"
              //     }, {
              //         caption: "QTY",
              //         alignment:"center",
              //         dataField: "SL_300W",
              //         // format: function(value) {
              //         //     return value==0?'-':value;
              //         //   }
              //         // format: "percent"
              //     }]
              // } ,
            ],
            summary: {
              totalItems: [
                {
                  column: "COLOR_R60",
                  summaryType: "count",
                  customizeText: function (data) {
                    return "Total";
                  },
                },
                {
                  column: "SL_R60",
                  summaryType: "sum",
                  valueFormat: "Decimal",
                  customizeText: function (data) {
                    return data.value;
                  },
                },

                {
                  column: "SL_WA",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },
                {
                  column: "SL_WB",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },
                {
                  column: "SL_W300",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },

                {
                  column: "SL_KS60",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },
                {
                  column: "SL_UN420",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },
                {
                  column: "SL_UN280",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },

                {
                  column: "SL_R50",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },
                {
                  column: "SL_S80",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },

                // 10:31 23-06-2022 bo cot 300W (300W, W300, N300 la 1) edit by Hoa
                // {column: "SL_300W",
                // summaryType: "sum",
                // customizeText: function(data) {
                //     return data.value;
                // }},
              ],
            },
            showBorders: true,
            rowAlternationEnabled: true,
            dataSource: listDataDatChiCT,
            columnsAutoWidth: true,
            height: 450,
            allowColumnReordering: true,
            rowAlternationEnabled: true,
            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            focusedRowEnabled: true,
            wordWrapEnabled: true,
            scrolling: {
              mode: "virtual",
            },
          });
        },
      },
    ],
    itemTitleTemplate(itemData, itemIndex, itemElement) {
      itemElement.append(`<span class='dx-tab-text'>${itemData.title}</span>`);
    },
    deferRendering: false,
  });
};

  const datChi = () => {
    var orderNo = $("#searchBoxNam").dxSelectBox("instance").option("value");
    var groupKH = $("#searchBoxKH").dxSelectBox("instance").option("value");

    tabPanelLoad(orderNo, groupKH);

    $("#exportButton").dxButton({
      text: "",
      icon: "xlsxfile",
      onClick() {
        datChiXuatExcel(orderNo, groupKH);
      },
    });
  };

  const dateDatchi= (orderNo,groupKH)=>{

    let data= {
      orderNo:orderNo,
      groupKH:groupKH
    }

    $.ajax({
      type:'POST',
      data:JSON.stringify(data),
      contentType:'application/json',
      url:'KHOCHIHEADER_TIMECREATE_USERCREATE_load_web_wacoal_V1',
      success:(res)=>{
        if(res.length>0){
          let dateTime= res[0].TIMECREATE
          let year=dateTime.substr(0,4)
          let month=dateTime.substr(4,2)
          let day=dateTime.substr(6,2)
          let hour=dateTime.substr(8,2)
          let min=dateTime.substr(10,2)
          let second=dateTime.substr(12,2)
          let userName=res[0].USERCREATE
          _userName=userName
          _dateTimeDatChi=`${day}-${month}-${year}_${hour}:${min}:${second}`

          $('#disabledDate').dxDateBox({
            type: 'datetime',
            displayFormat: 'dd-MM-YYYY',
            disabled: true,
            value: new Date(year,month-1,day,hour,min,second),
          });

          $('#disabledText').dxTextBox({
            value: userName,
            disabled: true,
          });
        }
      }
    })




  }


$(function() {
    searchBoxNam();
    // searchBoxGroupKH();
  

   const btnDatChi=  $("#btnDatChi").dxButton({
        stylingMode: "contained",
        text: "Xem",
        type: "default",
        width:"100%",
        // A CSS-accepted measurement of width. For example, "55px", "20vw", "80%", "auto", "inherit".
        onClick() {
            datChi();
        },
      });


   
    



});

  
       