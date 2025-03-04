const dbTrip = {
	trip: {
		id: 'foo',
		origin: {
			type: 'station',
			id: '8004168',
			name: 'München Flughafen Terminal',
			location: {
				type: 'location',
				id: '8004168',
				latitude: 48.353733,
				longitude: 11.785973,
			},
		},
		destination: {
			type: 'station',
			id: '8000284',
			name: 'Nürnberg Hbf',
			location: {
				type: 'location',
				id: '8000284',
				latitude: 49.445435,
				longitude: 11.08227,
			},
		},
		departure: '2025-01-17T15:16:00+01:00',
		plannedDeparture: '2025-01-17T15:16:00+01:00',
		departureDelay: null,
		arrival: '2025-01-17T17:49:00+01:00',
		plannedArrival: '2025-01-17T17:49:00+01:00',
		arrivalDelay: null,
		line: {
			type: 'line',
			id: 'ag-re22',
			fahrtNr: '84100',
			name: 'ag RE22',
			public: true,
			productName: 'ag',
			mode: 'train',
			product: 'regional',
			operator: {
				type: 'operator',
				id: 'agilis',
				name: 'agilis',
			},
		},
		direction: 'Nürnberg Hbf',
		arrivalPlatform: '13',
		plannedArrivalPlatform: '13',
		departurePlatform: '1',
		plannedDeparturePlatform: '1',
		stopovers: [
			{
				stop: {
					type: 'station',
					id: '8004168',
					name: 'München Flughafen Terminal',
					location: {
						type: 'location',
						id: '8004168',
						latitude: 48.353733,
						longitude: 11.785973,
					},
				},
				arrival: null,
				plannedArrival: null,
				arrivalDelay: null,
				arrivalPlatform: '1',
				arrivalPrognosisType: null,
				plannedArrivalPlatform: '1',
				departure: '2025-01-17T15:16:00+01:00',
				plannedDeparture: '2025-01-17T15:16:00+01:00',
				departureDelay: null,
				departurePlatform: '1',
				departurePrognosisType: null,
				plannedDeparturePlatform: '1',
				remarks: [
					{
						code: 'text.journeystop.product.or.direction.changes.stop.message',
						summary: 'As ag 84100 heading towards Nürnberg Hbf from here',
						text: 'As ag 84100 heading towards Nürnberg Hbf from here',
						type: 'hint',
						priority: 100,
					},
				],
			},
			{
				stop: {
					type: 'station',
					id: '8004167',
					name: 'München Flughafen Besucherpark',
					location: {
						type: 'location',
						id: '8004167',
						latitude: 48.352097,
						longitude: 11.764174,
					},
				},
				arrival: '2025-01-17T15:18:00+01:00',
				plannedArrival: '2025-01-17T15:18:00+01:00',
				arrivalDelay: null,
				arrivalPlatform: '1',
				arrivalPrognosisType: null,
				plannedArrivalPlatform: '1',
				departure: '2025-01-17T15:18:00+01:00',
				plannedDeparture: '2025-01-17T15:18:00+01:00',
				departureDelay: null,
				departurePlatform: '1',
				departurePrognosisType: null,
				plannedDeparturePlatform: '1',
				remarks: [],
			},
			{
				stop: {
					type: 'station',
					id: '8002078',
					name: 'Freising',
					location: {
						type: 'location',
						id: '8002078',
						latitude: 48.39498,
						longitude: 11.744551,
					},
				},
				arrival: '2025-01-17T15:28:00+01:00',
				plannedArrival: '2025-01-17T15:28:00+01:00',
				arrivalDelay: null,
				arrivalPlatform: '4',
				arrivalPrognosisType: null,
				plannedArrivalPlatform: '4',
				departure: '2025-01-17T15:29:00+01:00',
				plannedDeparture: '2025-01-17T15:29:00+01:00',
				departureDelay: null,
				departurePlatform: '4',
				departurePrognosisType: null,
				plannedDeparturePlatform: '4',
				remarks: [],
			},
			{
				stop: {
					type: 'station',
					id: '8004084',
					name: 'Moosburg',
					location: {
						type: 'location',
						id: '8004084',
						latitude: 48.46998,
						longitude: 11.930492,
					},
				},
				arrival: '2025-01-17T15:37:00+01:00',
				plannedArrival: '2025-01-17T15:37:00+01:00',
				arrivalDelay: null,
				arrivalPlatform: '1',
				arrivalPrognosisType: null,
				plannedArrivalPlatform: '1',
				departure: '2025-01-17T15:38:00+01:00',
				plannedDeparture: '2025-01-17T15:38:00+01:00',
				departureDelay: null,
				departurePlatform: '1',
				departurePrognosisType: null,
				plannedDeparturePlatform: '1',
				remarks: [],
			},
			{
				stop: {
					type: 'station',
					id: '8000217',
					name: 'Landshut(Bay)Hbf',
					location: {
						type: 'location',
						id: '8000217',
						latitude: 48.547512,
						longitude: 12.135878,
					},
				},
				arrival: '2025-01-17T15:50:00+01:00',
				plannedArrival: '2025-01-17T15:50:00+01:00',
				arrivalDelay: null,
				arrivalPlatform: '5',
				arrivalPrognosisType: null,
				plannedArrivalPlatform: '5',
				departure: '2025-01-17T15:53:00+01:00',
				plannedDeparture: '2025-01-17T15:53:00+01:00',
				departureDelay: null,
				departurePlatform: '5',
				departurePrognosisType: null,
				plannedDeparturePlatform: '5',
				remarks: [],
			},
			{
				stop: {
					type: 'station',
					id: '8001835',
					name: 'Ergoldsbach',
					location: {
						type: 'location',
						id: '8001835',
						latitude: 48.69383,
						longitude: 12.201877,
					},
				},
				arrival: '2025-01-17T16:05:00+01:00',
				plannedArrival: '2025-01-17T16:05:00+01:00',
				arrivalDelay: null,
				arrivalPlatform: '1',
				arrivalPrognosisType: null,
				plannedArrivalPlatform: '1',
				departure: '2025-01-17T16:06:00+01:00',
				plannedDeparture: '2025-01-17T16:06:00+01:00',
				departureDelay: null,
				departurePlatform: '1',
				departurePrognosisType: null,
				plannedDeparturePlatform: '1',
				remarks: [],
			},
			{
				stop: {
					type: 'station',
					id: '8000688',
					name: 'Neufahrn(Niederbay)',
					location: {
						type: 'location',
						id: '8000688',
						latitude: 48.729866,
						longitude: 12.19046,
					},
				},
				arrival: '2025-01-17T16:09:00+01:00',
				plannedArrival: '2025-01-17T16:09:00+01:00',
				arrivalDelay: null,
				arrivalPlatform: '2',
				arrivalPrognosisType: null,
				plannedArrivalPlatform: '2',
				departure: '2025-01-17T16:10:00+01:00',
				plannedDeparture: '2025-01-17T16:10:00+01:00',
				departureDelay: null,
				departurePlatform: '2',
				departurePrognosisType: null,
				plannedDeparturePlatform: '2',
				remarks: [],
			},
			{
				stop: {
					type: 'station',
					id: '8001679',
					name: 'Eggmühl',
					location: {
						type: 'location',
						id: '8001679',
						latitude: 48.8365,
						longitude: 12.182217,
					},
				},
				arrival: '2025-01-17T16:19:00+01:00',
				plannedArrival: '2025-01-17T16:19:00+01:00',
				arrivalDelay: null,
				arrivalPlatform: '3',
				arrivalPrognosisType: null,
				plannedArrivalPlatform: '3',
				departure: '2025-01-17T16:20:00+01:00',
				plannedDeparture: '2025-01-17T16:20:00+01:00',
				departureDelay: null,
				departurePlatform: '3',
				departurePrognosisType: null,
				plannedDeparturePlatform: '3',
				remarks: [],
			},
			{
				stop: {
					type: 'station',
					id: '8002506',
					name: 'Hagelstadt',
					location: {
						type: 'location',
						id: '8002506',
						latitude: 48.896034,
						longitude: 12.214812,
					},
				},
				arrival: '2025-01-17T16:25:00+01:00',
				plannedArrival: '2025-01-17T16:25:00+01:00',
				arrivalDelay: null,
				arrivalPlatform: '2',
				arrivalPrognosisType: null,
				plannedArrivalPlatform: '2',
				departure: '2025-01-17T16:26:00+01:00',
				plannedDeparture: '2025-01-17T16:26:00+01:00',
				departureDelay: null,
				departurePlatform: '2',
				departurePrognosisType: null,
				plannedDeparturePlatform: '2',
				remarks: [],
			},
			{
				stop: {
					type: 'station',
					id: '8003357',
					name: 'Köfering',
					location: {
						type: 'location',
						id: '8003357',
						latitude: 48.931694,
						longitude: 12.208736,
					},
				},
				arrival: '2025-01-17T16:29:00+01:00',
				plannedArrival: '2025-01-17T16:29:00+01:00',
				arrivalDelay: null,
				arrivalPlatform: '2',
				arrivalPrognosisType: null,
				plannedArrivalPlatform: '2',
				departure: '2025-01-17T16:30:00+01:00',
				plannedDeparture: '2025-01-17T16:30:00+01:00',
				departureDelay: null,
				departurePlatform: '2',
				departurePrognosisType: null,
				plannedDeparturePlatform: '2',
				remarks: [],
			},
			{
				stop: {
					type: 'station',
					id: '8004592',
					name: 'Obertraubling',
					location: {
						type: 'location',
						id: '8004592',
						latitude: 48.967514,
						longitude: 12.169974,
					},
				},
				arrival: '2025-01-17T16:33:00+01:00',
				plannedArrival: '2025-01-17T16:33:00+01:00',
				arrivalDelay: null,
				arrivalPlatform: '2',
				arrivalPrognosisType: null,
				plannedArrivalPlatform: '2',
				departure: '2025-01-17T16:34:00+01:00',
				plannedDeparture: '2025-01-17T16:34:00+01:00',
				departureDelay: null,
				departurePlatform: '2',
				departurePrognosisType: null,
				plannedDeparturePlatform: '2',
				remarks: [],
			},
			{
				stop: {
					type: 'station',
					id: '8000309',
					name: 'Regensburg Hbf',
					location: {
						type: 'location',
						id: '8000309',
						latitude: 49.01175,
						longitude: 12.099669,
					},
				},
				arrival: '2025-01-17T16:41:00+01:00',
				plannedArrival: '2025-01-17T16:41:00+01:00',
				arrivalDelay: null,
				arrivalPlatform: '5',
				arrivalPrognosisType: null,
				plannedArrivalPlatform: '5',
				departure: '2025-01-17T16:45:00+01:00',
				plannedDeparture: '2025-01-17T16:45:00+01:00',
				departureDelay: null,
				departurePlatform: '5',
				departurePrognosisType: null,
				plannedDeparturePlatform: '5',
				remarks: [
					{
						code: 'text.journeystop.product.or.direction.changes.stop.message',
						summary: 'As ag 63070 heading towards Nürnberg Hbf from here',
						text: 'As ag 63070 heading towards Nürnberg Hbf from here',
						type: 'hint',
						priority: 100,
					},
				],
			},
			{
				stop: {
					type: 'station',
					id: '8000882',
					name: 'Beratzhausen',
					location: {
						type: 'location',
						id: '8000882',
						latitude: 49.09251,
						longitude: 11.808527,
					},
				},
				arrival: '2025-01-17T17:02:00+01:00',
				plannedArrival: '2025-01-17T17:02:00+01:00',
				arrivalDelay: null,
				arrivalPlatform: '2',
				arrivalPrognosisType: null,
				plannedArrivalPlatform: '2',
				departure: '2025-01-17T17:02:00+01:00',
				plannedDeparture: '2025-01-17T17:02:00+01:00',
				departureDelay: null,
				departurePlatform: '2',
				departurePrognosisType: null,
				plannedDeparturePlatform: '2',
				remarks: [],
			},
			{
				stop: {
					type: 'station',
					id: '8004755',
					name: 'Parsberg',
					location: {
						type: 'location',
						id: '8004755',
						latitude: 49.16416,
						longitude: 11.724136,
					},
				},
				arrival: '2025-01-17T17:08:00+01:00',
				plannedArrival: '2025-01-17T17:08:00+01:00',
				arrivalDelay: null,
				arrivalPlatform: '2',
				arrivalPrognosisType: null,
				plannedArrivalPlatform: '2',
				departure: '2025-01-17T17:09:00+01:00',
				plannedDeparture: '2025-01-17T17:09:00+01:00',
				departureDelay: null,
				departurePlatform: '2',
				departurePrognosisType: null,
				plannedDeparturePlatform: '2',
				remarks: [],
			},
			{
				stop: {
					type: 'station',
					id: '8004305',
					name: 'Neumarkt(Oberpf)',
					location: {
						type: 'location',
						id: '8004305',
						latitude: 49.273193,
						longitude: 11.456986,
					},
				},
				arrival: '2025-01-17T17:25:00+01:00',
				plannedArrival: '2025-01-17T17:25:00+01:00',
				arrivalDelay: null,
				arrivalPlatform: '1',
				arrivalPrognosisType: null,
				plannedArrivalPlatform: '1',
				departure: '2025-01-17T17:26:00+01:00',
				plannedDeparture: '2025-01-17T17:26:00+01:00',
				departureDelay: null,
				departurePlatform: '1',
				departurePrognosisType: null,
				plannedDeparturePlatform: '1',
				remarks: [],
			},
			{
				stop: {
					type: 'station',
					id: '8000284',
					name: 'Nürnberg Hbf',
					location: {
						type: 'location',
						id: '8000284',
						latitude: 49.445435,
						longitude: 11.08227,
					},
				},
				arrival: '2025-01-17T17:49:00+01:00',
				plannedArrival: '2025-01-17T17:49:00+01:00',
				arrivalDelay: null,
				arrivalPlatform: '13',
				arrivalPrognosisType: null,
				plannedArrivalPlatform: '13',
				departure: null,
				plannedDeparture: null,
				departureDelay: null,
				departurePlatform: '13',
				departurePrognosisType: null,
				plannedDeparturePlatform: '13',
				remarks: [],
			},
		],
		remarks: [
			{
				code: 'ZR',
				summary: 'vertraglicher Beförderer DB Regio (München Flughafen Terminal - Regensburg Hbf)',
				text: 'vertraglicher Beförderer DB Regio (München Flughafen Terminal - Regensburg Hbf)',
				type: 'hint',
				priority: 150,
			},
			{
				text: 'Number of bicycles conveyed limited',
				type: 'hint',
				code: 'bicycle-conveyance',
				summary: 'bicycles conveyed',
			},
			{
				code: 'EA',
				summary: 'Behindertengerechte Ausstattung',
				text: 'Behindertengerechte Ausstattung',
				type: 'hint',
				priority: 560,
			},
			{
				text: 'power sockets for laptop',
				type: 'hint',
				code: 'power-sockets',
				summary: 'power sockets available',
			},
			{
				text: 'air conditioning',
				type: 'hint',
				code: 'air-conditioned',
				summary: 'air-conditioned vehicle',
			},
			{
				text: 'Wifi available',
				type: 'hint',
				code: 'wifi',
				summary: 'WiFi available',
			},
		],
		cancelled: false,
	},
	realtimeDataUpdatedAt: null,
};

export {
	dbTrip,
};
