export const config = {
    runtime: 'edge',
}

const API_BASE_URL = 'https://fe1111.projects.academy.onlyjs.com/api/v1'

export default async function handler(request) {
    const url = new URL(request.url)
    const endpoint = url.pathname.replace('/api/proxy', '')
    const queryString = url.search

    const targetUrl = `${API_BASE_URL}${endpoint}${queryString}`
    const headers = new Headers()
    headers.set('Content-Type', 'application/json')


    const authHeader = request.headers.get('Authorization')
    if (authHeader) {
        headers.set('Authorization', authHeader)
    }

    try {
        let body = null
        if (request.method !== 'GET' && request.method !== 'HEAD') {
            body = await request.text()
        }

        const response = await fetch(targetUrl, {
            method: request.method,
            headers: headers,
            body: body,
        })

        const data = await response.text()

        return new Response(data, {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
    }
}
