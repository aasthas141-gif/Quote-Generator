import type { Quote } from "@/types/quote";

/**
 * Curated, well-sourced quotes only. Popular lines with disputed or
 * fabricated attributions (the "Einstein said…" internet genre) are left out.
 */
export const QUOTES: Quote[] = [
  // Motivation
  { id: 1, category: "Motivation", author: "Wayne Gretzky", text: "You miss 100% of the shots you don't take." },
  { id: 2, category: "Motivation", author: "Robert Frost", text: "The best way out is always through." },
  { id: 3, category: "Motivation", author: "Japanese proverb", text: "Fall seven times, stand up eight." },
  { id: 4, category: "Motivation", author: "Laozi", text: "A journey of a thousand miles begins with a single step." },
  { id: 5, category: "Motivation", author: "Winston Churchill", text: "Never give in, never give in, never, never, never, never." },
  { id: 6, category: "Motivation", author: "John A. Shedd", text: "A ship in harbor is safe, but that is not what ships are built for." },
  { id: 7, category: "Motivation", author: "Tim Ferriss", text: "What we fear doing most is usually what we most need to do." },
  { id: 8, category: "Motivation", author: "Stephen King", text: "Hope is a good thing, maybe the best of things, and no good thing ever dies." },

  // Creativity
  { id: 9, category: "Creativity", author: "Maya Angelou", text: "You can't use up creativity. The more you use, the more you have." },
  { id: 10, category: "Creativity", author: "Chuck Close", text: "Inspiration is for amateurs — the rest of us just show up and get to work." },
  { id: 11, category: "Creativity", author: "Steve Jobs", text: "Creativity is just connecting things." },
  { id: 12, category: "Creativity", author: "Albert Einstein", text: "Imagination is more important than knowledge." },
  { id: 13, category: "Creativity", author: "Salvador Dalí", text: "Have no fear of perfection — you'll never reach it." },
  { id: 14, category: "Creativity", author: "Ray Bradbury", text: "Don't think. Thinking is the enemy of creativity." },
  { id: 15, category: "Creativity", author: "Jack London", text: "You can't wait for inspiration. You have to go after it with a club." },

  // Design
  { id: 16, category: "Design", author: "Steve Jobs", text: "Design is not just what it looks like and feels like. Design is how it works." },
  { id: 17, category: "Design", author: "Dieter Rams", text: "Good design is as little design as possible." },
  { id: 18, category: "Design", author: "Ludwig Mies van der Rohe", text: "Less is more." },
  { id: 19, category: "Design", author: "Louis Sullivan", text: "Form ever follows function." },
  { id: 20, category: "Design", author: "William Morris", text: "Have nothing in your houses that you do not know to be useful, or believe to be beautiful." },
  { id: 21, category: "Design", author: "Charles Eames", text: "The details are not the details. They make the design." },
  { id: 22, category: "Design", author: "John Maeda", text: "Simplicity is about subtracting the obvious and adding the meaningful." },
  { id: 23, category: "Design", author: "Massimo Vignelli", text: "Styles come and go. Good design is a language, not a style." },
  { id: 24, category: "Design", author: "Antoine de Saint-Exupéry", text: "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away." },

  // Life
  { id: 25, category: "Life", author: "Socrates", text: "The unexamined life is not worth living." },
  { id: 26, category: "Life", author: "Allen Saunders", text: "Life is what happens to us while we are making other plans." },
  { id: 27, category: "Life", author: "Robert Frost", text: "In three words I can sum up everything I've learned about life: it goes on." },
  { id: 28, category: "Life", author: "Cesare Pavese", text: "We do not remember days, we remember moments." },
  { id: 29, category: "Life", author: "Annie Dillard", text: "How we spend our days is, of course, how we spend our lives." },
  { id: 30, category: "Life", author: "James Baldwin", text: "Not everything that is faced can be changed, but nothing can be changed until it is faced." },
  { id: 31, category: "Life", author: "Søren Kierkegaard", text: "Life can only be understood backwards; but it must be lived forwards." },
  { id: 32, category: "Life", author: "Eleanor Roosevelt", text: "The purpose of life is to live it, to taste experience to the utmost, to reach out eagerly and without fear for newer and richer experience." },

  // Success
  { id: 33, category: "Success", author: "Albert Einstein", text: "Try not to become a man of success, but rather try to become a man of value." },
  { id: 34, category: "Success", author: "Will Durant", text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit." },
  { id: 35, category: "Success", author: "Bill Gates", text: "Success is a lousy teacher. It seduces smart people into thinking they can't lose." },
  { id: 36, category: "Success", author: "Bill Gates", text: "It's fine to celebrate success, but it is more important to heed the lessons of failure." },
  { id: 37, category: "Success", author: "Reid Hoffman", text: "If you are not embarrassed by the first version of your product, you've launched too late." },
  { id: 38, category: "Success", author: "Paul Graham", text: "Make something people want." },

  // Learning
  { id: 39, category: "Learning", author: "B.B. King", text: "The beautiful thing about learning is that nobody can take it away from you." },
  { id: 40, category: "Learning", author: "Isaac Newton", text: "If I have seen further, it is by standing on the shoulders of giants." },
  { id: 41, category: "Learning", author: "Shunryu Suzuki", text: "In the beginner's mind there are many possibilities, but in the expert's there are few." },
  { id: 42, category: "Learning", author: "Albert Einstein", text: "I have no special talents. I am only passionately curious." },
  { id: 43, category: "Learning", author: "Albert Einstein", text: "The important thing is not to stop questioning." },
  { id: 44, category: "Learning", author: "Richard Feynman", text: "The first principle is that you must not fool yourself — and you are the easiest person to fool." },
  { id: 45, category: "Learning", author: "Richard Feynman", text: "What I cannot create, I do not understand." },
  { id: 46, category: "Learning", author: "Johann Wolfgang von Goethe", text: "Knowing is not enough; we must apply. Willing is not enough; we must do." },

  // Leadership
  { id: 47, category: "Leadership", author: "Dwight D. Eisenhower", text: "Leadership is the art of getting someone else to do something you want done because he wants to do it." },
  { id: 48, category: "Leadership", author: "Peter Drucker", text: "Management is doing things right; leadership is doing the right things." },
  { id: 49, category: "Leadership", author: "Jack Welch", text: "Before you are a leader, success is all about growing yourself. When you become a leader, success is all about growing others." },
  { id: 50, category: "Leadership", author: "John F. Kennedy", text: "Leadership and learning are indispensable to each other." },
  { id: 51, category: "Leadership", author: "Ralph Nader", text: "The function of leadership is to produce more leaders, not more followers." },
  { id: 52, category: "Leadership", author: "Steve Jobs", text: "Great things in business are never done by one person. They're done by a team of people." },
  { id: 53, category: "Leadership", author: "Simon Sinek", text: "Leadership is not about being in charge. It is about taking care of those in your charge." },

  // Technology
  { id: 54, category: "Technology", author: "Arthur C. Clarke", text: "Any sufficiently advanced technology is indistinguishable from magic." },
  { id: 55, category: "Technology", author: "Alan Kay", text: "The best way to predict the future is to invent it." },
  { id: 56, category: "Technology", author: "Linus Torvalds", text: "Talk is cheap. Show me the code." },
  { id: 57, category: "Technology", author: "Harold Abelson", text: "Programs must be written for people to read, and only incidentally for machines to execute." },
  { id: 58, category: "Technology", author: "Edsger W. Dijkstra", text: "Simplicity is prerequisite for reliability." },
  { id: 59, category: "Technology", author: "Donald Knuth", text: "Premature optimization is the root of all evil." },
  { id: 60, category: "Technology", author: "Edward Teller", text: "The science of today is the technology of tomorrow." },
  { id: 61, category: "Technology", author: "Douglas Adams", text: "We are stuck with technology when what we really want is just stuff that works." },
  { id: 62, category: "Technology", author: "Steve Jobs", text: "Real artists ship." },
];

export const QUOTES_BY_ID = new Map(QUOTES.map((q) => [q.id, q]));
