import "dotenv/config"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "node:path"

function apiDevPlugin() {
  return {
    name: "api-dev-server",
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        const url = req.url?.split("?")[0]
        if (url === "/api/chat" || url === "/api/consultation") {
          if (req.method === "OPTIONS") {
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
            res.setHeader("Access-Control-Allow-Headers", "Content-Type")
            res.statusCode = 200
            res.end()
            return
          }

          if (req.method === "POST") {
            const chunks: Buffer[] = []
            req.on("data", (chunk: any) => {
              chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
            })
            req.on("end", async () => {
              try {
                const raw = Buffer.concat(chunks).toString("utf-8")
                let body = {}
                try {
                  body = JSON.parse(raw)
                } catch {
                  body = {}
                }

                const endpoint = url === "/api/chat" ? "chat" : "consultation"
                const mod = await server.ssrLoadModule(`./api/${endpoint}.ts`)
                const handler = mod.default || mod

                const vercelReq = Object.assign(req, {
                  body,
                  query: {},
                  cookies: {},
                })

                const vercelRes = Object.assign(res, {
                  status(code: number) {
                    res.statusCode = code
                    return vercelRes
                  },
                  json(data: any) {
                    if (!res.headersSent) {
                      res.setHeader("Content-Type", "application/json")
                    }
                    res.end(JSON.stringify(data))
                    return vercelRes
                  },
                  send(data: any) {
                    res.end(data)
                    return vercelRes
                  },
                })

                await handler(vercelReq, vercelRes)
              } catch (err: any) {
                console.error(`Vite ${url} dev handler error:`, err)
                if (!res.headersSent) {
                  res.statusCode = 500
                  res.setHeader("Content-Type", "application/json")
                  res.end(
                    JSON.stringify({
                      error: err?.message || "Internal Server Error",
                    }),
                  )
                }
              }
            })
            return
          }
        }
        next()
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const isDev = mode === "development"

  return {
    plugins: [react(), tailwindcss(), apiDevPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: "0.0.0.0",
      port: parseInt(process.env.PORT || "8443"),
      strictPort: true,
    },
    preview: {
      host: "0.0.0.0",
      port: parseInt(process.env.PORT || "8443"),
    },
    build: {
      sourcemap: isDev ? "inline" : false,
      minify: !isDev,
      target: "es2022",
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (
              id.includes("node_modules/react") ||
              id.includes("node_modules/react-dom")
            ) {
              return "vendor-react"
            }
          },
        },
      },
    },
  }
})
