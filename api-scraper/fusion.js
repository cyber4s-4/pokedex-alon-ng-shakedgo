"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.createTable = void 0;
var fs = require("fs/promises");
var MongoClient = require("mongodb").MongoClient;
var pg_1 = require("pg");
var url = "mongodb+srv://cyber4s-pokemon:".concat(encodeURIComponent("pokemon"), "@cluster.oiwap.mongodb.net/?retryWrites=true&w=majority");
var client = new pg_1.Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "rootUser",
    database: "postgres"
});
client.connect();
var pokemonData = {
    1: { name: "bulbasaur", fusionId: "1" },
    2: { name: "ivysaur", fusionId: "2" },
    3: { name: "venusaur", fusionId: "3" },
    4: { name: "charmander", fusionId: "4" },
    5: { name: "charmeleon", fusionId: "5" },
    6: { name: "charizard", fusionId: "6" },
    7: { name: "squirtle", fusionId: "7" },
    8: { name: "wartortle", fusionId: "8" },
    9: { name: "blastoise", fusionId: "9" },
    10: { name: "caterpie", fusionId: "10" },
    11: { name: "metapod", fusionId: "11" },
    12: { name: "butterfree", fusionId: "12" },
    13: { name: "weedle", fusionId: "13" },
    14: { name: "kakuna", fusionId: "14" },
    15: { name: "beedrill", fusionId: "15" },
    16: { name: "pidgey", fusionId: "16" },
    17: { name: "pidgeotto", fusionId: "17" },
    18: { name: "pidgeot", fusionId: "18" },
    19: { name: "rattata", fusionId: "19" },
    20: { name: "raticate", fusionId: "20" },
    21: { name: "spearow", fusionId: "21" },
    22: { name: "fearow", fusionId: "22" },
    23: { name: "ekans", fusionId: "23" },
    24: { name: "arbok", fusionId: "24" },
    25: { name: "pikachu", fusionId: "25" },
    26: { name: "raichu", fusionId: "26" },
    27: { name: "sandshrew", fusionId: "27" },
    28: { name: "sandslash", fusionId: "28" },
    29: { name: "nidoran-f", fusionId: "29" },
    30: { name: "nidorina", fusionId: "30" },
    31: { name: "nidoqueen", fusionId: "31" },
    32: { name: "nidoran-m", fusionId: "32" },
    33: { name: "nidorino", fusionId: "33" },
    34: { name: "nidoking", fusionId: "34" },
    35: { name: "clefairy", fusionId: "35" },
    36: { name: "clefable", fusionId: "36" },
    37: { name: "vulpix", fusionId: "37" },
    38: { name: "ninetales", fusionId: "38" },
    39: { name: "jigglypuff", fusionId: "39" },
    40: { name: "wigglytuff", fusionId: "40" },
    41: { name: "zubat", fusionId: "41" },
    42: { name: "golbat", fusionId: "42" },
    43: { name: "oddish", fusionId: "43" },
    44: { name: "gloom", fusionId: "44" },
    45: { name: "vileplume", fusionId: "45" },
    46: { name: "paras", fusionId: "46" },
    47: { name: "parasect", fusionId: "47" },
    48: { name: "venonat", fusionId: "48" },
    49: { name: "venomoth", fusionId: "49" },
    50: { name: "diglett", fusionId: "50" },
    51: { name: "dugtrio", fusionId: "51" },
    52: { name: "meowth", fusionId: "52" },
    53: { name: "persian", fusionId: "53" },
    54: { name: "psyduck", fusionId: "54" },
    55: { name: "golduck", fusionId: "55" },
    56: { name: "mankey", fusionId: "56" },
    57: { name: "primeape", fusionId: "57" },
    58: { name: "growlithe", fusionId: "58" },
    59: { name: "arcanine", fusionId: "59" },
    60: { name: "poliwag", fusionId: "60" },
    61: { name: "poliwhirl", fusionId: "61" },
    62: { name: "poliwrath", fusionId: "62" },
    63: { name: "abra", fusionId: "63" },
    64: { name: "kadabra", fusionId: "64" },
    65: { name: "alakazam", fusionId: "65" },
    66: { name: "machop", fusionId: "66" },
    67: { name: "machoke", fusionId: "67" },
    68: { name: "machamp", fusionId: "68" },
    69: { name: "bellsprout", fusionId: "69" },
    70: { name: "weepinbell", fusionId: "70" },
    71: { name: "victreebel", fusionId: "71" },
    72: { name: "tentacool", fusionId: "72" },
    73: { name: "tentacruel", fusionId: "73" },
    74: { name: "geodude", fusionId: "74" },
    75: { name: "graveler", fusionId: "75" },
    76: { name: "golem", fusionId: "76" },
    77: { name: "ponyta", fusionId: "77" },
    78: { name: "rapidash", fusionId: "78" },
    79: { name: "slowpoke", fusionId: "79" },
    80: { name: "slowbro", fusionId: "80" },
    81: { name: "magnemite", fusionId: "81" },
    82: { name: "magneton", fusionId: "82" },
    83: { name: "farfetchd", fusionId: "83" },
    84: { name: "doduo", fusionId: "84" },
    85: { name: "dodrio", fusionId: "85" },
    86: { name: "seel", fusionId: "86" },
    87: { name: "dewgong", fusionId: "87" },
    88: { name: "grimer", fusionId: "88" },
    89: { name: "muk", fusionId: "89" },
    90: { name: "shellder", fusionId: "90" },
    91: { name: "cloyster", fusionId: "91" },
    92: { name: "gastly", fusionId: "92" },
    93: { name: "haunter", fusionId: "93" },
    94: { name: "gengar", fusionId: "94" },
    95: { name: "onix", fusionId: "95" },
    96: { name: "drowzee", fusionId: "96" },
    97: { name: "hypno", fusionId: "97" },
    98: { name: "krabby", fusionId: "98" },
    99: { name: "kingler", fusionId: "99" },
    100: { name: "voltorb", fusionId: "100" },
    101: { name: "electrode", fusionId: "101" },
    102: { name: "exeggcute", fusionId: "102" },
    103: { name: "exeggutor", fusionId: "103" },
    104: { name: "cubone", fusionId: "104" },
    105: { name: "marowak", fusionId: "105" },
    106: { name: "hitmonlee", fusionId: "106" },
    107: { name: "hitmonchan", fusionId: "107" },
    108: { name: "lickitung", fusionId: "108" },
    109: { name: "koffing", fusionId: "109" },
    110: { name: "weezing", fusionId: "110" },
    111: { name: "rhyhorn", fusionId: "111" },
    112: { name: "rhydon", fusionId: "112" },
    113: { name: "chansey", fusionId: "113" },
    114: { name: "tangela", fusionId: "114" },
    115: { name: "kangaskhan", fusionId: "115" },
    116: { name: "horsea", fusionId: "116" },
    117: { name: "seadra", fusionId: "117" },
    118: { name: "goldeen", fusionId: "118" },
    119: { name: "seaking", fusionId: "119" },
    120: { name: "staryu", fusionId: "120" },
    121: { name: "starmie", fusionId: "121" },
    122: { name: "mr-mime", fusionId: "122" },
    123: { name: "scyther", fusionId: "123" },
    124: { name: "jynx", fusionId: "124" },
    125: { name: "electabuzz", fusionId: "125" },
    126: { name: "magmar", fusionId: "126" },
    127: { name: "pinsir", fusionId: "127" },
    128: { name: "tauros", fusionId: "128" },
    129: { name: "magikarp", fusionId: "129" },
    130: { name: "gyarados", fusionId: "130" },
    131: { name: "lapras", fusionId: "131" },
    132: { name: "ditto", fusionId: "132" },
    133: { name: "eevee", fusionId: "133" },
    134: { name: "vaporeon", fusionId: "134" },
    135: { name: "jolteon", fusionId: "135" },
    136: { name: "flareon", fusionId: "136" },
    137: { name: "porygon", fusionId: "137" },
    138: { name: "omanyte", fusionId: "138" },
    139: { name: "omastar", fusionId: "139" },
    140: { name: "kabuto", fusionId: "140" },
    141: { name: "kabutops", fusionId: "141" },
    142: { name: "aerodactyl", fusionId: "142" },
    143: { name: "snorlax", fusionId: "143" },
    144: { name: "articuno", fusionId: "144" },
    145: { name: "zapdos", fusionId: "145" },
    146: { name: "moltres", fusionId: "146" },
    147: { name: "dratini", fusionId: "147" },
    148: { name: "dragonair", fusionId: "148" },
    149: { name: "dragonite", fusionId: "149" },
    150: { name: "mewtwo", fusionId: "150" },
    151: { name: "mew", fusionId: "151" },
    152: { name: "chikorita", fusionId: "152" },
    153: { name: "bayleef", fusionId: "153" },
    154: { name: "meganium", fusionId: "154" },
    155: { name: "cyndaquil", fusionId: "155" },
    156: { name: "quilava", fusionId: "156" },
    157: { name: "typhlosion", fusionId: "157" },
    158: { name: "totodile", fusionId: "158" },
    159: { name: "croconaw", fusionId: "159" },
    160: { name: "feraligatr", fusionId: "160" },
    161: { name: "sentret", fusionId: "161" },
    162: { name: "furret", fusionId: "162" },
    163: { name: "hoothoot", fusionId: "163" },
    164: { name: "noctowl", fusionId: "164" },
    165: { name: "ledyba", fusionId: "165" },
    166: { name: "ledian", fusionId: "166" },
    167: { name: "spinarak", fusionId: "167" },
    168: { name: "ariados", fusionId: "168" },
    169: { name: "crobat", fusionId: "169" },
    170: { name: "chinchou", fusionId: "170" },
    171: { name: "lanturn", fusionId: "171" },
    172: { name: "pichu", fusionId: "172" },
    173: { name: "cleffa", fusionId: "173" },
    174: { name: "igglybuff", fusionId: "174" },
    175: { name: "togepi", fusionId: "175" },
    176: { name: "togetic", fusionId: "176" },
    177: { name: "natu", fusionId: "177" },
    178: { name: "xatu", fusionId: "178" },
    179: { name: "mareep", fusionId: "179" },
    180: { name: "flaaffy", fusionId: "180" },
    181: { name: "ampharos", fusionId: "181" },
    182: { name: "bellossom", fusionId: "182" },
    183: { name: "marill", fusionId: "183" },
    184: { name: "azumarill", fusionId: "184" },
    185: { name: "sudowoodo", fusionId: "185" },
    186: { name: "politoed", fusionId: "186" },
    187: { name: "hoppip", fusionId: "187" },
    188: { name: "skiploom", fusionId: "188" },
    189: { name: "jumpluff", fusionId: "189" },
    190: { name: "aipom", fusionId: "190" },
    191: { name: "sunkern", fusionId: "191" },
    192: { name: "sunflora", fusionId: "192" },
    193: { name: "yanma", fusionId: "193" },
    194: { name: "wooper", fusionId: "194" },
    195: { name: "quagsire", fusionId: "195" },
    196: { name: "espeon", fusionId: "196" },
    197: { name: "umbreon", fusionId: "197" },
    198: { name: "murkrow", fusionId: "198" },
    199: { name: "slowking", fusionId: "199" },
    200: { name: "misdreavus", fusionId: "200" },
    201: { name: "unown", fusionId: "201" },
    202: { name: "wobbuffet", fusionId: "202" },
    203: { name: "girafarig", fusionId: "203" },
    204: { name: "pineco", fusionId: "204" },
    205: { name: "forretress", fusionId: "205" },
    206: { name: "dunsparce", fusionId: "206" },
    207: { name: "gligar", fusionId: "207" },
    208: { name: "steelix", fusionId: "208" },
    209: { name: "snubbull", fusionId: "209" },
    210: { name: "granbull", fusionId: "210" },
    211: { name: "qwilfish", fusionId: "211" },
    212: { name: "scizor", fusionId: "212" },
    213: { name: "shuckle", fusionId: "213" },
    214: { name: "heracross", fusionId: "214" },
    215: { name: "sneasel", fusionId: "215" },
    216: { name: "teddiursa", fusionId: "216" },
    217: { name: "ursaring", fusionId: "217" },
    218: { name: "slugma", fusionId: "218" },
    219: { name: "magcargo", fusionId: "219" },
    220: { name: "swinub", fusionId: "220" },
    221: { name: "piloswine", fusionId: "221" },
    222: { name: "corsola", fusionId: "222" },
    223: { name: "remoraid", fusionId: "223" },
    224: { name: "octillery", fusionId: "224" },
    225: { name: "delibird", fusionId: "225" },
    226: { name: "mantine", fusionId: "226" },
    227: { name: "skarmory", fusionId: "227" },
    228: { name: "houndour", fusionId: "228" },
    229: { name: "houndoom", fusionId: "229" },
    230: { name: "kingdra", fusionId: "230" },
    231: { name: "phanpy", fusionId: "231" },
    232: { name: "donphan", fusionId: "232" },
    233: { name: "porygon2", fusionId: "233" },
    234: { name: "stantler", fusionId: "234" },
    235: { name: "smeargle", fusionId: "235" },
    236: { name: "tyrogue", fusionId: "236" },
    237: { name: "hitmontop", fusionId: "237" },
    238: { name: "smoochum", fusionId: "238" },
    239: { name: "elekid", fusionId: "239" },
    240: { name: "magby", fusionId: "240" },
    241: { name: "miltank", fusionId: "241" },
    242: { name: "blissey", fusionId: "242" },
    243: { name: "raikou", fusionId: "243" },
    244: { name: "entei", fusionId: "244" },
    245: { name: "suicune", fusionId: "245" },
    246: { name: "larvitar", fusionId: "246" },
    247: { name: "pupitar", fusionId: "247" },
    248: { name: "tyranitar", fusionId: "248" },
    249: { name: "lugia", fusionId: "249" },
    250: { name: "ho-oh", fusionId: "250" },
    251: { name: "celebi", fusionId: "251" },
    252: { name: "treecko", fusionId: "276" },
    253: { name: "grovyle", fusionId: "277" },
    254: { name: "sceptile", fusionId: "278" },
    255: { name: "torchic", fusionId: "279" },
    256: { name: "combusken", fusionId: "280" },
    257: { name: "blaziken", fusionId: "281" },
    258: { name: "mudkip", fusionId: "282" },
    259: { name: "marshtomp", fusionId: "283" },
    260: { name: "swampert", fusionId: "284" },
    280: { name: "ralts", fusionId: "285" },
    281: { name: "kirlia", fusionId: "286" },
    282: { name: "gardevoir", fusionId: "287" },
    285: { name: "shroomish", fusionId: "404" },
    286: { name: "breloom", fusionId: "355" },
    287: { name: "slakoth", fusionId: "385" },
    288: { name: "vigoroth", fusionId: "386" },
    289: { name: "slaking", fusionId: "309" },
    290: { name: "nincada", fusionId: "382" },
    291: { name: "ninjask", fusionId: "356" },
    292: { name: "shedinja", fusionId: "289" },
    298: { name: "azurill", fusionId: "252" },
    299: { name: "nosepass", fusionId: "325" },
    303: { name: "mawile", fusionId: "300" },
    304: { name: "aron", fusionId: "390" },
    305: { name: "lairon", fusionId: "391" },
    306: { name: "aggron", fusionId: "333" },
    315: { name: "roselia", fusionId: "401" },
    320: { name: "wailmer", fusionId: "387" },
    321: { name: "wailord", fusionId: "314" },
    328: { name: "trapinch", fusionId: "392" },
    329: { name: "vibrava", fusionId: "393" },
    330: { name: "flygon", fusionId: "334" },
    345: { name: "lileep", fusionId: "301" },
    346: { name: "cradily", fusionId: "302" },
    347: { name: "anorith", fusionId: "303" },
    348: { name: "armaldo", fusionId: "304" },
    349: { name: "feebas", fusionId: "394" },
    350: { name: "milotic", fusionId: "335" },
    352: { name: "kecleon", fusionId: "290" },
    353: { name: "shuppet", fusionId: "405" },
    354: { name: "banette", fusionId: "357" },
    355: { name: "duskull", fusionId: "311" },
    356: { name: "dusclops", fusionId: "312" },
    359: { name: "absol", fusionId: "310" },
    360: { name: "wynaut", fusionId: "253" },
    371: { name: "bagon", fusionId: "395" },
    372: { name: "shelgon", fusionId: "396" },
    373: { name: "salamence", fusionId: "336" },
    374: { name: "beldum", fusionId: "291" },
    375: { name: "metang", fusionId: "292" },
    376: { name: "metagross", fusionId: "293" },
    380: { name: "latias", fusionId: "378" },
    381: { name: "latios", fusionId: "379" },
    382: { name: "kyogre", fusionId: "340" },
    383: { name: "groudon", fusionId: "341" },
    384: { name: "rayquaza", fusionId: "342" },
    385: { name: "jirachi", fusionId: "381" },
    386: { name: "deoxys", fusionId: "380" },
    387: { name: "turtwig", fusionId: "316" },
    388: { name: "grotle", fusionId: "317" },
    389: { name: "torterra", fusionId: "318" },
    390: { name: "chimchar", fusionId: "319" },
    391: { name: "monferno", fusionId: "320" },
    392: { name: "infernape", fusionId: "321" },
    393: { name: "piplup", fusionId: "322" },
    394: { name: "prinplup", fusionId: "323" },
    395: { name: "empoleon", fusionId: "324" },
    399: { name: "bidoof", fusionId: "294" },
    400: { name: "bibarel", fusionId: "383" },
    403: { name: "shinx", fusionId: "388" },
    404: { name: "luxio", fusionId: "389" },
    405: { name: "luxray", fusionId: "332" },
    406: { name: "budew", fusionId: "400" },
    407: { name: "roserade", fusionId: "352" },
    408: { name: "cranidos", fusionId: "305" },
    409: { name: "rampardos", fusionId: "306" },
    410: { name: "shieldon", fusionId: "307" },
    411: { name: "bastiodon", fusionId: "308" },
    424: { name: "ambipom", fusionId: "254" },
    425: { name: "drifloon", fusionId: "402" },
    426: { name: "drifblim", fusionId: "353" },
    427: { name: "buneary", fusionId: "403" },
    428: { name: "lopunny", fusionId: "354" },
    429: { name: "mismagius", fusionId: "255" },
    430: { name: "honchkrow", fusionId: "256" },
    438: { name: "bonsly", fusionId: "257" },
    439: { name: "mime-jr", fusionId: "258" },
    440: { name: "happiny", fusionId: "259" },
    442: { name: "spiritomb", fusionId: "295" },
    443: { name: "gible", fusionId: "297" },
    444: { name: "gabite", fusionId: "298" },
    445: { name: "garchomp", fusionId: "299" },
    446: { name: "munchlax", fusionId: "260" },
    447: { name: "riolu", fusionId: "384" },
    448: { name: "lucario", fusionId: "296" },
    458: { name: "mantyke", fusionId: "261" },
    461: { name: "weavile", fusionId: "262" },
    462: { name: "magnezone", fusionId: "263" },
    463: { name: "lickilicky", fusionId: "264" },
    464: { name: "rhyperior", fusionId: "265" },
    465: { name: "tangrowth", fusionId: "266" },
    466: { name: "electivire", fusionId: "267" },
    467: { name: "magmortar", fusionId: "268" },
    468: { name: "togekiss", fusionId: "269" },
    469: { name: "yanmega", fusionId: "270" },
    470: { name: "leafeon", fusionId: "271" },
    471: { name: "glaceon", fusionId: "272" },
    472: { name: "gliscor", fusionId: "273" },
    473: { name: "mamoswine", fusionId: "274" },
    474: { name: "porygon-z", fusionId: "275" },
    475: { name: "gallade", fusionId: "288" },
    476: { name: "probopass", fusionId: "326" },
    477: { name: "dusknoir", fusionId: "313" },
    479: { name: "rotom", fusionId: "358" },
    483: { name: "dialga", fusionId: "343" },
    484: { name: "palkia", fusionId: "344" },
    486: { name: "regigigas", fusionId: "346" },
    491: { name: "darkrai", fusionId: "347" },
    493: { name: "arceus", fusionId: "315" },
    546: { name: "cottonee", fusionId: "408" },
    547: { name: "whimsicott", fusionId: "360" },
    551: { name: "sandile", fusionId: "409" },
    552: { name: "krokorok", fusionId: "410" },
    553: { name: "krookodile", fusionId: "361" },
    562: { name: "yamask", fusionId: "411" },
    563: { name: "cofagrigus", fusionId: "362" },
    570: { name: "zorua", fusionId: "399" },
    571: { name: "zoroark", fusionId: "338" },
    577: { name: "solosis", fusionId: "406" },
    578: { name: "duosion", fusionId: "407" },
    579: { name: "reuniclus", fusionId: "359" },
    595: { name: "joltik", fusionId: "412" },
    596: { name: "galvantula", fusionId: "363" },
    597: { name: "ferroseed", fusionId: "413" },
    598: { name: "ferrothorn", fusionId: "364" },
    599: { name: "klink", fusionId: "397" },
    600: { name: "klang", fusionId: "398" },
    601: { name: "klinklang", fusionId: "337" },
    607: { name: "litwick", fusionId: "365" },
    608: { name: "lampent", fusionId: "366" },
    609: { name: "chandelure", fusionId: "367" },
    610: { name: "axew", fusionId: "414" },
    611: { name: "fraxure", fusionId: "415" },
    612: { name: "haxorus", fusionId: "368" },
    618: { name: "stunfisk", fusionId: "420" },
    622: { name: "golett", fusionId: "416" },
    623: { name: "golurk", fusionId: "369" },
    624: { name: "pawniard", fusionId: "330" },
    625: { name: "bisharp", fusionId: "331" },
    633: { name: "deino", fusionId: "375" },
    634: { name: "zweilous", fusionId: "376" },
    635: { name: "hydreigon", fusionId: "377" },
    636: { name: "larvesta", fusionId: "419" },
    637: { name: "volcarona", fusionId: "374" },
    643: { name: "reshiram", fusionId: "349" },
    644: { name: "zekrom", fusionId: "350" },
    646: { name: "kyurem", fusionId: "351" },
    649: { name: "genesect", fusionId: "348" },
    661: { name: "fletchling", fusionId: "417" },
    662: { name: "fletchinder", fusionId: "418" },
    663: { name: "talonflame", fusionId: "372" },
    679: { name: "honedge", fusionId: "327" },
    680: { name: "doublade", fusionId: "328" },
    681: { name: "aegislash", fusionId: "329" },
    700: { name: "sylveon", fusionId: "339" },
    707: { name: "klefki", fusionId: "371" },
    771: { name: "pyukumuku", fusionId: "370" },
    778: { name: "mimikyu", fusionId: "373" },
    10007: { name: "giratina", fusionId: "345" }
};
var idCounter = 421;
var spriteURL = "https://raw.githubusercontent.com/Aegide/autogen-fusion-sprites/master/Battlers/%id1/%id1.%id2.png";
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var sql, files, _i, files_1, file1, pokemon1, _a, files_2, file2, pokemon2, id1, id2, fusedPokemon;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, createTable(client)];
                case 1:
                    _b.sent();
                    sql = "INSERT INTO pokemons VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING name";
                    return [4 /*yield*/, fs.readdir("../temp_pokemons")];
                case 2:
                    files = _b.sent();
                    _i = 0, files_1 = files;
                    _b.label = 3;
                case 3:
                    if (!(_i < files_1.length)) return [3 /*break*/, 9];
                    file1 = files_1[_i];
                    return [4 /*yield*/, require("../temp_pokemons/" + file1)];
                case 4:
                    pokemon1 = _b.sent();
                    _a = 0, files_2 = files;
                    _b.label = 5;
                case 5:
                    if (!(_a < files_2.length)) return [3 /*break*/, 8];
                    file2 = files_2[_a];
                    return [4 /*yield*/, require("../temp_pokemons/" + file2)];
                case 6:
                    pokemon2 = _b.sent();
                    id1 = pokemonData[pokemon1.id].fusionId;
                    id2 = pokemonData[pokemon2.id].fusionId;
                    if (Math.random() < 0.04) {
                        fusedPokemon = fuse(pokemon1, pokemon2);
                        client
                            .query(sql, fusedPokemon)
                            .then(function (res) { return console.log(res.rows[0].name); })["catch"](console.log);
                    }
                    _b.label = 7;
                case 7:
                    _a++;
                    return [3 /*break*/, 5];
                case 8:
                    _i++;
                    return [3 /*break*/, 3];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function fuse(pokemon1, pokemon2) {
    var id1 = pokemonData[pokemon1.id].fusionId;
    var id2 = pokemonData[pokemon2.id].fusionId;
    var stats = getRandomStats(pokemon1, pokemon2);
    var types = getRandomCollection(pokemon1, pokemon2, "types")
        .filter(function (value, index, self) { return index === self.findIndex(function (t) { return t.type.name === value.type.name; }); })
        .map(function (t) { return t.type.name; });
    return [
        idCounter++,
        pokemon1.name.slice(0, pokemon1.name.length / 2) + pokemon2.name.slice(pokemon2.name.length / 2, pokemon2.name.length),
        getRandomInRange(Math.min(pokemon1.height, pokemon2.height), Math.max(pokemon1.height, pokemon2.height)),
        getRandomInRange(Math.min(pokemon1.weight, pokemon2.weight), Math.max(pokemon1.weight, pokemon2.weight)),
        spriteURL.replace(/%id1/g, id1).replace(/%id2/g, id2),
        stats[0].base_stat,
        stats[1].base_stat,
        stats[2].base_stat,
        stats[3].base_stat,
        stats[4].base_stat,
        stats[5].base_stat,
        types,
    ];
}
function createTable(client) {
    return __awaiter(this, void 0, void 0, function () {
        var text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.query("DROP TABLE IF EXISTS pokemons")];
                case 1:
                    _a.sent();
                    text = "CREATE TABLE pokemons \n\t(id INTEGER PRIMARY KEY,\n\t\tname VARCHAR(255) NOT NULL,\n\t\theight INTEGER,\n\t\tweight INTEGER, \n\t\tsprite VARCHAR(255) NOT NULL,\n\t\thp INTEGER,\n\t\tattack INTEGER,\n\t\tdefense INTEGER,\n\t\tspecialAttack INTEGER,\n\t\tspecialDefense INTEGER,\n\t\tspeed INTEGER,\n\t\ttypes TEXT[]);";
                    return [2 /*return*/, client.query(text)];
            }
        });
    });
}
exports.createTable = createTable;
function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function getRandomCollection(pokemon1, pokemon2, collectionName) {
    var collection = pokemon1[collectionName].concat(pokemon2[collectionName]).filter(function () { return Math.random() < (collectionName === "moves" ? 0.25 : 0.5); });
    if (collection.length === 0) {
        collection.push(pokemon1[collectionName][0]);
    }
    return collection;
}
function getRandomStats(pokemon1, pokemon2) {
    var stats = [];
    for (var i = 0; i < pokemon1.stats.length; i++) {
        stats.push({
            base_stat: getRandomInRange(Math.min(pokemon1.stats[i].base_stat, pokemon2.stats[i].base_stat), Math.max(pokemon1.stats[i].base_stat, pokemon2.stats[i].base_stat)),
            effort: pokemon1.stats[i].effort,
            stat: pokemon1.stats[i].stat
        });
    }
    return stats;
}
function main2() {
    return __awaiter(this, void 0, void 0, function () {
        var client;
        var _this = this;
        return __generator(this, function (_a) {
            client = new MongoClient(url);
            client.connect(function (err) { return __awaiter(_this, void 0, void 0, function () {
                var pokemons, files, _i, files_3, file1, pokemon1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            pokemons = client.db("pokedex").collection("pokemons");
                            return [4 /*yield*/, fs.readdir("./pokemons")];
                        case 1:
                            files = _a.sent();
                            _i = 0, files_3 = files;
                            _a.label = 2;
                        case 2:
                            if (!(_i < files_3.length)) return [3 /*break*/, 6];
                            file1 = files_3[_i];
                            return [4 /*yield*/, require("./pokemons/" + file1)];
                        case 3:
                            pokemon1 = _a.sent();
                            return [4 /*yield*/, pokemons.insertOne(pokemon1)];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 2];
                        case 6: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
main();
