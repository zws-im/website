import {Item as NavItem} from './components/Nav';
import Link from 'next/link';
import {Home as HomeSectionIds} from './sectionIds';
import {Anchor} from './components/typography/Anchor';
import React from 'react';

export const navItems: NavItem[] = [
	<Link key='stats' passHref href='/'>
		<Anchor variant='nav'>Stats</Anchor>
	</Link>,
	<Link key='questions' passHref href={`/#${HomeSectionIds.Faq}`}>
		<Anchor variant='nav'>Questions</Anchor>
	</Link>,
	<Link key='docs' passHref href='/'>
		<Anchor variant='nav'>Docs</Anchor>
	</Link>,
	<Anchor key='github' variant='nav' href='https://github.com/zws-im?utm_source=zws.im'>
		GitHub
	</Anchor>
];
