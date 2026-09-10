import logo from './logo.svg';
import './App.css';
import Header from './Header';
import { useState } from 'react';

function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Header title="Welcome to my website(Bootstrap 5 on React)" />
      
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center p-4">
                <h4 className="card-title text-primary mb-3">
                  Is this bootstrap actually worked?
                </h4>
                <p className="card-text text-secondary">
                  Is this bootstrap actually worked?
                </p>
                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-outline-secondary">Yes</button>
                  <button className="btn btn-primary">No</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;