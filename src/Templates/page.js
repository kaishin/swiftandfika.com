import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layouts/default';
import SEO from '../components/seo';
import Helmet from 'react-helmet';

class PageTemplate extends React.Component {
  render() {
    const { markdownRemark: page } = this.props.data;

    return (
      <Layout>
        <Helmet bodyAttributes={{ class: 'content-page' }} />
        <SEO title={page.frontmatter.title} />
        <div className="page-container">
          <div className="wrapper">
            <h1 className="page-title">{page.frontmatter.title}</h1>
            <hr />
            <div className="page-body" dangerouslySetInnerHTML={{ __html: page.html }} />
          </div>
        </div>
      </Layout>
    );
  }
}

export default PageTemplate;

export const pageQuery = graphql`
  query PageByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;
