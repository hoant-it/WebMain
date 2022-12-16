var MaHang='';
var tinhChiGCDVTotalCaption='Total';
var tinhChiGCDVDetailCaption='Detail';
const topRowCell=10



const loadPanel = $('.loadpanel').dxLoadPanel({
    shadingColor: 'rgba(0,0,0,0.4)',
    position: { of: '#GridTinhChi' },
    visible: false,
    showIndicator: true,
    showPane: true, 
    shading: false,//to den full man hinh
    closeOnOutsideClick: false,
    onShown() {
    //   setTimeout(() => {
    //     loadPanel.hide();
    //   }, 3000);
    },
    onHidden() {
        GridviewMauNLLoaiChiNewLoad();
        GridMHCDNewLoad();
    },
  }).dxLoadPanel('instance');



const upload=()=>{
    loadPanel.show();
    // let formData=new FormData($("frmUpload"));
    let formData  =new FormData(document.getElementById("frmUpload"));
    // for(let i=0; i<this.files.length;i++){
    //     formData.append('file',this.files[i]);
    // }
  let fileName=  $('#filename').val();
  let fileType= fileName.split('.').pop();


  if(fileType != "xlsx" && fileType != "xls"){
    DevExpress.ui.notify({
        message: "Chỉ nhận excel file",
        width: 450
    },"warning",5000)
    $('#filename').val("")
    return;
  }

    //   let data ={
    //     fileName:fileName
    //   }
  if(fileName==="" ){
    DevExpress.ui.notify({
        message: "Chọn file trước khi nhập",
        width: 450
    },"warning",5000)
  } else{
      $.ajax({
        type: "POST",
        data: formData,
        contentType: false,
        url: "/kho/giacongdayvai",
        cache: false,
        processData: false,
        success: (res) => {
          loadPanel.hide();

          if (res.statusErr) {
            DevExpress.ui.notify(
              {
                message: res.errMes,
                width: 450,
              },
              "success",
              5000
            );
          } else {
            DevExpress.ui.notify(
              {
                message: res.errMes,
                width: 450,
              },
              "error",
              5000
            );
          }
        },
      });
  }
}

const loadTooltip=(id,targetButton)=>{
    $(`#${id}`).dxTooltip({
        target: `#${targetButton}`,
        showEvent: "mouseenter",
        hideEvent: "mouseleave",
        closeOnOutsideClick: false
    }); 
}

const tabPanelLoad = () => {
    var urlGiaCongDayVaiChiTiet = "wacoal_GiaCongDayVai_MaHang_CT_V1/";
  
    var listGCDVCT = DevExpress.data.AspNet.createStore({
      key: "ID",
      loadUrl: urlGiaCongDayVaiChiTiet + MaHang,
      onBeforeSend: function (method, ajaxOptions) {
        ajaxOptions.xhrFields = {
          withCredentials: true,
        };
      },
    });
  
    var urlGiaCongDayVaiTotal = "wacoal_GiaCongDayVai_MaHang_V1/";
  
    var listGCDVTotal = DevExpress.data.AspNet.createStore({
      key: "keyMAHANG",
      loadUrl: urlGiaCongDayVaiTotal + MaHang ,
      onBeforeSend: function (method, ajaxOptions) {
        ajaxOptions.xhrFields = {
          withCredentials: true,
        };
      },
    });
    $("#tabPanel").dxTabPanel({
      dataSource: [
        {
          title: tinhChiGCDVTotalCaption,
          template() {
            return $("<div id='GridDatChiGCDVTotal'>").dxDataGrid({
              width: "100%",
              columns: [
                {
                    caption: "MÃ HÀNG",
                    alignment:"left",
                    dataField: "MAHANG",
                },
                {
                    caption: "MÀU MH",
                    alignment:"left",
                    dataField: "MAUMH",
                },
              
                {
                    caption: "R60",
                    alignment:"center",
                    columns: [{
                        caption: "COLOR",
                        alignment:"left",
                        dataField: "COLOR_R60",
                        format: "string"
                    }, {
                        caption: "QTY",
                        alignment:"right",
                        dataField: "SL_R60",
                        format: {
                            // type: 'percent',
                            precision: 1
                          }
                        // dataType: "number",
                        // format:"number"
                        // format: function(value) {
                        //     return value==0?'-':value;
                        //   }
                        // format: "percent"
                    }]
                },
                {
                    caption: "WA",
                    alignment:"center",
                    columns: [{
                        caption: "COLOR",
                        alignment:"center",
                        dataField: "COLOR_WA",
                        // format: "fixedPoint"
                    }, {
                        caption: "QTY",
                        alignment:"center",
                        dataField: "SL_WA",
                        // format: function(value) {
                        //     return value==0?'-':value;
                        //   }
                        // format: "percent"
                    }]
                }
                ,
                {
                    caption: "WB",
                    alignment:"center",
                    columns: [{
                        caption: "COLOR",
                        alignment:"center",
                        dataField: "COLOR_WB",
                        // format: "fixedPoint"
                    }, {
                        caption: "QTY",
                        alignment:"center",
                        dataField: "SL_WB",
                        // dataType: "number",
                        // format: function(value) {
                        //     return value==0?'-':value;
                        //   }
                        // format: "percent"
                    }]
                }
                ,
                {
                    caption: "W300",
                    alignment:"center",
                    columns: [{
                        caption: "COLOR",
                        alignment:"center",
                        dataField: "COLOR_W300",
                      
                        // format: "fixedPoint"
                    }, {
                        caption: "QTY",
                        alignment:"center",
                        dataField: "SL_W300",
                        // format: function(value) {
                        //     return value==0?'-':value;
                        //   }
                        // format: "percent"
                    }]
                } ,
             
                {
                    caption: "KS60",
                    alignment:"center",
                    columns: [{
                        caption: "COLOR",
                        alignment:"center",
                        dataField: "COLOR_KS60",
                        // format: "fixedPoint"
                    }, {
                        caption: "QTY",
                        alignment:"center",
                        dataField: "SL_KS60",
                        // format: function(value) {
                        //     return value==0?'-':value;
                        //   }
                        // format: "percent"
                    }]
                } ,
                {
                    caption: "UN420",
                    alignment:"center",
                    columns: [{
                        caption: "COLOR",
                        alignment:"center",
                        dataField: "COLOR_UN420",
                        // format: "fixedPoint"
                    }, {
                        caption: "QTY",
                        alignment:"center",
                        dataField: "SL_UN420",
                        // format: function(value) {
                        //     return value==0?'-':value;
                        //   }
                        // format: "percent"
                    }]
                } ,
                {
                    caption: "UN280",
                    alignment:"center",
                    columns: [{
                        caption: "COLOR",
                        alignment:"center",
                        dataField: "COLOR_UN280",
                        // format: "fixedPoint"
                    }, {
                        caption: "QTY",
                        alignment:"center",
                        dataField: "SL_UN280",
                        // format: function(value) {
                        //     return value==0?'-':value;
                        //   }
                        // format: "percent"
                    }]
                } ,
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
                    alignment:"center",
                    columns: [{
                        caption: "COLOR",
                        alignment:"center",
                        dataField: "COLOR_R50",
                        // format: "fixedPoint"
                    }, {
                        caption: "QTY",
                        alignment:"center",
                        dataField: "SL_R50",
                        // format: function(value) {
                        //     return value==0?'-':value;
                        //   }
                        // format: "percent"
                    }]
                } ,
                {
                    caption: "S80",
                    alignment:"center",
                    columns: [{
                        caption: "COLOR",
                        alignment:"center",
                        dataField: "COLOR_S80",
                        // format: "fixedPoint"
                    }, {
                        caption: "QTY",
                        alignment:"center",
                        dataField: "SL_S80",
                        // format: function(value) {
                        //     return value==0?'-':value;
                        //   }
                        // format: "percent"
                    }]
                } ,
                //bo cot 300W (300W,W300,N300 là 1)
    
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
         
              showBorders: true,
              rowAlternationEnabled: true,
              dataSource: listGCDVTotal,
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
        {
          title: tinhChiGCDVDetailCaption,
          template() {
            return $("<div id='GridGCDVCT'>").dxDataGrid({
              width: "100%",
              columns: [
                {
                  caption: "ID",
                  alignment: "right",
                  dataField: "ID",
                  width: 50,
                  // format: "number",
                },
                {
                  caption: "MAHANG",
                  alignment: "left",
                  dataField: "MAHANG",
                //   format: "string",
                },
                {
                  caption: "MAUMH",
                  alignment: "left",
                  dataField: "MAUMH",
                //   format: "string",
                },
                {
                    caption: "Màu NL",
                    alignment: "left",
                    dataField: "MAUNL",
                    // format: "string",
                },
                {
                    caption: "Màu Chỉ",
                    alignment: "left",
                    dataField: "MAMAUCHI",
                    // format: "string",
                },
                {
                    caption: "QUYCACH",
                    alignment: "left",
                    dataField: "QUYCACH",
                    // format: "string",
                },
                {
                    caption: "CONGDOAN",
                    alignment: "left",
                    dataField: "CONGDOAN",
                    // format: "string",
                },
                {
                    caption: "TENCONGDOAN",
                    alignment: "left",
                    dataField: "TENCONGDOAN",
                    // format: "string",
                },
                {
                    caption: "KYHIEUMAY",
                    alignment: "left",
                    dataField: "KYHIEUMAY",
                    // format: "string",
                },
                {
                    caption: "LOAIMAY",
                    alignment: "left",
                    dataField: "LOAIMAY",
                    // format: "string",
                },
                {
                    caption: "MAVITRICHI",
                    alignment: "left",
                    dataField: "MAVITRICHI",
                    // format: "string",
                },
                {
                    caption: "LOAICHI",
                    alignment: "left",
                    dataField: "LOAICHI",
                    // format: "string",
                },
                {
                    caption: "BIENDO",
                    alignment: "left",
                    dataField: "BIENDO",
                    // format: "string",
                },
                {
                    caption: "MATDO",
                    alignment: "left",
                    dataField: "MATDO",
                    // format: "string",
                },
                {
                    caption: "VITRI",
                    alignment: "left",
                    dataField: "VITRI",
                    // format: "string",
                },
                {
                    caption: "BERONGDAYVAI",
                    alignment: "left",
                    dataField: "BERONGDAYVAI",
                    // format: "string",
                },
                {
                    caption: "MET_PCS",
                    alignment: "left",
                    dataField: "MET_PCS",
                    // format: "string",
                },
                {
                    caption: "GHICHU",
                    alignment: "left",
                    dataField: "GHICHU",
                    // format: "string",
                },
                {
                    caption: "TIMECREATE",
                    alignment: "left",
                    dataField: "TIMECREATE",
                    // format: "string",
                },
                {
                    caption: "USERCREATE",
                    alignment: "left",
                    dataField: "USERCREATE",
                    // format: "string",
                },
                {
                    caption: "TIMEUPDATE",
                    alignment: "left",
                    dataField: "TIMEUPDATE",
                    // format: "string",
                },
                {
                    caption: "USERUPDATE",
                    alignment: "left",
                    dataField: "USERUPDATE",
                    // format: "string",
                },
              ],
              showBorders: true,
              rowAlternationEnabled: true,
              dataSource: listGCDVCT,
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

const searchBoxMaHang = () => {
    const selectBoxData = DevExpress.data.AspNet.createStore({
      key: "MAHANG",
      loadMode: "raw",
      loadUrl: `wacoal_MaHang_GCDV_Select_V1`,
    });
  
    var searchBox = $("#searchBoxMaHang")
      .dxSelectBox({
        dataSource: selectBoxData,
        displayExpr: "MAHANG",
        valueExpr: "MAHANG",
        searchEnabled: true,
        searchExpr: "MAHANG",
        searchMode: "contains",
        searchTimeout: 200,
        minSearchLength: 0,
        showDataBeforeSearch: false,
        showClearButton: true,
        placeholder: "Mã Hàng...",
        onValueChanged: function (data) {
            
          // var $result = $(".current-value");
  
          if (data.value !== null) {
            MaHang = data.value;
            tabPanelLoad();
            btnExportMultiExcel();
            //   var selectedItem = data.component.option('selectedItem');
            // $result.text(selectedItem.Name + " (ID: " + selectedItem.ID + ")");
            //   console.log(" (ID: " + selectedItem.MAKH + ")")
          } else {
            console.log("Not selected");
            // $result.text("Not selected");
          }
        },
      })
      .dxSelectBox("instance");
  };

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

  const btnExportMultiExcel = () => {
    const generalsa=new generals();
    $("#exportButton").dxButton({
      text: "",
      icon: "xlsxfile",
      onClick() {
        const GridDatChiGCDVTotal = $("#GridDatChiGCDVTotal").dxDataGrid("instance");
        const GridGCDVCT = $("#GridGCDVCT").dxDataGrid("instance");
  
        const workbook = new ExcelJS.Workbook();
        const TotalSheet = workbook.addWorksheet(tinhChiGCDVTotalCaption);
        const CTSheet = workbook.addWorksheet(tinhChiGCDVDetailCaption);
  
        TotalSheet.getRow(1).getCell(1).value = "Gia Công Dây Vai Tổng";
        TotalSheet.getRow(1).getCell(1).font = {
          bold: true,
          size: 16,
          underline: "double",
        };
        // TotalSheet.getRow(3).getCell(1).value = "Order";
        // TotalSheet.getRow(3).getCell(2).value = order
        // TotalSheet.getRow(4).getCell(1).value = "Chuyền";
        // TotalSheet.getRow(4).getCell(2).value = chuyen
        // TotalSheet.getRow(5).getCell(1).value = "Mã Hàng";
        // TotalSheet.getRow(5).getCell(2).value = maHang
        // TotalSheet.getRow(6).getCell(1).value = "Màu";
        // TotalSheet.getRow(6).getCell(2).value = mauMH
        // TotalSheet.getRow(7).getCell(1).value = "Số Lượng";
        // TotalSheet.getRow(7).getCell(2).value = soLuong
        TotalSheet.getRow(8).getCell(1).value = "Thời Gian";
        TotalSheet.getRow(8).getCell(2).value = generalsa.getDateTime();
        formatHeaderRow(TotalSheet)
  
     
        CTSheet.getRow(1).getCell(1).value = "Gia Công Dây Vai Chi Tiết";
        CTSheet.getRow(1).getCell(1).font = {
          bold: true,
          size: 16,
          underline: "double",
        };
        // CTSheet.getRow(3).getCell(1).value = "Order";
        // CTSheet.getRow(3).getCell(2).value = order
        // CTSheet.getRow(4).getCell(1).value = "Chuyền";
        // CTSheet.getRow(4).getCell(2).value = chuyen
        // CTSheet.getRow(5).getCell(1).value = "Mã Hàng";
        // CTSheet.getRow(5).getCell(2).value = maHang
        // CTSheet.getRow(6).getCell(1).value = "Màu";
        // CTSheet.getRow(6).getCell(2).value = mauMH
        // CTSheet.getRow(7).getCell(1).value = "Số Lượng";
        // CTSheet.getRow(7).getCell(2).value = soLuong
        CTSheet.getRow(8).getCell(1).value = "Thời Gian";
        CTSheet.getRow(8).getCell(2).value = generalsa.getDateTime();
        formatHeaderRow(CTSheet)
  
        
  
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
              size:'14',
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
            component: GridDatChiGCDVTotal,
            topLeftCell: { row: topRowCell, column: 1 },
            customizeCell(options) {
                var excelCell = options;
                excelCell.font = { name: "EUDC", size: 12 };
                excelCell.alignment = { horizontal: "left" };
              setHeaderRowsBackground(options.gridCell, options.excelCell);
              setAlternatingRowsBackground(
                excelCell.gridCell,
                excelCell.excelCell
              );
              // setAlternatingRowsBackground(options.gridCell, options.excelCell);
            },
          })
          .then(() =>
            DevExpress.excelExporter.exportDataGrid({
              worksheet: CTSheet,
              component: GridGCDVCT,
              topLeftCell: { row: topRowCell, column: 1 },
              customizeCell(options) {
                var excelCell = options;
                excelCell.font = { name: "EUDC", size: 12 };
                excelCell.alignment = { horizontal: "left" };
                setAlternatingRowsBackground(
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
                `GCDV_${generalsa.getDateTime()}.xlsx`
              );
            });
          });
      },
    });
  };

$(function(){
    searchBoxMaHang()
    // MaHang='None';
    // GridviewMaHangLoad(MaHang);
    // GridviewMauNLLoaiChiNewLoad();
    // GridMHCDNewLoad();
    // loadTooltip("tooltipUpload","btnUpload");
    
    // $('#btnSearchId').click((e) => {
    //     e.preventDefault();
    //     MaHang=$("#searchBoxMHGCDV").dxSelectBox('instance').option('value');
    //     GridviewMaHangLoad(MaHang);
    // });
});

