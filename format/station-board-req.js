const formatStationBoardReq = (ctx, station, type) => {
	const {profile, opt} = ctx;

	return {
		endpoint: profile.boardEndpoint,
		path: (type == 'departures' ? 'departure' : 'arrival') + '/' + station,
		query: {
			// TODO direction, fields below
			modeOfTransport: profile.formatProductsFilter(ctx, opt.products || {}, 'ris'),
			timeStart: profile.formatTime(profile, opt.when, true),
			timeEnd: profile.formatTime(profile, opt.when.getTime() + opt.duration * 60 * 1000, true),
			expandTimeFrame: 'TIME_END', // TODO impact?
		},
		method: 'get',
	};
};

/*
TODO separate RIS::Boards profile?
const formatRisStationBoardReq = (ctx, station, type) => {
	const {profile, opt} = ctx;

	return {
		endpoint: profile.boardEndpoint,
		path: type + '/' + station,
		query: {
			// TODO direction
			filterTransports: profile.formatProductsFilter(ctx, opt.products || {}, 'ris'),
			timeStart: profile.formatTime(profile, opt.when, true),
			timeEnd: profile.formatTime(profile, opt.when.getTime() + opt.duration * 60 * 1000, true),
			maxViaStops: opt.stopovers ? undefined : 0,
			includeStationGroup: opt.includeRelatedStations,
			maxTransportsPerType: opt.results === Infinity ? undefined : opt.results,
			includeMessagesDisruptions: opt.remarks,
			sortBy: 'TIME_SCHEDULE',
		},
		method: 'get',
		headers: {
			'Db-Client-Id': process.env.DB_CLIENT_ID,
			'Db-Api-Key': process.env.DB_API_KEY,
			'Accept': 'application/vnd.de.db.ris+json',
		},
	};
};
*/

export {
	formatStationBoardReq,
};
