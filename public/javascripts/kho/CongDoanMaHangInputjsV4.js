var MaHang = "";
const datChiCaptionTotal = "Total";
const datChiCaptionCT = "Details";
const _mauChiMauNLTotal = "MauNL_LoaiChi_New";
const _mauChiMauNlCT = "Details";
const topRowCell = 10;

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
      onValueChanged: function (data) {
        if (data.value != null) {
          MaHang = data.value;
          tabPanelLoad(MaHang);
          exportdButton();
        }
      },
    })
    .dxSelectBox("instance");
};

const GridviewMauNLLoaiChiNewLoad = () => {
  var url = "wacoal_MauNL_LoaiChi_Moi_Load_Web_V1/";
  var listTinhChi = DevExpress.data.AspNet.createStore({
    key: "keyMauNL_LoaiChi",
    loadUrl: url,
    onBeforeSend: function (method, ajaxOptions) {
      ajaxOptions.xhrFields = {
        withCredentials: true,
      };
    },
  });

  $("#GridMauNL_LoaiChi")
    .dxDataGrid({
      dataSource: listTinhChi,
      columnsAutoWidth: true,
      height: 555,
      allowColumnReordering: true,
      rowAlternationEnabled: true,
      showColumnLines: true,
      showRowLines: true,
      showBorders: true,
      export: {
        enabled: true,
      },
      onExporting: function (e) {
        var workbook = new ExcelJS.Workbook();
        var worksheet = workbook.addWorksheet("MauNL_LoaiChi_New");

        DevExpress.excelExporter
          .exportDataGrid({
            component: e.component,
            worksheet: worksheet,
          })
          .then(function () {
            workbook.xlsx.writeBuffer().then(function (buffer) {
              saveAs(
                new Blob([buffer], { type: "application/octet-stream" }),
                "MauNL_LoaiChi_New.xlsx"
              );
            });
          });
        e.cancel = true;
      },
      focusedRowEnabled: true,
      scrolling: {
        mode: "virtual",
      },
      columns: [
        {
          caption: "MAUNL",
          alignment: "center",
          dataField: "MAUNL",
        },
        {
          caption: "LOAICHI",
          alignment: "center",
          dataField: "LOAICHI",
        },
        {
          caption: "MAUCHI",
          alignment: "center",
          dataField: "MAUCHI",
        },
      ],
    })
    .dxDataGrid("instance");
};

const GridMHCDNewLoad = () => {
  var url = "CONGDOAN_MAHANG_New_Web_Load_V1";
  var listTinhChi = DevExpress.data.AspNet.createStore({
    key: "KeyMHM",
    loadUrl: url,
    onBeforeSend: function (method, ajaxOptions) {
      ajaxOptions.xhrFields = {
        withCredentials: true,
      };
    },
  });

  $("#GridMHCDNew")
    .dxDataGrid({
      dataSource: listTinhChi,
      // phan trang
      paging: {
        pageSize: 5,
      },
      pager: {
        showPageSizeSelector: true,
        allowedPageSizes: [10, 25, 50, 100],
      },
      // reshapeOnPush: true,
      columnsAutoWidth: true,
      height: 555,
      allowColumnReordering: true,
      rowAlternationEnabled: true,
      showColumnLines: true,
      showRowLines: true,
      showBorders: true,
      columnAutoWidth: true,
      export: {
        enabled: true,
      },
      focusedRowEnabled: true,
      // searchPanel: {
      //     visible: true,
      //     highlightCaseSensitive: true,
      //     // width: 240,
      //     // placeholder: "Search..."
      // },

      onExporting: function (e) {
        var workbook = new ExcelJS.Workbook();
        var worksheet = workbook.addWorksheet("MH_CD_New");

        DevExpress.excelExporter
          .exportDataGrid({
            component: e.component,
            worksheet: worksheet,
          })
          .then(function () {
            workbook.xlsx.writeBuffer().then(function (buffer) {
              saveAs(
                new Blob([buffer], { type: "application/octet-stream" }),
                "MH_CD_New.xlsx"
              );
            });
          });
        e.cancel = true;
      },
      remoteOperations: true,
      columns: [
        {
          caption: "MAHANG",
          alignment: "center",
          dataField: "Style",
        },
        {
          caption: "MAUMH",
          alignment: "center",
          dataField: "Color",
        },
      ],
    })
    .dxDataGrid("instance");
};
const loadPanel = $(".loadpanel")
  .dxLoadPanel({
    shadingColor: "rgba(0,0,0,0.4)",
    position: { of: "#GridTinhChi" },
    visible: false,
    showIndicator: true,
    showPane: true,
    shading: false, //to den full man hinh
    closeOnOutsideClick: false,
    onShown() {
      //   setTimeout(() => {
      //     loadPanel.hide();
      //   }, 3000);
    },
    onHidden() {
      // GridviewMauNLLoaiChiNewLoad();
      GridMHCDNewLoad();
    },
  })
  .dxLoadPanel("instance");

const upload = () => {
  loadPanel.show();
  let formData = new FormData(document.getElementById("frmUpload"));
  let fileName = $("#filename").val();
  let fileType = fileName.split(".").pop();

  if (fileType != "xlsx" && fileType != "xls") {
    DevExpress.ui.notify(
      {
        message: "Chỉ nhận excel file",
        width: 450,
      },
      "warning",
      5000
    );
    $("#filename").val("");
    return;
  }

  if (fileName === "") {
    DevExpress.ui.notify(
      {
        message: "Chọn file trước khi nhập",
        width: 450,
      },
      "warning",
      5000
    );
  } else {
    $.ajax({
      type: "POST",
      data: formData,
      contentType: false,
      url: "/kho/congodanmahanginputv2",
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
            10000
          );
        }
      },
    });
  }
};

const loadTooltip = (id, targetButton) => {
  $(`#${id}`).dxTooltip({
    target: `#${targetButton}`,
    showEvent: "mouseenter",
    hideEvent: "mouseleave",
    closeOnOutsideClick: false,
  });
};

const tabPanelLoad = (MaHang) => {
  var urlDatChiCT = `CONGDOAN_MAHANG_Load_By_MaHang_Web_Wacoal_V1/${MaHang}`;

  var listDataDatChiCT = DevExpress.data.AspNet.createStore({
    key: "ID",
    loadUrl: urlDatChiCT,
    onBeforeSend: function (method, ajaxOptions) {
      ajaxOptions.xhrFields = {
        withCredentials: true,
      };
    },
  });

  var urlDatChiTotal = "wacoal_TinhChi_MaHang_V3/" + MaHang;

  var listDataTinhChiChiTotal = DevExpress.data.AspNet.createStore({
    key: "keyMAHANG",
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
          return $("<div id='GridDatChiMHTotal'>").dxDataGrid({
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
                  column: "SL_K80",
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
          return $("<div id='GridDatChiMHCT'>").dxDataGrid({
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
                caption: "CONGDOAN",
                alignment: "left",
                dataField: "CONGDOAN",
              },
              {
                caption: "TENCONGDOAN",
                alignment: "left",
                dataField: "TENCONGDOAN",
              },
              {
                caption: "KYHIEUMAY",
                alignment: "left",
                dataField: "KYHIEUMAY",
              },
              {
                caption: "LOAIMAY",
                alignment: "left",
                dataField: "LOAIMAY",
              },
              {
                caption: "MAVITRICHI",
                alignment: "left",
                dataField: "MAVITRICHI",
              },
              {
                caption: "LOAICHI",
                alignment: "left",
                dataField: "LOAICHI",
              },
              {
                caption: "BIENDO",
                alignment: "right",
                dataField: "BIENDO",
              },
              {
                caption: "MATDO",
                alignment: "right",
                dataField: "MATDO",
              },
              {
                caption: "MAUNL",
                alignment: "left",
                dataField: "MAUNL",
              },
              {
                caption: "MAMAUCHI",
                alignment: "left",
                dataField: "MAMAUCHI",
              },
              {
                caption: "CHIEUDAI_CONGDOAN",
                alignment: "left",
                dataField: "CHIEUDAI_CONGDOAN",
              },
              {
                caption: "HESOALPHA",
                alignment: "right",
                dataField: "HESOALPHA",
              },
              {
                caption: "HESOBETA",
                alignment: "right",
                dataField: "HESOBETA",
              },
              {
                caption: "CONTHUCTINHCHI",
                alignment: "left",
                dataField: "CONTHUCTINHCHI",
              },
              {
                caption: "MET_PSC",
                alignment: "right",
                dataField: "MET_PSC",
              },
              {
                caption: "TIMECREATE",
                alignment: "right",
                dataField: "TIMECREATE",
              },
              {
                caption: "USERCREATE",
                alignment: "left",
                dataField: "USERCREATE",
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

const tabPanelMauNlLoaiChiLoad = () => {
  var urlMauChiMauNlCT = `wacoal_MauNL_LoaiChi_Moi_MH_Load_Web_V1`;

  var listDataMauChiMauCT = DevExpress.data.AspNet.createStore({
    key: "ID",
    loadUrl: urlMauChiMauNlCT,
    onBeforeSend: function (method, ajaxOptions) {
      ajaxOptions.xhrFields = {
        withCredentials: true,
      };
    },
  });

  var urlMauChiMauNlTotal = "wacoal_MauNL_LoaiChi_Moi_Load_Web_V1";

  var listDataMauChiMauNlTotal = DevExpress.data.AspNet.createStore({
    key: "keyMauNL_LoaiChi",
    loadUrl: urlMauChiMauNlTotal,
    onBeforeSend: function (method, ajaxOptions) {
      ajaxOptions.xhrFields = {
        withCredentials: true,
      };
    },
  });

  $("#tabPanelMauNlLoaiChi").dxTabPanel({
    dataSource: [
      {
        title: _mauChiMauNLTotal,
        template() {
          return $("<div id='GridMauNlLoaiChiTotal'>").dxDataGrid({
            width: "100%",
            columns: [
              {
                caption: "MAUNL",
                alignment: "left",
                dataField: "MAUNL",
              },
              {
                caption: "LOAICHI",
                alignment: "left",
                dataField: "LOAICHI",
              },
              {
                caption: "MAUCHI",
                alignment: "left",
                dataField: "MAUCHI",
              },
            ],

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

            dataSource: listDataMauChiMauNlTotal,
          });
        },
      },
      {
        title: _mauChiMauNlCT,
        template() {
          return $("<div id='GridMauNlLoaiChiCT'>").dxDataGrid({
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
                caption: "CONGDOAN",
                alignment: "left",
                dataField: "CONGDOAN",
              },
              {
                caption: "TENCONGDOAN",
                alignment: "left",
                dataField: "TENCONGDOAN",
              },
              // {
              //   caption: "KYHIEUMAY",
              //   alignment: "left",
              //   dataField: "KYHIEUMAY",
              // },
              // {
              //   caption: "LOAIMAY",
              //   alignment: "left",
              //   dataField: "LOAIMAY",
              // },
              // {
              //   caption: "MAVITRICHI",
              //   alignment: "left",
              //   dataField: "MAVITRICHI",
              // },
              {
                caption: "LOAICHI",
                alignment: "left",
                dataField: "LOAICHI",
              },
              // {
              //   caption: "BIENDO",
              //   alignment: "right",
              //   dataField: "BIENDO",
              // },
              // {
              //   caption: "MATDO",
              //   alignment: "right",
              //   dataField: "MATDO",
              // },
              {
                caption: "MAUNL",
                alignment: "left",
                dataField: "MAUNL",
              },
              {
                caption: "MAMAUCHI",
                alignment: "left",
                dataField: "MAMAUCHI",
              },
              // {
              //   caption: "CHIEUDAI_CONGDOAN",
              //   alignment: "left",
              //   dataField: "CHIEUDAI_CONGDOAN",
              // },
              // {
              //   caption: "HESOALPHA",
              //   alignment: "right",
              //   dataField: "HESOALPHA",
              // },
              // {
              //   caption: "HESOBETA",
              //   alignment: "right",
              //   dataField: "HESOBETA",
              // },
              // {
              //   caption: "CONTHUCTINHCHI",
              //   alignment: "left",
              //   dataField: "CONTHUCTINHCHI",
              // },
              // {
              //   caption: "MET_PSC",
              //   alignment: "right",
              //   dataField: "MET_PSC",
              // },
              {
                caption: "TIMECREATE",
                alignment: "right",
                dataField: "TIMECREATE",
              },
              {
                caption: "USERCREATE",
                alignment: "left",
                dataField: "USERCREATE",
              },
            ],

            showBorders: true,
            rowAlternationEnabled: true,
            dataSource: listDataMauChiMauCT,
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

const MauChiMauNlXuatExcel = () => {
  const generalsa = new generals();

  const dataGridTotal = $("#GridMauNlLoaiChiTotal").dxDataGrid("instance");
  const dataGridCT = $("#GridMauNlLoaiChiCT").dxDataGrid("instance");

  const workbook = new ExcelJS.Workbook();
  const TotalSheet = workbook.addWorksheet(_mauChiMauNLTotal);
  const CTSheet = workbook.addWorksheet(_mauChiMauNlCT);

  // TotalSheet.getRow(1).getCell(1).value = " Tổng Lượng Chỉ theo Mã Hàng";
  // TotalSheet.getRow(1).getCell(1).font = {
  //   bold: true,
  //   size: 16,
  //   underline: "double",
  // };

  // TotalSheet.getRow(8).getCell(1).value = "Thời Gian";
  // TotalSheet.getRow(8).getCell(2).value = generalsa.getDateTime();

  // generalsa.formatHeaderRowExcel(TotalSheet);

  // CTSheet.getRow(1).getCell(1).value = " Chi Tiết Lượng Chỉ theo Mã Hàng";
  // CTSheet.getRow(1).getCell(1).font = {
  //   bold: true,
  //   size: 16,
  //   underline: "double",
  // };

  // CTSheet.getRow(8).getCell(1).value = "Thời Gian";
  // CTSheet.getRow(8).getCell(2).value = generalsa.getDateTime();
  // generalsa.formatHeaderRowExcel(CTSheet);

  DevExpress.excelExporter
    .exportDataGrid({
      worksheet: TotalSheet,
      component: dataGridTotal,
      topLeftCell: { row: 1, column: 1 },
      // customizeCell(options) {
      //   var gridCell = options.gridCell;
      //   var excelCell = options.excelCell;

      //   if (gridCell.rowType === "data") {
      //     if (gridCell.column.dataField.includes("COLOR")) {
      //       excelCell.alignment = { horizontal: "left" };
      //     }
      //     if (gridCell.column.dataField.includes("SL")) {
      //       excelCell.value = Number(gridCell.value);
      //       excelCell.numFmt = "0.000";
      //       excelCell.alignment = { horizontal: "right" };
      //     }
      //   }

      //   if (gridCell.rowType === "totalFooter") {
      //     excelCell.alignment = { horizontal: "right" };
      //   }
      //   generalsa.setHeaderRowsBackgroundExcel(gridCell, excelCell);
      // },
    })
    .then(() =>
      DevExpress.excelExporter.exportDataGrid({
        worksheet: CTSheet,
        component: dataGridCT,
        topLeftCell: { row: 1, column: 1 },
        customizeCell(options) {
          var excelCell = options;
          excelCell.font = { name: "EUDC", size: 12 };
          excelCell.alignment = { horizontal: "left" };
          generalsa.setAlternatingRowsBackgroundExcel(
            excelCell.gridCell,
            excelCell.excelCell
          );
          // generalsa.formatHeaderRowExcel(CTSheet)
          generalsa.setHeaderRowsBackgroundExcel(
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
          `MauNL_LoaiChi_New.xlsx`
        );
      });
    });
};

const tabPanelLoaiMayNewLoad = () => {
  // var urlMauChiMauNlCT = `LOAIMAY_New_load_Wacoal_Web_V1`;

  // var listDataMauChiMauCT = DevExpress.data.AspNet.createStore({
  //   key: "ID",
  //   loadUrl: urlMauChiMauNlCT,
  //   onBeforeSend: function (method, ajaxOptions) {
  //     ajaxOptions.xhrFields = {
  //       withCredentials: true,
  //     };
  //   },
  // });

  var urlMauChiMauNlTotal = "LOAIMAY_New_load_Wacoal_Web_V1";

  var listDataLoaiMayNewTotal = DevExpress.data.AspNet.createStore({
    key: "keyLoaiMayNew",
    loadUrl: urlMauChiMauNlTotal,
    onBeforeSend: function (method, ajaxOptions) {
      ajaxOptions.xhrFields = {
        withCredentials: true,
      };
    },
  });

  $("#tabPanelLoaiMayNew").dxTabPanel({
    dataSource: [
      {
        title: "Loại Máy mới",
        template() {
          return $("<div id='GridLoaiMayNewTotal'>").dxDataGrid({
            width: "100%",
            columns: [
              {
                caption: "MAHANG",
                alignment: "left",
                dataField: "MAHANG",
              },
              {
                caption: "MAUMH",
                alignment: "left",
                dataField: "MAUMH",
              },
              {
                caption: "CONGDOAN",
                alignment: "left",
                dataField: "CONGDOAN",
              },
              {
                caption: "TENCONGDOAN",
                alignment: "left",
                dataField: "TENCONGDOAN",
              },
              {
                caption: "KYHIEUMAY",
                alignment: "left",
                dataField: "KYHIEUMAY",
              },
              {
                caption: "LOAIMAY",
                alignment: "left",
                dataField: "LOAIMAY",
              },
            ],

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

            dataSource: listDataLoaiMayNewTotal,
          });
        },
      },
      // {
      //   title: _mauChiMauNlCT,
      //   template() {
      //     return $("<div id='GridMauNlLoaiChiCT'>").dxDataGrid({
      //       width: "100%",
      //       columns: [
      //         {
      //           caption: "MÃ HÀNG",
      //           alignment: "left",
      //           dataField: "MAHANG",
      //         },
      //         {
      //           caption: "MÀU MH",
      //           alignment: "left",
      //           dataField: "MAUMH",
      //         },
      //         {
      //           caption: "CONGDOAN",
      //           alignment: "left",
      //           dataField: "CONGDOAN",
      //         },
      //         {
      //           caption: "TENCONGDOAN",
      //           alignment: "left",
      //           dataField: "TENCONGDOAN",
      //         },
      //         // {
      //         //   caption: "KYHIEUMAY",
      //         //   alignment: "left",
      //         //   dataField: "KYHIEUMAY",
      //         // },
      //         // {
      //         //   caption: "LOAIMAY",
      //         //   alignment: "left",
      //         //   dataField: "LOAIMAY",
      //         // },
      //         // {
      //         //   caption: "MAVITRICHI",
      //         //   alignment: "left",
      //         //   dataField: "MAVITRICHI",
      //         // },
      //         {
      //           caption: "LOAICHI",
      //           alignment: "left",
      //           dataField: "LOAICHI",
      //         },
      //         // {
      //         //   caption: "BIENDO",
      //         //   alignment: "right",
      //         //   dataField: "BIENDO",
      //         // },
      //         // {
      //         //   caption: "MATDO",
      //         //   alignment: "right",
      //         //   dataField: "MATDO",
      //         // },
      //         {
      //           caption: "MAUNL",
      //           alignment: "left",
      //           dataField: "MAUNL",
      //         },
      //         {
      //           caption: "MAMAUCHI",
      //           alignment: "left",
      //           dataField: "MAMAUCHI",
      //         },
      //         // {
      //         //   caption: "CHIEUDAI_CONGDOAN",
      //         //   alignment: "left",
      //         //   dataField: "CHIEUDAI_CONGDOAN",
      //         // },
      //         // {
      //         //   caption: "HESOALPHA",
      //         //   alignment: "right",
      //         //   dataField: "HESOALPHA",
      //         // },
      //         // {
      //         //   caption: "HESOBETA",
      //         //   alignment: "right",
      //         //   dataField: "HESOBETA",
      //         // },
      //         // {
      //         //   caption: "CONTHUCTINHCHI",
      //         //   alignment: "left",
      //         //   dataField: "CONTHUCTINHCHI",
      //         // },
      //         // {
      //         //   caption: "MET_PSC",
      //         //   alignment: "right",
      //         //   dataField: "MET_PSC",
      //         // },
      //         {
      //           caption: "TIMECREATE",
      //           alignment: "right",
      //           dataField: "TIMECREATE",
      //         },
      //         {
      //           caption: "USERCREATE",
      //           alignment: "left",
      //           dataField: "USERCREATE",
      //         },
      //       ],

      //       showBorders: true,
      //       rowAlternationEnabled: true,
      //       dataSource: listDataMauChiMauCT,
      //       columnsAutoWidth: true,
      //       height: 450,
      //       allowColumnReordering: true,
      //       rowAlternationEnabled: true,
      //       showColumnLines: true,
      //       showRowLines: true,
      //       showBorders: true,
      //       focusedRowEnabled: true,
      //       wordWrapEnabled: true,
      //       scrolling: {
      //         mode: "virtual",
      //       },
      //     });
      //   },
      // },
    ],
    itemTitleTemplate(itemData, itemIndex, itemElement) {
      itemElement.append(`<span class='dx-tab-text'>${itemData.title}</span>`);
    },
    deferRendering: false,
  });
};

const LoaiMayNewXuatExcel = () => {
  const generalsa = new generals();

  const dataGridTotal = $("#GridLoaiMayNewTotal").dxDataGrid("instance");
  // const dataGridCT = $("#GridMauNlLoaiChiCT").dxDataGrid("instance");

  const workbook = new ExcelJS.Workbook();
  const TotalSheet = workbook.addWorksheet("LoaiMayNew");
  // const CTSheet = workbook.addWorksheet(_mauChiMauNlCT);

  // TotalSheet.getRow(1).getCell(1).value = " Tổng Lượng Chỉ theo Mã Hàng";
  // TotalSheet.getRow(1).getCell(1).font = {
  //   bold: true,
  //   size: 16,
  //   underline: "double",
  // };

  // TotalSheet.getRow(8).getCell(1).value = "Thời Gian";
  // TotalSheet.getRow(8).getCell(2).value = generalsa.getDateTime();

  // generalsa.formatHeaderRowExcel(TotalSheet);

  // CTSheet.getRow(1).getCell(1).value = " Chi Tiết Lượng Chỉ theo Mã Hàng";
  // CTSheet.getRow(1).getCell(1).font = {
  //   bold: true,
  //   size: 16,
  //   underline: "double",
  // };

  // CTSheet.getRow(8).getCell(1).value = "Thời Gian";
  // CTSheet.getRow(8).getCell(2).value = generalsa.getDateTime();
  // generalsa.formatHeaderRowExcel(CTSheet);

  DevExpress.excelExporter
    .exportDataGrid({
      worksheet: TotalSheet,
      component: dataGridTotal,
      topLeftCell: { row: 1, column: 1 },
    
      customizeCell(options) {
        var gridCell = options.gridCell;
        var excelCell = options.excelCell;

        generalsa.setHeaderRowsBackgroundExcel(gridCell,excelCell);
      //   if (gridCell.rowType === "data") {
      //     if (gridCell.column.dataField.includes("COLOR")) {
      //       excelCell.alignment = { horizontal: "left" };
      //     }
      //     if (gridCell.column.dataField.includes("SL")) {
      //       excelCell.value = Number(gridCell.value);
      //       excelCell.numFmt = "0.000";
      //       excelCell.alignment = { horizontal: "right" };
      //     }
      //   }

      //   if (gridCell.rowType === "totalFooter") {
      //     excelCell.alignment = { horizontal: "right" };
      //   }
      //   generalsa.setHeaderRowsBackgroundExcel(gridCell, excelCell);
      },
    })
    // .then(() =>
    //   DevExpress.excelExporter.exportDataGrid({
    //     worksheet: CTSheet,
    //     component: dataGridCT,
    //     topLeftCell: { row: 1, column: 1 },
    //     customizeCell(options) {
    //       var excelCell = options;
    //       excelCell.font = { name: "EUDC", size: 12 };
    //       excelCell.alignment = { horizontal: "left" };
    //       generalsa.setAlternatingRowsBackgroundExcel(
    //         excelCell.gridCell,
    //         excelCell.excelCell
    //       );
       
    //       generalsa.setHeaderRowsBackgroundExcel(
    //         excelCell.gridCell,
    //         excelCell.excelCell
    //       );
    //     },
    //   })
    // )
    .then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          `LoaiMayNew.xlsx`
        );
      });
    });
};

const tabPanelLoaiChiNewLoad = () => {
  // var urlMauChiMauNlCT = `LoaiChi_New_load_Wacoal_Web_V1`;

  // var listDataMauChiMauCT = DevExpress.data.AspNet.createStore({
  //   key: "ID",
  //   loadUrl: urlMauChiMauNlCT,
  //   onBeforeSend: function (method, ajaxOptions) {
  //     ajaxOptions.xhrFields = {
  //       withCredentials: true,
  //     };
  //   },
  // });

  var urlMauChiMauNlTotal = "LoaiChi_New_load_Wacoal_Web_V1";

  var listDataLoaiChiNewTotal = DevExpress.data.AspNet.createStore({
    key: "ID",
    loadUrl: urlMauChiMauNlTotal,
    onBeforeSend: function (method, ajaxOptions) {
      ajaxOptions.xhrFields = {
        withCredentials: true,
      };
    },
  });

  $("#tabPanelLoaiChiNew").dxTabPanel({
    dataSource: [
      {
        title: "",
        template() {
          return $("<div id='GridLoaiChiNewTotal'>").dxDataGrid({
            width: "100%",
            columns: [
              {
                caption: "MAHANG",
                alignment: "left",
                dataField: "MAHANG",
              },
              {
                caption: "MAUMH",
                alignment: "left",
                dataField: "MAUMH",
              },
              {
                caption: "CONGDOAN",
                alignment: "left",
                dataField: "CONGDOAN",
              },
              {
                caption: "TENCONGDOAN",
                alignment: "left",
                dataField: "TENCONGDOAN",
              },
              {
                caption: "LOAICHI",
                alignment: "left",
                dataField: "LOAICHI",
              },
            ],

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

            dataSource: listDataLoaiChiNewTotal,
          });
        },
      },
      // {
      //   title: _mauChiMauNlCT,
      //   template() {
      //     return $("<div id='GridMauNlLoaiChiCT'>").dxDataGrid({
      //       width: "100%",
      //       columns: [
      //         {
      //           caption: "MÃ HÀNG",
      //           alignment: "left",
      //           dataField: "MAHANG",
      //         },
      //         {
      //           caption: "MÀU MH",
      //           alignment: "left",
      //           dataField: "MAUMH",
      //         },
      //         {
      //           caption: "CONGDOAN",
      //           alignment: "left",
      //           dataField: "CONGDOAN",
      //         },
      //         {
      //           caption: "TENCONGDOAN",
      //           alignment: "left",
      //           dataField: "TENCONGDOAN",
      //         },
      //         // {
      //         //   caption: "KYHIEUMAY",
      //         //   alignment: "left",
      //         //   dataField: "KYHIEUMAY",
      //         // },
      //         // {
      //         //   caption: "LOAIMAY",
      //         //   alignment: "left",
      //         //   dataField: "LOAIMAY",
      //         // },
      //         // {
      //         //   caption: "MAVITRICHI",
      //         //   alignment: "left",
      //         //   dataField: "MAVITRICHI",
      //         // },
      //         {
      //           caption: "LOAICHI",
      //           alignment: "left",
      //           dataField: "LOAICHI",
      //         },
      //         // {
      //         //   caption: "BIENDO",
      //         //   alignment: "right",
      //         //   dataField: "BIENDO",
      //         // },
      //         // {
      //         //   caption: "MATDO",
      //         //   alignment: "right",
      //         //   dataField: "MATDO",
      //         // },
      //         {
      //           caption: "MAUNL",
      //           alignment: "left",
      //           dataField: "MAUNL",
      //         },
      //         {
      //           caption: "MAMAUCHI",
      //           alignment: "left",
      //           dataField: "MAMAUCHI",
      //         },
      //         // {
      //         //   caption: "CHIEUDAI_CONGDOAN",
      //         //   alignment: "left",
      //         //   dataField: "CHIEUDAI_CONGDOAN",
      //         // },
      //         // {
      //         //   caption: "HESOALPHA",
      //         //   alignment: "right",
      //         //   dataField: "HESOALPHA",
      //         // },
      //         // {
      //         //   caption: "HESOBETA",
      //         //   alignment: "right",
      //         //   dataField: "HESOBETA",
      //         // },
      //         // {
      //         //   caption: "CONTHUCTINHCHI",
      //         //   alignment: "left",
      //         //   dataField: "CONTHUCTINHCHI",
      //         // },
      //         // {
      //         //   caption: "MET_PSC",
      //         //   alignment: "right",
      //         //   dataField: "MET_PSC",
      //         // },
      //         {
      //           caption: "TIMECREATE",
      //           alignment: "right",
      //           dataField: "TIMECREATE",
      //         },
      //         {
      //           caption: "USERCREATE",
      //           alignment: "left",
      //           dataField: "USERCREATE",
      //         },
      //       ],

      //       showBorders: true,
      //       rowAlternationEnabled: true,
      //       dataSource: listDataMauChiMauCT,
      //       columnsAutoWidth: true,
      //       height: 450,
      //       allowColumnReordering: true,
      //       rowAlternationEnabled: true,
      //       showColumnLines: true,
      //       showRowLines: true,
      //       showBorders: true,
      //       focusedRowEnabled: true,
      //       wordWrapEnabled: true,
      //       scrolling: {
      //         mode: "virtual",
      //       },
      //     });
      //   },
      // },
    ],
    itemTitleTemplate(itemData, itemIndex, itemElement) {
      itemElement.append(`<span class='dx-tab-text'>${itemData.title}</span>`);
    },
    deferRendering: false,
  });
};

const LoaiChiNewXuatExcel = () => {
  const generalsa = new generals();

  const dataGridTotal = $("#GridLoaiChiNewTotal").dxDataGrid("instance");
  // const dataGridCT = $("#GridMauNlLoaiChiCT").dxDataGrid("instance");

  const workbook = new ExcelJS.Workbook();
  const TotalSheet = workbook.addWorksheet("LoaiChiNew");
  // const CTSheet = workbook.addWorksheet(_mauChiMauNlCT);

  // TotalSheet.getRow(1).getCell(1).value = " Tổng Lượng Chỉ theo Mã Hàng";
  // TotalSheet.getRow(1).getCell(1).font = {
  //   bold: true,
  //   size: 16,
  //   underline: "double",
  // };

  // TotalSheet.getRow(8).getCell(1).value = "Thời Gian";
  // TotalSheet.getRow(8).getCell(2).value = generalsa.getDateTime();

  // generalsa.formatHeaderRowExcel(TotalSheet);

  // CTSheet.getRow(1).getCell(1).value = " Chi Tiết Lượng Chỉ theo Mã Hàng";
  // CTSheet.getRow(1).getCell(1).font = {
  //   bold: true,
  //   size: 16,
  //   underline: "double",
  // };

  // CTSheet.getRow(8).getCell(1).value = "Thời Gian";
  // CTSheet.getRow(8).getCell(2).value = generalsa.getDateTime();
  // generalsa.formatHeaderRowExcel(CTSheet);

  DevExpress.excelExporter
    .exportDataGrid({
      worksheet: TotalSheet,
      component: dataGridTotal,
      topLeftCell: { row: 1, column: 1 },
    
      customizeCell(options) {
        var gridCell = options.gridCell;
        var excelCell = options.excelCell;

        generalsa.setHeaderRowsBackgroundExcel(gridCell,excelCell);
      //   if (gridCell.rowType === "data") {
      //     if (gridCell.column.dataField.includes("COLOR")) {
      //       excelCell.alignment = { horizontal: "left" };
      //     }
      //     if (gridCell.column.dataField.includes("SL")) {
      //       excelCell.value = Number(gridCell.value);
      //       excelCell.numFmt = "0.000";
      //       excelCell.alignment = { horizontal: "right" };
      //     }
      //   }

      //   if (gridCell.rowType === "totalFooter") {
      //     excelCell.alignment = { horizontal: "right" };
      //   }
      //   generalsa.setHeaderRowsBackgroundExcel(gridCell, excelCell);
      },
    })
    // .then(() =>
    //   DevExpress.excelExporter.exportDataGrid({
    //     worksheet: CTSheet,
    //     component: dataGridCT,
    //     topLeftCell: { row: 1, column: 1 },
    //     customizeCell(options) {
    //       var excelCell = options;
    //       excelCell.font = { name: "EUDC", size: 12 };
    //       excelCell.alignment = { horizontal: "left" };
    //       generalsa.setAlternatingRowsBackgroundExcel(
    //         excelCell.gridCell,
    //         excelCell.excelCell
    //       );
       
    //       generalsa.setHeaderRowsBackgroundExcel(
    //         excelCell.gridCell,
    //         excelCell.excelCell
    //       );
    //     },
    //   })
    // )
    .then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          `LoaiChiNew.xlsx`
        );
      });
    });
};




const MaHangXuatExcel = () => {
  const generalsa = new generals();

  const dataGridDatChiTotal = $("#GridDatChiMHTotal").dxDataGrid("instance");
  const dataGridDatChiCT = $("#GridDatChiMHCT").dxDataGrid("instance");

  const workbook = new ExcelJS.Workbook();
  const TotalSheet = workbook.addWorksheet(datChiCaptionTotal);
  const CTSheet = workbook.addWorksheet(datChiCaptionCT);

  TotalSheet.getRow(1).getCell(1).value = " Tổng Lượng Chỉ theo Mã Hàng";
  TotalSheet.getRow(1).getCell(1).font = {
    bold: true,
    size: 16,
    underline: "double",
  };

  TotalSheet.getRow(8).getCell(1).value = "Thời Gian";
  TotalSheet.getRow(8).getCell(2).value = generalsa.getDateTime();

  generalsa.formatHeaderRowExcel(TotalSheet);

  CTSheet.getRow(1).getCell(1).value = " Chi Tiết Lượng Chỉ theo Mã Hàng";
  CTSheet.getRow(1).getCell(1).font = {
    bold: true,
    size: 16,
    underline: "double",
  };

  CTSheet.getRow(8).getCell(1).value = "Thời Gian";
  CTSheet.getRow(8).getCell(2).value = generalsa.getDateTime();
  generalsa.formatHeaderRowExcel(CTSheet);

  DevExpress.excelExporter
    .exportDataGrid({
      worksheet: TotalSheet,
      component: dataGridDatChiTotal,
      topLeftCell: { row: topRowCell, column: 1 },
      customizeCell(options) {
        var gridCell = options.gridCell;
        var excelCell = options.excelCell;

        if (gridCell.rowType === "data") {
          if (gridCell.column.dataField.includes("COLOR")) {
            excelCell.alignment = { horizontal: "left" };
          }
          if (gridCell.column.dataField.includes("SL")) {
            excelCell.value = Number(gridCell.value);
            excelCell.numFmt = "0.000";
            excelCell.alignment = { horizontal: "right" };
          }
        }

        if (gridCell.rowType === "totalFooter") {
          excelCell.alignment = { horizontal: "right" };
        }
        generalsa.setHeaderRowsBackgroundExcel(gridCell, excelCell);
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
          `${MaHang}_${generalsa.getDateTime()}.xlsx`
        );
      });
    });
};
const exportdButton = () => {
  $("#exportdButton").dxButton({
    text: "",
    icon: "xlsxfile",
    onClick() {
      MaHangXuatExcel();
    },
  });
};

const exportMauChiMauNlButton = () => {
  $("#exportMauChiMauNlButton").dxButton({
    text: "",
    icon: "xlsxfile",
    onClick() {
      MauChiMauNlXuatExcel();
    },
  });
};

const exportLoaiMay = () => {
  $("#exportLoaiMay").dxButton({
    text: "",
    icon: "xlsxfile",
    onClick() {
      LoaiMayNewXuatExcel();
    },
  });
};

const exportLoaiChi = () => {
  $("#exportLoaiChi").dxButton({
    text: "",
    icon: "xlsxfile",
    onClick() {
      LoaiChiNewXuatExcel();
    },
  });
};

const boxOption = () => {
  $("#boxOptions2").dxBox({
    direction: "row",
    width: "100%",
    height: 50,
    align: "left",
    crossAlign: "center",
  });

  $("#boxOptions3").dxBox({
    direction: "row",
    width: "100%",
    height: 50,
    align: "left",
    crossAlign: "center",
  });
  $("#boxOptionsLoaiMay").dxBox({
    direction: "row",
    width: "100%",
    height: 50,
    align: "left",
    crossAlign: "center",
  });

  $("#boxOptionsLoaiChi").dxBox({
    direction: "row",
    width: "100%",
    height: 50,
    align: "left",
    crossAlign: "center",
  });
};
const uploadButton = () => {
  $("#uploadButton").dxButton({
    text: "",
    icon: "upload",
    onClick() {
      upload();
    },
  });
};

// const loadTab=()=>{
//   $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
//     switch (e.currentTarget.id) {
//       case "home-tab":
//         //mahang
//         searchBoxMaHang();
//         uploadButton();
//         break;
//       case "profile-tab":
//         tabPanelMauNlLoaiChiLoad();
//         exportMauChiMauNlButton();
//         break;
//       case "contact-tab":
//         GridMHCDNewLoad();
//         break;
//       case "loaimay-tab":
//         exportLoaiMay();

//         break;
//       case "loaichi-tab":
//         break;
//     }

   
//   });

// }

$(function () {


  MaHang = "None";
  boxOption();
  // searchBoxMaHang();
  // uploadButton();
  // loadTab()
  //mahang
  searchBoxMaHang();
  uploadButton();

   //mau chi theo mau Nl Loai chi
  tabPanelMauNlLoaiChiLoad()
  exportMauChiMauNlButton()

  // GridviewMauNLLoaiChiNewLoad();
  GridMHCDNewLoad();

  tabPanelLoaiMayNewLoad()
  exportLoaiMay()



  tabPanelLoaiChiNewLoad()
  exportLoaiChi()
  loadTooltip("tooltipUpload", "btnUpload");
 

 
 
});
