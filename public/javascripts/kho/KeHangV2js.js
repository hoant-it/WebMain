var _keHangId;
var _keHangName = "";
var _NL;
var _oderNo;
var _color;
var _slTon;
var _donVi;
var sSearch = "";
var _idKho = "0";
var titleheader = document.getElementById("titleHeader");
let _stausXuat = "";

const GetURLParameter = (sParam) => {
  var sPageUrl = window.location.search.substring(1);
  var sUrlVariables = sPageUrl.split("&");
  for (var i = 0; i < sUrlVariables.length; i++) {
    var sParemetterName = sUrlVariables[i].split("=");
    if (sParemetterName[0] === sParam) {
      return sParemetterName[1];
    }
  }
};
const GetKeHangName = () => {
  let data = {
    ID: _keHangId,
  };
  let urlPatch = "wacoal_KEHANG_Load_By_Id_Web_V1/" + data.ID;

  $.ajax({
    type: "GET",
    // data:JSON.stringify(data),
    // contentType: 'application/json',
    url: urlPatch,
    success: (res) => {
      if (res.status) {
        _keHangName = res.keHangName;
        $("#titleHeader").val(_keHangName);
        titleheader.innerHTML = "Kho Nguyên Liệu ( " + _keHangName + " )";
      } else {
        DevExpress.ui.notify(
          {
            message: res.keHangName,
            width: 450,
          },
          "error",
          5000
        );
        // alert(res.errMes);
      }
    },
  });
};

const KeHangGridLoad = () => {
  // console.log(_stausXuat)
  var url = "wacoal_KHONL_Web_Load_V1/";
  // console.log(" url " + url + oderNo+khachHang);
  var listTinhChi = DevExpress.data.AspNet.createStore({
    key: "ID",
    loadUrl: url + _keHangId,

    // insertUrl: url + "/InsertOrder",
    // updateUrl: url + "/UpdateOrder",
    // deleteUrl: url + "/DeleteOrder",
    onBeforeSend: function (method, ajaxOptions) {
      ajaxOptions.xhrFields = {
        withCredentials: true,
      };
    },
  });

  $("#GridKeHang")
    .dxDataGrid({
      dataSource: listTinhChi,
      // reshapeOnPush: true,
      columnsAutoWidth: true,
      height: 450,
      allowColumnReordering: true,
      rowAlternationEnabled: true,
      showColumnLines: true,
      showRowLines: true,
      showBorders: true,
      // export:{
      //     enabled: true
      // },
      // onExporting(e) {
      //     const workbook = new ExcelJS.Workbook();
      //     const worksheet = workbook.addWorksheet('Order');

      //     DevExpress.excelExporter.exportDataGrid({
      //       component: e.component,
      //       worksheet,
      //       autoFilterEnabled: true,
      //     }).then(() => {
      //       workbook.xlsx.writeBuffer().then((buffer) => {
      //         saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `Order_${MY}.xlsx`);
      //       });
      //     });
      //     e.cancel = true;
      //   },
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
      searchPanel: {
        visible: true,
        highlightCaseSensitive: true,
        // width: 240,
        // placeholder: "Search..."
      },
      headerFilter: {
        visible: true,
      },
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
        },
        {
          caption: "ID",
          alignment: "left",
          dataField: "ID",
          visible: false,
        },
        {
          caption: "_keHangId",
          alignment: "left",
          dataField: "_keHangId",
          visible: false,
        },
        {
          caption: "Kệ",
          alignment: "left",
          dataField: "SHEFTDES",
        },
        {
          caption: "Nguyên Liệu",
          alignment: "left",
          dataField: "MATERIAL",
        },
        {
          caption: "ORDERNO",
          alignment: "left",
          dataField: "ORDERNO",
        },
        {
          caption: "Màu",
          alignment: "left",
          dataField: "COLOR",
        },
        {
          caption: "SL Nhập",
          alignment: "left",
          dataField: "QUANTITY",
        },
        {
          caption: "SL Xuất",
          alignment: "left",
          dataField: "QUANTITYXUAT",
        },
        {
          caption: "SL Tồn",
          alignment: "left",
          dataField: "QtyTon",
        },
        {
          caption: "UNIT",
          alignment: "left",
          dataField: "UNIT",
        },
        {
          caption: "Người Nhập",
          alignment: "left",
          dataField: "USERCREATE",
        },
        {
          caption: "TG Nhập",
          alignment: "left",
          dataField: "TIMECREATE",
        },
        {
          caption: "USERUPDATE",
          alignment: "left",
          dataField: "USERUPDATE",
          visible: false,
        },
        {
          caption: "TIMEUPDATE",
          alignment: "right",
          dataField: "TIMEUPDATE",
          visible: false,
        },
      ],
      onToolbarPreparing: function (e) {
        e.toolbarOptions.items.unshift(
          //     {
          //     location:"alter",
          //     template:function(){
          //         return $('<div/>')
          //         .addClass("informer")
          //             .append(
          //              `
          //              <form action="" method="POST" enctype="multipart/form-data" id="frmUpload">
          //              <input type="file" name="filename" id="filename" />
          //              </from>
          //              `
          //             );
          //     }

          // },
          // {
          //     location:"alter",
          //     widget:"dxButton",
          //     options:{
          //         icon:"upload",
          //         text:"",
          //         onInitialized: function (e) {
          //             e.element.attr("id", "btnUpload");
          //         },
          //         onClick: function (){
          //             // console.log("clicker")
          //            upload();
          //         }
          //     }
          // },

          //      {
          //     location:"alter",
          //     widget:"dxButton",
          //     options:{
          //         icon:"add",
          //         text:"",
          //         onInitialized: function (e) {
          //             e.element.attr("id", "btnAdd");
          //         },
          //         onClick: function (){
          //             // console.log("clicker")
          //             resetForm(_keHangId)
          //         }
          //     }
          // },
          {
            location: "alter",
            widget: "dxButton",
            options: {
              icon: "export",
              text: "Xuất",
              onInitialized: function (e) {
                e.element.attr("id", "btnEdit");
              },
              onClick: function () {
                if (_stausXuat === "xuatBP") {
                  EditForm();
                }
                if (_stausXuat === "xuatTP") {
                  SaveData();
                }
              },
            },
          }
        );
      },
      onFocusedRowChanged: function (e) {
        getDataItem(e.row);
      },
    })
    .dxDataGrid("instance");
};
const LSXuatGridLoad = (KHONLID) => {
  var url = "wacoal_KHONLXUAT_Load_By_KHONLID_web_V1/";
  // console.log(" url " + url + oderNo+khachHang);
  var listTinhChi = DevExpress.data.AspNet.createStore({
    key: "ID",
    loadUrl: url + KHONLID,

    // insertUrl: url + "/InsertOrder",
    // updateUrl: url + "/UpdateOrder",
    // deleteUrl: url + "/DeleteOrder",
    onBeforeSend: function (method, ajaxOptions) {
      ajaxOptions.xhrFields = {
        withCredentials: true,
      };
    },
  });

  $("#GridLSXuat")
    .dxDataGrid({
      dataSource: listTinhChi,
      // reshapeOnPush: true,
      columnsAutoWidth: true,
      height: 450,
      allowColumnReordering: true,
      rowAlternationEnabled: true,
      showColumnLines: true,
      showRowLines: true,
      showBorders: true,
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
      headerFilter: {
        visible: true,
      },
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
        },
        {
          caption: "ID",
          alignment: "left",
          dataField: "ID",
          visible: false,
        },
        {
          caption: "KHONLID",
          alignment: "left",
          dataField: "KHONLID",
          visible: false,
        },
        {
          caption: "Sl Xuất",
          alignment: "left",
          dataField: "QUANTITYXUAT",
        },
        {
          caption: "Người Nhập",
          alignment: "left",
          dataField: "USERCREATE",
        },
        {
          caption: "TG Nhập",
          alignment: "left",
          dataField: "TIMECREATE",
        },
        {
          caption: "USERUPDATE",
          alignment: "left",
          dataField: "USERUPDATE",
          visible: false,
        },
        {
          caption: "TIMEUPDATE",
          alignment: "right",
          dataField: "TIMEUPDATE",
          visible: false,
        },
      ],
    })
    .dxDataGrid("instance");
};

function getDataItem(row) {
  const rowData = row && row.data;
  if (rowData) {
    LSXuatGridLoad(rowData.ID);
    _idKho = rowData.ID;
    _keHangId = rowData.SHEFTID;
    _NL = rowData.MATERIAL;
    _oderNo = rowData.ORDERNO;
    _color = rowData.COLOR;
    _slTon = rowData.QtyTon;
    _donVi = rowData.UNIT;
  }
}

const resetForm = () => {
  _stausXuat = "";
  $("#modalAddUpdate").modal("show");
  $("#btnSave").val("submitInsert");
  $("#modalAddUpdate").on("shown.bs.modal", function () {
    $("#txtMauNL").focus();
  });

  // $('#txtMauNL').removeAttr("readonly")
  // $("#searchBoxKeHang").dxSelectBox({
  //     readOnly: false
  // });
  $("#searchBoxKeHang").dxSelectBox("instance").option("value", _keHangId);
  $("#searchBoxKeHang").dxSelectBox({
    readOnly: true,
  });
  // readOnly: true,
  $("#txtNL").removeAttr("readonly");
  $("#txtNL").val("");
  $("#txtOrder").removeAttr("readonly");
  $("#txtOrder").val("");
  $("#txtColor").removeAttr("readonly");
  $("#txtColor").val("");
  $("#txtQty").val("");
  $("#frmSlNhap").show();
  $("#frmSlTon").hide();
  $("#frmSlXuat").hide();
  $("#txtUnit").removeAttr("readonly");
  $("#txtUnit").val("MTR");
};

const EditForm = () => {
  if (_idKho == "0") {
    DevExpress.ui.notify(
      {
        message: "Chưa chọn dữ liệu",
        width: 450,
      },
      "error",
      5000
    );
    return;
  }

  if (_slTon == 0) {
    DevExpress.ui.notify(
      {
        message: "Không còn số lượng",
        width: 450,
      },
      "error",
      5000
    );
    return;
  }
  $("#modalAddUpdate").modal("show");
  $("#btnSave").val("submitEdit");
  $("#modalAddUpdate").on("shown.bs.modal", function () {
    $("#txtMauChi").focus();
  });
  $("#searchBoxKeHang").dxSelectBox("instance").option("value", _keHangId);
  $("#searchBoxKeHang").dxSelectBox({
    readOnly: true,
  });
  $("#frmSlNhap").hide();
  $("#frmSlTon").show();

  $("#frmSlXuat").show();
  $("#txtNL").attr("readonly", "true");
  $("#txtNL").val(_NL);
  $("#txtOrder").attr("readonly", "true");
  $("#txtOrder").val(_oderNo);
  $("#txtColor").attr("readonly", "true");
  $("#txtColor").val(_color);
  $("#txtQtyTon").attr("readonly", "true");
  $("#txtQtyTon").val(_slTon);
  $("#txtQtyXuat").val(_slTon);
  $("#txtUnit").attr("readonly", "true");
  $("#txtUnit").val(_donVi);

  // $('#txtMauNL').val(_MAUNL)
  // $('#txtMauChi').val(_MAUCHI)

  // $('#txtMauNL').attr("readonly","true")
  // $("#searchBoxLoaiChi") .dxSelectBox("instance") .option("value", _LOAICHI)
  // $("#searchBoxLoaiChi").dxSelectBox({
  //     readOnly: true
  // });
};

const SaveData = () => {
  let data = {};
  if (data.btnSave === "submitEdit") {
    if (parseInt(data.txtQtyXuat) > parseInt(data.txtQtyTon)) {
      DevExpress.ui.notify(
        {
          message: "Sl Xuất > SL Tồn",
          width: 450,
        },
        "error",
        5000
      );
      return;
    }
  }
  if (_stausXuat === "xuatTP") {
    data = {
      btnSave: "submitEdit",
      keHang: _keHangId,
      txtNL: _NL,
      txtOrder: _oderNo,
      txtColor: _color,
      txtQty: 0,
      txtUnit: _donVi,
      txtQtyTon: _slTon,
      txtQtyXuat: _slTon,
      khoId: _idKho,
    };
  } else {
    data = {
      btnSave: $("#btnSave").val(),
      keHang: $("#searchBoxKeHang").dxSelectBox("instance").option("value"),
      txtNL: $("#txtNL").val(),
      txtOrder: $("#txtOrder").val(),
      txtColor: $("#txtColor").val(),
      txtQty: $("#txtQty").val(),
      txtUnit: $("#txtUnit").val(),
      txtQtyTon: $("#txtQtyTon").val(),
      txtQtyXuat: $("#txtQtyXuat").val(),
      khoId: _idKho,
    };
  }

  $.ajax({
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    url: "SaveKeHangToDatabase",
    success: (res) => {
      if (res.statusErr) {
        // DevExpress.ui.notify({
        //     message: res.errMes,
        //     width: 450
        // },"success",5000), //error,success,warning
        alert(res.errMes);
        $("#modalAddUpdate").modal("hide");
        location.reload();
      } else {
        // DevExpress.ui.notify({
        //     message: res.errMes,
        //     width: 450
        // },"error",5000)
        alert(res.errMes);
      }
    },
  });
};

const searchBoxKeHang = () => {
  const selectBoxData = DevExpress.data.AspNet.createStore({
    key: "ID",
    loadMode: "raw",
    loadUrl: "wacoal_KEHANG_Web_Load_V1",
  });

  var searchBox = $("#searchBoxKeHang")
    .dxSelectBox({
      dataSource: selectBoxData,
      displayExpr: "SHEFTDES",
      valueExpr: "ID",
      searchEnabled: true,
      searchExpr: "SHEFTDES",
      value: "aaa",
      searchMode: "contains",
      searchTimeout: 200,
      minSearchLength: 0,
      showDataBeforeSearch: false,
      value: _keHangId,
      readOnly: true,
      //       onValueChanged: function (data) {
      //     // var $result = $(".current-value");

      //     if (data.value !== null) {
      //         var selectedItem = data.component.option('selectedItem');
      //         // $result.text(selectedItem.Name + " (ID: " + selectedItem.ID + ")");
      //         console.log(" (ID: " + selectedItem.MAKH + ")")
      //     } else {
      //         console.log("Not selected")
      //         // $result.text("Not selected");
      //     }
      // },
    })
    .dxSelectBox("instance");
};

const loadTooltip = (id, targetButton) => {
  $(`#${id}`).dxTooltip({
    target: `#${targetButton}`,
    showEvent: "mouseenter",
    hideEvent: "mouseleave",
    closeOnOutsideClick: false,
  });
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
      // GridviewMaHangLoad(MaHang);

      KeHangGridLoad();
    },
  })
  .dxLoadPanel("instance");

const upload = () => {
  loadPanel.show();
  // let formData=new FormData($("frmUpload"));
  let formData = new FormData(document.getElementById("frmUpload"));
  // for(let i=0; i<this.files.length;i++){
  //     formData.append('file',this.files[i]);
  // }
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
      url: "upload",
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
};

$(function () {
  _keHangId =
    unescape(GetURLParameter("ke")) == "undefined"
      ? 0
      : unescape(GetURLParameter("ke"));
  GetKeHangName();
  searchBoxKeHang();

  $(".addButton").dxButton({
    icon: "add",
    text: "Nhập",
    onClick: resetForm,
  });
  $(".editButton").dxButton({
    icon: "selectall",
    text: "Xuất Toàn Phần",
    onClick: function () {
      _stausXuat = "xuatTP";
      KeHangGridLoad();
    },
  });
  $(".deleteButton").dxButton({
    icon: "unselectall",
    text: "Xuất Bán Phần",
    onClick: function () {
      _stausXuat = "xuatBP";
      KeHangGridLoad();
    },
  });
  $(".uploadButton").dxButton({
    icon: "upload",
    text: "",
    onClick: function () {
      upload();
    },
  });

  loadTooltip("tooltipAdd", "btnAdd");
  loadTooltip("tooltipEdit", "btnEdit");
  $("#btnSave").click((e) => {
    e.preventDefault();
    SaveData();
  });

  // console.log(sSearch);
});
