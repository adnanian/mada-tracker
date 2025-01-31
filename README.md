# Mada Tracker

|                                          |                                              |
|:----------------------------------------:|:--------------------------------------------:|
|                  Author                  |                 Adnan Wazwaz                 |
|                  Version                 |                     1.0.3                    |
|               Original Date              |                2025 January 24               |
|           Current Version Date           |                2025 January 31               |
|             Adnanian App No.             |                      20                      |
| [**Demo**](https://youtu.be/7qPgenp53Is) | [**Live**](https://mada-tracker.vercel.app/) |

## Table of Contents

1. [Overview](#overview)
2. [Design](#design)
3. [How to Use](#how-to-use)
4. [Technologies](#technologies)
5. [Limitations](#limitations)
6. [Future Plans](#future-plans)
7. [Credits](#credits)

## Overview

Mada Tracker is part of a larger project that I have been working on since
2023 Novemeber 21, which is to create the best board/card game I can possibly
make, then publish it and sell it. On 2024 January 7, I created Mada, a math-based
strategy card game that has inspirations from Uno and 4-card Golf.

I will not go into the detail of how to play the game here, but I will give a
synopsyis. In Mada, each player has a personal number, called a position which
must stay within a universal range. The objective is to eliminate other players
from the game by moving their position outside the range, using the four
elemntary arithmetic operations. Mada can be played in several different
ways. Contact me if you would like to learn more.

As for the application itself, Mada requires a way to keep track of the range
and players' positions, as they are constantly changing. When I first started
testing, I kept track using pen and paper. However, this grew to be tedious
very fast due to having to rely on multiple physical tools at once, slowing
down gameplay in the process. I briefly tried a whiteboard, which I've had
a similar problem. I decided to create a simple application to act both as
a calculator and a score keeper. This app, Mada Tracker tracks everything:
the players' positions, their scores, the range, etc.

## Design

I started creating the application the day before the Protospiel Bloomington
2025 convention. But before I could create the application, I needed to visualize
what I was creating.

Unlike my previous wireframes, this time I used Figma. I learned the basics
of Figma, but I'm most certainly not an expert UX/UI designer as you can see
here:

![Mada Wireframe](/public/README_files/wireframe-v1.png)

By the early hours of the first day of the convention, I was able produce and deploy
an MVP. I was able to incrementally improve it when I wasn't testing the game.
What also helped was the fact that at that time, my MVP did not require a database.
More on that in the *Future Plans* section.

As for my app logo, I simply used the third draft of my number deck face-down
template:

![Mada Wireframe](/public/README_files/Mada_Neutral_Face_Down_Template.png)

## How to Use

If you've never heard of my game, let alone played it, then using this app
will be more difficult. However, if you are familiar with the game and understand
the rules, then it's worth continuing reading this section:

1. Start by using the slider to adjust the number of players in the game. If
playing in teams, then you would be adjusting the number of teams. Remember that:

    - There must be an even number of players between 4 and 8.

    - Each team must have an equal number of players.

    - There can be no more than four teams.

    ![Using the Slider](/public/README_files/mt-using-slider.png)

2. Next, use the top right toggle to choose whether you want to play
**Elimination Mode** or **Competition Mode**.

    ![Using the Mode Toggle](/public/README_files/mt-mode-toggle.png)

3. Click on the **New Players** button to enter the names of all the players or
teams. Then click start game.

    ![Using Name Form](/public/README_files/mt-name-form.png)

4. During a players turn, to change a player's position (or team's position),
click on the card representing that player. A calulator dialog will be displayed
for you to use to calculate the new position.

    ![Selecting Player](/public/README_files/mt-select-player.png)

    - Clicking the **Done** button on the top of the calculator dialog will
    close the dialog and deselect the player, allowing you to select other
    players.

5. The turn player must click on the done button, once finishing.

    ![End Turn](/public/README_files/mt-end-turn.png)

    - Note: do not confuse this **Done** button with that on the calculator
    dialog.

6. At the end of the game, if your party would like to continue playing, click
on the **Reset** button located under the range, to reset the game.

    ![Reset Example](/public/README_files/mt-reset.png)

Other things to note:

- In competition mode, scoring will be handled almost automatically. The only
manual task needed is for the user to enter the number of points earned based
on the rules outlined in Mada as of 2025 January 31.

- If you are subtracting from your own score, still enter the number of points.
Specifying the negative isn't required for the user as the program will handle
score calculation accordingly.

- If you want to hide some of the components, toggle the **Controls Shown** switch
off to hide the slider and some of the other components used to initalize
game settings.

- In competition mode, the left number (on desktop, top on mobile) is the position.
The right number (on desktop, bottom on mobile) is the score.

## Technologies

As of now, Mada Tracker is a purely frontend web application, created using
the following tech stack:

- JavaScript
- React 18
- Vite
- Material UI 6

## Limitations

Although using MUI allowed me to easily style my app for both desktop and mobile, there is still scrolling required for mobile view. It shouldn't be too inconvenient.

A lot of loops required for updating player information, making updates a little slow.

## Future Plans

As I continue to test and improve Mada, I want to see this application go in the
direction of becoming a full stack web and mobile app, where it would have the
following features:

- A unique code on the website where people can use their mobile devices to join.

- A database to link parties and players together and to track game play progress
more efficiently, improving performance and space.

- Have a dark mode.

- Have an Arabic translation of the app as the cards on Mada are bilingual.

## Credits

MIT License

Copyright (c) 2025 Adnan Wazwaz

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
