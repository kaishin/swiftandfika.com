import React from 'react';

import Layout from '../components/layouts/default';
import SEO from '../components/seo';
import ThreeDeeView from '../components/three-dee-view';

class IndexPage extends React.Component {
  handleSubmit = (e) => {
    window.open('https://buttondown.email/swiftandfika', 'popupwindow');
  };

  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <ThreeDeeView />
        <div className="logo-container">
          <img src="/logo.svg" alt="logo" className="main-logo" />
          <p className="date-subheading">See you this fall. ☕️</p>
        </div>
        <div className="form-container">
          <form
            action="https://buttondown.email/api/emails/embed-subscribe/swiftandfika"
            method="post"
            target="popupwindow"
            onSubmit={this.handleSubmit}
            className="embeddable-buttondown-form"
          >
            <input type="email" name="email" id="bd-email" placeholder="Email Address" />
            <input type="hidden" value="1" name="embed" />
            <input type="submit" value="Keep Me Posted!" />
            <p className="small-print">
              Powered by{' '}
              <a href="https://buttondown.email" target="_blank" rel="noopener noreferrer">
                ButtonDown
              </a>
            </p>
          </form>
        </div>
      </Layout>
    );
  }
}

export default IndexPage;
