import React from 'react';
import Layout from './components/Layout/Layout';
import DiffViewer from './components/DiffEditor/DiffViewer';

function App() {
  return (
    <Layout>
      <DiffViewer />
    </Layout>
  );
}

export default App;
