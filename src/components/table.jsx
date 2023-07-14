import React, { useState, useEffect } from 'react';

function Table(props) {
  const [transactions, setTransactions] = useState([]);
  const [searchfield, setSearchfield] = useState('')

  useEffect(() => {
    console.log("useEffect");
    fetch('http://127.0.0.1:5000/transactions')
      .then(response => response.json())
      .then(data => setTransactions(data));
  }, [props.count]);

  const deleteTransaction = (id) => {
    console.log("deleteTransaction");
    console.log(id);
    fetch(`http://127.0.0.1:5000/transactions/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        props.onIncrement()
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const onSearchChange = (event) => {
    setSearchfield(event.target.value)
  }

  const filteredTransactions = transactions.filter((item) =>
    Object.values(item).some(
      (value) => value && value.toString().toLowerCase().indexOf(searchfield.toLowerCase()) > -1
    )
  );

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">Transações</div>
        <div className="card-body">
          <div className='row' style={{ paddingBottom: "10px" }}>
            <div className='col-6' style={{ paddingLeft: "40px" }}>
              <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                  <div class="small fw-bold text-primary mb-1">Total Gasto</div>
                  <div class="h5">
                    R$ {filteredTransactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0)}</div>
                </div>
                <div class="ms-2"><i class="fas fa-dollar-sign fa-2x text-gray-200"></i></div>
              </div>
            </div>
            <div className='col-6'>
              <input type="text" className="form-control" onChange={onSearchChange} />
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Valor</th>
                <th>Data</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(transaction => (
                console.log(transaction.date),
                <tr key={transaction.id}>
                  <td>{transaction.description}</td>
                  <td>{transaction.category}</td>
                  <td>R$ {transaction.amount}</td>
                  <td>{new Date(transaction.date).toLocaleDateString("pt-BR")}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger delete-button"
                      onClick={() => deleteTransaction(transaction.id)}
                    >x</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;
