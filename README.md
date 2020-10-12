# Anfrage

## Usage

```shell
const { Anfrage } = require('anfrage');

const anfrage = new Anfrage({
  interfaces: controllers
})
```

### Github

See [Project Reference](https://github.com/sniqa/anfrage).

### Example for Koa

```shell
//Get interface collection
const ctl = require("./controller")

const { Anfrage, playground } = require("anfrage")
const anfrage = new Anfrage({
  interfaces: ctl,
})

//Open test page
router.get("/anfrage", (ctx) => {
  ctx.body = playground()
})

//Request processing
router.post("/anfrage", async (ctx) => {
  const request = ctx.request.body
  const res = await anfrage.handler(request)
  ctx.body = res
})

```
