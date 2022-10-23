// class
class User
{
    constructor(name, lastName)
    {
        this.name=name;
        this.lastName=lastName;
        this.books=[];
        this.pets=[];
    }
    getFullName(){
        return (`${this.name} ${this.lastName}`);
    }
    addPet(petName){
        this.pets.push(petName);
    }
    countPets(){
        return this.pets.length;
    }
    addBook(name, autor){
        this.books.push( { name:name, autor:autor } )
    }
    getBookNames(){
        const bookNames = this.books.map( book => book.name )
        return bookNames;
    }
}

//instanciation
const user1 = new User("Juan", "Perez");
user1.addPet("Pelusa");
user1.addBook("Moonwalking with Einstein", "Joshua Foer")
user1.addBook("Pet Sematary", "Stephen King")

//printing
let docs = [];
docs[0] = user1.getFullName();
docs[1] = user1.countPets();
docs[2] = user1.getBookNames();
for(const doc of docs){
    console.log(doc);
}