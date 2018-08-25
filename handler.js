'use strict';
const dynConvoHistoryOnInsert = require('./fn/dynConvoHistoryOnInsert')
const dynConvoHistoryOnUpdate = require('./fn/dynConvoHistoryOnUpdate')
const pushToOperators = require('./fn/pushToOperators')
const grabFromOperatorQueue = require('./fn/grabFromOperatorQueue')

module.exports.dynConvoHistoryOnInsert = (event, context, callback) => {
  dynConvoHistoryOnInsert(event, context, callback)
}

module.exports.dynConvoHistoryOnUpdate = (event, context, callback) => {
  dynConvoHistoryOnUpdate(event, context, callback)
}

module.exports.pushToOperators = (event, context, callback) => {
  pushToOperators(event, context, callback)
}

module.exports.grabFromOperatorQueue = (event, context, callback) => {
  grabFromOperatorQueue(event, context, callback)
}
