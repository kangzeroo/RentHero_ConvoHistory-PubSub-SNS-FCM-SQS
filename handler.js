'use strict';
const dynConvoHistoryOnInsert = require('./fn/dynConvoHistoryOnInsert')
const dynConvoHistoryOnUpdate = require('./fn/dynConvoHistoryOnUpdate')
const checkReceiptsForLeadMsg = require('./fn/checkReceiptsForLeadMsg')

module.exports.dynConvoHistoryOnInsert = (event, context, callback) => {
  dynConvoHistoryOnInsert(event, context, callback)
}

module.exports.dynConvoHistoryOnUpdate = (event, context, callback) => {
  dynConvoHistoryOnUpdate(event, context, callback)
}

module.exports.checkReceiptsForLeadMsg = (event, context, callback) => {
  checkReceiptsForLeadMsg(event, context, callback)
}
