'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "8a5ab3fbc14fd848d5daa0969f2c70e8",
"assets/AssetManifest.json": "0a834401a3f1536acd8d56e96e659644",
"assets/assets/images/back.jpg": "c7b499bc65ed9487717c8594a9c64891",
"assets/assets/images/blank.png": "cf89e8e6daa9dabc8174c303e4d53d3a",
"assets/assets/images/buyer.png": "6a8548054268f909473792e8416f1406",
"assets/assets/images/chatbot.png": "7c81e54467d19da7a34fd72335ea76c1",
"assets/assets/images/chatbot2.png": "5a63c42c12ed2f8f06d93e543e7626cb",
"assets/assets/images/crop-information.png": "479c99bfe02ebe4ed623f4ac193f2e48",
"assets/assets/images/hand-holding-seeding.png": "9b0cf7ad6c15e053edd76e4ebe18d3bc",
"assets/assets/images/Life%2520Lines.jpeg": "3cc00e4dd6800f47d3cf7b3b50be3ed8",
"assets/assets/images/logo.png": "272e10de0b140a575b0a4e0cde7be70f",
"assets/assets/images/mario.jpg": "ed0987c0596161e4c8b99ca342bfaa78",
"assets/assets/images/nutrient.png": "7c63d5f8d3812af8cf539cefac6276b5",
"assets/assets/images/prediction.png": "eb2bc2ced255cb183b38e257bc0c10e3",
"assets/assets/images/profile.jpeg": "728f1da6d887121e893042590ad4af49",
"assets/assets/images/queuelogo.png": "9e647f1306bbdf8aa906f66cdc1e25dd",
"assets/assets/logo/goldenq.png": "9ec3440dd3da38370a2198891b2d32ab",
"assets/assets/logo/letterq.jpg": "a27d9c2b2a9de92a09bbc7823732fb58",
"assets/assets/logo/logo%2520with%2520background.jpg": "ee392f78b30e9aaf46668047dd1dbb52",
"assets/assets/logo/logo%2520with%2520background2.jpg": "7c09f2c428b50f3d36c4bf4411af9c80",
"assets/assets/logo/logo1.png": "d032c75bacf9c1cef65a5f4c94088fd7",
"assets/assets/logo/logo2.png": "272e10de0b140a575b0a4e0cde7be70f",
"assets/assets/logo/logo3.png": "14a1392f6f58d2fbbf4efd2d629a80fc",
"assets/assets/logo/queuelogo.png": "9e647f1306bbdf8aa906f66cdc1e25dd",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "12cca74414076c3160f681179e17a75e",
"assets/NOTICES": "615604a59f2b77aeb9ee4e70a0e8098c",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/packages/fluttertoast/assets/toastify.css": "910ddaaf9712a0b0392cf7975a3b7fb5",
"assets/packages/fluttertoast/assets/toastify.js": "18cfdd77033aa55d215e8a78c090ba89",
"assets/packages/flutter_inappwebview/assets/t_rex_runner/t-rex.css": "5a8d0222407e388155d7d1395a75d5b9",
"assets/packages/flutter_inappwebview/assets/t_rex_runner/t-rex.html": "16911fcc170c8af1c5457940bd0bf055",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "5caccb235fad20e9b72ea6da5a0094e6",
"canvaskit/canvaskit.wasm": "d9f69e0f428f695dc3d66b3a83a4aa8e",
"canvaskit/chromium/canvaskit.js": "ffb2bb6484d5689d91f393b60664d530",
"canvaskit/chromium/canvaskit.wasm": "393ec8fb05d94036734f8104fa550a67",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "d1fde2560be92c0b07ad9cf9acb10d05",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"favicon.png": "1667c75e0a4efc10f8a424f1e1d56eb2",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "908d8b6760a849b97c72a9758ceaae3a",
"icons/Icon-512.png": "64e7627beaa6f2fc73b262c4e02724e0",
"icons/Icon-maskable-192.png": "908d8b6760a849b97c72a9758ceaae3a",
"icons/Icon-maskable-512.png": "64e7627beaa6f2fc73b262c4e02724e0",
"index.html": "39b090796bdc56967905923a5881665f",
"/": "39b090796bdc56967905923a5881665f",
"main.dart.js": "7f78789407f10a8163dde115d0af89b3",
"manifest.json": "297b583a896db02c0aebad3f1ca333f1",
"version.json": "75c9dc2e4e2bea2f89a385aa01348a81"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
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
        // Claim client to enable caching on first launch
        self.clients.claim();
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
      // Claim client to enable caching on first launch
      self.clients.claim();
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
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
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
