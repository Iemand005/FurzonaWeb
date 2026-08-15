
class Furzona {
	async getSettings() {
		return await fetch("https://api.furzona.app/settings").then(r => r.json());
	}
}