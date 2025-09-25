require('dotenv').config();
const mongoose = require('mongoose');
const slugify = require('slugify');
const Book = require('../models/Book');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://ashwinishinde9605_db_user:NMlL7ThIJ71etweU@cluster0.sdaeaqh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const books = [
  // copy your provided book objects here but add 'slug' using slugify
  // I'll include a few as examples. Replace or append the whole list you had.
  { title: 'The Lady of the Rivers', author:'Philippa Gregory', image: './river.jpg', category: 'Novel', rating: 4 ,price:500, discount:10,stock:10,language:'English',year:2013,reviews: [
        { user: 'Aarav', comment: 'Loved the storytelling.', rating: 5 },
        { user: 'Mira', comment: 'A bit slow in the middle.', rating: 3 },
       
      ],
    description:''},
      { title: 'Agatha Oddly', author: 'Lena Jones', image: './agatha.jpg', category: 'Kids', rating: 5 ,price: 299,
      discount: 15,
      stock: 20,
      language: 'English',
      year: 2019,
      reviews: [
        { user: 'Ishaan', comment: 'My daughter loved it.', rating: 5 }
      ],description:''},
      { title: 'The Lightning Thief', author: 'Rick Riordan', image: './thief.jpg', category: 'Novel', rating: 4,price: 550,
      discount: 5,
      stock: 8,
      language: 'English',
      year: 1998,
      reviews: [
        { user: 'Ravi', comment: 'Mind-blowing concepts.', rating: 5 },
        { user: 'Leena', comment: 'Not easy but worth it.', rating: 4 }
      ],description:"The Lightning Thief is the first book in Rick Riordan's Percy Jackson and the Olympians series, following 12-year-old Percy Jackson as he discovers he's a demigod and embarks on a quest to retrieve Zeus's stolen lightning bolt, preventing a war between the Greek gods. The story blends modern settings with ancient Greek mythology, featuring characters like the demigod daughter of Athena, Annabeth Chase, and the satyr, Grover Underwood." },
      {
        title: 'Nightshade',
        author: 'Michael Connelly',
        image: './night.jpg',
        category: 'Novel',
        rating: 3,
        price: 800,
        discount: 5,
        stock: 8,
        language: 'English',
        year: 2005,
        reviews: [
          { user: 'Ravi', comment: 'Dark and gripping.', rating: 4 }
        ],description:'',
      },
     
       {
        title: 'Seriously... I’m Kidding',
        author: 'Ellen DeGeneres',
        image: './kidding.jpg',
        category: 'Kids',
        rating: 4,
        price: 350,
        discount: 0,
        stock: 15,
        language: 'English',
        year: 2011,
        reviews: [
          { user: 'Neha', comment: 'Hilarious and light-hearted.', rating: 4 }
        ],description:'',
      },
      {
        title: 'On Emotional Intelligence',
        author: 'Harvard Business Review',
        image: './intelligence.jpg',
        category: 'Business',
        rating: 4,
        price: 450,
        discount: 10,
        stock: 12,
        language: 'English',
        year: 2015,
        reviews: [
          { user: 'Ananya', comment: 'Very practical insights.', rating: 4 },
        ],description:''
      }, {
        title: 'A Brief History of Time',
        author: 'Stephen Hawking',
        image: './history.jpg',
        category: 'Science',
        rating: 5,
        price: 550,
        discount: 5,
        stock: 8,
        language: 'English',
        year: 1998,
        reviews: [
          { user: 'Ravi', comment: 'Mind-blowing concepts.', rating: 5 },
          { user: 'Leena', comment: 'Not easy but worth it.', rating: 4 }
        ],description:''
      },
        { title: 'The Universe in a Nutshell',
           author: 'Stephen Hawking',
            image: './nutshell.jpg', 
            category: 'Science',
             rating: 4 ,
             price: 950,
        discount: 5,
        stock: 8,
        language: 'English',
        year: 1923,
        reviews: [
          { user: 'Ravi', comment: 'Mind-blowing concepts.', rating: 5 },
          { user: 'Leena', comment: 'Not easy but worth it.', rating: 4 }
        ],description:''
      },
      { title: 'Physics of the Impossible', 
        author: 'Michio Kaku',
         image: './impossible.jpg',
          category: 'Science',
           rating: 2,
           price: 950,
        discount: 5,
        stock: 8,
        language: 'English',
        year: 1950,
        reviews: [
          { user: 'Raveena', comment: 'Mind-blowing concepts.', rating: 5 },
          { user: 'Aisha', comment: 'Not easy but worth it.', rating: 4 }
        ],description:''
       },
      { title: 'We Are All Guilty Here',
         author: 'Karin Slaughter',
          image: './guilty.jpg',
           category: 'Thriller',
            rating: 3,
           price: 950,
        discount: 5,
        stock: 8,
        language: 'English',
        year: 1923,
        reviews: [
          { user: 'Ravi', comment: 'Mind-blowing concepts.', rating: 5 },
          { user: 'Leena', comment: 'Not easy but worth it.', rating: 4 }
        ],description:''
       },
      { title: 'High Season',
         author: 'Katie Bishop',
         
         image: './high.jpg',
          category: 'Thriller',
           rating: 4 ,
           price: 950,
        discount: 5,
        stock: 8,
        language: 'English',
        year: 1923,
        reviews: [
          { user: 'Ravi', comment: 'Mind-blowing concepts.', rating: 5 },
          { user: 'Leena', comment: 'Not easy but worth it.', rating: 4 }
        ],description:''
      },
      { title: 'Fat Kid Rules the World',
         author: 'K.L. Going',
          image: './rules.jpg',
           category: 'Kids',
            rating: 3,
           price: 950,
        discount: 5,
        stock: 8,
        language: 'English',
        year: 1923,
        reviews: [
          { user: 'Ravi', comment: 'Mind-blowing concepts.', rating: 5 },
              { user: 'Leena', comment: 'Not easy but worth it.', rating: 4 }],description:''},
  
  
              { title: 'Ikigai Paperback',
         author: ' Francesc Miralles, Hector Garcia',
          image: './ikigai.webp',
           category: 'Self-help',
            rating: 3,
           price: 850,
        discount: 5,
        stock: 3,
        language: 'English',
        year: 2013,
        reviews: [
          { user: 'Avani Madlani', comment: 'Ive ordered 10 other books with this book and got them delivered on time despite of heavy rains and all are in best condition and the quality of paperback and pages and bookmarks are awesome.', rating: 5 },
              { user: 'Prajwal Raddy', comment: 'Ikigai: The Japanese Secret to a Long and Happy Life," co-authored by Hector Garcia and Francesc Miralles, is a book that explores the concept of "ikigai," a Japanese term that translates to “reason for being.', rating: 4 }],description:''},
              { title: 'Dopamine Detox',
         author: 'Thibaut Meurisse',
          image: './detox.webp',
           category: 'Self-help',
            rating: 3,
           price: 99,
        discount: 30,
        stock: 8,
        language: 'English',
        year: 1923,
        reviews: [
          { user: 'SATYAM SHIVAM', comment: 'Life changing book....Must read for everyone. Everything is explained in a beautiful way.', rating: 5 },
              { user: 'DHAWAL PARMAR', comment: 'Good book if anyone has a habit of procrastination, this book is for you', rating: 4 }],description:''},
              { title: 'The Psychology of Money',
         author: 'Morgan Housel',
          image:'./money.webp',
           category: 'Self-help',
            rating: 3,
           price: 159,
        discount: 20,
        stock: 8,
        language: 'English',
        year: 1923,
        reviews: [
          { user: 'Anupriya Arularasan', comment: 'Awesome quality and Neat packaging. Grab the book asap', rating: 5 },
              { user: 'surajit das', comment: 'Awesome book.', rating: 4 }],
              description:'Timeless lessons on wealth, greed, and happiness doing well with money isn?t necessarily about what you know. It?s about how you behave. And behavior is hard to teach, even to really smart people. How to manage money, invest it, and make business decisions are typically considered to involve a lot of mathematical calculations, where data and formulae tell us exactly what to do. But in the real world, people don?t make financial decisions on a spreadsheet.'},
              { title: "Man's Search for Meaning",
         author: 'Vicktore Frankl',
          image: './search.webp',
           category: 'Self-help',
            rating: 3,
           price:105,
        discount: 40,
        stock: 10,
        language: 'English',
        year: 1923,
        reviews: [
          { user: 'Harsh Sharma', comment: 'an enduring work of survival literature.', rating: 5 },
              { user: 'Aditi Singh', comment: "Man's Search for meaning is Viktor Frankl's story of his struggle for survival is Auschwitz and other Nazi concentration camps.", rating: 5 }],description:"The sort of person the prisoner became was the result of an inner decision and not of camp influences alone. Only those who allowed their inner hold on their moral and spiritual selves to subside eventually fell victim to the camp's degenerating influence - while those who made a victory of those experiences turned them into an inner triumph."},
         { title: 'The Ride of a Lifetime ',
         author: 'Robert Iger',
          image: './ride.webp',
           category: 'NewArrivals',
            rating: 4,
           price: 299,
        discount: 33,
        stock: 15,
        language: 'English',
        year: 2025,
        reviews: [ ],description:"This book is about the relentless curiosity that has driven Iger for forty-five years, since the day he started as the lowliest studio grunt at ABC. It’s also about thoughtfulness and respect, and a decency-over-dollars approach that has become the bedrock of every project and partnership Iger pursues, from a deep friendship with Steve Jobs in his final years to an abiding love of the Star Wars mythology."},
              { title: 'The Ratan Tata Way',
         author: 'A.K. Gandhi & Vinod Sharma',
          image: './tata.webp',
           category: 'NewArrivals',
            rating: 5,
           price: 179,
        discount: 25,
        stock: 20,
        language: 'English',
        year: 2025,
        reviews: [
          ],description:"While dynasties rise and fall,the Tata Group has defied conventions, continuously reinventing itself under the leadership of visionary chiefs like Ratan Tata. In 'The Success Secrets of Ratan Tata', we will go behind the scenes to understand what drove this exceptional leader's achievements."},
              { title: 'The God Delusion',
         author: 'Richard Dwakins',
          image: './god.webp',
           category: 'Spirituality',
            rating: 3,
           price: 249,
        discount: 5,
        stock: 30,
        language: 'English',
        year: 2003,
        reviews: [
          { user: 'Leena', comment: 'Informative.', rating: 4 }],description:'Dawkins attacks God in all his forms. He eviscerates the major arguments for religion and demonstrates the supreme improbability of a supreme being. He shows how religion fuels war, foments bigotry and abuses children.'},
              { title: 'Aghori- An Untold Story',
         author: 'Mayur Kalbag',
          image: './aghori.webp',
           category: 'Mythology',
            rating: 4,
           price: 149,
        discount: 5,
        stock: 8,
        language: 'English',
        year: 1923,
        reviews: [
          { user: 'Ravi', comment: 'Mind-blowing concepts.', rating: 5 },
              { user: 'Leena', comment: 'Not easy but worth it.', rating: 4 }],description:''},
              { title: 'You Become What You think',
         author: 'Shuham Kumar Singh',
          image: './become.jpg',
           category: 'self-help',
            rating: 4.5,
           price: 179,
        discount: 50,
        stock: 10,
        language: 'English',
        year: 2022,
        reviews: [
          { user: 'Ravi', comment: 'Mind-blowing concepts.', rating: 5 },
              { user: 'Leena', comment: 'Not easy but worth it.', rating: 4 }],description:"Are you searching for a way to improve your life, increase your happiness, and achieve your full potential? I've been there too. And I found my answer in books. They transformed my life, and they can transform yours too."},
         { title: "Limitless",
         author: 'Jim kwick',
          image: './limitless.webp',
           category: 'self-help',
            rating: 5,
           price: 249,
        discount: 50,
        stock: 10,
        language: 'English',
        year: 2022,
        reviews: [
          { user: 'aditya s', comment: 'Mind-blowing concepts.', rating: 5 },
              { user: 'sharvil', comment: 'Awesome', rating: 4 },
              { user: 'Ved', comment: 'grateful to to have', rating: 4.5 },],description:" Your brain is like a supercomputer and your thoughts program it to run. That’s why the Kwik Brain process starts with unmasking assumptions, habits, and procrastinations that stifle you, redrawing the borders and boundaries of what you think is possible. It teaches you how to identify what you want in every aspect of your life, so you can move from negative thinking to positive possibilities."},
         
          ]

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    for (const b of books) {
      const slug = slugify(b.title, { lower: true, strict: true });
      const doc = { ...b, slug };
      await Book.findOneAndUpdate({ slug }, doc, { upsert: true, new: true });
      console.log('Upserted:', b.title);
    }

    console.log('Seeding finished');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error', err);
    process.exit(1);
  }
}

seed();
