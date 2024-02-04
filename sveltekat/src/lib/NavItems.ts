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
		title: 'Help',
		references: { '': '/help' }
	},
	{
		title: 'Spezial',
		references: { Warnhinweiszettel: '/whz', Zusatzwarnzettel: '/zwz' }
	},
	{
		title: 'Info',
		references: { '': '/info' }
	},
	{
		title: 'Legacy',
		references: { '': '/legacy' }
	}
];
