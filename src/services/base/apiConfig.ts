export default class ApiConfig {
    createQueryString(params = {}) {
        const usp: any = new URLSearchParams();
        for (var [key, value] of Object.entries(params)) {
            if (Array.isArray(value)) {
                value.forEach(function (v, k) {
                    usp.append(key + '[]', v);
                })
            } else {
                usp.append(key, value);
            }
        }
        return usp.toString();
    }
}