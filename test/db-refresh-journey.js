// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module';
const require = createRequire(import.meta.url);

import tap from 'tap';

import {createClient} from '../index.js';
import {profile as rawProfile} from '../p/db/index.js';
const res = require('./fixtures/db-refresh-journey.json');
import {dbJourney as expected} from './fixtures/db-refresh-journey.js';

const client = createClient(rawProfile, 'public-transport/hafas-client:test', {enrichStations: false});
const {profile} = client;

const opt = {
	results: null,
	via: null,
	stopovers: false,
	transfers: -1,
	transferTime: 0,
	accessibility: 'none',
	bike: false,
	tickets: true,
	polylines: true,
	remarks: true,
	walkingSpeed: 'normal',
	startWithWalking: true,
	scheduledDays: false,
	departure: '2020-04-10T20:33+02:00',
	products: {},
};

tap.test('parses a refresh journey correctly (DB)', (t) => {
	const ctx = {profile, opt, common: null, res};
	const journey = profile.parseJourney(ctx, res.verbindungen[0]);

	t.same(journey, expected.journey);
	t.end();
});
