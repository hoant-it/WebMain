


let _MAMAY='',
_KYHIEUMAY='',
_LOAIMAY='',
_VITRICHI='',
_HESOALPHA='',
_HESOBETA='',
_CONGTHUCTINHCHI='',
_NOTE=''

const GridViewLoaiMayCongThuc = () => {

    var url = "wacoal_LOAIMAYCT_Load_Web_V1";
    // console.log(" url " + url + oderNo+khachHang);
    var listTinhChi = DevExpress.data.AspNet.createStore({
        key: "MAMAY",
        loadUrl: url,
        onBeforeSend: function(method, ajaxOptions) {
            ajaxOptions.xhrFields = {
                withCredentials: true
            };
        }
    })

    $("#GridLoaiMayCongThuc").dxDataGrid({
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
                dataField: "MAMAY",
                caption: "MAMAY",
                alignment: "left",
            },
            {
                dataField: "KYHIEUMAY",
                caption: "KYHIEUMAY",
                alignment: "center",
            },
            {
                dataField: "LOAIMAY",
                caption: "LOAIMAY",
                alignment: "left",
            },
            {
                dataField: "VITRICHI",
                caption: "VITRICHI",
                alignment: "center",
            },
            {
                dataField: "HESOALPHA",
                caption: "HESOALPHA",
                alignment: "right",
            },
            {
                dataField: "HESOBETA",
                caption: "HESOBETA",
                alignment: "right",
            },
            {
                dataField: "CONGTHUCTINHCHI",
                caption: "CONGTHUCTINHCHI",
                alignment: "left",
            },
            {
                dataField: "NOTE",
                caption: "NOTE",
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

            const rowData= e.row && e.row.data

            _MAMAY=rowData.MAMAY
            _KYHIEUMAY=rowData.KYHIEUMAY
            _LOAIMAY=rowData.LOAIMAY
            _VITRICHI=rowData.VITRICHI
            _HESOALPHA= rowData.HESOALPHA 
            _HESOBETA=rowData.HESOBETA
            _CONGTHUCTINHCHI=rowData.CONGTHUCTINHCHI
            _NOTE=rowData.NOTE
        
          
        }
    }).dxDataGrid("instance");

}



const resetForm = () => {
    $('#modalAddUpdate').modal('show');
        $('#btnSave').val("submitInsert");
        $('#modalAddUpdate').on('shown.bs.modal', function () {
            txtMAMAY.focus();
           
        }) 
        txtMAMAY.option('readOnly',false)

    txtMAMAY.option('value','')
    txtKYHIEUMAY.option('value','')
    txtLOAIMAY.option('value','')
    txtVITRICHI.option('value','')
    iHESOALPHA.option('value','');
    iHESOBETA.option('value','');
    txtCongThucTinhChi.option('value','')
    txtNOTE.option('value','')
  
}

const EditForm = () => {
    $('#modalAddUpdate').modal('show');
        $('#btnSave').val("submitEdit");
        $('#modalAddUpdate').on('shown.bs.modal', function () {
            txtLOAIMAY.focus();
            // $('#txtMauChi').focus();
        }) 
        txtMAMAY.option('value',_MAMAY)
        txtMAMAY.option('readOnly',true)
        txtKYHIEUMAY.option('value',_KYHIEUMAY)
        txtLOAIMAY.option('value',_LOAIMAY)
        txtVITRICHI.option('value',_VITRICHI)
        iHESOALPHA.option('value',_HESOALPHA);
        iHESOBETA.option('value',_HESOBETA);
        txtCongThucTinhChi.option('value',_CONGTHUCTINHCHI)
        txtNOTE.option('value',_NOTE)
   
}

const deleteData=() => {
    let data={
        MAMAY: _MAMAY,
    };

    $.ajax({
        type:'POST',
        data:JSON.stringify(data),
        contentType:'application/json',
        url:'wacoal_LOAIMAYCT_Delete_Web_V1',
        success: (res) =>{
            if(res.statusErr){
                DevExpress.ui.notify({
                    message: res.errMes,
                    width: 450
                },"success",5000),
                // alert(res.errMes);
                $('#modalAddUpdate').modal('hide');
                GridViewLoaiMayCongThuc();
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
        MAMAY: txtMAMAY.option('value'),
        KYHIEUMAY:txtKYHIEUMAY.option('value'),
        LOAIMAY: txtLOAIMAY.option('value'),
        VITRICHI:txtVITRICHI.option('value'),
        HESOALPHA:iHESOALPHA.option('value'),
        HESOBETA:iHESOBETA.option('value'),
        CONGTHUCTINHCHI:txtCongThucTinhChi.option('value'),
        NOTE:txtNOTE.option('value'),
        status : $("#btnSave").val()
    };

    $.ajax({
        type:'POST',
        data:JSON.stringify(data),
        contentType: 'application/json',
        url:'LOAIMAYCTUpdate',
        success: (res) => {
            if(res.statusErr){
                $('#modalAddUpdate').modal('hide');
                DevExpress.ui.notify({
                    message: res.errMes,
                    width: 450
                },"success",5000), 
                //error,success,warning
                // alert(res.errMes);
                GridViewLoaiMayCongThuc();
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

const txtCongThucTinhChi = $('#txtCONGTHUCTINHCHI').dxTextArea({
    value: '',
    // height: 90,
    inputAttr: { 'aria-label': 'Notes' },
    minHeight: 100,
    maxHeight: 300,
    autoResizeEnabled: true
  }).dxTextArea('instance');

  const iHESOALPHA= $('#iHESOALPHA').dxNumberBox({
    format: '#.###',
    value: '',
    // label: "Enter a sum in dollars",
    // labelMode: "floating",
    // showSpinButtons: true,
    showClearButton: true,
    // inputAttr: { 'aria-label': 'Integer' },
  }).dxNumberBox('instance');
  
  const iHESOBETA= $('#iHESOBETA').dxNumberBox({
    format: '#.###',
    value: '',
    // showSpinButtons: true,
    showClearButton: true,
    // inputAttr: { 'aria-label': 'Integer' },
  }).dxNumberBox('instance');


  const txtMAMAY=$('#txtMAMAY').dxTextBox({
    // mode: "url"
    // label: "Link",
    // labelMode: "floating"
    maxLength: 5,
    showClearButton: true,
    placeholder: '5 ký tự',
    // readOnly: true,
  }).dxTextBox('instance')

  const txtKYHIEUMAY=$('#txtKYHIEUMAY').dxTextBox({
    // mode: "url"
    // label: "Link",
    // labelMode: "floating"
    // maxLength: 5,
    showClearButton: true,
    // placeholder: '5 ký tự',
    // readOnly: true,
  }).dxTextBox('instance')

  const txtLOAIMAY=$('#txtLOAIMAY').dxTextBox({
    // mode: "url"
    // label: "Link",
    // labelMode: "floating"
    // maxLength: 5,
    showClearButton: true,
    // placeholder: '5 ký tự',
    // readOnly: true,
  }).dxTextBox('instance')

  const txtVITRICHI=$('#txtVITRICHI').dxTextBox({
    // mode: "url"
    // label: "Link",
    // labelMode: "floating"
    // maxLength: 5,
    showClearButton: true,
    // placeholder: '5 ký tự',
    // readOnly: true,
  }).dxTextBox('instance')

  const txtNOTE = $('#txtNOTE').dxTextArea({
    value: '',
    // height: 90,
    inputAttr: { 'aria-label': 'Notes' },
    minHeight: 100,
    maxHeight: 300,
    autoResizeEnabled: true
  }).dxTextArea('instance');

  



$(function Main() {

   
    // txtCongThucTinhChi.val('test')
    GridViewLoaiMayCongThuc();
    // searchBoxLoaiChi();
    loadTooltip("tooltipUpload","btnUpload");
    loadTooltip("tooltiAdd","btnAdd");
    loadTooltip("tooltiEdit","btnEdit");
    loadTooltip("tooltiDelete","btnDelete");
    $('#btnSave').click((e) => {
        e.preventDefault();
        SaveData();
    })
});

  
       