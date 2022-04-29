

var rulecode = '';
var ruleName='';
var _sourceDataTask_ID = '';
var _targetDataTask_ID = '';
var _targetHas_Items = '';

const UpdateDataTreeList = (sourceDataTask_ID, targetDataTask_ID, targetHas_Items, dropInsideItem, status) => {

    var data = {
        SourceDataTask_ID: sourceDataTask_ID,
        TargetDataTask_ID: targetDataTask_ID,
        TargetHas_Items: targetHas_Items,
        DropInsideItem: dropInsideItem,
        Rulecode: rulecode,
        Status: status
    };

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'MenuPermissionUpdate',
        success: function(res) {
            if (res.reload) {
                if (!res.status) {
                    alert(res.mes);
                } else {
                    // rulecode = $('#selectRuleId').val();
                    loadTree();
                    loadGridMenu();
                }
            } else {
                if (!res.status) {
                    alert(res.mes);
                }
            }
        }
    });

}

const loadTree = () => {
    var urlTree = "wacoal_ListMenu_By_Rule_Load_Web_v2/" + rulecode;
    var treeList,
        taskEmployees = DevExpress.data.AspNet.createStore({
            key: "Task_ID",
            loadUrl: urlTree,
            // reshapeOnPush: true,
            // loadUrl: url + `/treelist/${rulecode}`,
            // insertUrl: url + "/InsertTask",
            // updateUrl: url + "/UpdateTask",
            // deleteUrl: url + "/DeleteTask",
            // onBeforeSend: function(method, ajaxOptions) {
            //     ajaxOptions.xhrFields = { withCredentials: true };
            // }
        });

    treeList = $("#tree-list").dxTreeList({
        dataSource: taskEmployees,
        height:555,
    
        // drag & drop
        rootValue: "0",
        keyExpr: "Task_ID",
        rowDragging: {
            // data: 2,
            // group: "tasksGroup",
            // onAdd: onAdd(),
            allowDropInsideItem: true,
            allowReordering: true,
            showDragIcons: true,
            onDragChange: function(e) {
                var visibleRows = e.fromComponent.getVisibleRows(),
                    sourceNode = e.fromComponent.getNodeByKey(e.itemData.Task_ID),
                    targetNode = visibleRows[e.toIndex].node;

                while (targetNode && targetNode.data) {
                    if (targetNode.data.Task_ID === sourceNode.data.Task_ID) {
                        e.cancel = true;
                        break;
                    }
                    targetNode = targetNode.parent;
                }
            },
            onReorder: function(e) {
                // console.log(JSON.stringify(taskEmployees));
                var visibleRows = e.component.getVisibleRows(),
                    sourceData = e.itemData,
                    targetData = visibleRows[e.toIndex].data,
                    dropInsideItem,
                    sourceDataTask_ID = sourceData.Task_ID;
                targetDataTask_ID = targetData.Task_ID;
                targetHas_Items = targetData.Has_Items;
                var status = ''
                    // console.log( 'sourceData '+ sourceData.Task_Parent_ID+' targetData '+ targetData.Task_ID)
                if (e.dropInsideItem) {
                    dropInsideItem = true;
                    // console.log( 'sourceData '+ sourceDataTask_ID+' targetData '+ targetDataTask_ID + " targetHas_Items " +targetHas_Items)
                    UpdateDataTreeList(sourceDataTask_ID, targetDataTask_ID, targetHas_Items, dropInsideItem, status);
                } else {
                    dropInsideItem = false;
                    // console.log( 'sourceData '+ sourceData.Task_ID+' targetData '+ targetData.Task_ID + " rulecode " +rulecode)
                    UpdateDataTreeList(sourceDataTask_ID, targetDataTask_ID, targetHas_Items, dropInsideItem, status);
                    //     var sourceIndex = ds.indexOf(sourceData),
                    //         targetIndex = taskEmployees.indexOf(targetData);

                    //         // console.log( 'treeList '+ ds+ 'sourceIndex ' + sourceIndex +'targetIndex'+ targetIndex);

                    //     if (sourceData.Task_Parent_ID !== targetData.Task_Parent_ID) {
                    //         sourceData.Task_Parent_ID = targetData.Task_Parent_ID;
                    //         if (e.toIndex > e.fromIndex) {
                    //             targetIndex++;
                    //         }
                }

                //     taskEmployees.splice(sourceIndex, 1);
                //     taskEmployees.splice(targetIndex, 0, sourceData);
                // }

                e.component.refresh();
            }
        },

        // remoteOperations: { 
        //     filtering: true,
        //     sorting: true,
        //     grouping: true
        // },
        parentIdExpr: "Task_Parent_ID",
        hasItemsExpr: "Has_Items",
        focusedRowEnabled: true,
        focusedRowKey: 1,
        autoExpandAll: true,

        // expandedRowKeys: [1, 2],
        searchPanel: {
            visible: true
        },
        scrolling: {
            mode: "virtual"
        },
     
        // headerFilter: {
        //     visible: true
        // },
        // editing: {
        //     mode: "row",
        //     allowAdding: true,
        //     allowUpdating: true,
        //     allowDeleting: true
        // },
        showRowLines: true,
        showBorders: true,
        columnAutoWidth: true,
        wordWrapEnabled: true,
        columns: [
            // {
            //     dataField: "Task_ID",
            //     caption:"ID",
            //     // dataType:"String",
            //     minWidth: 250,
            //     validationRules: [{ type: "required" }]
            // }, 
            // {
            //     dataField: "Task_Parent_ID",
            //     caption:"Task_Parent_ID",
            //     // dataType:"String",
            //     minWidth: 250,
            //     validationRules: [{ type: "required" }]
            // }, 
            {
                dataField: "FormName",
                // dataType:"String",
                minWidth: 250,
                alignment: "left",
                validationRules: [{
                    type: "required"
                }]
            }, {
                dataField: "FormCode",
                // dataType:"String",
                minWidth: 250,
                validationRules: [{
                    type: "required"
                }]
            }, {
                dataField: "ProjectCode",
                // dataType:"String",
                minWidth: 250,
                validationRules: [{
                    type: "required"
                }]
            },
            // { 
            //     dataField: "Task_Assigned_Employee_ID",
            //     caption: "Assigned",
            //     minWidth: 120,
            //     lookup: {
            //         dataSource: DevExpress.data.AspNet.createStore({
            //             key: "ID",
            //             loadUrl: url + "/TaskEmployees"
            //         }),
            //         valueExpr: "ID",
            //         displayExpr: "Name"
            //     },
            //     validationRules: [{ type: "required" }]
            // },
            //  { 
            //     dataField: "Task_Status",
            //     caption: "Status",
            //     minWidth: 120,
            //     lookup: {
            //         dataSource: [
            //             "Not Started",
            //             "Need Assistance",
            //             "In Progress",
            //             "Deferred",
            //             "Completed"
            //         ]
            //     } 
            // }, 
            // {
            //     dataField: "Task_Start_Date",
            //     caption: "Start Date",
            //     dataType: "date"
            // }, 
            // {
            //     dataField: "Task_Due_Date",
            //     caption: "Due Date",
            //     dataType: "date"
            // }
        ],
        onToolbarPreparing: function (e) {
            // var dataGrid = e.component;
    
            e.toolbarOptions.items.unshift(
              {
                location: "alter",
                widget: "dxButton",
                options: {
                  icon: "movetofolder",
                  text: "Move Inside",
                  onInitialized: function (e) {
                    e.element.attr("id", "btnMoveInside");
                    e.element.attr("value", "submitMoveInside");
                  },
                  onClick: function () {
                    // console.log("clicker")
                    moveInside()
                    // mauChiMauNL.resetForm();
                  },
                },
              },
              {
                location: "alter",
                widget: "dxButton",
                options: {
                  icon: "parentfolder",
                  text: "Move Outside",
                  onInitialized: function (e) {
                    e.element.attr("id", "btnMoveOutSide");
                    e.element.attr("value", "submitMoveOutSide");
                  },
                  onClick: function () {
                    // console.log("clicker")
                    moveOutside();
                  },
                },
              },
              {
                location: "alter",
                widget: "dxButton",
                options: {
                  icon: "deleterow",
                  text: "Delete Row",
                  onInitialized: function (e) {
                    e.element.attr("id", "btnDeleteId");
                    e.element.attr("value", "submitDelete");
                  },
                  onClick: function () {
                        deleteRowInRule();
                  },
                },
              }
            );
          },
        onFocusedRowChanged: function(e) {
                var rowData = e.row && e.row.data
                    // ,
                    // cellValue,
                    // formName
                ;
                if (rowData) {
                    // console.log(rowData);
                    // cellValue = e.component.cellValue(e.row.rowIndex, "Assigned");
                    // taskEmployees.byKey(cellValue).done(function(item) {
                    //     assigned = item.FormName;
                    // });

                    _targetDataTask_ID = rowData.Task_ID;
                    _targetHas_Items = rowData.Has_Items;

                    // $(".task-subject").html(rowData.Task_ID);

                    // $(".task-assigned").html(rowData.FormName);
                    // $(".start-date").html(new Date(rowData.Task_Start_Date).toLocaleDateString());

                    // $(".task-status").html(rowData.FormCode);

                    // var progress = rowData.Task_Completion ? rowData.Task_Completion + "%" : "";
                    // $(".task-progress").text(progress);
                }
            }
            // onInitNewRow: function(e) {
            //     e.data.Task_Status = "Not Started";
            //     e.data.Task_Start_Date = new Date();
            //     e.data.Task_Due_Date = new Date();
            // }
    }).dxTreeList("instance");

}

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

const loadGridMenu = () => {


    var url = "MenuListLoadWeb/";
    // console.log(" url " + url + rulecode);
    var listMenu = DevExpress.data.AspNet.createStore({
        key: "MenuCode",
        loadUrl: url + rulecode,
        // reshapeOnPush: true,
        // insertUrl: url + "/InsertOrder",
        // updateUrl: url + "/UpdateOrder",
        // deleteUrl: url + "/DeleteOrder",
        onBeforeSend: function(method, ajaxOptions) {
            ajaxOptions.xhrFields = {
                withCredentials: true
            };
        }
    })

    $("#grid").dxDataGrid({
        dataSource: listMenu,
        columnsAutoWidth: true,
        height: 555,
        allowColumnReordering: true,
        rowAlternationEnabled: true,
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
            // {
            //     dataField: "MenuCode",
            //     // dataType:"String",
            //     caption: "MenuCode",
            //     // validationRules: [{
            //     //     type: "stringLength",
            //     //     message: "The field Customer must be a string with a maximum length of 5.",
            //     //     max: 5
            //     // }],
            //     // lookup: {
            //     //     dataSource: DevExpress.data.AspNet.createStore({
            //     //         key: "Value",
            //     //         loadUrl: url + "/CustomersLookup",
            //     //         onBeforeSend: function(method, ajaxOptions) {
            //     //             ajaxOptions.xhrFields = { withCredentials: true };
            //     //         }
            //     //     }),
            //     //     valueExpr: "Value",
            //     //     displayExpr: "Text"
            //     // }
            // }, 
            //kieu ngay thang
            // { 
            //     dataField: "OrderDate",
            //     dataType: "date",
            //     validationRules: [{
            //         type: "required",
            //         message: "The OrderDate field is required."
            //     }]
            // }
            , {
                dataField: "FormName",
                // dataType:"String",
                headerFilter: {
                    groupInterval: 100
                },
                //kiem tra 
                // validationRules: [{
                //     type: "range",
                //     message: "The field Freight must be between 0 and 2000.",
                //     min: 0,
                //     max: 2000
                // }]
            }, {
                dataField: "FormCode",
                // dataType:"String",
                validationRules: [{
                    type: "stringLength",
                    message: "The field ShipCountry must be a string with a maximum length of 15.",
                    max: 15
                }]
            }, {
                dataField: "ProjectCode",
                // dataType:"String",
                //chen caption
                // caption: "Shipping Company",
                //format kieu du lieu
                // dataType: "number",
                // lookup: {
                //     dataSource: DevExpress.data.AspNet.createStore({
                //         key: "Value",
                //         loadUrl: url + "/ShippersLookup",
                //         onBeforeSend: function(method, ajaxOptions) {
                //             ajaxOptions.xhrFields = { withCredentials: true };
                //         }
                //     }),
                //     valueExpr: "Value",
                //     displayExpr: "Text"
                // }
            }
        ],

        //hien thi thong tin cha con
        // masterDetail: {
        //     enabled: true,
        //     template: function(container, options) { 
        //         $("<div>")
        //             .dxDataGrid({
        //                 dataSource: DevExpress.data.AspNet.createStore({
        //                     loadUrl: url + "/OrderDetails",
        //                     loadParams: { orderID : options.data.OrderID },
        //                     onBeforeSend: function(method, ajaxOptions) {
        //                         ajaxOptions.xhrFields = { withCredentials: true };
        //                     }
        //                 }),
        //                 showBorders: true
        //             }).appendTo(container);
        //     }
        // },
        //them xoa sua event
        // editing: {
        //     allowAdding: true,
        //     allowUpdating: true,
        //     allowDeleting: true
        // },
        // thuoc tinh mo rong neu co group
        // grouping: {
        //     autoExpandAll: false
        // },
        //summary ( tinh tong theo cot)
        // summary: {
        //     totalItems: [{
        //         column: "Freight",
        //         summaryType: "sum"
        //     }],
        //     groupItems: [{
        //             column: "Freight",
        //             summaryType: "sum"
        //         }, {
        //             summaryType: "count"
        //         }
        //     ]
        // }
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

            // $("#taskSubject").html(menuCode.formName);
            // $("#taskDetails").html(menuCode.formCode);
            // $("#taskStatus").html(menuCode.projectCode);
            // $("#taskProgress").text(menuCode.progress);
            // $("#taskId").dxNumberBox("instance").option("value", focusedRowKey);
        }
    }).dxDataGrid("instance");

}

function onAdd(e) {
    var key = e.itemData.Task_ID,
        values = {
            Status: e.toData
        };

    store.update(key, values).then(function() {
        store.push([{
            type: "update",
            key: key,
            data: values
        }])
    });
}

const SaveData = () => {
    var ruleCode= $('#txtRuleCode').val();
    var ruleName= $('#txtRuleName').val();
    var status= $('#btnSave').val();

    const data = {
        RuleCode:ruleCode,
        RuleName:ruleName,
        Status:status
    }

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'MenupermissionUpdateRule',
        success: function(res) {
            if (!res.status) {
                alert(res.mes);
                $('#modalAddUpdate').modal('show');
            } else {
                alert(res.mes);
                $('#modalAddUpdate').modal('hide');
               location.reload()
            }
        }
    });
}

const DeleteData = (ruleId) => {
    // var ruleCode= $('#txtRuleCode').val();
    // console.log('ruleCode ' + ruleCode);
    const data = {
        RuleCode:ruleId,
    }

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'MenupermissionDeleteRule',
        success: function(res) {
            if (!res.status) {
                // console.log(JSON.stringify(res));
                alert(res.mes);
                $('#modalAddUpdate').modal('show');
            } else {
                alert(res.mes);
               location.reload()
            }
        }
    });
}

const PermisionGroup=() =>{
    const selectBoxData =  DevExpress.data.AspNet.createStore({
        key: "PermisionGroupCode",
        loadMode:"raw",
        loadUrl:"wacoal_PermisionGroupCode_load_Web_v2",
    });

    $("#searchBoxRule").dxSelectBox({
        dataSource:selectBoxData,
        displayExpr: 'PermisionGroupDescription',
        valueExpr: "PermisionGroupCode",
        searchEnabled: true,
        searchExpr:'PermisionGroupDescription',
        searchMode:'contains',
        searchTimeout:400,
        minSearchLength:0,
        showDataBeforeSearch:false,
        value:rulecode,
        onValueChanged: function(e) {
            let arrRule=e.value.split('_')
            rulecode =arrRule[0].toString()
            ruleName =arrRule[1].toString()
            // ruleName=displayExpr
            loadTree()
            loadGridMenu()
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
    }).dxSelectBox("instance");
      
}

const ReLoad=()=>{
    PermisionGroup()
   
    $('.addButton').dxButton({
        icon:'add',
        text: 'New Rule',
        onClick: resetForm,
      });
      $('.editButton').dxButton({
        icon:'edit',
        text: 'Edit Rule',
        onClick: editForm,
      });
      $('.deleteButton').dxButton({
        icon:'remove',
        text: 'delete Rule',
        onClick: deleteForm,
      });
}
const editForm=()=>{
    // var ruleName= ''
    $('#txtRuleCode').val(rulecode);
    $('#txtRuleName').val(ruleName);
    $('#modalAddUpdate').modal('show');
    $('#btnSave').val("submitUpdate");
    $('#txtRuleCode').attr("readonly","true");
  
    $('#modalAddUpdate').on('shown.bs.modal', function() {
        $('#txtRuleName').focus();
    })
}
const resetForm=()=>{
   //show modal
   $('#modalAddUpdate').modal('show');
   $('#btnSave').val("submitInsert");
   $('#txtRuleCode').removeAttr("readonly")
   $('#modalAddUpdate').on('shown.bs.modal', function() {
           $('#txtRuleCode').focus();
       })
   $('#txtRuleCode').val('');
   $('#txtRuleName').val('');
}
const deleteForm=()=>{
    if (!confirm("Are you sure you want to Delete rule " + rulecode + " - " + ruleName )) {} else {
        DeleteData(rulecode);
    }
}
 const moveInside=()=>{
    var dropInsideItem = true;
    var status = 'submitMoveInside';
    // console.log('_targetDataTask_ID ' + _targetDataTask_ID + ' _sourceDataTask_ID ' + _sourceDataTask_ID + ' _targetHas_Items ' + _targetHas_Items + ' status ' + status + " dropInsideItem " + dropInsideItem);
    UpdateDataTreeList(_sourceDataTask_ID, _targetDataTask_ID, _targetHas_Items, dropInsideItem, status);
 }

 const moveOutside=()=>{
    var dropInsideItem = false;
    var status = 'submitMoveOutSide'
    UpdateDataTreeList(_sourceDataTask_ID, _targetDataTask_ID, _targetHas_Items, dropInsideItem, status);
 }
 const deleteRowInRule=()=>{
    if (!confirm("Are you sure you want to Delete selected row?")) {} else {
        var dropInsideItem = true;
        var status = 'submitDelete';
        //truong hop delete lay _targetDataTask_ID
        UpdateDataTreeList(_sourceDataTask_ID, _targetDataTask_ID, _targetHas_Items, dropInsideItem, status);
    }
 }

$(function() {
    ReLoad()
    $('#btnSave').click((e) => {
        e.preventDefault();
        SaveData();
    });

});