# Svenska löptävlingar

Det är är en applikation för springlopp utvecklad i AngularJS som hämtar data från ett api som finns i [det här repot](https://github.com/me222wm/1dv450_me222wm). Där finns även körinstruktioner. Det finns ingen publicerad applikation så man får ha den servern igång när man använder api:et. 

För angular-applikationen behöver man någon form av http-server, t.ex. den som finns inbyggd i WebStorm. Jag använder en enkel variant ihop med [node.js](https://nodejs.org/en/). För att använda den: installera med `npm install -g http-server`, `cd` till projektet och kör `http-server -o`.

#### Inloggningsuppgifter
Användare som har skapat flera lopp: 
`E-post: resourceowner@example.com, Lösenord: password`

Användare som inte har några lopp: 
`E-post: notowner@example.com, Lösenord: secret`

#### Ändringar i api:et
* Förbättrade pagineringen med offset och limit.
* Vid request av ett lopp får man med en url till det loppet. 
* Möjlighet att filtrera på sökfråga, taggar och paginering på samma gång. 
* Ändrade visingen av ett lopp för att matcha hur det bör se ut när det skapas, vilket underlättar vid redigering. 
* Installerade gemet rack-cors.

#### TODO: 
* Samma formulär för både create och edit.
* Meddelande visas inte vid delete. 
* Om man avbryter redigering av lopp visas ändringarna ändå.
* Borde inte kunna se "Radera", "Redigera" på lopp man inte har skapat. 




