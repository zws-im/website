import {Item as NavItem} from './components/Nav';
import Link from 'next/link';
import {Home as HomeSectionIds} from './sectionIds';
import {Anchor} from './components/typography/Anchor';
import React from 'react';

export const navItems: NavItem[] = [
	{
		key: 'stats',
		to: (
			<Link key='stats' passHref href='/'>
				<Anchor>Stats</Anchor>
			</Link>
		)
	},
	{
		key: 'questions',
		to: (
			<Link key='questions' passHref href={`/#${HomeSectionIds.Faq}`}>
				<Anchor>Questions</Anchor>
			</Link>
		)
	},
	{
		key: 'docs',
		to: (
			<Link key='docs' passHref href='/'>
				<Anchor>Docs</Anchor>
			</Link>
		)
	},
	{
		key: 'github',
		to: (
			<Anchor key='github' href='https://github.com/zws-im?utm_source=zws.im'>
				GitHub
			</Anchor>
		)
	}
];
