
/**
 * Returns a set of data grouping by the dimension and summing over all the
 * values in the measure.
 *
 * @param {String} dimension - the name of the dimension to group by
 * @param {String} measure - the name of the measure to sum over
 * @param {Array<Object>} data - the records to process
 * @return {Object} result - the set of data containg the results
 */
var sumOverMeasure = function (dimension, measure, data) {
  var result = {};
  data.forEach(function(set) {
    if (!result[set.dimension]) {
      result[set.dimension] = set.measure;
    } else {
      result[set.dimension] += set.measure;
    }
  });
  return result;
};

/**
 * Return the result of running a single query.
 * @param {Object} query - the query to perform
 * @param {Array<Object>} data - the records to process
 * @return {Array<Object>} results - the matching rows for the query
 */
var runQuery = function (query, data) {
  return data.filter(function(row){
    return _rowContainsRequiredFields(row, query.fields);
  });
};

/**
 * Return the results of running multiple queries.
 * @param {Array<Object>} queries - the queries to perform
 * @param {Array<Object>} data - the records to process
 * @return {Array<Array<Object>>} results - the matching rows per query
 */
var runQueries = function (queries, data) {
  return queries.reduce(function(result, query) {
   var matchingRows = runQuery(query, data);
   result.push(matchingRows);
   return result;
  }, []);
};

/**
 * Return true or false if the row contains the required fields.
 * @param {Object} row - the row to check
 * @param {Array<String>} requiredFields - the fields that must be present in the row
 * @return {Boolean} containsRequiredFields
 */
var _rowContainsRequiredFields = function (row, requiredFields) {
  return requiredFields.reduce(function(hasFields, field){
    return hasFields ? row.hasOwnProperty(field) && row[field] : false;
  }, true);
};

module.exports = { sumOverMeasure, runQuery, runQueries };
