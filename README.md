# Hi!

jquery-colander is a jquery plugin for serializing, submitting, and deserializing colander form fields and data. Given a
form selector and URI (for ajax), this plugin will listen for the submit event of the form, serialize form fields upon
submission, and send to the server.

It will handle a response back by either deserializing an unsuccessful (400 Bad Request or other 40x) submission and
attaching the error messages to the appropriate form fields OR given a callback for success, call that.

# Install

bower -r install jquery-colander

# Use


