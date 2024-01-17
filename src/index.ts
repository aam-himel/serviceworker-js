console.log("script loaded")
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('../build/serviceworker.js')
    .then((resigtration) => {
        console.log('Service worker resigterd with scope', resigtration.scope);
    }).catch((err) => {
        console.log('servcei worker resigtration falied:', err);
    })
}

