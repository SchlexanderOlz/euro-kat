export type Item = {
  title: string;
	references: {
		[title: string]: string;
	};
};

export const NavItems: Item[] = [
  {
    title: 'Figuren',
    references: {'': '/figures'}
  },
  {
    title: 'News',
    references: {'': '/news'}
  },
  {
    title: 'Spezial',
    references: {'Warnhinweiszettel': '/wzh', 'Zusatzwarnzettel': '/zwz', 'Maxi-Inhalte': '/maxi'}
  },
  {
    title: 'Legacy',
    references: {'': '/legacy'}
  }
];