import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

function SEO({ description, lang, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `,
  );

  const metaDescription = description || site.siteMetadata.description;
  const finalTitle = title === undefined ? site.siteMetadata.title : title + ' | ' + site.siteMetadata.title;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={finalTitle}
      meta={[
        { name: `description`, content: metaDescription },
        { property: `og:title`, content: finalTitle },
        { property: `og:description`, content: metaDescription },
        { property: `og:type`, content: `website` },
        { name: `og:image`, content: `${site.siteMetadata.siteUrl}/previews/social-card-teaser.png` },
        { name: `twitter:card`, content: `summary` },
        { name: `twitter:creator`, content: `@kaishin` },
        { name: `twitter:site`, content: `@swiftandfika` },
        { name: `twitter:title`, content: finalTitle },
        { name: `twitter:description`, content: metaDescription },
        { name: `twitter:image`, content: `${site.siteMetadata.siteUrl}/previews/social-card-teaser.png` },
      ].concat(meta)}
    />
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
};

export default SEO;
