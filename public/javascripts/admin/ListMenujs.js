var _menuCode = "";
var _formName = "";
var _formCode = "";
var _projectCode = "";
var _showCode = "";
var _systemName = "";
var _menuCodeNext = "";

const editData = () => {
  //show modal

  $("#btnSave").val("submitEdit");
  $("#txtMenuCode").val(_menuCode);
  $("#txtFormName").val(_formName);
  $("#txtFormCode").val(_formCode);
  $("#txtprojectCode").val(_projectCode);
  $("#txtshowCode").val(_showCode);
  $("#txtSystemName").val(_systemName);
  $("#modalAddUpdate").modal("show");
  $("#txtMenuCode").attr("readonly", "true");
  $("#txtshowCode").attr("readonly", "true");
  $("#modalAddUpdate").on("shown.bs.modal", function () {
    $("#txtFormName").focus();
  });
};
const resetForm = () => {
  $("#modalAddUpdate").modal("show");
  $("#btnSave").val("submitInsert");
  // $('#txtMenuCode').removeAttr("readonly")
  $("#modalAddUpdate").on("shown.bs.modal", function () {
    $("#txtFormName").focus();
  });

  // $('#txtMenuCode').val('');
  $("#txtMenuCode").attr("readonly", "true");
  $("#txtMenuCode").val(_menuCodeNext);
  $("#txtFormName").val("");
  $("#txtFormCode").val("");
  $("#txtprojectCode").val("");
  $("#txtshowCode").val("ShowWeb");
  $("#txtshowCode").attr("readonly", "true");
  $("#txtSystemName").val("");
};

const saveData = () => {
  var menuCode = $("#txtMenuCode").val();
  var formName = $("#txtFormName").val();
  var formCode = $("#txtFormCode").val();
  var projectCode = $("#txtprojectCode").val();
  var showCode = $("#txtshowCode").val();
  var systemName = $("#txtSystemName").val();
  var status = $("#btnSave").val();
  // console.log(status);
  var data = {
    MenuCode: menuCode,
    FormName: formName,
    FormCode: formCode,
    ProjectCode: projectCode,
    ShowCode: showCode,
    SystemName: systemName,
    Status: status,
  };

  // data.Name=singleValues;
  // data.title = "title";
  // data.message = "message";
  $.ajax({
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    url: "/admin/saveToDatabase",
    success: function (res) {
      if (res.status) {
        DevExpress.ui.notify(
          {
            message: res.mes,
            width: 450,
          },
          "success",
          5000
        );
        $("#modalAddUpdate").modal("hide");
        // alert("Update success");

        Reload();
      } else {
        DevExpress.ui.notify(
          {
            message: res.mes,
            width: 450,
          },
          "error",
          5000
        );

        // console.log(JSON.stringify(res));
        // alert(res);
      }
    },
  });
};

const deleteData = () => {
  var data = {
    Name: _menuCode,
  };
  $.ajax({
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    url: "/admin/MenuListDelete",
    success: (res) => {
      if (res.status) {
        DevExpress.ui.notify(
          {
            message: res.mes,
            width: 450,
          },
          "success",
          5000
        );
        $("#modalAddUpdate").modal("hide");
        // alert("Update success");
        Reload();
      } else {
        DevExpress.ui.notify(
          {
            message: res.mes,
            width: 450,
          },
          "error",
          5000
        );
      }
    },
  });
};

const CreateMenuCode = () => {
  $.ajax({
    type: "GET",
    // data: JSON.stringify(data),
    // contentType: "application/json",
    url: "/admin/sp_CNY_Menu_CreateMenuCode",
    success: function (res) {
      if (res.status) {
        _menuCodeNext = res.data[0].MenuCode;
      } else {
        DevExpress.ui.notify(
          {
            message: "Lỗi: Không thể tạo menu Code",
            width: 450,
          },
          "error",
          5000
        );
      }
    },
  });
};

function getDataItem(row) {
  const rowData = row && row.data;
  if (rowData) {
    _menuCode = rowData.MenuCode;
    _formName = rowData.FormName;
    _formCode = rowData.FormCode;
    _projectCode = rowData.ProjectCode;
    _showCode = rowData.ShowCode;
    _systemName = rowData.SystemName;
  }
}

const GridCompanyLoad = () => {
  var url = "wacoal_ListMenu_Load_website_v1";
  //   console.log(" url " + url + roleId);
  var listMenu = DevExpress.data.AspNet.createStore({
    key: "MenuCode",
    loadUrl: url,

    // insertUrl: url + "/InsertOrder",
    // updateUrl: url + "/UpdateOrder",
    // deleteUrl: url + "/DeleteOrder",
    onBeforeSend: function (method, ajaxOptions) {
      ajaxOptions.xhrFields = {
        withCredentials: true,
      };
    },
  });

  $("#GridMenu")
    .dxDataGrid({
      dataSource: listMenu,
      // reshapeOnPush: true,
      columnsAutoWidth: true,
      height: 400,
      allowColumnReordering: true,
      rowAlternationEnabled: true,
      showColumnLines: true,
      showRowLines: true,
      showBorders: true,
      focusedRowEnabled: true,
      //   rowDragging: {
      //     data: 1,
      //     group: "tasksGroup",
      //     onAdd: onAdd,
      //   },
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
          caption: "MenuCode",
          alignment: "left",
          dataField: "MenuCode",
        },
        {
          caption: "FormName",
          alignment: "left",
          dataField: "FormName",
        },
        {
          caption: "FormCode",
          alignment: "left",
          dataField: "FormCode",
        },
        {
          caption: "ProjectCode",
          alignment: "left",
          dataField: "ProjectCode",
        },
        {
          caption: "FolderContainForm",
          alignment: "left",
          dataField: "FolderContainForm",
          visible: false,
        },
        {
          caption: "MenuImage",
          alignment: "left",
          dataField: "MenuImage",
          visible: false,
        },
        {
          caption: "GuideDocument",
          alignment: "left",
          dataField: "GuideDocument",
          visible: false,
        },
        {
          caption: "ProcessDocument",
          alignment: "left",
          dataField: "ProcessDocument",
          visible: false,
        },
        {
          caption: "ShowCode",
          alignment: "left",
          dataField: "ShowCode",
        },
        {
          caption: "IsActive",
          alignment: "left",
          dataField: "IsActive",
          visible: false,
        },
        {
          caption: "WorkFunCode",
          alignment: "left",
          dataField: "WorkFunCode",
          visible: false,
        },
        {
          caption: "SystemName",
          alignment: "left",
          dataField: "SystemName",
        },
        {
          caption: "Href",
          alignment: "left",
          dataField: "Href",
          visible: false,
        },
      ],
      onFocusedRowChanging: function (e) {
        var rowsCount = e.component.getVisibleRows().length,
          pageCount = e.component.pageCount(),
          pageIndex = e.component.pageIndex(),
          key = e.event && e.event.key;

        if (key && e.prevRowIndex === e.newRowIndex) {
          if (e.newRowIndex === rowsCount - 1 && pageIndex < pageCount - 1) {
            e.component.pageIndex(pageIndex + 1).done(function () {
              e.component.option("focusedRowIndex", 0);
            });
          } else if (e.newRowIndex === 0 && pageIndex > 0) {
            e.component.pageIndex(pageIndex - 1).done(function () {
              e.component.option("focusedRowIndex", rowsCount - 1);
            });
          }
        }
      },
      onFocusedRowChanged: function (e) {
        getDataItem(e.row);
      },
      onToolbarPreparing: function (e) {
        // var dataGrid = e.component;

        e.toolbarOptions.items.unshift(
          {
            location: "alter",
            widget: "dxButton",
            options: {
              icon: "add",
              text: "",
              onInitialized: function (e) {
                e.element.attr("id", "btnAdd");
              },
              onClick: function () {
                // console.log("clicker")
                resetForm();
                // mauChiMauNL.resetForm();
              },
            },
          },
          {
            location: "alter",
            widget: "dxButton",
            options: {
              icon: "edit",
              text: "",
              onInitialized: function (e) {
                e.element.attr("id", "btnEdit");
              },
              onClick: function () {
                // console.log("clicker")
                editData();
              },
            },
          },
          {
            location: "alter",
            widget: "dxButton",
            options: {
              icon: "remove",
              text: "",
              onInitialized: function (e) {
                e.element.attr("id", "btnDelete");
              },
              onClick: function () {
                // console.log("clicker")
                if (!confirm("Are you sure you want to Delete selected row?")) {
                } else {
                  deleteData();
                }
                // deleteData();
              },
            },
          }
        );
      },
    })
    .dxDataGrid("instance");
};

const Reload = () => {
  GridCompanyLoad();
  CreateMenuCode();
};
//ham khoi tao: goi tat ca cac ham khac trong day
$(document).ready(function () {
  Reload();
  $("#btnSave").click(function (e) {
    e.preventDefault();
    saveData();
  });
});
