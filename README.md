# Extension-Chrome-React
This extension is intended for streamers for their community.
Once configured and deposited on the google store, their viewers can be notified during each live. They will have real-time stream informations and have quick access to the streamer's social media.

![Themes]
(https://i.imgur.com/UJYrcgg.jpg)

![On live]
(https://i.imgur.com/ZJurwGv.jpg)

**Démo :** https://chrome.google.com/webstore/detail/valmaster-live-alert/jhekmffmenimdgfijmealpnoljmlbmho?hl=fr

## Getting Started
```
git clone https://github.com/sunstan/Extension-Chrome-React
cd Extension-Chrome-React
```

## Configuration

You have to edit `config.ts`

Key | Type | Description
------------ | ------------- | -------------
theme | string | Can be '', 'blue', 'pink', 'red', 'purple', 'green' or 'orange'
client_id | string | Id provided by Twitch Developer
client_secret | string | Secret key provided by Twitch Developer
social | Object | List of http links
notification | Object | *See above*

#### Social Object

Key | Type
------------ | -------------
youtube | string
twitter | string
facebook | string
instagram | string
discord | string
shop | string

#### Notification Object

**More informations **: https://developer.chrome.com/apps/notifications#type-NotificationOptions

Key | Type
------------ | -------------
type | string
title | string
message | string
iconUrl | string
