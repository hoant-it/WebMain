let maHang = "";
let mauMH = "";
let soLuong = 0;
let chuyen = "";
let order = "";
const datChiCaptionTotal = "Total";
const datChiCaptionCT = "Details";
const topRowCell=10


const searchBoxMaHang = () => {
  const selectBoxData = DevExpress.data.AspNet.createStore({
    key: "MAHANG",
    loadMode: "raw",
    loadUrl: "wacoal_MaHang_Select_V1",
  });

  var searchBox = $("#searchBoxMH")
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
      placeholder: "Mã Hàng",
      onValueChanged: function (data) {
        // var $result = $(".current-value");

        if (data.value !== null) {
          // console.log(data)
          // var selectedItem = data.component.option('selectedItem');
          maHang = data.value;
          console.log(maHang);
          searchBoxMau();
          // $result.text(selectedItem.Name + " (ID: " + selectedItem.ID + ")");
          // console.log(" (ID: " + selectedItem.MAKH + ")")
        } else {
          console.log("Not selected");
          // $result.text("Not selected");
        }
      },
    })
    .dxSelectBox("instance");
};

const searchBoxMau = () => {
  const selectBoxData = DevExpress.data.AspNet.createStore({
    key: "MAUMH",
    loadMode: "raw",
    loadUrl: `wacoal_Datchi_MauMH_Load_Web_V1/${maHang}`,
  });

  var searchBox = $("#searchBoxMauMH")
    .dxSelectBox({
      dataSource: selectBoxData,
      displayExpr: "MAUMH",
      valueExpr: "MAUMH",
      searchEnabled: true,
      searchExpr: "MAUMH",
      searchMode: "contains",
      searchTimeout: 200,
      minSearchLength: 0,
      showDataBeforeSearch: false,
      showClearButton: true,
      placeholder: "Màu Mã Hàng...",
      onValueChanged: function (data) {
        // var $result = $(".current-value");

        if (data.value !== null) {
          mauMH = data.value;
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
const searchBoxLine = () => {
  const selectBoxData = DevExpress.data.AspNet.createStore({
    key: "MACHUYEN",
    loadMode: "raw",
    loadUrl: `wacoal_CHUYEN_Load_Web_V1`,
  });

  var searchBox = $("#searchBoxLine")
    .dxSelectBox({
      dataSource: selectBoxData,
      displayExpr: "MACHUYEN",
      valueExpr: "MACHUYEN",
      searchEnabled: true,
      searchExpr: "MACHUYEN",
      searchMode: "contains",
      searchTimeout: 200,
      minSearchLength: 0,
      showDataBeforeSearch: false,
      showClearButton: true,
      placeholder: "Chuyền...",
      onValueChanged: function (data) {
        // var $result = $(".current-value");

        if (data.value !== null) {
          chuyen = data.value;
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

const DatChiLoad = () => {
  soLuong = $("#txtSL").dxNumberBox("instance").option("value");
  if (order === "") {
    alert("Chưa nhập Order");
    return;
  }
  if (chuyen === "") {
    alert("Chưa nhập Chuyền");
    return;
  }
  if (maHang === "") {
    alert("Chưa nhập Mã Hàng");
    return;
  }
  if (mauMH === "") {
    alert("Chưa nhập màu Mã Hàng");
    return;
  }
  if (soLuong === 0 || soLuong === null) {
    alert("Chưa nhập số lượng");
    return;
  }

  tabPanelLoad();
  btnExportMultiExcel();
};

const tabPanelLoad = () => {
  var urlDatChiCT = "wacoal_DatChi_MH_Mau_SL_Web_V1/";

  var listDataDatChiCT = DevExpress.data.AspNet.createStore({
    key: "STT",
    loadUrl: urlDatChiCT + maHang + "/" + mauMH + "/" + soLuong,
    onBeforeSend: function (method, ajaxOptions) {
      ajaxOptions.xhrFields = {
        withCredentials: true,
      };
    },
  });

  var urlDatChiTotal = "wacoal_TinhChi_MaHang_Mau_SL_V2/";

  var listDataDatChiTotal = DevExpress.data.AspNet.createStore({
    key: "keyMAHANG",
    loadUrl: urlDatChiTotal + maHang + "/" + mauMH + "/" + soLuong,
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
                caption: "SL Đặt",
                alignment: "left",
                dataField: "Qty",
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
                    alignment: "right",
                    dataField: "SL_R60",
                    format: {
                      precision: 1,
                    },
                  },
                  {
                    caption: "TOTAL",
                    alignment: "right",
                    dataField: "SLFN_R60",
                    format: {
                      // type: 'percent',
                      precision: 1,
                    },
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
                  {
                    caption: "TOTAL",
                    alignment: "right",
                    dataField: "SLFN_WA",
                    format: {
                      // type: 'percent',
                      precision: 1,
                    },
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
                  {
                    caption: "TOTAL",
                    alignment: "right",
                    dataField: "SLFN_WB",
                    format: {
                      // type: 'percent',
                      precision: 1,
                    },
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
                  {
                    caption: "TOTAL",
                    alignment: "right",
                    dataField: "SLFN_W300",
                    format: {
                      // type: 'percent',
                      precision: 1,
                    },
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
                  {
                    caption: "TOTAL",
                    alignment: "right",
                    dataField: "SLFN_KS60",
                    format: {
                      // type: 'percent',
                      precision: 1,
                    },
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
                  {
                    caption: "TOTAL",
                    alignment: "right",
                    dataField: "SLFN_UN420",
                    format: {
                      // type: 'percent',
                      precision: 1,
                    },
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
                  {
                    caption: "TOTAL",
                    alignment: "right",
                    dataField: "SLFN_UN280",
                    format: {
                      // type: 'percent',
                      precision: 1,
                    },
                  },
                ],
              },
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
                  {
                    caption: "TOTAL",
                    alignment: "right",
                    dataField: "SLFN_R50",
                    format: {
                      // type: 'percent',
                      precision: 1,
                    },
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
                  {
                    caption: "TOTAL",
                    alignment: "right",
                    dataField: "SLFN_S80",
                    format: {
                      // type: 'percent',
                      precision: 1,
                    },
                  },
                ],
              },
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
                  column: "SLFN_R60",
                  summaryType: "sum",
                  valueFormat: "Decimal",
                  customizeText: function (data) {
                    return data.value;
                  },
                },

                {
                  column: "SLFN_WA",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },
                {
                  column: "SLFN_WB",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },
                {
                  column: "SLFN_W300",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },
                {
                  column: "SLFN_KS60",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },
                {
                  column: "SLFN_UN420",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },
                {
                  column: "SLFN_UN280",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },
                {
                  column: "SLFN_K80",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },
                {
                  column: "SLFN_R50",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },
                {
                  column: "SLFN_S80",
                  summaryType: "sum",
                  customizeText: function (data) {
                    return data.value;
                  },
                },
              ],
            },
            showBorders: true,
            rowAlternationEnabled: true,
            dataSource: listDataDatChiTotal,
 
          });
        },
      },
      {
        title: datChiCaptionCT,
        template() {
          return $("<div id='GridDatChiCT'>").dxDataGrid({
            width: "100%",
            columns: [
              // {
              //   caption: "STT",
              //   alignment: "right",
              //   dataField: "STT",
              //   width: 50,
              //   // format: "number",
              // },
              // {
              //   caption: "MAHANG",
              //   alignment: "left",
              //   dataField: "MAHANG",
              //   format: "string",
              // },
              // {
              //   caption: "MAUMH",
              //   alignment: "left",
              //   dataField: "MAUMH",
              //   format: "string",
              // },
          
              {
                caption: "Tên Công Đoạn",
                alignment: "left",
                dataField: "TENCONGDOAN",
                // width: 200,  
              },
              {
                caption: "Ký Hiệu Máy",
                alignment: "left",
                dataField: "KYHIEUMAY",
                format: "string",
                width: 100,            
              },
              {
                caption: "Mã Vị Trí",
                alignment: "left",
                dataField: "MAVITRICHI",
                width: 100,
              },
            
              {
                caption: "Loại Máy",
                alignment: "left",
                dataField: "LOAIMAY",
                width: 150,
            
              },
    
              {
                caption: "SL/PCS (Mét) (1)",
                alignment: "right",
                dataField: "MET_PSC",
                width: 77,
                // format: "number",
              },
              {
                caption: "SL Đặt (2)",
                alignment: "right",
                dataField: "Qty",
                width: 77,
                // format: "number",
              },
              {
                caption: "Công Đoạn",
                alignment: "right",
                dataField: "CONGDOAN",
                width: 100,
            
              },
              {
                caption: "Loại Chỉ",
                alignment: "left",
                dataField: "LOAICHI",
                width: 77,
          
              },
              {
                caption: "Màu Chỉ",
                alignment: "left",
                dataField: "MauChi",
                width: 77,
                // format: "string",
              },
              {
                caption: "SL Chỉ(Mét) (1*2)",
                alignment: "right",
                dataField: "SLChi",
                width: 150,
                dataType: "number",
                // format: "number",
              },
            ],
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
      const dataGridDatChiTotal = $("#GridDatChiTotal").dxDataGrid("instance");
      const dataGridDatChiCT = $("#GridDatChiCT").dxDataGrid("instance");

      const workbook = new ExcelJS.Workbook();
      const TotalSheet = workbook.addWorksheet(datChiCaptionTotal);
      const CTSheet = workbook.addWorksheet(datChiCaptionCT);

      TotalSheet.getRow(1).getCell(1).value = "Đặt chỉ Tổng";
      TotalSheet.getRow(1).getCell(1).font = {
        bold: true,
        size: 16,
        underline: "double",
      };
      TotalSheet.getRow(3).getCell(1).value = "Order";
      TotalSheet.getRow(3).getCell(2).value = order
      TotalSheet.getRow(4).getCell(1).value = "Chuyền";
      TotalSheet.getRow(4).getCell(2).value = chuyen
      TotalSheet.getRow(5).getCell(1).value = "Mã Hàng";
      TotalSheet.getRow(5).getCell(2).value = maHang
      TotalSheet.getRow(6).getCell(1).value = "Màu";
      TotalSheet.getRow(6).getCell(2).value = mauMH
      TotalSheet.getRow(7).getCell(1).value = "Số Lượng";
      TotalSheet.getRow(7).getCell(2).value = soLuong
      TotalSheet.getRow(8).getCell(1).value = "Thời Gian";
      TotalSheet.getRow(8).getCell(2).value = generalsa.getDateTime();
      formatHeaderRow(TotalSheet)

   
      CTSheet.getRow(1).getCell(1).value = "Đặt chỉ Chi Tiết";
      CTSheet.getRow(1).getCell(1).font = {
        bold: true,
        size: 16,
        underline: "double",
      };
      CTSheet.getRow(3).getCell(1).value = "Order";
      CTSheet.getRow(3).getCell(2).value = order
      CTSheet.getRow(4).getCell(1).value = "Chuyền";
      CTSheet.getRow(4).getCell(2).value = chuyen
      CTSheet.getRow(5).getCell(1).value = "Mã Hàng";
      CTSheet.getRow(5).getCell(2).value = maHang
      CTSheet.getRow(6).getCell(1).value = "Màu";
      CTSheet.getRow(6).getCell(2).value = mauMH
      CTSheet.getRow(7).getCell(1).value = "Số Lượng";
      CTSheet.getRow(7).getCell(2).value = soLuong
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
          component: dataGridDatChiTotal,
          topLeftCell: { row: topRowCell, column: 1 },
          customizeCell(options) {
            setHeaderRowsBackground(options.gridCell, options.excelCell);
            // setAlternatingRowsBackground(options.gridCell, options.excelCell);
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
              `DatChi_${order}_${chuyen}_${maHang}_${mauMH}_${soLuong}_${generalsa.getDateTime()}.xlsx`
            );
          });
        });
    },
  });
};

const searchBoxOrder = () => {
  const selectBoxData = DevExpress.data.AspNet.createStore({
    key: "ORDERNO",
    loadMode: "raw",
    loadUrl: "wacoal_DONHANGHEAD_Load_Web_V1",
  });

  var searchBox = $("#searchBoxOrder")
    .dxSelectBox({
      dataSource: selectBoxData,
      displayExpr: "ORDERNO",
      valueExpr: "ORDERNO",
      searchEnabled: true,
      searchExpr: "ORDERNO",
      searchMode: "contains",
      searchTimeout: 200,
      minSearchLength: 0,
      showDataBeforeSearch: false,
      showClearButton: true,
      placeholder: "Order...",
      onValueChanged: function (data) {
        if (data.value !== null) {
          order = data.value;
        } else {
          console.log("Not selected");
        }
      },
    })
    .dxSelectBox("instance");
};

$(() => {
  searchBoxMaHang();
  // let maHang= $("#searchBoxMH").dxSelectBox('instance').option('value')
  searchBoxMau();
  searchBoxLine();
  // btnExportMultiExcel();
  searchBoxOrder();

  $("#txtSL").dxNumberBox({
    value: null,
    placeholder: "Nhập Số Lượng",
    // showSpinButtons: true,
    showClearButton: true,
  });

  $("#btn-datChi").dxButton({
    stylingMode: "contained",
    text: "Đặt Chỉ",
    type: "default",
    width: 120,
    onClick() {
      DatChiLoad();
    },
  });
});
