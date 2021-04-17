var httpRequest = require('request');

module.exports = function (req, res) {
    var client_id = '483061323052381',
    client_secret = '6f26d44f76b8a9e09266921fee6d5995',
    redirect_uri = 'http://localhost:3000/auth/instagram/callback',
    auth_url = 'https://api.instagram.com/oauth/authorize/?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&scope=user_profile,user_media'+ '&response_type=code'

	var options = {
		url: 'https://api.instagram.com/oauth/access_token',
		method: 'POST',
		form: {
			client_id: client_id,
			client_secret: client_secret,
			grant_type: 'authorization_code',
			redirect_uri: redirect_uri,
			code: req.query.code
		}
	};

	httpRequest(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var r = JSON.parse(body);
			var user = {
				id: r.user.id,
				username: r.user.username,
				full_name: r.user.full_name,
				bio: r.user.bio,
				website: r.user.website,
				profile_picture: r.user.profile_picture,
				access_token: r.access_token
			};
		}
	});

};