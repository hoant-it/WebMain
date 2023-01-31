



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

const searchBoxMaHangXuat = () => {
    const selectBoxData = DevExpress.data.AspNet.createStore({
      key: "MAHANG",
      loadMode: "raw",
      loadUrl: "wacoal_MaHang_Select_V1",
    });
  
    var searchBox = $("#searchBoxXuatMH")
      .dxSelectBox({
        dataSource: selectBoxData,
        displayExpr: "MAHANG",
        valueExpr: "MAHANG",
        searchEnabled: true,
        searchExpr: "MAHANG",
        searchMode: "contains",
        searchTimeout: 200,
        minSearchLength: 0,
        showDataBeforeSearch: false,
        showClearButton: true,
        placeholder: "Mã Hàng",
        onValueChanged: function (data) {
          // var $result = $(".current-value");
  
          if (data.value !== null) {
            // console.log(data)
            // var selectedItem = data.component.option('selectedItem');
            maHang = data.value;
            console.log(maHang);
            searchBoxMau();
            // $result.text(selectedItem.Name + " (ID: " + selectedItem.ID + ")");
            // console.log(" (ID: " + selectedItem.MAKH + ")")
          } else {
            console.log("Not selected");
            // $result.text("Not selected");
          }
        },
      })
      .dxSelectBox("instance");
  };

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
    let slNhap= parseInt($("#numberNhap").dxNumberBox("instance").option('value')) ;
    let slXuat=0

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
    if(slNhap<=0){
      DevExpress.ui.notify({
        message: "Số Lượng Nhập Phải > 0",
        width: 450
    },"warning",5000)
    return
  }

    const data={
      loaiChi:loaiChi,
      mauChi:mauChi,
      slNhap:slNhap,
      slXuat:slXuat,
    }
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/kho/KHOCHITON_Insert_Web_Wacoal_V1',
      success: function(res) {
          if (res.status) {
            DevExpress.ui.notify({
              message: res.mes,
              width: 450
          },"success",5000)
         
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
    let slNhap= 0;
    let slXuat=parseInt($("#numberXuat").dxNumberBox("instance").option('value')) 
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
    if(slXuat<=0){
      DevExpress.ui.notify({
        message: "Số Lượng Xuất Phải > 0",
        width: 450
    },"warning",5000)
    return

    }

    const data={
      loaiChi:loaiChi,
      mauChi:mauChi,
      slNhap:slNhap,
      slXuat:slXuat,
    }
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/kho/KHOCHITON_Insert_Web_Wacoal_V1',
      success: function(res) {
          if (res.status) {
            DevExpress.ui.notify({
              message: res.mes,
              width: 450
          },"success",5000)
         
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

  const numberNhap= ()=>{
    $('#numberNhap').dxNumberBox({
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

  const numberXuat= ()=>{
    $('#numberXuat').dxNumberBox({
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

$(function () {

  searchBoxLoaiChiNhap();
  searchBoxMauChiNhap('none');
  numberNhap()
  btnNhap();

  searchBoxLoaiChiXuat();
  searchBoxMauChiXuat('none');
  numberXuat()
  btnXuat()

  // searchBoxMaHangXuat()
  loadTooltip("tooltipUpload", "btnUpload");
});
