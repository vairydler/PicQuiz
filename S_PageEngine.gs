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
  add(param){
    let ret;
    let temp;

    deployedUrl = ScriptApp.getService().getUrl();

    if( deployedUrl.slice(-3) === "dev")
    {
      var scriptProperties = PropertiesService.getScriptProperties();
      var deployedUrl = scriptProperties.getProperty('webapp.url');
    }

    if( param.hasOwnProperty("imageurl") )
    {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート4");

      Logger.log(param);

      sheet.getRange("1:1").insertCells(SpreadsheetApp.Dimension.ROWS);
      sheet.getRange(1, 1).setValue((new Date).toLocaleString('ja-JP'));
      sheet.getRange(1, 3).setValue(param.imgurl);
    }

    temp = HtmlService.createTemplateFromFile("V_Add");
    temp.deployUrl = deployedUrl;

    ret = temp.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    ret.setTitle("写真当てクイズ");

    return ret;
  }
}