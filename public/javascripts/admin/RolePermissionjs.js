

var roleId = ''
var roleName=''
var _sourceDataTask_ID = ''
var _targetDataTask_ID = ''
var _targetHas_Items = ''

function getMenuDataItem(row) {
    const rowData = row && row.data;
    const menuItem = {
        menuCode: "",
        formName: "",
        formCode: "",
        projectCode: ""
    };
    if (rowData) {
        menuItem.menuCode = rowData.MenuCode;
        menuItem.formName = rowData.FormName;
        menuItem.formCode = rowData.FormCode;
        menuItem.projectCode = rowData.ProjectCode;

        // if(rowData.Task_Completion) {
        //     menuCode.progress = rowData.Task_Completion + "%";
        // }
    }
    return menuItem;
}

const loadGridRuleInRole = () => {
    var url = "RuleInRoleLoad/";
    // console.log(" url " + url + roleId);
    var listMenu = DevExpress.data.AspNet.createStore({
        key: "PermisionGroupCode",
        loadUrl: url + roleId,
       
        // insertUrl: url + "/InsertOrder",
        // updateUrl: url + "/UpdateOrder",
        // deleteUrl: url + "/DeleteOrder",
        onBeforeSend: function(method, ajaxOptions) {
            ajaxOptions.xhrFields = {
                withCredentials: true
            };
        }
    })

    $("#GridRuleInRole").dxDataGrid({
        dataSource: listMenu,
        // reshapeOnPush: true,
        columnsAutoWidth: true,
        height: 200,
        allowColumnReordering: true,
        rowAlternationEnabled: true,
        showBorders: true,
        focusedRowEnabled: true,
        rowDragging:{
            data: 1,
            group: "tasksGroup",
            onAdd: onAdd
        },
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
            mode: "virtual"
        },
        //phan trang
        // paging: {
        //     pageSize: 10
        // },
        columns: [
            , {
                dataField: "PermisionGroupCode",
                // dataType:"String",
                headerFilter: {
                    groupInterval: 100
                },
            }, {
                dataField: "PermisionGroupName",
                // dataType:"String",
            }, {
                dataField: "PermisionGroupDescription",
            },
            {
                dataField: "GroupUserCode",
            }
        ],
        onFocusedRowChanging: function(e) {
            var rowsCount = e.component.getVisibleRows().length,
                pageCount = e.component.pageCount(),
                pageIndex = e.component.pageIndex(),
                key = e.event && e.event.key;

            if (key && e.prevRowIndex === e.newRowIndex) {
                if (e.newRowIndex === rowsCount - 1 && pageIndex < pageCount - 1) {
                    e.component.pageIndex(pageIndex + 1).done(function() {
                        e.component.option("focusedRowIndex", 0);
                    });
                } else if (e.newRowIndex === 0 && pageIndex > 0) {
                    e.component.pageIndex(pageIndex - 1).done(function() {
                        e.component.option("focusedRowIndex", rowsCount - 1);
                    });
                }
            }
        },
        onFocusedRowChanged: function(e) {
            const menuCode = getMenuDataItem(e.row);
            _sourceDataTask_ID = menuCode.menuCode;
            // console.log("menuCode.subject " + menuCode.menuCode);
            // const focusedRowKey = e.component.option("focusedRowKey");
        }
    }).dxDataGrid("instance");

}

const loadGridRuleList = () => {
    var url = "ListPermisionGroupLoad/";
    // console.log(" url " + url + roleId);
    var listMenu = DevExpress.data.AspNet.createStore({
        key: "PermisionGroupCode",
        loadUrl: url + roleId,
        // insertUrl: url + "/InsertOrder",
        // updateUrl: url + "/UpdateOrder",
        // deleteUrl: url + "/DeleteOrder",
        onBeforeSend: function(method, ajaxOptions) {
            ajaxOptions.xhrFields = {
                withCredentials: true
            };
        }
    })

    $("#GridRuleList").dxDataGrid({
        dataSource: listMenu,
        // reshapeOnPush: true, //reload luoi khi drag drop
        columnsAutoWidth: true,
        height: 200,
        allowColumnReordering: true,
        rowAlternationEnabled: true,
        showBorders: true,
        focusedRowEnabled: true,
        rowDragging:{
            data: 2,
            group: "tasksGroup",
            onAdd: onAdd
        },
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
            mode: "virtual"
        },
        //phan trang
        // paging: {
        //     pageSize: 10
        // },
        columns: [
            , {
                dataField: "PermisionGroupCode",
                // dataType:"String",
                headerFilter: {
                    groupInterval: 100
                },
            }, {
                dataField: "PermisionGroupName",
                // dataType:"String",
            }, {
                dataField: "PermisionGroupDescription",
            }
        ],
        onFocusedRowChanging: function(e) {
            var rowsCount = e.component.getVisibleRows().length,
                pageCount = e.component.pageCount(),
                pageIndex = e.component.pageIndex(),
                key = e.event && e.event.key;

            if (key && e.prevRowIndex === e.newRowIndex) {
                if (e.newRowIndex === rowsCount - 1 && pageIndex < pageCount - 1) {
                    e.component.pageIndex(pageIndex + 1).done(function() {
                        e.component.option("focusedRowIndex", 0);
                    });
                } else if (e.newRowIndex === 0 && pageIndex > 0) {
                    e.component.pageIndex(pageIndex - 1).done(function() {
                        e.component.option("focusedRowIndex", rowsCount - 1);
                    });
                }
            }
        },
        onFocusedRowChanged: function(e) {
            const menuCode = getMenuDataItem(e.row);
            _sourceDataTask_ID = menuCode.menuCode;
            // console.log("menuCode.subject " + menuCode.menuCode);
            // const focusedRowKey = e.component.option("focusedRowKey");
        }
    }).dxDataGrid("instance");

}

const loadGridUserInRole  = () => {
    var url = "UserInRoleLoad/";
    console.log(" url " + url + roleId);
    var listMenu = DevExpress.data.AspNet.createStore({
        key: "UserID",
        loadUrl: url + roleId,
       
        // insertUrl: url + "/InsertOrder",
        // updateUrl: url + "/UpdateOrder",
        // deleteUrl: url + "/DeleteOrder",
        onBeforeSend: function(method, ajaxOptions) {
            ajaxOptions.xhrFields = {
                withCredentials: true
            };
        }
    })

    $("#GridUserInRole").dxDataGrid({
        dataSource: listMenu,
        // reshapeOnPush: true,
        columnsAutoWidth: true,
        height: 250,
        allowColumnReordering: true,
        rowAlternationEnabled: true,
        showBorders: true,
        focusedRowEnabled: true,
        rowDragging:{
            data: 3,
            group: "tasksGroup",
            onAdd: onAdd
        },
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
            mode: "virtual"
        },
        //phan trang
        // paging: {
        //     pageSize: 10
        // },
        columns: [
            , {
                dataField: "UserID",
                // dataType:"String",
                headerFilter: {
                    groupInterval: 100
                },
            }, {
                dataField: "UserName",
                // dataType:"String",
            }, {
                dataField: "FullName",
            },
            {
                dataField: "Email",
            },{
                dataField: "GroupUserCode",
            }

        ],
        onFocusedRowChanging: function(e) {
            var rowsCount = e.component.getVisibleRows().length,
                pageCount = e.component.pageCount(),
                pageIndex = e.component.pageIndex(),
                key = e.event && e.event.key;

            if (key && e.prevRowIndex === e.newRowIndex) {
                if (e.newRowIndex === rowsCount - 1 && pageIndex < pageCount - 1) {
                    e.component.pageIndex(pageIndex + 1).done(function() {
                        e.component.option("focusedRowIndex", 0);
                    });
                } else if (e.newRowIndex === 0 && pageIndex > 0) {
                    e.component.pageIndex(pageIndex - 1).done(function() {
                        e.component.option("focusedRowIndex", rowsCount - 1);
                    });
                }
            }
        },
        onFocusedRowChanged: function(e) {
            const menuCode = getMenuDataItem(e.row);
            _sourceDataTask_ID = menuCode.menuCode;
            // console.log("menuCode.subject " + menuCode.menuCode);
            // const focusedRowKey = e.component.option("focusedRowKey");
        }
    }).dxDataGrid("instance");

}

const loadGridUserList = () => {
    var url = "UserListLoad";
    // console.log(" url " + url + roleId);
    var listMenu = DevExpress.data.AspNet.createStore({
        key: "UserID",
        loadUrl: url,
        onBeforeSend: function(method, ajaxOptions) {
            ajaxOptions.xhrFields = {
                withCredentials: true
            };
        }
    })

    $("#GridUserList").dxDataGrid({
        dataSource: listMenu,
        // reshapeOnPush: true,
        columnsAutoWidth: true,
        height: 250,
        allowColumnReordering: true,
        rowAlternationEnabled: true,
        showBorders: true,
        focusedRowEnabled: true,
        rowDragging:{
            data: 4,
            group: "tasksGroup",
            onAdd: onAdd
        },
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
            mode: "virtual"
        },
        //phan trang
        // paging: {
        //     pageSize: 10
        // },
        columns: [
            , {
                dataField: "UserID",
                // dataType:"String",
                headerFilter: {
                    groupInterval: 100
                },
            }, {
                dataField: "UserName",
                // dataType:"String",
            }, {
                dataField: "FullName",
            },
            {
                dataField: "Email",
            },{
                dataField: "GroupUserCode",
            }

        ],
        onFocusedRowChanging: function(e) {
            var rowsCount = e.component.getVisibleRows().length,
                pageCount = e.component.pageCount(),
                pageIndex = e.component.pageIndex(),
                key = e.event && e.event.key;

            if (key && e.prevRowIndex === e.newRowIndex) {
                if (e.newRowIndex === rowsCount - 1 && pageIndex < pageCount - 1) {
                    e.component.pageIndex(pageIndex + 1).done(function() {
                        e.component.option("focusedRowIndex", 0);
                    });
                } else if (e.newRowIndex === 0 && pageIndex > 0) {
                    e.component.pageIndex(pageIndex - 1).done(function() {
                        e.component.option("focusedRowIndex", rowsCount - 1);
                    });
                }
            }
        },
        onFocusedRowChanged: function(e) {
            const menuCode = getMenuDataItem(e.row);
            _sourceDataTask_ID = menuCode.menuCode;
            // console.log("menuCode.subject " + menuCode.menuCode);
            // const focusedRowKey = e.component.option("focusedRowKey");
        }
    }).dxDataGrid("instance");

}

const MoveRuleInRole= (permisionGroupCode) =>{
    const data ={
        PermisionGroupCode:permisionGroupCode,
        RoleId:roleId
    }
    $.ajax({
        type:'POST',
        data:JSON.stringify(data),
        contentType:'application/json',
        url:'RolePermissionmoveRuleInRole',
        success: function (res) {
            if(!res.status){
                alert(res.mes);
            } else{
                LoadAllGrid()
            }
        }
    })
}

const DeleteRuleInRole= (permisionGroupCode) =>{
    const data ={
        PermisionGroupCode:permisionGroupCode,
        RoleId:roleId
    }
    $.ajax({
        type:'POST',
        data:JSON.stringify(data),
        contentType:'application/json',
        url:'RolePermissiondeleteRuleInRole',
        success: function (res) {
            if(!res.status){
                alert(res.mes);
            } else{
                LoadAllGrid()
            }
        }
    })
}

const MoveUserInRole= (userId) =>{
    console.log (' userId ' +userId);
    const data ={
        UserId:userId,
        RoleId:roleId
    }
    $.ajax({
        type:'POST',
        data:JSON.stringify(data),
        contentType:'application/json',
        url:'RolePermissionMoveUserInrRole',
        success: function (res) {
            if(!res.status){
                alert(res.mes);
            } else{
                LoadAllGrid()
            }
        }
    });
}

const DeleteUserInRole= (userId) =>{
    const data ={
        UserId:userId,
        RoleId:roleId
    }
    $.ajax({
        type:'POST',
        data:JSON.stringify(data),
        contentType:'application/json',
        url:'RolePermissionDeleteUserInRole',
        success: function (res) {
            if(!res.status){
                alert(res.mes);
            } else{
                LoadAllGrid()
            }
        }
    })
}


function onAdd(e) {
    var status= e.toData;
    var permisionGroupCode=e.itemData.PermisionGroupCode
    var userId=e.itemData.UserID
       console.log('permisionGroupCode ' +permisionGroupCode + ' userId ' +userId + '  status ' +status);
    if(status===1){
      if(userId){
          alert('Không thể move user ID ' + userId + ' vào Rule In Role')

      } else {
        var ds = $("#GridRuleInRole").dxDataGrid("getDataSource");
        MoveRuleInRole(permisionGroupCode);
      }
    }
    if(status === 2){
        if(userId){
            alert('Không thể move user ID ' + userId + ' vào Rule List')
        } else {
            DeleteRuleInRole(permisionGroupCode)
        }
    }
    if(status === 3){
        if(permisionGroupCode){
            alert('Không thể move Rule ID ' + permisionGroupCode + ' vào User in Role');
        } else {
            MoveUserInRole(userId)
        }
    }
    if(status===4){
        if(permisionGroupCode){
            alert('Không thể move Rule ID ' + permisionGroupCode + ' vào User List');
        } else {
            DeleteUserInRole(userId)
        }
    }
}

const SaveData = () => {
    var roleId= $('#txtRoleCode').val();
    var roleName= $('#txtRoleName').val();
    var status= $('#btnSave').val();

    const data = {
        RoleId:roleId,
        RoleName:roleName,
        Status:status
    }

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'RolePermissionUpdate',
        success: function(res) {
            if (!res.status) {
                alert(res.mes);
                $('#modalAddUpdate').modal('show');
            } else {
                alert(res.mes);
                $('#modalAddUpdate').modal('hide');
                location.reload();
            }
        }
    });
}

const DeleteData = (roleId) => {
    // var roleId= $('#txtRoleCode').val();
    // console.log('roleId ' + roleId);
    const data = {
        RoleId:roleId,
    }

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'RolePermissionDelete',
        success: function(res) {

            if (!res.status) {
                alert(res.mes);
                $('#modalAddUpdate').modal('show');
            } else {
                alert(res.mes);
               location.reload();
            }
        }
    });
}

const searchBoxRole = () => {
  const selectBoxData = DevExpress.data.AspNet.createStore({
    key: "GroupUserCode",
    loadMode: "raw",
    loadUrl: "wacoal_ListUserGroup_Load_Web_V2",
  });

  $("#searchBoxRole")
    .dxSelectBox({
      dataSource: selectBoxData,
      displayExpr: "GroupUserDescription",
      valueExpr: "GroupUserCode",
      searchEnabled: true,
      searchExpr: "GroupUserDescription",
      searchMode: "contains",
      searchTimeout: 400,
      minSearchLength: 0,
      showDataBeforeSearch: false,
      value: roleId,
      onValueChanged: function (e) {
        let arrRole = e.value.split("_");
        roleId = arrRole[0].toString();
        roleName = arrRole[1].toString();
        LoadAllGrid()
    
      },
    })
    .dxSelectBox("instance");
};
const LoadAllGrid=()=>{
    loadGridRuleInRole()
        loadGridRuleList()
        loadGridUserInRole()
        loadGridUserList()
}
const resetForm = () => {
    //show modal
    $('#modalAddUpdate').modal('show');
    $('#btnSave').val("submitInsert");
    $('#txtRoleCode').removeAttr("readonly")
    $('#modalAddUpdate').on('shown.bs.modal', function() {
            $('#txtRoleCode').focus();
        })
    $('#txtRoleCode').val('');
    $('#txtRoleName').val('');
  };

const editForm=()=>{
    // var roleName=    $( "#selectRoleId option:selected" ).text();
    // var roleId=    $("#selectRoleId").val();
    // console.log('roleName ' + roleName + ' roleId ' +roleId)
    $('#txtRoleCode').val(roleId);
    $('#txtRoleName').val(roleName);
    $('#modalAddUpdate').modal('show');
    $('#btnSave').val("submitUpdate");
    $('#txtRoleCode').attr("readonly","true");
  
    $('#modalAddUpdate').on('shown.bs.modal', function() {
        $('#txtRoleName').focus();
    })
}

const deleteForm=()=>{
    if (!confirm("Are you sure you want to Delete role "  + roleName )) {} else {
        DeleteData(roleId);
    }
}

const Reload = () => {
    roleId=''
    roleName=''
  searchBoxRole();
  $('.addButton').dxButton({
    icon:'add',
    text: 'New Role',
    onClick: resetForm,
  });
  $('.editButton').dxButton({
    icon:'edit',
    text: 'Edit Role',
    onClick: editForm,
  });
  $('.deleteButton').dxButton({
    icon:'remove',
    text: 'delete Role',
    onClick: deleteForm,
  });
  $('#btnSave').click((e) => {
    e.preventDefault();
    SaveData();
});
};

$(function() {
    Reload();
});