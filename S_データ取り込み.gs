class データ取込{

  /**
   * @param configSheetName {String}
   * @return {Array}
   */
  readConfig(configSheetName) {
    /* 設定をシートから読み出す */
    let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let inputsheet = spreadsheet.getSheetByName(configSheetName);
    let cellary = inputsheet.getDataRange().getValues();

    /* 設定を配列からオブジェクトに変換する */
    let objkey = cellary.shift();
    
    return cellary.map(e=>{
      let ret = {};
      e.forEach((e,i)=>{
        if( e != "")
        {
          ret[objkey[i]] = e;
        }
      });

      return ret;
    });
  }; 
}