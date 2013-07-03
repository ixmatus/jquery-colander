define(['jquery'], function ($) {

  function extract(target) {
    var serialized = target.serializeArray();
    
    return _(serialized).reduce(function(acc, field) {
      if (field.name.slice(0,1) != "_") {
        acc[field.name] = field.value;
      }
      return acc;
    }, {});
  }

  function handle_error(x,s,e) {
    // Remove any prior error messages
    $(this).children("small.error").remove();
    
    // Get new messages
    var err_fields = $.parseJSON(s.responseText);
    for (var fieldk in err_fields) {
      var p = $("input[name="+fieldk+"]").parent();
      var c = p.children("small");
      var m = '<small class="error">'+err_fields[fieldk]+'</small>';
      c.length > 0 ? c.replaceWith(m) : p.prepend(m);
    }
  }

  function handle_success(d,s,x) {
    $(this).children("small.error").remove();
  }

  function handle_submit(succ, err) {
    return (function(e) {
      $.ajax({
        url: e.attr("action"),
        data: extract(e),
        dataType: "json",
        context: e,
        success: succ ? succ : handle_success,
        error: err ? err : handle_error
      });
      return false;    
    });
  }

  return function(succ=undefined, err=undefined) {
    $("#deform").submit(handle_submit(succ, err));
  };
});
