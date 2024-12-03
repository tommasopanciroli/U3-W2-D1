import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MovieNavbar from './components/MovieNavbar'
import { Component } from 'react'
import MovieDropDown from './components/MovieDropDown'
import { Container, Row, Col } from 'react-bootstrap'
import MovieCard from './components/MovieCard'

class App extends Component {
  state = {
    movieTitle: 'Inception',
  }

  changeMovieTitle = (newMovie) => {
    this.setState({
      movieTitle: newMovie,
    })
  }

  render() {
    return (
      <div className="App">
        <header>
          <MovieNavbar />
          <Container>
            <Row className="justify-content-center my-3">
              <Col xs={12} md={4}>
                <MovieDropDown
                  // passo il VALORE dello stato
                  movieTitle={this.state.movieTitle}
                  // passo anche il MODO DI CAMBIARE lo stato
                  changeMovieTitle={this.changeMovieTitle}
                />
              </Col>
            </Row>
          </Container>
        </header>
        <main>
          <Container>
            <Row className="justify-content-center my-3">
              <Col xs={12} md={4}>
                <MovieCard movieTitle={this.state.movieTitle} />
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    )
  }
}

export default App
