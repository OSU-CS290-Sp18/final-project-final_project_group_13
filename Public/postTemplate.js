(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['main'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<!DOCTYPE html>\r\n<html>\r\n	<head>\r\n		<meta charset=\"utf-8\">\r\n		<title>Wahoo</title>\r\n		<link rel=\"stylesheet\" href=\"./style.css\" media=\"screen\">\r\n		<script src=\"https://use.fontawesome.com/releases/v5.0.9/js/all.js\" defer></script>\r\n    		<script src=\"https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.11/handlebars.runtime.js\" defer></script>\r\n		<script src=\"/index.js\" charset=\"utf-8\" defer></script>\r\n	</head>\r\n	<body>\r\n"
    + ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "		"
    + ((stack1 = ((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"body","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n	</body>\r\n</html>\r\n";
},"usePartial":true,"useData":true});
})();