/* Little Lanterns reading improvements: richer vocabulary, syllables and searchable science library. */
(function () {
  "use strict";
  const initialLessonHash = window.__initialLessonHash || location.hash;

  const extraMeanings = {
    absorb:"To take something in, such as a sponge taking in water or a plant taking in light.",
    adaptation:"A feature or behaviour that helps a living thing survive in its surroundings.",
    atmosphere:"The layer of gases surrounding Earth.",
    bacteria:"Tiny living organisms. Some cause illness, while many are useful.",
    balance:"A state in which different parts are steady or in the right amounts.",
    biodegradable:"Able to break down naturally with the help of living organisms.",
    biodiversity:"The variety of living things in a place or on Earth.",
    carbon:"An element found in all living things and in many materials.",
    climate:"The usual pattern of weather in a place over many years.",
    climatechange:"A long-term change in Earth's temperatures and weather patterns.",
    compost:"Decayed plant and food material that can help soil become healthy.",
    conserve:"To protect something and avoid wasting it.",
    conservation:"The careful protection of nature, wildlife and natural resources.",
    consumer:"A living thing that gets energy by eating plants or other living things.",
    coral:"A tiny sea animal that can build hard structures called reefs.",
    ecosystem:"A community of living things interacting with one another and their surroundings.",
    electricity:"A form of energy that can power lights, machines and devices.",
    energy:"The ability to make things happen or cause change.",
    environment:"The air, water, land, plants, animals and conditions around us.",
    evaporate:"To change from a liquid into a gas.",
    experiment:"A careful test used to investigate a question.",
    extinct:"When no members of a kind of living thing remain alive anywhere.",
    fertiliser:"A substance added to soil to help plants grow.",
    foodchain:"A sequence showing how energy passes from one living thing to another.",
    fossil:"The preserved remains or trace of an ancient living thing.",
    habitat:"The natural home of a plant or animal.",
    herbivore:"An animal that eats plants.",
    insect:"A small animal with six legs and usually three main body sections.",
    insulation:"A material or layer that slows the movement of heat or sound.",
    investigate:"To study something carefully to discover facts.",
    litter:"Rubbish left in a place where it does not belong.",
    mammal:"An animal whose young drink milk from their mother.",
    microorganism:"A living thing so small that it usually needs a microscope to be seen.",
    microscope:"An instrument that makes very small objects look larger.",
    mineral:"A naturally occurring substance found in rocks and in the ground.",
    molecule:"A group of atoms joined together.",
    nature:"The living world and physical features that are not made by people.",
    nutrients:"Substances living things need to grow and stay healthy.",
    organism:"An individual living thing, such as a plant, animal or bacterium.",
    oxygen:"A gas in the air that humans and many other living things need to breathe.",
    photosynthesis:"The process by which green plants use light energy to make food from water and carbon dioxide.",
    pollution:"Harmful substances or waste entering air, water or land.",
    predator:"An animal that hunts and eats another animal.",
    prey:"An animal that is hunted and eaten by another animal.",
    recycle:"To process used materials so they can be made into new products.",
    renewable:"Able to be replaced naturally in a relatively short time.",
    resource:"Something useful that people or living things can use.",
    respiration:"The process in cells that releases energy from food.",
    reuse:"To use something again instead of throwing it away.",
    seedling:"A very young plant that has grown from a seed.",
    species:"A group of similar living things that can reproduce with one another.",
    temperature:"A measure of how hot or cold something is.",
    tissue:"A group of similar cells working together in a living thing.",
    waste:"Something no longer wanted or needed.",
    wildlife:"Animals and plants living in nature, away from being kept as pets or crops.",
    watercycle:"The continuous movement of water between Earth's surface and the atmosphere.",
    weather:"The conditions outside at a particular time, such as rain, wind or sunshine.",
    adaptation:"A feature or behaviour that helps a living thing survive.",
    algae:"Simple organisms, often found in water, that can use light to make food.",
    amphibian:"A cold-blooded animal such as a frog that usually lives part of its life in water.",
    atom:"A tiny basic unit that makes up ordinary matter.",
    cell:"The smallest unit that can carry out the basic activities of life.",
    chlorophyll:"The green substance in plants that absorbs light for photosynthesis.",
    community:"Different populations of living things living in the same area.",
    condensation:"The change of a gas into a liquid, such as water droplets forming on a cold glass.",
    decomposer:"An organism that breaks down dead material and returns nutrients to the environment.",
    drought:"A long period with much less rain than usual.",
    herbivore:"An animal that mainly eats plants.",
    life_cycle:"The stages a living thing passes through as it grows and reproduces.",
    parasite:"An organism that lives on or in another organism and takes resources from it.",
    population:"All the members of one species living in a particular area.",
    producer:"A living thing, such as a green plant, that makes its own food.",
    solar:"Related to the Sun.",
    solar_energy:"Energy from sunlight that can be used to produce heat or electricity.",
    sustainable:"Able to continue over time without using up resources or causing lasting harm.",
    volcano:"An opening in Earth's crust through which hot rock, ash and gases may escape.",
    volcanoes:"Openings in Earth's crust through which hot rock, ash and gases may escape.",
    absorb:"To take in or soak up.",
    across:"From one side to the other.",
    ancient:"Very old; belonging to a time long ago.",
    area:"A particular part or region of a place.",
    branch:"A part that grows out from the trunk of a tree.",
    bright:"Giving out or reflecting a lot of light; clever or lively.",
    change:"To become or make something different.",
    collect:"To bring things together in one place.",
    compare:"To look at two or more things to find what is similar or different.",
    create:"To make something new.",
    danger:"The possibility that someone or something may be harmed.",
    different:"Not the same as another person or thing.",
    discover:"To find or learn something for the first time.",
    distance:"The amount of space between two places or things.",
    earth:"The planet on which we live; also the soil beneath our feet.",
    example:"Something that helps explain a rule or idea.",
    explore:"To look around and learn about a place or subject.",
    explain:"To make an idea clear by giving information.",
    fresh:"New, clean or recently made; not stale.",
    future:"The time that is still to come.",
    healthy:"In a good state of health or working well.",
    increase:"To become or make greater in number, size or amount.",
    measure:"To find the size, amount or length of something.",
    observe:"To watch something carefully in order to learn about it.",
    protect:"To keep someone or something safe from harm.",
    reduce:"To make something smaller or less.",
    result:"The outcome of an action, test or event.",
    science:"The study of the natural world through questions, observations and tests.",
    scientist:"A person who studies the natural world and investigates questions.",
    simple:"Easy to understand or not complicated.",
    surface:"The outside or top layer of something.",
    system:"A group of connected parts that work together.",
    useful:"Helpful or able to be used for a purpose.",
    variety:"A number of different kinds of something.",
    wonder:"A feeling of curiosity or amazement.",
    carefully:"With attention and care.",
    challenge:"A task or problem that takes effort to complete.",
    choice:"An act of selecting between possibilities.",
    community:"People, plants or animals living or working in the same place.",
    healthy:"Well and not ill; working as it should.",
    natural:"Found in nature or not made by people.",
    rubbish:"Things that are thrown away because they are no longer wanted.",
    save:"To keep something safe or prevent it from being lost or wasted.",
    share:"To use or enjoy something with another person, or give part to them.",
    soil:"The upper layer of earth where many plants grow.",
    tap:"A device that controls the flow of water from a pipe.",
    tree:"A tall plant with a woody trunk, branches and leaves.",
    water:"A clear liquid that living things need to survive.",
    world:"The Earth and all the people and living things on it.",
    young:"Having lived or existed for only a short time.",

    tiny:"Very small.",
    rested:"Stayed still or relaxed for a while.",
    cloud:"A mass of tiny water droplets or ice crystals floating in the sky.",
    mountain:"A very high natural area of land, higher than a hill.",
    rain:"Water that falls from clouds in drops.",
    began:"Started; the past form of begin.",
    landed:"Came down onto the ground or another surface.",
    stream:"A small, flowing body of water.",
    travelled:"Moved from one place to another.",
    wide:"Measuring a large distance from side to side.",
    later:"After some time; not now.",
    warmed:"Made or became warmer.",
    invisible:"Unable to be seen with the eyes.",
    gas:"A state of matter that spreads out to fill the space around it.",
    vapour:"A gas formed when a liquid changes into a gas.",
    rose:"Moved upwards; the past form of rise.",
    cooler:"At a lower temperature; less warm.",
    formed:"Took shape or was made.",
    droplets:"Very small drops of liquid.",
    joined:"Came together or connected.",
    heavy:"Having a lot of weight.",
    snow:"Soft white ice crystals that fall from clouds in cold weather.",
    repeating:"Happening again and again.",
    precious:"Very valuable or important and deserving care.",
    avoid:"To keep away from something or stop it from happening.",
    wasting:"Using more of something than needed or using it carelessly.",
    forest:"A large area covered mainly with trees and other plants.",
    trees:"Tall plants with woody trunks, branches and leaves.",
    birds:"Animals with feathers, wings and beaks.",
    fungi:"Living things such as mushrooms and moulds; they are not plants or animals.",
    mammals:"Animals whose young drink milk from their mother.",
    depends:"Needs or relies on someone or something.",
    surroundings:"The things and conditions around a person, plant or animal.",
    carbon:"An element found in living things and many materials.",
    dioxide:"A compound containing two oxygen atoms joined to another element.",
    provide:"To give or make something available.",
    branches:"Parts that grow out from the trunk of a tree.",
    fallen:"Dropped down from a higher place.",
    leaves:"Flat parts of a plant that often collect sunlight.",
    decomposers:"Organisms that break down dead material.",
    nutrients:"Substances living things need to grow and stay healthy.",
    caring:"Showing kindness and looking after someone or something.",
    connected:"Joined or linked together.",
    bee:"A flying insect that visits flowers and helps pollination.",
    hive:"A home where a group of bees lives.",
    nectar:"A sweet liquid made by flowers that attracts pollinators.",
    grains:"Very small pieces or particles.",
    pollen:"A fine powder made by flowers that helps plants reproduce.",
    pollination:"The transfer of pollen from one flower to another flower of the same kind.",
    reproduce:"To make more living things of the same kind.",
    rub:"To move against a surface while pressing lightly.",
    pollinators:"Animals that carry pollen between flowers.",
    butterflies:"Insects with large colourful wings.",
    moths:"Insects related to butterflies, often active at night.",
    bats:"Mammals with wings that can fly.",
    gardens:"Places where people grow flowers, vegetables or other plants.",
    shelter:"A safe place that protects from weather or danger.",
    breathe:"To take air into the lungs and let it out again.",
    windpipe:"The tube that carries air from the throat towards the lungs.",
    lungs:"Two organs in the chest that help us breathe.",
    sacs:"Small bag-shaped spaces.",
    oxygen:"A gas in the air that the body needs to release energy from food.",
    blood:"The red liquid that travels through the body and carries oxygen and nutrients.",
    cells:"The tiny basic units that make up living things.",
    release:"To let something out or set it free.",
    carbon:"An element found in all living things and many materials.",
    muscles:"Parts of the body that contract to help us move.",
    skeleton:"The framework of bones inside the body.",
    framework:"A supporting structure made of connected parts.",
    skull:"The set of bones in the head that protects the brain.",
    ribs:"Curved bones in the chest that help protect the heart and lungs.",
    backbone:"The line of bones down the back; it supports the body.",
    spinal:"Related to the spine or backbone.",
    cord:"A long, thin structure; the spinal cord carries messages between the brain and body.",
    joints:"Places where two or more bones meet.",
    balanced:"Having the right amounts of different things.",
    diet:"The food and drink a person usually has.",
    active:"Moving around or doing physical activity.",
    muddy:"Covered with or mixed with mud.",
    heavy:"Having a lot of weight.",
    contains:"Has something inside it.",
    treatment:"A process used to make something better or safer.",
    gravel:"Small loose stones.",
    sand:"Very small grains of rock.",
    filter:"A material or device that lets some things pass while trapping others.",
    filtration:"The process of passing a liquid or gas through a filter.",
    trapped:"Caught and unable to get out.",
    clearer:"Easier to see through or understand.",
    germs:"Tiny organisms or agents that can cause disease.",
    chemicals:"Substances with particular properties and compositions.",
    testing:"Checking something carefully to find out whether it works or is safe.",
    centre:"The middle point or part of something.",
    solar:"Connected with the Sun.",
    panels:"Flat sections or boards; solar panels turn sunlight into electricity.",
    devices:"Tools or pieces of equipment made for a purpose.",
    supplied:"Provided or made available.",
    conditions:"The circumstances or surroundings in which something happens.",
    shade:"An area protected from direct sunlight.",
    direction:"The way in which something points or moves.",
    seed:"The part of a plant from which a new plant can grow.",
    stored:"Kept for use later.",
    warmth:"A comfortable amount of heat.",
    germination:"The process in which a seed begins to grow.",
    coat:"An outer covering or layer.",
    shoot:"A young stem growing from a plant.",
    upwards:"Towards a higher place.",
    roots:"The parts of a plant that usually grow underground and take in water.",
    minerals:"Natural substances found in rocks and soil.",
    packaging:"Materials used to wrap or protect products.",
    reusable:"Able to be used more than once.",
    unnecessary:"Not needed or required.",
    waste:"Something that is no longer wanted or useful.",
    useful:"Helpful or able to be used for a purpose.",
    attracted:"Pulled towards something or made interested in it.",
    magnet:"An object that creates a magnetic force and attracts some materials.",
    magnetic:"Related to magnets or the force they create.",
    force:"A push or pull that can change how something moves.",
    iron:"A strong metal used in many tools and structures.",
    steel:"A strong material made mainly from iron and carbon.",
    predict:"To say what you think will happen before it happens.",
    prediction:"A statement about what may happen in the future.",
    pencil:"A tool used for writing or drawing.",
    ruler:"A tool used to measure length or draw straight lines.",
    coin:"A small, flat piece of metal used as money.",
    record:"To write down or save information.",
    fairly:"In a way that is reasonable and treats things equally.",
    observations:"Things noticed by watching carefully.",
    attracted:"Pulled towards something by a force.",
    metal:"A material such as iron, copper or aluminium.",
    sunlight:"Light that comes from the Sun.",
    atmosphere:"The layer of gases surrounding Earth.",
    evaporation:"The process in which a liquid changes into a gas.",
    condensation:"The process in which a gas changes into a liquid.",
    photosynthesis:"The process by which green plants use light to make food.",
    pollination:"The transfer of pollen that helps flowering plants make seeds.",
    ecosystem:"A community of living things and their surroundings.",
    habitat:"The natural home of a plant or animal."
  };
  Object.assign(meanings, extraMeanings);

  const reviewedSyllables = {
    environment:["en","vi","ron","ment"], environmental:["en","vi","ron","men","tal"],
    biodiversity:["bi","o","di","ver","si","ty"], ecosystem:["e","co","sys","tem"],
    ecosystems:["e","co","sys","tems"], conservation:["con","ser","va","tion"],
    photosynthesis:["pho","to","syn","the","sis"], microorganism:["mi","cro","or","gan","ism"],
    microorganisms:["mi","cro","or","gan","isms"], electricity:["e","lec","tric","i","ty"],
    renewable:["re","new","a","ble"], biodegradable:["bi","o","de","grad","a","ble"],
    atmosphere:["at","mos","phere"], temperature:["tem","per","a","ture"],
    experiment:["ex","per","i","ment"], investigation:["in","ves","ti","ga","tion"],
    investigate:["in","ves","ti","gate"], scientist:["sci","en","tist"],
    science:["sci","ence"], scientific:["sci","en","tif","ic"],
    pollution:["pol","lu","tion"], "pollution's":["pol","lu","tion"],
    recycling:["re","cy","cling"], recycle:["re","cy","cle"],
    resources:["re","sourc","es"], resource:["re","source"],
    conservationist:["con","ser","va","tion","ist"], temperature:["tem","per","a","ture"],
    microscope:["mi","cro","scope"], "microscope's":["mi","cro","scope"],
    organism:["or","gan","ism"], organisms:["or","gan","isms"],
    respiration:["res","pi","ra","tion"], adaptation:["ad","ap","ta","tion"],
    adaptations:["ad","ap","ta","tions"], biodiversity:["bi","o","di","ver","si","ty"],
    electricity:["e","lec","tric","i","ty"], community:["com","mu","ni","ty"],
    communities:["com","mu","ni","ties"], population:["pop","u","la","tion"],
    populations:["pop","u","la","tions"], producer:["pro","duc","er"],
    consumer:["con","sum","er"], decomposer:["de","com","pos","er"],
    decomposers:["de","com","pos","ers"], herbivore:["her","bi","vore"],
    herbivores:["her","bi","vores"], amphibian:["am","phib","i","an"],
    amphibians:["am","phib","i","ans"], molecule:["mol","e","cule"],
    molecules:["mol","e","cules"], chlorophyll:["chlo","ro","phyll"],
    condensation:["con","den","sa","tion"], evaporation:["e","vap","o","ra","tion"],
    evaporate:["e","vap","o","rate"], sustainable:["sus","tain","a","ble"],
    sustainability:["sus","tain","a","bil","i","ty"], renewable:["re","new","a","ble"],
    energy:["en","er","gy"], "energy's":["en","er","gy"],
    animal:["an","i","mal"], animals:["an","i","mals"],
    plants:["plants"], habitats:["hab","i","tats"], habitat:["hab","i","tat"],
    dangerous:["dan","ger","ous"], important:["im","por","tant"],
    beautiful:["beau","ti","ful"], different:["dif","fer","ent"],
    carefully:["care","ful","ly"], naturally:["nat","ur","al","ly"],
    natural:["nat","ur","al"], protection:["pro","tec","tion"],
    protecting:["pro","tect","ing"], pollution:["pol","lu","tion"],
    plastic:["plas","tic"], plastics:["plas","tics"], rubbish:["rub","bish"],
    rubbishy:["rub","bish","y"], watercycle:["wa","ter","cy","cle"],
    water:["wa","ter"], cycle:["cy","cle"], sunlight:["sun","light"],
    "sunlight's":["sun","light"], sunlight:["sun","light"],
    temperature:["tem","per","a","ture"], colourful:["col","our","ful"],
    colourful:["col","our","ful"], recycle:["re","cy","cle"], reuse:["re","use"],
    reduce:["re","duce"], compost:["com","post"], composting:["com","post","ing"],
    biodegradable:["bi","o","de","grad","a","ble"], wildlife:["wild","life"],
    rainforest:["rain","for","est"], rainforests:["rain","for","ests"],
    ocean:["o","cean"], oceans:["o","ceans"], coral:["cor","al"],
    coralreef:["cor","al","reef"], volcano:["vol","ca","no"], volcanoes:["vol","ca","noes"],
    planet:["plan","et"], planets:["plan","ets"], galaxy:["gal","ax","y"],
    galaxies:["gal","ax","ies"], universe:["u","ni","verse"], gravity:["grav","i","ty"],
    magnetic:["mag","net","ic"], magnetism:["mag","net","ism"],
    electricity:["e","lec","tric","i","ty"], electrical:["e","lec","tri","cal"],
    experiment:["ex","per","i","ment"], observe:["ob","serve"], observation:["ob","ser","va","tion"],
    measure:["meas","ure"], measurement:["meas","ure","ment"],
    materials:["ma","te","ri","als"], material:["ma","te","ri","al"],
    inventions:["in","ven","tions"], invention:["in","ven","tion"],
    technology:["tech","nol","o","gy"], machines:["ma","chines"], machine:["ma","chine"],
    computer:["com","put","er"], computers:["com","put","ers"],
    information:["in","for","ma","tion"], communication:["com","mu","ni","ca","tion"],
    communicate:["com","mu","ni","cate"], temperature:["tem","per","a","ture"],
    scientists:["sci","en","tists"], discovery:["dis","cov","er","y"],
    discoveries:["dis","cov","er","ies"], discovery:["dis","cov","er","y"],
    question:["ques","tion"], questions:["ques","tions"], answer:["an","swer"],
    answers:["an","swers"], explain:["ex","plain"], explanation:["ex","pla","na","tion"],
    explained:["ex","plained"], curious:["cu","ri","ous"], curiosity:["cu","ri","os","i","ty"],
    wonderful:["won","der","ful"], remember:["re","mem","ber"], rememberd:["re","mem","bered"],
    together:["to","geth","er"], another:["a","noth","er"], several:["sev","er","al"],
    usually:["u","su","al","ly"], different:["dif","fer","ent"], between:["be","tween"],
    around:["a","round"], inside:["in","side"], outside:["out","side"],
    because:["be","cause"], become:["be","come"], becoming:["be","com","ing"],
    energy:["en","er","gy"], matter:["mat","ter"], oxygen:["ox","y","gen"],
    carbon:["car","bon"], dioxide:["di","ox","ide"], hydrogen:["hy","dro","gen"],
    nitrogen:["ni","tro","gen"], rainfall:["rain","fall"], "rainfall's":["rain","fall"],
    evaporation:["e","vap","o","ra","tion"], condensation:["con","den","sa","tion"],
    precipitation:["pre","cip","i","ta","tion"], surface:["sur","face"],
    natural:["nat","ur","al"], nature:["na","ture"], resources:["re","sourc","es"],
    resource:["re","source"], careful:["care","ful"], useful:["use","ful"],
    harmful:["harm","ful"], helpful:["help","ful"], protect:["pro","tect"],
    protection:["pro","tec","tion"], community:["com","mu","ni","ty"],
    healthy:["health","y"], healthily:["health","i","ly"], dangerous:["dan","ger","ous"],
    slowly:["slow","ly"], quickly:["quick","ly"], beautiful:["beau","ti","ful"],
    amazing:["a","maz","ing"], amazing:["a","maz","ing"], important:["im","por","tant"],
    animal:["an","i","mal"], animals:["an","i","mals"], insect:["in","sect"],
    insects:["in","sects"], butterfly:["but","ter","fly"], butterflies:["but","ter","flies"],
    caterpillar:["cat","er","pil","lar"], caterpillars:["cat","er","pil","lars"],
    elephant:["el","e","phant"], elephants:["el","e","phants"], giraffe:["gi","raffe"],
    giraffes:["gi","raffes"], penguin:["pen","guin"], penguins:["pen","guins"],
    dolphin:["dol","phin"], dolphins:["dol","phins"], octopus:["oc","to","pus"],
    octopuses:["oc","to","pus","es"], amphibian:["am","phib","i","an"],
    skeleton:["skel","e","ton"], skeletons:["skel","e","tons"],
    stomach:["stom","ach"], stomachs:["stom","achs"], intestine:["in","tes","tine"],
    intestines:["in","tes","tines"], digestive:["di","ges","tive"],
    digestion:["di","ges","tion"], circulation:["cir","cu","la","tion"],
    circulatory:["cir","cu","la","to","ry"], heartbeat:["heart","beat"],
    heartbeats:["heart","beats"], breathing:["breath","ing"], breathe:["breathe"],
    lungs:["lungs"], muscle:["mus","cle"], muscles:["mus","cles"],
    skeleton:["skel","e","ton"], skeletons:["skel","e","tons"],
    brain:["brain"], nervous:["ner","vous"], nervoussystem:["ner","vous","sys","tem"],
    system:["sys","tem"], systems:["sys","tems"], body:["bod","y"],
    bodies:["bod","ies"], healthy:["health","y"], vitamin:["vit","a","min"],
    vitamins:["vit","a","mins"], protein:["pro","tein"], proteins:["pro","teins"],
    carbohydrate:["car","bo","hy","drate"], carbohydrates:["car","bo","hy","drates"],
    digestion:["di","ges","tion"], exercise:["ex","er","cise"],
    "exercise's":["ex","er","cise"], oxygen:["ox","y","gen"], blood:["blood"],
    cells:["cells"], cell:["cell"], tissue:["tis","sue"], tissues:["tis","sues"],
    microscope:["mi","cro","scope"], microscopic:["mi","cro","scop","ic"],
    magnify:["mag","ni","fy"], magnified:["mag","ni","fied"],
    magnification:["mag","ni","fi","ca","tion"], bacteria:["bac","te","ri","a"],
    bacterial:["bac","te","ri","al"], virus:["vi","rus"], viruses:["vi","rus","es"],
    disease:["dis","ease"], diseases:["dis","eas","es"], immune:["im","mune"],
    immunity:["im","mu","ni","ty"], medicine:["med","i","cine"], medical:["med","i","cal"]
  };
  Object.assign(syllables, reviewedSyllables);

  function heuristicSyllables(word) {
    const lower = word.toLowerCase().replace(/[^a-z]/g, "");
    if (syllables[lower]) return syllables[lower];
    if (oneSyllable.has(lower) || lower.length < 5) return null;
    let wordBody = lower;
    let suffix = "";
    if (/[td]ed$/.test(wordBody)) {
      suffix = "ed"; wordBody = wordBody.slice(0, -2);
    } else if (/ed$/.test(wordBody)) {
      suffix = "";
    } else if (/(?:s|x|z|ch|sh)es$/.test(wordBody)) {
      suffix = "es"; wordBody = wordBody.slice(0, -2);
    } else if (/(?:ing|ly|ful|less|ness|ment|tion|sion|able|ible|ous|ive|al|er|or)$/.test(wordBody)) {
      const match = wordBody.match(/(ing|ly|ful|less|ness|ment|tion|sion|able|ible|ous|ive|al|er|or)$/);
      if (match && wordBody.length - match[0].length >= 3) { suffix = match[0]; wordBody = wordBody.slice(0, -suffix.length); }
    }
    // Count vowel nuclei, treating adjacent vowel letters as one team.
    const nuclei = [...wordBody.matchAll(/[aeiouy]+/g)];
    if (nuclei.length < 2) {
      if (suffix === "ed" && /[td]$/.test(lower.slice(0, -2))) return [wordBody, "ed"];
      if (suffix && suffix !== "ed") return [wordBody, suffix];
      return null;
    }
    let pieces = [];
    let start = 0;
    for (let i = 0; i < nuclei.length - 1; i++) {
      const leftEnd = nuclei[i].index + nuclei[i][0].length;
      const rightStart = nuclei[i + 1].index;
      const cluster = wordBody.slice(leftEnd, rightStart);
      let split = leftEnd;
      if (cluster.length === 1) split = leftEnd;
      else if (cluster.length >= 2) {
        const digraphs = ["th","sh","ch","ph","wh","ck","ng","qu"];
        if (digraphs.includes(cluster.slice(-2))) split = rightStart - 2;
        else split = leftEnd + 1;
      }
      split = Math.max(start + 1, Math.min(split, rightStart));
      pieces.push(wordBody.slice(start, split));
      start = split;
    }
    pieces.push(wordBody.slice(start));
    // Do not show implausible fragments; reviewed exceptions above take priority.
    if (pieces.some(part => part.length < 1) || pieces.length > 5) return null;
    if (suffix) pieces.push(suffix);
    if (pieces.length < 2) return null;
    return pieces;
  }

  function getParts(word) {
    const clean = word.toLowerCase().replace(/[^a-z]/g, "");
    return syllables[clean] || heuristicSyllables(clean);
  }

  const meaningFallback = "A child-friendly definition for this word is not in the vocabulary yet.";
  function renderParagraph(paragraph) {
    return paragraph.split(/(\s+)/).map(function (piece) {
      if (/^\s+$/.test(piece)) return piece;
      const match = piece.match(/[A-Za-z]+(?:'[A-Za-z]+)?/);
      if (!match) return escapeHtml(piece);
      const original = match[0], lower = original.toLowerCase();
      const base = lower.replace(/'s$/i, "");
      const parts = getParts(base);
      const isKnownOne = oneSyllable.has(base);
      const shouldBreak = mode === "syllables" ? !!(parts && parts.length > 1) :
        mode === "mixed" ? !!(parts && parts.length > 1 && base.length >= 6) : false;
      const before = piece.slice(0, piece.indexOf(original));
      const after = piece.slice(piece.indexOf(original) + original.length);
      const displayed = shouldBreak ? parts.join("-") + (lower.endsWith("'s") ? "'s" : "") : original;
      const guide = soundGuides[base] || "";
      const breakdown = (parts ? parts.join("-") + (lower.endsWith("'s") ? "'s" : "") : (isKnownOne ? "1 syllable" : ""))
        + (guide ? (parts ? " · " : "") + guide : "");
      const localMeaning = meanings[base] || "";
      const meaning = localMeaning || "Looking up a learner-friendly dictionary meaning…";
      const classes = shouldBreak ? (mode === "mixed" ? "mixed-word" : "syllabified") : "";
      return escapeHtml(before) + '<span class="story-word ' + classes + '" tabindex="0" role="button" data-word="' +
        escapeHtml(original) + '" data-parts="' + escapeHtml(breakdown) + '" data-meaning="' + escapeHtml(meaning) +
        '" aria-label="' + escapeHtml(original) + '">' + escapeHtml(displayed) + '</span>' + escapeHtml(after);
    }).join("");
  }
  window.renderParagraph = renderParagraph;

  // For words outside the local child-friendly glossary, look up a real definition on demand.
  // Only the selected word is sent; no learner information is transmitted.
  selectWord = function (target) {
    if (isReadingStory) stopReading();
    const word = target.dataset.word || "";
    const lookupWord = word.replace(/'s$/i, "");
    const meaningNode = document.getElementById("wordMeaning");
    document.getElementById("wordDisplay").textContent = word;
    document.getElementById("wordBreakdown").textContent = target.dataset.parts || "";
    meaningNode.textContent = target.dataset.meaning || meaningFallback;
    document.getElementById("wordPanel").hidden = false;
    speakText(word);
    if (target.dataset.lookup !== "true") return;
    const requestWord = lookupWord.toLowerCase();
    meaningNode.textContent = "Finding a simple dictionary definition…";
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + encodeURIComponent(requestWord))
      .then(function (response) {
        if (!response.ok) throw new Error("No dictionary entry");
        return response.json();
      })
      .then(function (entries) {
        const definition = entries.flatMap(function (entry) {
          return (entry.meanings || []).flatMap(function (meaning) {
            return meaning.definitions || [];
          });
        }).map(function (item) { return item.definition; }).find(Boolean);
        if (!definition) throw new Error("No definition found");
        if (document.getElementById("wordDisplay").textContent === word && !document.getElementById("wordPanel").hidden) {
          meaningNode.textContent = definition;
        }
      })
      .catch(function () {
        if (document.getElementById("wordDisplay").textContent === word && !document.getElementById("wordPanel").hidden) {
          meaningNode.textContent = "This word is not in the offline glossary, and its online dictionary entry could not be loaded. Please try again when connected.";
        }
      });
  };

  // Add original, age-appropriate passages based on common primary/lower-secondary science themes.
  const newChapters = [
    { title:"The Journey of a Raindrop", icon:"💧", category:"Environment", subtitle:"Follow water as it moves through the water cycle.", source:"Original educational passage. Science concepts checked against NASA Earth Observatory's water-cycle learning resources: https://science.nasa.gov/earth/earth-observatory/.", art:"world", takeaway:"Water moves around Earth again and again; use it carefully.", paragraphs:[
      "A tiny raindrop rested in a cloud above a green mountain. When the cloud became full of water droplets, rain began to fall. The raindrop landed in a stream and travelled towards a wide river.",
      "Later, sunlight warmed the river. Some water changed into an invisible gas called water vapour. This change is called evaporation. The vapour rose into cooler air and formed tiny droplets in clouds. This is condensation.",
      "When droplets joined and became heavy, they fell as rain or snow. This repeating journey is called the water cycle. Water is precious, so we should turn off taps and avoid wasting it."
    ]},
    { title:"A Forest Is a Living Home", icon:"🌳", category:"Biology", subtitle:"Discover how plants, animals and fungi share a forest.", source:"Original educational passage. General ecology concepts adapted for children; see National Geographic Education's ecosystem resources: https://education.nationalgeographic.org/.", art:"growth", takeaway:"Every living thing has a role, and habitats need protection.", paragraphs:[
      "A forest is more than a group of trees. It is a living home for birds, insects, mammals, fungi and many tiny organisms. Each living thing depends on parts of its surroundings.",
      "Trees use sunlight, water and carbon dioxide to make food through photosynthesis. Their leaves provide food for some animals, while branches offer places to rest and build nests. Fallen leaves can become food for decomposers.",
      "Fungi and bacteria help break down dead plants and animals. Nutrients return to the soil, where new plants can use them. Protecting a forest means caring for this connected community."
    ]},
    { title:"The Secret Work of Bees", icon:"🐝", category:"Biology", subtitle:"Learn how bees help flowering plants reproduce.", source:"Original educational passage. Pollination concepts checked against Royal Botanic Gardens, Kew learning resources: https://www.kew.org/.", art:"flower", takeaway:"Small animals can do important work in nature.", paragraphs:[
      "A bee flies from its hive to visit a bright flower. It drinks sweet nectar for energy. Tiny grains of pollen stick to the bee's body as it moves around the flower.",
      "When the bee visits another flower of the same kind, some pollen may rub off. This helps the plant make seeds. The movement of pollen from one flower to another is called pollination.",
      "Bees are not the only pollinators. Butterflies, moths, birds and even some bats can carry pollen. Flowers and pollinators need one another, so gardens with different flowers can provide helpful food and shelter."
    ]},
    { title:"Why Do We Breathe?", icon:"🫁", category:"Biology", subtitle:"Explore the lungs and the job of oxygen in the body.", source:"Original educational passage. Basic human-biology explanation; see NHS Healthier Families and Britannica Kids biology resources: https://www.nhs.uk/ and https://kids.britannica.com/.", art:"soul", takeaway:"Breathing brings oxygen into the body; movement and rest both matter.", paragraphs:[
      "Every time you breathe in, air travels through your nose or mouth and down a tube called the windpipe. The air then moves into the lungs, which sit inside your chest.",
      "Inside the lungs are millions of tiny air sacs. Oxygen passes from these sacs into the blood. The blood carries oxygen around the body, where cells use it to release energy from food.",
      "When you breathe out, your body removes carbon dioxide, a waste gas. Your breathing becomes faster when you run because your muscles need more oxygen and produce more carbon dioxide."
    ]},
    { title:"The Amazing Human Skeleton", icon:"🦴", category:"Biology", subtitle:"Find out how bones support and protect your body.", source:"Original educational passage. Basic anatomy checked against KidsHealth anatomy learning resources: https://kidshealth.org/.", art:"book", takeaway:"Bones protect organs and work with muscles to help us move.", paragraphs:[
      "Your skeleton is the framework of bones inside your body. It gives your body shape and helps you stand, sit and move. An adult human usually has 206 bones.",
      "The skull protects the brain. The ribs help protect the heart and lungs. The backbone supports the body and protects the spinal cord. Different bones have different shapes because they do different jobs.",
      "Bones do not work alone. Muscles pull on bones, and joints allow many parts to bend. Eating a balanced diet, being active and getting enough rest help keep the body healthy."
    ]},
    { title:"Can We Clean Dirty Water?", icon:"🚰", category:"Science", subtitle:"Try a simple model to understand filtering and clean water.", source:"Original educational passage and safe classroom demonstration. Water-treatment concepts are introductory; see US EPA drinking-water resources: https://www.epa.gov/ground-water-and-drinking-water.", art:"world", takeaway:"Filtering can remove some dirt, but it does not make unsafe water safe to drink.", paragraphs:[
      "Imagine muddy water after heavy rain. It contains tiny pieces of soil and other material. A water-treatment plant uses several steps to make water suitable for people to use.",
      "In a simple classroom model, muddy water can pass through clean gravel, sand and filter paper. Larger pieces may be trapped, and the water may look clearer. This is called filtration.",
      "Clear-looking water is not always safe to drink. Germs and dissolved chemicals may still be present. Never drink water from a classroom experiment. Real drinking water needs proper treatment and testing."
    ]},
    { title:"The Power of the Sun", icon:"☀️", category:"Science", subtitle:"See how sunlight supports life and can produce electricity.", source:"Original educational passage. Solar-energy concepts checked against US Department of Energy learning resources: https://www.energy.gov/eere/solar.", art:"time", takeaway:"Sunlight is a renewable energy source, and using energy wisely matters.", paragraphs:[
      "The Sun is a star at the centre of our solar system. It gives Earth light and warmth. Plants use sunlight to make food, and the Sun helps drive the water cycle.",
      "Solar panels contain special materials that can turn sunlight into electricity. This electricity can power lights, computers and other devices. Solar energy is renewable because sunlight is naturally supplied again and again.",
      "Solar panels do not work equally well in every condition. Clouds, shade, the time of day and the direction of a panel can affect how much electricity it produces. Saving energy is helpful too."
    ]},
    { title:"From Seed to Plant", icon:"🌱", category:"Biology", subtitle:"Follow a seed as it germinates and grows.", source:"Original educational passage. Plant-growth concepts checked against Royal Horticultural Society children's gardening resources: https://www.rhs.org.uk/education-learning.", art:"growth", takeaway:"Plants need suitable conditions, water and light to grow well.", paragraphs:[
      "A seed may look small and quiet, but it contains a tiny young plant and stored food. When it has enough water, warmth and oxygen, germination can begin.",
      "The seed coat softens and a root grows down into the soil. A shoot grows upwards. Soon, the first leaves open and begin to collect light for photosynthesis.",
      "As the plant grows, its roots take in water and minerals from the soil. Its leaves make food. Different plants need different conditions, but all green plants need light to make their own food."
    ]},
    { title:"The Problem with Plastic", icon:"♻️", category:"Environment", subtitle:"Understand how plastic waste can affect land and sea.", source:"Original educational passage. Waste and marine-litter concepts checked against UNEP educational resources: https://www.unep.org/interactives/beat-plastic-pollution/.", art:"world", takeaway:"Reduce, reuse and recycle where possible; put rubbish in the right place.", paragraphs:[
      "Plastic is useful because it can be light, strong and shaped into many things. We use it in bottles, food containers, toys and bags. But some plastic items are used only once and then thrown away.",
      "Plastic rubbish can remain in the environment for a very long time. It may be carried by wind or rain into rivers and oceans. Animals can become trapped in plastic or mistake small pieces for food.",
      "We can help by using reusable bags and bottles, choosing less packaging when possible and sorting waste for recycling where local services allow it. The best choice is often to avoid creating unnecessary waste."
    ]},
    { title:"Magnets: An Invisible Pull", icon:"🧲", category:"Science", subtitle:"Investigate which materials a magnet can attract.", source:"Original educational passage. Introductory magnetism concepts; see Exploratorium science activities: https://www.exploratorium.edu/.", art:"book", takeaway:"Make a prediction, test it fairly and record what you observe.", paragraphs:[
      "A magnet can pull on certain materials without touching them. This invisible push or pull is called a magnetic force. Iron and many kinds of steel are attracted to magnets.",
      "Try testing a paper clip, a wooden pencil, a plastic ruler and a coin with a classroom magnet. First, predict which objects will be attracted. Then test each object and record what happens.",
      "A good experiment changes one thing at a time and uses careful observations. Not every metal is magnetic, so a magnet will not attract every object made of metal."
    ]}
  ];

  const firstNewPage = storyPages.length;
  newChapters.forEach(function (chapter, index) {
    const chapterIndex = readingChapters.length;
    const start = storyPages.length;
    chapter.paragraphs.forEach(function (paragraph, pageIndex) {
      storyPages.push({
        title: chapter.title,
        paragraphs: [paragraph],
        chapterTitle: chapter.title,
        chapterSubtitle: chapter.subtitle,
        chapterSource: chapter.source,
        chapterArt: chapter.art,
        chapterIcon: chapter.icon,
        chapterTakeaway: chapter.takeaway,
        chapterIndex: chapterIndex,
        chapterStart: pageIndex === 0,
        chapterPage: pageIndex + 1,
        chapterLength: chapter.paragraphs.length
      });
    });
    readingChapters.push({
      title: chapter.title,
      icon: chapter.icon,
      category: chapter.category,
      subtitle: chapter.subtitle,
      source: chapter.source,
      art: chapter.art,
      takeaway: chapter.takeaway,
      start: start,
      end: storyPages.length - 1
    });
  });

  // Add a searchable catalogue above the chapter list; existing chapter routes remain stable.
  const library = document.getElementById("storyLibrary");
  if (library && !document.getElementById("readingSearch")) {
    const wrapper = document.createElement("div");
    wrapper.className = "reading-search-wrap";
    wrapper.innerHTML = '<label class="reading-search-label" for="readingSearch">Search reading passages</label>' +
      '<div class="reading-search-control"><span aria-hidden="true">⌕</span><input id="readingSearch" type="search" placeholder="Try science, plants, water..." autocomplete="off"></div>' +
      '<p class="reading-search-count" id="readingSearchCount" aria-live="polite"></p>';
    library.parentNode.insertBefore(wrapper, library);
  }
  let searchQuery = "";
  function renderSearchableLibrary() {
    const host = document.getElementById("storyLibrary");
    if (!host) return;
    const activeChapter = storyPages[page] ? storyPages[page].chapterIndex : 0;
    const query = searchQuery.trim().toLowerCase();
    const matches = readingChapters.map(function (chapter, index) {
      return { chapter: chapter, index: index };
    }).filter(function (item) {
      const chapter = item.chapter;
      const text = [chapter.title, chapter.subtitle, chapter.category, chapter.source].join(" ").toLowerCase();
      return !query || text.includes(query);
    });
    host.innerHTML = matches.map(function (item) {
      const chapter = item.chapter, index = item.index;
      const selected = index === activeChapter;
      return '<button class="story-choice ' + (selected ? "selected" : "") + '" data-chapter="' + index + '" type="button">' +
        '<span class="story-thumb">' + escapeHtml(chapter.icon || "📖") + '</span><span class="story-choice-copy"><b>' +
        escapeHtml(chapter.title) + '</b><small>' + escapeHtml(chapter.category || "Reading") + ' · ' + escapeHtml(chapter.subtitle) +
        '</small></span>' + (selected ? '<span class="choice-check">✓</span>' : '') + '</button>';
    }).join("");
    const count = document.getElementById("readingSearchCount");
    if (count) count.textContent = query ? (matches.length + " passage" + (matches.length === 1 ? "" : "s") + " found") : (readingChapters.length + " passages to explore");
    if (!matches.length) host.innerHTML = '<p class="reading-no-results">No passages found. Try a topic such as “biology”, “water” or “science”.</p>';
  }
  window.renderStoryLibrary = renderSearchableLibrary;
  const searchInput = document.getElementById("readingSearch");
  if (searchInput) searchInput.addEventListener("input", function () {
    searchQuery = searchInput.value;
    renderSearchableLibrary();
  });

  // Restore the original URL after the base app has loaded, so new chapter deep links survive refresh.
  if (initialLessonHash && initialLessonHash.indexOf("#/reading/") === 0) {
    history.replaceState(null, "", initialLessonHash);
  }
  // Ensure direct links to every chapter work with the existing hash router.
  renderStoryLibrary();
  applyLocationRoute();

  // Extend the QA helper with the fallback syllable suggestions, while marking them as suggestions.
  const previousInspect = window.littleLanternsQA && window.littleLanternsQA.inspect;
  if (window.littleLanternsQA) {
    window.littleLanternsQA.inspect = function (text) {
      return String(text).match(/[A-Za-z]+(?:'[A-Za-z]+)?/g)?.map(function (word) {
        const clean = word.toLowerCase().replace(/'s$/, "");
        const parts = getParts(clean);
        const reviewed = !!syllables[clean];
        return {
          word: word,
          syllables: parts ? parts.join("-") : (oneSyllable.has(clean) ? "1" : null),
          status: reviewed ? "reviewed" : parts ? "suggested — check pronunciation" : "REVIEW",
          note: reviewed ? "Editorial syllable annotation" : parts ? "Rule-based suggestion; verify with a spoken dictionary" : "Needs review"
        };
      }) || [];
    };
    window.littleLanternsQA.storyAudit = function () {
      return storyPages.flatMap(function (item, index) {
        return item.paragraphs.flatMap(function (text) {
          return window.littleLanternsQA.inspect(text).map(function (word) {
            return Object.assign({}, word, { page: index + 1, chapter: item.chapterTitle || item.title });
          });
        });
      });
    };
    window.littleLanternsQA.syllabify = getParts;
  }
  window.LittleLanternsReading = { newPassagesStart: firstNewPage, newPassageCount: newChapters.length };
})();
