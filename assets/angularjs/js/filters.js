'use strict';

/* Filters */

angular.module('NcBox.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]).
  filter('htmlToPlaintext', function() {
    return function(text) {
      return String(text).replace(/<[^>]+>/gm, '');
    }
  }).
  filter('formatPriceCol', function() {
    return function(text) {
      return String(text).replace(/R\$/g, '');
    }
  }).
  filter('convUTF8', function() {
    return function(text) {
      return String(text).toString("uft8");
    }
  });
