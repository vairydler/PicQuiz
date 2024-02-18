function doGet(e){
  let ret;
  let temp;

  if( Object.keys(e.parameter).length == 0)
  {
    temp = HtmlService.createTemplateFromFile("V_Help.html");
    temp.apiref = JSON.stringify(apiref);
    return temp.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  Logger.log(e.parameter);
  switch( e.parameter.type )
  {
    case "page":
      {
        Logger.log("app");
        let engine = new PageEngine();
        ret = engine[e.parameter.name](e.parameter);
      }
      break;
    case "api":
      {
        Logger.log("api");
        let engine = new ApiEngine();
        ret = engine[e.parameter.name](e.parameter);
      }
      break;
  }

  return ret;
}

function doPost(e){
  let json = JSON.parse(e.postData.getDataAsString());

  switch(e.req)
  {
    case "add":
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート4");

      sheet.getRange("1:1").insertCells(SpreadsheetApp.Dimension.ROWS);
      sheet.getRange(1, 1).setValue((new Date).toLocaleString('ja-JP'));
      sheet.getRange(1, 2).setValue(json.img);

      const output = ContentService.createTextOutput(JSON.stringify({result:true}));
      output.setMimeType(ContentService.MimeType.JSON);
      break;
  }

  return output;
}

/**
 * スプレッドシートの変更時にトリガされるイベント
 */
function 変更時(){
  let 取込データ = new データ取込().readConfig("問題");
  取込データ = 取込データ.map(e=>e.URL);

  let prop = PropertiesService.getUserProperties();
  prop.setProperty(prop_URL,JSON.stringify(取込データ));

  Logger.log(取込データ);
}