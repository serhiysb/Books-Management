export default class Book{
    constructor(title="", author="", year, genre="", ISBN="", description="", img="", pages=0, price=0, availability=false)
    {
        this.title=title;
        this.author=author;
        this.year=year;
        this.genre=genre;
        this.ISBN=ISBN;
        this.description=description;
        this.img=img;
        this.pages=pages;
        this.price=price;
        this.availability=availability;
    }
}