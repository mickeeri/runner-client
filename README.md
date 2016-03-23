# Svenska löpartävlingar

#### Övergripande om appliaktionen (registering, API och klient)
Det är är en applikation för springlopp utvecklad i AngularJS som hämtar data från ett api som finns i [det här repot](https://github.com/me222wm/1dv450_me222wm). Där finns även körinstruktioner om man vill använda servern lokalt. Nu finns det även en [publicerad version](https://peaceful-woodland-85717.herokuapp.com) som angular-appliaktionen använder sig av. 

För angular-applikationen behöver man någon form av http-server, t.ex. den som finns inbyggd i WebStorm. Jag använder en enkel variant ihop med [node.js](https://nodejs.org/en/). För att använda den: installera med `npm install -g http-server`, `cd` till projektet och kör `http-server -o`.

Sådant som skulle kunna vara betygshöjande är: 
* 69 olika testfall till Rails-applikationen. 
* Möjlighet att skapa taggar i samband med skapndet av händelser. 
* Möjlihet att filtrera på sökfråga och flera taggar samtidigt. 
* Autentisering med jwt. 
* Paginering av resurser på klienten. 
* Sparar plats och hämtar koordinater i samband med att man lägger till händelse.

#### Inloggningsuppgifter för klient
Användare som har skapat flera lopp: 

`E-post: resourceowner@example.com, Lösenord: password`

Användare som inte har så många lopp: 

`E-post: notowner@example.com, Lösenord: secret`

#### Ändringar i api:et
* Förbättrade pagineringen med offset och limit.
* Vid request av ett lopp får man med en url till det loppet. 
* Möjlighet att filtrera på sökfråga, taggar och paginering på samma gång. 
* Ändrade visingen av ett lopp för att matcha hur det bör se ut när det skapas, vilket underlättar vid redigering. 
* Installerade gemet rack-cors.
* Möjlighet att filtrera på flera taggar genom att kombinera dem. Exempelvis: ("tag1+tag2").
* Om man hämtar ett lopp får man även resursägaren. 




