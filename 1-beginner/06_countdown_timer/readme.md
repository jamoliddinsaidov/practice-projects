# Countdown Timer

We all have important events we look forward to in life, birthdays, anniversaries, and holidays to name a few. Wouldn't it be nice to have an app that counts down the months, days, hours, minutes, and seconds to an event? Countdown Timer is just that app!

The objective of Countdown Timer is to provide a continuously decrementing display of the months, days, hours, minutes, and seconds to a user entered event. Demo can be found [here](https://jamoliddinsaidov.github.io/practice-projects/1-beginner/06_countdown_timer/index.html).

## Preview

![Input Example](./images/demo.png 'Preview')

## User Stories

- [x] User can see an event input box containing an event name field, an date field, an optional time, and a 'Start' button.
- [x] User can define the event by entering its name, the date it is scheduled to take place, and an optional time of the event. If the time is omitted it is assumed to be at Midnight on the event date in the local time zone.
- [x] User can see a warning message if the event name is blank.
- [x] User can see a warning message if the event date or time are incorrectly entered.
- [x] User can see a warning message if the time until the event data and time that has been entered would overflow the precision of the countdown timer.
- [x] User can click on the 'Start' button to see the countdown timer start displaying the days, hours, minutes, and seconds until the event takes place.
- [x] User can see the elements in the countdown timer automatically decrement. For example, when the remaining seconds count reaches 0 the remaining minutes count will decrement by 1 and the seconds will start to countdown from 59. This progression must take place from seconds all the way up to the remaining days position in countdown display.
