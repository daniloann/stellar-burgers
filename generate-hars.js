const fs = require('fs');
const path = require('path');

// ВАЖНО: Создаем папку именно в tests/hars, как требует ТЗ
const harsDir = path.join(__dirname, 'tests', 'hars');
if (!fs.existsSync(harsDir)) {
    fs.mkdirSync(harsDir, { recursive: true });
}

const ingredientsData = { success: true, data: [
    { _id: "60d3b41abdacab0026a733c6", name: "Краторная булка N-200i", type: "bun", proteins: 80, fat: 20, carbohydrates: 100, calories: 420, price: 125, image: "https://code.s3.yandex.net/react/code/bun-02.png", image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png", image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png" },
    { _id: "60d3b41abdacab0026a733c8", name: "Филе Люминесцентного тетраодонтимформа", type: "main", proteins: 44, fat: 26, carbohydrates: 85, calories: 643, price: 988, image: "https://code.s3.yandex.net/react/code/meat-03.png", image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png", image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png" }
]};
const authLoginData = { success: true, accessToken: "Bearer test_access_token", refreshToken: "test_refresh_token", user: { email: "test@test.com", name: "Test User" } };
const authUserData = { success: true, user: { email: "test@test.com", name: "Test User" } };
const orderData = { success: true, order: { _id: "1", status: "done", name: "Test Order", createdAt: "2024-01-01T00:00:00.000Z", updatedAt: "2024-01-01T00:00:00.000Z", number: 12345, owner: { name: "Test User", email: "test@test.com" }, price: 1234 } };

function createHarEntry(method, url, responseData) {
    const text = JSON.stringify(responseData);
    return {
        startedDateTime: new Date().toISOString(),
        time: 10,
        request: {
            method: method,
            url: url,
            httpVersion: "HTTP/1.1",
            headers: [
                { name: "Accept", value: "*/*" },
                { name: "Content-Type", value: "application/json" }
            ],
            queryString: [],
            cookies: [],
            headersSize: -1,
            bodySize: method === 'POST' ? text.length : 0
        },
        response: {
            status: 200,
            statusText: "OK",
            httpVersion: "HTTP/1.1",
            headers: [
                { name: "Content-Type", value: "application/json; charset=utf-8" },
                { name: "Content-Length", value: String(text.length) }
            ],
            cookies: [],
            content: {
                size: text.length,
                mimeType: "application/json; charset=utf-8",
                text: text
            },
            redirectURL: "",
            headersSize: -1,
            bodySize: text.length
        },
        cache: {},
        timings: { send: 1, wait: 8, receive: 1 }
    };
}

fs.writeFileSync(path.join(harsDir, 'ingredients.har'), JSON.stringify({
    log: { version: "1.2", creator: { name: "Playwright", version: "1.0" }, entries: [
        createHarEntry("GET", "https://norma.nomoreparties.space/api/ingredients", ingredientsData)
    ]}
}, null, 2));

fs.writeFileSync(path.join(harsDir, 'auth.har'), JSON.stringify({
    log: { version: "1.2", creator: { name: "Playwright", version: "1.0" }, entries: [
        createHarEntry("POST", "https://norma.nomoreparties.space/api/auth/login", authLoginData),
        createHarEntry("GET", "https://norma.nomoreparties.space/api/auth/user", authUserData)
    ]}
}, null, 2));

fs.writeFileSync(path.join(harsDir, 'order.har'), JSON.stringify({
    log: { version: "1.2", creator: { name: "Playwright", version: "1.0" }, entries: [
        createHarEntry("POST", "https://norma.nomoreparties.space/api/orders", orderData)
    ]}
}, null, 2));

console.log('HAR файлы успешно созданы в папке /tests/hars!');