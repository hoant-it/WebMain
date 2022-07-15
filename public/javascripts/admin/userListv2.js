var _name = "";
var _fullname = "";
var _email = "";
var _positionName = "";
var _deparmentCode = "";
var _positionCode = "";

const searchBoxPosition=() =>{
    const selectBoxData =  DevExpress.data.AspNet.createStore({
        key: "PositionsCode",
        loadMode:"raw",
        loadUrl:"ListPositions_Load_Web_V1",
    });

    var searchBox = $("#searchBoxPosition").dxSelectBox({
        dataSource:selectBoxData,
        displayExpr: "PositionsName",
        valueExpr: "PositionsCode",
        searchEnabled: true,
        searchExpr:'PositionsName',
        searchMode:'contains',
        searchTimeout:200,
        minSearchLength:0,
        showDataBeforeSearch:false,
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
    }).dxSelectBox("instance");
}

const searchBoxDepartment=() =>{
    const selectBoxData =  DevExpress.data.AspNet.createStore({
        key: "DepartmentCode",
        loadMode:"raw",
        loadUrl:"ListDepartment_Load_Web_V1",
    });

    var searchBox = $("#searchBoxDepartment").dxSelectBox({
        dataSource:selectBoxData,
        displayExpr: "DepartmentName",
        valueExpr: "DepartmentCode",
        searchEnabled: true,
        searchExpr:'DepartmentName',
        searchMode:'contains',
        searchTimeout:200,
        minSearchLength:0,
        showDataBeforeSearch:false,
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
    }).dxSelectBox("instance");
}

const editData = () => {
  //show modal
  $("#modalAddUpdate").modal("show");
  $("#btnSave").val("submitEdit");
  $("#txtUserName").attr("readonly", "true");
  // $("#selectionPosition").val(_positionCode);
  $("#searchBoxPosition").dxSelectBox('instance').option('value',_positionCode)
  $("#searchBoxDepartment").dxSelectBox('instance').option('value',_deparmentCode)
  // $("#selectionDeparment").val(_deparmentCode);
  $("#modalAddUpdate").on("shown.bs.modal", function () {
    $("#txtFullName").focus();
  });
  $("#txtUserName").val(_name);
  $("#txtFullName").val(_fullname);
  $("#txtEmail").val(_email);
  // $('#txtPositionsName').val(_positionName);
};
const resetForm = () => {
    $('#modalAddUpdate').modal('show');
    $('#btnSave').val("submitInsert");
    $('#modalAddUpdate').on('shown.bs.modal', function () {
 
        $('#txtUserName').focus();
    }) 
  $("#txtUserName").removeAttr("readonly");
  $("#txtUserName").val("");
  $("#txtFullName").val("");
  $("#txtEmail").val("");
  $("#txtPositionsName").val("");

};

const saveData = () => {
  var name = $("#txtUserName").val();
  var fullName = $("#txtFullName").val();
  var email = $("#txtEmail").val();
  var positionCode= $("#searchBoxPosition").dxSelectBox('instance').option('value')
  var positionName = $("#txtPositionsName").val();
  var departmentCode = $("#searchBoxDepartment").dxSelectBox('instance').option('value')
  var status = $("#btnSave").val();
  // console.log(status);
  var data = {
    Name: name,
    FullName: fullName,
    Email: email,
    PositionName: positionName,
    DepartmentCode: departmentCode,
    Status: status,
    PositionCode: positionCode,
  };

  // data.Name=singleValues;
  // data.title = "title";
  // data.message = "message";
  $.ajax({
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    url: "/admin/saveData",
    success: function (res) {
      if (res.status) {
        DevExpress.ui.notify({
            message: res.mes,
            width: 450
        },"success",5000)
        $("#modalAddUpdate").modal("hide");
        ReLoad()
        // alert("Update success");
        // location.reload();
      } else {
        DevExpress.ui.notify({
            message: res.mes,
            width: 450
        },"error",5000)
      }
    },
  });
};

const deleteData = () => {
  var data = {
    Name: _name,
  };
  $.ajax({
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    url: "/admin/deleteData",
    success: (res) => {
      if (res.status) {
        DevExpress.ui.notify({
            message: res.mes,
            width: 450
        },"success",5000)
        ReLoad()
      } else {
        DevExpress.ui.notify({
            message: res.mes,
            width: 450
        },"error",5000)
      }
    },
  });
};
const resetPass=()=>{
    var data = {
        Name: _name,
      };
      $.ajax({
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        url: "/admin/resetPass",
        success: (res) => {
          if (res.status) {
            DevExpress.ui.notify({
                message: res.mes,
                width: 450
            },"success",5000)
            ReLoad()
          } else {
            DevExpress.ui.notify({
                message: res.mes,
                width: 450
            },"error",5000)
          }
        },
      });

}

function getDataItem(row) {
    const rowData = row && row.data;
    if (rowData) {
        _name = rowData.UserName;
        _fullname = rowData.FullName;
        _email = rowData.Email;
        _positionName = rowData.PositionsName;
        _deparmentCode = rowData.DepartmentCode;
        _positionCode = rowData.PositionsCode
    }
  }

const GridUserLoad = () => {
    var url = "wacoal_GetUserList_Web_V1";
    //   console.log(" url " + url + roleId);
    var listMenu = DevExpress.data.AspNet.createStore({
      key: "UserName",
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
  
    $("#GridUser")
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
            caption: "UserName",
            alignment: "left",
            dataField: "UserName",
          },
          {
            caption: "FullName",
            alignment: "left",
            dataField: "FullName",
          },
          {
            caption: "Email",
            alignment: "left",
            dataField: "Email",
          },
          {
            caption: "PositionsCode",
            alignment: "left",
            dataField: "PositionsCode",
            visible:false
          },
          {
            caption: "PositionsName",
            alignment: "left",
            dataField: "PositionsName",
          },
          {
            caption: "DepartmentCode",
            alignment: "left",
            dataField: "DepartmentCode",
            visible:false
          },
          {
            caption: "DepartmentName",
            alignment: "left",
            dataField: "DepartmentName",
          },
          {
            caption: "WebPass",
            alignment: "left",
            dataField: "WebPass",
            visible:false
          },
          {
            caption: "GroupUserDescription",
            alignment: "left",
            dataField: "GroupUserDescription",
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
            },
            {
                location: "alter",
                widget: "dxButton",
                options: {
                  icon: "revert",
                  text: "",
                  onInitialized: function (e) {
                    e.element.attr("id", "btnResetPass");
                  },
                  onClick: function () {
                    // console.log("clicker")
                    if (!confirm("Are you sure you want to reset password selected row?")) {
                    } else {
                      resetPass();
                    }
                    // deleteData();
                  },
                },
              },

          );
        },
      })
      .dxDataGrid("instance");
  };

  const ReLoad=()=>{
    GridUserLoad()
    searchBoxPosition()
    searchBoxDepartment()
  }

//ham khoi tao: goi tat ca cac ham khac trong day
$(document).ready(function () {
    ReLoad()
  $("#btnSave").click(function (e) {
    e.preventDefault();
    // console.log('select_link clicked');
    saveData();
  });

  $("#btnDeleteId").click((e) => {
    e.preventDefault();
    if (!confirm("Are you sure you want to Delete selected row?")) {
    } else {
      deleteData();
    }
  });
});
