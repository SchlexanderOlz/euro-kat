export type Item = {
	title: string;
	references: {
		[title: string]: string;
	};
};

export const NavItems: Item[] = [
	{
		title: 'Figuren',
		references: { '': '/figures' }
	},
	{
		title: 'Aktuelle Saison',
		references: { '': '/current-series' }
	},
	{
		title: 'Berichte',
		references: { '': '/reports' }
	},
	{
		title: 'Spezial',
		references: { Warnhinweiszettel: '/whz', Zusatzwarnzettel: '/zwz' }
	},
	{
		title: 'Weiteres',
		references: {
			Hilfe: '/help',
			Info: '/info',
			Legacy: '/legacy'
		}
	}
];

export const PremiumItems: Item[] = [
	{
		title: 'Premium',
		references: {
			Serien: '/series',
			'Meine Figuren': '/my-figures',
			'Meine Kategorien': '/my-categories',
			'Meine Wunschliste': '/my-wishlist',
			Verlauf: '/history',
			Verwalten: '/manage-sub'
		}
	}
];
