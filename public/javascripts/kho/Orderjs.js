let _ID,
_Classification='',
_OrderNo='',
_UnitNo='',
_Style='',
_Cup='',
_Size='',
_Color='',
_OrderQty='',
_Note='',
_MY=''
let strValueTagBoxDraft = `''`;
let arrValueTagBoxDraft = [];
let strValueTagBoxCT = `''`;
let arrValueTagBoxCT = [];
const OrderDraftGridLoad = (MY) => {
  var url = "DONHANGITEM_DRAFT_Load_Web_V2/";
  var listTinhChi = DevExpress.data.AspNet.createStore({
    key: "ID",
    loadUrl: url + MY,
    onBeforeSend: function (method, ajaxOptions) {
      ajaxOptions.xhrFields = {
        withCredentials: true,
      };
    },
  });

  $("#GridOrderDraft")
    .dxDataGrid({
      dataSource: listTinhChi,
      columnsAutoWidth: true,
      height: 650,
      allowColumnReordering: true,
      rowAlternationEnabled: true,
      showColumnLines: true,
      showRowLines: true,
      showBorders: true,
      searchPanel: {
        visible: true,
        // highlightCaseSensitive: true,
      },
      loadPanel:{
        enabled:true
      },
      width: '100%',
      allowColumnResizing: true,
      columnAutoWidth: true,
      columnFixing: { enabled: true },
      // columnChooser: { enabled: true },
       // sorting: { mode: "single" },
      export: {
        enabled: true,
      },
      onExporting(e) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Order");

        DevExpress.excelExporter
          .exportDataGrid({
            component: e.component,
            worksheet,
            autoFilterEnabled: true,
          })
          .then(() => {
            workbook.xlsx.writeBuffer().then((buffer) => {
              saveAs(
                new Blob([buffer], { type: "application/octet-stream" }),
                `Order_Draft_${MY}.xlsx`
              );
            });
          });
        e.cancel = true;
      },
      focusedRowEnabled: true,
      scrolling: {
        mode: "virtual",
      },
      // editing: {
      //   mode: 'row',
      //   allowUpdating: true,
      //   allowDeleting: true,
      //   allowAdding: true,
      // },
      columns: [
        {
          caption: "STT",
          alignment: "left",
          dataField: "STT",
          visible: false,
          // width:100
        },
        {
          caption: "Classification",
          alignment: "left",
          dataField: "Classification",
          fixed: true,
          // allowEditing: false,
          // sortOrder: "asc",
          // width:70
        },
        {
          caption: "OrderNo",
          alignment: "left",
          dataField: "OrderNo",
          // allowEditing: false,
        },
        {
          caption: "UnitNo",
          alignment: "left",
          dataField: "UnitNo",
          // allowEditing: false,
        },
        {
          caption: "Style",
          alignment: "left",
          dataField: "Style",
          // allowEditing: false,
        },
        {
          caption: "Cup",
          alignment: "left",
          dataField: "Cup",
          // allowEditing: false,
        },
        {
          caption: "Size",
          alignment: "left",
          dataField: "Size",
          // allowEditing: false,
        },
        {
          caption: "Color",
          alignment: "left",
          dataField: "Color",
          // allowEditing: false,
        },
        {
          caption: "OrderQty",
          alignment: "right",
          dataField: "OrderQty",
        },
        {
          caption: "Note",
          alignment: "right",
          dataField: "Note",
          // allowEditing: false,
        },
        {
          caption: "MY",
          alignment: "left",
          dataField: "MY",
          // allowEditing: false,
        },
        {
          caption: "TIMECREATE",
          alignment: "left",
          dataField: "TIMECREATE",
          // allowEditing: false,
          // dataType: "date",
        },
        {
          caption: "USERCREATE",
          alignment: "left",
          dataField: "USERCREATE",
          // allowEditing: false,
        },
        {
          caption: "TIMEUPDATE",
          alignment: "left",
          dataField: "TIMEUPDATE",
          // allowEditing: false,
        },
        {
          caption: "USERUPDATE",
          alignment: "left",
          dataField: "USERUPDATE",
          // allowEditing: false,
        },
        {
          caption: "DRAFT",
          alignment: "left",
          // allowEditing: false,
        },
      ],
      onSaved(e) {
        // const rowData= e.row && e.row.data
        alert('Saved');
      },
      onCellPrepared: function(e) {  
        if(e.rowType === 'header') {  
           e.cellElement.css("color", "blue");  
        }  
    } ,
      onToolbarPreparing: function (e) {
        e.toolbarOptions.items.unshift(
          {
            location: "alter",
            template: function () {
              return $("<div/>")
                .addClass("informer")
                .append(
                  `
                         <form action="" method="POST" enctype="multipart/form-data" id="frmUploadOrderDraft">
                         <input type="file" name="filenameDraft" id="filenameDraft" />
                         </from>
                         `
                );
            },
          },
          {
            location: "alter",
            widget: "dxButton",
            options: {
              icon: "upload",
              text: "",
              onInitialized: function (e) {
                e.element.attr("id", "btnUpload");
              },
              onClick: function () {
                uploadDraft();
              },
            },
          },
          //   {
          //     location: "alter",
          //     widget: "dxSelectBox",

          //     options: {
          //       dataSource: DevExpress.data.AspNet.createStore({
          //         key: "MY",
          //         loadMode: "raw",
          //         loadUrl: "DONHANGITEM_DRAFT_MY_SearchBox_Web_V1",
          //       }),
          //       placeholder: "Chọn Order *",

          //       width: 200,
          //       displayExpr: "MY",
          //       valueExpr: "MY",
          //       searchEnabled: true,
          //       searchExpr: "MY",
          //       searchMode: "contains",
          //       searchTimeout: 200,
          //       minSearchLength: 0,
          //       showDataBeforeSearch: false,
          //       value: MY,
          //       onInitialized: function (e) {
          //         e.element.attr("id", "selectBoxMH");
          //       },
          //       onValueChanged: function (e) {
          //         MY = e.value;
          //         OrderDraftGridLoad(MY);
          //       },
          //     },
          //   },
          {
            location: "alter",
            widget: "dxTagBox",

            options: {
              dataSource: DevExpress.data.AspNet.createStore({
                key: "MY",
                loadMode: "raw",
                loadUrl: "DONHANGITEM_DRAFT_MY_SearchBox_Web_V1",
              }),
              placeholder: "Chọn Order Draft*",
              width: 200,
              displayExpr: "MY",
              valueExpr: "MY",
              searchEnabled: true,
              searchExpr: "MY",
              showSelectionControls: true,
              searchMode: "contains",
              value: arrValueTagBoxDraft,
              maxDisplayedTags: 1,
              onInitialized: function (e) {
                e.element.attr("id", "tagBoxMH");
              },
              onValueChanged: function (e) {
                arrValueTagBoxDraft = e.value;
                strValueTagBoxDraft = `'${arrValueTagBoxDraft.join(`','`)}'`;
              },
              onClosed: function (e) {
                OrderDraftGridLoad(strValueTagBoxDraft);
              },
            },
          },
          {
            location:"alter",
            widget:"dxButton",
            options:{
                icon:"add",
                text:"",
                onInitialized: function (e) {
                    e.element.attr("id", "btnAdd");
                },
                onClick: function (){
                    // console.log("clicker")
                    resetForm();
                    // mauChiMauNL.resetForm();
                }
            }
        },{
            location:"alter",
            widget:"dxButton",
            options:{
                icon:"edit",
                text:"",
                onInitialized: function (e) {
                    e.element.attr("id", "btnEdit");
                },
                onClick: function (){
                    // console.log("clicker")
                    EditForm();
                }
            }
        },{
            location:"alter",
            widget:"dxButton",
            options:{
                icon:"remove",
                text:"",
                onInitialized: function (e) {
                    e.element.attr("id", "btnDelete");
                },
                onClick: function (){
                    // console.log("clicker")
                    if (!confirm("Are you sure you want to Delete selected row?")){
                    }else{
                        deleteData();
                    }
                    // deleteData();
                }
            }

        }
        );
      },
      onFocusedRowChanged: function(e) {

        const rowData= e.row && e.row.data
        _ID=rowData.ID
        _Classification=rowData.Classification
        _OrderNo=rowData.OrderNo
        _UnitNo=rowData.UnitNo
        _Style=rowData.Style
        _Cup= rowData.Cup 
        _Size=rowData.Size
        _Color=rowData.Color
        _OrderQty=rowData.OrderQty
        _Note=rowData.Note
        _MY=rowData.MY
    
      
    }
  
    })
    .dxDataGrid("instance");
};

const resetForm = () => {
  $('#modalAddUpdate').modal('show');
      $('#btnSave').val("submitInsert");
      $('#modalAddUpdate').on('shown.bs.modal', function () {
        txtClassification.focus();
         
      }) 
      txtClassification.option('value','')
      txtClassification.option('readOnly',false)

      txtOrderNo.option('value','')
      txtOrderNo.option('readOnly',false)

      txtUnitNo.option('value','')
      txtUnitNo.option('readOnly',false)

      txtStyle.option('value','')
      txtStyle.option('readOnly',false)

      txtCup.option('value','')
      txtCup.option('readOnly',false)

      txtSize.option('value','')
      txtSize.option('readOnly',false)

      txtColor.option('value','')
      txtColor.option('readOnly',false)

      iOrderQty.option('value','')
      // txtClassification.option('readOnly',true)

      txtNote.option('value','')
      txtNote.option('readOnly',false)

      txtMY.option('value','')
      txtMY.option('readOnly',false)

}

const EditForm = () => {
  $('#modalAddUpdate').modal('show');
      $('#btnSave').val("submitEdit");
      $('#modalAddUpdate').on('shown.bs.modal', function () {
          iOrderQty.focus();
          // $('#txtMauChi').focus();
      }) 
      txtClassification.option('value',_Classification)
      txtClassification.option('readOnly',true)

      txtOrderNo.option('value',_OrderNo)
      txtOrderNo.option('readOnly',true)

      txtUnitNo.option('value',_UnitNo)
      txtUnitNo.option('readOnly',true)

      txtStyle.option('value',_Style)
      txtStyle.option('readOnly',true)

      txtCup.option('value',_Cup)
      txtCup.option('readOnly',true)

      txtSize.option('value',_Size)
      txtSize.option('readOnly',true)

      txtColor.option('value',_Color)
      txtColor.option('readOnly',true)

      iOrderQty.option('value',_OrderQty)
      // txtClassification.option('readOnly',true)

      txtNote.option('value',_Note)
      txtNote.option('readOnly',true)

      txtMY.option('value',_Classification)
      txtMY.option('readOnly',true)
      
 
}

const OrderGridLoad = (MY) => {
  var url = "DONHANGITEM_3_Load_Web_V2/";
  var listTinhChi = DevExpress.data.AspNet.createStore({
    key: "ID",
    loadUrl: url + MY,
    onBeforeSend: function (method, ajaxOptions) {
      ajaxOptions.xhrFields = {
        withCredentials: true,
      };
    },
  });

  $("#GridOrder")
    .dxDataGrid({
      dataSource: listTinhChi,
      columnsAutoWidth: true,
      height: 450,
      allowColumnReordering: true,
      rowAlternationEnabled: true,
      showColumnLines: true,
      showRowLines: true,
      showBorders: true,
      export: {
        enabled: true,
      },
      onExporting(e) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Order");

        DevExpress.excelExporter
          .exportDataGrid({
            component: e.component,
            worksheet,
            autoFilterEnabled: true,
          })
          .then(() => {
            workbook.xlsx.writeBuffer().then((buffer) => {
              saveAs(
                new Blob([buffer], { type: "application/octet-stream" }),
                `Order_${MY}.xlsx`
              );
            });
          });
        e.cancel = true;
      },
      focusedRowEnabled: true,
      // rowDragging:{
      //     data: 1,
      //     group: "tasksGroup",
      //     onAdd: onAdd
      // },
      // filterRow: {
      //     visible: true,
      //     applyFilter: "auto"
      // },
      // remoteOperations: true,
      // searchPanel: {
      //     visible: true,
      //     highlightCaseSensitive: true,
      //     // width: 240,
      //     // placeholder: "Search..."
      // },
      // headerFilter: {
      //     visible: false
      // },
      // groupPanel: {
      //     visible: false
      // },
      scrolling: {
        mode: "virtual",
      },
      //phan trang
      // paging: {
      //     pageSize: 10
      // },
      columns: [
        {
          caption: "STT",
          alignment: "left",
          dataField: "STT",
          visible: false,
        },
        {
          caption: "Classification",
          alignment: "left",
          dataField: "Classification",
        },
        {
          caption: "OrderNo",
          alignment: "left",
          dataField: "OrderNo",
        },
        {
          caption: "UnitNo",
          alignment: "left",
          dataField: "UnitNo",
        },
        {
          caption: "Style",
          alignment: "left",
          dataField: "Style",
        },
        {
          caption: "Cup",
          alignment: "left",
          dataField: "Cup",
        },
        {
          caption: "Size",
          alignment: "left",
          dataField: "Size",
        },
        {
          caption: "Color",
          alignment: "left",
          dataField: "Color",
        },
        {
          caption: "OrderQty",
          alignment: "right",
          dataField: "OrderQty",
        },
        {
          caption: "Note",
          alignment: "right",
          dataField: "Note",
        },
        {
          caption: "MY",
          alignment: "left",
          dataField: "MY",
        },
        {
          caption: "TIMECREATE",
          alignment: "left",
          dataField: "TIMECREATE",
        },
        {
          caption: "USERCREATE",
          alignment: "left",
          dataField: "USERCREATE",
        },
        {
          caption: "TIMEUPDATE",
          alignment: "left",
          dataField: "TIMEUPDATE",
        },
        {
          caption: "USERUPDATE",
          alignment: "left",
          dataField: "USERUPDATE",
        },
      ],
      onCellPrepared: function(e) {  
        if(e.rowType === 'header') {  
           e.cellElement.css("color", "blue");  
        }  
    } ,
      onToolbarPreparing: function (e) {
        e.toolbarOptions.items.unshift(
          {
            location: "alter",
            template: function () {
              return $("<div/>")
                .addClass("informer")
                .append(
                  `
                         <form action="" method="POST" enctype="multipart/form-data" id="frmUpload">
                         <input type="file" name="filename" id="filename" />
                         </from>
                         `
                );
            },
          },
          {
            location: "alter",
            widget: "dxButton",
            options: {
              icon: "upload",
              text: "",
              onInitialized: function (e) {
                e.element.attr("id", "btnUpload");
              },
              onClick: function () {
                // console.log("clicker")
                upload();
              },
            },
          },
          //   {
          //     location: "alter",
          //     widget: "dxSelectBox",

          //     options: {
          //       dataSource: DevExpress.data.AspNet.createStore({
          //         key: "MY",
          //         loadMode: "raw",
          //         loadUrl: "DONHANGITEM_3_MY_SearchBox_Web_V1",
          //       }),
          //       placeholder: "Chọn Order *",

          //       width: 200,
          //       displayExpr: "MY",
          //       valueExpr: "MY",
          //       searchEnabled: true,
          //       searchExpr: "MY",
          //       searchMode: "contains",
          //       searchTimeout: 200,
          //       minSearchLength: 0,
          //       showDataBeforeSearch: false,
          //       value: MY,
          //       onInitialized: function (e) {
          //         e.element.attr("id", "selectBoxMH");
          //       },
          //       onValueChanged: function (e) {
          //         MY = e.value;
          //         OrderGridLoad(MY);
          //       },
          //     },
          //   },
          {
            location: "alter",
            widget: "dxTagBox",

            options: {
              dataSource: DevExpress.data.AspNet.createStore({
                key: "MY",
                loadMode: "raw",
                loadUrl: "DONHANGITEM_3_MY_SearchBox_Web_V1",
              }),
              placeholder: "Chọn Order *",
              width: 200,
              displayExpr: "MY",
              valueExpr: "MY",
              searchEnabled: true,
              searchExpr: "MY",
              showSelectionControls: true,
              searchMode: "contains",
              value: arrValueTagBoxCT,
              maxDisplayedTags: 1,
              onInitialized: function (e) {
                e.element.attr("id", "tagBoxMHCT");
              },
              onValueChanged: function (e) {
                arrValueTagBoxCT = e.value;
                strValueTagBoxCT = `'${arrValueTagBoxCT.join(`','`)}'`;
              },
              onClosed: function (e) {
                OrderGridLoad(strValueTagBoxCT);
              },
            },
          }
        );
      },
    })
    .dxDataGrid("instance");
};
const loadPanel = $(".loadpanel")
  .dxLoadPanel({
    shadingColor: "rgba(0,0,0,0.4)",
    position: { of: "#GridOrderDraft" },
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
  })
  .dxLoadPanel("instance");

const loadPanelCT = $(".loadpanelCT")
  .dxLoadPanel({
    shadingColor: "rgba(0,0,0,0.4)",
    position: { of: "#GridOrder" },
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
  })
  .dxLoadPanel("instance");

const uploadDraft = () => {
  loadPanel.show();
  let formData = new FormData(document.getElementById("frmUploadOrderDraft"));
  let fileName = $("#filenameDraft").val();
  let fileType = fileName.split(".").pop();

  if (fileType !== "xlsx" && fileType !== "xls") {
    DevExpress.ui.notify(
      {
        message: "Chỉ nhận excel file",
        width: 450,
      },
      "warning",
      5000
    );
    $("#filenameDraft").val("");
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
    console.log(fileName);
    $.ajax({
      type: "POST",
      data: formData,
      contentType: false,
      url: "OrderDraftImportExcel",
      cache: false,
      processData: false,
      success: (res) => {
        if (res.statusErr) {
          DevExpress.ui.notify(
            {
              message: res.errMes,
              width: 450,
            },
            "success",
            5000
          );
          $("#filenameDraft").val("");
          loadPanel.hide();
        } else {
          DevExpress.ui.notify(
            {
              message: res.errMes,
              width: 450,
            },
            "error",
            5000
          );
          $("#filenameDraft").val("");
          loadPanel.hide();
          OrderDraftGridLoad(strValueTagBoxDraft);
        }
      },
    });
  }
};

const upload = () => {
  loadPanelCT.show();
  let formData = new FormData(document.getElementById("frmUpload"));
  let fileName = $("#filename").val();
  let fileType = fileName.split(".").pop();

  if (fileType !== "xlsx" && fileType !== "xls") {
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
    console.log(fileName);
    $.ajax({
      type: "POST",
      data: formData,
      contentType: false,
      url: "OrderImportExcel",
      cache: false,
      processData: false,
      success: (res) => {
        if (res.statusErr) {
          DevExpress.ui.notify(
            {
              message: res.errMes,
              width: 450,
            },
            "success",
            5000
          );
          $("#filename").val("");
          loadPanelCT.hide();
        } else {
          DevExpress.ui.notify(
            {
              message: res.errMes,
              width: 450,
            },
            "error",
            5000
          );
          $("#filename").val("");
          loadPanelCT.hide();
          OrderGridLoad(strValueTagBoxCT);
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



const txtClassification=$('#txtClassification').dxTextBox({
  // mode: "url"
  // label: "Link",
  // labelMode: "floating"
  // maxLength: 5,
  showClearButton: true,
  // placeholder: '5 ký tự',
  // readOnly: true,
}).dxTextBox('instance')

const txtOrderNo=$('#txtOrderNo').dxTextBox({
  // mode: "url"
  // label: "Link",
  // labelMode: "floating"
  // maxLength: 5,
  showClearButton: true,
  // placeholder: '5 ký tự',
  // readOnly: true,
}).dxTextBox('instance')

const txtUnitNo=$('#txtUnitNo').dxTextBox({
  // mode: "url"
  // label: "Link",
  // labelMode: "floating"
  // maxLength: 5,
  showClearButton: true,
  // placeholder: '5 ký tự',
  // readOnly: true,
}).dxTextBox('instance')

const txtStyle=$('#txtStyle').dxTextBox({
  // mode: "url"
  // label: "Link",
  // labelMode: "floating"
  // maxLength: 5,
  showClearButton: true,
  // placeholder: '5 ký tự',
  // readOnly: true,
}).dxTextBox('instance')

const txtCup=$('#txtCup').dxTextBox({
  // mode: "url"
  // label: "Link",
  // labelMode: "floating"
  // maxLength: 5,
  showClearButton: true,
  // placeholder: '5 ký tự',
  // readOnly: true,
}).dxTextBox('instance')

const txtSize=$('#txtSize').dxTextBox({
  // mode: "url"
  // label: "Link",
  // labelMode: "floating"
  // maxLength: 5,
  showClearButton: true,
  // placeholder: '5 ký tự',
  // readOnly: true,
}).dxTextBox('instance')

const txtColor=$('#txtColor').dxTextBox({
  // mode: "url"
  // label: "Link",
  // labelMode: "floating"
  // maxLength: 5,
  showClearButton: true,
  // placeholder: '5 ký tự',
  // readOnly: true,
}).dxTextBox('instance')

const iOrderQty= $('#iOrderQty').dxNumberBox({
  format: '#',
  value: '',
  // showSpinButtons: true,
  showClearButton: true,
  // inputAttr: { 'aria-label': 'Integer' },
}).dxNumberBox('instance');

const txtNote=$('#txtNote').dxTextBox({
  // mode: "url"
  // label: "Link",
  // labelMode: "floating"
  // maxLength: 5,
  showClearButton: true,
  // placeholder: '5 ký tự',
  // readOnly: true,
}).dxTextBox('instance')

const txtMY=$('#txtMY').dxTextBox({
  // mode: "url"
  // label: "Link",
  // labelMode: "floating"
  // maxLength: 5,
  showClearButton: true,
  // placeholder: '5 ký tự',
  // readOnly: true,
}).dxTextBox('instance')

$(function () {
  MY = `'None'`;
  OrderDraftGridLoad(MY);
  OrderGridLoad(MY);
  loadTooltip("tooltipUpload", "btnUpload");
});
