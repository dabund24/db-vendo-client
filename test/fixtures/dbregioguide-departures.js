const dbDepartures = [
	{
		tripId: '20241212-d1494ce6-1a01-38de-bf84-c0bceb12f503',
		stop: {
			type: 'station',
			id: '8000365',
			name: 'Dombühl',
		},
		when: '2024-12-12T12:34:00+01:00',
		plannedWhen: '2024-12-12T12:34:00+01:00',
		delay: 0,
		platform: '3',
		plannedPlatform: '3',
		direction: 'Nürnberg Hbf',
		provenance: null,
		line: {
			type: 'line',
			id: 're-90-88617',
			fahrtNr: '88617',
			name: 'RE 90',
			public: true,
			productName: 'RE',
			mode: 'train',
			product: 'regional',
			adminCode: 'GARE',
			operator: {
				type: 'operator',
				id: 'RE',
				name: 'Arverio Baden-Württemberg (RE)',
			},
		},
		remarks: [],
		origin: null,
		destination: {
			type: 'station',
			id: '8000284',
			name: 'Nürnberg Hbf',
		},
	},
	{
		tripId: '20241212-abd01ce0-cca3-3759-aa4b-410ea4d0a720',
		stop: {
			type: 'station',
			id: '682943',
			name: 'Bahnhof, Dombühl',
		},
		when: '2024-12-12T12:50:00+01:00',
		plannedWhen: '2024-12-12T12:50:00+01:00',
		delay: null,
		platform: null,
		plannedPlatform: null,
		direction: 'Gymnasium, Dinkelsbühl',
		provenance: null,
		line: {
			type: 'line',
			id: 'bus-813-2221',
			fahrtNr: '2221',
			name: 'Bus 813',
			public: true,
			productName: 'Bus',
			mode: 'bus',
			product: 'bus',
			adminCode: 'vgn063',
			operator: {
				type: 'operator',
				id: 'DPN',
				name: 'Nahreisezug',
			},
		},
		remarks: [],
		origin: null,
		destination: {
			type: 'station',
			id: '676542',
			name: 'Gymnasium, Dinkelsbühl',
		},
	},
	{
		tripId: '20241212-ab6272a5-4bf6-32c1-9344-b47e1fc49eeb',
		stop: {
			type: 'station',
			id: '682943',
			name: 'Bahnhof, Dombühl',
		},
		when: '2024-12-12T12:50:00+01:00',
		plannedWhen: '2024-12-12T12:50:00+01:00',
		delay: null,
		platform: null,
		plannedPlatform: null,
		direction: 'Bahnhof, Rothenburg ob der Tauber',
		provenance: null,
		line: {
			type: 'line',
			id: 'bus-807-2177',
			fahrtNr: '2177',
			name: 'Bus 807',
			public: true,
			productName: 'Bus',
			mode: 'bus',
			product: 'bus',
			adminCode: 'vgn063',
			operator: {
				type: 'operator',
				id: 'DPN',
				name: 'Nahreisezug',
			},
		},
		remarks: [],
		origin: null,
		destination: {
			type: 'station',
			id: '683407',
			name: 'Bahnhof, Rothenburg ob der Tauber',
		},
	},
];

export {
	dbDepartures,
};
