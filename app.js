const express = require('express')
const app = express()


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'pug');


var replace = {'a':'apple', 'A':'APPLE', 'b':'bottle', 'B':'BOTTLE', 'c':'case', 'C':'CASE', 'd':'dog', 'D':'DOG', 'e':'egg', 'E':'EGG', 'f':'fin', 'F':'FIN', 'g':'girl', 'G':'GIRL', 'h':'her', 'H':'HER', 'i':'ice', 'I':'ICE', 'j':'joy', 'J':'JOY', 'k':'kit', 'K':'KIT', 'l':'love', 'L':'LOVE', 'm':'mom', 'M':'MOM', 'n':'neat', 'N':'NEAT', 'o':'old', 'O':'OLD', 'p':'pet', 'P':'PET', 'q':'queen', 'Q':'QUEEN', 'r':'ray', 'R':'RAY', 's':'sum', 'S':'SUM', 't':'time', 'T':'TIME', 'u':'up', 'U':'UP', 'v':'van', 'V':'VAN', 'w':'win', 'W':'WIN', 'x':'xray', 'X':'XRAY', 'y':'yell', 'Y':'YELL', 'z':'zebra', 'Z':'ZEBRA', '0':'Zero', '1':'One', '2':'Two', '3':'Three', '4':'Four', '5':'Five', '6':'Six', '7':'Seven', '8':'Eight', '9':'Nine'}

var lowerCase = 'abcdefghijklmnopqrstuvwxyz';
var numbers = '0123456789';
var symbols = '!@#$%^&*()+_-=}{[]|\':;"/?.><,`~';
var upperCase = 'ABCDEFHIJKLMNOPQRSTUVWXYZ';

app.get('/', function (req, res) {
    res.render('index', { title: 'Password Generator', sym: true, low: true, upp: true, num: true, sim: true});
});

function createPassword(gen, length) {
    var yournewpass = "";
  
    for (var i = 0; i < length; i++)
      yournewpass += gen.charAt(Math.floor(Math.random() * gen.length));
  
    return yournewpass;
}

app.post('/',function(req, res, next){

    var note = '';
    var gen = '';

    if (req.body.lowerCase) 
        gen += lowerCase;
    if (req.body.numbers) 
        gen += numbers;
    if (req.body.symbols)
        gen += symbols;
    if (req.body.upperCase)
        gen += upperCase;
    if (req.body.similar)
        gen = gen.replace(/[|ilLI`oO0]/g, '');
    if (req.body.ambiguous)
        gen = gen.replace(/[{}\[\]\/\\()'"`~,;:.<>]/g, '');


    console.log('checked: ' + gen)

    var password = createPassword(gen, req.body.length);

    console.log('new: ' + password);

    note = password;

    note = note.split('').join('  ');
    note = note.replace(/[aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789]/g, m => replace[m]);

    res.render('index', { title: 'Password Generator', pass: password, rem: note, length: req.body.length, num: req.body.numbers, sym: req.body.symbols, low: req.body.lowerCase, upp: req.body.upperCase, sim: req.body.similar, amb: req.body.ambiguous});
});

app.listen(3000, () => console.log('view on browser: localhost:3000'))