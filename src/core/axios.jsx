import axios from 'axios';

const Axios = axios.create({
	baseURL: 'https://apiko-2021-spring-course-api.herokuapp.com',
	headers: {
		// Authorization: "Bearer ",
	}
});

export { Axios };
