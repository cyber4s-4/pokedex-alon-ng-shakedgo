export class PokemonCopmonent {
  parent: HTMLElement | null;
  data: any;
  constructor(parent: HTMLElement | null, data: any) {
    this.parent = parent;
    this.data = data;
  }
  render() {
    return (this.parent!.innerHTML += `<div class="pokemon" id="pokemon-${this.data.sprites.front_default}">
  <img class="pokemon-img" src="${this.data.sprites.front_default}">
    <div class="pokemon-name">${this.data.name}</div>
  </div>`);
  }
}
