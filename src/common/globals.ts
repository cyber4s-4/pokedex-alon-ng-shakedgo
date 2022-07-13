export const pokeballImages = {
	open: "https://i.imgur.com/Mu5g615.png",
	closed: "https://i.imgur.com/BmRAtQm.png",
};

export function checkForBag() {
	if (!localStorage.getItem("bag")) {
		localStorage.setItem("bag", "{}");
	}
}
