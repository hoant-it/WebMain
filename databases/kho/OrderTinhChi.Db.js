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

module.exports.Order_TinhChi_Web_V3=async(params)=>{
    const{Order,KhachHang}=params;
    try {
        let pool=await sql.connect(sqlConfig)
        let result=await pool.request()
        .input('ORDERNO',sql.NVarChar(50),Order)
        .input('MAKH',sql.NVarChar(50),KhachHang)
        .execute('Order_TinhChi_Web_V3')
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

module.exports.wacoal_OrderTinhChi_ChiTiet_MaHang_Load_Web_V2=async(params)=>{
    try {
        const{Order,KhachHang}=params
        let pool=await sql.connect(sqlConfig)
        let result=await pool.request()
        .input('ORDERNO',sql.NVarChar(50),Order)
        .input('MAKH',sql.NVarChar(50),KhachHang)
        .execute('wacoal_OrderTinhChi_ChiTiet_MaHang_Load_Web_V3')
        return result.recordset
    } catch (error) {
        throw error
        
    }


}


