/*
Notification.js
*/
/** Add the show box when document ready. **/
jQuery(document).ready(function() {
  jQuery("body").append('<div id="notification_area"></div>');
});

var decode = 1;
var link_blank = 0;

/** WTF **/
function html_decode(str){
  var s = "";
  if (str.length == 0) return "";
  s = str.replace(/&/g, "&amp;");
  s = s.replace(/</g, "&lt;");
  s = s.replace(/>/g, "&gt;");
  s = s.replace(/ /g, " ");
  s = s.replace(/\'/g, "&#39;");
  s = s.replace(/\"/g, "&#34;");
  return s;
};

function html_n(str){
  var s = "";
  if (str.length == 0) return "";
  s = str.replace(/\n/g, "<br>");
  return s;
};

/** Make the windows. **/
jQuery.fn.new_notification_window = function(title,content,color,link,link_blank,decode) {
  var color_name = ['grey','red','green','blue','yellow'];
  console.log('标题： ' + title);
  console.log('内容： ' + content);
  console.log('颜色： ' + color);
  console.log('颜色名称： ' + color_name[color]);
  if (!content) {
    var content = '无内容';
  };
  if (!title) {
    switch(color){
      case "1": //Color: Red
        var title = '注意';
        break;
      case "2": //Color: Green
        var title = '成功';
        break;
      case "3": //Color: Blue
        var title = '消息';
        break;
      case "4": //Color: Yellow
        var title = '警告';
        break;
      default:
        var title = '通知';
    };
  };
  if (!color || color >= 5) {
    var color_name = new Array();
    color_name[color] = "default";
  };
  if (decode == 1){
    var content = html_decode(content);
  };
  var content = html_n(content);
  if (link_blank == 1){
    var target_blank = ' target="_blank"';
  }else{
    var target_blank = '';
  };
  if (link){
    var footer = '<div class="notification-box-footer">'
    + '<p><a href="' + link + '" class="button button-' + color_name[color] + '" ' + target_blank + '>查看</a></p>'
    + '</div>';
  }else{
    var footer = "";
  };

  jQuery("#notification_area").append('<div class="notification-box color-' + color_name[color] + '">'
    + '<h3>' + title + '</h3>'
    + '<button class="close">&times;</button>'
    + '<div class="notification-box-content"><p>' + content + '</p></div>'
    + footer
    + '</div>');


  console.log('输出的标题: ' + title);
  console.log('输出的内容: ' + content);
  console.log('编码状态: ' + decode);
  console.log('输出的颜色名: ' + color_name[color]);
};

/** Close a window. **/
jQuery(document).on("click", ".close",
    function() {
    jQuery(this).parent().remove();
    return false;
});

/** Make the block **/
jQuery.fn.new_notification_block = function(content,color) {
  var color_name = ['grey','red','green','blue','yellow'];
  console.log('内容： ' + content);
  console.log('颜色： ' + color);
  console.log('颜色名称： ' + color_name[color]);

  if (!content) {
    switch(color){
      case "1": //Color: Red
        var content = '失败';
        break;
      case "2": //Color: Green
        var content = '成功';
        break;
      case "3": //Color: Blue
        var content = '消息';
        break;
      case "4": //Color: Yellow
        var content = '警告';
        break;
      default:
        var content = '通知';
    };
  };
  if (!color || color >= 5) {
    var color_name = new Array();
    color_name[color] = "default";
  };

  var content = html_decode(content);

  jQuery("#notification_area").append('<div class="notification-block color-' + color_name[color] + '">'
    + '<button class="close">&times;</button>'
    + '<p>' + content + '</p>'
    + '</div><div class="clear"></div>');

  console.log('输出的内容: ' + content);
  console.log('编码状态: ' + decode);
  console.log('输出的颜色名: ' + color_name[color]);
};