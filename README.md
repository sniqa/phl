# phl

## Usage
```
const { Phl } = require('phl');

const phl = new Phl({
  interfaces: controllers
})
```

### Example for Koa
```
//get interface collection
const ctl = require("./controller")

const { Phl, playground } = require("phl")
const phl = new Phl({
  interfaces: ctl,
})

//Open test page
router.get("/phl", (ctx) => {
  ctx.body = playground()
})

//Request processing
router.post("/phl", async (ctx) => {
  const request = ctx.request.body
  const res = await phl.handler(request)

  ctx.body = res
})

```
