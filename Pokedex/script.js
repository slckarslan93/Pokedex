const poke_container = document.getElementById('poke-container');
const pokemon_count = 250
const colors={
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

const main_types = Object.keys(colors)



const fetchPokemons = async() =>{
    for(let i = 1; i<=pokemon_count;i++){
        await getPokemon(i)
    }
}

const getPokemon =async(id) =>{
    const url =`https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const data = await res.json()
    createPokemonCard(data)
}

const createPokemonCard = (pokemon) => {
    const pokemonEl=document.createElement('div') //createElement html nesnesi oluşturmamızı sağlayan document nesnesine ait bir metoddur.
    pokemonEl.classList.add('pokemon') //classList class bilgisi eklememizi sağlar
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)//birinci harfi toUpper yap
    const id = pokemon.id.toString().padStart(3,'0')
    
    
    const poke_types = pokemon.types.map(type => type.type.name) //map() metodu, dizi içerisindeki tüm elemanları bir işlemden geçirmek için kullanılır. Her bir eleman tek tek işlenir, değerleri değiştirilebilir, geriye ne döndürüleceği belirlenebilir. Ve sonunda ise, işlemden geçen öğelerden oluşan bir dizi geriye döner
    
    const type = main_types.find(type => poke_types.indexOf(type) > -1)

    const color = colors[type]

    pokemonEl.style.backgroundColor = color

    const pokemonInnerHTML=`<div class="img-container">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${name}">
</div>
<div class="info">
    <span class="number">#${id}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${type}</span> </small>
</div>`

    pokemonEl.innerHTML = pokemonInnerHTML

    poke_container.appendChild(pokemonEl) // oluşturduğumuz elemnti sayfaya ekliyoruz

}
fetchPokemons()
