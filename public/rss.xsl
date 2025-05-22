<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>
          rss feed | <xsl:value-of select="/rss/channel/title"/>
        </title>
        <style>
          :root {
            --primary-bg: #fefefa;
            --primary-text: #0f172a;
            --secondary-text: #9b9b9b;
            --accent-color: #0d9488;
            --hover-bg: rgba(13, 148, 136, 0.05);  /* very light accent color */
            --border-color: #e2e8f0;
          }

          @media (prefers-color-scheme: dark) {
            :root {
              --primary-bg: #091838;
              --primary-text: #e2e8f0;
              --secondary-text: #9ca3af;
              --hover-bg: rgba(13, 148, 136, 0.1);  /* slightly stronger in dark mode */
              --border-color: #2d3748;
            }
          }

          body {
            font-family: system-ui, sans-serif;
            line-height: 1.5;
            color: var(--primary-text);
            background: var(--primary-bg);
            margin: 0;
            padding: 2rem;
            max-width: 860px;
            margin: 0 auto;
          }

          h1 {
            font-size: 1.5rem;
            margin: 0 0 0.5rem 0;
            font-weight: normal;
            color: var(--accent-color);
          }

          .rss-info {
            color: var(--secondary-text);
            font-size: 0.9rem;
            padding-bottom: 1rem;
          }

          .rss-info a {
            color: var(--accent-color);
            text-decoration: none;
          }

          .rss-info a:hover {
            text-decoration: underline;
            text-decoration-thickness: 1.5px;
            text-underline-offset: 2px;
          }

          .feed-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .feed-item {
            margin-bottom: 1.5rem;
            padding: 0.75rem;
            border-radius: 4px;
            transition: all 0.2s ease;
            border: 1px solid transparent;
          }

          .feed-item:hover {
            background: var(--hover-bg);
            border-color: var(--border-color);
          }

          .feed-item a {
            color: var(--primary-text);
            text-decoration: none;
            font-size: 1.1rem;
            display: block;
            margin-bottom: 0.25rem;
            transition: color 0.2s ease;
          }

          .feed-item a:hover {
            color: var(--accent-color);
          }

          .feed-date {
            color: var(--secondary-text);
            font-size: 0.85rem;
          }

          .feed-description {
            margin-top: 0.25rem;
            color: var(--secondary-text);
            font-size: 0.9rem;
          }

          .feed-categories {
            margin-top: 0.5rem;
            font-size: 0.85rem;
          }

          .feed-category {
            color: var(--accent-color);
            margin-right: 0.5rem;
            opacity: 0.8;
          }

          .feed-category:not(:last-child)::after {
            content: "·";
            margin-left: 0.5rem;
            color: var(--secondary-text);
          }
        </style>
      </head>
      <body>
        <div class="rss-info">
          <h1><xsl:value-of select="/rss/channel/title"/></h1>
          <p><xsl:value-of select="/rss/channel/description"/></p>
          <p>add this url to your feed reader to subscribe</p>
          <p>learn more at <a href="https://aboutfeeds.com">about feeds</a></p>
        </div>

        <ul class="feed-list">
          <xsl:for-each select="/rss/channel/item">
            <li class="feed-item">
              <a>
                <xsl:attribute name="href">
                  <xsl:value-of select="link"/>
                </xsl:attribute>
                <xsl:value-of select="title"/>
              </a>
              <div class="feed-date">
                <xsl:value-of select="substring(pubDate, 1, 16)"/>
              </div>
              <div class="feed-description">
                <xsl:value-of select="description"/>
              </div>
              <div class="feed-categories">
                <xsl:for-each select="category">
                  <span class="feed-category">
                    <xsl:value-of select="."/>
                  </span>
                </xsl:for-each>
              </div>
            </li>
          </xsl:for-each>
        </ul>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>