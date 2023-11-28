import { Component } from 'react';
import SearchBox from './components/search-box/search-box.component';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemons: [],
      searchField: ''
    }
  }
  
  componentDidMount(){
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(response => response.json())
      .then(pokemon => 
        this.setState(
          () => {
            console.log(pokemon)
            return {pokemons: pokemon.results};
          },
        )
      )
  }
  
  onSearchChange = (event) => {
    // console.log(event.target.value);
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField }
    })
  }

  render() {
    // console.log('render');

    const { pokemons, searchField} = this.state;
    console.log(pokemons + 'in app.js')
    const { onSearchChange } = this;

    // const filteredPokemon = pokemons.filter((pokemon) => {
    //   return pokemon.name.toLocaleLowerCase().includes(searchField)
    // });

    return (
      <div className="App">
        <h1 className='app-title'>Pokedex</h1>
        <SearchBox 
          className = 'pokemon-search-box'
          onChangeHandler = { onSearchChange } 
          placeHolder = 'search pokemon'>
        </SearchBox>
        <div className='poke-card'>
            {pokemons.map((pokemon, index) => {
            return (
                <div>
                <h2>#{index+1} {pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1)} </h2>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index+1}.svg`} width="100" height="100"></img>
                </div>

            )
            })}
        </div>
      </div>
    );
  }
}

export default App;
