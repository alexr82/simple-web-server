const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req,res)=>{

    if(req.method === 'GET'){
        res.writeHead(200, {
            'Content-Type':'text/html'
        })
        
        if(req.url === '/'){
            fs.readFile(path.join(__dirname,'views','index.html'),
            'utf-8',
            (err,content) =>{
                if(err) throw Error(err)

                res.end(content)
            }
            )
        }

        if(req.url === '/about'){
            fs.readFile(path.join(__dirname,'views','about.html'),
            'utf-8',
            (err,content) =>{
                if(err) throw Error(err)

                res.end(content)
            }
            )
        }

        if(req.url === '/api/users'){
            res.writeHead(200, {
                "Content-Type" : "text:JSON"
            })

            const users = [
                {'Name':'Alex'},
                {'Age':'25'}
            ]
            res.end(JSON.stringify(users))
        }
    }
    else if(req.method === 'POST'){
        const body = []

        req.on('data',data => {
            body.push(Buffer.from(data))
        })

        req.on('end',()=>{
            const message = body.toString().split("=")[1]

            res.writeHead(200, {
                "Content-Type" : "text:html; charset:utf-8"
            })

            res.end(`
            <h1>The message is: ${message}</h1>
        `)
        })
    }
})

server.listen(3000, ()=>{
    console.log('server is running')
})