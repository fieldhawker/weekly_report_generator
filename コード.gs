function doGet() {

//  var htmlOutput = HtmlService.createTemplateFromFile("input_weekly_report").evaluate();
//  html.data = JSON.stringify( getStaffs() );
//  htmlOutput
//    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
//  return htmlOutput;

  var html = HtmlService.createTemplateFromFile('input_weekly_report');
  html.data = JSON.stringify( getStaffs() );
  
  var htmlOutput = html.evaluate();
  htmlOutput
    .setTitle('[SEP][二課１G] シュウジェネ')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  
  return htmlOutput;
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
  var group_address = staffs[e.parameters.staff_select].group_address + ',' + staffs[e.parameters.staff_select].address;
  var affiliation = staffs[e.parameters.staff_select].affiliation;
  //var address = staffs[e.parameters.staff_select].address;
  var start_date = e.parameters.start_date;
  var end_date = e.parameters.end_date;
  var ordinary_start = e.parameters.ordinary_start;
  var ordinary_end = e.parameters.ordinary_end;
  var break_start1 = e.parameters.break_start1;
  var break_end1 = e.parameters.break_end1;
  var break_start2 = e.parameters.break_start2;
  var break_end2 = e.parameters.break_end2;
  var break_start3 = e.parameters.break_start3;
  var break_end3 = e.parameters.break_end3;
  var q1 = e.parameters.q1;
  var q2 = e.parameters.q2;
  var q3 = e.parameters.q3;
  var q4 = e.parameters.q4;
//  var q5 = e.parameters.q5;
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
    .replace(/__ORDINARY_START__/,ordinary_start)
    .replace(/__ORDINARY_END__/,ordinary_end)
    .replace(/__BREAK_START1__/,break_start1)
    .replace(/__BREAK_END1__/,break_end1)
    .replace(/__BREAK_START2__/,break_start2)
    .replace(/__BREAK_END2__/,break_end2)
    .replace(/__BREAK_START3__/,break_start3)
    .replace(/__BREAK_END3__/,break_end3)
    .replace(/__Q1__/,q1.toString().replace(/,/g,'\r\n'))
    .replace(/__Q2__/,q2)
    .replace(/__Q3__/,q3)
    .replace(/__Q4__/,q4)
//    .replace(/__Q5__/,q5)
    .replace(/__Q6__/,q6);
    
  var mail_title  = title
    .replace(/__AFFILIATION__/,affiliation)
    .replace(/__NAME__/,staff_select);
    
  var array = ['mailto:', group_address, '?subject=', encodeURIComponent(mail_title), '&body=', encodeURIComponent(mail_text)];
  var mailto = array.join('');
  var array = ['mailto:', group_address, '?subject=', mail_title, '&body=', mail_text];
  var mailto2 = array.join('');
  
  Logger.log(affiliation);// 
  Logger.log(mail_text);
  Logger.log(title);
  Logger.log(e.parameters);
  html.mail_title = mail_title;
  html.mail_text = mail_text;
  html.mail_address = group_address;
  html.mailto = mailto;
  html.mailto2 = mailto2;
  
  html.staff_select = staff_select;
  html.start_date = start_date;
  html.end_date = end_date;
  html.ordinary_start = ordinary_start;
  html.ordinary_end = ordinary_end;
  html.break_start1 = break_start1;
  html.break_end1 = break_end1;
  html.break_start2 = break_start2;
  html.break_end2 = break_end2;
  html.break_start3 = break_start3;
  html.break_end3 = break_end3;
  html.q1 = q1;
  html.q2 = q2;
  html.q3 = q3;
  html.q4 = q4;
//  html.q5 = q5;
  html.q6 = q6;
  
  html.parameters = e.parameters;
  //html.data = e;

  var htmlOutput = html.evaluate();
  htmlOutput
    .setTitle('[SEP][二課１G] シュウジェネ')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  
  return htmlOutput;
  
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
      "affiliation": data[i][4],
      "address": data[i][5]
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