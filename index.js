import isObj from 'lodash/isObject.js';
import distance from 'gps-distance';
import readStations from 'db-hafas-stations';

import {defaultProfile} from './lib/default-profile.js';
import {validateProfile} from './lib/validate-profile.js';
import {INVALID_REQUEST} from './lib/errors.js';
import {HafasError} from './lib/errors.js';

// background info: https://github.com/public-transport/hafas-client/issues/286
const FORBIDDEN_USER_AGENTS = [
	'my-awesome-program', // previously used in readme.md, p/*/readme.md & docs/*.md
	'hafas-client-example', // previously used in p/*/example.js
	'link-to-your-project-or-email', // now used throughout
];

const isNonEmptyString = str => 'string' === typeof str && str.length > 0;

const validateLocation = (loc, name = 'location') => {
	if (!isObj(loc)) {
		throw new TypeError(name + ' must be an object.');
	} else if (loc.type !== 'location') {
		throw new TypeError('invalid location object.');
	} else if ('number' !== typeof loc.latitude) {
		throw new TypeError(name + '.latitude must be a number.');
	} else if ('number' !== typeof loc.longitude) {
		throw new TypeError(name + '.longitude must be a number.');
	}
};

const loadEnrichedStationData = () => new Promise((resolve, reject) => {
	const items = {};
	readStations.full()
		.on('data', (station) => {
			items[station.id] = station;
		})
		.once('end', () => {
			console.info('Loaded station index.');
			resolve(items);
		})
		.once('error', (err) => {
			reject(err);
		});
});

const createClient = (profile, userAgent, opt = {}) => {
	profile = Object.assign({}, defaultProfile, profile);
	validateProfile(profile);
	const common = {};
	if (opt.enrichStations !== false) {
		loadEnrichedStationData()
			.then(locations => {
				common.locations = locations;
			});
	}

	if ('string' !== typeof userAgent) {
		throw new TypeError('userAgent must be a string');
	}
	if (FORBIDDEN_USER_AGENTS.includes(userAgent.toLowerCase())) {
		throw new TypeError(`userAgent should tell the API operators how to contact you. If you have copied "${userAgent}" value from the documentation, please adapt it.`);
	}

	const _stationBoard = async (station, type, resultsField, parse, opt = {}) => {
		if (isObj(station) && station.id) {
			station = station.id;
		} else if ('string' !== typeof station) {
			throw new TypeError('station must be an object or a string.');
		}

		if ('string' !== typeof type || !type) {
			throw new TypeError('type must be a non-empty string.');
		}

		if (!profile.departuresGetPasslist && 'stopovers' in opt) {
			throw new Error('opt.stopovers is not supported by this endpoint');
		}
		if (!profile.departuresStbFltrEquiv && 'includeRelatedStations' in opt) {
			throw new Error('opt.includeRelatedStations is not supported by this endpoint');
		}

		opt = Object.assign({
			// todo: for arrivals(), this is actually a station it *has already* stopped by
			direction: null, // only show departures stopping by this station
			line: null, // filter by line ID
			duration: 10, // show departures for the next n minutes
			results: null, // max. number of results; `null` means "whatever HAFAS wants"
			subStops: true, // parse & expose sub-stops of stations?
			entrances: true, // parse & expose entrances of stops/stations?
			linesOfStops: false, // parse & expose lines at the stop/station?
			remarks: true, // parse & expose hints & warnings?
			stopovers: false, // fetch & parse previous/next stopovers?
			// departures at related stations
			// e.g. those that belong together on the metro map.
			includeRelatedStations: true,
		}, opt);
		opt.when = new Date(opt.when || Date.now());
		if (Number.isNaN(Number(opt.when))) {
			throw new Error('opt.when is invalid');
		}

		const req = profile.formatStationBoardReq({profile, opt}, station, resultsField);

		const {res} = await profile.request({profile, opt}, userAgent, req);

		const ctx = {profile, opt, common, res};
		const results = (res[resultsField] || res.items).map(res => parse(ctx, res)); // todo sort?

		return {
			[resultsField]: results,
			realtimeDataUpdatedAt: null, // TODO
		};
	};

	const departures = async (station, opt = {}) => {
		return await _stationBoard(station, 'DEP', 'departures', profile.parseDeparture, opt);
	};
	const arrivals = async (station, opt = {}) => {
		return await _stationBoard(station, 'ARR', 'arrivals', profile.parseArrival, opt);
	};

	const journeys = async (from, to, opt = {}) => {
		from = profile.formatLocation(profile, from, 'from');
		to = profile.formatLocation(profile, to, 'to');

		if ('earlierThan' in opt && 'laterThan' in opt) {
			throw new TypeError('opt.earlierThan and opt.laterThan are mutually exclusive.');
		}
		if ('departure' in opt && 'arrival' in opt) {
			throw new TypeError('opt.departure and opt.arrival are mutually exclusive.');
		}
		let journeysRef = null;
		if ('earlierThan' in opt) {
			if (!isNonEmptyString(opt.earlierThan)) {
				throw new TypeError('opt.earlierThan must be a non-empty string.');
			}
			if ('departure' in opt || 'arrival' in opt) {
				throw new TypeError('opt.earlierThan and opt.departure/opt.arrival are mutually exclusive.');
			}
			journeysRef = opt.earlierThan;
		}
		if ('laterThan' in opt) {
			if (!isNonEmptyString(opt.laterThan)) {
				throw new TypeError('opt.laterThan must be a non-empty string.');
			}
			if ('departure' in opt || 'arrival' in opt) {
				throw new TypeError('opt.laterThan and opt.departure/opt.arrival are mutually exclusive.');
			}
			journeysRef = opt.laterThan;
		}

		opt = Object.assign({
			results: null, // number of journeys – `null` means "whatever HAFAS returns"
			via: null, // let journeys pass this station?
			stopovers: false, // return stations on the way?
			transfers: null, // maximum nr of transfers
			transferTime: 0, // minimum time for a single transfer in minutes
			// todo: does this work with every endpoint?
			accessibility: 'none', // 'none', 'partial' or 'complete'
			bike: false, // only bike-friendly journeys
			walkingSpeed: 'normal', // 'slow', 'normal', 'fast'
			// Consider walking to nearby stations at the beginning of a journey?
			startWithWalking: true,
			tickets: false, // return tickets?
			polylines: false, // return leg shapes?
			subStops: true, // parse & expose sub-stops of stations?
			entrances: true, // parse & expose entrances of stops/stations?
			remarks: true, // parse & expose hints & warnings?
			scheduledDays: false, // parse & expose dates each journey is valid on?
		}, opt);
		if (opt.via) {
			opt.via = profile.formatLocation(profile, opt.via, 'opt.via');
		}

		if (opt.when !== undefined) {
			throw new Error('opt.when is not supported anymore. Use opt.departure/opt.arrival.');
		}
		let when = new Date(), outFrwd = true;
		if (opt.departure !== undefined && opt.departure !== null) {
			when = new Date(opt.departure);
			if (Number.isNaN(Number(when))) {
				throw new TypeError('opt.departure is invalid');
			}
		} else if (opt.arrival !== undefined && opt.arrival !== null) {
			if (!profile.journeysOutFrwd) {
				throw new Error('opt.arrival is unsupported');
			}
			when = new Date(opt.arrival);
			if (Number.isNaN(Number(when))) {
				throw new TypeError('opt.arrival is invalid');
			}
			outFrwd = false;
		}

		const filters = profile.formatProductsFilter({profile}, opt.products || {});
		// TODO opt.accessibility

		const query = {
			maxUmstiege: opt.transfers,
			minUmstiegszeit: opt.transferTime,
			deutschlandTicketVorhanden: false,
			nurDeutschlandTicketVerbindungen: false,
			reservierungsKontingenteVorhanden: false,
			schnelleVerbindungen: true,
			sitzplatzOnly: false,
			abfahrtsHalt: from.lid,
			zwischenhalte: opt.via
				? [{id: opt.via.lid}]
				: null,
			ankunftsHalt: to.lid,
			produktgattungen: filters,
			bikeCarriage: opt.bike,
			// TODO
			// todo: this is actually "take additional stations nearby the given start and destination station into account"
			// see rest.exe docs
			// ushrp: Boolean(opt.startWithWalking),
		};
		query.anfrageZeitpunkt = profile.formatTime(profile, when);
		if (journeysRef) {
			query.pagingReference = journeysRef;
		}
		query.ankunftSuche = outFrwd ? 'ABFAHRT' : 'ANKUNFT';
		if (opt.results !== null) {
			// TODO query.numF = opt.results;
		}
		const req = profile.transformJourneysQuery({profile, opt}, query);
		const {res} = await profile.request({profile, opt}, userAgent, req);
		const ctx = {profile, opt, common, res};
		const verbindungen = opt.results ? res.verbindungen.slice(0, opt.results) : res.verbindungen;
		const journeys = verbindungen
			.map(j => profile.parseJourney(ctx, j));

		return {
			earlierRef: res.verbindungReference?.earlier || null,
			laterRef: res.verbindungReference?.later || null,
			journeys,
			realtimeDataUpdatedAt: null, // TODO
		};
	};

	const refreshJourney = async (refreshToken, opt = {}) => {
		if ('string' !== typeof refreshToken || !refreshToken) {
			throw new TypeError('refreshToken must be a non-empty string.');
		}

		opt = Object.assign({
			stopovers: false, // return stations on the way?
			tickets: false, // return tickets?
			polylines: false, // return leg shapes? (not supported by all endpoints)
			subStops: true, // parse & expose sub-stops of stations?
			entrances: true, // parse & expose entrances of stops/stations?
			remarks: true, // parse & expose hints & warnings?
			scheduledDays: false, // parse & expose dates the journey is valid on?
		}, opt);

		const req = profile.formatRefreshJourneyReq({profile, opt}, refreshToken);

		const {res} = await profile.request({profile, opt}, userAgent, req);
		const ctx = {profile, opt, common, res};

		return {
			journey: profile.parseJourney(ctx, res.verbindungen[0]),
			realtimeDataUpdatedAt: null, // TODO
		};
	};

	const locations = async (query, opt = {}) => {
		if (!isNonEmptyString(query)) {
			throw new TypeError('query must be a non-empty string.');
		}
		opt = Object.assign({
			fuzzy: true, // find only exact matches?
			results: 5, // how many search results?
			stops: true, // return stops/stations?
			addresses: true,
			poi: true, // points of interest
			subStops: true, // parse & expose sub-stops of stations?
			entrances: true, // parse & expose entrances of stops/stations?
			linesOfStops: false, // parse & expose lines at each stop/station?
		}, opt);
		const req = profile.formatLocationsReq({profile, opt}, query);

		const {res} = await profile.request({profile, opt}, userAgent, req);

		const ctx = {profile, opt, common, res};
		return res.map(loc => profile.parseLocation(ctx, loc));
	};

	const stop = async (stop, opt = {}) => { // TODO
		if ('object' === typeof stop) {
			stop = profile.formatStation(stop.id);
		} else if ('string' === typeof stop) {
			stop = profile.formatStation(stop);
		} else {
			throw new TypeError('stop must be an object or a string.');
		}

		opt = Object.assign({
			linesOfStops: false, // parse & expose lines at the stop/station?
			subStops: true, // parse & expose sub-stops of stations?
			entrances: true, // parse & expose entrances of stops/stations?
			remarks: true, // parse & expose hints & warnings?
		}, opt);

		const req = profile.formatStopReq({profile, opt}, stop);

		const {res} = await profile.request({profile, opt}, userAgent, req);
		if (!res || !Array.isArray(res.locL) || !res.locL[0]) {
			throw new HafasError('invalid response, expected locL[0]', null, {
				// This problem occurs on invalid input. 🙄
				code: INVALID_REQUEST,
			});
		}

		const ctx = {profile, opt, res, common};
		return profile.parseLocation(ctx, res.locL[0]);
	};

	const nearby = async (location, opt = {}) => {
		validateLocation(location, 'location');

		opt = Object.assign({
			results: 8, // maximum number of results
			distance: null, // maximum walking distance in meters
			poi: false, // return points of interest?
			stops: true, // return stops/stations?
			subStops: true, // parse & expose sub-stops of stations?
			entrances: true, // parse & expose entrances of stops/stations?
			linesOfStops: false, // parse & expose lines at each stop/station?
		}, opt);

		const req = profile.formatNearbyReq({profile, opt}, location);
		const {res} = await profile.request({profile, opt}, userAgent, req);

		const ctx = {profile, opt, common, res};
		const results = res.map(loc => {
			const res = profile.parseLocation(ctx, loc);
			if (res.latitude || res.location?.latitude) {
				res.distance = Math.round(distance(location.latitude, location.longitude, res.latitude || res.location?.latitude, res.longitude || res.location?.longitude) * 1000);
			}
			return res;
		});

		return Number.isInteger(opt.results)
			? results.slice(0, opt.results)
			: results;
	};

	const trip = async (id, opt = {}) => {
		if (!isNonEmptyString(id)) {
			throw new TypeError('id must be a non-empty string.');
		}
		opt = Object.assign({
			stopovers: true, // return stations on the way?
			polyline: false, // return a track shape?
			subStops: true, // parse & expose sub-stops of stations?
			entrances: true, // parse & expose entrances of stops/stations?
			remarks: true, // parse & expose hints & warnings?
			scheduledDays: false, // parse & expose dates trip is valid on?
		}, opt);

		const req = profile.formatTripReq({profile, opt}, id);

		const {res} = await profile.request({profile, opt}, userAgent, req);
		const ctx = {profile, opt, common, res};

		const trip = profile.parseTrip(ctx, res.journey);

		return {
			trip,
			realtimeDataUpdatedAt: res.planrtTS && res.planrtTS !== '0'
				? parseInt(res.planrtTS)
				: null,
		};
	};

	// todo [breaking]: rename to trips()?
	const tripsByName = async (lineNameOrFahrtNr = '*', opt = {}) => {
		if (!isNonEmptyString(lineNameOrFahrtNr)) {
			throw new TypeError('lineNameOrFahrtNr must be a non-empty string.');
		}
		opt = Object.assign({
			when: null,
			fromWhen: null, untilWhen: null,
			onlyCurrentlyRunning: true,
			products: {},
			currentlyStoppingAt: null,
			lineName: null,
			operatorNames: null,
			additionalFilters: [], // undocumented
		}, opt);

		const req = {
			// fields: https://github.com/marudor/BahnhofsAbfahrten/blob/f619e754f212980261eb7e2b151cd73ba0213da8/packages/types/HAFAS/JourneyMatch.ts#L4-L23
			input: lineNameOrFahrtNr,
			onlyCR: opt.onlyCurrentlyRunning,
			jnyFltrL: [
				profile.formatProductsFilter({profile}, opt.products),
			],
			// todo: passing `tripId` yields a `CGI_READ_FAILED` error
			// todo: passing a stop ID as `extId` yields a `PARAMETER` error
			// todo: `onlyRT: true` reduces the number of results, but filters recent trips 🤔
			// todo: `onlyTN: true` yields a `NO_MATCH` error
			// todo: useAeqi
		};
		if (opt.when !== null) {
			req.date = profile.formatDate(profile, new Date(opt.when));
			req.time = profile.formatTime(profile, new Date(opt.when));
		}
		// todo: fromWhen doesn't work yet, but untilWhen does
		if (opt.fromWhen !== null) {
			req.dateB = profile.formatDate(profile, new Date(opt.fromWhen));
			req.timeB = profile.formatTime(profile, new Date(opt.fromWhen));
		}
		if (opt.untilWhen !== null) {
			req.dateE = profile.formatDate(profile, new Date(opt.untilWhen));
			req.timeE = profile.formatTime(profile, new Date(opt.untilWhen));
		}
		const filter = (mode, type, value) => ({mode, type, value});
		if (opt.currentlyStoppingAt !== null) {
			if (!isNonEmptyString(opt.currentlyStoppingAt)) {
				throw new TypeError('opt.currentlyStoppingAt must be a non-empty string.');
			}
			req.jnyFltrL.push(filter('INC', 'STATIONS', opt.currentlyStoppingAt));
		}
		if (opt.lineName !== null) {
			if (!isNonEmptyString(opt.lineName)) {
				throw new TypeError('opt.lineName must be a non-empty string.');
			}
			// todo: does this target `line` or `lineId`?
			req.jnyFltrL.push(filter('INC', 'LINE', opt.lineName));
		}
		if (opt.operatorNames !== null) {
			if (
				!Array.isArray(opt.operatorNames)
				|| opt.operatorNames.length === 0
				|| !opt.operatorNames.every(isNonEmptyString)
			) {
				throw new TypeError('opt.operatorNames must be an array of non-empty strings.');
			}
			// todo: is the an escaping mechanism for ","
			req.jnyFltrL.push(filter('INC', 'OP', opt.operatorNames.join(',')));
		}
		req.jnyFltrL = [...req.jnyFltrL, ...opt.additionalFilters];

		const {res} = await profile.request({profile, opt}, userAgent, {
			cfg: {polyEnc: 'GPA'},
			meth: 'JourneyMatch',
			req,
		});
		// todo [breaking]: catch `NO_MATCH` errors, return []
		const ctx = {profile, opt, common, res};

		const trips = res.jnyL.map(t => profile.parseTrip(ctx, t));

		return {
			trips,
			realtimeDataUpdatedAt: res.planrtTS && res.planrtTS !== '0'
				? parseInt(res.planrtTS)
				: null,
		};
	};

	const client = {
		departures,
		arrivals,
		journeys,
		locations,
		stop,
		nearby,
	};
	if (profile.trip) {
		client.trip = trip;
	}
	if (profile.refreshJourney) {
		client.refreshJourney = refreshJourney;
	}
	if (profile.tripsByName) {
		client.tripsByName = tripsByName;
	}
	Object.defineProperty(client, 'profile', {value: profile});
	return client;
};

export {
	createClient,
};
