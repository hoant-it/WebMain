

let _LINE=''


const GridViewLine = () => {

    var url = "wacoal_Line_Load_Web_V1";
    // console.log(" url " + url + oderNo+khachHang);
    var listTinhChi = DevExpress.data.AspNet.createStore({
        key: "MACHUYEN",
        loadUrl: url,
        onBeforeSend: function(method, ajaxOptions) {
            ajaxOptions.xhrFields = {
                withCredentials: true
            };
        }
    })

    $("#GridLine").dxDataGrid({
        dataSource: listTinhChi,
        //phan trang
        paging: {
            pageSize: 10
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [10, 25, 50, 100]
        },
        // reshapeOnPush: true,
        columnsAutoWidth: true,
        height: 700,
        allowColumnReordering: true,
        rowAlternationEnabled: true,
        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        columnAutoWidth: true,
        // export:{
        //     enabled: true
        // },
  
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
        // scrolling: {
        //     mode: "virtual"
        // },
        
        columns: [
            {
                dataField: "MACHUYEN",
                caption: "Mã Chuyền",
                alignment: "left",
            },
              
        ],
        onToolbarPreparing: function(e) {
            // var dataGrid = e.component;

            e.toolbarOptions.items.unshift(
            //     {
            //     location: "alter",
            //     template: function(){
            //         return $("<div/>")
            //             .addClass("informer")
            //             .append(
            //              `
            //              <form action="/kho/MauChiMauNLInput" method="POST" enctype="multipart/form-data" id="frmUpload">
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

            });
        },
        
      
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
            const LineData = getLineDataItem(e.row);
            _LINE = LineData.Line;
           
        
           
        }
    }).dxDataGrid("instance");

}

function getLineDataItem(row) {
    const rowData = row && row.data;
    const LineItem = {
        Line: "",
   
    };
    if(rowData) {
        LineItem.Line = rowData.MACHUYEN;
   
      
    }
    return LineItem;
}

const resetForm = () => {
    $('#modalAddUpdate').modal('show');
        $('#btnSave').val("submitInsert");
        $('#modalAddUpdate').on('shown.bs.modal', function () {
            $('#txtLine').focus();
        }) 
    $('#txtLine').removeAttr("readonly") 

    $('#txtLine').val('');


  
}

const EditForm = () => {
    $('#modalAddUpdate').modal('show');
        $('#btnSave').val("submitEdit");
        $('#txtLine').val(_LINE) 
}



const deleteData=() => {
    let data={
        line:_LINE,
    };

    $.ajax({
        type:'POST',
        data:JSON.stringify(data),
        contentType:'application/json',
        url:'Line_Delete_Web_V1',
        success: (res) =>{
            if(res.statusErr){
                DevExpress.ui.notify({
                    message: res.errMes,
                    width: 450
                },"success",5000),
                // alert(res.errMes);
                $('#modalAddUpdate').modal('hide');
                GridViewLine();
            } else{
                DevExpress.ui.notify({
                    message: res.errMes,
                    width: 450
                },"error",5000)
                // alert(res.errMes);
            }
        }
    })

}

const SaveData = () => {
    
    let data = {
        line: $('#txtLine').val(),
        lineOld:_LINE,      
        status: $('#btnSave').val()
    };

    $.ajax({
        type:'POST',
        data:JSON.stringify(data),
        contentType: 'application/json',
        url:'LineUpdate',
        success: (res) => {
            if(res.statusErr){
                $('#modalAddUpdate').modal('hide');
                DevExpress.ui.notify({
                    message: res.errMes,
                    width: 450
                },"success",5000), //error,success,warning
                // alert(res.errMes);
                GridViewLine();
            } else{
                DevExpress.ui.notify({
                    message: res.errMes,
                    width: 450
                },"error",5000)
                // alert(res.errMes);
            }
        }

    })

}

// const upload=()=>{
//     // let formData=new FormData($("frmUpload"));
//     let formData  =new FormData(document.getElementById("frmUpload"));
//     // for(let i=0; i<this.files.length;i++){
//     //     formData.append('file',this.files[i]);
//     // }
//   let fileName=  $('#filename').val();
//     //   let data ={
//     //     fileName:fileName
//     //   }
//   if(fileName==="" ){
//     DevExpress.ui.notify({
//         message: "Chọn file trước khi nhập",
//         width: 450
//     },"warning",5000)
//   } else{
//       console.log(fileName);
//       $.ajax({
//           type:"POST",
//         //   data:JSON.stringify(data),
//         data:formData,
//         //   contentType:"application/json" ,
//           contentType:false ,
//           url:"/kho/MauChiMauNLInput",
//           cache: false, 
//           processData:false,
//           success:(res)=>{

//               if(res.statusErr){
//                 DevExpress.ui.notify({
//                     message: res.errMes,
//                     width: 450
//                 },"success",5000)

//               } else{
//                 DevExpress.ui.notify({
//                     message: res.errMes,
//                     width: 450
//                 },"error",5000)

//               }

//           }
//       })

//   }


// }

const loadTooltip=(id,targetButton)=>{
    $(`#${id}`).dxTooltip({
        target: `#${targetButton}`,
        showEvent: "mouseenter",
        hideEvent: "mouseleave",
        closeOnOutsideClick: false
    }); 
}

$(function Main() {
   
    GridViewLine();

    loadTooltip("tooltipUpload","btnUpload");
    loadTooltip("tooltiAdd","btnAdd");
    loadTooltip("tooltiEdit","btnEdit");
    loadTooltip("tooltiDelete","btnDelete");
    $('#btnSave').click((e) => {
        e.preventDefault();
        SaveData();
    })
});

  
       