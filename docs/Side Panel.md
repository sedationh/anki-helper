## 目的

从 AI 那边解析出的 AI 喂给 Anki 做卡片可以，但是可读性较差，诉求是在 喂给 AI 前自己先要编辑一下



1）增加可读性

2）提供友好的编辑能力



Chrome 提供的  Side Panel 做这个感觉比较好



目前的结构是

```json
[
  {
    "highlight": "voltage",
    "context": "transforming from low energy to high voltage, ready to plug in. And I think it's kind of unfair or erroneous to expect people to operate on high voltage anyway.",
    "explanation": "Electrical potential or pressure expressed in volts.",
    "examples": [
      "The power line carries a very high voltage.",
      "Be careful when working with electrical circuits, as high voltage can be dangerous.",
      "The device requires a low voltage power supply."
    ],
    "pronunciation": "ˈvoʊltɪdʒ",
    "link": null
  },
  {
    "highlight": "plug in",
    "context": "transforming from low energy to high voltage, ready to plug in.",
    "explanation": "To connect an electrical device to a power source by inserting its plug into a socket.",
    "examples": [
      "Don't forget to plug in your phone to charge it overnight.",
      "Once you plug in the lamp, you can turn it on.",
      "The instructions say to plug the appliance in before use."
    ],
    "pronunciation": "plʌɡ ɪn",
    "link": null
  },
  {
    "highlight": "creatine",
    "context": "And creatine is a popular fitness supplement, Coming up, creatine has long been marketed as a gem essential. For years, creatine, also known as Ji-Suan in Chinese, what exactly is creatine and what does it do? creatine is a natural source of energy and it helps your muscles flex or contract. You get creatine from your body. Then your body produces the other half naturally in your liver and your kidneys and your pancreas and they deliver about 95% of the creatine to your muscles to use during physical activity. So the idea behind creatine is that it helps regenerate the primary energy source for your muscle contractions. They say creatine may enhance athletic performance. There's also some evidence that creatine supplements can help with protein shakes, There's a lot in the research field that says that creatine may help support all of these things. So the question of creatine's effectiveness for athletes or gym goers, The reason for that is because people respond differently to creatine supplementation, like muscle fiber or, you know, your initial creatine levels, it's really hard for them to lock down whether creatine is really beneficial for people or not. they saw no additional benefit from creatine at the dosage they were taking, we've shown that taking five grams of creatine supplement per day does not make any difference to the amount of lean muscle mass people put on while resistance training. It would be really interesting to see if creatine has more of a long-term benefit. And the conclusion here is that perhaps we should temper our expectations for what creatine can do for you.",
    "explanation": "A natural substance found in muscle tissue that helps provide energy for muscle contraction. It is also sold as a dietary supplement.",
    "examples": [
      "Many athletes take creatine supplements to improve their performance.",
      "The study investigated the effects of creatine on muscle growth.",
      "Your body naturally produces creatine."
    ],
    "pronunciation": "ˈkriːətiːn",
    "link": null
  },
  {
    "highlight": "pumping up",
    "context": "What if the only thing is pumping up is the supplement industry's profits?",
    "explanation": "Increasing or inflating something, often used figuratively to mean increasing enthusiasm or profits.",
    "examples": [
      "The coach was trying to pump up the team before the big game.",
      "The company's marketing campaign is aimed at pumping up sales.",
      "He spent hours pumping up his bicycle tires."
    ],
    "pronunciation": "ˈpʌmpɪŋ ʌp",
    "link": null
  },
  {
    "highlight": "in sight",
    "context": "Ever feel like your energy bar is stuck at 3% with no charger in sight?",
    "explanation": "Able to be seen.",
    "examples": [
      "The finish line was finally in sight after miles of running.",
      "There was no sign of land in sight.",
      "Help was in sight when the rescue helicopter appeared."
    ],
    "pronunciation": "ɪn saɪt",
    "link": null
  },
  {
    "highlight": "dubbed",
    "context": "A growing group of young people, dubbed the low-energy tribe,",
    "explanation": "Given a nickname or descriptive name.",
    "examples": [
      "The media dubbed the new technology a game-changer.",
      "She was dubbed the 'Queen of Pop' early in her career.",
      "The small town is often dubbed 'Little Italy'."
    ],
    "pronunciation": "dʌbd",
    "link": null
  },
  {
    "highlight": "tribe",
    "context": "A growing group of young people, dubbed the low-energy tribe,",
    "explanation": "A group of people connected by social, economic, religious, or familial ties, often living in a particular territory and sharing a common culture.",
    "examples": [
      "The anthropologist studied the customs of a remote tribe.",
      "Figuratively, 'the low-energy tribe' refers to a group of people sharing a common characteristic.",
      "Different tribes within the region have unique traditions."
    ],
    "pronunciation": "traɪb",
    "link": null
  },
  {
    "highlight": "sluggish",
    "context": "is talking openly about feeling sluggish, drained, and exhausted,",
    "explanation": "Moving or reacting with less than normal speed or energy.",
    "examples": [
      "I felt really sluggish after a big meal.",
      "The economy has been sluggish in recent months.",
      "A heavy fog made the traffic sluggish."
    ],
    "pronunciation": "ˈslʌɡɪʃ",
    "link": null
  }
]
```

