import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

function SEO({ description, lang, meta, keywords, title, image, type, path }) {
  const GOOGLE_FONTS_PATH =
    "https://fonts.googleapis.com/css2?family=Cormorant+Infant:wght@600;700&family=Montserrat:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap";
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        const metaDescription =
          description || (data.site && data.site.description) || "";
        const siteTitle = (data.site && data.site.title) || "";
        const siteAuthor = (data.site && data.site.author) || "";
        const metaImage = image && image.asset ? image.asset.fixed.src : "";
        const metaImageAlt = (image && image.alt) || "";

        return (
          <Helmet
            htmlAttributes={{
              lang,
              prefix: "og: http://ogp.me/ns#",
            }}
            title={title}
            titleTemplate={title === siteTitle ? "%s" : `%s | ${siteTitle}`}
            link={[
              { rel: "canonical", href: process.env.GATSBY_HOME_PAGE + path },
              {
                rel: "preload",
                href: GOOGLE_FONTS_PATH,
                as: "style",
                onLoad: "this.onload=null;this.rel='stylesheet'",
              },
            ]}
            meta={[
              {
                name: "description",
                content: metaDescription,
              },
              {
                property: "og:title",
                content: title,
              },
              {
                property: "og:description",
                content: metaDescription,
              },
              {
                property: "og:type",
                content: type,
              },
              {
                property: "og:url",
                content: process.env.GATSBY_HOME_PAGE + path,
              },
              {
                property: "og:locale",
                content: "nl_NL",
              },
              {
                name: "twitter:card",
                content: "summary",
              },
              {
                name: "twitter:title",
                content: title,
              },
              {
                name: "twitter:description",
                content: metaDescription,
              },
            ]
              .concat(
                metaImage !== ""
                  ? {
                      property: "og:image",
                      content: metaImage,
                    }
                  : []
              )
              .concat(
                metaImage !== ""
                  ? {
                      name: "twitter:creator",
                      content: siteAuthor,
                    }
                  : []
              )
              .concat(
                siteAuthor !== ""
                  ? {
                      property: "twitter:image",
                      content: metaImage,
                    }
                  : []
              )
              .concat(
                metaImageAlt !== ""
                  ? {
                      property: "twitter:image:alt",
                      content: metaImageAlt,
                    }
                  : []
              )
              .concat(
                keywords && keywords.length > 0
                  ? {
                      name: "keywords",
                      content: keywords.join(", "),
                    }
                  : []
              )
              .concat(meta)}
          >
            <noscript>
              {`<link href=${GOOGLE_FONTS_PATH} rel='stylesheet' type='text/css' />`}
            </noscript>
          </Helmet>
        );
      }}
    />
  );
}

SEO.defaultProps = {
  lang: "nl",
  meta: [],
  keywords: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      title
      description
      keywords
    }
  }
`;
