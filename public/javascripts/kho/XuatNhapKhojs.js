// const nhapTab= document.getElementById("nhap-tab")

// const XuatTab= document.getElementById("xuat-tab")


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

const loadTooltip = (id, targetButton) => {
  $(`#${id}`).dxTooltip({
    target: `#${targetButton}`,
    showEvent: "mouseenter",
    hideEvent: "mouseleave",
    closeOnOutsideClick: false,
  });
};

// const searchBoxMaHangXuat = () => {
//     const selectBoxData = DevExpress.data.AspNet.createStore({
//       key: "MAHANG",
//       loadMode: "raw",
//       loadUrl: "wacoal_MaHang_Select_V1",
//     });
  
//     var searchBox = $("#searchBoxXuatMH")
//       .dxSelectBox({
//         dataSource: selectBoxData,
//         displayExpr: "MAHANG",
//         valueExpr: "MAHANG",
//         searchEnabled: true,
//         searchExpr: "MAHANG",
//         searchMode: "contains",
//         searchTimeout: 200,
//         minSearchLength: 0,
//         showDataBeforeSearch: false,
//         showClearButton: true,
//         placeholder: "Mã Hàng",
//         onValueChanged: function (data) {
       
//             maHang = data.value;
//             if(!maHang) return;
//             searchBoxLoaiChiXuat(maHang)
          
//         },
//       })
//       .dxSelectBox("instance");
//   };

  const searchBoxLoaiChiNhap = () => {
    const selectBoxData = DevExpress.data.AspNet.createStore({
      key: "LOAICHICODE",
      loadMode: "raw",
      loadUrl: "LOAICHIITEM_Load_Web_Wacoal_V1",
    });
  
    var searchBox = $("#searchBoxLoaiChiNhap")
      .dxSelectBox({
        dataSource: selectBoxData,
        displayExpr: "LOAICHICODE",
        valueExpr: "LOAICHICODE",
        searchEnabled: true,
        searchExpr: "LOAICHICODE",
        searchMode: "contains",
        searchTimeout: 200,
        minSearchLength: 0,
        showDataBeforeSearch: false,
        showClearButton: true,
        placeholder: "Loại Chỉ",
        onValueChanged: function (data) {
            loaiChi = data.value==null?'none':data.value;
            searchBoxMauChiNhap(loaiChi)
        },
      })
      .dxSelectBox("instance");
  };  

  const searchBoxLoaiChiXuat = () => {
    const selectBoxData = DevExpress.data.AspNet.createStore({
      key: "LOAICHICODE",
      loadMode: "raw",
      loadUrl: "LOAICHIITEM_Load_Web_Wacoal_V1",
      // CONGDOAN_MAHANG_LOAICHI_load_By_MAHANG_web_wacoal_v1
    });
  
    var searchBox = $("#searchLoaiChiXuat")
      .dxSelectBox({
        dataSource: selectBoxData,
        displayExpr: "LOAICHICODE",
        valueExpr: "LOAICHICODE",
        searchEnabled: true,
        searchExpr: "LOAICHICODE",
        searchMode: "contains",
        searchTimeout: 200,
        minSearchLength: 0,
        showDataBeforeSearch: false,
        showClearButton: true,
        placeholder: "Loại Chỉ",
        onValueChanged: function (data) {
            loaiChi = data.value==null?'none':data.value;
            searchBoxMauChiXuat(loaiChi)
        },
      })
      .dxSelectBox("instance");
  }; 


  const searchBoxMauChiNhap = (loaiChi) => {
    const selectBoxData = DevExpress.data.AspNet.createStore({
      key: "MAUCHI",
      loadMode: "raw",
      loadUrl: "MAUCHIMAUNL_Load_MAUCHI_By_LOAICHI_Web_wacoal_V1/"+loaiChi,
    });
  
    var searchBox = $("#searchBoxMauChiNhap")
      .dxSelectBox({
        dataSource: selectBoxData,
        displayExpr: "MAUCHI",
        valueExpr: "MAUCHI",
        searchEnabled: true,
        searchExpr: "MAUCHI",
        searchMode: "contains",
        searchTimeout: 200,
        minSearchLength: 0,
        showDataBeforeSearch: false,
        showClearButton: true,
        placeholder: "Màu Chỉ",
      })
      .dxSelectBox("instance");
  };

  const searchBoxMauChiXuat = (loaiChi) => {
    const selectBoxData = DevExpress.data.AspNet.createStore({
      key: "MAUCHI",
      loadMode: "raw",
      loadUrl: "MAUCHIMAUNL_Load_MAUCHI_By_LOAICHI_Web_wacoal_V1/"+loaiChi,
      // loadUrl: "CONGDOAN_MAHANG_MAMAUCHI_Load_By_MAHANG_LOAICHI_web_wacoal_v1/"+maHang+"/"+loaiChi,
    });
  
    var searchBox = $("#searchMauChiXuat")
      .dxSelectBox({
        dataSource: selectBoxData,
        displayExpr: "MAUCHI",
        valueExpr: "MAUCHI",
        searchEnabled: true,
        searchExpr: "MAUCHI",
        searchMode: "contains",
        searchTimeout: 200,
        minSearchLength: 0,
        showDataBeforeSearch: false,
        showClearButton: true,
        placeholder: "Màu Chỉ",
      })
      .dxSelectBox("instance");
  };

  const btnNhap= ()=>{
    $('#btnNhap').dxButton({
      icon: 'inserttable',
      type: 'success',
      text: 'Nhập Kho',
      onClick() {
       NhapKho();
      },
    });

  }

  const NhapKho=()=>{
    let loaiChi= $("#searchBoxLoaiChiNhap").dxSelectBox("instance").option('value');
    let mauChi=$("#searchBoxMauChiNhap").dxSelectBox("instance").option('value');
    let slNhapMet= $("#numberNhapMet").dxNumberBox("instance").option('value') ;

   

    if(!loaiChi){
      DevExpress.ui.notify({
        message: "Vui Lòng Chọn Loại Chỉ",
        width: 450
    },"warning",5000)
    return
    }
    if(!mauChi){
      DevExpress.ui.notify({
        message: "Vui Lòng Chọn Màu Chỉ",
        width: 450
    },"warning",5000)
    return
    }
    if(slNhapMet<=0){
      DevExpress.ui.notify({
        message: "Số Lượng Nhập Phải > 0",
        width: 450
    },"warning",5000)
    return
  }

    const data={
      loaiChi:loaiChi,
      mauChi:mauChi,
      slNhap:0,
      slXuat:0,
      maHang:'',
      slNhapMet:slNhapMet,
      slXuatMet:0
    }
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/kho/KHOCHITON_Insert_Web_Wacoal_V3',
      success: function(res) {
          if (res.status) {
            DevExpress.ui.notify({
              message: res.mes,
              width: 450
          },"success",5000)
        
          $("#searchBoxLoaiChiNhap").dxSelectBox("instance").option('value',undefined);
          $("#searchBoxMauChiNhap").dxSelectBox("instance").option('value',undefined);
          $("#numberNhapMet").dxNumberBox("instance").option('value',undefined) ;
          lichSuNhapLoadGrid()
          TonKhoLoadGrid()
          } else {
            DevExpress.ui.notify({
              message: res.mes,
              width: 450
          },"error",5000)
          }
      }
  });

    
  }

  const XuatKho=()=>{
    let loaiChi= $("#searchLoaiChiXuat").dxSelectBox("instance").option('value');
    let mauChi=$("#searchMauChiXuat").dxSelectBox("instance").option('value');
  
    // let slXuat=parseInt($("#numberXuatCuon").dxNumberBox("instance").option('value')) 
    let slXuatMet=parseInt($("#numberXuatMet").dxNumberBox("instance").option('value')) 
    // let maHang=$("#searchBoxXuatMH").dxSelectBox("instance").option('value');
    if(!loaiChi){
     
      DevExpress.ui.notify({
        message: "Vui Lòng Chọn Loại Chỉ",
        width: 450
    },"warning",5000)
    return
    }
    if(!mauChi){
      DevExpress.ui.notify({
        message: "Vui Lòng Chọn Màu Chỉ",
        width: 450
    },"warning",5000)
    return
    }
    if(slXuatMet<=0){
      DevExpress.ui.notify({
        message: "Số Lượng Xuất Phải > 0",
        width: 450
    },"warning",5000)
    return

    }

    const data={
      loaiChi:loaiChi,
      mauChi:mauChi,
      slNhap:0,
      slXuat:0,
      maHang:'',
      slNhapMet:0,
      slXuatMet:slXuatMet
    }
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/kho/KHOCHITON_Insert_Web_Wacoal_V3',
      success: function(res) {
          if (res.status) {
            DevExpress.ui.notify({
              message: res.mes,
              width: 450
          },"success",5000)
          
          $("#searchLoaiChiXuat").dxSelectBox("instance").option('value',undefined);
          $("#searchMauChiXuat").dxSelectBox("instance").option('value',undefined);
          $("#numberXuatMet").dxNumberBox("instance").option('value',undefined)
          lichSuXuatLoadGrid()
          TonKhoLoadGrid()
          // $("#numberXuatCuon").dxNumberBox("instance").option('value',undefined)
          // $("#searchBoxXuatMH").dxSelectBox("instance").option('value',undefined)
        // location.reload();


          } else {
            DevExpress.ui.notify({
              message: res.mes,
              width: 450
          },"error",5000)
          }
      }
  });
    
  }

  const btnXuat= ()=>{
    $('#btnXuat').dxButton({
      icon: 'deletetable',
      type: 'danger',
      text: 'Xuất Kho',
      onClick() {
        XuatKho()
      },
    });

  }

  const numberNhapCuon= ()=>{
    $('#numberNhapCuon').dxNumberBox({
      // max: totalProductQuantity,
      min: 0,
      value: 0,
      showSpinButtons: true,
      showClearButton:true,
      onKeyDown(e) {
        const { event } = e;
        const str = event.key || String.fromCharCode(event.which);
        if (/^[.,e]$/.test(str)) {
          event.preventDefault();
        }
      },
      // onValueChanged(data) {
      //   productInventory.option('value', totalProductQuantity - data.value);
      // },
    });

  }

  const numberNhapMet= ()=>{
    $('#numberNhapMet').dxNumberBox({
      // max: totalProductQuantity,
      min: 0,
      value: 0,
      showSpinButtons: true,
      showClearButton:true,
      onKeyDown(e) {
        const { event } = e;
        const str = event.key || String.fromCharCode(event.which);
        if (/^[.,e]$/.test(str)) {
          event.preventDefault();
        }
      },
      // onValueChanged(data) {
      //   productInventory.option('value', totalProductQuantity - data.value);
      // },
    });

  }

  const numberXuatCuon= ()=>{
    $('#numberXuatCuon').dxNumberBox({
      // max: totalProductQuantity,
      min: 0,
      value: 0,
      showSpinButtons: true,
      showClearButton:true,
      onKeyDown(e) {
        const { event } = e;
        const str = event.key || String.fromCharCode(event.which);
        if (/^[.,e]$/.test(str)) {
          event.preventDefault();
        }
      },
      // onValueChanged(data) {
      //   productInventory.option('value', totalProductQuantity - data.value);
      // },
    });

  }

  const numberXuatMet= ()=>{
    $('#numberXuatMet').dxNumberBox({
      // max: totalProductQuantity,
      min: 0,
      value: 0,
      showSpinButtons: true,
      showClearButton:true,
      onKeyDown(e) {
        const { event } = e;
        const str = event.key || String.fromCharCode(event.which);
        if (/^[.,e]$/.test(str)) {
          event.preventDefault();
        }
      },
      // onValueChanged(data) {
      //   productInventory.option('value', totalProductQuantity - data.value);
      // },
    });

  }

  const TonKhoLoadGrid = () => {
    var url = "KHOCHITON_Load_Web_Wacoal_V2";
    var listTinhChi = DevExpress.data.AspNet.createStore({
        // type: 'odata',
        key: "keyTonKho",
        loadUrl: url   ,
       
        // insertUrl: url + "/InsertOrder",
        // updateUrl: url + "/UpdateOrder",
        // deleteUrl: url + "/DeleteOrder",
        onBeforeSend: function(method, ajaxOptions) {
            ajaxOptions.xhrFields = {
                withCredentials: true
            };
        }
    })

    $("#GridTonKho").dxDataGrid({
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
          filterRow: {
              visible: true,
              applyFilter: "auto"
          },
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
   
 
        export:{
          enabled: true
      },
        onExporting: function(e) {

          const generalsa=new generals();
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('MH_CD_New');
            
            DevExpress.excelExporter.exportDataGrid({
              component: e.component,
              worksheet: worksheet,
            })
            .then(function() {
              workbook.xlsx.writeBuffer().then(function(buffer) {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'TonKho_'+generalsa.getDateTime()+'.xlsx');
              });
            });
            e.cancel = true;
          },
        // rowDragging:{
        //     data: 1,
        //     group: "tasksGroup",
        //     onAdd: onAdd
        // },
  
    
     
        // headerFilter: {
        //     visible: true
        //     // groupInterval: null
        // },
    
        // groupPanel: {
        //     visible: false
        // },
      
      
        
        columns: [
            {
                caption: "LOAICHI",
                alignment:"center",
                dataField: "LOAICHI",
            },
            {
                caption: "MAUCHI",
                alignment:"center",
                dataField: "MAUCHI",
            },
            {
              caption: "TỔNG SL NHẬP (MÉT)",
              alignment:"right",
              dataField: "TONGSLMETNHAP",
          },
          {
            caption: "TỔNG SL XUẤT (MÉT)",
            alignment:"right",
            dataField: "TONGSLMETXUAT",
        },
        {
          caption: "TỒN KHO (MÉT)",
          alignment:"right",
          dataField: "TONKHOMET",
      },
        ],
    }).dxDataGrid("instance");

}

const lichSuNhapLoadGrid = () => {
  var url = "KHOCHITON_LichSuNhap_web_wacoal_v1";
  var listTinhChi = DevExpress.data.AspNet.createStore({
      // type: 'odata',
      key: "ID",
      loadUrl: url   ,
     
      // insertUrl: url + "/InsertOrder",
      // updateUrl: url + "/UpdateOrder",
      // deleteUrl: url + "/DeleteOrder",
      onBeforeSend: function(method, ajaxOptions) {
          ajaxOptions.xhrFields = {
              withCredentials: true
          };
      }
  })

  $("#GridLSNhap").dxDataGrid({
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
        filterRow: {
            visible: true,
            applyFilter: "auto"
        },
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
 

      export:{
        enabled: true
    },
      onExporting: function(e) {

        const generalsa=new generals();
          var workbook = new ExcelJS.Workbook();
          var worksheet = workbook.addWorksheet('MH_CD_New');
          
          DevExpress.excelExporter.exportDataGrid({
            component: e.component,
            worksheet: worksheet,
          })
          .then(function() {
            workbook.xlsx.writeBuffer().then(function(buffer) {
              saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'LSNhap'+generalsa.getDateTime()+'.xlsx');
            });
          });
          e.cancel = true;
        },
      // rowDragging:{
      //     data: 1,
      //     group: "tasksGroup",
      //     onAdd: onAdd
      // },

  
   
      // headerFilter: {
      //     visible: true
      //     // groupInterval: null
      // },
  
      // groupPanel: {
      //     visible: false
      // },
    
    
      
      columns: [
          {
              caption: "LOAICHI",
              alignment:"center",
              dataField: "LOAICHI",
          },
          {
              caption: "MAUCHI",
              alignment:"center",
              dataField: "MAUCHI",
          },
          {
            caption: "SL NHẬP (MÉT)",
            alignment:"right",
            dataField: "SLMETNHAP",
        },
        
      ],
      onToolbarPreparing: function (e) {
        e.toolbarOptions.items.unshift(
          {
            location: "alter",
            template: function () {
              return $("<div/>")
                .addClass("informer")
                .append(
                  `
                         <form action="" method="POST" enctype="multipart/form-data" id="frmUploadNhapKho">
                         <input type="file" name="filenameNhapKho" id="filenameNhapKho" />
                         </from>
                         `
                );
                // <form action="" method="POST" enctype="multipart/form-data" id="frmUploadOrderDraft">
                // <input type="file" name="filenameDraft" id="filenameDraft" />
                // </from>
                // `
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
                uploadNhapKho();
                
              },
            },
          },)}
        
      
  }).dxDataGrid("instance");

}

const uploadNhapKho = () => {
  loadPanel.show();
  let formData = new FormData(document.getElementById("frmUploadNhapKho"));
  let fileName = $("#filenameNhapKho").val();
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
    $("#filenameNhapKho").val("");
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
    // console.log(fileName);
    $.ajax({
      type: "POST",
      data: formData,
      contentType: false,
      url: "NhapKhoImportExcel",
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
          $("#filenameNhapKho").val("");
          loadPanel.hide();
          lichSuNhapLoadGrid();
          TonKhoLoadGrid();
        } else {
          DevExpress.ui.notify(
            {
              message: res.errMes,
              width: 450,
            },
            "error",
            5000
          );
          $("#filenameNhapKho").val("");
          loadPanel.hide();
         
        }
      },
   
    }
    
    );

  }
};

const lichSuXuatLoadGrid = () => {
  var url = "KHOCHITON_LichSuXuat_web_wacoal_v1";
  var listTinhChi = DevExpress.data.AspNet.createStore({
      // type: 'odata',
      key: "ID",
      loadUrl: url   ,
     
      // insertUrl: url + "/InsertOrder",
      // updateUrl: url + "/UpdateOrder",
      // deleteUrl: url + "/DeleteOrder",
      onBeforeSend: function(method, ajaxOptions) {
          ajaxOptions.xhrFields = {
              withCredentials: true
          };
      }
  })

  $("#GridLSXuat").dxDataGrid({
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
        filterRow: {
            visible: true,
            applyFilter: "auto"
        },
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
 

      export:{
        enabled: true
    },
      onExporting: function(e) {

        const generalsa=new generals();
          var workbook = new ExcelJS.Workbook();
          var worksheet = workbook.addWorksheet('MH_CD_New');
          
          DevExpress.excelExporter.exportDataGrid({
            component: e.component,
            worksheet: worksheet,
          })
          .then(function() {
            workbook.xlsx.writeBuffer().then(function(buffer) {
              saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'LSNhap'+generalsa.getDateTime()+'.xlsx');
            });
          });
          e.cancel = true;
        },
      // rowDragging:{
      //     data: 1,
      //     group: "tasksGroup",
      //     onAdd: onAdd
      // },

  
   
      // headerFilter: {
      //     visible: true
      //     // groupInterval: null
      // },
  
      // groupPanel: {
      //     visible: false
      // },
    
    
      
      columns: [
          {
              caption: "LOAICHI",
              alignment:"center",
              dataField: "LOAICHI",
          },
          {
              caption: "MAUCHI",
              alignment:"center",
              dataField: "MAUCHI",
          },
          {
            caption: "SL XUẤT (MÉT)",
            alignment:"right",
            dataField: "SLMETXUAT",
        },
        
      ],
  }).dxDataGrid("instance");

}

$(function () {
  const now = new Date();
  lichSuNhapLoadGrid();
  searchBoxLoaiChiNhap();
  searchBoxMauChiNhap('none');
  // numberNhapCuon()
  numberNhapMet()
  btnNhap();

  // searchBoxMaHangXuat()
  searchBoxLoaiChiXuat();
  searchBoxMauChiXuat('none');
  // numberXuatCuon()
  numberXuatMet()
  btnXuat()

 
  lichSuXuatLoadGrid();
  TonKhoLoadGrid()

  $('#disabledDate').dxDateBox({
    type: 'datetime',
    disabled: true,
    value: now,
    displayFormat: '(yyyy-MM-dd)',
  });

  $('#disabledDateXuat').dxDateBox({
    type: 'datetime',
    disabled: true,
    value: now,
    displayFormat: '(yyyy-MM-dd)',
  });

  

  
  loadTooltip("tooltipUpload", "btnUpload");
});
