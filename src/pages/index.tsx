import {Box, Typography} from '@material-ui/core';
import React, {FC, useState} from 'react';
import {Faq} from '../components/Faq';
import {Hr} from '../components/Hr';
import {TextInput} from '../components/input/TextInput';
import {RandomizedText} from '../components/typography/RandomizedText';
import {Home as SectionIds} from '../sectionIds';
import styles from './index.module.scss';

const Header = () => (
	<>
		<Typography variant='h1'>Zero Width Shortener</Typography>

		<Typography variant='body2'>
			Shorten your URLs using invisible characters instead of ugly endings like <RandomizedText />.
		</Typography>
	</>
);

const Shorten = () => {
	const [longUrl, setLongUrl] = useState<string>();

	return (
		<main id={SectionIds.Shorten} className={styles.content}>
			<TextInput
				inputProps={{
					placeholder: 'https://en.wikipedia.org/wiki/Galactic_algorithm',
					type: 'url',
					autoFocus: true,
					value: longUrl,
					onChange: event => setLongUrl(event.target.value)
				}}
				buttonProps={{children: 'Shorten'}}
				onSubmit={event => {
					event.preventDefault();
					console.log({longUrl});
					alert(longUrl);
				}}
			/>
		</main>
	);
};

const FrequentlyAskedQuestions = () => (
	<Box id={SectionIds.Faq} marginY={4}>
		<Typography variant='h2'>Frequently Asked Questions</Typography>
		<Hr />
		{/*
      TODO: Should this be refactored to use children elements, something like:
      <Faq.Faq>
        <Faq.Item title='Title 1'>Description 1</Faq.Item>
        <Faq.Item title='Title 2'>Description 2</Faq.Item>
        <Faq.Item title='Title 3'>Description 3</Faq.Item>
      </Faq.Faq>
  */}
		<Faq
			faq={[
				{key: 'howItWorks', title: 'How does this tool work?', body: 'how it works '.repeat(10).trim()},
				{
					key: 'platformIssues',
					title: 'Why can I see some characters at the end of the link?',
					body: 'you probably have a stupid phone '.repeat(10).trim()
				},
				{key: 'brokenChatService', title: 'Why doesnt zws work on [chat service]?', body: 'broken chat service haha '.repeat(10).trim()}
			]}
		/>
	</Box>
);

const AboutUs = () => (
	<Box id={SectionIds.AboutUs} marginY={4}>
		<div className={styles['about-us-text']}>
			<Typography variant='h2'>About us</Typography>

			<Typography>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum nunc aliquet bibendum
				enim facilisis gravida neque convallis. Adipiscing at in tellus integer feugiat. Ultrices tincidunt arcu non sodales neque sodales. Quisque sagittis
				purus sit amet volutpat consequat mauris nunc. A pellentesque sit amet porttitor eget dolor. Tempor orci dapibus ultrices in iaculis nunc. At auctor
				urna nunc id cursus metus aliquam.
			</Typography>
		</div>

		{/* <AllContributors>
			{(props: AnchorProps) => (
				<Anchor href='https://jonah.pw/?utm_source=zws.im' {...props}>
					<Contributor src='https://avatars3.githubusercontent.com/u/7608555?s=256' alt='A fox made out of a pepperoni pizza' />
				</Anchor>
			)}
			{(props: AnchorProps) => (
				<Anchor href='https://overcoder.dev/?utm_source=zws.im' {...props}>
					<Contributor
						src='https://avatars3.githubusercontent.com/u/8523135?s=256'
						alt='Poorly scribbled white text on a black background saying "Overcoder"'
					/>
				</Anchor>
			)}
		</AllContributors> */}
	</Box>
);

const Home: FC = () => (
	<>
		<div className={styles.header}>
			<Header />

			<Shorten />
		</div>

		<FrequentlyAskedQuestions />

		<AboutUs />
	</>
);

export default Home;
