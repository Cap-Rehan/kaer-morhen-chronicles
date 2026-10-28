/*
 * THE WITCHER — THE CHRONICLES BEFORE THE WILD HUNT
 * Story content. Edit this file to change the text; app.js only renders it.
 *
 * Event `kind` values drive the visual treatment:
 *   main      – mandatory plot event
 *   choice    – a player decision (with `options`)
 *   optional  – side story / optional content
 *   shared    – Witcher 2 event that happens on both routes
 *   iorveth   – Witcher 2 Iorveth-route exclusive
 *   roche     – Witcher 2 Roche-route exclusive
 *   ending    – endgame outcome
 *
 * Optional event fields: kicker, people[], matters, next, details (expandable),
 * note (accuracy/uncertainty annotation), options[{label, result}], figure.
 */

window.CHRONICLE = {
  chronicles: [
    /* ════════════════════════════════════════════════════════════
       CHRONICLE I — THE WITCHER (2007)
       ════════════════════════════════════════════════════════════ */
    {
      id: "chronicle-1",
      numeral: "I",
      game: "w1",
      title: "The Witcher",
      year: "2007",
      tagline: "The Return of the White Wolf",
      intro:
        "Geralt of Rivia returns from the dead with no memory of who he is. Over five chapters and an epilogue he chases the thieves who robbed his home, and in doing so walks into the plague-stricken capital of Temeria, a city torn between a militant knightly order, elven guerrillas and a criminal syndicate. The trail ends with a man who believes the world itself is about to freeze.",
      chapters: [
        {
          id: "w1-prologue",
          label: "Prologue",
          title: "The Attack on Kaer Morhen",
          place: "Kaer Morhen, the Witchers' fortress",
          art: "fortress",
          previously:
            "Before the game: in the novels, Geralt was believed to have died during a pogrom in the town of Rivia. The games pick up years later, with no explanation of where he has been.",
          events: [
            {
              id: "w1-return",
              kind: "main",
              kicker: "Prologue · The mountain pass",
              title: "The White Wolf comes home",
              people: ["vesemir", "triss", "geralt"],
              body: [
                "Witchers of the School of the Wolf find Geralt unconscious near Kaer Morhen, their ancient keep in the mountains. He had been missing for years and was widely believed dead. He wakes alive, but with almost no memory of his past.",
                "At the fortress are the old master Vesemir, the witchers Eskel and Lambert, a young trainee named Leo, and the sorceress Triss Merigold, an old friend of Geralt's who begins looking for a way to restore his memory."
              ],
              matters:
                "Geralt's amnesia is the thread that runs through both games. He has to relearn the world, its politics and his own relationships, exactly as a new player does.",
              next: "Almost immediately, the fortress comes under attack."
            },
            {
              id: "w1-attack",
              pivotal: true, art: "fortress fire", fallen: ["Leo", "Savolla"], gist: "Salamandra, a criminal gang led by the mage Azar Javed and a killer called the Professor, raids Kaer Morhen and escapes with the witchers' mutagens and the secret of how witchers are made. The young witcher Leo is killed.",
              kind: "main",
              kicker: "Prologue · The same day",
              title: "Salamandra storms the keep",
              people: ["azar", "professor", "vesemir", "triss"],
              body: [
                "A band of armed men attacks Kaer Morhen. They are led by Azar Javed, a renegade mage, and a brutal killer known only as the Professor. A second mage, Savolla, and a summoned monster called a frightener keep the defenders busy.",
                "The witchers and Triss kill the frightener and Savolla, but the raid was a distraction. Azar and the Professor break into the keep's laboratory and escape with the School of the Wolf's mutagens and its formulae: the secret of how witchers are made.",
                "Leo confronts the Professor and is killed. The attackers belong to a criminal organisation called Salamandra."
              ],
              matters:
                "Whoever controls the witcher mutations could, in principle, create mutants on demand. This theft drives the whole plot of the first game.",
              next: "The surviving witchers decide to split up and hunt the thieves."
            },
            {
              id: "w1-scatter",
              kind: "main",
              kicker: "Prologue · Aftermath",
              title: "The witchers scatter",
              people: ["geralt", "vesemir"],
              body: [
                "With Leo buried and the secrets gone, the witchers go their separate ways to track Salamandra. Geralt's trail leads south into the kingdom of Temeria, towards its capital, Vizima."
              ],
              next: "Geralt arrives outside a city in quarantine."
            }
          ]
        },
        {
          id: "w1-ch1",
          label: "Chapter I",
          title: "The Outskirts of Vizima",
          place: "The villages outside Vizima",
          art: "village",
          previously:
            "Salamandra has stolen the witcher mutagens from Kaer Morhen and killed Leo. Geralt is tracking them towards Vizima.",
          events: [
            {
              id: "w1-outskirts",
              kind: "main",
              kicker: "Chapter I · Arrival",
              title: "A city behind closed gates",
              people: ["alvin"],
              body: [
                "Vizima is sealed off by a plague quarantine, so Geralt is stuck in the villages outside its walls. On his first night at the local inn, spectral hounds called barghests attack. A boy named Alvin is caught up in the attack and barely survives.",
                "Alvin has strange visions and talks about a coming age of ice. He matters far more than he appears to."
              ],
              matters:
                "Alvin is introduced quietly here, but he becomes the centre of the first game's biggest revelation.",
              next: "The villagers want someone to blame for the hounds."
            },
            {
              id: "w1-beast",
              gist: "A hellhound terrorises the village and the locals blame Abigail, a witch. Geralt learns the Beast is born of the villagers' own crimes, and that some of them secretly serve Salamandra. He must decide whether to protect Abigail from the mob.",
              kind: "main",
              kicker: "Chapter I · The village",
              title: "Abigail and the Beast",
              people: ["abigail"],
              body: [
                "The barghests are led by a larger creature the villagers call the Beast, a hellhound. The locals, egged on by the village Reverend, blame Abigail, a witch and herbalist who lives on the edge of the village and whom many of them quietly rely on.",
                "Geralt's investigation shows the Beast is not Abigail's doing. It is a supernatural manifestation of the villagers' own crimes and hypocrisy. Some of the most respectable people in the village also turn out to be working with Salamandra; the Reverend had sold Alvin to Salamandra, and Geralt finds the boy among children held in Salamandra's cave.",
                "The chapter ends with an angry mob at Abigail's door and a confrontation with the Beast itself."
              ],
              options: [
                { label: "Protect Abigail", result: "Geralt stands with her against the mob; she survives and helps him fight the Beast." },
                { label: "Hand her to the mob", result: "Geralt leaves her to the villagers, and she dies." }
              ],
              matters:
                "This is the game's first moral test, and it sets the tone: there is rarely a clean, good option, and the 'monsters' are often human.",
              next: "Geralt finally gets into Vizima, and is promptly thrown in jail."
            }
          ]
        },
        {
          id: "w1-ch2",
          label: "Chapter II",
          title: "Vizima and Its Factions",
          place: "Vizima: the Temple Quarter",
          art: "city",
          previously:
            "Geralt has fought his way through the Outskirts, found Salamandra agents among the villagers and met Alvin, a boy with prophetic visions.",
          events: [
            {
              id: "w1-city",
              kind: "main",
              kicker: "Chapter II · The Temple Quarter",
              title: "Inside the plague city",
              people: ["siegfried", "shani", "vincent"],
              body: [
                "Geralt enters Vizima and lands in a cell. He wins his release by taking a contract on a monster in the sewers, where he meets Siegfried, a knight of the Order of the Flaming Rose.",
                "The Temple Quarter is poor, diseased and tense. Humans resent the nonhumans (elves and dwarves) who live there, and both distrust the city guard."
              ],
              next: "To find Salamandra, Geralt has to understand who runs the city."
            },
            {
              id: "w1-factions",
              gist: "Three powers grip Vizima: the knights of the Order of the Flaming Rose, the elven guerrillas of the Scoia'tael, and Salamandra working beneath them both.",
              kind: "main",
              kicker: "Chapter II · The powers of Vizima",
              title: "The Order, the Scoia'tael and Salamandra",
              figure: "w1-factions",
              people: ["jacques", "siegfried", "yaevinn"],
              body: [
                "The Order of the Flaming Rose is a knightly order that has made itself Vizima's protector. Its Grand Master, Jacques de Aldersberg, is respected and powerful. Some of its knights are honourable; many are bigots who see nonhumans as vermin.",
                "The Scoia'tael are elven and dwarven guerrillas, here led by the elf Yaevinn. They fight what they see as human oppression, and are willing to kill to do it.",
                "Salamandra sits underneath both: a criminal syndicate with money, mercenaries and friends in high places. Its real patron is not yet known."
              ],
              matters:
                "The conflict between humans and nonhumans is the main background tension of both games. Geralt is a mutant, an outsider to both sides, and the game keeps asking whether he will pick one.",
              next: "Geralt teams up with a detective to unmask Salamandra's local leaders."
            },
            {
              id: "w1-investigation",
              pivotal: true, art: "tower lake", fallen: ["Raymond Maarloeve, the real detective"], gist: "Geralt hunts Salamandra's backers with the detective Raymond Maarloeve, until he learns 'Raymond' is Azar Javed in disguise. The real detective is dead, and a showdown at a tower in the swamp nearly kills Geralt.",
              kind: "main",
              kicker: "Chapter II · The investigation",
              title: "The false detective",
              people: ["azar", "professor", "vincent"],
              body: [
                "Geralt works with a detective, Raymond Maarloeve, to identify Salamandra's backers. Suspects include the guard captain Vincent Meis, the merchant Kalkstein, the spy Thaler and several others; the player decides which leads to follow and whom to accuse.",
                "The twist: the Raymond helping Geralt is Azar Javed using an illusion. The real detective had already been murdered; Geralt finds his body in a crypt.",
                "Geralt confronts Azar at a mage's tower in the swamp. Azar and the Professor overpower him, and Triss gets the wounded witcher back to the city."
              ],
              matters:
                "Salamandra is not a gang of thugs. It is organised, well informed and led by a mage who can wear another man's face.",
              next: "The trail leads into the wealthier Trade Quarter, and towards the royal palace."
            },
            {
              id: "w1-choice-sides",
              kind: "choice",
              kicker: "Chapter II · A first allegiance",
              title: "Siegfried or Yaevinn",
              people: ["siegfried", "yaevinn"],
              body: [
                "Geralt is drawn into the conflict between the Order and the Scoia'tael and can help Siegfried, help Yaevinn, or keep out of it. This is the first of several such decisions. Together they set Geralt's final allegiance in Chapter V: the Order, the Scoia'tael, or neutrality."
              ],
              options: [
                { label: "Order", result: "Siegfried becomes Geralt's ally." },
                { label: "Scoia'tael", result: "Yaevinn and the elves become Geralt's allies." },
                { label: "Neutral", result: "Geralt stays out of it and later fights his way through with Triss's help." }
              ]
            }
          ]
        },
        {
          id: "w1-ch3",
          label: "Chapter III",
          title: "Salamandra's Conspiracy",
          place: "Vizima: the Trade Quarter",
          art: "palace",
          previously:
            "Azar Javed tricked Geralt by posing as a detective. Geralt barely survived an ambush by Azar and the Professor.",
          events: [
            {
              id: "w1-adda",
              kind: "main",
              kicker: "Chapter III · A reception",
              title: "Fisstech and royal blood",
              people: ["dandelion", "adda", "triss"],
              body: [
                "At a reception in the Trade Quarter Geralt reunites with his friend, the bard Dandelion, and meets Princess Adda, King Foltest's daughter. Years before the games, Adda was born cursed as a striga, a murderous monster; Geralt lifted the curse.",
                "Geralt learns that Salamandra is funded by fisstech, a narcotic it sells across the city, and begins dismantling the trade."
              ],
              next: "Meanwhile, Alvin's powers are becoming impossible to ignore."
            },
            {
              id: "w1-alvin",
              kind: "choice",
              kicker: "Chapter III · The Source",
              title: "Who raises Alvin?",
              people: ["alvin", "triss", "shani"],
              body: [
                "Triss identifies Alvin as a Source, a person with innate and uncontrolled magical power. Geralt gives him a dimeritium amulet to dampen his abilities.",
                "Both Triss and Shani, a field medic Geralt befriended in the Temple Quarter, offer to look after the boy. Geralt must choose."
              ],
              options: [
                { label: "Triss", result: "Alvin lives with Triss; Geralt's romance with her deepens." },
                { label: "Shani", result: "Alvin lives with Shani; Geralt's romance with her deepens." }
              ],
              matters:
                "The choice shapes Geralt's personal life for the rest of the game. Geralt's answers to Alvin's questions also shape the boy's outlook, which matters later.",
              next: "Geralt goes after Salamandra's hidden base."
            },
            {
              id: "w1-professor",
              fallen: ["The Professor"],
              kind: "main",
              kicker: "Chapter III · Underground",
              title: "The Professor falls",
              people: ["professor", "azar", "adda"],
              body: [
                "Triss teleports Geralt into Salamandra's hideout. He chases the Professor, Leo's killer, through the caves beneath it; both fall into the lair of a kikimore queen, which devours the Professor. Azar Javed escapes again.",
                "Papers on the Professor's remains point to who is really behind Salamandra. When Geralt emerges, Princess Adda and her guards are waiting for him. Triss teleports him away just in time, and he lands far from the city."
              ],
              matters:
                "Salamandra reaches into the royal family. Its patron must be someone with very high standing.",
              next: "Geralt wakes in a lakeside village called Murky Waters."
            }
          ]
        },
        {
          id: "w1-ch4",
          label: "Chapter IV",
          title: "Murky Waters",
          place: "A lakeside village outside the capital",
          art: "lake",
          previously:
            "The Professor is dead. Adda's men tried to trap Geralt, and a portal from Triss threw him out of Vizima. Azar Javed is still free.",
          events: [
            {
              id: "w1-lake",
              kind: "main",
              kicker: "Chapter IV · The village",
              title: "Pastoral, but not peaceful",
              people: ["dandelion", "alvin"],
              body: [
                "Murky Waters looks idyllic, but the villagers and the vodyanoi, an underwater fish-folk, are close to war. Dandelion and Alvin turn up too.",
                "Geralt untangles a local tragedy in which a murder has turned two sisters into wraiths, and meets the Lady of the Lake, who asks him to end the violence. He defeats Dagon, a creature exploiting the hatred between the two peoples."
              ],
              matters:
                "A smaller story that mirrors the main one: prejudice is being exploited by someone who profits from it."
            },
            {
              id: "w1-berengar",
              kind: "choice",
              kicker: "Chapter IV · An old brother",
              title: "Berengar",
              people: ["berengar"],
              body: [
                "Geralt finds Berengar, a fellow witcher of the School of the Wolf who had walked away from Kaer Morhen and become entangled with Salamandra."
              ],
              options: [
                { label: "Forgive him", result: "Berengar can return to help Geralt against Azar Javed." },
                { label: "Fight him", result: "Berengar dies." }
              ]
            },
            {
              id: "w1-alvin-vanishes",
              kind: "main",
              kicker: "Chapter IV · The end of the chapter",
              title: "Alvin disappears",
              people: ["alvin", "siegfried", "yaevinn"],
              body: [
                "Fighting breaks out between the Order and the Scoia'tael, and Geralt again has to choose a side or stay out of it. In the chaos, Alvin's power slips out of control and he vanishes through time and space."
              ],
              matters: "Remember Alvin and his amulet. They come back in the epilogue.",
              next: "Geralt returns to a capital in flames."
            }
          ]
        },
        {
          id: "w1-ch5",
          label: "Chapter V",
          title: "Old Vizima Burns",
          place: "Old Vizima and its swamp",
          art: "fire",
          previously:
            "Alvin is gone. Order and Scoia'tael are openly at war. Azar Javed is still at large, and Salamandra's true patron is still hidden.",
          events: [
            {
              id: "w1-foltest",
              kind: "main",
              kicker: "Chapter V · Rebellion",
              title: "The king returns",
              people: ["foltest", "adda"],
              body: [
                "Vizima is in open revolt as the Order and the Scoia'tael fight in the streets. King Foltest of Temeria returns to his capital.",
                "Princess Adda has relapsed into a striga. Foltest allows Geralt to kill her but would prefer she be cured."
              ],
              options: [
                { label: "Kill Adda", result: "The striga, and the princess, die." },
                { label: "Lift the curse", result: "Geralt breaks the curse and Adda is restored to human form." }
              ]
            },
            {
              id: "w1-azar",
              fallen: ["Azar Javed"],
              kind: "main",
              kicker: "Chapter V · The swamp cemetery",
              title: "Azar Javed's end",
              people: ["azar", "jacques"],
              body: [
                "Geralt tracks Azar Javed to Salamandra's last stronghold, an old manor beyond the swamp cemetery, and kills him in his laboratory (with Berengar's help if he was spared).",
                "In the laboratory, a magic mirror shows Jacques de Aldersberg, Grand Master of the Order of the Flaming Rose, trying to contact Azar: proof that Azar answered to him."
              ],
              matters:
                "Salamandra was never independent. The Order that claimed to protect Vizima was funding the gang that robbed Kaer Morhen.",
              next: "Foltest commissions Geralt to deal with the Grand Master."
            },
            {
              id: "w1-allegiance",
              kind: "choice",
              kicker: "Chapter V · Final allegiance",
              title: "Order, elves, or neither",
              people: ["siegfried", "yaevinn", "triss"],
              body: [
                "Geralt's earlier decisions settle into one of three paths, which decide who stands with him at the end. The destination of the main plot is the same whichever path he takes."
              ],
              options: [
                { label: "Order path", result: "Siegfried fights at Geralt's side." },
                { label: "Scoia'tael path", result: "Yaevinn fights at Geralt's side." },
                { label: "Neutral path", result: "Geralt rejects both armies, with Triss's support." }
              ]
            }
          ]
        },
        {
          id: "w1-epilogue",
          label: "Epilogue",
          title: "The Grand Master's Plan",
          place: "Vizima, and a frozen vision",
          art: "frost",
          previously:
            "Azar Javed is dead. Evidence names Jacques de Aldersberg as the man behind Salamandra, and Foltest wants him stopped.",
          events: [
            {
              id: "w1-jacques",
              gist: "Jacques, Grand Master of the Order and Salamandra's secret master, has foreseen the White Frost destroying humanity. He meant to use the witcher mutations to breed a stronger human race that could survive it.",
              kind: "main",
              kicker: "Epilogue · The Grand Master",
              title: "Jacques de Aldersberg",
              people: ["jacques"],
              body: [
                "Jacques launches a rebellion and Geralt fights his way to him. Jacques traps Geralt in a vision of a frozen future and explains himself.",
                "As a Source, Jacques has foreseen the extinction of humanity in the White Frost, an age of ice. He believes ordinary humans cannot survive it. His solution was to use the stolen witcher mutations to breed a stronger, mutated humanity, and Salamandra was his instrument."
              ],
              matters:
                "Jacques is not a cartoon villain. He sincerely believes he is saving the species. The White Frost is a recurring idea in the Witcher world and is mentioned again in later games.",
              note:
                "The White Frost is presented through Jacques's prophecy. Whether his apocalyptic vision is accurate is left open by the first game."
            },
            {
              id: "w1-wild-hunt",
              pivotal: true, art: "hunt hunt", fallen: ["Jacques de Aldersberg"],
              kind: "choice",
              kicker: "Epilogue · An apparition",
              title: "The King of the Wild Hunt",
              people: ["jacques"],
              body: [
                "Geralt defeats Jacques. The King of the Wild Hunt, a spectral rider who has haunted Geralt's dreams throughout the game, appears, asks for Jacques's soul and warns Geralt of a coming conflict."
              ],
              options: [
                { label: "Let him take it", result: "The King of the Wild Hunt claims Jacques's soul." },
                { label: "Refuse him", result: "Geralt refuses, and has to fight the apparition." }
              ],
              matters: "This is the first concrete sign that Geralt's lost past is tied to the Wild Hunt."
            },
            {
              id: "w1-alvin-reveal",
              pivotal: true, art: "frost frost",
              kind: "main",
              kicker: "Epilogue · Revelation",
              title: "The boy and the Grand Master",
              people: ["alvin", "jacques"],
              body: [
                "On Jacques's body Geralt finds an aged dimeritium amulet, identical to the one he gave Alvin. The implication is that Jacques de Aldersberg was Alvin, thrown back in time by his own power, who grew up to become the Grand Master."
              ],
              note:
                "The game establishes this through the amulet and Jacques's own words rather than an explicit statement. It is the accepted reading, but it is a revelation by implication.",
              matters:
                "The villain was the child Geralt protected. The way Geralt answered Alvin's questions in Chapter III is reflected in Jacques's views."
            },
            {
              id: "w1-assassin",
              fallen: ["The masked assassin"],
              kind: "main",
              kicker: "Epilogue · The final scene",
              title: "An assassin in Vizima",
              people: ["foltest"],
              body: [
                "Geralt reports to Foltest. During a procession in the city, a masked assassin strikes at the king. Geralt kills him and sees the attacker had a witcher's mutated cat's eyes.",
                "Geralt becomes the king's protector, and that is where The Witcher 2 begins."
              ],
              note:
                "The assassin is never named in the first game. The Witcher 2 reveals that a small band of witchers is murdering kings, which places this attack in a new light.",
              next: "Chronicle II: the kingslayers try again."
            }
          ]
        }
      ]
    },

    /* ════════════════════════════════════════════════════════════
       CHRONICLE II — THE WITCHER 2 (2011)
       ════════════════════════════════════════════════════════════ */
    {
      id: "chronicle-2",
      numeral: "II",
      game: "w2",
      title: "The Witcher 2: Assassins of Kings",
      year: "2011",
      tagline: "A Continent Without Its Kings",
      intro:
        "Geralt is now King Foltest's bodyguard, and he fails. Framed for the murder of his employer, he hunts the true kingslayer, a witcher like himself, across a North sliding into chaos. In the first chapter he must choose between two men, and the game splits into two different second chapters before coming back together at a summit where the fate of the Northern Kingdoms is decided.",
      branchMap: true,
      chapters: [
        {
          id: "w2-prologue",
          label: "Prologue",
          title: "The Assassination of King Foltest",
          place: "La Valette Castle, Temeria",
          art: "siege",
          previously:
            "At the end of the first game Geralt saved Foltest from a witcher assassin. He has been at the king's side ever since. Separately, King Demavend of Aedirn has been murdered by an unknown killer.",
          events: [
            {
              id: "w2-siege",
              kind: "main",
              kicker: "Prologue · The siege",
              title: "A king besieging his own nobles",
              people: ["foltest", "roche", "triss", "geralt"],
              body: [
                "Foltest is besieging La Valette Castle, home of Baroness Maria Louisa La Valette, his former mistress. She is holding his two illegitimate children, Anaïs and Boussy, and Foltest means to take them back; the siege is part of a wider revolt by Temerian nobles.",
                "Geralt fights at Foltest's side, with Vernon Roche, commander of the Blue Stripes, Temeria's special forces, and Triss Merigold, now Geralt's lover. During the battle a dragon appears over the field."
              ],
              options: [
                { label: "Aryan La Valette", result: "Geralt can kill the baroness's son or persuade him to surrender." }
              ],
              matters:
                "Foltest's children are his heirs. Whoever controls them later controls the question of who rules Temeria."
            },
            {
              id: "w2-murder",
              pivotal: true, art: "palace siege", fallen: ["King Foltest of Temeria"], gist: "Inside the captured castle a disguised witcher kills Foltest. Geralt sees the killer escape, is found with the body, and is arrested as the murderer.",
              kind: "main",
              kicker: "Prologue · Inside the castle",
              title: "The kingslayer strikes",
              people: ["foltest", "letho"],
              body: [
                "Inside the captured castle, a man disguised as a monk gets close to Foltest and kills him. Geralt chases the assassin and sees enough to know he is a witcher, but the killer escapes.",
                "Geralt is found with the dead king and arrested as the murderer."
              ],
              matters:
                "Temeria, the most powerful of the Northern Kingdoms, now has no adult heir and no king. Two of the North's monarchs have now been killed by the same kind of killer.",
              next: "Geralt is thrown into a dungeon to be interrogated."
            },
            {
              id: "w2-roche",
              gist: "Vernon Roche interrogates Geralt, comes to believe he is innocent, and helps him escape with Triss to hunt the real killer.",
              kind: "main",
              kicker: "Prologue · The dungeon",
              title: "Vernon Roche's gamble",
              people: ["roche", "triss"],
              body: [
                "Roche interrogates Geralt. The prologue is told in flashbacks as Geralt explains what happened. Roche comes to believe that he is innocent.",
                "Roche helps Geralt escape and goes with him and Triss after the real assassin, whose trail leads to Flotsam, a frontier town on the Pontar river."
              ],
              matters:
                "Roche is loyal to Temeria, not to Geralt. He wants Foltest's killer, and he thinks the witcher is his best chance of finding him."
            }
          ]
        },
        {
          id: "w2-ch1",
          label: "Chapter I",
          title: "Flotsam",
          place: "A trading post on the Pontar",
          art: "forest",
          previously:
            "Foltest is dead. Geralt, framed for the murder, has escaped with Roche and Triss and is following the kingslayer's trail.",
          events: [
            {
              id: "w2-flotsam",
              gist: "Flotsam is a lawless frontier town run by a corrupt commander, with Iorveth's elven rebels in the forest around it. Geralt arrives just in time to save Dandelion and Zoltan from the gallows.",
              kind: "shared",
              kicker: "Chapter I · Arrival",
              title: "A town on the edge",
              people: ["iorveth", "dandelion", "zoltan"],
              body: [
                "Before they even reach Flotsam, Geralt's group is ambushed by Iorveth, the one-eyed commander of a Scoia'tael band operating in the surrounding forest. Iorveth believes a witcher is working with his rebels.",
                "Flotsam is run by the corrupt Temerian commander Bernard Loredo and is full of tension between humans and nonhumans. Geralt arrives in time to save Dandelion and Zoltan Chivay, his dwarven friend, from being hanged."
              ]
            },
            {
              id: "w2-kayran",
              kind: "shared",
              kicker: "Chapter I · The river",
              title: "The kayran",
              people: ["sile"],
              body: [
                "A kayran, an enormous river monster, has choked off Flotsam's trade. Geralt kills it with the help of the sorceress Síle de Tansarville, who has her own reasons for being in Flotsam."
              ],
              note: "Síle's interest in the kingslayer becomes clear only at Loc Muinne."
            },
            {
              id: "w2-loredo",
              kind: "shared",
              kicker: "Chapter I · Treason",
              title: "Loredo's bargain",
              people: ["henselt"],
              body: [
                "Geralt learns that Loredo intends to sell Flotsam to King Henselt of Kaedwen, a neighbouring king eager to profit from Temeria's leaderless state.",
                "He also learns the kingslayer's name: Letho, a witcher."
              ],
              matters:
                "With Foltest dead, the other kings are already circling Temeria's territory."
            },
            {
              id: "w2-letho-meet",
              gist: "Geralt corners Letho, a witcher of the School of the Viper and the killer of King Demavend. Letho beats Geralt but spares him, saying it repays an old debt.",
              kind: "shared",
              kicker: "Chapter I · The elven ruins",
              title: "Face to face with Letho",
              people: ["letho", "iorveth", "roche", "triss"],
              body: [
                "Geralt confronts Letho, a huge witcher of the School of the Viper. Letho had won Iorveth's trust by presenting him with the head of King Demavend of Aedirn, but he means to betray the elves.",
                "Letho beats Geralt in a duel but does not kill him: Geralt once saved his life, and now they are even."
              ],
              matters:
                "The kingslayer is real, he killed Demavend as well as Foltest, and he knows Geralt from the years Geralt cannot remember."
            },
            {
              id: "w2-choice",
              kind: "choice",
              kicker: "Chapter I · The decisive choice",
              title: "Iorveth or Roche",
              people: ["iorveth", "roche"],
              big: true,
              body: [
                "Flotsam comes to a head. Geralt must side either with Iorveth's elves or with Roche and Temeria. This single decision determines which of two entirely different second chapters he will play. The two Chapter IIs have different locations, quests and characters.",
                "As the chapter ends, Letho uses Síle's megascope to teleport to Aedirn, taking Triss with him."
              ],
              options: [
                { label: "Side with Iorveth", result: "Geralt sails to Vergen in Upper Aedirn to help the rebels resisting Kaedwen.", href: "#w2-ch2-iorveth" },
                { label: "Side with Roche", result: "Roche's men deal with Loredo, and Geralt joins King Henselt's camp besieging Vergen.", href: "#w2-ch2-roche" }
              ]
            }
          ]
        },
        {
          id: "w2-ch2-iorveth",
          label: "Chapter II · Iorveth",
          title: "The Iorveth Route: Vergen",
          place: "Vergen, Upper Aedirn",
          art: "mountain",
          route: "iorveth",
          previously:
            "Geralt sided with Iorveth in Flotsam. Letho has taken Triss. Upper Aedirn has had no king since Demavend's murder, and Henselt of Kaedwen is moving to seize it.",
          events: [
            {
              id: "w2-vergen",
              kind: "iorveth",
              kicker: "Iorveth route · Vergen",
              title: "The free town and the Dragonslayer",
              people: ["saskia", "iorveth", "zoltan"],
              body: [
                "Vergen, a dwarven town in the Pontar valley, is the heart of a rebellion. Humans, elves and dwarves are fighting together to keep Upper Aedirn free of Kaedwen. They are led by Saskia, called the Virgin of Aedirn or the Dragonslayer, a charismatic woman who dreams of a land where races live as equals.",
                "When Saskia is poisoned, Geralt prepares the antidote."
              ],
              matters: "Iorveth's route shows the war from the side of the rebels and nonhumans."
            },
            {
              id: "w2-vergen-triss",
              kind: "shared",
              kicker: "Both routes · Chapter II",
              title: "Triss is taken to Loc Muinne",
              people: ["triss"],
              body: [
                "Geralt learns that Triss is now in the hands of Nilfgaardian agents and has been taken to Loc Muinne, an ancient elven city where the kings and mages of the North are about to meet."
              ],
              note: "This development happens on both routes."
            },
            {
              id: "w2-vergen-curse",
              kind: "shared",
              kicker: "Both routes · Chapter II",
              title: "The cursed battlefield",
              body: [
                "An old battlefield near Vergen is haunted by a curse that affects both armies. On both routes Geralt lifts it, from opposite sides of the war."
              ]
            },
            {
              id: "w2-vergen-battle",
              kind: "iorveth",
              kicker: "Iorveth route · The siege",
              title: "Vergen holds",
              people: ["henselt", "saskia"],
              body: [
                "Henselt's army assaults Vergen. The defenders hold and the Kaedweni are beaten back. Henselt survives his defeat."
              ]
            },
            {
              id: "w2-saskia-truth",
              pivotal: true, art: "dragon dragon",
              kind: "iorveth",
              kicker: "Iorveth route · Revelation",
              title: "Saskia's secret",
              people: ["saskia", "philippa"],
              body: [
                "Geralt learns that Saskia is not human. She is a dragon, Saesenthessis, in human form: the same dragon that appeared over La Valette.",
                "She is also under the magical control of the sorceress Philippa Eilhart, Saskia's adviser. Philippa teleports Saskia to Loc Muinne, and Geralt and Iorveth follow."
              ],
              matters:
                "Philippa and the sorceresses behind her want a puppet ruler in the Pontar valley. A free Aedirn led by Saskia would be, in practice, a state controlled by mages."
            }
          ]
        },
        {
          id: "w2-ch2-roche",
          label: "Chapter II · Roche",
          title: "The Roche Route: Henselt's Campaign",
          place: "The Kaedweni camp outside Vergen",
          art: "camp",
          route: "roche",
          previously:
            "Geralt sided with Roche in Flotsam. Letho has taken Triss. Henselt of Kaedwen is besieging Vergen to claim Upper Aedirn.",
          events: [
            {
              id: "w2-loredo-dead",
              fallen: ["Bernard Loredo"],
              kind: "roche",
              kicker: "Roche route · Flotsam",
              title: "Justice for Loredo",
              people: ["roche"],
              body: [
                "Geralt and Roche kill Loredo for treason. They then travel to Aedirn and join King Henselt's army."
              ]
            },
            {
              id: "w2-camp",
              gist: "Inside Henselt's camp, the king's sorcerer Dethmold asks Geralt to root out a conspiracy against Henselt, a plot Roche himself helped to design.",
              kind: "roche",
              kicker: "Roche route · The camp",
              title: "Inside Henselt's camp",
              people: ["henselt", "roche", "dethmold"],
              body: [
                "Henselt wants Upper Aedirn for Kaedwen. His sorcerer Dethmold asks Geralt to investigate a conspiracy against the king among the soldiers.",
                "The plot to weaken Henselt was drawn up while Foltest was still alive, and Roche is one of its architects."
              ],
              matters:
                "This route shows the war from inside a king's camp, and how far Temeria's own agents were prepared to go against a rival king."
            },
            {
              id: "w2-roche-triss",
              kind: "shared",
              kicker: "Both routes · Chapter II",
              title: "Triss is taken to Loc Muinne",
              people: ["triss"],
              body: [
                "Triss is taken by a Nilfgaardian delegation to Loc Muinne, where the kings and mages of the North are gathering."
              ],
              note: "This development happens on both routes."
            },
            {
              id: "w2-roche-curse",
              kind: "shared",
              kicker: "Both routes · Chapter II",
              title: "The cursed battlefield",
              body: [
                "Geralt lifts the curse on the old battlefield that is blocking the assault on Vergen. It is the same curse Iorveth's route deals with, approached from the other side."
              ]
            },
            {
              id: "w2-blue-stripes",
              fallen: ["Most of the Blue Stripes"],
              kind: "roche",
              kicker: "Roche route · Betrayal",
              title: "The Blue Stripes are slaughtered",
              people: ["henselt", "roche"],
              body: [
                "Henselt discovers the conspiracy and, on Dethmold's advice, has Roche's men, the Blue Stripes, hanged in Roche's absence. Only Ves survives. Roche takes revenge on Dethmold."
              ]
            },
            {
              id: "w2-henselt-choice",
              kind: "choice",
              kicker: "Roche route · The assault on Vergen",
              title: "Henselt's fate",
              people: ["henselt", "roche"],
              body: [
                "During Henselt's attack on Vergen, Roche confronts the king and demands his death in revenge for his men."
              ],
              options: [
                { label: "Let Roche kill Henselt", result: "Henselt dies and Kaedwen loses its king." },
                { label: "Persuade Roche to spare him", result: "Geralt argues that killing Henselt would only help the kingslayers, and Henselt lives." }
              ],
              matters:
                "Either way, a third Northern king is now in a weakened position, which is exactly what the kingslayers' employer wants."
            }
          ]
        },
        {
          id: "w2-ch3",
          label: "Chapter III",
          title: "Loc Muinne",
          place: "An ancient elven city, the summit",
          art: "ruins",
          previously:
            "On either route Triss is held at Loc Muinne, Saskia is under Philippa's control and Letho is heading there. Iorveth's route has kept Vergen free; Roche's route has seen the Blue Stripes destroyed and Henselt killed or spared.",
          events: [
            {
              id: "w2-summit",
              gist: "The kings and mages of the North meet at Loc Muinne to decide the fate of leaderless Temeria and Aedirn, while Philippa and Síle scheme to seize power.",
              kind: "shared",
              kicker: "Chapter III · Why here?",
              title: "The summit of kings and mages",
              people: ["philippa", "sile", "radovid"],
              body: [
                "Both routes converge at Loc Muinne. The mages of the North are meeting to restore the Conclave, a governing body for magic, and the surviving kings are attending. Among them is Radovid of Redania, along with an envoy from the Nilfgaardian Empire to the south.",
                "On the table is the future of the North: what happens to leaderless Temeria and Aedirn, and how far the kings will trust mages after two royal murders. Philippa and Síle intend to use the summit, and the dragon Saskia, to seize power."
              ]
            },
            {
              id: "w2-rescue-choice",
              kind: "choice",
              kicker: "Chapter III · A rescue",
              title: "Whom does Geralt save?",
              people: ["triss", "philippa", "anais"],
              body: [
                "Geralt can rescue only one person. The alternatives depend on his route."
              ],
              options: [
                { label: "Iorveth route: Triss", result: "Triss is freed and can expose the Lodge at the summit." },
                { label: "Iorveth route: Philippa", result: "Philippa has been blinded on Radovid's orders and imprisoned. Geralt helps her escape; she leads him to a magic dagger that can break her spell on Saskia, then slips away." },
                { label: "Roche route: Triss", result: "Triss is freed and can expose the Lodge at the summit." },
                { label: "Roche route: Anaïs", result: "Geralt rescues Foltest's kidnapped daughter Anaïs, Temeria's heir, and later decides whether she goes to King Radovid or to the Temerian nobleman John Natalis." }
              ],
              matters:
                "Every option costs something. On Roche's route the choice is Temeria's future against Geralt's lover."
            },
            {
              id: "w2-lodge-exposed",
              kind: "shared",
              kicker: "Chapter III · The revelation",
              title: "The Lodge of Sorceresses",
              figure: "w2-conspiracy",
              people: ["philippa", "sile", "letho"],
              body: [
                "The truth comes out. Nilfgaard's envoy accuses Philippa Eilhart and other sorceresses of conspiring to kill the kings of the North. A secret society, the Lodge of Sorceresses, with Philippa and Síle de Tansarville at its centre, had been plotting to put rulers of their choosing on the thrones of the North. Síle herself had hired Letho to kill Demavend.",
                "The kings now have proof that mages were involved in the murder of kings."
              ],
              matters:
                "The exposure of the Lodge turns the kings, and the common people, against mages in general. What follows depends partly on whether Triss is there to argue for the mages."
            },
            {
              id: "w2-sile",
              kind: "choice",
              kicker: "Chapter III · The megascope",
              title: "Síle's escape",
              people: ["sile"],
              body: [
                "Síle tries to flee through her megascope, a magical communication and teleportation device. Letho has sabotaged it, and she is trapped."
              ],
              options: [
                { label: "Save her", result: "Síle survives." },
                { label: "Leave her", result: "Síle is torn apart." }
              ]
            },
            {
              id: "w2-dragon",
              kind: "choice",
              kicker: "Chapter III · The dragon",
              title: "Saskia attacks",
              people: ["saskia", "philippa"],
              body: [
                "In dragon form, and under Philippa's spell, Saskia attacks the summit. Geralt fights her."
              ],
              options: [
                { label: "Kill her", result: "The dragon dies." },
                { label: "Spare her", result: "Saskia lives." },
                { label: "Break the spell", result: "Only possible on the Iorveth route, with the dagger obtained after Philippa's escape." }
              ]
            }
          ]
        },
        {
          id: "w2-letho",
          label: "Revelation",
          title: "The Truth About Letho",
          place: "Loc Muinne, after the battle",
          art: "viper",
          previously:
            "The Lodge has been exposed. Saskia is dead, spared or freed. Letho is waiting for Geralt.",
          events: [
            {
              id: "w2-letho-past",
              pivotal: true, art: "hunt hunt", gist: "Letho fills in Geralt's lost years: Geralt once saved his life, then traded himself to the Wild Hunt to free Yennefer, the woman he loved. Letho took Yennefer into his care.",
              kind: "shared",
              kicker: "Epilogue · Letho's story",
              title: "A debt from the lost years",
              people: ["letho", "yennefer", "geralt"],
              body: [
                "Letho tells Geralt what he cannot remember. During the years Geralt lost, he saved Letho's life. The Viper witchers then helped Geralt track the Wild Hunt, which had taken Yennefer of Vengerberg, the sorceress Geralt loved.",
                "Geralt traded himself to the Hunt to free Yennefer. The Hunt took him; Letho and his companions took Yennefer into their care. Later Nilfgaard captured Letho's band, Yennefer included."
              ],
              matters:
                "This explains Geralt's missing years. His amnesia comes from his time with the Wild Hunt, and Yennefer, the most important person in his life, is still out there."
            },
            {
              id: "w2-letho-emhyr",
              gist: "Letho's true master was Emperor Emhyr of Nilfgaard, who promised to restore the Viper school if Letho killed the North's kings. The Lodge believed it was using Letho, but every murder served Nilfgaard.",
              kind: "shared",
              kicker: "Epilogue · The employer",
              title: "Nilfgaard's design",
              people: ["letho", "emhyr", "sile"],
              body: [
                "After their capture by Nilfgaard, Letho and his fellow Vipers, Serrit and Auckes among them, were offered a deal by Emperor Emhyr var Emreis: destabilise the North by killing its kings, and the Empire would restore their ruined school.",
                "Síle, for the Lodge, separately hired Letho to kill Demavend, whose death opened Aedirn to a mage-backed state. Letho let the Lodge believe he was theirs. In fact every murder served Emhyr: kingless realms, rival kings grabbing land, and in the end sorceresses blamed for regicide and turned on by the North. Framing Geralt was part of covering the trail."
              ],
              matters:
                "Letho is not a fanatic. He wanted his school, and his kind, to survive. The people who used him wanted an empire.",
              note:
                "Letho's account is the main source for this backstory, and it is given in his own words. Serrit and Auckes also make an attempt on King Henselt's life."
            }
          ]
        },
        {
          id: "w2-ending",
          label: "The Ending",
          title: "The North Divided",
          place: "Loc Muinne, and the roads south",
          art: "road",
          previously:
            "Geralt knows the whole truth: the Lodge's ambition, Nilfgaard's design and his own past with Letho and Yennefer.",
          events: [
            {
              id: "w2-letho-fate",
              kind: "ending",
              kicker: "Ending · The last decision",
              title: "The fate of the kingslayer",
              people: ["letho"],
              body: [
                "Geralt can let Letho go or fight him to the death. Either way, the man who killed two kings is no longer Geralt's quarry."
              ],
              options: [
                { label: "Spare Letho", result: "Letho says he must disappear and leaves." },
                { label: "Kill Letho", result: "The kingslayer dies at Loc Muinne." }
              ]
            },
            {
              id: "w2-outcomes",
              kind: "ending",
              kicker: "Ending · States of the world",
              title: "How the choices reshape the North",
              figure: "w2-outcomes",
              body: [
                "The developers described the game as having 16 possible 'states of the world'. The table below shows the main decisions and what changes."
              ],
              note: "The 'Mages' row (Conclave restored or a pogrom) follows published plot summaries such as Wikipedia's; we could not confirm its exact in-game presentation."
            },
            {
              id: "w2-invasion",
              pivotal: true, art: "army army", gist: "Geralt heads south, determined to find Yennefer, as Nilfgaard's army marches into a divided, leaderless North.",
              kind: "main",
              kicker: "Ending · After the credits",
              title: "Nilfgaard crosses the river",
              people: ["emhyr"],
              body: [
                "Geralt sets off south with Triss, and with Iorveth or Roche depending on his route, now remembering Yennefer and determined to find her.",
                "In the final scene, Nilfgaard's army marches north into a divided, leaderless and mage-hating North. On every route the invasion follows."
              ],
              matters: "This is the state of the world in which The Witcher 3 begins."
            }
          ]
        }
      ]
    }
  ],

  /* Branching map nodes (link targets must exist as element ids). */
  branchMap: {
    nodes: [
      { id: "n-foltest", label: "Foltest's Assassination", sub: "Prologue", kind: "shared", href: "#w2-prologue", x: 300, y: 40 },
      { id: "n-flotsam", label: "Flotsam", sub: "Chapter I", kind: "shared", href: "#w2-ch1", x: 300, y: 130 },
      { id: "n-choice", label: "Geralt's Choice", sub: "Iorveth or Roche", kind: "choice", href: "#w2-choice", x: 300, y: 220 },
      { id: "n-iorveth", label: "Iorveth", sub: "Scoia'tael", kind: "iorveth", href: "#w2-ch2-iorveth", x: 140, y: 310 },
      { id: "n-roche", label: "Roche", sub: "Blue Stripes", kind: "roche", href: "#w2-ch2-roche", x: 460, y: 310 },
      { id: "n-vergen", label: "Vergen", sub: "Chapter II", kind: "iorveth", href: "#w2-vergen", x: 140, y: 400 },
      { id: "n-henselt", label: "Henselt's Campaign", sub: "Chapter II", kind: "roche", href: "#w2-camp", x: 460, y: 400 },
      { id: "n-loc", label: "Loc Muinne", sub: "Chapter III", kind: "shared", href: "#w2-ch3", x: 300, y: 490 },
      { id: "n-end", label: "Endgame Choices", sub: "Letho · Síle · Saskia", kind: "ending", href: "#w2-letho", x: 300, y: 580 },
      { id: "n-out", label: "Political Outcomes", sub: "States of the world", kind: "ending", href: "#w2-outcomes", x: 300, y: 670 }
    ],
    edges: [
      ["n-foltest", "n-flotsam"], ["n-flotsam", "n-choice"],
      ["n-choice", "n-iorveth"], ["n-choice", "n-roche"],
      ["n-iorveth", "n-vergen"], ["n-roche", "n-henselt"],
      ["n-vergen", "n-loc"], ["n-henselt", "n-loc"],
      ["n-loc", "n-end"], ["n-end", "n-out"]
    ]
  },

  /* Ending decision table (Witcher 2). */
  outcomes: [
    { decision: "Flotsam: Iorveth or Roche", route: "Both", affects: "Which Chapter II is played; who travels with Geralt at the end; whether Henselt can die (Roche route) or Saskia can be freed (Iorveth route)." },
    { decision: "Henselt", route: "Roche", affects: "Killed by Roche: Kaedwen loses its king. Spared: Henselt remains king." },
    { decision: "Triss / Philippa", route: "Iorveth", affects: "Rescue Triss: she can testify at the summit, but Saskia stays under the spell. Rescue Philippa: Geralt gains the means to break her spell over Saskia." },
    { decision: "Triss / Anaïs", route: "Roche", affects: "Rescue Anaïs: Geralt decides whether Foltest's heir goes to Radovid of Redania or to John Natalis of Temeria. Rescue Triss: she can speak for the mages at the summit." },
    { decision: "Síle", route: "Both", affects: "Saved, or left to die in the sabotaged megascope." },
    { decision: "Saskia", route: "Both", affects: "Killed, spared, or (Iorveth route with Philippa rescued) freed from the spell." },
    { decision: "Mages", route: "Both", affects: "Triss rescued: the Conclave is restored. Not rescued: a pogrom of magic users follows. (As given in published plot summaries.)" },
    { decision: "Letho", route: "Both", affects: "Spared: he vanishes. Killed: he dies at Loc Muinne." }
  ],

  /* Schematic map of the North (coordinates in a 800×500 frame; approximate). */
  places: [
    { name: "Kaer Morhen", game: "w1", x: 565, y: 105, href: "#w1-prologue", note: "Witchers' keep, Kaedwen" },
    { name: "Vizima", game: "w1", x: 215, y: 330, href: "#w1-ch2", note: "Capital of Temeria" },
    { name: "Murky Waters", game: "w1", x: 160, y: 380, href: "#w1-ch4", note: "Village near Vizima" },
    { name: "La Valette Castle", game: "w2", x: 300, y: 285, href: "#w2-prologue", note: "Temerian rebel barony" },
    { name: "Flotsam", game: "w2", x: 405, y: 232, label: "above", href: "#w2-ch1", note: "Trading post on the Pontar" },
    { name: "Vergen", game: "w2", x: 545, y: 262, label: "below", href: "#w2-ch2-iorveth", note: "Dwarven town, Upper Aedirn" },
    { name: "Loc Muinne", game: "w2", x: 670, y: 250, label: "above", href: "#w2-ch3", note: "Ancient elven city" }
  ],
  regions: [
    { name: "Redania", x: 190, y: 130 },
    { name: "Kaedwen", x: 600, y: 60 },
    { name: "Temeria", x: 120, y: 290 },
    { name: "Aedirn", x: 620, y: 360 },
    { name: "Nilfgaard", x: 400, y: 470, danger: true }
  ],

  /* How the two Chapter IIs relate. */
  routeCompare: {
    shared: [
      "Triss is carried off to Loc Muinne by Nilfgaardian agents",
      "Geralt lifts the curse on the old battlefield near Vergen",
      "Henselt's army assaults Vergen",
      "The sorceresses' hand is revealed: Philippa, Síle and their allies",
      "Both routes end at the summit in Loc Muinne"
    ],
    iorveth: [
      "Seen from inside Vergen, among rebels and nonhumans",
      "Saskia's antidote, and the truth that she is a dragon",
      "Vergen holds; Henselt is defeated but lives",
      "At Loc Muinne: rescue Triss or Philippa (who can free Saskia)"
    ],
    roche: [
      "Seen from inside Henselt's camp, among Kaedweni soldiers",
      "Loredo killed; Roche's own conspiracy against Henselt is uncovered",
      "The Blue Stripes executed by Henselt; Henselt's life in Roche's hands",
      "At Loc Muinne: rescue Triss or Anaïs, Foltest's heir"
    ]
  },

  /* ════════════════════════════════════════════════════════════
     CHARACTERS
     ════════════════════════════════════════════════════════════ */
  characters: [
    {
      id: "geralt", img: "img/geralt.webp", name: "Geralt of Rivia", title: "The White Wolf",
      affiliation: ["witchers"], games: ["w1", "w2"],
      role: "A witcher, a mutated monster-hunter, who returns from apparent death with amnesia and is pulled into the politics of the North.",
      relations: "Old friend and lover of Triss; Vesemir's pupil; friend of Dandelion and Zoltan; Yennefer's lost love.",
      events: "Hunts Salamandra (W1); framed for Foltest's murder and hunts Letho (W2).",
      endW1: "Saves Foltest from an assassin and becomes his protector.",
      endW2: "Remembers Yennefer and his years with the Wild Hunt; heads south to find her."
    },
    {
      id: "triss", img: "img/triss.webp", name: "Triss Merigold", title: "Sorceress of Maribor",
      affiliation: ["mages", "temeria"], games: ["w1", "w2"],
      role: "Sorceress and Geralt's closest ally in both games, adviser to Temeria.",
      relations: "Geralt's lover (W2; a possible romance in W1). Friend of Yennefer in the novels.",
      events: "Helps restore Geralt's memory; may care for Alvin (W1). Kidnapped by Letho, then held by Nilfgaard (W2).",
      endW1: "At Geralt's side.",
      endW2: "Rescued at Loc Muinne or freed later; leaves with Geralt."
    },
    {
      id: "vesemir", img: "img/vesemir.webp", name: "Vesemir", title: "Master of Kaer Morhen",
      affiliation: ["witchers"], games: ["w1"],
      role: "The oldest witcher of the School of the Wolf and Geralt's mentor.",
      relations: "Father figure to Geralt, Eskel and Lambert.",
      events: "Finds Geralt and defends Kaer Morhen against Salamandra.",
      endW1: "Alive; the witchers scatter to hunt Salamandra.",
      endW2: "Does not appear."
    },
    {
      id: "foltest", img: "img/foltest.webp", name: "King Foltest", title: "King of Temeria",
      affiliation: ["temeria"], games: ["w1", "w2"],
      role: "The powerful, proud king of Temeria, the strongest Northern kingdom.",
      relations: "Father of Adda and of Anaïs and Boussy; Geralt's employer.",
      events: "Returns to a burning Vizima; survives a witcher assassin (W1). Murdered by Letho at La Valette (W2).",
      endW1: "Alive, protected by Geralt.",
      endW2: "Dead; Temeria is left without a king."
    },
    {
      id: "roche", img: "img/roche.webp", name: "Vernon Roche", title: "Commander of the Blue Stripes",
      affiliation: ["temeria"], games: ["w2"],
      role: "Head of Temeria's special forces, utterly loyal to Foltest and to Temeria.",
      relations: "Sworn enemy of Iorveth; uneasy ally of Geralt.",
      events: "Helps Geralt escape; on his route, sees the Blue Stripes hanged by Henselt.",
      endW1: "—",
      endW2: "Survives; leaves with Geralt if his route was chosen."
    },
    {
      id: "iorveth", img: "img/iorveth.webp", name: "Iorveth", title: "Scoia'tael commander",
      affiliation: ["scoiatael"], games: ["w2"],
      role: "A one-eyed elven guerrilla leader fighting human rule in the Pontar valley.",
      relations: "Roche's sworn enemy; ally of Saskia; once trusted Letho.",
      events: "Fights for Vergen on his route; follows Saskia to Loc Muinne.",
      endW1: "—",
      endW2: "Survives; leaves with Geralt if his route was chosen."
    },
    {
      id: "letho", img: "img/letho.webp", name: "Letho of Gulet", title: "The Kingslayer",
      affiliation: ["vipers", "nilfgaard"], games: ["w2"],
      role: "A witcher of the School of the Viper who murders Demavend and Foltest.",
      relations: "Owes Geralt his life; took Yennefer into his care; used by the Lodge, employed by Emhyr.",
      events: "Spares Geralt and kidnaps Triss in Flotsam; reveals Nilfgaard's plan at Loc Muinne.",
      endW1: "—",
      endW2: "Spared or killed by Geralt (player choice)."
    },
    {
      id: "henselt", img: "img/henselt.webp", name: "King Henselt", title: "King of Kaedwen",
      affiliation: ["kaedwen"], games: ["w2"],
      role: "A ruthless king who tries to annex Upper Aedirn after Demavend's murder.",
      relations: "Enemy of Saskia and Vergen; executes Roche's Blue Stripes.",
      events: "Defeated at Vergen (Iorveth route) or survives/dies by Roche's hand (Roche route).",
      endW1: "—",
      endW2: "Alive, unless killed by Roche on his route."
    },
    {
      id: "saskia", img: "img/saskia.webp", name: "Saskia", title: "The Dragonslayer / Saesenthessis",
      affiliation: ["aedirn", "lodge"], games: ["w2"],
      role: "Leader of the Vergen rebellion. Secretly a dragon in human form, controlled by Philippa.",
      relations: "Iorveth's ally; Philippa's puppet.",
      events: "Defends Vergen; attacks Loc Muinne in dragon form.",
      endW1: "—",
      endW2: "Killed, spared, or freed from Philippa's spell."
    },
    {
      id: "philippa", img: "img/philippa.webp", name: "Philippa Eilhart", title: "Sorceress, Lodge leader",
      affiliation: ["lodge", "mages"], games: ["w2"],
      role: "The most politically powerful sorceress in the North and a leader of the Lodge.",
      relations: "Controls Saskia; works with Síle and Dethmold.",
      events: "Exposed at Loc Muinne; blinded and imprisoned on Radovid's orders.",
      endW1: "—",
      endW2: "Survives; exposed and discredited."
    },
    {
      id: "dandelion", img: "img/dandelion.webp", name: "Dandelion", title: "Bard and chronicler",
      affiliation: ["friends"], games: ["w1", "w2"],
      role: "Geralt's oldest friend, a poet and incurable womaniser. He narrates The Witcher 2's journal.",
      relations: "Geralt's companion; Zoltan's drinking partner.",
      events: "Helps in Vizima and Murky Waters (W1); nearly hanged in Flotsam (W2).",
      endW1: "Alive.",
      endW2: "Alive."
    },
    {
      id: "zoltan", img: "img/zoltan.webp", name: "Zoltan Chivay", title: "Dwarven warrior",
      affiliation: ["friends"], games: ["w1", "w2"],
      role: "A loyal, hard-drinking dwarf and old friend of Geralt's.",
      relations: "Geralt's friend; Dandelion's companion.",
      events: "Appears in Vizima (W1); rescued from the gallows in Flotsam (W2).",
      endW1: "Alive.",
      endW2: "Alive."
    },
    {
      id: "jacques", img: "img/jacques.webp", name: "Jacques de Aldersberg", title: "Grand Master of the Order",
      affiliation: ["order", "salamandra"], games: ["w1"],
      role: "Leader of the Order of the Flaming Rose and secret patron of Salamandra.",
      relations: "Azar Javed's master. Implied to be Alvin, grown up after travelling back in time.",
      events: "Uses stolen witcher secrets to try to create a mutated humanity to survive the White Frost.",
      endW1: "Killed by Geralt.",
      endW2: "—"
    },
    {
      id: "azar", img: "img/azar.webp", name: "Azar Javed", title: "Renegade mage",
      affiliation: ["salamandra"], games: ["w1"],
      role: "A mage and Salamandra's field leader.",
      relations: "Answers to Jacques; works with the Professor.",
      events: "Leads the Kaer Morhen raid; impersonates the detective Raymond Maarloeve.",
      endW1: "Killed by Geralt in his laboratory beyond the swamp cemetery (Chapter V).",
      endW2: "—"
    },
    {
      id: "professor", name: "The Professor", title: "Salamandra enforcer",
      affiliation: ["salamandra"], games: ["w1"],
      role: "A sadistic killer and Azar's partner.",
      relations: "Azar Javed's partner; Leo's killer.",
      events: "Steals the mutagens from Kaer Morhen; ambushes Geralt in the swamp.",
      endW1: "Devoured by a kikimore queen in the caves under Salamandra's hideout (Chapter III).",
      endW2: "—"
    },
    {
      id: "alvin", img: "img/alvin.webp", name: "Alvin", title: "The Source",
      affiliation: ["mages"], games: ["w1"],
      role: "A boy with uncontrolled magical power and visions of the White Frost.",
      relations: "Raised by Triss or Shani (player choice); implied to become Jacques.",
      events: "Kidnapped by Salamandra; vanishes through time in Chapter IV.",
      endW1: "Gone, apparently into the past.",
      endW2: "—"
    },
    {
      id: "yennefer", img: "img/yennefer.webp", name: "Yennefer of Vengerberg", title: "Sorceress",
      affiliation: ["mages"], games: ["w2"],
      role: "The love of Geralt's life in the novels. Absent from both games, but central to Geralt's lost past.",
      relations: "Geralt's beloved; adoptive mother to Ciri in the novels.",
      events: "Freed from the Wild Hunt when Geralt traded himself; later in Letho's care.",
      endW1: "Not mentioned by name.",
      endW2: "Whereabouts unknown to Geralt; he sets out to find her."
    }
  ],

  /* ════════════════════════════════════════════════════════════
     FACTIONS
     ════════════════════════════════════════════════════════════ */
  /* Geralt's companions & kit, shown in the interactive stage. Characters take the same optional `img` field. */
  items: [
    { id: "silver-sword", name: "Silver Sword", title: "For monsters", img: "img/silver-sword.jpg",
      text: "Silver-edged and tempered for monsters: wraiths, vampires, werewolves and other creatures of magical origin. Geralt carries it on his back, over the steel." },
    { id: "steel-sword", name: "Steel Sword", title: "For men and beasts", img: "img/steel-sword.jpg",
      text: "The witcher's steel blade, used against humans, elves, dwarves and ordinary animals. Silver does little against them; steel does the job." },
    { id: "medallion", name: "Wolf Medallion", title: "School of the Wolf", img: "img/medallion.png",
      text: "A wolf's head medallion worn by Geralt. It vibrates near magic and marks him as a witcher of the Wolf School." },
    { id: "roach", name: "Roach", title: "Geralt's horse", img: "img/roach.webp",
      text: "Geralt's loyal chestnut mare, and the name he gives every horse he rides. In the novels she is a constant companion on the Path." }
  ],

  factionFilters: [
    { id: "witchers", label: "Witchers", match: ["witchers", "vipers"] },
    { id: "temeria", label: "Temeria", match: ["temeria"] },
    { id: "scoiatael", label: "Scoia'tael", match: ["scoiatael"] },
    { id: "lodge", label: "Lodge & Mages", match: ["lodge", "mages"] },
    { id: "order", label: "Order & Salamandra", match: ["order", "salamandra"] },
    { id: "kings", label: "Kaedwen, Aedirn & Nilfgaard", match: ["kaedwen", "aedirn", "nilfgaard"] },
    { id: "friends", label: "Friends", match: ["friends"] }
  ],
  factions: [
    {
      id: "f-wolf", name: "The School of the Wolf", seal: "wolf", games: ["w1", "w2"],
      goal: "Survive. A dying brotherhood of witchers based at Kaer Morhen, trained to kill monsters for coin.",
      relations: "Victims of Salamandra's raid. Geralt, Vesemir, Eskel and Lambert belong to it."
    },
    {
      id: "f-order", name: "The Order of the Flaming Rose", seal: "rose", games: ["w1"],
      goal: "Publicly, protect Vizima and humanity. Secretly, under Jacques, prepare humanity for the White Frost by any means.",
      relations: "At war with the Scoia'tael; secretly funds Salamandra."
    },
    {
      id: "f-scoiatael", name: "The Scoia'tael", seal: "squirrel", games: ["w1", "w2"],
      goal: "Elven and dwarven guerrillas fighting human rule and persecution.",
      relations: "Yaevinn's band in Vizima (W1); Iorveth's band in the Pontar valley (W2). Enemies of the Order and the Blue Stripes."
    },
    {
      id: "f-temeria", name: "Temeria", seal: "lily", games: ["w1", "w2"],
      goal: "The richest and strongest Northern kingdom under Foltest. After his murder, simply to survive.",
      relations: "Its land is eyed by Kaedwen and Redania; Roche and the Blue Stripes fight to preserve it."
    },
    {
      id: "f-kaedwen", name: "Kaedwen", seal: "unicorn", games: ["w2"],
      goal: "Under Henselt, expand into the Pontar valley and Upper Aedirn.",
      relations: "Besieges Vergen; enemy of Saskia and the Scoia'tael."
    },
    {
      id: "f-aedirn", name: "Aedirn", seal: "tower", games: ["w2"],
      goal: "Without King Demavend it has no ruler. Upper Aedirn fights for independence under Saskia.",
      relations: "Coveted by Kaedwen; a target for the Lodge's plans."
    },
    {
      id: "f-lodge", name: "The Lodge of Sorceresses", seal: "eye", games: ["w2"],
      goal: "A secret society of sorceresses seeking to control the North through chosen rulers.",
      relations: "Philippa and Síle at its core; used Letho; exposed at Loc Muinne."
    },
    {
      id: "f-nilfgaard", name: "Nilfgaard", seal: "sun", games: ["w2"],
      goal: "The southern empire under Emperor Emhyr var Emreis, intent on conquering the North.",
      relations: "Letho's true employer; invades at the end of The Witcher 2."
    },
    {
      id: "f-salamandra", name: "Salamandra", seal: "salamander", games: ["w1"],
      goal: "A criminal syndicate trading in fisstech and running Jacques's experiments.",
      relations: "Led by Azar Javed and the Professor; answers to Jacques de Aldersberg."
    }
  ],

  /* Secondary names referenced in events (not full index entries). */
  minorPeople: {
    abigail: "Abigail",
    siegfried: "Siegfried",
    yaevinn: "Yaevinn",
    shani: "Shani",
    vincent: "Vincent Meis",
    adda: "Princess Adda",
    berengar: "Berengar",
    sile: "Síle de Tansarville",
    dethmold: "Dethmold",
    radovid: "King Radovid",
    anais: "Anaïs La Valette",
    emhyr: "Emperor Emhyr"
  },

  /* ════════════════════════════════════════════════════════════
     AFTERWORD
     ════════════════════════════════════════════════════════════ */
  aftermath: {
    fixed: [
      { title: "Geralt remembers", text: "Geralt's memories have largely returned. He knows he traded himself to the Wild Hunt to save Yennefer, and that she is somewhere beyond his reach. Finding her is now his purpose." },
      { title: "Two kings are dead", text: "Demavend of Aedirn and Foltest of Temeria have been murdered. Temeria has no king on its throne, and its neighbours are eager to carve it up." },
      { title: "Nilfgaard is coming", text: "Emperor Emhyr's plan worked. A weakened, quarrelling North faces a full Nilfgaardian invasion across the river." },
      { title: "The Lodge is broken", text: "The sorceresses' conspiracy has been exposed. Mages are distrusted across the North, and Radovid of Redania is one of the most powerful kings left standing." },
      { title: "The Wild Hunt is real", text: "The spectral riders from Geralt's dreams are real, and Geralt has history with them." }
    ],
    variable: [
      { title: "Letho", text: "Alive or dead, depending on the final duel." },
      { title: "Henselt", text: "King of Kaedwen, or killed by Roche (Roche route only)." },
      { title: "Saskia", text: "Dead, spared, or freed from Philippa's spell." },
      { title: "Síle", text: "Saved or killed in the megascope." },
      { title: "Anaïs", text: "On the Roche route Geralt can rescue Foltest's heir; otherwise she remains in others' hands." },
      { title: "Roche or Iorveth", text: "Who travelled with Geralt, and what Geralt did for their cause." },
      { title: "Mages", text: "Whether the Conclave was restored or a pogrom of mages followed depends on whether Triss was rescued." }
    ],
    imports:
      "The Witcher 3 can import a Witcher 2 save (PC), or ask the player about key Witcher 2 decisions during an early conversation. These decisions mostly change smaller details and appearances in The Witcher 3; its main story is the same either way. Witcher 1 decisions do not carry over directly.",
    tips: [
      { title: "Geralt's story is personal now", text: "The Witcher 3 is less about kings and more about the people Geralt loves: Yennefer, and Ciri, the girl he raised as a daughter in the novels." },
      { title: "The North is at war", text: "Nilfgaard's invasion is under way. Expect armies, refugees, occupation and suspicion everywhere." },
      { title: "Mages are distrusted", text: "After the Lodge was exposed at Loc Muinne, the kings and the common folk of the North have little reason to trust sorceresses. Expect that suspicion to colour how mages are treated." },
      { title: "Radovid matters", text: "The young king of Redania came out of The Witcher 2 stronger than any of his rivals." },
      { title: "Choices are grey", text: "As in both earlier games, decisions rarely have a clean good option and their consequences often appear much later." },
      { title: "Know who Ciri and Yennefer are", text: "The Witcher 3 leans on Geralt's history with Ciri and Yennefer from the novels. A short summary of the books helps, but the game introduces both characters on its own terms." }
    ]
  }
};
