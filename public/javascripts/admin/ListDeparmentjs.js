var _departmentCode = "";
var _departmentName = "";
var _companyCode = "";

function getDataItem(row) {
    const rowData = row && row.data;
    if (rowData) {
        _departmentCode = rowData.DepartmentCode;
        _departmentName = rowData.DepartmentName;
        _companyCode = rowData.CompanyCode;
    }
  }

const editData = () => {
  //show modal
  $("#btnSave").val("submitEdit");
  $("#txtDepartmentCode").val(_departmentCode);
  $("#txtDepartmentCode").attr("readonly", "true");
  $("#txtDepartmentName").val(_departmentName);
  $("#searchBoxCompany").dxSelectBox('instance').option('value',_companyCode)
  $("#modalAddUpdate").modal("show");
  $("#modalAddUpdate").on("shown.bs.modal", function () {
    $("#txtDepartmentName").focus();
  });
};
const resetForm = () => {
  $("#modalAddUpdate").modal("show");
  $("#btnSave").val("submitInsert");
  // $('#txtMenuCode').removeAttr("readonly")
  $("#modalAddUpdate").on("shown.bs.modal", function () {
    $("#txtDepartmentCode").focus();
  });
  $("#txtDepartmentCode").val("");
  $("#txtDepartmentCode").removeAttr("readonly");
  $("#txtDepartmentName").val("");
};

const saveData = () => {
  var departmentCode = $("#txtDepartmentCode").val();
  var departmentName = $("#txtDepartmentName").val();
  var companyCode = _companyCode
  var status = $("#btnSave").val();
  if(companyCode==''){
    alert('không để trống company code')
    return
  }
  // console.log(status);
  var data = {
    DepartmentCode: departmentCode,
    DepartmentName: departmentName,
    CompanyCode: companyCode,
    Status: status,
  };

  // data.Name=singleValues;
  // data.title = "title";
  // data.message = "message";
  $.ajax({
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    url: "ListDepartmentPostUpdate",
    success: function (res) {
      if (res.status) {
        // console.log('success');
        // console.log(JSON.stringify(res));
        $("#modalAddUpdate").modal("hide");
        alert(res.mes);
        location.reload();
      } else {
        // console.log(JSON.stringify(res));
        alert(res.mes);
      }
    },
  });
};

const deleteData = () => {
  var data = {
    DepartmentCode: _departmentCode,
  };
  $.ajax({
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    url: "ListDepartmentDelete",
    success: (res) => {
      if (res.status) {
        // console.log(JSON.stringify(res));
        alert(res.mes);
        location.reload();
      } else {
        alert(res.mes);
      }
    },
  });
};

const GridDepartmentLoad = () => {
    var url = "ListDepartment_Load_Web_V1";
    //   console.log(" url " + url + roleId);
    var listMenu = DevExpress.data.AspNet.createStore({
      key: "DepartmentCode",
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
  
    $("#GridDepartment")
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
            caption: "DepartmentCode",
            alignment: "left",
            dataField: "DepartmentCode",
          },
          {
            caption: "DepartmentName",
            alignment: "left",
            dataField: "DepartmentName",
          },
          {
            caption: "CompanyCode",
            alignment: "left",
            dataField: "CompanyCode",
            visible:false
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
  const searchBoxListCompany = () => {
    const selectBoxData = DevExpress.data.AspNet.createStore({
      key: "CompanyCode",
      loadMode: "raw",
      loadUrl: "ListCompany_Load_Web_V1",
    });

    var searchBox = $("#searchBoxCompany")
      .dxSelectBox({
        dataSource: selectBoxData,
        displayExpr: "CompanyName",
        valueExpr: "CompanyCode",
        searchEnabled: true,
        searchExpr: "CompanyName",
        searchMode: "contains",
        searchTimeout: 200,
        minSearchLength: 0,
        showDataBeforeSearch: false,
        onValueChanged: function(e) {
          _companyCode =e.value
      }

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


//ham khoi tao: goi tat ca cac ham khac trong day
$(document).ready(function () {
    GridDepartmentLoad()
    searchBoxListCompany()
  $("#btnSave").click(function (e) {
    e.preventDefault();
    // console.log('select_link clicked');
    saveData();
  });
});
