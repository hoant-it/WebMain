const sql = require("mssql");
const sqlConfig = require("../dbconfig");

module.exports.Khowacoal_KHACHHANG_load_Web_V1=async()=>{
    try {
        let pool=await sql.connect(sqlConfig)
        let result=await pool.request()
        .execute('wacoal_KHACHHANG_load_Web_V1')
        return result.recordset
    } catch (error) {
        throw error
    }
}

module.exports.wacoal_DONHANGHEAD_Load_Web_V1=async()=>{
    try {
        let pool=await sql.connect(sqlConfig)
        let result=await pool.request()
        .execute('wacoal_DONHANGHEAD_Load_Web_V1')
        return result.recordset
    } catch (error) {
        throw error
    }
}

module.exports.khoOrderTinhchiGridviewMaHangMiss=async(params)=>{
    const{Order,KhachHang}=params;
    try {
        let pool=await sql.connect(sqlConfig)
        let result=await pool.request()
        .input('ORDERNO',sql.NVarChar(50),Order)
        .input('MAKH',sql.NVarChar(50),KhachHang)
        .execute('wacoal_OrderTinhChiMaHangMiss_Web_v1')
        return result.recordset
    } catch (error) {
        throw error
    }
}

module.exports.Order_TinhChi_Web_V4=async(params)=>{
    const{Order,KhachHang}=params;
    try {
        let pool=await sql.connect(sqlConfig)
        let result=await pool.request()
        .input('ORDERNO',sql.NVarChar(50),Order)
        .input('MAKH',sql.NVarChar(50),KhachHang)
        .execute('Order_TinhChi_Web_V4')
        return result.recordset
    } catch (error) {
        throw error
    }
}


module.exports.OrderTinhChiPost=async(body)=>{
    try {
        const{oderNo,khachHang}=body
        let pool=await sql.connect(sqlConfig)
        let result=await pool.request()
        .input('ORDERNO',sql.NVarChar(50),oderNo)
        .input('MAKH',sql.NVarChar(50),khachHang)
        .execute('wacoal_OrderTinhChiMaHangMiss_Web_v2')
        return result.recordset
    } catch (error) {
        throw error
    }
}

module.exports.wacoal_OrderTinhChi_ChiTiet_MaHang_Load_Web_V4=async(params)=>{
    try {
        const{Order,KhachHang}=params
        let pool=await sql.connect(sqlConfig)
        let result=await pool.request()
        .input('ORDERNO',sql.NVarChar(50),Order)
        .input('MAKH',sql.NVarChar(50),KhachHang)
        .execute('wacoal_OrderTinhChi_ChiTiet_MaHang_Load_Web_V4')
        return result.recordset
    } catch (error) {
        throw error
        
    }


}

//tinh chi order V2

module.exports.wacoal_OrderTinhChi_ChiTiet_MaHang_Load_Web_V5=async(params,userId)=>{
    try {
        const{order,groupKH,datchiStatus,}=params
        let pool=await sql.connect(sqlConfig)
        let result=await pool.request()
        .input('ORDERNO',sql.NVarChar(50),order)
        .input('GROUPKH',sql.NVarChar(50),groupKH)
        .input('DATCHISTATUS',sql.Int, parseInt(datchiStatus))
        .input('UserName',sql.NVarChar(50),userId)
        .execute('wacoal_OrderTinhChi_ChiTiet_MaHang_Load_Web_V5')
        return result.recordset
    } catch (error) {
        throw error
        
    }


}

module.exports.Order_TinhChi_Web_V5=async(params,userId)=>{
    const{order,groupKH,datchiStatus}=params;
    try {
        let pool=await sql.connect(sqlConfig)
        let result=await pool.request()
        .input('ORDERNO',sql.NVarChar(50),order)
        .input('GROUPKH',sql.NVarChar(50),groupKH)
        .input('DATCHISTATUS',sql.Int, parseInt(datchiStatus))
        .input('UserName',sql.NVarChar(50),userId)
        .execute('Order_TinhChi_Web_V5')
        return result.recordset
    } catch (error) {
        throw error
    }
}


module.exports.wacoal_KHOCHIHEADER_Load_Web_V1 = async (body) => {
  const { oderNo, groupKH } = body;
  let pool = await sql.connect(sqlConfig);
  try {
    let result = await pool
      .request()
      .input("ORDERNO", sql.NVarChar(50), oderNo)
      .input("GROUPKH", sql.NVarChar(50), groupKH)
      .execute("wacoal_KHOCHIHEADER_Load_Web_V1");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};