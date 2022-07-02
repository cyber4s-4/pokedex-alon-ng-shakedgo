const layoutTemplate = `<nav>
    <ul>
        <a href='/'><li>Home</li></a>
    </ul>
</nav>`;

export class NavbarComponent {
	parent: HTMLElement;

	constructor(parent: HTMLElement) {
		this.parent = parent;
	}

	render() {
		this.parent.innerHTML = layoutTemplate + this.parent.innerHTML;
	}
}
