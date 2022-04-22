var _positionsCode = '';
var _positionsName = '';
var _positionsDescription='';
var _positionsCodeSTRNext='';

const editData = () => {
         //show modal
 
     $('#btnSave').val("submitEdit");
     $('#txtPositionsCode').val(_positionsCode);
     $('#txtPositionsName').val(_positionsName);
     $('#txtPositionsDescription').val(_positionsDescription);
     $('#modalAddUpdate').modal('show');
     $('#txtPositionsCode').attr("readonly","true") 
     $('#modalAddUpdate').on('shown.bs.modal', function () {
        $('#txtPositionsName').focus();
     }) 
 
}
const resetForm = () => {
    $('#modalAddUpdate').modal('show');
        $('#btnSave').val("submitInsert");
        $('#modalAddUpdate').on('shown.bs.modal', function () {
            $('#txtPositionsName').focus();
        }) 
    $('#txtPositionsCode').attr("readonly","true") 
    $('#txtPositionsCode').val(_positionsCodeSTRNext);
    $('#txtPositionsName').val('');
    $('#txtPositionsDescription').val('');
}

const GetpositionsCodeSTRNext=()=>{
    $.ajax({
        type: 'GET',
        // data: JSON.stringify(data),
        // contentType: 'application/json',
        url: '/admin/ListPositions_PositionsCodeGetNext',
        success: function(res) {
            if (res.status) {
                _positionsCodeSTRNext=res.data[0].PositionsCodeSTRNext
            } else {
                console.log(JSON.stringify(res));
                alert( res);
            }
        }
    });
}

const saveData = () => {
        var positionsCode = $('#txtPositionsCode').val();
        var positionsName = $('#txtPositionsName').val();
        var positionsDescription = $('#txtPositionsDescription').val();
        var status=$('#btnSave').val();

        var data = {
            PositionsCode: positionsCode,
            PositionsName: positionsName,
            PositionsDescription: positionsDescription,
            Status:status
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/admin/positionlist',
            success: function(res) {
                if (res.status) {
                    DevExpress.ui.notify({
                        message: res.mes,
                        width: 450
                    },"success",5000)
                 
                    $('#modalAddUpdate').modal('hide');
                    GridPositionLoad()
                    GetpositionsCodeSTRNext()
                } else {
                    DevExpress.ui.notify({
                        message: res.mes,
                        width: 450
                    },"error",5000)
                }
            }
        });

    }

    const deleteData = () => {
        var data={
            PositionsCode:_positionsCode,
        };
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/admin/positionlist/Deletepositionlist',
            success: (res) =>{
                if(res.status){
                    DevExpress.ui.notify({
                        message: res.mes,
                        width: 450
                    },"success",5000)
                    location.reload();
                }
                else{
                    DevExpress.ui.notify({
                        message: res.mes,
                        width: 450
                    },"error",5000)
                }
            }
        });
    }
    function getCompanyDataItem(row) {
        const rowData = row && row.data;
        if (rowData) {
            _positionsCode = rowData.PositionsCode;
            _positionsName = rowData.PositionsName;
            _positionsDescription = rowData.PositionsDescription;
        }
      }    

    const GridPositionLoad = () => {
        var url = "ListPositions_Load_Web_V1";
        //   console.log(" url " + url + roleId);
        var listMenu = DevExpress.data.AspNet.createStore({
          key: "PositionsCode",
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
      
        $("#GridPosition")
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
                caption: "PositionsCode",
                alignment: "left",
                dataField: "PositionsCode",
              },
              {
                caption: "PositionsName",
                alignment: "left",
                dataField: "PositionsName",
              },
              {
                caption: "PositionsDescription",
                alignment: "left",
                dataField: "PositionsDescription",
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
               getCompanyDataItem(e.row);
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

    //ham khoi tao: goi tat ca cac ham khac trong day
$(document).ready(function() {
    GridPositionLoad()
    GetpositionsCodeSTRNext()

    // $('#btnAddNew').click(function() {
      
    //     // console.log('test ' +test);
    //     resetForm();
    // });

    // $('#btnedit').click(function() {
   
    //     editData();
    // });

    $('#btnSave').click(function(e) {
        e.preventDefault();
        // console.log('select_link clicked');
        saveData();
    });

    // $('#btnDeleteId').click((e) =>{
    //     e.preventDefault();
    //     if (!confirm("Are you sure you want to Delete selected row?")){
    //     }else{
    //         deleteData();
    //     }
      
    // })

});

