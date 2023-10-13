
import Header from './components/Header.js';
import Footer from './components/Footer';

import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen.js';

function App() {
  return (
    <div>
      <Header />
      <main className='py-3'>
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
