'use strict';

module.exports = {
  handler: function(request, reply) {
    reply({name: request.auth.credentials.name});
  }
};
