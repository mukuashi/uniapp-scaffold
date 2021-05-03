function set(key, data, sync = true) {
	try {
		if (sync) {
			return uni.setStorageSync(key, data);
		}
			uni.setStorage({
				key,
				data,
				success(res) {

				},
			});
	} catch (e) {
		return false;
	}
}

function get(key, sync = true) {
	try {
		if (sync) {
			return uni.getStorageSync(key);
		}
			let val = '';
			uni.getStorage({
				key,
				success(res) {
					val = res.data;
				},
			});
			return val;
	} catch (e) {
		return false;
	}
}

function info(sync = false) {
	try {
		if (sync) {
			return uni.getStorageInfoSync();
		}
			let val = '';
			uni.getStorageInfo({
				success(res) {
					val = res;
				},
			});
			return val;
	} catch (e) {
		return false;
	}
}

function remove(key, sync = true) {
	try {
		if (sync) {
			return uni.removeStorageSync(key);
		}
			uni.removeStorage({
				key,
			});
	} catch (e) {
		return false;
	}
}

function clear(sync = true) {
	try {
		if (sync) {
			return uni.clearStorageSync();
		}
			uni.clearStorage();
	} catch (e) {
		return false;
	}
}

function has(key, sync = true) {
	try {
		if (sync) {
			return uni.getStorageSync(key) !== null;
		}
			let val = false;
			uni.getStorage({
				key,
				success(res) {
					val = res.data !== null;
				},
			});
			return val;
	} catch (e) {
		return false;
	}
}

const storage = {
	get,
	set,
	info,
	remove,
	clear,
	has,
};
export default storage;
