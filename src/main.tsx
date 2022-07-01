import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '~/store/store';
import { App } from '~/components/app/app';
import { InternationalizationWrapper } from '~/components/common/common';
import '~/assets/styles/styles.scss';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <StoreProvider store={store}>
    <InternationalizationWrapper>
      <Router>
        <App />
      </Router>
    </InternationalizationWrapper>
  </StoreProvider>,
);
