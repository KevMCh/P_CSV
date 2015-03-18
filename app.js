var express = require('express');
var app = express();
var path = require('path');
var expressLayouts = require('express-ejs-layouts');
var $ = require('jquery');
var _ = require('underscore');

app.set('port', (process.env.PORT || 3000));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.set('layout', 'myLayout') // defaults to 'layout'  '

app.use(expressLayouts);
//app.use(express.static('public'));
app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
  res.render('index', { title: 'P_CSV' });
})

app.get('/', function (req, res) {
  var result;
  var original = document.getElementById("original");
  var temp = original.value;
  var regexp = /\s*"((?:[^"\\]|\\.)*)"\s*,?|\s*([^,]+),?|\s*,/g;
  var lines = temp.split(/\n+\s*/);
  var commonLength = NaN;
  var r = [];
  // Template using underscore
  /*var row = "<% _.each(items, function(name) { %>"     +
            "                    <td><%= name %></td>" +
            "              <% }); %>";
*/
  var row = document.getElementById("tabla");
  for(var t in lines) {
    var temp = lines[t];
    var m = temp.match(regexp);
    var result = [];
    var error = false;

    if (m) {
      if (commonLength && (commonLength != m.length)) {
        alert('ERROR! row <'+temp+'> has '+m.length+' items!');
        error = true;
      }
      else {
        commonLength = m.length;
        error = false;
      }
      for(var i in m) {
        var removecomma = m[i].replace(/,\s*$/,'');
        var remove1stquote = removecomma.replace(/^\s*"/,'');
        var removelastquote = remove1stquote.replace(/"\s*$/,'');
        var removeescapedquotes = removelastquote.replace(/\\"/,'"');
        result.push(removeescapedquotes);
      }
      var tr = error? '<tr class="error">' : '<tr>';
      r.push(tr+_.template(row, {items : result})+"</tr>");
    }
    else {
      error = true;
    }
  }
  r.unshift('<p>\n<table class="center" id="result">');
  r.push('</table>');
  //alert(r.join('\n')); // debug
  finaltable.innerHTML = r.join('\n');
});

var server = app.listen(app.get('port'), function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});
