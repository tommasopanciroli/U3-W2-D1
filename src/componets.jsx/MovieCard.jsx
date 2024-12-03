import { Component } from 'react'
import { Card } from 'react-bootstrap'

class MovieCard extends Component {
  // questo componente riceve all'avvio il titolo di un film e lo utilizzerà per chiamare le API di OMDb e recuperare i dettagli del film in questione
  // una volta recuperati, li salverà nel proprio state per poter riempire la card sottostante con queste informazioni
  state = {
    movie: null, // questo diventerà l'oggetto con Poster, Title etc.
  }

  // MovieCard riceve il titolo del film attualmente selezionato nella tendina
  // di MovieDropDown grazie alla prop intitolata "movieTitle" che riceve dal componente App (this.props.movieTitle)

  getMovieData = () => {
    fetch('http://www.omdbapi.com/?apikey=24ad60e9&s=' + this.props.movieTitle)
      .then((response) => {
        if (response.ok) {
          // proseguo con l'estrazione del JSON
          return response.json()
        } else {
          throw new Error('OMDb ha risposto picche')
        }
      })
      .then((searchResults) => {
        console.log('searchResults', searchResults.Search[0])
        // qui ci andrà un this.setState()
        this.setState({
          movie: searchResults.Search[0],
        })
      })
      .catch((error) => {
        console.log('errore', error)
      })
  }

  componentDidUpdate(prevProps, prevState) {
    // componentDidUpdate viene ri-eseguito ad ogni cambio di props o di state

    // la differenza tra componentDidUpdate e render è che il primo che mette a disposizione due parametri, che rispettivamente sono l'oggetto delle props PRIMA dell'ultimo update e l'oggetto dello stato PRIMA dell'ultimo update.

    // questi due parametri sono preziosissimi e ci servono per capire COME MAI siamo entrati in questo componentDidUpdate

    // se l'utente ha cambiato scelta nella tendina, questo è il momento di RI-FETCHARE il nuovo film!

    // andiamo a ri-lanciare la fetch SOLO quando è cambiato il film nella tendina!

    // rilevo con un if se è cambiato il film nella tendina

    // IN OGNI COMPONENTDIDUPDATE C'È UN IF!
    if (this.props.movieTitle !== prevProps.movieTitle) {
      // ho rilevato un cambiamento nel film della tendina!
      this.getMovieData()
    }
  }

  componentDidMount() {
    // metodo di lifecycle eseguito automaticamente alla fine del montaggio
    // del componente (dopo la prima invocazione di render())
    this.getMovieData()
    // so che verrà eseguita una volta sola!
    // componentDidMount NON VIENE RI-LANCIATO se cambia una prop o se cambia lo stato!
  }

  render() {
    // render viene ri-eseguito ad ogni cambio di props o di state
    console.log('SONO IN RENDER!')
    return (
      <div>
        {this.state.movie && (
          <Card>
            <Card.Img variant="top" src={this.state.movie.Poster} />
            <Card.Body>
              <Card.Title>{this.state.movie.Title}</Card.Title>
              <Card.Text>
                {this.state.movie.Year} - {this.state.movie.imdbID}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
    )
  }
}

export default MovieCard
