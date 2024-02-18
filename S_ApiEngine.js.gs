class ApiEngine{
  constructor(){
    this.prop = PropertiesService.getUserProperties();

    Object.defineProperty(this, 'prop', { writable: false });
  }
  json(param){
    let ret;

    /* Logger.log( prop.getProperty(prop_URL) ); */
    ret = ContentService.createTextOutput(this.prop.getProperty(this.prop_URL)).setMimeType(ContentService.MimeType.JSON)

    return ret;
  }
  add(param){
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート4");

    Logger.log(param);

    sheet.getRange("1:1").insertCells(SpreadsheetApp.Dimension.ROWS);
    sheet.getRange(1, 1).setValue((new Date).toLocaleString('ja-JP'));
    sheet.getRange(1, 3).setValue(param.imgurl);

    let ret = ContentService.createTextOutput(this.prop.getProperty(this.prop_URL)).setMimeType(ContentService.MimeType.JSON)

    return ret;
  }
}