define(['jquery'], function(jQuery) {
  (function( $ ) {
  
    $.fn.colander = function( options ) {
      var opts = $.extend({
        url:      this.attr("action"),
        data:     extract(this),
        dataType: "json",
        context:  this,
        success:  handleSuccess,
        error:    handleError
      }, $.fn.colander.defaults, options );
      
      function doAjax() {
        $.ajax(opts);
      }
      
      opts.button ? opts.button.click(doAjax) : this.submit(doAjax);
    };
  
    $.fn.colander.defaults = {
      button: null
    };
  
    $.fn.colander.extract = function(t) {
      var serialized = t.serializeArray();
      
      return _(serialized).reduce(function(acc, field) {
        if (field.name.slice(0,1) != "_") {
          acc[field.name] = field.value;
        }
        return acc;
      }, {});
    };
  
    function handleError(x,s,e) {
      // Remove any prior error messages
      $(this).children("small.error").remove();
      
      // Get new messages
      var err_fields = $.parseJSON(s.responseText);
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
