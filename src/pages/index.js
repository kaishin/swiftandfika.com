import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ThreeDeeView from '../components/three-dee-view';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <ThreeDeeView />
  </Layout>
);

export default IndexPage;
