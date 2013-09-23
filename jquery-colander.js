define(['jquery'], function(jQuery) {
  (function( $ ) {
    
    $.fn.extractSerialize = function(t) {
      var serialized = t.serializeArray();
      return _(serialized).reduce(function(acc, field) {
        if (field.name.slice(0,1) != "_") {
          acc[field.name] = field.value;
        }
        return acc;
      }, {});
    };
    
    $.fn.colander = function( options ) {
      var form = this;
      var opts = $.extend({
        url:      this.attr("action"),
        type:     "POST",
        dataType: "json",
        context:  this,
        success:  handleSuccess,
        error:    handleError
      }, $.fn.colander.defaults, options );
      
      function doAjax() {
        $.ajax($.extend(opts, {
          data: $.fn.extractSerialize(form)
        }));
      }
      
      opts.button ? opts.button.click(doAjax) : form.submit(doAjax);
    };
  
    $.fn.colander.defaults = {
      button: null
    };
    
    function handleError(x,s,e) {
      $(this).children("small.error").remove();
      var err_fields = $.parseJSON(x.responseText);
      for (var fieldk in err_fields) {
        var p = $("input[name="+fieldk+"]").parent();
        var c = p.children("small");
        var m = '<small class="error">'+err_fields[fieldk]+'</small>';
        c.length > 0 ? c.replaceWith(m) : p.append(m);
      }
    };
  
    function handleSuccess(d,s,x) {
      $(this).children("small.error").remove();
    };
  }( jQuery ));
})
