'use strict';
const dynConvoHistoryOnInsert = require('./fn/dynConvoHistoryOnInsert')
const dynConvoHistoryOnUpdate = require('./fn/dynConvoHistoryOnUpdate')
const pushToOperators = require('./fn/pushToOperators')

module.exports.dynConvoHistoryOnInsert = (event, context, callback) => {
  dynConvoHistoryOnInsert(event, context, callback)
}

module.exports.dynConvoHistoryOnUpdate = (event, context, callback) => {
  dynConvoHistoryOnUpdate(event, context, callback)
}

module.exports.pushToOperators = (event, context, callback) => {
  pushToOperators(event, context, callback)
}
