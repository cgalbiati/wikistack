module.exports = function(swig) {

  function pageLink (thing) {
    return '<a href="' + thing.route + '">' + thing.title || thing.name + '</a>';
  };
  pageLink.safe = true;

  swig.setFilter('pageLink', pageLink);

};