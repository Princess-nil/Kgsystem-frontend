import axios from "axios"
import qs from "qs";


const SERVER_HOST = "http://127.0.0.1:5000"


class Http {
	constructor() {
        this.server_host = SERVER_HOST;
		this.http = axios.create({
			baseURL: this.server_host,
			timeout: 1000*60
		});
	}

	_post(url, data){
		return this.http.post(url, qs.stringify(data));
	}

    gethomepage(){
		const url = "/"
		return this.http.get(url);
	}

	deleteGraph(graphid){
		const url = "/delete"
		return this._post(url, {"graphid": graphid})
	}

	getdatabagpage(){
		const url = "/databag"
		return this.http.get(url)
	}

	submitdatabagevent(data){
		const url = "/databag/add"
		return this._post(url, data)
	}

	editdatabag(data){
		const url = "/databag/edit"
		return this._post(url, data)
	}

	deleteDatabag(dataid){
		const url = "/databag/delete"
		return this._post(url, {"dataid": dataid})
	}
	Search(dataname){
		const url = "/databag/searcher"
		return this._post(url, {"dataname":dataname})
	}
	getfiles(dataid){
		const url = "/databag/files"
		return this._post(url, {"dataid":dataid})
	}
	deletefiles(data){
		const url = "/databag/deletefile"
		return this._post(url, {"file_list":data})
	}
	creategrap(){
		const url = "/creategraph"
		return this.http.get(url)
	}
	getfilename(dataid){
		const url = "/creategraph/file"
		return this._post(url,{"dataid":dataid})
	}
	extractThree(data){
		const url = "/creategraph/extract"
		return this._post(url, {"files":data})
	}
	getlog(){
		const url = "/log"
		return this.http.get(url)
	}
	submitgraphEvent(data){
		const url = "/creategraph/submit"
		return this._post(url, data)
	}
}

export default new Http()