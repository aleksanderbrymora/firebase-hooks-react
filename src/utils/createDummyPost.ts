import faker from 'faker';

export const createDummyPost = () => {
	const post = {
		user: faker.internet.userName(),
		post: faker.lorem.paragraph(),
		date: faker.date.past(),
		phone: faker.phone.phoneNumber(),
		age: faker.random.number(100),
	};

	return post;
};
