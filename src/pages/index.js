import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ThreeDeeView from '../components/three-dee-view';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <ThreeDeeView />
    <form
      action="https://buttondown.email/api/emails/embed-subscribe/swiftandfika"
      method="post"
      target="popupwindow"
      onsubmit="window.open('https://buttondown.email/swiftandfika', 'popupwindow')"
      class="embeddable-buttondown-form"
    >
      <label for="bd-email">Enter your email</label>
      <input type="email" name="email" id="bd-email" />
      <input type="hidden" value="1" name="embed" />
      <input type="submit" value="Subscribe" />
      <p>
        <a href="https://buttondown.email">Powered by Buttondown.</a>
      </p>
    </form>
  </Layout>
);

export default IndexPage;
