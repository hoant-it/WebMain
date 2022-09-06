const db = require("../../databases/kho/Datchi.Db");

module.exports.datChiLoad = async (req, res) => {
  res.render("kho/DatChi", {
    title: "Dat chi",
    userId: req.signedCookies.userId,
    html: "",
  });
};

module.exports.wacoal_Datchi_MauMH_Load_Web_V1 = async (req, res) => {
  try {
    const {MAHANG} = req.params;
    const result = await db.wacoal_Datchi_MauMH_Load_Web_V1(MAHANG);
    res.json({
      data: result,
    });
  } catch (error) {
    throw error;
  }
};

module.exports.wacoal_CHUYEN_Load_Web_V1 = async (req, res) => {
    try {
      const result = await db.wacoal_CHUYEN_Load_Web_V1();
      res.json({
        data: result,
      });
    } catch (error) {
      throw error;
    }
  };

  module.exports.wacoal_DatChi_MH_Mau_SL_Web_V1 = async (req, res) => {
    try {
        const{MAHANG,MAUMH,Qty}=req.params
      const result = await db.wacoal_DatChi_MH_Mau_SL_Web_V1(MAHANG,MAUMH,Qty);
      res.json({
        data: result,
      });
    } catch (error) {
      throw error;
    }
  };

  module.exports.wacoal_TinhChi_MaHang_Mau_SL_V1 = async (req, res) => {
    try {
        const{MAHANG,MAUMH,Qty}=req.params
      const result = await db.wacoal_TinhChi_MaHang_Mau_SL_V1(MAHANG,MAUMH,Qty);
      res.json({
        data: result,
      });
    } catch (error) {
      throw error;
    }
  };


  


