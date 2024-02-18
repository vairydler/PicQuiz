class PageEngine{
  constructor(){
    this.prop = PropertiesService.getUserProperties();

    Object.defineProperty(this, 'prop', { writable: false });
  }
  app(param){
    let ret;
    let temp;

    temp = HtmlService.createTemplateFromFile("V_ビューア");
    temp.piclist = this.prop.getProperty(prop_URL);
    temp.dbg = Number(param.dbg) ? 1 : 0;
    temp.nornd = param.hasOwnProperty("nornd") ? 1 : 0;

    ret = temp.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    ret.setTitle("写真当てクイズ");

    return ret;
  }
  /* 現在は未使用 */
  add(param){
    let ret;
    let temp;

    if( param.hasOwnProperty("imgurl") )
    {
      Logger.log("add imgurl")
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート4");

      Logger.log(param);

      sheet.getRange("1:1").insertCells(SpreadsheetApp.Dimension.ROWS);
      sheet.getRange(1, 1).setValue((new Date).toLocaleString('ja-JP'));
      sheet.getRange(1, 2).setValue(param.imgurl);
    }

    temp = HtmlService.createTemplateFromFile("V_Add");
    temp.deployUrl = this.getDeployedUrl();

    ret = temp.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    ret.setTitle("写真当てクイズ");

    return ret;
  }
  getDeployedUrl(){
    let deployedUrl = ScriptApp.getService().getUrl();

    if( deployedUrl.slice(-3) === "dev")
    {
      Logger.log("add slice3")
      var scriptProperties = PropertiesService.getScriptProperties();
      deployedUrl = scriptProperties.getProperty('webapp.url');
    }

    return deployedUrl;
  }
}