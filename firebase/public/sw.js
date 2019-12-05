const CACHE_STATIC_NAME  = 'static-v3';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';
const CACHE_YOUTUBE = 'youtube-v1'

const CACHE_DYNAMIC_LIMIT = 50;


function limpiarCache( cacheName, numeroItems ) {


    caches.open( cacheName )
        .then( cache => {

            return cache.keys()
                .then( keys => {
                    
                    if ( keys.length > numeroItems ) {
                        cache.delete( keys[0] )
                            .then( limpiarCache(cacheName, numeroItems) );
                    }
                });

            
        });
}




self.addEventListener('install', e => {

    const cacheProm = caches.open( CACHE_STATIC_NAME )
        .then( cache => {

            return cache.addAll([
                '/',
                'index.html',
                '/pages/offline.html'
                
            ]);        
        });

    const cacheInmutable = caches.open( CACHE_INMUTABLE_NAME )
            .then( cache => cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'));


    e.waitUntil( Promise.all([cacheProm, cacheInmutable]) );

});

self.addEventListener('activate', e=>{

    const respuesta = caches.keys().then(keys=>{
        keys.forEach(key=>{
            if (key != CACHE_STATIC_NAME && key.includes('static')){
                return caches.delete(key)
            }
        })

    })

    e.waitUntil( respuesta )
})



// TODO: Guardar Cache y devolver pagina offline
self.addEventListener('fetch', e=>{
    //2: Cache with network fallback: intenta primero con el cache y si no puede va a internet
    const respuesta = caches.match(e.request)
            .then(res=>{//tengo que evaluar si existe la data en cache
                if (res) return res;

                //no existe el archivo solicitado. tengo que ir a la web
                return fetch(e.request)
                    .then(newResp=>{//encontro el archivo
                                                      
                            if(!newResp.url.includes('channel')){
                                caches.open(CACHE_DYNAMIC_NAME)
                                .then(cache=>{                                        
                                    cache.put(e.request, newResp)
                                    limpiarCache(CACHE_DYNAMIC_NAME,50)
                                })
                                
                                
                            }else{
                                caches.open(CACHE_YOUTUBE) //para almacenar playlist de youtube
                                    .then(cache=>{
                                        console.log("channel")
                                        cache.put(e.request, newResp)
                                        limpiarCache(CACHE_YOUTUBE,50)
                                    })
                            }
                            return newResp.clone();
                    })
                    .catch(err=>{// si no tengo coneccion a internet
                        console.log(err);
                        if (e.request.headers.get('accept').includes('text/html')){ //detecto si lo que se solicita es una pagina web                                
                            return caches.match('/pages/offline.html')
                        }
                    });
    })
    e.respondWith(respuesta);     
})