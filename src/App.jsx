import Navbar from './components/navbar.jsx'
import Table from './components/table.jsx'
import Hero from './components/hero.jsx'
import CreateTransactionForm from './components/create_transaction_form.jsx'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <Hero />
      <CreateTransactionForm count={count} onIncrement={handleIncrement} />
      <Table count={count} onIncrement={handleIncrement} />
    </div>
  )
}

export default App
