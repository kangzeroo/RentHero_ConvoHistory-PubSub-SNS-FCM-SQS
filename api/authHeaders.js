
exports.authHeaders = function(access_token){
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    }
  }
}
