/**
 * BlogCard Custom Element
 * 
 * A web component that displays article information in a responsive card format.
 * 
 * @example
 * ```html
 * <blog-card
 *   article-title="Your Article Title"
 *   publish-date="Your Publish Date"
 *   image-url="path/to/image"
 *   article-url="https://example.com/article"
 * ></blog-card>
 * ```
 * 
 * @attributes
 * - article-title: The title of the article
 * - publish-date: The publication date of the article
 * - image-url: URL to the article's thumbnail image
 * - article-url: URL to the full article
 * 
 * @css-variables
 * - --background-color: Background color of the card (default: #f9f9f9)
 * - --primary-color: Color for main text (default: rgb(9, 9, 9))
 * - --secondary-color: Color for secondary text (default: rgb(107, 114, 128))
 * - --hover-color: Color for hover states (default: rgb(18, 72, 180))
 * 
 * @responsive-behavior
 * - Mobile: Stacked layout (image on top, content below)
 * - Desktop (>425px): Horizontal layout (image on left, content on right)
 */

class BlogCard extends HTMLElement {
  declare articleTitle: string;
  declare publishDate: string;
  declare imageUrl: string;
  declare articleUrl: string;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    
    // Initialize default values
    this.articleTitle = "article title";
    this.publishDate = "publish date";
    this.imageUrl = "#";
    this.articleUrl = "#";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = '';
      this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }
  }

  static get observedAttributes() {
    return ["article-title", "publish-date", "image-url", "article-url"];
  }

  attributeChangedCallback(attr: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    
    switch(attr) {
      case "article-title":
        this.articleTitle = newValue;
        break;
      case "publish-date":
        this.publishDate = newValue;
        break;
      case "image-url":
        this.imageUrl = newValue;
        break;
      case "article-url":
        this.articleUrl = newValue;
        break;
      default:
        break;
    }
    
    this.render();
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
      <article>
        <img src="${this.imageUrl}" alt="Article thumbnail" />
        <div>
          <h3>
            <a href="${this.articleUrl}" title="go to ${this.articleTitle}" target="_blank">
              ${this.articleTitle}
            </a>
          </h3>
          <span>${this.publishDate}</span>
        </div>
      </article>
      ${this.getStyles()}`;
    return template;
  }

  getStyles() {
    return `
      <style>
        :host {
          --background-color: #f9f9f9;
          --primary-color: rgb(9, 9, 9);
          --secondary-color: rgb(107, 114, 128);
          --hover-color: rgb(18, 72, 180);
          display: block;
        }
        
        article {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          pointer-events: none;
          background-color: var(--background-color);
          border-radius: 8px;
          max-width: 49rem;
        }

        article:hover img, article:focus img {
          transform: scale(1.1);
        }
        
        img {
          width: 100%;
          max-width: 9rem;
          height: auto;
          border-radius: 8px;
          transition: transform 0.3s ease;
          transform-origin: 0% 50%;
          }
          
        span {
          font-size: 0.9rem;
          color: var(--secondary-color);
        }
        
        div {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          justify-content: center;
        }
            
        a {
          text-decoration: none;
          color: var(--primary-color);
        }

        h3 {
          pointer-events: all;
          margin: 0;  
        }

        h3:hover, h3:focus {
          text-decoration: underline;
        }

        h3:hover + span, h3:focus + span {
          color: var(--hover-color);
        }

        @media screen and (min-width: 425px) {
          article {
            flex-direction: row;
            gap: 2rem;
          }

          h3 {
            font-size: 1.5rem;
          }

          span {
            font-size: 1rem;
          }
        }
      </style>
    `;
  }
}

customElements.define("blog-card", BlogCard);
