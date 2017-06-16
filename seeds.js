var mongoose = require("mongoose");
var Cat = require("./models/cat");
var Comment = require("./models/comment");

var data = [
    {
        name: "Buttercup", 
        image: "https://www.petfinder.com/wp-content/uploads/2012/11/91615172-find-a-lump-on-cats-skin-632x475.jpg",
        gender: "female",
        age: "3",
        hair: "short",
        breed: "American Shorthair",
        cost: "30",
        ownerContact: "317-324-8878",
        description: "Scratch at the door then walk away caticus cuteicus touch water with paw then recoil in horror. Pushes butt to face catch mouse and gave it as a present favor packaging over toy playing with balls of wool, hopped up on catnip, chase red laser dot yet caticus cuteicus. Stretch munch on tasty moths give me attention or face the wrath of my claws then cats take over the world. You call this cat food i like big cats and i can not lie brown cats with pink ears yet going to catch the red dot today going to catch the red dot today but brown cats with pink ears. Find a way to fit in tiny box purrr purr littel cat, little cat purr purr.",
        "creator.username": "Cat Luvr"
    },
    {
        name: "Socks", 
        image: "https://www.petfinder.com/wp-content/uploads/2012/11/152964589-welcome-home-new-cat-632x475.jpg",
        gender: "female",
        age: "3.2",
        hair: "short",
        breed: "Maine Coone",
        cost: "0",
        ownerContact: "317-324-8878",
        description: "Scratch at the door then walk away caticus cuteicus touch water with paw then recoil in horror. Pushes butt to face catch mouse and gave it as a present favor packaging over toy playing with balls of wool, hopped up on catnip, chase red laser dot yet caticus cuteicus. Stretch munch on tasty moths give me attention or face the wrath of my claws then cats take over the world. You call this cat food i like big cats and i can not lie brown cats with pink ears yet going to catch the red dot today going to catch the red dot today but brown cats with pink ears. Find a way to fit in tiny box purrr purr littel cat, little cat purr purr.",
        "creator.username": "Cat Luvr"
    },
    {
        name: "Maximillian", 
        image: "https://newbloggycat.files.wordpress.com/2015/07/funny-karate-cat.jpg",
        gender: "male",
        age: "7",
        hair: "long",
        breed: "Ragdoll",
        cost: "19.99",
        ownerContact: "317-324-8878",
        description: "Scratch at the door then walk away caticus cuteicus touch water with paw then recoil in horror. Pushes butt to face catch mouse and gave it as a present favor packaging over toy playing with balls of wool, hopped up on catnip, chase red laser dot yet caticus cuteicus. Stretch munch on tasty moths give me attention or face the wrath of my claws then cats take over the world. You call this cat food i like big cats and i can not lie brown cats with pink ears yet going to catch the red dot today going to catch the red dot today but brown cats with pink ears. Find a way to fit in tiny box purrr purr littel cat, little cat purr purr.",
        "creator.username": "Cat Luvr"
    },
    {
        name: "Buttercup", 
        image: "https://www.petfinder.com/wp-content/uploads/2012/11/91615172-find-a-lump-on-cats-skin-632x475.jpg",
        gender: "female",
        age: "3",
        hair: "short",
        breed: "American Shorthair",
        cost: "30",
        ownerContact: "317-324-8878",
        description: "Scratch at the door then walk away caticus cuteicus touch water with paw then recoil in horror. Pushes butt to face catch mouse and gave it as a present favor packaging over toy playing with balls of wool, hopped up on catnip, chase red laser dot yet caticus cuteicus. Stretch munch on tasty moths give me attention or face the wrath of my claws then cats take over the world. You call this cat food i like big cats and i can not lie brown cats with pink ears yet going to catch the red dot today going to catch the red dot today but brown cats with pink ears. Find a way to fit in tiny box purrr purr littel cat, little cat purr purr.",
        "creator.username": "Cat Luvr"
    },
    {
        name: "Socks", 
        image: "https://www.petfinder.com/wp-content/uploads/2012/11/152964589-welcome-home-new-cat-632x475.jpg",
        gender: "female",
        age: "3.2",
        hair: "short",
        breed: "Maine Coone",
        cost: "0",
        ownerContact: "317-324-8878",
        description: "Scratch at the door then walk away caticus cuteicus touch water with paw then recoil in horror. Pushes butt to face catch mouse and gave it as a present favor packaging over toy playing with balls of wool, hopped up on catnip, chase red laser dot yet caticus cuteicus. Stretch munch on tasty moths give me attention or face the wrath of my claws then cats take over the world. You call this cat food i like big cats and i can not lie brown cats with pink ears yet going to catch the red dot today going to catch the red dot today but brown cats with pink ears. Find a way to fit in tiny box purrr purr littel cat, little cat purr purr.",
        "creator.username": "Cat Luvr"
    },
    {
        name: "Maximillian", 
        image: "https://newbloggycat.files.wordpress.com/2015/07/funny-karate-cat.jpg",
        gender: "male",
        age: "7",
        hair: "long",
        breed: "Ragdoll",
        cost: "19.99",
        ownerContact: "317-324-8878",
        description: "Scratch at the door then walk away caticus cuteicus touch water with paw then recoil in horror. Pushes butt to face catch mouse and gave it as a present favor packaging over toy playing with balls of wool, hopped up on catnip, chase red laser dot yet caticus cuteicus. Stretch munch on tasty moths give me attention or face the wrath of my claws then cats take over the world. You call this cat food i like big cats and i can not lie brown cats with pink ears yet going to catch the red dot today going to catch the red dot today but brown cats with pink ears. Find a way to fit in tiny box purrr purr littel cat, little cat purr purr.",
        "creator.username": "Cat Luvr"
    },
    {
        name: "Buttercup", 
        image: "https://www.petfinder.com/wp-content/uploads/2012/11/91615172-find-a-lump-on-cats-skin-632x475.jpg",
        gender: "female",
        age: "3",
        hair: "short",
        breed: "American Shorthair",
        cost: "30",
        ownerContact: "317-324-8878",
        description: "Scratch at the door then walk away caticus cuteicus touch water with paw then recoil in horror. Pushes butt to face catch mouse and gave it as a present favor packaging over toy playing with balls of wool, hopped up on catnip, chase red laser dot yet caticus cuteicus. Stretch munch on tasty moths give me attention or face the wrath of my claws then cats take over the world. You call this cat food i like big cats and i can not lie brown cats with pink ears yet going to catch the red dot today going to catch the red dot today but brown cats with pink ears. Find a way to fit in tiny box purrr purr littel cat, little cat purr purr.",
        "creator.username": "Cat Luvr"
    },
    {
        name: "Socks", 
        image: "https://www.petfinder.com/wp-content/uploads/2012/11/152964589-welcome-home-new-cat-632x475.jpg",
        gender: "female",
        age: "3.2",
        hair: "short",
        breed: "Maine Coone",
        cost: "0",
        ownerContact: "317-324-8878",
        description: "Scratch at the door then walk away caticus cuteicus touch water with paw then recoil in horror. Pushes butt to face catch mouse and gave it as a present favor packaging over toy playing with balls of wool, hopped up on catnip, chase red laser dot yet caticus cuteicus. Stretch munch on tasty moths give me attention or face the wrath of my claws then cats take over the world. You call this cat food i like big cats and i can not lie brown cats with pink ears yet going to catch the red dot today going to catch the red dot today but brown cats with pink ears. Find a way to fit in tiny box purrr purr littel cat, little cat purr purr.",
        "creator.username": "Cat Luvr"
    },
    {
        name: "Maximillian", 
        image: "https://newbloggycat.files.wordpress.com/2015/07/funny-karate-cat.jpg",
        gender: "male",
        age: "7",
        hair: "long",
        breed: "Ragdoll",
        cost: "19.99",
        ownerContact: "317-324-8878",
        description: "Scratch at the door then walk away caticus cuteicus touch water with paw then recoil in horror. Pushes butt to face catch mouse and gave it as a present favor packaging over toy playing with balls of wool, hopped up on catnip, chase red laser dot yet caticus cuteicus. Stretch munch on tasty moths give me attention or face the wrath of my claws then cats take over the world. You call this cat food i like big cats and i can not lie brown cats with pink ears yet going to catch the red dot today going to catch the red dot today but brown cats with pink ears. Find a way to fit in tiny box purrr purr littel cat, little cat purr purr.",
        "creator.username": "Cat Luvr"
    },
    {
        name: "Buttercup", 
        image: "https://www.petfinder.com/wp-content/uploads/2012/11/91615172-find-a-lump-on-cats-skin-632x475.jpg",
        gender: "female",
        age: "3",
        hair: "short",
        breed: "American Shorthair",
        cost: "30",
        ownerContact: "317-324-8878",
        description: "Scratch at the door then walk away caticus cuteicus touch water with paw then recoil in horror. Pushes butt to face catch mouse and gave it as a present favor packaging over toy playing with balls of wool, hopped up on catnip, chase red laser dot yet caticus cuteicus. Stretch munch on tasty moths give me attention or face the wrath of my claws then cats take over the world. You call this cat food i like big cats and i can not lie brown cats with pink ears yet going to catch the red dot today going to catch the red dot today but brown cats with pink ears. Find a way to fit in tiny box purrr purr littel cat, little cat purr purr.",
        "creator.username": "Cat Luvr"
    },
    {
        name: "Socks", 
        image: "https://www.petfinder.com/wp-content/uploads/2012/11/152964589-welcome-home-new-cat-632x475.jpg",
        gender: "female",
        age: "3.2",
        hair: "short",
        breed: "Maine Coone",
        cost: "0",
        ownerContact: "317-324-8878",
        description: "Scratch at the door then walk away caticus cuteicus touch water with paw then recoil in horror. Pushes butt to face catch mouse and gave it as a present favor packaging over toy playing with balls of wool, hopped up on catnip, chase red laser dot yet caticus cuteicus. Stretch munch on tasty moths give me attention or face the wrath of my claws then cats take over the world. You call this cat food i like big cats and i can not lie brown cats with pink ears yet going to catch the red dot today going to catch the red dot today but brown cats with pink ears. Find a way to fit in tiny box purrr purr littel cat, little cat purr purr.",
        "creator.username": "Cat Luvr"
    },
    {
        name: "Maximillian", 
        image: "https://newbloggycat.files.wordpress.com/2015/07/funny-karate-cat.jpg",
        gender: "male",
        age: "7",
        hair: "long",
        breed: "Ragdoll",
        cost: "19.99",
        ownerContact: "317-324-8878",
        description: "Scratch at the door then walk away caticus cuteicus touch water with paw then recoil in horror. Pushes butt to face catch mouse and gave it as a present favor packaging over toy playing with balls of wool, hopped up on catnip, chase red laser dot yet caticus cuteicus. Stretch munch on tasty moths give me attention or face the wrath of my claws then cats take over the world. You call this cat food i like big cats and i can not lie brown cats with pink ears yet going to catch the red dot today going to catch the red dot today but brown cats with pink ears. Find a way to fit in tiny box purrr purr littel cat, little cat purr purr.",
        "creator.username": "Cat Luvr"
    }
];


function seedDB() {
	//remove all cats
	Cat.remove({}, function(err){
		if(err){
			console.log(err);
		} else {
			console.log("removed all cats from DB!");
			//add a few cats
			data.forEach(function(seed){
				Cat.create(seed, function(err, cat){
					if(err){
						console.log("Error seeding DB");
						console.log(err);
					} else {
						console.log("Added a cat to the DB!");
						//create a comment
						Comment.create(
							{
								text: "This is a cute cat!!!",
								author: "Homer"
							}, function(err, comment){
								if(err){
									console.log("Err adding comment!");
									console.log(err);
								} else {
									cat.comments.push(comment);
									cat.save();
									console.log("Created new comment.");
								}
							}
						)
					}
				})
			});
		}
	});

}

module.exports = seedDB;