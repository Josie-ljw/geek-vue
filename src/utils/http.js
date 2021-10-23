import axios from 'axios';

axios.defaults.timeout = 5000;
axios.defaults.baseURL = '';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

//http request 拦截器
axios.interceptors.request.use(
	config => {
		// const token = getCookie('名称');
		config.data = config.data;
		config.headers = {
			'Content-Type': 'text/plain'
		}
		// if(token){
		//   config.params = {'token':token}
		// }
		return config;
	},
	error => {
		return Promise.reject(err);
	}
);

//http response 拦截器
axios.interceptors.response.use(
	response => {
		if (response.data.errCode == 2) {
			router.push({
				path: "/login",
				querry: {
					redirect: router.currentRoute.fullPath
				} //从哪个页面跳转
			})
		}
    console.log(config.data, 'config.data')
    config.data=this.$qs.stringify(config.data)
		return response;
	},
	error => {
		return Promise.reject(error)
	}
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
				params: params
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(err => {
				reject(err)
			})
	})
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.post(url, data)
			.then(response => {
				resolve(response.data);
			}, err => {
				reject(err)
			})
	})
}