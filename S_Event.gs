function doGet(e){
  let ret;
  let temp;

  Logger.log(e);

  if( Object.keys(e.parameter).length == 0)
  {
    temp = HtmlService.createTemplateFromFile("V_ERR.html");
    temp.apiref = JSON.stringify(apiref);
    return temp.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }

  let prop = PropertiesService.getUserProperties();

  if( e.parameter.hasOwnProperty("app") )
  {
    temp = HtmlService.createTemplateFromFile("V_ビューア");
    temp.piclist = prop.getProperty(prop_URL);
    temp.dbg = Number(e.parameter.dbg) ? 1 : 0;
    ret = temp.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    ret.setTitle("写真当てクイズ");
  }
  else
  if( e.parameter.hasOwnProperty("api") )
  {
    Logger.log( prop.getProperty(prop_URL) );
  
    ret = ContentService.createTextOutput(prop.getProperty(prop_URL)).setMimeType(ContentService.MimeType.JSON)
  }

  return ret;
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