function doGet() {  
  var html = HtmlService.createTemplateFromFile('input_weekly_report');  
  
  html.title = 'シュウジェネ';
  html.data = JSON.stringify( getStaffs() );
  return html.evaluate();  
}

function doPost(e){

  var html = HtmlService.createTemplateFromFile('result_weekly_report');  
  
  html.title = 'シュウジェネ';
  var template = getTemplate();
  var text  = template[0][0];
  var title = template[0][1];
  
  var staffs = getStaffs();
  var staff_select = staffs[e.parameters.staff_select].name;
  var reader = staffs[e.parameters.staff_select].reader;
  var number = staffs[e.parameters.staff_select].number;
  var group_address = staffs[e.parameters.staff_select].group_address;
  var affiliation = staffs[e.parameters.staff_select].affiliation;
  var start_date = e.parameters.start_date;
  var end_date = e.parameters.end_date;
  var q1 = e.parameters.q1;
  var q2 = e.parameters.q2;
  var q3 = e.parameters.q3;
  var q4 = e.parameters.q4;
  var q5 = e.parameters.q5;
  var q6 = e.parameters.q6;
  
  if (typeof q1 === "undefined") {
    q1 = '';
  }
  
  var mail_text  = text
    .replace(/__READER_NAME__/,reader)
    .replace(/__NAME__/g,staff_select)
    .replace(/__NUMBER__/,number)
    .replace(/__AFFILIATION__/,affiliation)
    .replace(/__START_DATE__/,start_date)
    .replace(/__END_DATE__/,end_date)
    .replace(/__Q1__/,q1.toString().replace(/,/g,'\r\n'))
    .replace(/__Q2__/,q2)
    .replace(/__Q3__/,q3)
    .replace(/__Q4__/,q4)
    .replace(/__Q5__/,q5)
    .replace(/__Q6__/,q6);
    
  var mail_title  = title
    .replace(/__AFFILIATION__/,affiliation)
    .replace(/__NAME__/,staff_select);
    
  var array = ['mailto:', group_address, '?subject=', encodeURIComponent(mail_title), '&body=', encodeURIComponent(mail_text)];
  var mailto = array.join('');
  
  Logger.log(affiliation);// 
  Logger.log(mail_text);
  Logger.log(title);
  Logger.log(e.parameters);
  html.mail_title = mail_title;
  html.mail_text = mail_text;
  html.mail_address = group_address;
  html.mailto = mailto;
  //html.data = e;
  return html.evaluate();
  
}

function getStaffs() {
  var id = '16hAj1SmKB94xHsB6wDUf7ewYnNLeEqF9L-6OhR3fv-o'; //Webアプリ化するとIDを自動で取れなかったので調べて記述しておきます
  var sheet = SpreadsheetApp.openById(id);
  var data = sheet.getDataRange().getValues();

  var json = [];

  for (var i = 0; i < data.length; i++) {
    json.push({
      "name": data[i][0], 
      "number": data[i][1], 
      "reader": data[i][2], 
      "group_address": data[i][3], 
      "affiliation": data[i][4]
    });
  }
//  Logger.log(json);
  return json;

}

function getTemplate() {
  var id = '1TnKm3klXYUAf6xizMLM0KkhSq5Qmyyh-dd8tzf1lEck'; //Webアプリ化するとIDを自動で取れなかったので調べて記述しておきます
  var sheet = SpreadsheetApp.openById(id);
  var data = sheet.getDataRange().getValues();
  
  return data;

}


function getScriptUrl() {
    var url = ScriptApp.getService().getUrl();
    return url;
}