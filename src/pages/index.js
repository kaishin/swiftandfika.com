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
        <SEO />
        <article className="teaser-page-container">
          <section className="branding-box">
            <ThreeDeeView />
            <div className="logo-container">
              <img src="/logo.svg" alt="logo" className="main-logo" />
              <p className="date-subheading">TBD, Stockholm.</p>
            </div>
          </section>
          <section className="info-box">
            <div className="info-container">
              <h2>We're Back!</h2>
              <p className="intro">
                As the premier Swift conference in the nordics, Swift &amp; Fika is planned to return for its second
                edition with a busier schedule, including the addition of a second day of talks and brand new social
                activities!
              </p>

              <p className="intro">
                In the meantime, check out the {' '}
                <a href="https://www.youtube.com/playlist?list=PLKNt6c4Ajv2tgrX4wVgoHLSMuP-3sC2M9">videos</a> of the{' '}
                <a href="https://2018.swiftandfika.com">2018 edition</a>
                and stay updated by following us on <a href="https://twitter.com/swiftandfika">Twitter</a> and
                subscribing to our newsletter below.
              </p>
              <p className="contribute">
                Due to the COVID-19 outbreak, we're postponing the conference until further notice. Swift &amp; Fika is
                designed around the social experience and we've found no suitable way to reinvent it for these trying
                times.
              </p>
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
            </div>
          </section>
        </article>
      </Layout>
    );
  }
}

export default IndexPage;
