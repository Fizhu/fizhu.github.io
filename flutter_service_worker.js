'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "12a92ef79835b40a6093bcc932b54998",
"splash/img/light-2x.png": "12673fc95048eadefdb4d108941a6b3f",
"splash/img/dark-4x.png": "1d0753457c4c9dab55c05a8b44e2d906",
"splash/img/light-3x.png": "2035dad262cbd754269730b3ac68cd83",
"splash/img/dark-3x.png": "2035dad262cbd754269730b3ac68cd83",
"splash/img/light-4x.png": "1d0753457c4c9dab55c05a8b44e2d906",
"splash/img/dark-2x.png": "12673fc95048eadefdb4d108941a6b3f",
"splash/img/dark-1x.png": "d813fb19f92b5a3ead83f7444e4e2cb2",
"splash/img/light-1x.png": "d813fb19f92b5a3ead83f7444e4e2cb2",
"splash/splash.js": "c6a271349a0cd249bdb6d3c4d12f5dcf",
"splash/style.css": "db6178791b6369b77311c0ae92809585",
"index.html": "49426f7ac0f9642f322cfc21f71d3f91",
"/": "49426f7ac0f9642f322cfc21f71d3f91",
"main.dart.js": "7cb773d09fad2d639a468f19e81d9ef0",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "fe3efdabbab826762c914b1b0811f44f",
"assets/AssetManifest.json": "81d35228682967164a677dc5735678ff",
"assets/NOTICES": "1eba2cdb9bf589f5783808d9b4bcd272",
"assets/FontManifest.json": "25f159caa79186eaa65b68f1f6364a8d",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/Alilato-ExtraLight.ttf": "4ee300ac1b1c62a7ff64b97455ed7d7d",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"assets/assets/images/img_profile_cropped.JPG": "af59a76b6cd6477e2564de7f0d7cbe61",
"assets/assets/images/ps_staff1.jpg": "0248be9c22c93a437c225ebc58b9c5c6",
"assets/assets/images/img_coding_welcome.jpg": "92e56767218b24eadfbe17215d821566",
"assets/assets/images/img_self_1.jpeg": "3b96ae18ee664d34a621566a3b209d33",
"assets/assets/images/tdw_1.jpg": "19bd8235dd1cfbdfc132c46f444f1e93",
"assets/assets/images/bike_1.jpg": "c52677f6bdee584e21b2493fd39ebb25",
"assets/assets/images/pulsagram_1.jpg": "0b015c7ecfcf80b8af6663640e5c69ed",
"assets/assets/images/ps_1.jpg": "eabc3c9e9ee7b79fb692edbed15f2f62",
"assets/assets/images/strego_1.jpg": "35ac73f3ff6e81f45b9d70b61414d784",
"assets/assets/images/press_1.jpg": "ca4709b1109db9c8a806d114b185c9dd",
"assets/assets/images/ulak_1.jpg": "334ffe6ba95b93ea45595fd9beff6728",
"assets/assets/images/jsmart1.png": "3be72a31fda2764129a299a07a1a06e9",
"assets/assets/images/img_laptop.jpeg": "a9dddede084d80f92bea9eafbef8a5c0",
"assets/assets/images/chataja_2.jpg": "2c5789ac330f05b7cd3d843113a31778",
"assets/assets/images/tdwoutlet_1.jpg": "860e17b3b2a3ed88568335d64e7d0a45",
"assets/assets/images/chat_aja_1.jpg": "0607fa740fb66efd96889c49f02b6121",
"assets/assets/images/splash_logo.png": "055a91979264664a1ee12b9453610d82",
"assets/assets/images/waktoo_1.jpg": "f525cc6f3f1309a3a14a32c032ae62f1",
"assets/assets/images/tdwoutlet_2.jpg": "3e85bcf35eb53b8ebe2b47417d8668f1",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
