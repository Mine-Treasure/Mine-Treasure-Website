# Modifying treasure chances

You might want to use non-standard treasure rates in your world, this wiki article explains how to do this.

## Finding your rate

On our [loot page](/loot) we have a small little chance calculator (see picture below). You can enter output values in there which will change the chances for each block. Every tier can be configured. The higher the output value, the lower the chance will become. 

![output values](/images/wiki/output-values.png)

## Changing the rate in-game

To modify the treasure rate in-game, you can use the following command: ```/scoreboard players set in mt.[tier here]_chance [output value]``` 

So for example I want to change the output value of the legendary chance from the default 51200 to 100000, I would execute the following command: ```/scoreboard players set in mt.legendary_chance 100000```