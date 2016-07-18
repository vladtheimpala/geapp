angular.module("ui.tinymce",[]).value("uiTinymceConfig",{}).directive("uiTinymce",["$rootScope","$compile","$timeout","$window","$sce","uiTinymceConfig",function(a,b,c,d,e,f){f=f||{};var g=0,h="ui-tinymce";return f.baseUrl&&(tinymce.baseURL=f.baseUrl),{require:["ngModel","^?form"],priority:599,link:function(i,j,k,l){function m(a){a?(n(),p&&p.getBody().setAttribute("contenteditable",!1)):(n(),p&&!p.settings.readonly&&p.getBody().setAttribute("contenteditable",!0))}function n(){p||(p=tinymce.get(k.id))}if(d.tinymce){var o,p,q=l[0],r=l[1]||null,s={debounce:!0},t=function(b){var c=b.getContent({format:s.format}).trim();c=e.trustAsHtml(c),q.$setViewValue(c),a.$$phase||i.$digest()};k.$set("id",h+"-"+g++),o={},angular.extend(o,i.$eval(k.uiTinymce));var u=function(a){var b;return function(d){c.cancel(b),b=c(function(){return function(a){a.isDirty()&&(a.save(),t(a))}(d)},a)}}(400),v={setup:function(b){b.on("init",function(){q.$render(),q.$setPristine(),q.$setUntouched(),r&&r.$setPristine()}),b.on("ExecCommand change NodeChange ObjectResized",function(){return s.debounce?void u(b):(b.save(),void t(b))}),b.on("blur",function(){j[0].blur(),q.$setTouched(),a.$$phase||i.$digest()}),b.on("remove",function(){j.remove()}),f.setup&&f.setup(b,{updateView:t}),o.setup&&o.setup(b,{updateView:t})},format:o.format||"html",selector:"#"+k.id};angular.extend(s,f,o,v),c(function(){s.baseURL&&(tinymce.baseURL=s.baseURL),tinymce.init(s),m(i.$eval(k.ngDisabled))}),q.$formatters.unshift(function(a){return a?e.trustAsHtml(a):""}),q.$parsers.unshift(function(a){return a?e.getTrustedHtml(a):""}),q.$render=function(){n();var a=q.$viewValue?e.getTrustedHtml(q.$viewValue):"";p&&p.getDoc()&&(p.setContent(a),p.fire("change"))},k.$observe("disabled",m),i.$on("$tinymce:refresh",function(a,c){var d=k.id;if(angular.isUndefined(c)||c===d){var e=j.parent(),f=j.clone();f.removeAttr("id"),f.removeAttr("style"),f.removeAttr("aria-hidden"),tinymce.execCommand("mceRemoveEditor",!1,d),e.append(b(f)(i))}}),i.$on("$destroy",function(){n(),p&&(p.remove(),p=null)})}}}}]);
