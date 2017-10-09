---
layout: post
title: Fastest way to see 17 Boston breweries (and one cider house)
description: Calculating an optimal route between all the Boston area breweries using a Traveling Salesman Problem solver.
---

There have been a few articles in the last couple years that have used traveling salesman problem solvers to find the fastest way to see [all the national parks](http://www.randalolson.com/2016/07/30/the-optimal-u-s-national-parks-centennial-road-trip/) or [72 breweries in the US](https://flowingdata.com/2015/10/26/top-brewery-road-trip-routed-algorithmically/). I'm going to join the trend on a smaller geographic scale by plotting the fastest way to see 18 breweries (including one cider house) in the Boston area.

The fastest route takes about 2.5 hours of driving (by your designated driver or using a ride service, of course) from start to finish:

<div style='margin: 15px 0px'>
  <iframe src='/public/maps/brewery.html' width='700' height='600' style='border: none; position: relative; left: -25px'></iframe>
</div>

If you take 15 minutes at each brewery to have a beer, and it takes 2.5 hours to drive to each one, you could do it all in only 7 hours. Not bad, that's less than a full day at work!

You won't be able to drive this yourself if you have a beer at every stop, so you'll either need to find a friend to drive you around for seven hours, or take something like a Lyft. I used the Lyft API to estimate how much it would cost, and it comes in at about $176. If you can split this with three friends, and you pay, say, <span>$</span>8 per drink, your total cost would be <span>$</span>188.

Am I going to do this? Probably not. I really don't think I could stomach 17 beers and a cider in one day. And think of all the fun I could have programming in R for seven hours, instead. Yeah. Easy choice.

Here's a list of all the breweries, in order. You could start your tour anywhere, but if I were doing this I'd start at Aeronaut, my favorite brewery around here. You'd also get to end at Bantam Cider Company to cap off very long night out on a different note.


1. Aeuronaut Brewery
2. Winter Hill Brewing Company
3. Idle Hands Craft Ales
4. Night Shift Brewing
5. Bone Up Brewing Company
6. Mystic Brewery
7. Downeast Cider House
8. Boston Beer Works
9. Trillium Brewing Company
10. Harpoon Brewery
11. Dorchester Brewing Company
12. Sam Adams Brewery
13. Turtle Swamp Brewing
14. John Harvards Brewery
15. Lamplighter Brewing Company
16. Cambridge Brewing Company
17. Somerville Brewing Company
18. Bantam Cider Company

If you want to want do this, here's a [Google Map with all the breweries entered in order](https://www.google.com/maps/dir/Aeronaut+Brewing+Company,+14+Tyler+St,+Somerville,+MA+02143/Winter+Hill+Brewing+Company,+328+Broadway,+Somerville,+MA+02145/Idle+Hands+Craft+Ales,+89+Commercial+St,+Malden,+MA+02148/Night+Shift+Brewing,+87+Santilli+Hwy,+Everett,+MA+02149/Bone+Up+Brewing+Co.,+38+Norman+St,+Everett,+MA+02149/Mystic+Brewery,+174+Williams+St,+Chelsea,+MA+02150/Downeast+Cider+House,+256+Marginal+St+%2332,+East+Boston,+MA+02128/BEERWORKS+Brewing+No.+3+Canal,+112+Canal+St,+Boston,+MA+02114/Trillium+Brewing+Company,+369+Congress+Street,+FL+1A,+Boston,+MA+02210/Harpoon+Brewery+And+Beer+Hall,+306+Northern+Ave,+Boston,+MA+02210/Dorchester+Brewing+Company,+1250+Massachusetts+Ave,+Dorchester,+MA+02125/Samuel+Adams,+30+Germania+St,+Boston,+MA+02130/Turtle+Swamp+Brewing,+3377+Washington+St,+Boston,+MA+02130/John+Harvard's+Brewery+%26+Ale+House,+33+Dunster+St,+Cambridge,+MA+02138/Lamplighter+Brewing+Co.,+284+Broadway,+Cambridge,+MA+02139/Cambridge+Brewing+Company,+1,+1+Kendall+Square,+Cambridge,+MA+02139/Somerville+Brewing+Company+-+Slumbrew,+15+Ward+St,+Somerville,+MA+02143/Bantam+Cider+Company,+40+Merriam+St,+Somerville,+MA+02143/@42.357596,-71.062877,12z/data=!4m109!4m108!1m5!1m1!1s0x89e37736621ba0e3:0xcd08ad34fe7dca73!2m2!1d-71.1062431!2d42.3819603!1m5!1m1!1s0x89e370d461337b9d:0x732c6faaf36fa55!2m2!1d-71.093984!2d42.392658!1m5!1m1!1s0x89e3711a973d8981:0x602f1fd391d76ed7!2m2!1d-71.0747463!2d42.4243919!1m5!1m1!1s0x89e3711a8dbb40d3:0xc68b7f0434ddb595!2m2!1d-71.067886!2d42.4059707!1m5!1m1!1s0x89e371116054c6df:0x30dd9e16e3a944cd!2m2!1d-71.0659377!2d42.4057422!1m5!1m1!1s0x89e371ab8c837f8f:0xc644198c4204f828!2m2!1d-71.044508!2d42.391628!1m5!1m1!1s0x89e370f8a1a1ba83:0x616aeee762a3390d!2m2!1d-71.0324945!2d42.3642794!1m5!1m1!1s0x89e3708e355828b1:0xb7e761efd7866524!2m2!1d-71.060386!2d42.364458!1m5!1m1!1s0x89e37a803cc64d71:0x84333022c52876d!2m2!1d-71.047858!2d42.3498299!1m5!1m1!1s0x89e37a9da5a2cfcb:0xc0be8b883c30f87e!2m2!1d-71.034439!2d42.346892!1m5!1m1!1s0x89e37a4fd2b56dcf:0x4556895a1d1fb907!2m2!1d-71.062317!2d42.322152!1m5!1m1!1s0x89e3797b7da31c79:0x608b218b28d63376!2m2!1d-71.1032285!2d42.3145455!1m5!1m1!1s0x89e379643bcaf91f:0x470aa6cde54a2b0d!2m2!1d-71.1052909!2d42.3088836!1m5!1m1!1s0x89e37742ceb8a909:0x7666471e31ddf163!2m2!1d-71.1192843!2d42.3726027!1m5!1m1!1s0x89e37752b0e81867:0x26811979965d9ac4!2m2!1d-71.0978948!2d42.36795!1m5!1m1!1s0x89e370ade1cbb413:0x3e315a440afb04f9!2m2!1d-71.0912995!2d42.3664092!1m5!1m1!1s0x89e370b65aae14c7:0xdc997b87e8c938a0!2m2!1d-71.0892538!2d42.3748138!1m5!1m1!1s0x89e370b5ff812441:0x94fbd00ab0ecf947!2m2!1d-71.0919018!2d42.3777733). Good luck.

P.S. Let me know if I missed any breweries in the area!

**Do it yourself:** All the code for this project is [on Github](https://github.com/herbps10/brewery-tsp). I used the Google Maps API for calculating a distance matrix between all the breweries and to get detailed directions between each point on the final tour. The optimal tour was calculated using the [asymmetric traveling salesman problem](https://en.wikipedia.org/wiki/Travelling_salesman_problem#Asymmetric_TSP) solver from the [TSP R package](https://cran.r-project.org/web/packages/TSP/index.html). The Lyft price estimate came from it's [public API](https://www.lyft.com/developers). If you want to run the code yourself, you'll need to get a Google Maps API key and a Lyft API key.
