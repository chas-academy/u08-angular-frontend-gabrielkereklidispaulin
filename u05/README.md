
# Melee API 

Ett RESTful API för att hantera karaktärer från Super Smash Bros. Melee.  
API:et gör det möjligt att hämta, lägga till, uppdatera och ta bort karaktärer.

## Installation 
1. Klona repot  
2. Kör npm install i projektmappen 
3. Anropa med curl, instruktioner finns längre ner
## Objektmodell

### Characters

```json
{
  "name": "Fox",
  "weight_class": "light",
  "movement_speed": 10,
  "original_game_series": "Star Fox",
  "icon": "url-to-icon",
  "image": "url-to-image",
  "model": "url-to-3d-model",
  "tier_ranking": "S",
  "notable_players": ["Leffen", "Mang0"]
}
```


## API Endpoints

### Resource URIs (Endpoints)** 



| Metod  | Resurs-URI            | Beskrivning |
|--------|-----------------------|-------------|
| **GET**    | `/api/characters`        | Hämta alla karaktärer |
| **GET**    | `/api/characters/:id`    | Hämta en specifik karaktär via ID |
| **POST**   | `/api/characters`        | Lägg till en ny karaktär |
| **PUT**    | `/api/characters/:id`    | Uppdatera en karaktär via ID |
| **DELETE** | `/api/characters/:id`    | Ta bort en karaktär |

### User Endpoints

| Metod  | Resurs-URI            | Beskrivning |
|--------|-----------------------|-------------|
| **GET**    | `/api/users`      | Hämta alla users|
| **GET**    | `/api/user/:id`    | Hämta en specifik user via ID |
| **POST**   | `/api/users`        | Skapa ny user |
| **PUT**    | `/api/users/:id`    | Uppdatera en user via ID |
| **DELETE** | `/api/user/:id`    | Ta bort en user |


### Endpoint testing with curl

#### Get all characters
`curl -X GET https://u05-restful-api.onrender.com/characters` 

#### Get specific character
`curl -X GET https://u05-restful-api.onrender.com/characters/{id}`

#### Add new character 

```curl -X POST https://u05-restful-api.onrender.com/characters \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Pikachu",
           "weight_class": "light",
           "movement_speed": 9,
           "original_game_series": "Pokémon",
           "icon": "url-to-icon",
           "image": "url-to-image",
           "model": "url-to-3d-model",
           "tier_ranking": "A",
           "notable_players": ["Axe, Jchu"]
         }' 
```

#### Update character 

```curl -X PUT https://u05-restful-api.onrender.com/characters/{id} \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Pikachu",
           "tier_ranking": "S"
         }'
```

#### Delete character
`curl -X DELETE https://u05-restful-api.onrender.com/characters/{id}`