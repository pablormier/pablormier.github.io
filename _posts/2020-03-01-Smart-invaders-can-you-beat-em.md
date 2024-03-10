---
layout: post
title: Smart invaders&#58; Can you beat 'em?
date: 2020-03-01
description: 
categories: artificial-intelligence
disqus_comments: true
related_posts: false
---

Explaining Artificial Intelligence (AI) in one hour to high school students is a challenging task. The topic is very broad and it usually requires previous knowledge of programming, algorithms and maths. During our time as PhD students at CiTIUS, [Tomás](https://people.epfl.ch/tomas.teijeiro) and I were in charge of introducing this topic to some visiting students from [IES Rosalia de Castro](http://www.iesrosalia.net/). Although fully motivated to do it and convinced about the importance of disseminating this kind of topics among young students, we had no idea how to approach the subject. It was after few discussions when we came out with the idea of developing a game to support our talk. We thought that using games could be a good strategy to engage them and motivate them to participate, and if  they don't learn anything from our talk, at least they can have some fun.

Since AI is very broad, we decided to focus on a specific topic. We chose *Genetic Algorithms* as a way to introduce them to heuristic & optimization because they connect really well to concepts that they already know from high school, such as evolution, reproduction, genes, etc. These algorithms have also the advantage that they are relatively simple to understand (at least from a intuitive perspective) and so we could avoid the use of math formulation.

<div class="row justify-content-center">
    <div class="col-md-8 mt-3 mt-md-0">
    	<a href="https://citiususc.github.io/citius-invaders/">
        {% include figure.liquid loading="eager" path="assets/img/invaders/main-menu.png" class="img-fluid rounded z-depth-1" %}
        </a>
    </div>
</div>
<div class="caption text-center">
    Screenshot of our retro game's main screen "CiTIUS Invaders"
</div>



## Genetic algorithms

Before continuing, I would like to add just a brief introduction to genetic algorithms, a type of evolutionary algorithm. I've previously talked about an evolutionary based algorithm for optimization in my blog (see [Differential Evolution]({{ site.baseurl }}/2017/09/05/a-tutorial-on-differential-evolution-with-python)). Genetic algorithms were invented in 1960 by John H. Holland and other collaborators at the University of Michigan. The main idea behind these techniques is that, in a similar way evolution is able to "develop" living organisms that are adapted to survive in a concrete environment, we could use evolution to search a solution to a problem by starting with a random population of individuals encoded by a set of genes (where genes are parameters important for the problem), and make them evolve (by mating, mutating, and allowing the best ones to survive) until they adapt to the problem, that is, they become good solutions.

In order to use genetic algorithms you need a few things. First, you need a problem and a way to say if something is a good solution to your problem, that is, any kind of function that returns a number representing how good or bad a solution is. You also need a representation for your solution (numbers, strings..) and operators to reproduce them (interchange parameters of the parents) and mutate them (change parameters randomly). Finally, to make everything work, you need to add evolutionary pressure by making bad solutions die and good solutions survive and reproduce.

Genetic algorithms are very powerful methods that are able to optimize those hard functions functions that other techniques based on gradients (such as gradient descent), quasi-newton methods (like L-BFGS) or even other gradient free methods (e.g. Nelder-Mead) fail miserably (since the functions are not derivable, they have many local minima or they are noisy). That's why Genetic Algorithms work well in problems like neuroevolution (see for example [this work from Uber AI](https://arxiv.org/abs/1712.06567) or this other work about [NEAT](http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf)). 

Unfortunately, Genetic Algorithms are out of the scope of this post, but if you are interested in quick and intuitive introduction, I recommend you to watch the series made by ["The Coding Train"](https://www.youtube.com/embed/j9zfeTw-uFCw). For a more formal introduction, you can watch [this nice introduction](https://www.youtube.com/watch?v=kHyNqSnzP8Y) from the MIT's professor Patrick Winston (who sadly passed away in 2019).

## The idea

Inspired by the game *Space Invaders*, we thought that we could use the same game mechanics in a slightly different way. Unlike in the original game, where the player has to kill all the invaders without being killed, in our game the match starts with a reduced number of invaders. These  invaders don't shoot, they only reproduce, and there is always a minimum of four of them in the game. The player must therefore prevent them from invading everything and becoming a plague. To make things worse, as the game progresses, the speed in which the invaders reproduce also increases.


<div class="row justify-content-center">
    <div class="col-md-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/invaders/space_invaders_1978.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption text-center">
    Screenshot of the original "Space Invaders" game developed in 1978
</div>


So what this game has to do with Genetic Algorithms? In our game, the invaders have genes (parameters) that represents their properties (or the phenotype). Each gene encode a different property: the speed in the X axis, the speed in the Y axis, probability of inverting movement, size, color in a gray scale... When they reproduce, the genetic information of the selected parents recombines, and new invaders are created merging the properties of their parents. Invaders are also subject to random mutations that can randomly change some properties during the reproduction phase. And what about the natural selection and evolutionary pressure I mentioned before? Well, the evolution pressure is the player killing invaders: usually the big and slow ones are the easiest to kill, and the small and fast ones are harder to kill. So over time those invaders that escape more often from the player will have more chances to survive, reproduce and pass it's genetic information to the children, making more good invaders. 

As the invaders evolve against the player, the player strategy evolve against them. **The idea of the game is to see how long is the player able to sustain this equilibrium over time**. However chances are that at some point, they will beat you.



## The development

We started to develop a quick and dirty prototype of the idea in Python with the [SGE Game Engine](http://stellarengine.nongnu.org/). After a few days, we had our first version. We tested it and we found that the idea worked really well. However we had a problem: we wanted to do an interactive session with the students during our lesson, and installing and making sure that all their laptops were able to run the game would be a big problem. We needed something easier and more portable to distribute among the students. The last thing we wanted was to spend half the class solving installation problems.

Thus, once the idea was well tested, we decided to port the game to Javascript so they could run it in their browsers. For this task we used the amazing [Phaser library](www.phaser.io) for developing 2D HTML5 games (looking back, I regret having started with Python, as Phaser was very easy to learn). We also decided to release the code of both the Python and Javascript verions on [GitHub](https://github.com/citiususc/citius-invaders) just in case anyone other than our visiting students found it interesting.

Our beloved friend [Tino](https://github.com/constantino-garcia) (also PhD student at CiTIUS at that time) was also involved in the project by composing the music of the main screen. His song is the icing on the cake!

> If you want more details about the development of the game and how the genetic algorithm works, at the end of the post you will find a video made by the youtuber Siraj Raval.



## The result

After some time learning how to play well our own game, we discovered that the invaders were able to develop smart strategies to beat us! Even changing our strategies didn't work really well as they were fast to adapt and change also their strategy. To be honest, we had lot of fun exploring how the invaders behave and evolve. Here is a recorded video (at fast speed) where you can see one of the strategies adopted by the invaders against mine:


<div class="row justify-content-center">
    <div class="col-md-8 mt-3 mt-md-0 d-flex justify-content-center">
        <div style="position: relative; width: 100%; height: 0; padding-top: 56.25%;">
            <iframe src="https://www.youtube.com/embed/ob0b588nq1Q" title="CiTIUS Invaders Gameplay"
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>
        </div>
    </div>
</div>
<div class="caption text-center">
    Gameplay showing how the smart invaders evolve against my strategy. The result is totally unexpected.
</div>




At the beginning there are a few random invaders with different sizes, intensities and speeds. Some are big, some are small, some are more white. If you pay attention, you will see that my initial strategy is to kill the smallest ones. Why? well, the small invaders are hard to kill, especially if they are fast. If I let them live and I kill the easiest ones, the small ones will reproduce faster and then I'm doomed to fail. So I start killing them going from right to left to confine them in a small region where I can kill them easily. As I kill all the invaders that move to the right, at some point you can see that they stop doing that because is a bad strategy for them: if they scape to the right, I kill them and they don't survive, so instead they move to the left, top and bottom. After a while they also stopped moving to the bottom because they are usually the first to die. And finally they stopped moving in almost any direction. 

However, at this moment, the first unexpected thing for me happened (see the video at 0:30s): the big invaders started to appear on top of the small ones, and since this new generation barely moves (as it resulted in a bad survival strategy against me) the big ones started to indirectly "protect" the small ones. As I was not able to kill the small ones that were behind the big invaders, over time only the small ones survived, and so they reproduced more and became smaller and smaller. And then the second unexpected thing happened at 0:56: thanks to random mutations in the population, some of the small invaders re-learned how to move to other directions, but this time way faster! Few of them escaped from my control and then they started to reproduce and to have more small and fast babies in all directions. After a while, the situation got out of hand, and they became a plague. 

As you can see, both crossover (crossing and recombining genetic information of the parents) and mutations are important: crossover allows to select the best features (like becoming small) and mutations prevent the population to prematurely converge to a suboptimal strategy by introducing diversity. Without mutations, once all the invaders became small and confined, it would be over for them as I could keep killing them without even moving my player.

If you have some time and you are curious, give it a try as well! [here is the link to play](https://citiususc.github.io/citius-invaders/).

## The testing day

We were quite happy with our game, but still uncertain of how the students would react to it. Being used to explain things to university students or in conferences, I found that doing it for a younger audience was a big challenge, and way more difficult!

Anyway, the day came and we showed them our slides with a few videos and examples to make it more entertaining. I have to say that it was a pleasure to have them visiting our research center, they showed much attention and interest. However, during the slides, they were more in the mood of "okey, we have to listen another presentation", until we made them use some interactive examples in their laptops (if you wonder which ones, we used the ["Genetic cars"](https://rednuht.org/genetic_cars_2/) and the ["Genetic Walkers"](https://rednuht.org/genetic_walkers/) made some time ago by [Rafael Matsunaga](https://rednuht.org/)).

Of course we reserved our game for the end of the talk. After the talk and the examples, we told them that now they had to show us if they were smarter than natural selection, and we explained the basic rules of the game. To be honest, I think neither Tomás nor I expected such a good reaction! 

<div class="row justify-content-center">
    <div class="col-md-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/invaders/citius-invaders-2016.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption text-center">
    Students from IES Rosalia de Castro at CiTIUS trying to beat the artificial intelligence
</div>



It took them just a few minutes to discover how to play well and they started a competition to see who score the most points. Our research center also bought some little presents for the winners to give them an extra motivation. It was funny to see them discussing the strategies and how the invaders reacted to their techniques. Some students even managed to surpass the scores we had achieved during the tests. Unfortunately we didn't have a system to record the matches to study the different strategies they developed. After the session, I can say that we were very happy with the final result as we felt that all the work we put into our idea finally paid of. Some students even asked us the URL to keep playing in their houses and show the game to their families.


## Unexpectedly becoming "mainstream"

One year after this event, while I was on GitHub, I decided to have a look at the game's repository traffic. I was shocked when I observed an unexpected amount of traffic coming from YouTube as we didn't post any video. To my surprise, when I've checked the URL I discovered a 30 min video made by **Siraj Raval** about our game with around 20,000 visits. We didn't expect this at all. In this video, Siraj explains really well and step by step, all the mechanics and the python code we developed, so I recommend you to watch it if you want to learn how we developed it. However, there was 0 mention to the authors, nor the research center (CiTIUS) in which we were working and for which we made this game, so if you watch the video you can have the feeling that it was actually made by him. Here is the video:

<div class="row justify-content-center">
    <div class="col-md-8 my-3 d-flex justify-content-center">
        <div style="position: relative; width: 100%; height: 0; padding-top: 56.25%;">
            <iframe src="https://www.youtube.com/embed/rGWBo0JGf50" title="Siraj Raval explaining the game"
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>
        </div>
    </div>
</div>

We were a little bit pissed off by the fact that he didn't clearly show the authorship and didn't even linked our original GitHub repository (he forked it and changed the README). Anyway, for me the most important thing is that the game ended up being something interesting for a bigger audience and that's what matters in the end.

If you follow the news in the Artificial Intelligence and Machine Learning community, chances are that you probably heard before about Siraj Raval. He began to become famous for the speed at which he was releasing tutorial videos about AI & Machine Learning, using these types of unethical actions to inflate his reputation, making it appear that he was the genius behind all those projects. The issue became problematic after he allegedly partly plagiarized a research paper (The Neural Qubit paper case) and after the fiasco of his machine learning course, which ended up with many people demanding their money back. I personally believe that if he had simply limited himself to doing tutorials, giving credit to the original authors of the works, he could have gone far anyway without all this controversy.

After all this controversy blew up, he did a video apologizing for his unethical actuation, and where he quickly mentions all the original creators of the repositories he used. Here is the video:

<div class="row justify-content-center">
    <div class="col-md-8 my-3 d-flex justify-content-center">
        <div style="position: relative; width: 100%; height: 0; padding-top: 56.25%;">
            <iframe src="https://www.youtube.com/embed/1zZZjaYl4AA" title="Siraj Raval explaining the game"
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>
        </div>
    </div>
</div>

We were a little bit pissed off by the fact that he didn't clearly show the authorship and didn't even linked our original GitHub repository (he forked it and changed the README). Anyway, for me the most important thing is that the game ended up being something interesting for a bigger audience and that's what matters in the end.

Judging by the comments and votes of the video, many people are still angry at him and not at all convinced by his apology. Personally, I think he did a lot of things wrong and this was a small attempt to fix this, though perhaps not the best way. I hope he had at least learned one lesson from all this.

I didn't follow closely this case so I don't know what happened with the ML course. I don't know if all the people claiming for their money back managed to recover it, but I hope they did.

## Final words

I decided to write this post because it was an interesting and fulfilling experience with a funny unexpected twist. I'd just like to finish up this post with some conclusions from all of this:

1. **Participate and promote this kind of activities in research**. I truly believe they are interesting not only for kids but also for researchers. It makes you think about your research or about a specific topic in different ways and is a good opportunity to develop your communication skills. Kids are the best audience for this: they're tougher, more critical and more honest than adults. In addition, these types of activities can have an impact on their future career decisions. 

2. **Share your code**, even if you think that it's not good enough or nobody is going to care. Sharing with people is kind and beautiful, so if you don't have any valid reason for not releasing your code, just do it. You never know if your work can inspire or help others. And please don't be ashamed about the quality of your code, be happy for being accomplished something you wanted to do. You should be proud of yourself!

3. **Be honest and don't pretend to be something that you are not**. Even if you don't care about being an honest person, in the long term this kind of practices don't pay off, as you saw in the Siraj case. Always give proper recognition to other's people work.

Finally, I would like to thank my old research center where we did this experience ([CiTIUS](https://citius.usc.es/), University of Santiago de Compostela) for promoting this kind of activities, as well as their researchers who spend their time explaining year after year what they do to the general public with those events. I think that as researchers paid by public fundings, we are also morally obliged to explain to the society what we do and the importance of doing it. It's easier said than done though, and I haven't even participated in many events other than this one, but I will try to force myself in the future to divulge more (I hope!).

Thanks for reading!



