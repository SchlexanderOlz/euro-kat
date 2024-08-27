export type Item = {
	title: string;
	references: {
		[title: string]: string;
	};
};

export const NavItems: Item[] = [
	{
		title: 'Figuren',
		references: { "Alle Figuren": '/figures', "Aktuelle Saison": '/current-series' }
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
  {
    title: 'Deine Kategorien',
    references: { '': '/my-categories' }
  }
];
