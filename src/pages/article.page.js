export class ArticlePage {
    constructor(page) {
        // техническое описание страницы
        //create
        this.newArticle = page.getByRole('link', { name: ' New Article' });
        this.articleTitle = page.getByRole('textbox', { name: 'Article Title' });
        this.articleDescription = page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.articleBody = page.getByRole('textbox', { name: 'Write your article (in' });
        this.tags = page.getByRole('textbox', { name: 'Enter tags' });
        this.buttonPublish = page.getByText('Publish Article');
        this.articleCheck = page.getByRole('main');
        //this.articleTitle = page.locator("h1");
        this.articleText = page.locator("div.col-md-12 p");
        this.articleTags = page.locator("ul.tag-list li.tag-default.tag-pill.tag-outline");
      
        //profile
        this.userProfile = page.locator('.user-pic');
        this.linkProfile = page.getByRole('link', { name: ' Profile' });
        this.tabFavorArticles = page.getByRole('link', { name: 'Favorited Articles' });
        this.tabMyArticles = page.getByRole('link', { name: 'My Articles' });
        this.myArticle = page.locator('.preview-link').nth(0);
    }
    // бизнесовые действия со страницой
    async createNewArticle(article) {
        const { title, description, body, tag } = article;
        await this.newArticle.click();
        await this.articleTitle.click();
        await this.articleTitle.fill(title);
        await this.articleDescription.click();
        await this.articleDescription.fill(description);
        await this.articleBody.click();
        await this.articleBody.fill(body);
        await this.tags.click();
        await this.tags.fill(tag);
        await this.buttonPublish.click();
    }

    async toProfile() {
        await this.userProfile.click();
        await this.linkProfile.click();
        }
    
    async toFavorArticles() {
        await this.userProfile.click();
        await this.linkProfile.click();
        await this.tabFavorArticles.click();
        }
    }
