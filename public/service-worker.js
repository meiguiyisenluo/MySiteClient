// 安装 Service Worker
self.addEventListener('install', function (event) {
    console.log('Service Worker 安装中...')

    // 执行预缓存
    event.waitUntil(
        caches.open('my-cache-v1').then(function (cache) {
            return cache.addAll(['/'])
        })
    )
})

// 激活 Service Worker
self.addEventListener('activate', function (event) {
    console.log('Service Worker 已激活')

    // 删除旧版本缓存
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames
                    .filter(function (cacheName) {
                        // 过滤出旧版本缓存名称
                        return cacheName.startsWith('my-cache-') && cacheName !== 'my-cache-v1'
                    })
                    .map(function (cacheName) {
                        // 删除旧版本缓存
                        return caches.delete(cacheName)
                    })
            )
        })
    )
})

// 拦截 fetch 请求
self.addEventListener('fetch', function (event) {
    console.log('拦截到 fetch 请求:', event.request.url)

    // 从缓存中响应或者网络请求
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request)
        })
    )
})

self.addEventListener('notificationclick', function (event) {
    // self.registration.showNotification
    const notification = event.notification
    notification.close()
    event.waitUntil(self.clients.openWindow(notification.data.links))
})
