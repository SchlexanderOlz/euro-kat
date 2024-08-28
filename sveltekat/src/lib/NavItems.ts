export type Item = {
	title: string;
	references: {
		[title: string]: string;
	};
};

export const NavItems: Item[] = [
	{
		title: 'Figuren',
		references: { 'Alle Figuren': '/figures', 'Aktuelle Saison': '/current-series' }
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
		references: { Hilfe: '/help', Info: '/info', Legacy: '/legacy' }
	},
];

export const PremiumItems: Item[] = [
  {
  	title: 'Premium',
  	references: { 'Meine Figuren': '/my-figures', 'Meine Kategorien': '/my-categories', 'Verwalten': '/manage-sub' }
  }
]
