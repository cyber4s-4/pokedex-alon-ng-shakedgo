import { name } from "./shared/globals";

class Module {
	onLoad() {
		console.log(`${name} is working correctly!`);
	}
}
export const module = new Module();

window.addEventListener("load", () => {
	module.onLoad();
});
