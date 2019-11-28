const { kitties } = require('./datasets/kitties');
const { clubs } = require('./datasets/clubs');
const { mods } = require('./datasets/mods');
const { cakes } = require('./datasets/cakes');
const { classrooms } = require('./datasets/classrooms');
const { breweries } = require('./datasets/breweries');
const { nationalParks } = require('./datasets/nationalParks');
const { instructors, cohorts } = require('./datasets/turing');
const { bosses, sidekicks } = require('./datasets/bosses');
const { constellations, stars } = require('./datasets/astronomy');
const { weapons, characters } = require('./datasets/ultima');
const { dinosaurs, humans, movies } = require('./datasets/dinosaurs');






// SINGLE DATASETS
// =================================================================

// DATASET: kitties from ./datasets/kitties
const kittyPrompts = {
  orangeKittyNames() {
    return filterCat = kitties.reduce((acc, cat) => {
      if(cat.color === 'orange') {
        acc.push(cat.name);
      }
      return acc;
    }, []);
  },
  // Annotation:
  // As we want to return a single array based on certain
  // criteria it would be best to use reduce here, while
  // filter would return an array of the results that matched
  // that criteria, it would return the whole object rather
  // than a new array of the names

  sortByAge() {
    return kitties.sort((a, b) => (b.age - a.age));
  },
  // Annotation:
  // to sort the order we can utilize the sort prototype
  // sort looks for a positive or negative comparison
  // by taking the second element (b) and subtracting the first (a)
  // we say if the result is positive shift that number to the left
  // this sorts descending

  growUp() {
    const result = kitties.map(cat => {
      const olderCat = {};
      olderCat.name = cat.name;
      olderCat.age = cat.age + 2;
      olderCat.color = cat.color;
      return olderCat;
    });
    return result;
  }
  // Annotation:
  // As we want to create another array of objects the same
  // length as the original array with a slight modification
  // we can use the map prototype
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: clubs from ./datasets/clubs
const clubPrompts = {
  membersBelongingToClubs() {
    const members = {};
    clubs.forEach(club => {
      club.members.forEach(name => {
        if (!members[name]) {
          members[name] = [club.club];
        } else {
          members[name].push(club.club);
        }
      });
    });
    return members;

    // Annotation:
    // Here we are going to want to do two rounds of iteraton
    // first we want to run through each club, and then
    // run through each member of that club, we want to comprise
    // a new object of members, and when we find a new member
    // that does not exist yet we want to add as a key to that
    // object with a value of an array containing the club they are in
    // for existing members (ie repeat instances) we simply want to add
    // the activity to that existing members array.
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------


// DATASET: mods from ./datasets/mods
const modPrompts = {
  studentsPerMod() {
    // Return an array of objects where the keys are mod (the number of the module)
    // and studentsPerInstructor (how many students per instructor there are for that mod) e.g.
    // [
    //   { mod: 1, studentsPerInstructor: 9 },
    //   { mod: 2, studentsPerInstructor: 11 },
    //   { mod: 3, studentsPerInstructor: 10 },
    //   { mod: 4, studentsPerInstructor: 8 }
    // ]

    const result = mods.map(mod => {
      const studentRatio = {};

      studentRatio.mod = mod.mod;
      studentRatio.studentsPerInstructor = mod.students / mod.instructors;

      return studentRatio;
    });
    return result;

    // Annotation:
    // As we want to return an array of the same size here we can utilize
    // map, we want to create a new object which has a mod property with the respective
    // mod number from the old array, and a studentsPerInstructor property
    // which has a value of the students divided by instructors
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: cakes from ./datasets/cakes
const cakePrompts = {
  stockPerCake() {
    const result = cakes.map(cake => {
      const cakeCount = {};

      cakeCount.flavor = cake.cakeFlavor;
      cakeCount.inStock = cake.inStock;

      return cakeCount;
    });
    return result;

    // Annotation:
    // Similar to above, as we are returning an array
    // of the same length we can utilize the map prototype
  },

  onlyInStock() {
    const result = cakes.filter(cake => cake.inStock > 0);
    return result;

    // Annotation:
    // As we want to return a paired down version of the original
    // array based on criteria, and we want to return more than 
    // one match, we can utilize filter here.
  },

  totalInventory() {
    const result = cakes.reduce((acc, cake) => {
      acc += cake.inStock;
      return acc;
    }, 0);
    return result;

    // Annotation:
    // As we want to return a singlular value based on the total
    // array we can use reduce here and accumulate the stock values
  },

  allToppings() {
    // Return an array of all unique toppings (no duplicates) needed to bake
    // every cake in the dataset e.g.
    // ['dutch process cocoa', 'toasted sugar', 'smoked sea salt', 'berries', ..etc]

    const result = cakes.reduce((acc, cake) => {
      cake.toppings.forEach(topping => {
        if (!acc.includes(topping)) {
          acc.push(topping);
        }       
      });
      return acc;
    }, []);
    return result;

    // Annotation:
    // Similar to the last problem, as we want to return a single
    // array we can utilize reduce and add to an array accumulator.
    // However, because cake.toppings is also an array we need to iterate
    // through that and see if our accumulator already contains the topping.
    // if not we add it to the array.
  },

  groceryList() {
    // I need to make a grocery list. Please give me an object where the keys are
    // each topping, and the values are the amount of that topping I need to buy e.g.
    // {
    //    'dutch process cocoa': 1,
    //    'toasted sugar': 3,
    //    'smoked sea salt': 3,
    //    'berries': 2,
    //    ...etc
    // }

    const result = cakes.reduce((acc, cake) => {
      cake.toppings.forEach(topping => {
        if (!acc[topping]) {
          acc[topping] = 1;
        } else {
          acc[topping] += 1;
        }
      });
      return acc;
    }, {});
    return result;

    // Annotation:
    // This runs similar to the last problem, except now we are
    // working with an object. For each topping we check if it 
    // already exists and if not add it to the accumulator with a 
    // starting value of 1, if it does already exist iterate by 1
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: classrooms from ./datasets/classrooms
const classPrompts = {
  feClassrooms() {
    const result = classrooms.filter(classroom => classroom.program === 'FE');
    return result;

    // Annotation:
    // Similar to above filters we are aiming to match everything in
    // an array by a certain criteria and return mutliple results
    // so we utilize filter.
  },

  totalCapacities() {
    const result = classrooms.reduce((acc, classroom) => {
      if (classroom.program === 'FE') {
        acc.feCapacity ? acc.feCapacity += classroom.capacity
          : acc.feCapacity = classroom.capacity;
      } else {
        acc.beCapacity ? acc.beCapacity += classroom.capacity
          : acc.beCapacity = classroom.capacity;
      }
      return acc;
    }, {});
    return result;

    // Annotation:
    // Here we want to create a single object so we'll use reduce
    // We want to check if the record we are iterating over
    // is FE or BE and then add+ the capacity  
    // to the respective capacity property
  },

  sortByCapacity() {
    const result = classrooms.sort((a, b) => (a.capacity - b.capacity));
    return result;

    // Annotation:
    // We will want to use sort to sort the array of objects
    // on capacity
  }
};



// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------


// DATASET: nationalParks from ./datasets/nationalParks

const nationalParksPrompts = {
  getParkVisitList() {
    const result = nationalParks.reduce((acc, park) => {
      if (park.visited) {
        acc.parksVisited ? acc.parksVisited.push(park.name)
          : acc.parksVisited = [park.name];
      } else {
        acc.parksToVisit ? acc.parksToVisit.push(park.name)
          : acc.parksToVisit = [park.name];
      }
      return acc;
    }, {});
    return result;

    // Annotation:
    // We ultimately want to create a single object 
    // with two properties so we will utilize reduce here
    // For each park we are checking if we've already created 
    // the parksVisisted and parksToVisit properties to see if they're
    // already created
  },

  getParkInEachState() {
    const result = nationalParks.map(park => {
      const statePair = {};
      statePair[park.location] = park.name;
      return statePair;
    });
    return result;

    // Annotation:
    // There are no duplicates, so we are creating an array
    // of the same length, we'll utilize map for this to 
    // restructure the array.
  },

  getParkActivities() {
    const activityList = [];
    nationalParks.forEach(park => {
      park.activities.forEach(activity => {
        if(!activityList.includes(activity)) {
          activityList.push(activity);
        }
      });
    });
    return activityList;

    // Annotation:
    // We want to run through each object in the array
    // reference the activities property and then we also want
    // to iterate through that array and add to a holding
    // activity array. We could use either forEach or reduce.
  }
};



// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: breweries from ./datasets/breweries
const breweryPrompts = {
  getBeerCount() {
    const result = breweries.reduce((acc, brewery) => {
      acc += brewery.beers.length;
      return acc;
    }, 0);
    return result;

    // Annotation:
    // We can use reduce to set a counter which we iterate based on the 
    // beers.length of each brewery
  },

  getBreweryBeerCount() {
    const result = breweries.map(brewery => {
      const countInstance = {};
      countInstance.name = brewery.name;
      countInstance.beerCount = brewery.beers.length;
      return countInstance;
    });
    return result;

    // Annotation:
    // We will use map to create a newly structured array as we want 
    // one element for each brewery
  },

  findHighestAbvBeer() {
    // Return the beer which has the highest ABV of all beers
    // e.g.
    // { name: 'Barrel Aged Nature\'s Sweater', type: 'Barley Wine', abv: 10.9, ibu: 40 }

    // Annotation:
    // There are a number of ways we could approach this one. We could use a 
    // forEach loop on each brewery, and then a sort descending on ABV fetching
    // top index position. We could also use a reduce and foreach check all the beers
    // setting the accumulator as the current indexed beer if the ABV is higher than the
    // beer present in the accumulator. This approach is probably a bit more condensed. 
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DOUBLE DATASETS
// =================================================================

// DATASET: instructors, cohorts from ./datasets/turing
const turingPrompts = {
  studentsForEachInstructor() {
    // Return an array of instructors where each instructor is an object
    // with a name and the count of students in their module. e.g.
    // [
    //  { name: 'Pam', studentCount: 21 },
    //  { name: 'Robbie', studentCount: 18 }
    // ]

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  studentsPerInstructor() {
    // Return an object of how many students per teacher there are in each cohort e.g.
    // {
    // cohort1806: 9,
    // cohort1804: 10.5
    // }

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  modulesPerTeacher() {
    // Return an object where each key is an instructor name and each value is
    // an array of the modules they can teach based on their skills. e.g.:
    // {
    //     Pam: [2, 4],
    //     Brittany: [2, 4],
    //     Nathaniel: [2, 4],
    //     Robbie: [4],
    //     Leta: [2, 4],
    //     Travis: [1, 2, 3, 4],
    //     Louisa: [1, 2, 3, 4],
    //     Christie: [1, 2, 3, 4],
    //     Will: [1, 2, 3, 4]
    //   }

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  curriculumPerTeacher() {
    // Return an object where each key is a curriculum topic and each value is
    // an array of instructors who teach that topic e.g.:
    // {
    //   html: [ 'Travis', 'Louisa' ],
    //   css: [ 'Travis', 'Louisa' ],
    //   javascript: [ 'Travis', 'Louisa', 'Christie', 'Will' ],
    //   recursion: [ 'Pam', 'Leta' ]
    // }

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: bosses, sidekicks from ./datasets/bosses
const bossPrompts = {
  bossLoyalty() {
    // Create an array of objects that each have the name of the boss and the sum
    // loyalty of all their sidekicks. e.g.:
    // [
    //   { bossName: 'Jafar', sidekickLoyalty: 3 },
    //   { bossName: 'Ursula', sidekickLoyalty: 20 },
    //   { bossName: 'Scar', sidekickLoyalty: 16 }
    // ]

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: constellations, stars } from ./datasets/astronomy
const astronomyPrompts = {
  starsInConstellations() {
    // Return an array of all the stars that appear in any of the constellations
    // listed in the constellations object e.g.
    // [
    //   { name: 'Rigel',
    //     visualMagnitude: 0.13,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 860,
    //     color: 'blue' },
    //   { name: 'Betelgeuse',
    //     visualMagnitude: 0.5,
    //     constellation: 'Orion',
    //     lightYearsFromEarth: 640,
    //     color: 'red' }
    // ]

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  starsByColor() {
    // Return an object with keys of the different colors of the stars,
    // whose values are arrays containing the star objects that match e.g.
    // {
    //   blue: [{obj}, {obj}, {obj}, {obj}, {obj}],
    //   white: [{obj}, {obj}],
    //   yellow: [{obj}, {obj}],
    //   orange: [{obj}],
    //   red: [{obj}]
    // }

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  constellationsStarsExistIn() {
    // Return an array of the names of the constellations that the brightest stars are part of e.g.

    //  [ "Canis Major",
    //    "Carina",
    //    "Boötes",
    //    "Auriga",
    //    "Orion",
    //    "Lyra",
    //    "Canis Minor",
    //    "The Plow",
    //    "Orion",
    //    "The Little Dipper" ]


    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: charaters, weapons from ./datasets/ultima
const ultimaPrompts = {
  totalDamage() {

    // Return the sum of the amount of damage for all the weapons that our characters can use
    // Answer => 113

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  charactersByTotal() {

    // Return the sum damage and total range for each character as an object.
    // ex: [ { Avatar: { damage: 27, range: 24 }, { Iolo: {...}, ...}

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },
};






// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------






// DATASET: dinosaurs, humans, movies from ./datasets/dinosaurs
const dinosaurPrompts = {
  countAwesomeDinosaurs() {
    // Return an object where each key is a movie title and each value is the
    // number of awesome dinosaurs in that movie. e.g.:
    // {
    //   'Jurassic Park': 5,
    //   'The Lost World: Jurassic Park': 8,
    //   'Jurassic Park III': 9,
    //   'Jurassic World': 11,
    //   'Jurassic World: Fallen Kingdom': 18
    // }

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  averageAgePerMovie() {
    /* Return an object where each key is a movie director's name and each value is
        an object whose key is a movie's title and whose value is the average age
        of the cast on the release year of that movie.
      e.g.:
      {
        'Steven Spielberg':
          {
            'Jurassic Park': 34,
            'The Lost World: Jurassic Park': 37
          },
        'Joe Johnston':
          {
            'Jurassic Park III': 44
          },
        'Colin Trevorrow':
          {
            'Jurassic World': 56
           },
        'J. A. Bayona':
          {
            'Jurassic World: Fallen Kingdom': 59
          }
      }
    */

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  uncastActors() {
    /*
    Return an array of objects that contain the names of humans who have not been cast in a Jurassic Park movie (yet), their nationality, and their imdbStarMeterRating. The object in the array should be sorted alphabetically by nationality.

    e.g.
      [{
        name: 'Justin Duncan',
        nationality: 'Alien',
        imdbStarMeterRating: 0
      },
      {
        name: 'Karin Ohman',
        nationality: 'Chinese',
        imdbStarMeterRating: 0
      },
      {
        name: 'Tom Wilhoit',
        nationality: 'Kiwi',
        imdbStarMeterRating: 1
      }, {
        name: 'Jeo D',
        nationality: 'Martian',
        imdbStarMeterRating: 0
      }]
    */

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  },

  actorsAgesInMovies() {
    /*
    Return an array of objects for each human and the age(s) they were in the movie(s) they were cast in, as an array of age(s). Only include humans who were cast in at least one movie.

    e.g.
    [ { name: 'Sam Neill', ages: [ 46, 54 ] },
      { name: 'Laura Dern', ages: [ 26, 34 ] },
      { name: 'Jeff Goldblum', ages: [ 41, 45, 63, 66 ] },
      { name: 'Richard Attenborough', ages: [ 70, 74, 92, 95 ] },
      { name: 'Ariana Richards', ages: [ 14, 18 ] },
      { name: 'Joseph Mazello', ages: [ 10, 14 ] },
      { name: 'BD Wong', ages: [ 33, 55, 58 ] },
      { name: 'Chris Pratt', ages: [ 36, 39 ] },
      { name: 'Bryce Dallas Howard', ages: [ 34, 37 ] } ]
    */

    const result = 'REPLACE WITH YOUR RESULT HERE';
    return result;

    // Annotation:
    // Write your annotation here as a comment
  }
};

module.exports = {
  breweryPrompts,
  turingPrompts,
  clubPrompts,
  bossPrompts,
  classPrompts,
  modPrompts,
  kittyPrompts,
  cakePrompts,
  astronomyPrompts,
  ultimaPrompts,
  nationalParksPrompts,
  dinosaurPrompts
};
